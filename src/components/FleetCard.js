"use client";

import { useRef } from "react";
import Image from "next/image";
import { Users, Briefcase, Check } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FleetCard({ category, index }) {
    const container = useRef(null);
    const isEven = index % 2 === 0;

    useGSAP(() => {
        const img = container.current.querySelector(".fleet-img-wrapper");
        const content = container.current.querySelector(".fleet-content");

        gsap.from(img, {
            x: isEven ? -100 : 100,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container.current,
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
                trigger: container.current,
                start: "top 80%",
            }
        });

    }, { scope: container });

    return (
        <div
            ref={container}
            className={`fleet-item flex flex-col md:flex-row items-center gap-12 md:gap-24 ${!isEven ? 'md:flex-row-reverse' : ''}`}
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

                <button className="px-8 py-4 bg-royal-gold text-black font-bold uppercase tracking-widest text-xs text-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 mt-4 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    Reserve Vehicle
                </button>
            </div>
        </div>
    );
}
