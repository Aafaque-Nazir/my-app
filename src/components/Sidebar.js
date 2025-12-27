"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AppContext";
import { LayoutGrid, Car, LogOut, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dispatcher", href: "/dashboard", icon: LayoutGrid },
    { name: "Fleet Assets", href: "/fleet", icon: Car },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    return (
        <aside className="w-64 h-screen bg-dark-950 border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
            {/* Header */}
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <Shield className="w-6 h-6 text-royal-gold mr-3" />
                <span className="font-outfit font-bold text-lg tracking-wide text-white">ROYAL<span className="text-royal-gold">CAR</span></span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-royal-gold/10 text-royal-gold"
                                    : "text-text-muted hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-royal-gold" : "text-text-muted group-hover:text-white")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-white/5 bg-dark-900/50">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-royal-gold/20 flex items-center justify-center text-royal-gold font-bold text-xs border border-royal-gold/30">
                            A
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">{user?.email || "Admin"}</p>
                            <p className="text-xs text-text-muted">Concierge</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center px-4 py-2 text-xs font-medium text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-md transition-colors"
                >
                    <LogOut className="w-3.5 h-3.5 mr-2" />
                    End Session
                </button>
            </div>
        </aside>
    );
}
