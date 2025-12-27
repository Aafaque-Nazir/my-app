"use client";

import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Check, Users, Briefcase } from "lucide-react";

export default function PublicFleetPage() {
    const fleetCategories = [
        {
            name: "First Class",
            models: "Mercedes-Benz S-Class, BMW 7 Series",
            image: "bg-dark-900", // Placeholder for image
            features: ["Heated/Cooled Massage Seats", "Rear Executive Lounge Console", "Burmester 3D Surround Sound", "Complimentary Wi-Fi & Refreshments"],
            maxPassengers: 3,
            maxLuggage: 3,
            price: "$120/hr"
        },
        {
            name: "Business Class",
            models: "Mercedes-Benz E-Class, BMW 5 Series",
            image: "bg-dark-900",
            features: ["Late Model Vehicles (2024+)", "Premium Leather Interior", "Bottled Water & Mints", "USB-C Fast Charging Ports"],
            maxPassengers: 3,
            maxLuggage: 2,
            price: "$85/hr"
        },
        {
            name: "Executive SUV",
            models: "Cadillac Escalade, Lincoln Navigator",
            image: "bg-dark-900",
            features: ["Seating for up to 6 Passengers", "Ample Luggage Space for Ski/Golf", "Privacy Tint & Rear Climate Control", "Captain Chairs options available"],
            maxPassengers: 6,
            maxLuggage: 6,
            price: "$150/hr"
        },
        {
            name: "Luxury Van",
            models: "Mercedes-Benz Sprinter JetVan",
            image: "bg-dark-900",
            features: ["Standing Room Height", "Conference Style Seating", "Smart TV & Presentation Ready", "Ideal for Roadshows & Groups"],
            maxPassengers: 12,
            maxLuggage: 12,
            price: "$200/hr"
        }
    ];

    return (
        <div className="min-h-screen bg-dark-950 font-sans text-white">
            <PublicNavbar />

            <main className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-16 text-center">
                        <h1 className="font-outfit text-4xl md:text-5xl font-bold mb-4">The <span className="text-royal-gold">Fleet</span></h1>
                        <p className="text-text-muted max-w-2xl mx-auto text-lg">
                            Immaculately maintained vehicles equipped with the finest amenities for your comfort.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-3 gap-8">
                        {fleetCategories.map((category) => (
                            <div key={category.name} className="glass-panel rounded-xl overflow-hidden hover:border-royal-gold/30 transition-colors group">
                                <div className="h-48 bg-gradient-to-br from-dark-800 to-black w-full flex items-center justify-center text-dark-700">
                                    {/* Placeholder for real car image */}
                                    <span className="text-sm uppercase tracking-widest">{category.name} Image</span>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                                        <div className="text-right">
                                            <span className="block text-royal-gold font-bold text-lg">{category.price}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3 text-xs text-text-muted mb-4">
                                        <div className="flex items-center" title="Max Passengers">
                                            <Users className="w-4 h-4 mr-1 text-royal-gold" /> {category.maxPassengers}
                                        </div>
                                        <div className="flex items-center" title="Max Luggage">
                                            <Briefcase className="w-4 h-4 mr-1 text-royal-gold" /> {category.maxLuggage}
                                        </div>
                                    </div>
                                    <p className="text-royal-gold text-sm font-medium mb-6">{category.models}</p>

                                    <ul className="space-y-3">
                                        {category.features.map(feature => (
                                            <li key={feature} className="flex items-center text-sm text-gray-300">
                                                <Check className="w-4 h-4 text-royal-gold mr-3 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center p-8 bg-royal-gold/5 rounded-xl border border-royal-gold/10">
                        <h3 className="text-xl font-bold text-white mb-2">Specific Requirements?</h3>
                        <p className="text-text-muted mb-6 max-w-xl mx-auto">
                            We can arrange specialized vehicles including Sprinter Vans, Minibuses, and exotics upon request.
                        </p>
                        <a href="/contact" className="px-6 py-3 bg-royal-gold text-dark-950 font-bold rounded hover:bg-royal-gold-hover transition-colors">
                            Contact Concierge
                        </a>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
