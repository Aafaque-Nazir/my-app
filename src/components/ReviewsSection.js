"use client";

import { useState, useEffect } from "react";
import { Star, Quote, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const reviews = [
    {
        id: 1,
        text: "The service was impeccable. The chauffeur arrived 15 minutes early and the S-Class was pristine. Perfect for our corporate executive team.",
        author: "James Mitchell",
        role: "CEO, TechFlow Inc.",
        stars: 5
    },
    {
        id: 2,
        text: "I booked an hourly charter for a fashion week event. The driver knew every shortcut in the city. Truly a white-glove experience.",
        author: "Sarah Jenkins",
        role: "Fashion Director, Vogue",
        stars: 5
    },
    {
        id: 3,
        text: "Used Royal Car for my airport transfer. The 'Meet & Greet' service made a huge difference after a long flight. Highly recommended.",
        author: "Michael Chen",
        role: "Investment Banker",
        stars: 5
    },
    {
        id: 4,
        text: "The Cadillac Escalade was spacious and luxurious. My family felt safe and pampered throughout the journey to the Hamptons.",
        author: "Emily Davis",
        role: "Private Client",
        stars: 5
    },
    {
        id: 5,
        text: "Efficient, discreet, and incredibly professional. The dispatcher coordinated everything seamlessly for our roadshow.",
        author: "Robert Vance",
        role: "Vance Refrigeration",
        stars: 5
    }
];

export default function ReviewsSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <section className="py-24 bg-dark-900 border-t border-white/5 relative overflow-hidden flex justify-center items-center min-h-[500px]">
                <Loader2 className="w-8 h-8 text-royal-gold animate-spin" />
            </section>
        );
    }

    return (
        <section className="py-24 bg-dark-900 border-t border-white/5 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-royal-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-royal-gold/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <span className="text-royal-gold text-sm font-bold tracking-widest uppercase mb-2 block">Testimonials</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white font-outfit">What Our <span className="text-royal-gold">Clients Say</span></h2>
            </div>

            <div className="px-4 md:px-12">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="pb-16"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <div className="glass-panel p-8 rounded-2xl relative group hover:border-royal-gold/30 transition-all duration-300 h-full min-h-[300px] flex flex-col justify-between">
                                <div>
                                    <Quote className="w-10 h-10 text-royal-gold/20 mb-6" />
                                    <p className="text-gray-300 text-lg italic mb-6 leading-relaxed">"{review.text}"</p>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                                    <div>
                                        <h4 className="text-white font-bold">{review.author}</h4>
                                        <p className="text-royal-gold text-xs uppercase tracking-wider">{review.role}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(review.stars)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-royal-gold fill-royal-gold" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Styles for Pagination */}
            <style jsx global>{`
                .swiper-pagination-bullet {
                    background-color: rgba(255, 255, 255, 0.2) !important;
                    opacity: 1;
                }
                .swiper-pagination-bullet-active {
                    background-color: #D4AF37 !important; /* Royal Gold */
                }
            `}</style>
        </section>
    );
}
