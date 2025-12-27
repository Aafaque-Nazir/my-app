"use client";

import { createContext, useContext, useEffect, useState } from "react";

// --- defaults ---
const defaultDrivers = [
    { id: 1, name: "Michael Caine", car: "Mercedes S-Class", plate: "ROYAL-01", phone: "555-0101", avatar: "/avatars/michael.png" },
    { id: 2, name: "Jason Statham", car: "Cadillac Escalade", plate: "ROYAL-02", phone: "555-0102", avatar: "/avatars/jason.png" },
    { id: 3, name: "Sarah Connor", car: "Mercedes Sprinter", plate: "ROYAL-03", phone: "555-0103", avatar: "/avatars/sarah.png" },
    { id: 4, name: "John Wick", car: "BMW 7 Series", plate: "ROYAL-04", phone: "555-0104", avatar: "/avatars/john.png" },
    { id: 5, name: "Frank Martin", car: "BMW 5 Series", plate: "ROYAL-05", phone: "555-0105", avatar: "/avatars/frank.png" },
];

const defaultBookings = [
    { id: 101, guest: "Mr. Wick", pickup: "Continental Hotel", dropoff: "High Table HQ", time: "14:00", status: "Completed", driverId: 1 },
    { id: 102, guest: "Tony Stark", pickup: "Stark Tower", dropoff: "Airport", time: "16:30", status: "Pending", driverId: null },
];

// --- Contexts ---
const AuthContext = createContext();
const FleetContext = createContext();
const BookingContext = createContext();

export function AppProvider({ children }) {
    // -- Auth State --
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("royal_user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setAuthLoading(false);
    }, []);

    const login = (email) => {
        const user = { email, role: "admin" };
        setUser(user);
        localStorage.setItem("royal_user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("royal_user");
    };

    // -- Fleet State --
    const [drivers, setDrivers] = useState(defaultDrivers);

    useEffect(() => {
        const stored = localStorage.getItem("royal_drivers");
        if (stored) setDrivers(JSON.parse(stored));
    }, []);

    const addDriver = (driver) => {
        const newDrivers = [...drivers, { ...driver, id: Date.now() }];
        setDrivers(newDrivers);
        localStorage.setItem("royal_drivers", JSON.stringify(newDrivers));
    };

    const removeDriver = (id) => {
        const newDrivers = drivers.filter(d => d.id !== id);
        setDrivers(newDrivers);
        localStorage.setItem("royal_drivers", JSON.stringify(newDrivers));
    };

    // -- Booking State --
    const [bookings, setBookings] = useState(defaultBookings);

    useEffect(() => {
        const stored = localStorage.getItem("royal_bookings");
        if (stored) setBookings(JSON.parse(stored));

        // Listen for changes in other tabs
        const handleStorageChange = (e) => {
            if (e.key === "royal_bookings") {
                setBookings(JSON.parse(e.newValue));
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const addBooking = (booking) => {
        const newBooking = { ...booking, id: Date.now(), status: "Pending", driverId: null };
        const newBookings = [newBooking, ...bookings];
        setBookings(newBookings);
        localStorage.setItem("royal_bookings", JSON.stringify(newBookings));
    };

    const updateBookingStatus = (id, status, driverId = null) => {
        const newBookings = bookings.map(b =>
            b.id === id ? { ...b, status, ...(driverId ? { driverId } : {}) } : b
        );
        setBookings(newBookings);
        localStorage.setItem("royal_bookings", JSON.stringify(newBookings));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, authLoading }}>
            <FleetContext.Provider value={{ drivers, addDriver, removeDriver }}>
                <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus }}>
                    {children}
                </BookingContext.Provider>
            </FleetContext.Provider>
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export const useFleet = () => useContext(FleetContext);
export const useBookings = () => useContext(BookingContext);
