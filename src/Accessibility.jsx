// src/Accessibility.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        onEnter: () => gsap.to(navRef.current, { backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(24px)', color: '#0F172A', borderColor: 'rgba(255,255,255,0.8)', duration: 0.3 }),
        onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', color: '#0F172A', borderColor: 'transparent', duration: 0.3 })
      });
      gsap.set(navRef.current, { color: '#0F172A', backgroundColor: 'transparent', borderColor: 'transparent' });
    });
    return () => ctx.revert();
  }, []);

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

const Accessibility = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.accessibility-section', {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section ref={containerRef} className="max-w-4xl px-6 pt-40 pb-24 mx-auto md:px-16">
        <h1 className="mb-4 font-sans text-4xl font-bold tracking-tight md:text-5xl text-primary">Accessibility Statement</h1>
        <p className="mb-12 font-mono text-sm text-primary/60">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8">
          <section className="accessibility-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Our Commitment</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              Atlanta Periodontal Group is committed to ensuring digital accessibility for people with disabilities. We strive to provide an inclusive and user-friendly experience for all visitors, regardless of ability or technology.
            </p>
          </section>

          <section className="accessibility-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Web Content Accessibility Guidelines (WCAG)</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              We follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards to ensure our website is perceivable, operable, understandable, and robust for all users. We continue to monitor and improve our accessibility features.
            </p>
          </section>

          <section className="accessibility-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Accessibility Features</h2>
            <div className="space-y-3 font-serif text-lg leading-relaxed text-primary/70">
              <p>✓ Clear navigation and consistent layout</p>
              <p>✓ Text alternatives for non-text content</p>
              <p>✓ Sufficient color contrast for readability</p>
              <p>✓ Keyboard-navigable interface</p>
              <p>✓ Screen reader compatible code</p>
              <p>✓ Responsive design for all devices</p>
            </div>
          </section>

          <section className="accessibility-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Physical Accessibility</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              Our office is wheelchair accessible with ground-level entry, wide doorways, and accessible treatment rooms. We have designated accessible parking available. If you require any specific accommodations, please inform us when scheduling your appointment.
            </p>
          </section>

          <section className="accessibility-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Assistance Available</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              If you need assistance with any part of our website or services, please contact our office. We are happy to provide information in alternative formats or arrange for communication support as needed.
            </p>
          </section>

          <section className="accessibility-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Feedback</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              We welcome your feedback on the accessibility of our website and services. If you encounter any barriers or have suggestions for improvement, please let us know.
            </p>
          </section>

          <section className="accessibility-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Contact Us</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              For accessibility questions or assistance, please contact:
            </p>
            <div className="p-6 mt-4 border bg-primary/5 rounded-2xl border-primary/10">
              <p className="font-sans text-primary"><strong>Atlanta Periodontal Group</strong></p>
              <p className="font-serif text-primary/70">Phone: <a href="tel:+17709945678" className="text-accent hover:underline">(770) 994-5678</a></p>
              <p className="font-serif text-primary/70">Email: <a href="mailto:info@atlperio.com" className="text-accent hover:underline">info@atlperio.com</a></p>
            </div>
          </section>
        </div>
      </section>

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

// ✅ CORRECT EXPORT – Accessibility is the default export
export default Accessibility;