import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, CheckCircle2, Phone, MapPin, ChevronDown } from 'lucide-react';

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

// --- AESTHETIC CROWN LENGTHENING LANDING PAGE ---
const AestheticCrownLengthening = () => {
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
    "name": "Aesthetic Crown Lengthening",
    "description": "Professional aesthetic crown lengthening in Atlanta, GA. Expert cosmetic periodontal surgery to correct a gummy smile and enhance your smile aesthetics.",
    "procedureType": "Cosmetic Periodontal Surgery",
    "bodyLocation": "Gums (Anterior Teeth)",
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
            alt="Aesthetic Crown Lengthening Atlanta GA - Gummy Smile Correction"
            className="object-cover w-full h-full opacity-30 mix-blend-multiply filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl text-primary">
          <div className="hero-element inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider mb-4">
            Cosmetic Periodontal Surgery
          </div>
          <h1 className="flex flex-col gap-1 md:gap-2">
            <span className="font-sans text-3xl font-bold tracking-tighter hero-element md:text-5xl lg:text-6xl text-primary">
              Aesthetic Crown Lengthening
            </span>
            <span className="hero-element font-serif italic text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.85] text-accent font-medium">
              Atlanta GA.
            </span>
          </h1>
          <p className="max-w-2xl mt-6 font-serif text-xl hero-element md:mt-8 text-primary/80">
            Transform your smile by reshaping your gum line to reveal more of your natural tooth structure.
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
              Gummy Smile Correction
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

      {/* WHAT IS AESTHETIC CROWN LENGTHENING - Section 1 */}
      <section ref={containerRef} className="max-w-6xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">What We Do</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              What Is Aesthetic Crown Lengthening?
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              Aesthetic crown lengthening is a cosmetic periodontal procedure that reshapes the gum tissue and underlying bone around your front teeth to expose more of your natural tooth surface. The goal is to create a more balanced, harmonious smile by reducing the appearance of a "gummy smile" where excess gum tissue covers too much of the tooth structure.
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              Unlike functional crown lengthening, which is performed to support restorative work, <strong>aesthetic crown lengthening</strong> is done purely for cosmetic improvement. By recontouring the gum line, we can create a more proportional and symmetrical appearance, giving you the confidence to smile freely.
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
                alt="Aesthetic crown lengthening treatment Atlanta GA"
                className="object-cover w-full h-full filter grayscale opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-xs p-6 border border-white shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                  <p className="font-serif text-lg italic text-center text-primary/80">
                    "The art of revealing your most beautiful smile."
                  </p>
                  <p className="mt-2 font-mono text-xs text-center text-primary/50">— Dr. Marya J. Barnes, DDS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO BENEFITS FROM AESTHETIC CROWN LENGTHENING - Section 2 (with emojis) */}
      <section className="px-6 py-16 bg-primary/5 md:py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">Indications</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              Who Benefits from Aesthetic Crown Lengthening?
            </h2>
            <p className="max-w-2xl mx-auto mt-4 font-serif text-lg text-primary/70">
              If you feel your smile is too gummy or your teeth appear short, aesthetic crown lengthening may be the perfect solution.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
            {[
              {
                icon: "✨",
                title: "Excessive Gingival Display (Gummy Smile)",
                desc: "When your gums cover more than 2–3mm of your teeth, aesthetic crown lengthening can create a more balanced proportion."
              },
              {
                icon: "👑",
                title: "Short, Box-Looking Teeth",
                desc: "If your teeth appear small or square due to excess gum tissue, we can lengthen them to create a more youthful, elongated appearance."
              },
              {
                icon: "🏆",
                title: "Uneven Gum Line",
                desc: "An asymmetrical gum line can be corrected for a more harmonious and symmetrical smile."
              },
              {
                icon: "🛡️",
                title: "Before Veneers or Cosmetic Bonding",
                desc: "Exposing more tooth structure creates a better surface for veneers or bonding, ensuring a seamless and natural result."
              },
              {
                icon: "✅",
                title: "General Cosmetic Enhancement",
                desc: "Even without a severe condition, many patients choose aesthetic crown lengthening to achieve the perfect smile they've always wanted."
              }
            ].map((item, i) => (
              <div key={i} className="section-animate bg-white p-8 rounded-3xl border border-primary/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="font-sans text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-2 font-serif text-primary/70">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center section-animate">
            <p className="font-serif text-lg text-primary/70">
              <strong>Your ideal smile is within reach.</strong> Aesthetic crown lengthening is a permanent solution that can dramatically improve your self-confidence.
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
              alt="Aesthetic crown lengthening procedure Atlanta"
              className="rounded-3xl shadow-lg border border-primary/5 object-cover w-full h-[350px]"
            />
          </div>
          <div className="order-1 section-animate md:order-2">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">The Process</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              What to Expect During Aesthetic Crown Lengthening
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              The procedure is performed under local anesthesia, and sedation options are available for anxious patients. Most cases take about 60–90 minutes, depending on the number of teeth involved.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  step: "Step 1",
                  title: "Anesthesia and Incision",
                  desc: "After numbing the area, we make careful incisions to gently lift the gum tissue away from the teeth and bone."
                },
                {
                  step: "Step 2",
                  title: "Bone Reshaping (If Needed)",
                  desc: "If necessary, we recontour the underlying bone to create the optimal gum-to-tooth ratio and ensure long-lasting results."
                },
                {
                  step: "Step 3",
                  title: "Gum Recontouring and Suturing",
                  desc: "The gum tissue is repositioned at the new level to create a symmetrical, aesthetically pleasing gum line, then sutured in place."
                },
                {
                  step: "Step 4",
                  title: "Healing and Reveal",
                  desc: "After 4–6 weeks of healing, the final result is revealed – a stunning, balanced smile with beautifully proportioned teeth."
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
                Schedule Your Aesthetic Procedure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS - Section 4 (with emojis) */}
      <section className="px-6 py-16 bg-primary/5 md:py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">Benefits</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              Why Aesthetic Crown Lengthening Is the Right Choice
            </h2>
            <p className="max-w-2xl mx-auto mt-4 font-serif text-lg text-primary/70">
              This cosmetic procedure offers numerous benefits, both aesthetically and psychologically.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
            {[
              {
                icon: "✨",
                title: "Dramatic Smile Transformation",
                desc: "By revealing more of your natural tooth structure, your smile becomes brighter, more symmetrical, and more youthful."
              },
              {
                icon: "✅",
                title: "Permanent, Natural Results",
                desc: "Once healed, the results are permanent. Your new gum line is stable and will not recede or shift."
              },
              {
                icon: "🛡️",
                title: "Improved Confidence and Self-Esteem",
                desc: "A smile you're proud of can positively impact every aspect of your life, from professional to personal."
              },
              {
                icon: "🏆",
                title: "Minimal Downtime",
                desc: "Most patients return to normal activities within a few days, and the results are worth the short recovery period."
              }
            ].map((item, i) => (
              <div key={i} className="section-animate bg-white p-8 rounded-3xl border border-primary/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex gap-4">
                <div className="flex-shrink-0 mt-1 text-3xl">{item.icon}</div>
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
            Frequently Asked Questions About Aesthetic Crown Lengthening
          </h2>
          <p className="max-w-2xl mx-auto mt-4 font-serif text-primary/70">
            Answers to the most common questions from our patients in Atlanta.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {[
            {
              q: "Is aesthetic crown lengthening painful?",
              a: "We use local anesthesia to ensure you are comfortable during the procedure. Post-operative discomfort is usually mild and can be managed with over-the-counter pain relievers. We'll prescribe medication if needed."
            },
            {
              q: "How long does the procedure take?",
              a: "Most cases take about 60–90 minutes, depending on the number of teeth involved. For a single tooth or a small area, it may be quicker."
            },
            {
              q: "How long is the recovery time?",
              a: "Most patients resume normal activities the same day. The gums will heal over 4–6 weeks, during which time we'll schedule a follow-up to ensure healing is progressing beautifully."
            },
            {
              q: "Is aesthetic crown lengthening covered by insurance?",
              a: "Since this is a cosmetic procedure, it is typically not covered by dental insurance. However, we offer flexible affordable payment plans with Care Credit, SunBit and Cherry to make it accessible."
            },
            {
              q: "Will my teeth look longer immediately?",
              a: "You will see the new tooth length immediately after the procedure, but the final aesthetic result becomes fully visible after healing and any minor swelling subsides."
            },
            {
              q: "Can I combine this with veneers or bonding?",
              a: "Absolutely! Many patients choose aesthetic crown lengthening as a prelude to veneers or cosmetic bonding to ensure a flawless, natural-looking result. We'll coordinate with your dentist."
            },
            {
              q: "How do I schedule my aesthetic crown lengthening consultation?",
              a: "You can schedule online through our booking platform or call our office directly at (770) 994-5678. We'll conduct a smile assessment and determine if this procedure is right for you."
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
            Ready to Reveal Your Perfect Smile?
          </h2>
          <p className="relative z-10 max-w-2xl mt-6 font-sans text-lg text-primary/80">
            Schedule your aesthetic crown lengthening consultation with Atlanta's most trusted periodontists. Let us help you achieve the beautiful, balanced smile you've always dreamed of.
          </p>

          <div className="relative z-10 flex flex-col w-full max-w-md gap-4 mt-12">
            <button
              onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")}
              className="w-full magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-bold text-lg shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all"
            >
              <span className="relative z-10">Book Your Aesthetic Consultation</span>
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

// --- 7. FOOTER (UPDATED WITH LOCATION & CONTACT INFO) ---
const Footer = () => {
  const services = [
    { name: 'Alloderm', path: '/alloderm' },
    { name: 'Soft Tissue Grafting', path: '/soft-tissue-grafting' },
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
        {/* Column 1: Practice + Contact Info */}
        <div className="max-w-sm">
          <div className="mb-4 font-sans text-3xl font-bold tracking-tight text-white">ATL Perio Group</div>

          {/* Location */}
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <div>
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-white/60">Location</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=1580+Phoenix+Blvd+Suite+150+Atlanta+GA+30349"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-1 transition-colors hover:text-accent hover:underline"
              >
                1580 Phoenix Blvd, Suite 150,<br />
                Atlanta, GA 30349
              </a>
            </div>

            {/* Phone & Text */}
            <div>
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-white/60">Contact</span>
              <div className="mt-1 space-y-1">
                <a href="tel:+17709945678" className="block transition-colors hover:text-accent hover:underline">
                  Phone: (770) 994-5678
                </a>
                <a href="tel:+17709945678" className="block transition-colors hover:text-accent hover:underline">
                  Text Us: (770) 994-5678
                </a>
              </div>
            </div>

            {/* Hours */}
            <div>
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-white/60">Hours</span>
              <div className="mt-1 space-y-0.5 text-sm leading-relaxed">
                <div>Monday: 9 AM – 3 PM</div>
                <div>Tuesday – Thursday: 8 AM – 4 PM</div>
                <div>Friday: 9 AM – 3 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columns 2-4: Services, Insurance & Payment, Legal (unchanged) */}
        <div className="grid grid-cols-2 gap-12 font-sans text-sm md:grid-cols-4">
          {/* Column 2: Services */}
          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Services</div>
            {services.map((service, index) => (
              <a key={index} href={service.path} className="transition-colors hover:text-accent">{service.name}</a>
            ))}
          </div>

          {/* Column 3: Insurance & Payment */}
          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Insurance &amp; Payment</div>
            <p className="text-sm">Accepts <span className="text-white/90">Delta</span> and <span className="text-white/90">Gigna</span> dental insurance</p>
            <p className="text-sm">
              Affordable payment plans with{' '}
              <a href="https://www.carecredit.com/" target="_blank" rel="noopener noreferrer" className="underline transition-colors text-white/90 hover:text-accent underline-offset-2">
                Care Credit
              </a>
              ,{' '}
              <a href="https://sunbit.com/" target="_blank" rel="noopener noreferrer" className="underline transition-colors text-white/90 hover:text-accent underline-offset-2">
                SunBit
              </a>
              ,{' '}
              <a href="https://www.cherry.com/" target="_blank" rel="noopener noreferrer" className="underline transition-colors text-white/90 hover:text-accent underline-offset-2">
                Cherry
              </a>
            </p>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Legal</div>
            <a href="/privacy" className="transition-colors hover:text-accent">Privacy Policy</a>
            <a href="/terms" className="transition-colors hover:text-accent">Terms of Service</a>
            <a href="/accessibility" className="transition-colors hover:text-accent">Accessibility</a>
          </div>
        </div>
      </div>

      {/* Footer bottom bar (unchanged) */}
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

export default AestheticCrownLengthening;