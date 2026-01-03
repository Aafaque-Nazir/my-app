"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password: password,
        });

        if (result?.error) {
            setError("Access Denied. Invalid Credentials.");
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-dark-950">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-royal-gold/10 blur-[150px] rounded-full animate-float opacity-40 mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[130px] rounded-full animate-float opacity-30 mix-blend-screen" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 w-full max-w-md p-8">
                <div className="glass-panel p-10 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-700 backdrop-blur-2xl border border-white/5 bg-white/5">
                    <div className="text-center mb-12">
                        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 mb-6 shadow-xl group hover:scale-105 transition-transform duration-500">
                            <ShieldCheck className="w-10 h-10 text-royal-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                            <div className="absolute inset-0 rounded-full border border-royal-gold/20 animate-pulse" />
                        </div>
                        <h1 className="text-4xl font-serif text-white mb-2 tracking-wide">ROYAL CAR</h1>
                        <p className="text-text-muted text-xs uppercase tracking-[0.3em] font-sans">Dispatch Console</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="group">
                            <label htmlFor="email" className="block text-xs font-bold text-royal-gold uppercase tracking-widest mb-3 ml-1 transition-colors group-focus-within:text-white">
                                Identifier
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@royal.com"
                                className={cn(
                                    "w-full bg-dark-900/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-dark-700/50 focus:outline-none focus:border-royal-gold/50 focus:bg-dark-900/80 transition-all duration-300 font-sans tracking-wide hover:border-white/20",
                                    error && "border-red-500/50 focus:border-red-500"
                                )}
                                autoComplete="off"
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="password" className="block text-xs font-bold text-royal-gold uppercase tracking-widest mb-3 ml-1 transition-colors group-focus-within:text-white">
                                Passcode
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={cn(
                                    "w-full bg-dark-900/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-dark-700/50 focus:outline-none focus:border-royal-gold/50 focus:bg-dark-900/80 transition-all duration-300 font-sans tracking-wide hover:border-white/20",
                                    error && "border-red-500/50 focus:border-red-500"
                                )}
                            />
                            {error && (
                                <p className="text-red-400 text-xs mt-3 ml-1 flex items-center gap-2 animate-pulse">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full gold-gradient text-dark-950 font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_5px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] mt-4 font-serif text-lg tracking-wider hover:brightness-110"
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

                    <div className="mt-10 text-center">
                        <p className="text-text-muted/40 text-[10px] uppercase tracking-widest font-sans">
                            Restricted Access System v2.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
