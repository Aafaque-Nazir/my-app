"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PublicNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "The Fleet", href: "/our-fleet" },
        { name: "Concierge", href: "/contact" },
    ];

    return (
        <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
            {/* Gradient Border Line */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <Shield className="w-8 h-8 text-royal-gold mr-3" />
                            <span className="font-outfit font-bold text-xl tracking-widest text-white">ROYAL<span className="text-royal-gold">CAR</span></span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-300 hover:text-royal-gold transition-colors uppercase tracking-widest"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/admin" className="px-4 py-2 rounded border border-white/10 text-xs font-medium text-royal-gold hover:bg-royal-gold hover:text-dark-950 transition-all uppercase tracking-widest">
                                Staff Login
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X className="block w-6 h-6" /> : <Menu className="block w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={cn("md:hidden bg-dark-950 border-b border-white/5 absolute w-full transition-all duration-300 ease-in-out overflow-hidden", isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-4 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 border-b border-white/5 uppercase tracking-widest text-center"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-4 rounded-md text-base font-medium text-royal-gold hover:bg-royal-gold/10 uppercase tracking-widest text-center mt-2"
                    >
                        Staff Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
