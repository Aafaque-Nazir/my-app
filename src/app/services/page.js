"use client";

import { useRef } from "react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { ShieldCheck, Clock, Star, MapPin, Briefcase } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleBackground from "@/components/ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
    const container = useRef();

    const services = [
        {
            icon: Clock,
            title: "Hourly Charter",
            description: "Enjoy the freedom of having a dedicated chauffeur at your disposal. Perfect for back-to-back meetings, shopping trips, or exploring the city at your own pace.",
            features: [
                { icon: Briefcase, text: "As Directed Service" },
                { icon: Star, text: "Flexible Routing" }
            ]
        },
        {
            icon: Star,
            title: "Event Transportation",
            description: "Make an entrance at galas, weddings, and corporate events. We coordinate logistics for groups of any size, ensuring stylish and punctual arrival.",
            features: [
                { icon: ShieldCheck, text: "On-site Coordinators" },
                { icon: Star, text: "Red Carpet Service" }
            ]
        },
        {
            icon: Briefcase,
            title: "Corporate Travel",
            description: "Streamlined travel solutions for business executives. We prioritize discretion, efficiency, and comfort, allowing you to work on the go.",
            features: [
                { icon: ShieldCheck, text: "Confidentiality Agreements" },
                { icon: Clock, text: "Priority Booking" }
            ]
        },
        {
            icon: MapPin,
            title: "Airport Transfers",
            description: "Reliable and luxurious airport pickups and drop-offs. We track your flight status to ensure we are there when you land.",
            features: [
                { icon: ShieldCheck, text: "Flight Tracking" },
                { icon: Clock, text: "Meet & Greet" }
            ]
        }
    ];

    useGSAP(() => {
        const tl = gsap.timeline();

        // Header Animation
        tl.from(".page-title", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
            .from(".page-subtitle", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");

        // Service Cards Stagger
        gsap.from(".service-card", {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 85%"
            }
        });

        // Standard Section
        gsap.from(".standard-section", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".standard-section",
                start: "top 80%"
            }
        });

        // Features Stagger
        gsap.from(".standard-feature", {
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".standard-features-grid",
                start: "top 85%"
            }
        });

    }, { scope: container });

    return (
        <div ref={container} className="min-h-screen bg-dark-950 font-sans text-white relative selection:bg-royal-gold selection:text-black">
            <PublicNavbar />

            {/* Background Particles - Lower opacity and confined */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <ParticleBackground />
            </div>

            <main className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-20 text-center">
                        <h1 className="page-title font-serif text-5xl md:text-7xl font-bold mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-gold via-yellow-200 to-royal-gold">Services</span>
                        </h1>
                        <p className="page-subtitle text-text-muted max-w-2xl mx-auto text-lg md:text-xl font-light">
                            Whether you require a seamless airport transfer, a full-day charter, or event transportation, Royal Car delivers excellence in every mile.
                        </p>
                    </header>

                    <div className="services-grid grid md:grid-cols-2 gap-8 md:gap-12">
                        {services.map((service, index) => (
                            <div key={index} className="service-card bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-2xl flex gap-6 items-start border border-white/10 hover:border-royal-gold transition-all duration-500 hover:bg-white/10 group shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                                <service.icon className="w-12 h-12 text-royal-gold shrink-0 group-hover:scale-110 transition-transform duration-500" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-3 font-serif">{service.title}</h3>
                                    <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <feature.icon className="w-4 h-4 mr-3 text-royal-gold" />
                                                {feature.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* The Royal Standard Section */}
                    <div className="standard-section mt-32 bg-gradient-to-b from-dark-900 to-black rounded-3xl p-12 md:p-16 relative overflow-hidden border border-white/5 shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent opacity-50" />
                        {/* Decorative Glow */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-royal-gold/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="text-center max-w-4xl mx-auto relative z-10">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">The Royal <span className="text-royal-gold">Standard</span></h2>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 font-light">
                                Our chauffeurs are more than just drivers; they are trained concierge professionals.
                                Vetted through a rigorous background check and trained in defensive driving, etiquette, and city navigation,
                                they ensure your safety and comfort are paramount.
                            </p>
                            <div className="standard-features-grid grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
                                <div className="standard-feature">
                                    <h4 className="font-bold text-white mb-3 flex items-center text-xl font-serif"><ShieldCheck className="w-6 h-6 text-royal-gold mr-3" /> Vetted & Trained</h4>
                                    <p className="text-sm text-text-muted leading-relaxed">Rigorous background checks and continuous verified training modules ensures only the elite drive for you.</p>
                                </div>
                                <div className="standard-feature">
                                    <h4 className="font-bold text-white mb-3 flex items-center text-xl font-serif"><MapPin className="w-6 h-6 text-royal-gold mr-3" /> Local Experts</h4>
                                    <p className="text-sm text-text-muted leading-relaxed">Extensive knowledge of local routes, hotels, and dining hotspots. Ask them for recommendations.</p>
                                </div>
                                <div className="standard-feature">
                                    <h4 className="font-bold text-white mb-3 flex items-center text-xl font-serif"><Clock className="w-6 h-6 text-royal-gold mr-3" /> Always Early</h4>
                                    <p className="text-sm text-text-muted leading-relaxed">We abide by the 15-minute rule. We are on site 15 minutes before your scheduled pickup time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
