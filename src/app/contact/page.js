"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Check, Phone, Mail, AlertCircle, Loader2, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookings } from "@/context/AppContext";
import ParticleBackground from "@/components/ParticleBackground";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ContactPage() {
    const container = useRef();
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // GSAP Animation
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".contact-content", {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(".contact-form-card", {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");
    }, { scope: container });

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            serviceType: "transfer"
        }
    });
    const { addBooking } = useBookings();
    const serviceType = watch("serviceType");

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            // 1. Add to Admin Panel (Internal Simulation)
            addBooking({
                guest: data.name,
                pickup: data.pickup,
                dropoff: data.dropoff || "As Directed",
                vehicle: data.vehicle,
                serviceType: data.serviceType,
                duration: data.serviceType === "hourly" ? `${data.duration} Hours` : "N/A",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                phone: data.phone,
                source: "Website"
            });

            // 2. Send Email via Formsubmit (AJAX)
            const response = await fetch("https://formsubmit.co/ajax/aafaquebuisness@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New ${data.serviceType === "hourly" ? "Hourly" : "Transfer"} Booking: ${data.vehicle}`,
                    name: data.name,
                    phone: data.phone,
                    vehicle: data.vehicle,
                    service_type: data.serviceType,
                    duration: data.serviceType === "hourly" ? `${data.duration} Hours` : "N/A",
                    pickup: data.pickup,
                    dropoff: data.dropoff || "As Directed",
                    _captcha: "false",
                    _template: "table"
                })
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                console.error("Email submission failed");
                setSubmitted(true); // Still show success to user for UX in this demo
            }

        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div ref={container} className="min-h-screen bg-dark-950 font-sans text-white selection:bg-royal-gold selection:text-black overflow-x-hidden">
            <PublicNavbar />

            {/* Background Particles - Lower opacity and confined */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <ParticleBackground />
            </div>

            <main className="relative z-10 pt-32 pb-20 flex flex-col justify-center min-h-[90vh]">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* Left Side: Content */}
                        <div className="contact-content space-y-12 lg:pt-10">
                            <div>
                                <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Concierge <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-gold via-yellow-200 to-royal-gold">Booking</span></h1>
                                <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                                    Ready to experience the extraordinary? Fill out the details, and our concierge will handle the rest. We prefer a personal touch, so expect a prompt call or message to finalize your itinerary.
                                </p>
                            </div>

                            <div className="grid gap-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-900/80 border border-white/10 flex items-center justify-center text-royal-gold group-hover:scale-110 group-hover:border-royal-gold/50 transition-all duration-300 shadow-lg">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-royal-gold tracking-widest font-bold mb-1">24/7 Dispatch</p>
                                        <p className="text-xl font-medium text-white group-hover:translate-x-2 transition-transform duration-300">+1 (800) ROYAL-00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-900/80 border border-white/10 flex items-center justify-center text-royal-gold group-hover:scale-110 group-hover:border-royal-gold/50 transition-all duration-300 shadow-lg">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-royal-gold tracking-widest font-bold mb-1">Email Requests</p>
                                        <p className="text-xl font-medium text-white group-hover:translate-x-2 transition-transform duration-300">concierge@royal-car.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-900/80 border border-white/10 flex items-center justify-center text-royal-gold group-hover:scale-110 group-hover:border-royal-gold/50 transition-all duration-300 shadow-lg">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-royal-gold tracking-widest font-bold mb-1">Headquarters</p>
                                        <p className="text-xl font-medium text-white group-hover:translate-x-2 transition-transform duration-300">123 Luxury Lane, NY</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form Card */}
                        <div className="contact-form-card bg-zinc-900/90 backdrop-blur-3xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">

                            {/* Decorative Glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-royal-gold/5 rounded-full blur-3xl pointer-events-none" />

                            {!submitted ? (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                                    <h3 className="text-2xl font-serif font-bold text-white mb-6">Request a <span className="text-royal-gold">Ride</span></h3>

                                    {/* Service Type Selection */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className={cn("cursor-pointer border rounded-xl p-4 text-center transition-all duration-300 relative overflow-hidden group", serviceType === "transfer" ? "border-royal-gold bg-royal-gold/10" : "border-white/10 bg-black/20 hover:border-royal-gold/30")}>
                                            <input type="radio" value="transfer" {...register("serviceType")} className="hidden" />
                                            <span className={cn("block text-sm uppercase tracking-widest font-bold mb-1", serviceType === "transfer" ? "text-royal-gold" : "text-gray-400 group-hover:text-gray-200")}>Transfer</span>
                                            <span className="text-xs text-gray-500 font-normal">Point to Point</span>
                                            {serviceType === "transfer" && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-royal-gold shadow-[0_0_10px_#D4AF37]" />}
                                        </label>
                                        <label className={cn("cursor-pointer border rounded-xl p-4 text-center transition-all duration-300 relative overflow-hidden group", serviceType === "hourly" ? "border-royal-gold bg-royal-gold/10" : "border-white/10 bg-black/20 hover:border-royal-gold/30")}>
                                            <input type="radio" value="hourly" {...register("serviceType")} className="hidden" />
                                            <span className={cn("block text-sm uppercase tracking-widest font-bold mb-1", serviceType === "hourly" ? "text-royal-gold" : "text-gray-400 group-hover:text-gray-200")}>Hourly</span>
                                            <span className="text-xs text-gray-500 font-normal">By the Hour</span>
                                            {serviceType === "hourly" && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-royal-gold shadow-[0_0_10px_#D4AF37]" />}
                                        </label>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase text-royal-gold tracking-widest font-bold">Your Name</label>
                                            <input
                                                {...register("name", { required: "Name is required" })}
                                                className={cn("w-full bg-black/40 border rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all duration-300 placeholder:text-gray-700", errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold focus:bg-black/60 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]")}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.name.message}</span>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase text-royal-gold tracking-widest font-bold">Phone Number</label>
                                            <input
                                                {...register("phone", {
                                                    required: "Phone number is required",
                                                    pattern: { value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, message: "Invalid phone number" }
                                                })}
                                                className={cn("w-full bg-black/40 border rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all duration-300 placeholder:text-gray-700", errors.phone ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold focus:bg-black/60 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]")}
                                                placeholder="+1 (555) 000-0000"
                                            />
                                            {errors.phone && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.phone.message}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs uppercase text-royal-gold tracking-widest font-bold">Vehicle Class</label>
                                        <select
                                            {...register("vehicle", { required: "Please select a vehicle" })}
                                            className={cn("w-full bg-black/40 border rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all duration-300 appearance-none", errors.vehicle ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold focus:bg-black/60")}
                                        >
                                            <option value="" className="bg-dark-900 text-gray-500">Select Distinction</option>
                                            <option value="First Class" className="bg-dark-900">First Class (S-Class/7 Series)</option>
                                            <option value="Business Class" className="bg-dark-900">Business Class (E-Class/5 Series)</option>
                                            <option value="Executive SUV" className="bg-dark-900">Executive SUV (Escalade/Navigator)</option>
                                            <option value="Luxury Van" className="bg-dark-900">Luxury Van (Sprinter)</option>
                                        </select>
                                        {errors.vehicle && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.vehicle.message}</span>}
                                    </div>

                                    {/* Hourly Specific Field */}
                                    {serviceType === "hourly" && (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
                                            <label className="block text-xs uppercase text-royal-gold tracking-widest font-bold">Duration</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <select
                                                    {...register("duration", { required: "Please select duration" })}
                                                    className={cn("w-full bg-black/40 border rounded-xl pl-10 pr-4 py-3.5 text-white focus:outline-none transition-all duration-300 appearance-none", errors.duration ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold focus:bg-black/60")}
                                                >
                                                    <option value="" className="bg-dark-900">Select Hours</option>
                                                    <option value="3" className="bg-dark-900">3 Hours</option>
                                                    <option value="4" className="bg-dark-900">4 Hours</option>
                                                    <option value="5" className="bg-dark-900">5 Hours</option>
                                                    <option value="6" className="bg-dark-900">6 Hours</option>
                                                    <option value="8" className="bg-dark-900">8 Hours (Full Day)</option>
                                                    <option value="12" className="bg-dark-900">12 Hours</option>
                                                    <option value="24" className="bg-dark-900">24 Hours</option>
                                                </select>
                                            </div>
                                            {errors.duration && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.duration.message}</span>}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="block text-xs uppercase text-royal-gold tracking-widest font-bold">Pickup Location</label>
                                        <input
                                            {...register("pickup", { required: "Pickup location is required" })}
                                            className={cn("w-full bg-black/40 border rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all duration-300 placeholder:text-gray-700", errors.pickup ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold focus:bg-black/60 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]")}
                                            placeholder="e.g. JFK Airport Terminal 4"
                                        />
                                        {errors.pickup && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.pickup.message}</span>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs uppercase text-royal-gold tracking-widest font-bold">Dropoff Location {serviceType === "hourly" && <span className="text-gray-500 lowercase font-normal ml-1">(optional)</span>}</label>
                                        <input
                                            {...register("dropoff", { required: serviceType === "transfer" ? "Dropoff location is required" : false })}
                                            className={cn("w-full bg-black/40 border rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all duration-300 placeholder:text-gray-700", errors.dropoff ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold focus:bg-black/60 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]")}
                                            placeholder={serviceType === "hourly" ? "e.g. As Directed" : "e.g. The Plaza Hotel"}
                                        />
                                        {errors.dropoff && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.dropoff.message}</span>}
                                    </div>

                                    <button disabled={isSubmitting} type="submit" className="w-full bg-royal-gold hover:bg-white text-dark-950 hover:text-dark-950 font-black tracking-[0.2em] uppercase py-5 rounded-xl transition-all duration-300 shadow-[0_5px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_5px_25px_rgba(255,255,255,0.4)] mt-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-3 animate-spin" /> Processing Request
                                            </>
                                        ) : (
                                            "Confirm Booking"
                                        )}
                                    </button>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 text-center mt-4">Priority Concierge Response Time: &lt; 5 minutes</p>
                                </form>
                            ) : (
                                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-green-500/5 rounded-3xl border border-green-500/20 animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-8 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                        <Check className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-white mb-4">Request <span className="text-green-500">Confirmed</span></h3>
                                    <p className="text-gray-300 mb-8 max-w-xs mx-auto leading-relaxed">
                                        Your itinerary has been sent to our concierge desk. We are reviewing the details now.
                                    </p>
                                    <div className="p-4 bg-black/40 rounded-xl border border-white/10 text-xs text-gray-400 max-w-xs mx-auto mb-8">
                                        <p>You will receive a quote and confirmation call within 5-10 minutes.</p>
                                    </div>
                                    <button onClick={() => setSubmitted(false)} className="text-xs text-royal-gold hover:text-white underline tracking-widest uppercase transition-colors">
                                        Start new request
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
