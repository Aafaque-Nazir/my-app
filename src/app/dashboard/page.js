"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import BookingCard from "@/components/BookingCard";
import NewBookingModal from "@/components/NewBookingModal";
import AssignDriverModal from "@/components/AssignDriverModal";
import { useBookings, useAuth } from "@/context/AppContext";
import { Plus, LayoutDashboard, Clock, CheckCircle, Loader2 } from "lucide-react";

export default function DashboardPage() {
    const { user, authLoading } = useAuth();
    const router = useRouter();
    const { bookings } = useBookings();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/admin");
        }
    }, [user, authLoading, router]);

    const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
    const [assignBookingId, setAssignBookingId] = useState(null);
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Stats
    // Filter for display: Show pending/assigned first.
    const activeBookings = bookings.filter(b => b.status === "Pending" || b.status === "Assigned").length;
    const completedToday = bookings.filter(b => b.status === "Completed").length;
    const pendingCount = bookings.filter(b => b.status === "Pending").length;

    // Sorting: Pending first, then Assigned, then Completed/Cancelled
    const sortedBookings = [...bookings].sort((a, b) => {
        const statusOrder = { Pending: 0, Assigned: 1, Completed: 2, Cancelled: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
    });

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
                        <h1 className="text-2xl font-light text-white flex items-center gap-3">
                            Console <span className="text-text-muted">Overview</span>
                            {currentTime && <span className="text-xl font-mono text-royal-gold/60 border-l border-white/10 pl-3">{currentTime}</span>}
                        </h1>
                        <p className="text-text-muted text-sm mt-1">Today's Dispatch Activity</p>
                    </div>
                    <button
                        onClick={() => setIsNewBookingOpen(true)}
                        className="flex items-center gap-2 bg-royal-gold text-dark-950 px-5 py-2.5 rounded-lg font-bold hover:bg-royal-gold-hover transition-colors shadow-lg shadow-royal-gold/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Booking
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="glass-panel p-5 rounded-xl border-l-4 border-l-royal-gold">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-text-muted uppercase text-xs tracking-wider">Active Rides</p>
                            <LayoutDashboard className="w-4 h-4 text-royal-gold" />
                        </div>
                        <p className="text-3xl font-bold text-white">{activeBookings}</p>
                    </div>
                    <div className="glass-panel p-5 rounded-xl border-l-4 border-l-yellow-500">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-text-muted uppercase text-xs tracking-wider">Pending Assignment</p>
                            <Clock className="w-4 h-4 text-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold text-white">{pendingCount}</p>
                    </div>
                    <div className="glass-panel p-5 rounded-xl border-l-4 border-l-green-500">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-text-muted uppercase text-xs tracking-wider">Completed Today</p>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-white">{completedToday}</p>
                    </div>
                </div>

                {/* The Board */}
                <div>
                    <h2 className="text-white text-lg font-light mb-4">The Board</h2>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {sortedBookings.map(booking => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onAssign={(id) => setAssignBookingId(id)}
                            />
                        ))}
                        {sortedBookings.length === 0 && (
                            <div className="col-span-full py-20 text-center text-text-muted glass-panel rounded-xl border-dashed">
                                <p>No bookings for today.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modals */}
            <NewBookingModal
                isOpen={isNewBookingOpen}
                onClose={() => setIsNewBookingOpen(false)}
            />

            <AssignDriverModal
                isOpen={!!assignBookingId}
                onClose={() => setAssignBookingId(null)}
                bookingId={assignBookingId}
            />
        </div>
    );
}
