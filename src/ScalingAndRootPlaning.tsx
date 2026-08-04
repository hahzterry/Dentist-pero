import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronRight,
  CheckCircle2,
  Phone,
  MapPin,
  User,
  Shield,
  Clock,
  Award,
  ChevronDown,
  Droplet,
  Wind,
  Eye,
  Frown,
  Circle,
  Tooth, // added just in case
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- NAVBAR with Services Dropdown ---
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
        onEnter: () =>
          gsap.to(navRef.current, {
            backgroundColor: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(24px)',
            color: '#0F172A',
            borderColor: 'rgba(255,255,255,0.8)',
            duration: 0.3,
          }),
        onLeaveBack: () =>
          gsap.to(navRef.current, {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)',
            color: '#0F172A',
            borderColor: 'transparent',
            duration: 0.3,
          }),
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
    { name: 'LANAP', path: '/lanap' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-[3rem] w-[90%] max-w-4xl border border-transparent shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
    >
      <a href="/" className="font-sans text-lg font-bold tracking-tight">
        ATL Perio Group
      </a>
      <div className="hidden md:flex items-center gap-8 font-serif italic text-[1.1rem]">
        <a href="/#philosophy" className="transition-colors link-hover hover:text-accent">
          Philosophy
        </a>
        <a href="/#features" className="transition-colors link-hover hover:text-accent">
          Method
        </a>
        <a href="/#protocol" className="transition-colors link-hover hover:text-accent">
          Protocol
        </a>
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
        onClick={() => window.open('https://book.modento.io/atlanta-periodontal-group', '_blank')}
        className="magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-5 py-2 rounded-full font-sans font-medium text-sm flex items-center gap-2 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_5px_15px_rgba(6,182,212,0.3)]"
      >
        <span className="relative z-10 block">Consultation</span>
      </button>
    </nav>
  );
};

