"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least 24 hours in advance to ensure your preferred vehicle class is available. However, for urgent requests, our concierge line is open 24/7."
    },
    {
        question: "What is the difference between Hourly and Transfer?",
        answer: "Transfers are point-to-point trips with a fixed rate. Hourly charters give you a vehicle and chauffeur for a set duration (minimum 3 hours), allowing unlimited stops within the city."
    },
    {
        question: "Is gratuity included in the price?",
        answer: "Yes, our transparent pricing includes fuel, tolls, and a standard 20% gratuity for the chauffeur. There are no hidden fees."
    },
    {
        question: "Can I request a specific vehicle model?",
        answer: "While we cannot guarantee a specific color or plate, you can select the Vehicle Class (e.g., First Class S-Class/7 Series). We always strive to accommodate specific preferences."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-dark-950 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-royal-gold text-sm font-bold tracking-widest uppercase mb-2 block">Support</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-outfit">Frequently Asked <span className="text-royal-gold">Questions</span></h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                            className={cn(
                                "group border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer",
                                openIndex === index ? "bg-white/5 border-royal-gold" : "bg-transparent border-white/10 hover:border-white/30"
                            )}
                        >
                            <div className="p-6 flex justify-between items-center">
                                <h3 className={cn("text-lg font-medium transition-colors", openIndex === index ? "text-white" : "text-gray-300")}>
                                    {faq.question}
                                </h3>
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border transition-all", openIndex === index ? "bg-royal-gold text-dark-950 border-royal-gold" : "bg-white/5 text-gray-400 border-white/10")}>
                                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </div>

                            <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                                <div className="overflow-hidden">
                                    <p className="px-6 pb-6 text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
