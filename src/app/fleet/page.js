"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AddDriverModal from "@/components/AddDriverModal";
import { useFleet, useBookings, useAuth } from "@/context/AppContext";
import { User, Shield, Phone, Car, Plus, Trophy, Trash2, CalendarCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FleetPage() {
    const { user, authLoading } = useAuth();
    const router = useRouter();
    const { drivers, removeDriver } = useFleet();
    const { bookings } = useBookings();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/admin");
        }
    }, [user, authLoading, router]);

    const getCompletedRides = (driverId) => {
        return bookings.filter(b => b.driverId === driverId && b.status === "Completed").length;
    };

    // Helper to check status
    const getDriverStatus = (driverId) => {
        const activeBooking = bookings.find(
            (b) => b.driverId === driverId && (b.status === "Assigned" || b.status === "In Progress")
        );
        return activeBooking ? { status: "Busy", booking: activeBooking } : { status: "Available", booking: null };
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-royal-gold animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-950 pl-64">
            <Sidebar />
            <main className="p-8">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-light text-white">Fleet <span className="text-text-muted">Management</span></h1>
                        <p className="text-text-muted text-sm mt-1">Manage Drivers & Vehicles</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10 transition-all font-medium text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Driver
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drivers.map(driver => {
                        const { status, booking } = getDriverStatus(driver.id);
                        return (
                            <div key={driver.id} className="glass-panel rounded-xl p-6 relative group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center border border-white/5">
                                            <User className="w-6 h-6 text-text-muted" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium">{driver.name}</h3>
                                            <p className="text-royal-gold text-sm">{driver.car}</p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "px-2 py-1 rounded text-xs font-bold uppercase tracking-wider",
                                        status === "Available" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                                    )}>
                                        {status}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-text-muted">Plate</span>
                                        <span className="font-mono text-white/80">{driver.plate}</span>
                                    </div>
                                    <div className="flex items-center text-gray-400">
                                        <Car className="w-4 h-4 mr-2" />
                                        <span className="text-sm">{driver.car} <span className="text-gray-600">|</span> {driver.plate}</span>
                                    </div>
                                    {/* Stats Badge */}
                                    <div className="flex items-center text-royal-gold mt-2 bg-royal-gold/10 px-2 py-1 rounded w-fit">
                                        <Trophy className="w-3 h-3 mr-1" />
                                        <span className="text-xs font-bold">{getCompletedRides(driver.id)} Rides Completed</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-text-muted">Contact</span>
                                        <div className="flex items-center gap-2 text-white/80">
                                            <Phone className="w-3 h-3" />
                                            {driver.phone}
                                        </div>
                                    </div>
                                </div>

                                {status === "Busy" && (
                                    <div className="mb-6 p-3 bg-dark-950/50 rounded border border-white/5">
                                        <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                                            <CalendarCheck className="w-3 h-3" /> Assinged To
                                        </p>
                                        <p className="text-sm text-white truncate">{booking.guest} → {booking.dropoff}</p>
                                    </div>
                                )}

                                <div className="flex items-center justify-end pt-4 border-t border-white/5">
                                    <button
                                        onClick={() => removeDriver(driver.id)}
                                        className="text-text-muted hover:text-red-400 text-sm flex items-center gap-1 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {drivers.length === 0 && (
                    <div className="text-center py-20 text-text-muted">
                        <p>No drivers in fleet.</p>
                    </div>
                )}

            </main>

            <AddDriverModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
