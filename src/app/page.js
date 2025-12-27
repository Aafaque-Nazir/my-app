"use client";

import { useRef } from "react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import { ChevronRight, Star, ShieldCheck, Clock, MapPin, Check } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const container = useRef();

  useGSAP(() => {
    // Hero Animations (Timeline)
    const tl = gsap.timeline();
    tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(".hero-title", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(".hero-btns", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

    // Parallax Background Blobs
    gsap.to(".hero-blob-1", {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".hero-blob-2", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Breathing Animation for Blobs
    gsap.to(".hero-blob-1", { scale: 1.2, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-blob-2", { scale: 0.8, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });


    // Stats Bar Parallax
    gsap.from(".stat-item", {
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });

    // Workflow Steps Parallax
    gsap.from(".workflow-step", {
      scrollTrigger: {
        trigger: ".workflow-section",
        start: "top 75%",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Content Teaser Parallax
    gsap.to(".content-teaser-grid", {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".content-teaser-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Parallax Banner Text
    gsap.from(".parallax-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".parallax-banner",
        start: "top 70%",
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-dark-950 font-sans text-white selection:bg-royal-gold selection:text-black overflow-x-hidden">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient & Parallax Blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-black z-0" />
        <div className="hero-blob-1 absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-royal-gold/10 blur-[120px] rounded-full z-0 pointer-events-none mix-blend-screen" />
        <div className="hero-blob-2 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full z-0 pointer-events-none mix-blend-screen" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-16">
          <div className="hero-badge inline-flex items-center px-3 py-1 rounded-full border border-royal-gold/30 bg-royal-gold/5 text-royal-gold text-xs uppercase tracking-widest mb-8">
            <Star className="w-3 h-3 mr-2" /> Premier Chauffeur Service
          </div>
          <h1 className="hero-title font-outfit text-5xl md:text-7xl font-bold leading-tight mb-8">
            Experience the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Extraordinary</span>
          </h1>
          <p className="hero-desc text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Royal Car provides an elite fleet of luxury vehicles and professional chauffeurs for those who demand excellence in every journey.
          </p>
          <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="px-8 py-4 bg-royal-gold text-dark-950 font-bold rounded-lg hover:bg-royal-gold-hover transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Book a Ride
            </a>
            <a href="/our-fleet" className="px-8 py-4 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-all">
              View Fleet
            </a>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="stats-section border-y border-white/5 bg-dark-900/50 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="stat-item">
            <p className="text-3xl font-bold text-white mb-1">500+</p>
            <p className="text-xs uppercase tracking-widest text-text-muted">VIP Clients</p>
          </div>
          <div className="stat-item">
            <p className="text-3xl font-bold text-white mb-1">24/7</p>
            <p className="text-xs uppercase tracking-widest text-text-muted">Concierge Support</p>
          </div>
          <div className="stat-item">
            <p className="text-3xl font-bold text-white mb-1">100%</p>
            <p className="text-xs uppercase tracking-widest text-text-muted">Discretion</p>
          </div>
          <div className="stat-item">
            <p className="text-3xl font-bold text-white mb-1">Elite</p>
            <p className="text-xs uppercase tracking-widest text-text-muted">Chauffeurs Only</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="workflow-section py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-3xl md:text-4xl font-light mb-4 text-white">Seamless <span className="text-royal-gold">Simplicity</span></h2>
          <p className="text-text-muted max-w-xl mx-auto">Our booking process is designed to be effortless, respecting your time and preferences.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="workflow-step p-6">
            <div className="w-16 h-16 rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold mx-auto mb-6 text-2xl font-bold">1</div>
            <h3 className="text-xl font-bold text-white mb-3">Request a Ride</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Submit your itinerary details via our secure concierge form or direct line.
            </p>
          </div>
          <div className="workflow-step p-6">
            <div className="w-16 h-16 rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold mx-auto mb-6 text-2xl font-bold">2</div>
            <h3 className="text-xl font-bold text-white mb-3">Concierge Confirmation</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Our team reviews your request and calls within minutes to confirm specific vehicle preferences and logistics.
            </p>
          </div>
          <div className="workflow-step p-6">
            <div className="w-16 h-16 rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold mx-auto mb-6 text-2xl font-bold">3</div>
            <h3 className="text-xl font-bold text-white mb-3">Your Chauffeur Awaits</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Receive chauffeur details 24 hours prior. Your driver arrives 15 minutes early, every time.
            </p>
          </div>
        </div>
      </section>

      {/* Parallax Banner */}
      <section className="parallax-banner relative py-32 bg-fixed bg-center bg-cover border-y border-white/10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa8372f88e8?q=80&w=2670&auto=format&fit=crop")' }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="parallax-text font-outfit text-4xl md:text-6xl font-bold text-white mb-6">Arrive in <span className="text-royal-gold">Style</span></h2>
          <p className="parallax-text text-xl text-gray-200">Where comfort meets prestige. Your journey begins the moment you step inside.</p>
        </div>
      </section>

      {/* Reviews Section (New) */}
      <ReviewsSection />

      {/* Simplified Content Teaser */}
      <section className="content-teaser-section bg-dark-900 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="content-teaser-text">
            <h2 className="font-outfit text-3xl font-bold text-white mb-6">Excellence in Motion</h2>
            <p className="text-text-muted mb-6 leading-relaxed">
              From airport transfers to red-carpet events, our services are tailored to your exacting standards. We offer a diverse fleet of pristine vehicles ensuring you arrive in style and comfort.
            </p>
            <a href="/services" className="text-royal-gold font-medium hover:text-white transition-colors flex items-center">
              Explore Services <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="content-teaser-grid grid grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-xl aspect-square flex flex-col justify-center items-center text-center">
              <ShieldCheck className="w-8 h-8 text-royal-gold mb-3" />
              <span className="text-sm font-bold text-white">Secure</span>
            </div>
            <div className="glass-panel p-6 rounded-xl aspect-square flex flex-col justify-center items-center text-center mt-8">
              <Clock className="w-8 h-8 text-royal-gold mb-3" />
              <span className="text-sm font-bold text-white">Punctual</span>
            </div>
            <div className="glass-panel p-6 rounded-xl aspect-square flex flex-col justify-center items-center text-center -mt-8">
              <Star className="w-8 h-8 text-royal-gold mb-3" />
              <span className="text-sm font-bold text-white">Elite</span>
            </div>
            <div className="glass-panel p-6 rounded-xl aspect-square flex flex-col justify-center items-center text-center">
              <Check className="w-8 h-8 text-royal-gold mb-3" />
              <span className="text-sm font-bold text-white">Reliable</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (New) */}
      <FAQSection />

      <PublicFooter />
    </div>
  );
}

