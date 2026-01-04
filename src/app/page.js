"use client";

import { useRef } from "react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import Image from "next/image";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import { ChevronRight, Star, ShieldCheck, Clock, MapPin, Check } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleBackground from "@/components/ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const container = useRef();
  const heroRef = useRef(null);
  const workflowRef = useRef(null);

  useGSAP(() => {
    // Hero Animations (Timeline)
    const tl = gsap.timeline();

    tl.to(".hero-badge", { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 })
      .to(".hero-text-line", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.inOut"
      }, "-=0.5")
      .to(".hero-desc", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=1")
      .to(".hero-btns", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .to(".hero-scroll", {
        opacity: 1,
        duration: 1
      }, "-=0.5");

    // Stats Count-up
    gsap.from(".stat-number", {
      textContent: 0,
      duration: 2,
      ease: "power3.out",
      snap: { textContent: 1 },
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
      }
    });

    gsap.from(".stat-item", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
      }
    });

    // --- NEW: PINNED WORKFLOW SECTION ---
    // The container ".workflow-container" will be pinned
    // The cards will slide horizontally or fade in sequence
    const workflowTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".workflow-container",
        start: "top top", // Pin it exactly at the top
        end: "+=2000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // 1. Reveal Title first (if not already visible)
    workflowTl.fromTo(".workflow-title", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 2 });

    // 2. Animate Cards In
    workflowTl.fromTo(".workflow-card-1",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 4 }
    )
      .fromTo(".workflow-card-2",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 4 }
        , "-=2")
      .fromTo(".workflow-card-3",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 4 }
        , "-=2");

    // Hold for a moment at the end
    workflowTl.to({}, { duration: 2 });


    // --- NEW: TRUE PARALLAX BANNER ---
    gsap.to(".parallax-bg", {
      yPercent: 30, // Move background slower than scroll
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom", // Start when section enters viewport
        end: "bottom top",   // End when section leaves viewport
        scrub: true
      }
    });

    gsap.from(".parallax-content", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top 70%",
      }
    });


    // Content Teaser Reveal
    gsap.from(".teaser-card", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".content-teaser-grid",
        start: "top 80%",
      }
    });

    // FAQ Reveal
    gsap.from(".faq-header", {
      y: 30,
      opacity: 0,
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 85%"
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-dark-950 font-sans text-white selection:bg-royal-gold selection:text-black overflow-x-hidden">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="hero-section relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-dark-950">
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-black/40 pointer-events-none" />
        </div>

        <div ref={heroRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-40 pb-20">
          <div className="hero-badge inline-flex items-center px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-royal-gold/30 bg-royal-gold/5 backdrop-blur-md text-royal-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6 md:mb-10 hover:bg-royal-gold/10 transition-colors cursor-default opacity-0 translate-y-4">
            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold mr-3 animate-pulse shadow-[0_0_10px_#D4AF37]" />
            The Royal Standard
          </div>

          <h1 className="hero-title font-serif text-4xl md:text-6xl lg:text-8xl font-medium leading-[1.1] mb-6 md:mb-8 tracking-tight text-white">
            <div className="overflow-hidden"><span className="hero-text-line block transform translate-y-full opacity-0">Define</span></div>
            <div className="overflow-hidden"><span className="hero-text-line block transform translate-y-full opacity-0"><span className="italic font-light opacity-80 mr-4 font-serif">Your</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-gold via-yellow-200 to-royal-gold animate-gradient">Journey</span></span></div>
          </h1>

          <p className="hero-desc text-base md:text-xl text-gray-300 max-w-xl md:max-w-2xl mx-auto mb-10 md:mb-14 font-light leading-relaxed tracking-wide translate-y-8 opacity-0 px-4">
            Precision dispatching and elite chauffeur services for the uncompromising traveler.
          </p>

          <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-6 translate-y-8 opacity-0">
            <button
              className="group relative px-10 py-4 bg-royal-gold text-dark-950 font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.4)]"
              onMouseMove={(e) => {
                const btn = e.currentTarget;
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
              }}
            >
              <span className="relative z-10 uppercase tracking-widest text-sm">Book Reservation</span>
              <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            <a href="/our-fleet"
              className="group relative px-10 py-4 bg-transparent text-white font-bold rounded-full border border-white/20 overflow-hidden transition-all hover:border-royal-gold hover:text-royal-gold backdrop-blur-sm"
              onMouseMove={(e) => {
                const btn = e.currentTarget;
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
              }}
            >
              <span className="relative z-10 uppercase tracking-widest text-sm transition-colors">Explore Fleet</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 hero-scroll mix-blend-screen">
          <span className="text-[10px] uppercase tracking-widest text-royal-gold/80 animate-pulse">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-royal-gold to-transparent" />
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="stats-section border-y border-white/5 bg-dark-900/50 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-8 text-center">
          <div className="stat-item">
            <p className="text-4xl md:text-5xl font-serif text-royal-gold mb-2"><span className="stat-number">500</span>+</p>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted">VIP Clients</p>
          </div>
          <div className="stat-item">
            <p className="text-4xl md:text-5xl font-serif text-royal-gold mb-2"><span className="stat-number">24</span>/7</p>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted">Concierge Support</p>
          </div>
          <div className="stat-item">
            <p className="text-4xl md:text-5xl font-serif text-royal-gold mb-2"><span className="stat-number">100</span>%</p>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted">Discretion</p>
          </div>
          <div className="stat-item">
            <p className="text-4xl md:text-5xl font-serif text-royal-gold mb-2 truncate">Elite</p>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted">Chauffeurs Only</p>
          </div>
        </div>
      </section>

      {/* NEW: Pinned Workflow Section */}
      <section className="workflow-container relative min-h-screen pt-48 pb-24 flex flex-col items-center justify-center bg-dark-950 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-center gap-16 relative z-10">

          {/* Centered Title */}
          <div className="workflow-title text-center flex flex-col items-center mt-22">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium mb-6 text-white tracking-wider leading-tight">
              Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-gold via-yellow-200 to-royal-gold">Simplicity</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-base md:text-xl font-light tracking-wide">
              Our booking process is curated for excellence, respecting your time and uncompromising standards.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative">
            {/* Step 1 */}
            <div className="workflow-card-1 group p-8 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] hover:border-royal-gold/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="w-14 h-14 rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold mx-auto mb-6 text-xl font-serif border border-royal-gold/20 group-hover:scale-110 transition-transform">1</div>
              <h3 className="text-center text-lg font-serif text-white mb-3 tracking-wide">Request a Ride</h3>
              <p className="text-center text-text-muted text-sm leading-relaxed font-light">
                Submit your itinerary details via our secure concierge form or dedicated dispatch line.
              </p>
            </div>

            {/* Step 2 */}
            <div className="workflow-card-2 group p-8 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] hover:border-royal-gold/50 transition-all duration-500 shadow-2xl mt-0 md:mt-12 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="w-14 h-14 rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold mx-auto mb-6 text-xl font-serif border border-royal-gold/20 group-hover:scale-110 transition-transform">2</div>
              <h3 className="text-center text-lg font-serif text-white mb-3 tracking-wide">Concierge Match</h3>
              <p className="text-center text-text-muted text-sm leading-relaxed font-light">
                Our team matches your request with the perfect vehicle and a vetted professional chauffeur.
              </p>
            </div>

            {/* Step 3 */}
            <div className="workflow-card-3 group p-8 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] hover:border-royal-gold/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="w-14 h-14 rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold mx-auto mb-6 text-xl font-serif border border-royal-gold/20 group-hover:scale-110 transition-transform">3</div>
              <h3 className="text-center text-lg font-serif text-white mb-3 tracking-wide">Elite Arrival</h3>
              <p className="text-center text-text-muted text-sm leading-relaxed font-light">
                Receive chauffeur details 24 hours prior. Your driver arrives 15 minutes early, every time.
              </p>
            </div>
          </div>

        </div>

        {/* Background Glow for Pin Section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* NEW: True Parallax Banner */}
      <section className="parallax-section relative h-[80vh] bg-dark-950 overflow-hidden flex items-center justify-center border-y border-white/10 z-20">
        {/* Parallax Background Image */}
        <div className="parallax-bg absolute inset-0 w-full h-[140%] -top-[20%] pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa8372f88e8?q=80&w=2670&auto=format&fit=crop"
            alt="Luxury Travel"
            fill
            className="object-cover opacity-60"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Parallax Content */}
        <div className="parallax-content relative z-20 max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-5xl md:text-8xl lg:text-9xl font-medium text-white mb-8 leading-tight drop-shadow-2xl">
            Arrive in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-royal-gold to-white">Style</span>
          </h2>
          <p className="text-xl md:text-3xl text-gray-200 font-light tracking-[0.3em] uppercase drop-shadow-lg">Where comfort meets prestige.</p>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Content Teaser Section */}
      <section className="content-teaser-section bg-dark-950 py-24 md:py-32 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="content-teaser-text text-center lg:text-left">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-8">Excellence <br className="hidden lg:block" />in Motion</h2>
            <p className="text-text-muted mb-10 text-base md:text-lg leading-relaxed font-light tracking-wide max-w-xl mx-auto lg:mx-0">
              From high-profile airport transfers to bespoke red-carpet events, our services are curated to your exacting standards. Experience a diverse fleet of pristine vehicles ensuring you arrive with distinction.
            </p>
            <a href="/services" className="inline-flex items-center text-royal-gold font-bold hover:text-white transition-colors group tracking-[0.2em] uppercase text-xs">
              Explore Services <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
          <div className="content-teaser-grid grid grid-cols-2 gap-4 md:gap-6">
            <div className="teaser-card bg-zinc-900/95 backdrop-blur-2xl p-8 rounded-2xl aspect-square flex flex-col justify-center items-center text-center group hover:border-royal-gold/50 transition-colors border border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <ShieldCheck className="w-10 h-10 text-royal-gold mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">Discrete</span>
            </div>
            <div className="teaser-card bg-zinc-900/95 backdrop-blur-2xl p-8 rounded-2xl aspect-square flex flex-col justify-center items-center text-center mt-12 md:mt-16 group hover:border-royal-gold/50 transition-colors border border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <Clock className="w-10 h-10 text-royal-gold mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">Punctual</span>
            </div>
            <div className="teaser-card bg-zinc-900/95 backdrop-blur-2xl p-8 rounded-2xl aspect-square flex flex-col justify-center items-center text-center -mt-12 md:-mt-16 group hover:border-royal-gold/50 transition-colors border border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <Star className="w-10 h-10 text-royal-gold mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">Premium</span>
            </div>
            <div className="teaser-card bg-zinc-900/95 backdrop-blur-2xl p-8 rounded-2xl aspect-square flex flex-col justify-center items-center text-center group hover:border-royal-gold/50 transition-colors border border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <Check className="w-10 h-10 text-royal-gold mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">Verified</span>
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
