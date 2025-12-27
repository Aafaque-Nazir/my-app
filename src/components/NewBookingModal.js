"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useBookings } from "@/context/AppContext";
import { User, MapPin, Clock, Car } from "lucide-react";

export default function NewBookingModal({ isOpen, onClose }) {
    const { addBooking } = useBookings();
    const [formData, setFormData] = useState({
        guest: "",
        pickup: "",
        dropoff: "",
        time: "",
        vehicle: "Business Class", // Default
        serviceType: "transfer",
        duration: "3"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addBooking({
            ...formData,
            status: "Pending", // Default for new manual bookings
            duration: formData.serviceType === "hourly" ? `${formData.duration} Hours` : "N/A",
            dropoff: formData.serviceType === "hourly" && !formData.dropoff ? "As Directed" : formData.dropoff
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Booking">
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Service Type */}
                <div className="flex gap-4 p-1 bg-dark-900 rounded-lg">
                    <label className={`flex-1 text-center py-2 rounded-md cursor-pointer transition-colors ${formData.serviceType === 'transfer' ? 'bg-royal-gold text-black font-bold' : 'text-gray-400 hover:text-white'}`}>
                        <input
                            type="radio"
                            name="serviceType"
                            value="transfer"
                            className="hidden"
                            checked={formData.serviceType === 'transfer'}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        />
                        Transfer
                    </label>
                    <label className={`flex-1 text-center py-2 rounded-md cursor-pointer transition-colors ${formData.serviceType === 'hourly' ? 'bg-royal-gold text-black font-bold' : 'text-gray-400 hover:text-white'}`}>
                        <input
                            type="radio"
                            name="serviceType"
                            value="hourly"
                            className="hidden"
                            checked={formData.serviceType === 'hourly'}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        />
                        Hourly
                    </label>
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Guest Name</label>
                    <div className="flex items-center bg-dark-900 border border-white/10 rounded px-3 py-2">
                        <User className="w-4 h-4 text-royal-gold mr-2" />
                        <input
                            required
                            type="text"
                            className="bg-transparent border-none outline-none text-white w-full text-sm"
                            placeholder="Guest Name"
                            value={formData.guest}
                            onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1">Vehicle Class</label>
                        <div className="flex items-center bg-dark-900 border border-white/10 rounded px-3 py-2">
                            <Car className="w-4 h-4 text-royal-gold mr-2" />
                            <select
                                className="bg-transparent border-none outline-none text-white w-full text-sm appearance-none"
                                value={formData.vehicle}
                                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                            >
                                <option value="First Class">First Class</option>
                                <option value="Business Class">Business Class</option>
                                <option value="Executive SUV">Executive SUV</option>
                                <option value="Luxury Van">Luxury Van</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1">{formData.serviceType === 'hourly' ? 'Start Time' : 'Pickup Time'}</label>
                        <div className="flex items-center bg-dark-900 border border-white/10 rounded px-3 py-2">
                            <Clock className="w-4 h-4 text-royal-gold mr-2" />
                            <input
                                required
                                type="time"
                                className="bg-transparent border-none outline-none text-white w-full text-sm"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {formData.serviceType === 'hourly' && (
                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1">Duration</label>
                        <select
                            className="w-full bg-dark-900 border border-white/10 rounded px-3 py-2 text-white text-sm outline-none focus:border-royal-gold"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        >
                            <option value="3">3 Hours</option>
                            <option value="4">4 Hours</option>
                            <option value="5">5 Hours</option>
                            <option value="6">6 Hours</option>
                            <option value="8">8 Hours</option>
                            <option value="12">12 Hours</option>
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Pickup Location</label>
                    <div className="flex items-center bg-dark-900 border border-white/10 rounded px-3 py-2">
                        <MapPin className="w-4 h-4 text-royal-gold mr-2" />
                        <input
                            required
                            type="text"
                            className="bg-transparent border-none outline-none text-white w-full text-sm"
                            placeholder="Pickup Address"
                            value={formData.pickup}
                            onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Dropoff Location {formData.serviceType === 'hourly' && "(Optional)"}</label>
                    <div className="flex items-center bg-dark-900 border border-white/10 rounded px-3 py-2">
                        <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                        <input
                            required={formData.serviceType === 'transfer'}
                            type="text"
                            className="bg-transparent border-none outline-none text-white w-full text-sm"
                            placeholder={formData.serviceType === 'hourly' ? "As Directed" : "Dropoff Address"}
                            value={formData.dropoff}
                            onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
                        />
                    </div>
                </div>

                <button type="submit" className="w-full bg-royal-gold hover:bg-royal-gold-hover text-black font-bold py-3 rounded transition-colors mt-4">
                    Create Booking
                </button>
            </form>
        </Modal>
    );
}
