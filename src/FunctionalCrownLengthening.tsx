import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, CheckCircle2, Phone, MapPin, Shield, Clock, Award, Crown, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- NAVBAR with Services Dropdown (fixed hover) ---
const Navbar = () => {
  const navRef = useRef(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimeout = useRef(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  // Handle mouse enter on the parent container (button + dropdown)
  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsServicesOpen(true);
  };

  // Handle mouse leave with a small delay to allow moving to dropdown
  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  // GSAP scroll effect for navbar
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        onEnter: () => gsap.to(navRef.current, { 
          backgroundColor: 'rgba(255,255,255,0.5)', 
          backdropFilter: 'blur(24px)', 
          color: '#0F172A', 
          borderColor: 'rgba(255,255,255,0.8)', 
          duration: 0.3 
        }),
        onLeaveBack: () => gsap.to(navRef.current, { 
          backgroundColor: 'transparent', 
          backdropFilter: 'blur(0px)', 
          color: '#0F172A', 
          borderColor: 'transparent', 
          duration: 0.3 
        })
      });
      gsap.set(navRef.current, { color: '#0F172A', backgroundColor: 'transparent', borderColor: 'transparent' });
    });
    return () => ctx.revert();
  }, []);

  const services = [
    { name: 'Periodontal Maintenance', path: '/periodontal-maintenance' },
    { name: 'Scaling and Root Planing', path: '/scaling-root-planing' },
    { name: 'Osseous Surgery', path: '/osseous-surgery' },
    { name: 'Frenectomy', path: '/frenectomy' },
    { name: 'Functional Crown Lengthening', path: '/crown-lengthening' },
    { name: 'Aesthetic Crown Lengthening', path: '/aesthetic-crown-lengthening' },
    { name: 'Guided Bone & Tissue Regeneration', path: '/guided-bone-regeneration' },
    { name: 'Dental Implants', path: '/dental-implants' },
    { name: 'Laser Therapy', path: '/laser-therapy' },
    { name: 'LANAP', path: '/lanap' }
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-[3rem] w-[90%] max-w-4xl border border-transparent shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
    >
      <a href="/" className="font-sans text-lg font-bold tracking-tight">ATL Perio Group</a>
      <div className="hidden md:flex items-center gap-8 font-serif italic text-[1.1rem]">
        <a href="/#philosophy" className="transition-colors link-hover hover:text-accent">Philosophy</a>
        <a href="/#features" className="transition-colors link-hover hover:text-accent">Method</a>
        <a href="/#protocol" className="transition-colors link-hover hover:text-accent">Protocol</a>
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center gap-1 transition-colors link-hover hover:text-accent">
            Services <ChevronDown className="w-3 h-3" />
          </button>
          {isServicesOpen && (
            <div 
              className="absolute left-0 w-64 py-2 mt-2 overflow-hidden bg-white border shadow-xl top-full rounded-2xl border-primary/5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {services.map((service, index) => (
                <a
                  key={index}
                  href={service.path}
                  className="block px-5 py-2.5 text-sm font-serif text-primary/80 hover:bg-accent/5 hover:text-accent transition-colors"
                >
                  {service.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")}
        className="magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-5 py-2 rounded-full font-sans font-medium text-sm flex items-center gap-2 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_5px_15px_rgba(6,182,212,0.3)]"
      >
        <span className="relative z-10 block">Consultation</span>
      </button>
    </nav>
  );
};

// --- FUNCTIONAL CROWN LENGTHENING LANDING PAGE ---
const FunctionalCrownLengthening = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });

      // Section animations
      gsap.from('.section-animate', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Schema markup for surgical procedure
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Functional Crown Lengthening",
    "description": "Professional functional crown lengthening in Atlanta, GA. Expert surgical procedure to expose more tooth structure for restorative treatment.",
    "procedureType": "Periodontal Surgery",
    "bodyLocation": "Gums and Bone (Teeth)",
    "provider": {
      "@type": "Dentist",
      "name": "Atlanta Periodontal Group",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Atlanta",
        "addressRegion": "GA",
        "postalCode": "30301"
      },
      "telephone": "(770) 994-5678"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Script */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <Navbar />
      
      {/* HERO SECTION - SEO Optimized */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] overflow-hidden flex items-end pb-24 md:pb-32 px-6 md:px-16 bg-white">
        <div className="absolute inset-0 z-0 bg-[#F8FAFC]">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2600&auto=format&fit=crop"
            alt="Functional Crown Lengthening Atlanta GA"
            className="object-cover w-full h-full opacity-30 mix-blend-multiply filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl text-primary">
          <div className="hero-element inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider mb-4">
            Periodontal Surgery for Restorative Dentistry
          </div>
          <h1 className="flex flex-col gap-1 md:gap-2">
            <span className="font-sans text-3xl font-bold tracking-tighter hero-element md:text-5xl lg:text-6xl text-primary">
              Functional Crown Lengthening
            </span>
            <span className="hero-element font-serif italic text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.85] text-accent font-medium">
              Atlanta GA.
            </span>
          </h1>
          <p className="max-w-2xl mt-6 font-serif text-xl hero-element md:mt-8 text-primary/80">
            Exposing more tooth structure to support crowns, bridges, and restorative treatments.
            <span className="block mt-2 font-sans text-base text-primary/60">
              Serving Buckhead, Midtown, Sandy Springs, and all of Metro Atlanta.
            </span>
          </p>
          <div className="flex flex-wrap gap-4 mt-10 hero-element">
            <button 
              onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")} 
              className="magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-semibold flex items-center gap-2 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] border border-white/20"
            >
              <span className="relative z-10 block">Book Your Consultation</span>
              <ChevronRight className="relative z-10 w-5 h-5" />
            </button>
            <a 
              href="tel:+17709945678"
              className="magnetic-button bg-white/80 text-primary px-8 py-4 rounded-full font-sans font-semibold flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-primary/10 hover:bg-white transition-all"
            >
              <Phone className="w-5 h-5" />
              <span className="relative z-10">(770) 994-5678</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm hero-element text-primary/60">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              Crown & Bridge Preparation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              Board-Certified Periodontists
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              4.9 Stars — 637 Reviews
            </span>
          </div>
        </div>
      </section>

      {/* WHAT IS FUNCTIONAL CROWN LENGTHENING - Section 1 */}
      <section ref={containerRef} className="max-w-6xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">What We Do</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              What Is Functional Crown Lengthening?
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              Functional crown lengthening is a surgical procedure that reshapes the gum tissue and underlying bone around a tooth to expose more of the tooth's structure. This is typically performed when a tooth has decayed, fractured, or broken off below the gum line, or when a new crown needs a more stable and long-lasting foundation.
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              Unlike cosmetic crown lengthening, which is done primarily to improve the appearance of a "gummy" smile, <strong>functional crown lengthening</strong> is a necessary procedure to ensure the success of restorative treatments like crowns, bridges, or veneers. By creating adequate tooth structure above the gum line, we improve the retention and longevity of your restoration.
            </p>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")}
                className="magnetic-button bg-accent text-white px-6 py-3 rounded-full font-sans font-semibold text-sm shadow-[0_5px_20px_rgba(6,182,212,0.3)]"
              >
                Schedule Your Consultation
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center section-animate">
            <div className="relative w-full aspect-[4/3] bg-primary/5 rounded-3xl overflow-hidden">
              <img
                src="https://i.imgur.com/BPiVuyf.jpeg?q=80&w=2600&auto=format&fit=crop"
                alt="Functional crown lengthening treatment Atlanta GA"
                className="object-cover w-full h-full filter grayscale opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-xs p-6 border border-white shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                  <p className="font-serif text-lg italic text-center text-primary/80">
                    "Creating a solid foundation for your new smile."
                  </p>
                  <p className="mt-2 font-mono text-xs text-center text-primary/50">— Dr. Marya J. Barnes, DDS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHEN IS FUNCTIONAL CROWN LENGTHENING NEEDED - Section 2 */}
      <section className="px-6 py-16 bg-primary/5 md:py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">Indications</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              When Is Functional Crown Lengthening Recommended?
            </h2>
            <p className="max-w-2xl mx-auto mt-4 font-serif text-lg text-primary/70">
              This procedure is often necessary to ensure the success and durability of restorative dental work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
            {[
              {
                icon: <Crown className="w-8 h-8 text-accent" />,
                title: "Tooth Fracture Below the Gum Line",
                desc: "When a tooth breaks off at or below the gum tissue, crown lengthening exposes enough healthy tooth structure to place a crown."
              },
              {
                icon: <Shield className="w-8 h-8 text-accent" />,
                title: "Deep Decay",
                desc: "If a cavity extends too far under the gum line, the tooth may need to be exposed to properly restore it."
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-accent" />,
                title: "Insufficient Tooth Structure for a Crown",
                desc: "When a tooth doesn't have enough height above the gum line to hold a crown securely, crown lengthening provides the necessary foundation."
              },
              {
                icon: <Award className="w-8 h-8 text-accent" />,
                title: "Biological Width Violation",
                desc: "If a previous restoration invades the biological width (the space where gums attach to the tooth), it can cause inflammation and bone loss. Crown lengthening corrects this."
              },
              {
                icon: <Clock className="w-8 h-8 text-accent" />,
                title: "Multiple Teeth Preparation for Bridges",
                desc: "When preparing teeth for a bridge, crown lengthening may be needed to create adequate crown height on multiple teeth."
              },
              {
                icon: <Crown className="w-8 h-8 text-accent" />,
                title: "Old Crown Replacement",
                desc: "When an existing crown fails, crown lengthening may be needed to create a better seal and prevent future issues."
              }
            ].map((item, i) => (
              <div key={i} className="section-animate bg-white p-8 rounded-3xl border border-primary/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-sans text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-2 font-serif text-primary/70">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center section-animate">
            <p className="font-serif text-lg text-primary/70">
              <strong>Don't let tooth structure compromise your restoration.</strong> A functional crown lengthening ensures your crown or bridge lasts for years.
            </p>
            <button 
              onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")}
              className="mt-6 magnetic-button bg-accent text-white px-8 py-3 rounded-full font-sans font-semibold shadow-[0_5px_20px_rgba(6,182,212,0.3)]"
            >
              Request a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* THE PROCEDURE - Section 3 */}
      <section className="max-w-6xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="order-2 section-animate md:order-1">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2600&auto=format&fit=crop"
              alt="Functional crown lengthening procedure Atlanta"
              className="rounded-3xl shadow-lg border border-primary/5 object-cover w-full h-[350px]"
            />
          </div>
          <div className="order-1 section-animate md:order-2">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">The Process</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              What to Expect During Functional Crown Lengthening
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              The procedure is performed under local anesthesia, and sedation options are available for anxious patients. Most cases take about 60–90 minutes, depending on the number of teeth involved.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  step: "Step 1",
                  title: "Anesthesia and Incision",
                  desc: "After numbing the area, we make small incisions in the gum tissue around the tooth to gently lift it away from the bone."
                },
                {
                  step: "Step 2",
                  title: "Bone Reshaping",
                  desc: "We carefully remove a small amount of bone around the tooth to expose more of the tooth's surface. This creates space for the gum tissue to heal at a lower level."
                },
                {
                  step: "Step 3",
                  title: "Gum Recontouring and Suturing",
                  desc: "The gum tissue is repositioned and sutured into place at the new level, covering the bone while exposing the additional tooth structure."
                },
                {
                  step: "Step 4",
                  title: "Healing and Restoration",
                  desc: "After 4–6 weeks of healing, your restorative dentist can take impressions and place your final crown or bridge. We'll coordinate with your dentist throughout the process."
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-mono text-xs font-bold rounded-full bg-accent/10 text-accent">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-primary">{item.title}</h4>
                    <p className="font-serif text-sm text-primary/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")}
                className="magnetic-button bg-accent text-white px-6 py-3 rounded-full font-sans font-semibold text-sm shadow-[0_5px_20px_rgba(6,182,212,0.3)]"
              >
                Schedule Your Crown Lengthening
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS - Section 4 */}
      <section className="px-6 py-16 bg-primary/5 md:py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">Benefits</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              Why Functional Crown Lengthening Is the Right Choice
            </h2>
            <p className="max-w-2xl mx-auto mt-4 font-serif text-lg text-primary/70">
              This surgical procedure provides a stable, long-lasting foundation for your restorative work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
            {[
              {
                icon: <Crown className="w-6 h-6 text-accent" />,
                title: "Stronger, More Durable Restorations",
                desc: "Adequate tooth structure above the gum line ensures your crown or bridge fits securely and lasts longer."
              },
              {
                icon: <Shield className="w-6 h-6 text-accent" />,
                title: "Preserves Biological Health",
                desc: "Respecting the biological width prevents chronic inflammation and bone loss around the restored tooth."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-accent" />,
                title: "Reduced Risk of Crown Failure",
                desc: "A properly prepared tooth with enough height and margin is far less likely to suffer from decay or loosening."
              },
              {
                icon: <Award className="w-6 h-6 text-accent" />,
                title: "Improved Aesthetics and Function",
                desc: "The procedure allows your restorative dentist to create a natural-looking crown that blends seamlessly with your smile."
              }
            ].map((item, i) => (
              <div key={i} className="section-animate bg-white p-8 rounded-3xl border border-primary/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex gap-4">
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-sans text-xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 font-serif text-primary/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS - Section 5 */}
      <section className="max-w-4xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="text-center section-animate">
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">FAQ</span>
          <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
            Frequently Asked Questions About Functional Crown Lengthening
          </h2>
          <p className="max-w-2xl mx-auto mt-4 font-serif text-primary/70">
            Answers to the most common questions from our patients in Atlanta.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {[
            {
              q: "Is functional crown lengthening painful?",
              a: "We use local anesthesia to ensure you are comfortable during the procedure. Post-operative discomfort is usually mild and can be managed with over-the-counter pain relievers. We'll prescribe medication if needed."
            },
            {
              q: "How long does the procedure take?",
              a: "Most cases take about 60–90 minutes, depending on the number of teeth involved. For a single tooth, it's often quicker. We'll give you a time estimate during your consultation."
            },
            {
              q: "How long is the recovery time?",
              a: "Most patients resume normal activities the same day. The gums will heal over 4–6 weeks, during which time we'll schedule a follow-up to ensure healing is progressing before your restorative dentist places the crown."
            },
            {
              q: "Is functional crown lengthening covered by insurance?",
              a: "Yes, functional crown lengthening is typically covered by dental insurance when it's medically necessary for restorative work. We'll verify your benefits and explain any out-of-pocket costs before your procedure. However, we offer flexible affordable payment plans with Care Credit, SunBit and Cherry to make it accessible."
            },
            {
              q: "What insurance do you accept?",
              a: "We acccept Delta Dental and Cigna dental insurance plans. We also offer flexible financing options for patients without insurance with Care Credit, SunBit and Cherry. Our team will help you understand your coverage and payment options."
            },
            {
              q: "Will I have a temporary crown during healing?",
              a: "Your restorative dentist may place a temporary crown or dressing on the tooth while the gums heal. This protects the area and ensures you're comfortable during the healing period."
            },
            {
              q: "Can I have this done on multiple teeth at once?",
              a: "Yes, functional crown lengthening can be performed on multiple teeth in a single appointment if they are adjacent or part of the same restorative plan. We'll discuss the best approach for your specific needs."
            },
            {
              q: "How do I schedule my functional crown lengthening consultation?",
              a: "You can schedule online through our booking platform or call our office directly at (770) 994-5678. We'll coordinate with your restorative dentist to ensure a seamless treatment plan."
            }
          ].map((item, i) => (
            <div key={i} className="p-6 transition-all border section-animate border-primary/10 rounded-2xl bg-white/50 hover:bg-white">
              <h3 className="font-sans text-lg font-bold text-primary">{item.q}</h3>
              <p className="mt-2 font-serif text-primary/70">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION - Conversion Focused */}
      <section className="max-w-6xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="bg-primary/5 rounded-[3rem] overflow-hidden relative p-12 md:p-24 flex flex-col items-center text-center shadow-[inset_0_0_100px_rgba(0,0,0,0.02)] border border-primary/10">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>

          <h2 className="relative z-10 font-serif italic text-4xl md:text-[5rem] text-primary leading-none">
            Ready to Build a Stronger Foundation?
          </h2>
          <p className="relative z-10 max-w-2xl mt-6 font-sans text-lg text-primary/80">
            Schedule your functional crown lengthening consultation with Atlanta's most trusted periodontists. We'll work with your restorative dentist to ensure your crowns, bridges, or veneers have the solid foundation they need to last.
          </p>

          <div className="relative z-10 flex flex-col w-full max-w-md gap-4 mt-12">
            <button
              onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")}
              className="w-full magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-bold text-lg shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all"
            >
              <span className="relative z-10">Book Your Crown Lengthening Consultation</span>
            </button>
            <a
              href="tel:+17709945678"
              className="w-full px-8 py-4 font-sans font-semibold transition-all border rounded-full shadow-sm magnetic-button bg-white/50 text-primary border-primary/10 hover:bg-white"
            >
              <span className="relative z-10">Call Us: (770) 994-5678</span>
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-primary/60">
              <MapPin className="w-4 h-4" />
              <span>Serving Buckhead, Midtown, Sandy Springs, and all of Metro Atlanta</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER with Services */}
      <Footer />
    </div>
  );
};

// --- FOOTER with Services and Legal Links ---
const Footer = () => {
  const services = [
    { name: 'Periodontal Maintenance', path: '/periodontal-maintenance' },
    { name: 'Scaling and Root Planing', path: '/scaling-root-planing' },
    { name: 'Osseous Surgery', path: '/osseous-surgery' },
    { name: 'Frenectomy', path: '/frenectomy' },
    { name: 'Functional Crown Lengthening', path: '/crown-lengthening' },
    { name: 'Aesthetic Crown Lengthening', path: '/aesthetic-crown-lengthening' },
    { name: 'Guided Bone & Tissue Regeneration', path: '/guided-bone-regeneration' },
    { name: 'Dental Implants', path: '/dental-implants' },
    { name: 'Laser Therapy', path: '/laser-therapy' },
    { name: 'LANAP', path: '/lanap' }
  ];

  return (
    <footer className="bg-primary text-white rounded-t-[4rem] px-6 md:px-16 py-16 md:py-24 mt-24 shadow-[0_-20px_50px_rgba(15,23,42,0.1)]">
      <div className="flex flex-col justify-between gap-16 mx-auto max-w-7xl md:flex-row md:gap-8">
        <div className="max-w-sm">
          <div className="mb-4 font-sans text-3xl font-bold tracking-tight text-white">ATL Perio Group</div>
          <p className="font-serif text-lg italic text-white/70">Atlanta's best Periodontist.</p>
        </div>

        <div className="grid grid-cols-2 gap-12 font-sans text-sm md:grid-cols-3">
          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Practice</div>
            <a href="/#philosophy" className="transition-colors link-hover hover:text-accent">Philosophy</a>
            <a href="/#features" className="transition-colors link-hover hover:text-accent">Method</a>
            <a href="/#protocol" className="transition-colors link-hover hover:text-accent">Protocol</a>
            <a href="https://www.google.com/search?q=Atlanta-Periodontal-Group#reviews" className="transition-colors link-hover hover:text-accent">Patient Reviews</a>
          </div>

          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Services</div>
            {services.slice(0, 5).map((service, index) => (
              <a key={index} href={service.path} className="transition-colors hover:text-accent">{service.name}</a>
            ))}
          </div>

          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">More Services</div>
            {services.slice(5).map((service, index) => (
              <a key={index} href={service.path} className="transition-colors hover:text-accent">{service.name}</a>
            ))}
            <div className="mt-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Legal</div>
            <a href="/privacy" className="transition-colors hover:text-accent">Privacy Policy</a>
            <a href="/terms" className="transition-colors hover:text-accent">Terms of Service</a>
            <a href="/accessibility" className="transition-colors hover:text-accent">Accessibility</a>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 pt-8 mx-auto mt-24 border-t max-w-7xl border-white/10 md:flex-row">
        <p className="font-mono text-xs text-white/40">© {new Date().getFullYear()} ATL Perio Group. All rights reserved.</p>
        <div className="flex items-center gap-3 px-4 py-2 border rounded-full shadow-inner bg-white/5 border-white/10">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#06B6D4] animate-pulse"></div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">Systems Operational</span>
        </div>
      </div>
    </footer>
  );
};

export default FunctionalCrownLengthening;