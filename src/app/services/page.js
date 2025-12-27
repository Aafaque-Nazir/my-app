"use client";

import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { ShieldCheck, Clock, Star, MapPin, Briefcase } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-dark-950 font-sans text-white">
            <PublicNavbar />

            <main className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-16 text-center">
                        <h1 className="font-outfit text-4xl md:text-5xl font-bold mb-4">Our <span className="text-royal-gold">Services</span></h1>
                        <p className="text-text-muted max-w-2xl mx-auto text-lg">
                            Whether you require a seamless airport transfer, a full-day charter, or event transportation, Royal Car delivers excellence in every mile.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Service 2 */}
                        <div className="glass-panel p-8 rounded-xl flex gap-6 items-start hover:border-royal-gold/30 transition-colors">
                            <Clock className="w-12 h-12 text-royal-gold shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Hourly Charter</h3>
                                <p className="text-text-muted leading-relaxed mb-4">
                                    Enjoy the freedom of having a dedicated chauffeur at your disposal. Perfect for back-to-back meetings, shopping trips, or exploring the city at your own pace.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-center"><Briefcase className="w-4 h-4 mr-2 text-royal-gold" /> As Directed Service</li>
                                    <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-royal-gold" /> Flexible Routing</li>
                                </ul>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="glass-panel p-8 rounded-xl flex gap-6 items-start hover:border-royal-gold/30 transition-colors">
                            <Star className="w-12 h-12 text-royal-gold shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Event Transportation</h3>
                                <p className="text-text-muted leading-relaxed mb-4">
                                    Make an entrance at galas, weddings, and corporate events. We coordinate logistics for groups of any size, ensuring stylish and punctual arrival.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-royal-gold" /> On-site Coordinators</li>
                                    <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-royal-gold" /> Red Carpet Service</li>
                                </ul>
                            </div>
                        </div>

                        {/* Service 4 */}
                        <div className="glass-panel p-8 rounded-xl flex gap-6 items-start hover:border-royal-gold/30 transition-colors">
                            <Briefcase className="w-12 h-12 text-royal-gold shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Corporate Travel</h3>
                                <p className="text-text-muted leading-relaxed mb-4">
                                    Streamlined travel solutions for business executives. We prioritize discretion, efficiency, and comfort, allowing you to work on the go.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-royal-gold" /> Confidentiality Agreements</li>
                                    <li className="flex items-center"><Clock className="w-4 h-4 mr-2 text-royal-gold" /> Priority Booking</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* The Royal Standard Section */}
                    <div className="mt-24 bg-dark-900 rounded-2xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent" />
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-6">The Royal <span className="text-royal-gold">Standard</span></h2>
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                Our chauffeurs are more than just drivers; they are trained concierge professionals.
                                Vetted through a rigorous background check and trained in defensive driving, etiquette, and city navigation,
                                they ensure your safety and comfort are paramount.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                                <div>
                                    <h4 className="font-bold text-white mb-2 flex items-center"><ShieldCheck className="w-5 h-5 text-royal-gold mr-2" /> Vetted & Trained</h4>
                                    <p className="text-sm text-text-muted">Rigorous background checks and continuous verified training modules.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2 flex items-center"><MapPin className="w-5 h-5 text-royal-gold mr-2" /> Local Experts</h4>
                                    <p className="text-sm text-text-muted">Extensive knowledge of local routes, hotels, and dining hotspots.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2 flex items-center"><Clock className="w-5 h-5 text-royal-gold mr-2" /> Always Early</h4>
                                    <p className="text-sm text-text-muted">We abide by the 15-minute rule. We are on site 15 minutes before your pickup.</p>
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
