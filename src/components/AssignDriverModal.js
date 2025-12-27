"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useFleet, useBookings } from "@/context/AppContext";
import { User, Check, Car, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Vehicle Mapping
const VEHICLE_MAP = {
    "First Class": ["S-Class", "7 Series", "A8", "LS"],
    "Business Class": ["E-Class", "5 Series", "A6", "ES"],
    "Executive SUV": ["Escalade", "Navigator", "Suburban", "Yukon", "X7", "GLS"],
    "Luxury Van": ["Sprinter", "V-Class", "Transit"]
};

export default function AssignDriverModal({ isOpen, onClose, bookingId }) {
    const { drivers } = useFleet();
    const { bookings, updateBookingStatus } = useBookings();
    const [selectedDriverId, setSelectedDriverId] = useState(null);

    const booking = bookings.find(b => b.id === bookingId);

    // Helpers
    const isDriverBusy = (driverId) => {
        return bookings.some(b => b.driverId === driverId && (b.status === "Assigned" || b.status === "In Progress"));
    };

    const isVehicleMatch = (driverCar, requestedClass) => {
        if (!requestedClass || !driverCar) return false;
        const keywords = VEHICLE_MAP[requestedClass] || [];
        return keywords.some(k => driverCar.toLowerCase().includes(k.toLowerCase()));
    };

    // Filter and Sort
    const availableDrivers = drivers.filter(d => !isDriverBusy(d.id));

    // Sort: Matches first
    const sortedDrivers = [...availableDrivers].sort((a, b) => {
        const aMatch = isVehicleMatch(a.car, booking?.vehicle);
        const bMatch = isVehicleMatch(b.car, booking?.vehicle);
        return (bMatch === true) - (aMatch === true); // true (1) comes before false (0)
    });

    // Auto-select best match on open
    useEffect(() => {
        if (isOpen && sortedDrivers.length > 0) {
            // Prefer the first one (which is the best match due to sorting)
            setSelectedDriverId(sortedDrivers[0].id);
        }
    }, [isOpen, bookingId]); // Re-run when modal opens for a specific booking

    const handleAssign = () => {
        if (selectedDriverId) {
            updateBookingStatus(bookingId, "Assigned", selectedDriverId);
            onClose();
            setSelectedDriverId(null);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Assign Driver">
            <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-text-muted">
                    <p>Select a chauffeur.</p>
                    {booking?.vehicle && <p>Request: <span className="text-royal-gold font-bold">{booking.vehicle}</span></p>}
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {sortedDrivers.length === 0 ? (
                        <p className="text-red-400 text-sm py-4 text-center border border-red-500/20 rounded-md bg-red-500/5">No drivers available right now.</p>
                    ) : (
                        sortedDrivers.map(driver => {
                            const isMatch = isVehicleMatch(driver.car, booking?.vehicle);
                            return (
                                <div
                                    key={driver.id}
                                    onClick={() => setSelectedDriverId(driver.id)}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all relative overflow-hidden",
                                        selectedDriverId === driver.id
                                            ? "bg-royal-gold/10 border-royal-gold"
                                            : "bg-dark-900 border-white/5 hover:border-white/20"
                                    )}
                                >
                                    {/* Recommended Badge */}
                                    {isMatch && (
                                        <div className="absolute top-0 right-0 bg-royal-gold text-dark-950 text-[10px] uppercase font-bold px-2 py-0.5 rounded-bl-lg">
                                            Best Match
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center border border-white/5">
                                            <User className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-white">{driver.name}</p>
                                                {isMatch && <Star className="w-3 h-3 text-royal-gold fill-royal-gold" />}
                                            </div>
                                            <p className="text-xs text-text-muted flex items-center gap-1">
                                                <Car className="w-3 h-3" />
                                                {driver.car}
                                            </p>
                                        </div>
                                    </div>
                                    {selectedDriverId === driver.id && (
                                        <div className="w-6 h-6 rounded-full bg-royal-gold flex items-center justify-center mr-2">
                                            <Check className="w-4 h-4 text-dark-950" />
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-text-muted hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAssign}
                        disabled={!selectedDriverId}
                        className="px-6 py-2 bg-royal-gold text-dark-950 font-bold rounded-md hover:bg-royal-gold-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirm Assignment
                    </button>
                </div>
            </div>
        </Modal>
    );
}
