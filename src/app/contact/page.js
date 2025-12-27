"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Check, Phone, Mail, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookings } from "@/context/AppContext";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
                setSubmitted(true);
            }

        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-950 font-sans text-white selection:bg-royal-gold selection:text-black">
            <PublicNavbar />

            <main className="pt-24 pb-12 flex flex-col justify-center min-h-[90vh]">
                <div className="max-w-6xl mx-auto px-6 w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="font-outfit text-4xl md:text-5xl font-bold mb-6">Concierge <span className="text-royal-gold">Booking</span></h1>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                Ready to experience the extraordinary? Fill out the details, and our concierge will handle the rest. We prefer a personal touch, so expect a prompt call or message to finalize your itinerary.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center text-royal-gold">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-text-muted tracking-wider">24/7 Dispatch</p>
                                        <p className="text-lg font-medium text-white">+1 (800) ROYAL-00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center text-royal-gold">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-text-muted tracking-wider">Email Requests</p>
                                        <p className="text-lg font-medium text-white">aafaquebuisness@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="glass-panel p-8 md:p-10 rounded-2xl relative shadow-2xl">
                            {!submitted ? (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <h3 className="text-xl font-bold text-white mb-2">Request a Ride</h3>

                                    {/* Service Type Selection */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <label className={cn("cursor-pointer border rounded-lg p-3 text-center transition-all", serviceType === "transfer" ? "bg-royal-gold text-dark-950 border-royal-gold font-bold" : "bg-dark-900 border-white/10 text-gray-400 hover:border-royal-gold/50")}>
                                            <input type="radio" value="transfer" {...register("serviceType")} className="hidden" />
                                            <span className="block text-sm uppercase tracking-wider">Transfer</span>
                                            <span className="text-xs opacity-70 font-normal">Point to Point</span>
                                        </label>
                                        <label className={cn("cursor-pointer border rounded-lg p-3 text-center transition-all", serviceType === "hourly" ? "bg-royal-gold text-dark-950 border-royal-gold font-bold" : "bg-dark-900 border-white/10 text-gray-400 hover:border-royal-gold/50")}>
                                            <input type="radio" value="hourly" {...register("serviceType")} className="hidden" />
                                            <span className="block text-sm uppercase tracking-wider">Hourly</span>
                                            <span className="text-xs opacity-70 font-normal">By the Hour</span>
                                        </label>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs uppercase text-text-muted mb-1">Your Name</label>
                                        <input
                                            {...register("name", { required: "Name is required" })}
                                            className={cn("w-full bg-dark-950 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors", errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold")}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.name.message}</span>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs uppercase text-text-muted mb-1">Phone Number</label>
                                        <input
                                            {...register("phone", {
                                                required: "Phone number is required",
                                                pattern: { value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, message: "Invalid phone number" }
                                            })}
                                            className={cn("w-full bg-dark-950 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors", errors.phone ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold")}
                                            placeholder="+91 91234 56789"
                                        />
                                        {errors.phone && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.phone.message}</span>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs uppercase text-text-muted mb-1">Vehicle Preference</label>
                                        <select
                                            {...register("vehicle", { required: "Please select a vehicle" })}
                                            className={cn("w-full bg-dark-950 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors appearance-none", errors.vehicle ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold")}
                                        >
                                            <option value="">Select a Vehicle Class</option>
                                            <option value="First Class">First Class (S-Class/7 Series)</option>
                                            <option value="Business Class">Business Class (E-Class/5 Series)</option>
                                            <option value="Executive SUV">Executive SUV (Escalade/Navigator)</option>
                                            <option value="Luxury Van">Luxury Van (Sprinter)</option>
                                        </select>
                                        {errors.vehicle && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.vehicle.message}</span>}
                                    </div>

                                    {/* Hourly Specific Field */}
                                    {serviceType === "hourly" && (
                                        <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
                                            <label className="block text-xs uppercase text-text-muted mb-1">Duration (Hours)</label>
                                            <select
                                                {...register("duration", { required: "Please select duration" })}
                                                className={cn("w-full bg-dark-950 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors appearance-none", errors.duration ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold")}
                                            >
                                                <option value="">Select Duration</option>
                                                <option value="3">3 Hours</option>
                                                <option value="4">4 Hours</option>
                                                <option value="5">5 Hours</option>
                                                <option value="6">6 Hours</option>
                                                <option value="8">8 Hours (Full Day)</option>
                                                <option value="12">12 Hours</option>
                                                <option value="24">24 Hours</option>
                                            </select>
                                            {errors.duration && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.duration.message}</span>}
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <label className="block text-xs uppercase text-text-muted mb-1">Pickup Location</label>
                                        <input
                                            {...register("pickup", { required: "Pickup location is required" })}
                                            className={cn("w-full bg-dark-950 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors", errors.pickup ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold")}
                                            placeholder="e.g. JFK Airport Terminal 4"
                                        />
                                        {errors.pickup && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.pickup.message}</span>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs uppercase text-text-muted mb-1">Dropoff Location {serviceType === "hourly" && <span className="text-gray-500 lowercase font-normal">(optional)</span>}</label>
                                        <input
                                            {...register("dropoff", { required: serviceType === "transfer" ? "Dropoff location is required" : false })}
                                            className={cn("w-full bg-dark-950 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors", errors.dropoff ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-royal-gold")}
                                            placeholder={serviceType === "hourly" ? "e.g. As Directed" : "e.g. The Plaza Hotel"}
                                        />
                                        {errors.dropoff && <span className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" /> {errors.dropoff.message}</span>}
                                    </div>

                                    <button disabled={isSubmitting} type="submit" className="w-full bg-royal-gold hover:bg-royal-gold-hover text-dark-950 font-bold py-4 rounded-lg transition-colors shadow-lg mt-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
                                            </>
                                        ) : (
                                            "Book Now"
                                        )}
                                    </button>
                                    <p className="text-xs text-text-muted text-center mt-4">Average response time: &lt; 5 minutes.</p>
                                </form>
                            ) : (
                                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 bg-green-500/5 rounded-lg border border-green-500/10 animate-in fade-in zoom-in duration-300">
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 text-green-500">
                                        <Check className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
                                    <p className="text-text-muted mb-6">
                                        Your request has been logged in our system.
                                    </p>
                                    <div className="p-4 bg-dark-950 rounded border border-white/10 text-sm text-gray-300 max-w-xs mx-auto mb-8">
                                        <p>A confirmation email has been sent to our concierge team. We will contact you shortly.</p>
                                    </div>
                                    <button onClick={() => setSubmitted(false)} className="text-xs text-text-muted hover:text-white underline">
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
