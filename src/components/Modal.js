"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Modal({ isOpen, onClose, title, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => (document.body.style.overflow = "unset");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="glass-panel w-full max-w-md rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h3 className="text-lg font-medium text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
