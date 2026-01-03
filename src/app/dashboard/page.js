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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    // ... (existing code)

    return (
        <div className="min-h-screen bg-dark-950 md:pl-64 transition-all duration-300">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="p-4 md:p-8">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between mb-6">
                    <h1 className="text-xl font-light text-white">ROYAL<span className="text-royal-gold">CAR</span></h1>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-white hover:bg-white/10 rounded-lg"
                    >
                        <LayoutDashboard className="w-6 h-6" />
                    </button>
                </div>

                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif text-white flex items-center gap-4">
                            Console <span className="text-royal-gold/50 font-sans font-light">|</span> <span className="text-white/80">Overview</span>
                            {currentTime && <span className="hidden md:inline text-lg font-mono text-royal-gold/60 border-l border-white/10 pl-4 tracking-widest">{currentTime}</span>}
                        </h1>
                        <p className="text-text-muted text-sm mt-2 uppercase tracking-widest pl-1">Today's Dispatch Activity</p>
                    </div>
                    <button
                        onClick={() => setIsNewBookingOpen(true)}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-royal-gold text-dark-950 px-5 py-2.5 rounded-lg font-bold hover:bg-royal-gold-hover transition-colors shadow-lg shadow-royal-gold/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Booking
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <LayoutDashboard className="w-24 h-24 text-royal-gold" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-royal-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">Active Fleet</p>
                            <p className="text-5xl font-serif text-white">{activeBookings}</p>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-royal-gold to-transparent mt-4" />
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clock className="w-24 h-24 text-royal-gold-light" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-royal-gold-light text-xs font-bold uppercase tracking-[0.2em] mb-2">Pending</p>
                            <p className="text-5xl font-serif text-white">{pendingCount}</p>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-royal-gold-light to-transparent mt-4" />
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CheckCircle className="w-24 h-24 text-green-500" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-green-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Completed</p>
                            <p className="text-5xl font-serif text-white">{completedToday}</p>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-green-500 to-transparent mt-4" />
                        </div>
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
