"use client";

import { useRef } from "react";
import Image from "next/image";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Users, Briefcase, Check } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleBackground from "@/components/ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

export default function PublicFleetPage() {
    const container = useRef();

    const fleetCategories = [
        {
            name: "First Class",
            models: "Mercedes-Benz S-Class, BMW 7 Series",
            image: "/images/mercedes_s_class_luxury_1767456712555.png",
            features: ["Heated/Cooled Massage Seats", "Rear Executive Lounge Console", "Burmester 3D Surround Sound", "Complimentary Wi-Fi & Refreshments"],
            maxPassengers: 3,
            maxLuggage: 3,
            price: "$120/hr",
            description: "The epitome of luxury. Experience unmatched comfort and sophistication for your most important journeys."
        },
        {
            name: "Business Class",
            models: "Mercedes-Benz E-Class, BMW 5 Series",
            image: "/images/mercedes_e_class_business_1767456737091.png",
            features: ["Late Model Vehicles (2024+)", "Premium Leather Interior", "Bottled Water & Mints", "USB-C Fast Charging Ports"],
            maxPassengers: 3,
            maxLuggage: 2,
            price: "$85/hr",
            description: "Efficiency meets elegance. Perfect for corporate travel and airport transfers where reliability is key."
        },
        {
            name: "Executive SUV",
            models: "Cadillac Escalade, Lincoln Navigator",
            image: "/images/cadillac_escalade_suv_1767456760945.png",
            features: ["Seating for up to 6 Passengers", "Ample Luggage Space for Ski/Golf", "Privacy Tint & Rear Climate Control", "Captain Chairs options available"],
            maxPassengers: 6,
            maxLuggage: 6,
            price: "$150/hr",
            description: "Spacious and commanding. The ideal choice for groups, families, or those requiring extra luggage capacity without compromising style."
        },
        {
            name: "Luxury Van",
            models: "Mercedes-Benz Sprinter JetVan",
            image: "/images/mercedes_sprinter_van_1767456780240.png",
            features: ["Standing Room Height", "Conference Style Seating", "Smart TV & Presentation Ready", "Ideal for Roadshows & Groups"],
            maxPassengers: 12,
            maxLuggage: 12,
            price: "$200/hr",
            description: "A mobile office or lounge. Designed for roadshows, event shuttles, and VIP group transport in absolute comfort."
        }
    ];

    useGSAP(() => {
        // Fleet Item Reveal
        const fleetItems = gsap.utils.toArray(".fleet-item");

        fleetItems.forEach((item, i) => {
            const img = item.querySelector(".fleet-img-wrapper");
            const content = item.querySelector(".fleet-content");
            const isEven = i % 2 === 0;

            gsap.from(img, {
                x: isEven ? -100 : 100,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                }
            });

            gsap.from(content, {
                x: isEven ? 50 : -50,
                opacity: 0,
                duration: 1.2,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                }
            });
        });

        // CTA Section reveal
        gsap.from(".custom-req-cta", {
            y: 60,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".custom-req-cta",
                start: "top 90%"
            }
        });

    }, { scope: container });

    return (
        <div ref={container} className="min-h-screen bg-[#050505] font-sans text-white relative selection:bg-royal-gold selection:text-black overflow-x-hidden">
            <PublicNavbar />

            {/* V3 BACKGROUND: Airy & Premium */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.05]">
                    <ParticleBackground />
                </div>
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
            </div>

            <main className="relative z-10 pt-40 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-32 text-center">
                        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-royal-gold/20 bg-royal-gold/5 text-[10px] font-bold uppercase tracking-[0.4em] text-royal-gold">
                            Elite Selection
                        </div>
                        <h1 className="page-title font-serif text-6xl md:text-9xl font-bold mb-8 tracking-tighter leading-none">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-b from-royal-gold to-royal-gold-light">Fleet</span>
                        </h1>
                        <p className="page-subtitle text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed tracking-wide">
                            Precision-engineered luxury for the uncompromising traveler.
                            Every vehicle is maintained to the highest royal standards.
                        </p>
                    </header>

                    {/* NEW Z-PATTERN LAYOUT */}
                    <div className="space-y-32 mb-32">
                        {fleetCategories.map((category, index) => (
                            <div
                                key={category.name}
                                className={`fleet-item flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Image Half */}
                                <div className="fleet-img-wrapper w-full md:w-1/2 relative aspect-[4/3] rounded-[2rem] overflow-hidden group shadow-2xl border border-white/10">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                    {/* Price Tag Floating */}
                                    <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-royal-gold/30 px-6 py-2 rounded-full">
                                        <span className="text-royal-gold font-bold text-lg">{category.price}</span>
                                    </div>
                                </div>

                                {/* Content Half */}
                                <div className="fleet-content w-full md:w-1/2 space-y-8">
                                    <div>
                                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">{category.name}</h2>
                                        <p className="text-royal-gold font-medium tracking-widest uppercase text-sm border-l-2 border-royal-gold pl-4 mb-6">
                                            {category.models}
                                        </p>
                                        <p className="text-gray-400 leading-relaxed text-lg font-light">
                                            {category.description}
                                        </p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="flex gap-8 border-y border-white/10 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-royal-gold">
                                                <Users size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Capacity</div>
                                                <div className="text-white font-bold">{category.maxPassengers} Pax</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-royal-gold">
                                                <Briefcase size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Luggage</div>
                                                <div className="text-white font-bold">{category.maxLuggage} Large</div>
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="grid grid-cols-1 gap-3">
                                        {category.features.map((feature) => (
                                            <li key={feature} className="flex items-center text-sm text-gray-300">
                                                <Check className="w-4 h-4 text-royal-gold mr-3 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="px-10 py-4 bg-royal-gold text-dark-950 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-colors duration-300 mt-4">
                                        Reserve Vehicle
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="custom-req-cta relative p-12 md:p-20 rounded-[3rem] bg-white/[0.03] border border-white/10 overflow-hidden text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-royal-gold/50 to-transparent" />
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Bespoke Requests</h2>
                            <p className="text-lg md:text-xl text-gray-400 font-light mb-12 leading-relaxed">
                                Our fleet is ever-expanding. For large groups, specialized secure transport, or exotic requests, our concierge team is at your immediate disposal.
                            </p>
                            <a href="/contact" className="inline-block px-12 py-5 rounded-full border border-royal-gold text-royal-gold font-bold uppercase tracking-[0.2em] text-xs hover:bg-royal-gold hover:text-dark-950 transition-all duration-500">
                                Contact Private Concierge
                            </a>
                        </div>
                        {/* Subtle background element */}
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-royal-gold/5 rounded-full blur-3xl" />
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
