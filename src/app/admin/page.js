"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AppContext";
import { ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Simulate network delay for "premium" feel
        setTimeout(() => {
            if (email.toLowerCase() === "admin@royal.com") {
                login(email);
                router.push("/dashboard");
            } else {
                setError("Access Denied. Authorized Personnel Only.");
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-md p-8">
                <div className="glass-panel p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal-gold/10 text-royal-gold mb-6 border border-royal-gold/20">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-light tracking-wide text-white mb-2">ROYAL CAR</h1>
                        <p className="text-text-muted text-sm uppercase tracking-widest">Dispatch Console</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-royal-gold uppercase tracking-wider mb-2">
                                Identifier
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@royal.com"
                                className={cn(
                                    "w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-dark-700 focus:outline-none focus:border-royal-gold transition-colors",
                                    error && "border-red-500/50 focus:border-red-500"
                                )}
                                autoComplete="off"
                            />
                            {error && (
                                <p className="text-red-400 text-xs mt-2 animate-pulse">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-dark-950 font-bold py-3.5 rounded-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Authenticating...
                                </span>
                            ) : (
                                "Access System"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-dark-700 text-xs">
                            Restricted Access System v1.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
