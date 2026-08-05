// src/Alloderm.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, CheckCircle2, Phone, MapPin, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- NAVBAR (reused from Frenectomy) ---
const Navbar = () => {
  const navRef = useRef(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

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

// --- ALLODERM LANDING PAGE ---
const Alloderm = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });

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

  // Schema markup for Alloderm procedure
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Alloderm Grafting",
    "description": "Alloderm soft tissue graft for gum recession and periodontal defects. Expert treatment in Atlanta, GA using advanced regenerative materials.",
    "procedureType": "Gum Grafting",
    "bodyLocation": "Gums (Oral Cavity)",
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
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <Navbar />
      
      {/* HERO SECTION — FIXED MOBILE SPACING (NO OVERLAP) */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden flex items-end pb-32 md:pb-48 px-6 md:px-16 bg-white"
      >
        <div className="absolute inset-0 z-0 bg-[#F8FAFC]">
          <img
            src="https://i.imgur.com/QK2vp5P.jpeg?q=80&w=2600&auto=format&fit=crop"
            alt="Alloderm gum graft Atlanta GA"
            className="object-cover w-full h-full opacity-30 mix-blend-multiply filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl text-primary">
          <div className="hero-element inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider mb-4">
            Advanced Soft Tissue Regeneration
          </div>
          <h1 className="flex flex-col gap-4 md:gap-6">
            <span className="font-sans text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl hero-element text-primary">
              Alloderm Grafting
            </span>
            <span className="hero-element font-serif italic text-4xl md:text-7xl lg:text-[10rem] leading-[0.85] text-accent font-medium">
              Atlanta GA.
            </span>
          </h1>
          <p className="max-w-2xl mt-4 font-serif text-lg md:mt-6 md:text-xl hero-element text-primary/80">
            Restore receded gums, protect tooth roots, and enhance your smile with Alloderm.
            <span className="block mt-2 font-sans text-sm md:text-base text-primary/60">
              Serving Buckhead, Midtown, Sandy Springs, and all of Metro Atlanta.
            </span>
          </p>
          <div className="flex flex-wrap gap-4 mt-6 md:mt-8 hero-element">
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
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm md:gap-6 md:mt-6 hero-element text-primary/60">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              Minimally Invasive
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

      {/* WHAT IS ALLODERM - Section 1 */}
      <section ref={containerRef} className="max-w-6xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">What We Use</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              What Is Alloderm?
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              Alloderm is a revolutionary regenerative tissue matrix derived from donated human skin, processed to remove cellular material while preserving the natural collagen scaffold. This biocompatible material is then used to reinforce and augment soft tissues in the mouth, particularly for treating gum recession, covering exposed roots, and enhancing the aesthetic appearance of the gums.
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              Unlike traditional autografts (tissue taken from the patient's own palate), Alloderm eliminates the need for a second surgical site, reducing discomfort and recovery time. Its natural composition encourages the body's own cells to repopulate the graft, resulting in strong, healthy tissue that blends seamlessly with your existing gums.
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
                src="https://i.imgur.com/QK2vp5P.jpeg?q=80&w=2600&auto=format&fit=crop"
                alt="Alloderm tissue graft material"
                className="object-cover w-full h-full filter grayscale opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-xs p-6 border border-white shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                  <p className="font-serif text-lg italic text-center text-primary/80">
                    "Alloderm offers predictable, long-lasting results without the need for a palatal donor site."
                  </p>
                  <p className="mt-2 font-mono text-xs text-center text-primary/50">— Dr. Marya J. Barnes, DDS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO NEEDS ALLODERM - Section 2 */}
      <section className="px-6 py-16 bg-primary/5 md:py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">Indications</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              Who Can Benefit from Alloderm Grafting?
            </h2>
            <p className="max-w-2xl mx-auto mt-4 font-serif text-lg text-primary/70">
              Alloderm is ideal for patients with gum recession, thin gum tissue, or those seeking aesthetic enhancement of their smile line.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
            {[
              {
                icon: "🦷",
                title: "Gum Recession",
                desc: "Exposed tooth roots due to receding gums, leading to sensitivity, decay, and aesthetic concerns."
              },
              {
                icon: "😁",
                title: "Aesthetic Gum Contouring",
                desc: "Creating a symmetrical, natural-looking gum line for a more beautiful smile."
              },
              {
                icon: "🛡️",
                title: "Thin Biotype / Fragile Gums",
                desc: "Patients with thin gum tissue who are at higher risk for recession and need reinforcement."
              }
            ].map((item, i) => (
              <div key={i} className="section-animate bg-white p-8 rounded-3xl border border-primary/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-center">
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="font-sans text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-2 font-serif text-primary/70">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
            {[
              "Root sensitivity to hot/cold",
              "Visible root surfaces",
              "Uneven gum line",
              "History of gum disease",
              "Previous gum surgery",
              "Desire for aesthetic improvement"
            ].map((symptom, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border section-animate bg-white/80 rounded-xl border-primary/5">
                <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-accent" />
                <span className="font-serif text-primary/70">{symptom}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center section-animate">
            <p className="font-serif text-lg text-primary/70">
              <strong>Don't let gum recession compromise your oral health or confidence.</strong> Alloderm can restore your smile without the need for a secondary surgical site.
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
              src="https://i.imgur.com/QK2vp5P.jpeg?q=80&w=2600&auto=format&fit=crop"
              alt="Alloderm grafting procedure Atlanta"
              className="rounded-3xl shadow-lg border border-primary/5 object-cover w-full h-[350px]"
            />
          </div>
          <div className="order-1 section-animate md:order-2">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">The Process</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              What to Expect During Your Alloderm Graft
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              The grafting procedure is performed under local anesthesia and typically takes about 60–90 minutes. The Alloderm material is carefully placed over the recession area and secured with micro-sutures, promoting rapid integration with your existing tissues.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  step: "Step 1",
                  title: "Evaluation and Planning",
                  desc: "We'll assess your gum recession, take digital impressions, and plan the optimal graft placement for natural-looking results."
                },
                {
                  step: "Step 2",
                  title: "Preparation and Anesthesia",
                  desc: "Local anesthesia is administered to ensure complete comfort. The graft site is gently prepared to receive the Alloderm material."
                },
                {
                  step: "Step 3",
                  title: "Graft Placement",
                  desc: "The Alloderm is precisely positioned over the recession area and sutured into place. The material acts as a scaffold, encouraging your body's cells to create new, healthy tissue."
                },
                {
                  step: "Step 4",
                  title: "Healing and Follow-Up",
                  desc: "Healing typically takes 1-2 weeks. We'll provide aftercare instructions and schedule a follow-up visit to monitor your progress."
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
                Schedule Your Alloderm Graft
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
              Why Alloderm Is a Superior Choice
            </h2>
            <p className="max-w-2xl mx-auto mt-4 font-serif text-lg text-primary/70">
              Alloderm offers a safe, effective, and comfortable alternative to traditional gum grafting techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
            {[
              {
                icon: "✅",
                title: "No Donor Site",
                desc: "Eliminates the need for a palatal harvest, reducing pain and accelerating recovery."
              },
              {
                icon: "🔄",
                title: "Natural Tissue Integration",
                desc: "The acellular matrix allows your own cells to repopulate the graft, creating strong, natural-looking tissue."
              },
              {
                icon: "⏱️",
                title: "Shorter Recovery Time",
                desc: "Patients typically experience less post-operative discomfort and return to normal activities sooner."
              },
              {
                icon: "🦷",
                title: "Root Coverage & Protection",
                desc: "Effectively covers exposed root surfaces, reducing sensitivity and preventing further recession."
              },
              {
                icon: "😁",
                title: "Aesthetic Excellence",
                desc: "Achieves a harmonious gum line that blends seamlessly with your smile."
              },
              {
                icon: "🏥",
                title: "Proven Success Rate",
                desc: "Alloderm has been used for decades with high success rates and excellent patient satisfaction."
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
            Frequently Asked Questions About Alloderm
          </h2>
          <p className="max-w-2xl mx-auto mt-4 font-serif text-primary/70">
            Common questions from our Atlanta patients about Alloderm grafting.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {[
            {
              q: "What is the success rate of Alloderm grafts?",
              a: "Alloderm has a high success rate, with studies showing over 90% root coverage in properly selected cases. The material integrates well with your own tissue and provides long-lasting results."
            },
            {
              q: "Is the procedure painful?",
              a: "The procedure is performed under local anesthesia, so you won't feel pain during the grafting. Some soreness may occur afterward, but it's typically manageable with over-the-counter pain relievers."
            },
            {
              q: "How long does the procedure take?",
              a: "The grafting usually takes 60–90 minutes, depending on the extent of the recession. We'll give you a more accurate estimate during your consultation."
            },
            {
              q: "How long is recovery?",
              a: "Most patients experience mild discomfort for 2-3 days and can return to normal activities within a week. Full healing of the graft site takes about 2–4 weeks, but you'll be able to eat soft foods shortly after the procedure."
            },
            {
              q: "Is Alloderm safe?",
              a: "Yes. Alloderm is processed from donated human tissue that undergoes rigorous screening and sterilization to ensure safety. It's widely used in dental and medical procedures and has an excellent safety record."
            },
            {
              q: "Will my gums look natural after the graft?",
              a: "Yes. The Alloderm material is designed to blend seamlessly with your existing gum tissue. Over time, your body's cells will replace the graft with new, healthy tissue, resulting in a natural appearance."
            },
            {
              q: "Does insurance cover Alloderm grafting?",
              a: "Many dental insurance plans cover a portion of the procedure when it's medically necessary (e.g., to protect roots or treat gum disease). We'll verify your benefits and provide a cost estimate before treatment. We also offer affordable payment plans with Care Credit, SunBit, and Cherry."
            },
            {
              q: "What insurance do you accept?",
              a: "We accept Delta Dental and Cigna insurance plans. For patients without coverage, we offer flexible financing options to make treatment accessible."
            }
          ].map((item, i) => (
            <div key={i} className="p-6 transition-all border section-animate border-primary/10 rounded-2xl bg-white/50 hover:bg-white">
              <h3 className="font-sans text-lg font-bold text-primary">{item.q}</h3>
              <p className="mt-2 font-serif text-primary/70">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="max-w-6xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="bg-primary/5 rounded-[3rem] overflow-hidden relative p-12 md:p-24 flex flex-col items-center text-center shadow-[inset_0_0_100px_rgba(0,0,0,0.02)] border border-primary/10">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>

          <h2 className="relative z-10 font-serif italic text-4xl md:text-[5rem] text-primary leading-none">
            Restore Your Smile with Alloderm
          </h2>
          <p className="relative z-10 max-w-2xl mt-6 font-sans text-lg text-primary/80">
            Reclaim your confidence, protect your teeth, and enjoy a healthier, more beautiful smile. Schedule your Alloderm consultation with Atlanta's leading periodontists today.
          </p>

          <div className="relative z-10 flex flex-col w-full max-w-md gap-4 mt-12">
            <button
              onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")}
              className="w-full magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-bold text-lg shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all"
            >
              <span className="relative z-10">Book Your Alloderm Consultation</span>
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

      {/* FOOTER (UPDATED WITH INSURANCE & PAYMENT COLUMN) */}
      <Footer />
    </div>
  );
};

// --- FOOTER (same as in App.jsx, with 4 columns) ---
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
    { name: 'LANAP', path: '/lanap' },
    // Add Alloderm when route is ready
  ];

  return (
    <footer className="bg-primary text-white rounded-t-[4rem] px-6 md:px-16 py-16 md:py-24 mt-24 shadow-[0_-20px_50px_rgba(15,23,42,0.1)]">
      <div className="flex flex-col justify-between gap-16 mx-auto max-w-7xl md:flex-row md:gap-8">
        <div className="max-w-sm">
          <div className="mb-4 font-sans text-3xl font-bold tracking-tight text-white">ATL Perio Group</div>
          <p className="font-serif text-lg italic text-white/70">Atlanta's best Periodontist.</p>
        </div>

        <div className="grid grid-cols-2 gap-12 font-sans text-sm md:grid-cols-4">
          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Practice</div>
            <a href="/#philosophy" className="transition-colors link-hover hover:text-accent">Philosophy</a>
            <a href="/#features" className="transition-colors link-hover hover:text-accent">Method</a>
            <a href="/#protocol" className="transition-colors link-hover hover:text-accent">Protocol</a>
            <a href="https://www.google.com/search?q=Atlanta-Periodontal-Group#reviews" className="transition-colors link-hover hover:text-accent">Patient Reviews</a>
          </div>

          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Services</div>
            {services.map((service, index) => (
              <a key={index} href={service.path} className="transition-colors hover:text-accent">{service.name}</a>
            ))}
          </div>

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

          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Legal</div>
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

export default Alloderm;