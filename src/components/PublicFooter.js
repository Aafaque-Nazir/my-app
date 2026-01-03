import Link from "next/link";
import { Shield, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function PublicFooter() {
    return (
        <footer className="relative z-10 bg-dark-950 border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <Shield className="w-8 h-8 text-royal-gold mr-3" />
                            <span className="font-outfit font-bold text-xl tracking-widest text-white">ROYAL<span className="text-royal-gold">CAR</span></span>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Setting the gold standard in luxury chauffeured transportation. Experience punctual, discreet, and refined service worldwide.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-royal-gold hover:text-dark-950 transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-royal-gold hover:text-dark-950 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-royal-gold hover:text-dark-950 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest mb-6">Explore</h3>
                        <ul className="space-y-4 text-sm text-text-muted">
                            <li><Link href="/" className="hover:text-royal-gold transition-colors">Home Experience</Link></li>
                            <li><Link href="/services" className="hover:text-royal-gold transition-colors">Our Services</Link></li>
                            <li><Link href="/our-fleet" className="hover:text-royal-gold transition-colors">The Fleet</Link></li>
                            <li><Link href="/contact" className="hover:text-royal-gold transition-colors">Concierge Booking</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest mb-6">Services</h3>
                        <ul className="space-y-4 text-sm text-text-muted">
                            <li><Link href="/services" className="hover:text-royal-gold transition-colors">Airport Transfers</Link></li>
                            <li><Link href="/services" className="hover:text-royal-gold transition-colors">Hourly Charter</Link></li>
                            <li><Link href="/services" className="hover:text-royal-gold transition-colors">Corporate Travel</Link></li>
                            <li><Link href="/services" className="hover:text-royal-gold transition-colors">Special Events</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest mb-6">Contact</h3>
                        <ul className="space-y-6 text-sm text-text-muted">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 text-royal-gold mr-3 shrink-0" />
                                <span>123 Luxury Lane, Penthouse Suite<br />New York, NY 10012</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 text-royal-gold mr-3 shrink-0" />
                                <span>+1 (800) ROYAL-00</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 text-royal-gold mr-3 shrink-0" />
                                <span>concierge@royal-car.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
                    <p>&copy; {new Date().getFullYear()} Royal Car Service. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="/admin" className="hover:text-royal-gold transition-colors">Staff Portal</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
