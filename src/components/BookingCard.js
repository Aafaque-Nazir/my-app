"use client";

import { useState } from "react";
import { useFleet, useBookings } from "@/context/AppContext";
import { MapPin, Clock, User, CheckCircle, XCircle, CarFront, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BookingCard({ booking, onAssign }) {
    const { drivers } = useFleet();
    const { updateBookingStatus } = useBookings();
    const [copied, setCopied] = useState(false);

    const assignedDriver = drivers.find(d => d.id === booking.driverId);

    const handleCopy = () => {
        const text = `
*New Booking Request*
👤 *Guest:* ${booking.guest}
🕒 *Time:* ${booking.time}
🚗 *Vehicle:* ${booking.vehicle || 'Business Class'} ${booking.serviceType === 'hourly' ? `(${booking.duration})` : ''}
📍 *Pickup:* ${booking.pickup}
🏁 *Dropoff:* ${booking.dropoff}
${assignedDriver ? `👨‍✈️ *Driver:* ${assignedDriver.name} (${assignedDriver.car})` : ''}
        `.trim();

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const statusColors = {
        Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        Assigned: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        Completed: "bg-green-500/10 text-green-500 border-green-500/20",
        Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
        <div className="glass-panel p-5 rounded-xl mb-4 relative overflow-hidden group hover:border-royal-gold/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-white font-medium text-lg">{booking.guest}</h3>
                        <button
                            onClick={handleCopy}
                            className="text-text-muted hover:text-royal-gold transition-colors p-1 rounded-md hover:bg-white/5"
                            title="Copy Details"
                        >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        {booking.serviceType === 'hourly' ? (
                            <span className="text-xs bg-royal-gold text-dark-950 font-bold px-2 py-0.5 rounded border border-royal-gold">
                                {booking.duration} Hourly
                            </span>
                        ) : (
                            <span className="text-xs text-text-muted border border-white/10 px-2 py-0.5 rounded">
                                Transfer
                            </span>
                        )}
                        <span className="text-xs text-royal-gold font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {booking.time}
                        </span>
                    </div>
                </div>
                <span className={cn(
                    "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border",
                    statusColors[booking.status] || statusColors.Pending
                )}>
                    {booking.status}
                </span>
            </div>

            {/* Vehicle Info Row */}
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-300 bg-white/5 p-2 rounded">
                <CarFront className="w-4 h-4 text-royal-gold" />
                <span>{booking.vehicle || "Business Class"}</span>
                {booking.serviceType === 'hourly' && (
                    <span className="text-text-muted ml-auto text-xs">Duration: {booking.duration}</span>
                )}
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-6 relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />

                <div className="bg-dark-950/80 backdrop-blur px-3 py-1 rounded border border-white/5 relative z-10 w-fit">
                    <p className="text-xs text-text-muted uppercase mb-1">Pickup</p>
                    <div className="flex items-center text-sm text-white">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-text-muted" />
                        <span className="line-clamp-1">{booking.pickup}</span>
                    </div>
                </div>

                <div className="text-text-muted text-xs">➔</div>

                <div className="bg-dark-950/80 backdrop-blur px-3 py-1 rounded border border-white/5 relative z-10 w-fit justify-self-end">
                    <p className="text-xs text-text-muted uppercase mb-1 text-right">Drop-off</p>
                    <div className="flex items-center text-sm text-white justify-end">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-text-muted" />
                        <span className="line-clamp-1">{booking.dropoff}</span>
                    </div>
                </div>
            </div>

            {assignedDriver && (
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-royal-gold/20 flex items-center justify-center text-royal-gold">
                            <User className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{assignedDriver.name}</p>
                            <p className="text-xs text-text-muted">{assignedDriver.car} • {assignedDriver.plate}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
                {(booking.status === "Pending" || booking.status === "Assigned") && (
                    <button
                        onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                        className="p-2 text-text-muted hover:text-red-400 transition-colors"
                        title="Cancel Booking"
                    >
                        <XCircle className="w-5 h-5" />
                    </button>
                )}

                {booking.status === "Pending" && (
                    <button
                        onClick={() => onAssign(booking.id)}
                        className="flex items-center gap-2 bg-royal-gold text-dark-950 px-4 py-2 rounded-lg font-bold text-sm hover:bg-royal-gold-hover transition-colors"
                    >
                        <CarFront className="w-4 h-4" />
                        Assign Driver
                    </button>
                )}

                {booking.status === "Assigned" && (
                    <button
                        onClick={() => updateBookingStatus(booking.id, "Completed")}
                        className="flex items-center gap-2 bg-green-500/10 text-green-500 border border-green-500/20 px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-500/20 transition-colors"
                    >
                        <CheckCircle className="w-4 h-4" />
                        Complete Ride
                    </button>
                )}

                {(booking.status === "Completed" || booking.status === "Cancelled") && (
                    <span className="text-xs text-text-muted italic">Archived</span>
                )}
            </div>
        </div>
    );
}