// --- SCALING AND ROOT PLANING LANDING PAGE ---
const ScalingAndRootPlaning = () => {
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
        delay: 0.2,
      });

      gsap.from('.section-animate', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Scaling and Root Planing',
    description:
      'Professional scaling and root planing (deep cleaning) in Atlanta, GA. Expert non-surgical periodontal treatment for gum disease.',
    procedureType: 'Non-surgical Periodontal Therapy',
    bodyLocation: 'Gums and Teeth',
    provider: {
      '@type': 'Dentist',
      name: 'Atlanta Periodontal Group',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Atlanta',
        addressRegion: 'GA',
        postalCode: '30301',
      },
      telephone: '(770) 994-5678',
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      <Navbar />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[90vh] overflow-hidden flex items-end pb-24 md:pb-32 px-6 md:px-16 bg-white"
      >
        <div className="absolute inset-0 z-0 bg-[#F8FAFC]">
          <img
            src="https://i.imgur.com/BPiVuyf.jpeg?q=80&w=2600&auto=format&fit=crop"
            alt="Scaling and Root Planing Atlanta GA - Deep Cleaning Treatment"
            className="object-cover w-full h-full opacity-30 mix-blend-multiply filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl text-primary">
          <div className="hero-element inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider mb-4">
            Non-Surgical Gum Disease Treatment
          </div>
          <h1 className="flex flex-col gap-1 md:gap-2">
            <span className="font-sans text-3xl font-bold tracking-tighter hero-element md:text-5xl lg:text-6xl text-primary">
              Scaling and Root Planing
            </span>
            <span className="hero-element font-serif italic text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.85] text-accent font-medium">
              Atlanta GA.
            </span>
          </h1>
          <p className="max-w-2xl mt-6 font-serif text-xl hero-element md:mt-8 text-primary/80">
            Professional deep cleaning to treat gum disease and restore your oral health.
            <span className="block mt-2 font-sans text-base text-primary/60">
              Serving Buckhead, Midtown, Sandy Springs, and all of Metro Atlanta.
            </span>
          </p>
          <div className="flex flex-wrap gap-4 mt-10 hero-element">
            <button
              onClick={() => window.open('https://book.modento.io/atlanta-periodontal-group', '_blank')}
              className="magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-semibold flex items-center gap-2 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] border border-white/20"
            >
              <span className="relative z-10 block">Book Your Deep Cleaning</span>
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
              Non-Surgical Treatment
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

      {/* WHAT IS SCALING AND ROOT PLANING */}
      <section ref={containerRef} className="max-w-6xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">What We Do</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              What Is Scaling and Root Planing?
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              Scaling and root planing is a non‑surgical periodontal therapy that removes plaque, tartar, and bacterial
              toxins from below the gum line. Unlike a routine dental cleaning, this deep cleaning procedure targets the
              root surfaces of your teeth to eliminate infection and promote healing of the gum tissue.
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              This procedure is the gold standard for treating early to moderate gum disease (periodontitis). By removing
              the bacterial deposits that cause inflammation, scaling and root planing allows your gums to reattach to the
              tooth roots, reducing pocket depths and preventing further bone loss.
            </p>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => window.open('https://book.modento.io/atlanta-periodontal-group', '_blank')}
                className="magnetic-button bg-accent text-white px-6 py-3 rounded-full font-sans font-semibold text-sm shadow-[0_5px_20px_rgba(6,182,212,0.3)]"
              >
                Schedule Your Deep Cleaning
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center section-animate">
            <div className="relative w-full aspect-[4/3] bg-primary/5 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2600&auto=format&fit=crop"
                alt="Scaling and root planing treatment Atlanta GA"
                className="object-cover w-full h-full filter grayscale opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-xs p-6 border border-white shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                  <p className="font-serif text-lg italic text-center text-primary/80">
                    "Non‑surgical treatment that stops gum disease in its tracks."
                  </p>
                  <p className="mt-2 font-mono text-xs text-center text-primary/50">— Dr. Marya J. Barnes, DDS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNS YOU NEED SCALING AND ROOT PLANING */}
      <section className="px-6 py-16 bg-primary/5 md:py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">Symptoms</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              Signs You May Need Scaling and Root Planing
            </h2>
            <p className="max-w-2xl mx-auto mt-4 font-serif text-lg text-primary/70">
              Gum disease often develops silently. If you're experiencing any of these symptoms, you may need professional
              deep cleaning treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
            {[
              {
                icon: <Droplet className="w-8 h-8 text-accent" />,
                title: 'Bleeding Gums',
                desc: 'Gums that bleed when you brush or floss are one of the earliest signs of gum disease.',
              },
              {
                icon: <Wind className="w-8 h-8 text-accent" />,
                title: 'Persistent Bad Breath',
                desc: 'Chronic halitosis can be a sign of bacterial infection in the gum pockets.',
              },
              {
                icon: <Eye className="w-8 h-8 text-accent" />,
                title: 'Receding Gums',
                desc: 'Gums that pull away from your teeth expose root surfaces and create deep pockets.',
              },
              {
                icon: <User className="w-8 h-8 text-accent" />,
                title: 'Loose Teeth',
                desc: 'Bone loss from advanced gum disease can cause teeth to shift or become mobile.',
              },
              {
                icon: <Frown className="w-8 h-8 text-accent" />,
                title: 'Tender or Swollen Gums',
                desc: 'Inflamed gum tissue is a classic sign of active periodontal infection.',
              },
              {
                icon: <Circle className="w-8 h-8 text-accent" />,
                title: 'Red or Dark Gums',
                desc: 'Healthy gums are pink. Red, dark, or purplish gums indicate inflammation.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="section-animate bg-white p-8 rounded-3xl border border-primary/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-sans text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-2 font-serif text-primary/70">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center section-animate">
            <p className="font-serif text-lg text-primary/70">
              <strong>Don't wait for symptoms to worsen.</strong> Early treatment prevents tooth loss and protects your
              overall health.
            </p>
            <button
              onClick={() => window.open('https://book.modento.io/atlanta-periodontal-group', '_blank')}
              className="mt-6 magnetic-button bg-accent text-white px-8 py-3 rounded-full font-sans font-semibold shadow-[0_5px_20px_rgba(6,182,212,0.3)]"
            >
              Request a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* THE PROCEDURE */}
      <section className="max-w-6xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="order-2 section-animate md:order-1">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2600&auto=format&fit=crop"
              alt="Scaling and root planing procedure Atlanta"
              className="rounded-3xl shadow-lg border border-primary/5 object-cover w-full h-[350px]"
            />
          </div>
          <div className="order-1 section-animate md:order-2">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">The Process</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              What to Expect During Your Deep Cleaning
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-primary/70">
              Scaling and root planing is typically completed in two visits, with local anesthesia to ensure your comfort
              throughout the procedure.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  step: 'Step 1',
                  title: 'Comprehnsive Examination',
                  desc: "We'll evaluate your gum health, measure pocket depths, take X‑rays, and develop a customized treatment plan.",
                },
                {
                  step: 'Step 2',
                  title: 'Scaling (Removal of Tartar)',
                  desc: "Using specialized instruments, we'll remove plaque and tartar from above and below the gum line.",
                },
                {
                  step: 'Step 3',
                  title: 'Root Planing (Smoothing the Roots)',
                  desc: "We'll smooth the root surfaces to remove bacterial toxins and help your gums reattach to your teeth.",
                },
                {
                  step: 'Step 4',
                  title: 'Post‑Treatment Care',
                  desc: "We'll provide detailed instructions for home care and schedule your follow‑up maintenance visits.",
                },
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
                onClick={() => window.open('https://book.modento.io/atlanta-periodontal-group', '_blank')}
                className="magnetic-button bg-accent text-white px-6 py-3 rounded-full font-sans font-semibold text-sm shadow-[0_5px_20px_rgba(6,182,212,0.3)]"
              >
                Schedule Your Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-6 py-16 bg-primary/5 md:py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center section-animate">
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">Benefits</span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
              Why Scaling and Root Planing Is the Right Choice
            </h2>
            <p className="max-w-2xl mx-auto mt-4 font-serif text-lg text-primary/70">
              This non‑surgical treatment offers numerous benefits for your oral and overall health.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
            {[
              {
                icon: <Shield className="w-6 h-6 text-accent" />,
                title: 'Prevents Tooth Loss',
                desc: 'By stopping gum disease in its tracks, scaling and root planing prevents the bone loss that leads to tooth loss.',
              },
              {
                icon: <Clock className="w-6 h-6 text-accent" />,
                title: 'Long‑Lasting Results',
                desc: 'With proper maintenance, the results of scaling and root planing can last for years, protecting your smile long‑term.',
              },
              {
                icon: <Award className="w-6 h-6 text-accent" />,
                title: 'Non‑Surgical Treatment',
                desc: 'Scaling and root planing is a non‑invasive alternative to surgical periodontal procedures.',
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-accent" />,
                title: 'Improved Oral Health',
                desc: 'Healthy gums contribute to fresh breath, healthier teeth, and a more confident smile.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="section-animate bg-white p-8 rounded-3xl border border-primary/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex gap-4"
              >
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

      {/* FAQ */}
      <section className="max-w-4xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="text-center section-animate">
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-accent">FAQ</span>
          <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl text-primary">
            Frequently Asked Questions About Scaling and Root Planing
          </h2>
          <p className="max-w-2xl mx-auto mt-4 font-serif text-primary/70">
            Answers to the most common questions from our patients in Atlanta.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {[
            {
              q: 'Is scaling and root planing painful?',
              a: 'We use local anesthesia to numb the treatment area, so you should not feel pain during the procedure. Some discomfort may occur after the numbing wears off, but this typically subsides within a few days and can be managed with over‑the‑counter pain relievers.',
            },
            {
              q: 'How long does the procedure take?',
              a: 'Scaling and root planing is usually performed in two to four appointments, with each session lasting approximately 60 to 90 minutes. The total number of visits depends on the severity of your gum disease and the number of teeth requiring treatment.',
            },
            {
              q: 'Is scaling and root planing covered by insurance?',
              a: "Yes, scaling and root planing is typically covered by most dental insurance plans. We'll verify your benefits and explain any out‑of‑pocket costs before your treatment. We also offer flexible payment options for patients without insurance. However, we offer flexible affordable payment plans with Care Credit, SunBit and Cherry to make it accessible.",
            },
            {
              q: "What insurance do you accept?",
              a: "We acccept Delta Dental and Cigna dental insurance plans. We also offer flexible financing options for patients without insurance with Care Credit, SunBit and Cherry. Our team will help you understand your coverage and payment options."
            },
            {
              q: 'What is the recovery time?',
              a: 'Most patients return to normal activities within 24 hours. Your gums may feel sensitive for a few days, and you may experience some minor bleeding. We’ll provide specific post‑treatment instructions to ensure a smooth recovery.',
            },
            {
              q: 'Will my gums grow back after treatment?',
              a: 'While scaling and root planing cannot regenerate lost gum tissue, it can help your gums reattach more securely to your teeth and prevent further recession. Following maintenance therapy, you can expect improved gum health and reduced pocket depths.',
            },
            {
              q: 'Do I still need regular cleanings after scaling and root planing?',
              a: 'Yes, patients with a history of gum disease require regular periodontal maintenance visits every 3 to 4 months. These visits are essential to prevent the recurrence of disease and maintain your treatment results.',
            },
            {
              q: 'How do I schedule my scaling and root planing appointment?',
              a: "You can schedule online through our booking platform or call our office directly at (770) 994‑5678. We'll work with you to find a convenient time and answer any additional questions you may have.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 transition-all border section-animate border-primary/10 rounded-2xl bg-white/50 hover:bg-white"
            >
              <h3 className="font-sans text-lg font-bold text-primary">{item.q}</h3>
              <p className="mt-2 font-serif text-primary/70">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-6xl px-6 py-16 mx-auto md:py-24 md:px-16">
        <div className="bg-primary/5 rounded-[3rem] overflow-hidden relative p-12 md:p-24 flex flex-col items-center text-center shadow-[inset_0_0_100px_rgba(0,0,0,0.02)] border border-primary/10">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>
          <h2 className="relative z-10 font-serif italic text-4xl md:text-[5rem] text-primary leading-none">
            Ready to Stop Gum Disease in Its Tracks?
          </h2>
          <p className="relative z-10 max-w-2xl mt-6 font-sans text-lg text-primary/80">
            Schedule your scaling and root planing appointment with Atlanta's most trusted periodontists. Let us help you
            protect your smile and your overall health with expert, non‑surgical treatment.
          </p>
          <div className="relative z-10 flex flex-col w-full max-w-md gap-4 mt-12">
            <button
              onClick={() => window.open('https://book.modento.io/atlanta-periodontal-group', '_blank')}
              className="w-full magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-bold text-lg shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all"
            >
              <span className="relative z-10">Book Your Deep Cleaning</span>
            </button>
            <a
              href="tel:+17709945678"
              className="w-full px-8 py-4 font-sans font-semibold transition-all border rounded-full shadow-sm magnetic-button bg-white/50 text-primary border-primary/10 hover:bg-white"
            >
              <span className="relative z-10">Call Us: (770) 994‑5678</span>
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-primary/60">
              <MapPin className="w-4 h-4" />
              <span>Serving Buckhead, Midtown, Sandy Springs, and all of Metro Atlanta</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// --- FOOTER ---
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
            <a href="/#philosophy" className="transition-colors link-hover hover:text-accent">
              Philosophy
            </a>
            <a href="/#features" className="transition-colors link-hover hover:text-accent">
              Method
            </a>
            <a href="/#protocol" className="transition-colors link-hover hover:text-accent">
              Protocol
            </a>
            <a
              href="https://www.google.com/search?q=Atlanta-Periodontal-Group#reviews"
              className="transition-colors link-hover hover:text-accent"
            >
              Patient Reviews
            </a>
          </div>

          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Services</div>
            {services.slice(0, 5).map((service, index) => (
              <a key={index} href={service.path} className="transition-colors hover:text-accent">
                {service.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">More Services</div>
            {services.slice(5).map((service, index) => (
              <a key={index} href={service.path} className="transition-colors hover:text-accent">
                {service.name}
              </a>
            ))}
            <div className="mt-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Legal</div>
            <a href="/privacy" className="transition-colors hover:text-accent">
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-accent">
              Terms of Service
            </a>
            <a href="/accessibility" className="transition-colors hover:text-accent">
              Accessibility
            </a>
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

export default ScalingAndRootPlaning;