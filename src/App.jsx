// src/App.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import Accessibility from './Accessibility';
import Lanap from './Lanap';
import LaserTherapy from './LaserTherapy';
import DentalImplants from './DentalImplants';
import GuidedBoneTissueRegeneration from './GuidedBoneTissueRegeneration';
import AestheticCrownLengthening from './AestheticCrownLengthening';
import FunctionalCrownLengthening from './FunctionalCrownLengthening';
import Frenectomy from './Frenectomy';
import OsseousSurgery from './OsseousSurgery';
import ScalingAndRootPlaning from "./ScalingAndRootPlaning";  
import PeriodontalMaintenance from './PeriodontalMaintenance';
import Alloderm from './Alloderm';
import SoftTissueGrafting from './SoftTissueGrafting';

gsap.registerPlugin(ScrollTrigger);

// --- 1. NAVBAR ("The Floating Island") with fixed dropdown ---
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
        onEnter: () => gsap.to(navRef.current, { backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(24px)', color: '#0F172A', borderColor: 'rgba(255,255,255,0.8)', duration: 0.3 }),
        onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', color: '#0F172A', borderColor: 'transparent', duration: 0.3 })
      });
      gsap.set(navRef.current, { color: '#0F172A', backgroundColor: 'transparent', borderColor: 'transparent' });
    });
    return () => ctx.revert();
  }, []);

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

// --- 2. HERO SECTION ("The Opening Shot") ---
const Hero = () => {
  const containerRef = useRef(null);

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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden flex items-end pb-24 md:pb-32 px-6 md:px-16 bg-white">
      <div className="absolute inset-0 z-0 bg-[#F8FAFC]">
        <img
          src="https://i.imgur.com/BPiVuyf.jpeg?q=80&w=2600&auto=format&fit=crop"
          alt="Abstract clinical environment"
          className="object-cover w-full h-full opacity-30 mix-blend-multiply filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl text-primary">
        <h1 className="flex flex-col gap-1 md:gap-2">
          <span className="font-sans text-3xl font-bold tracking-tighter hero-element md:text-5xl lg:text-6xl text-primary">Atlanta's best</span>
          <span className="hero-element font-serif italic text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] text-accent font-medium">Periodontist.</span>
        </h1>
        <p className="max-w-md mt-10 font-mono text-sm hero-element md:mt-12 md:text-base text-primary/70">
          Missing teeth? Bleeding gums? Gum recession? Our board-certified periodontal specialists provide advanced implant and gum treatments with personalized care.
        </p>
        <div className="flex gap-4 mt-10 hero-element">
           <button onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")} className="magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-semibold flex items-center gap-2 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] border border-white/20"
         >
         <span className="relative z-10 block">Consultation</span>
         <ChevronRight className="relative z-10 w-5 h-5" />
         </button>
         </div>
      </div>
    </section>
  );
};

// --- 3. FEATURES ("Interactive Functional Artifacts") ---
const ShufflerCard = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Smile Architecture', desc: 'Symmetrical alignment mapping' },
    { id: 2, title: 'Veneer Crafting', desc: 'Porcelain master-level finishes' },
    { id: 3, title: 'Tissue Sculpting', desc: 'Harmonious gum line contours' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 flex flex-col justify-between h-[360px] relative overflow-hidden group">
      <div>
        <h3 className="font-sans text-xl font-bold tracking-tight text-primary">#1 Rated Periodontist in ATL</h3>
        <p className="mt-2 font-serif text-lg italic text-dark/60">⭐️ 637 4.9 Google Reviews</p>
      </div>
      <div className="relative h-48 mt-8 perspective-1000">
        {items.map((item, index) => {
          const isTop = index === 0;
          return (
            <div
              key={item.id}
              className={`absolute inset-x-0 bottom-0 bg-white border border-primary/10 rounded-2xl p-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
              style={{
                transform: `translateY(-${index * 15}px) scale(${1 - index * 0.05})`,
                opacity: 1 - index * 0.3,
                zIndex: 10 - index
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isTop ? 'bg-primary text-background' : 'bg-background text-primary/50'}`}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="font-sans text-sm font-semibold text-primary">{item.title}</div>
                  <div className="font-mono text-[10px] text-dark/50 mt-1">{item.desc}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TypewriterCard = () => {
  const [text, setText] = useState('');
  const fullText = "Atmosphere: Calm\nAcoustics: Dampened\nAromatherapy: Active\nAnxiety levels optimizing...";

  useEffect(() => {
    let currentText = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText.charAt(i);
        setText(currentText);
        i++;
      } else {
        setTimeout(() => { i = 0; currentText = ''; setText(''); }, 3000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 flex flex-col justify-between h-[360px]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-sans text-xl font-bold tracking-tight text-primary">Spa-Like Environment</h3>
          <p className="mt-2 font-serif text-lg italic text-dark/60">Stress-free experience</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="font-mono text-[10px] uppercase text-primary font-semibold tracking-wider">Live Feed</span>
        </div>
      </div>
      <div className="bg-[#EAE8E2] rounded-2xl p-5 mt-8 h-48 font-mono text-sm text-primary flex items-start break-words whitespace-pre-wrap border border-primary/5 shadow-inner">
        <span>{text}</span>
        <span className="w-2 h-4 bg-accent inline-block ml-1 animate-[pulse_1s_infinite]"></span>
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      gsap.set('.cursor-svg', { x: 20, y: 150, opacity: 0 });
      gsap.set('.calendar-cell-active', { backgroundColor: 'transparent', color: '#1A1A1A' });
      gsap.set('.save-btn', { scale: 1 });

      tl.to('.cursor-svg', { opacity: 1, duration: 0.3 })
        .to('.cursor-svg', { x: 175, y: 100, duration: 1, ease: 'power2.inOut' })
        .to('.cursor-svg', { scale: 0.8, duration: 0.1 })
        .to('.calendar-cell-active', { backgroundColor: '#CC5833', color: '#FFF', duration: 0.1 }, '<')
        .to('.cursor-svg', { scale: 1, duration: 0.1 })
        .to('.cursor-svg', { x: 200, y: 130, duration: 0.8, ease: 'power2.inOut', delay: 0.5 })
        .to('.cursor-svg', { scale: 0.8, duration: 0.1 })
        .to('.save-btn', { scale: 0.95, duration: 0.1 }, '<')
        .to('.cursor-svg', { scale: 1, duration: 0.1 })
        .to('.save-btn', { scale: 1, duration: 0.1 }, '<')
        .to('.cursor-svg', { opacity: 0, duration: 0.3, delay: 0.5 });

    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 flex flex-col justify-between h-[360px]" ref={svgRef}>
      <div>
        <h3 className="font-sans text-xl font-bold tracking-tight text-primary">Personalized Treatment Plans</h3>
        <p className="mt-2 font-serif text-lg italic text-dark/60">Designed for your smile, your health, and your goals.</p>
      </div>

      <div className="relative w-full h-48 p-4 mt-8 bg-white border select-none border-primary/10 rounded-2xl">
        <div className="grid grid-cols-7 gap-1 mb-4 md:gap-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center font-mono text-[10px] text-dark/40">{d}</div>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`h-8 rounded-lg flex items-center justify-center font-sans text-xs ${i === 10 ? 'calendar-cell-active bg-primary/5 text-dark' : 'bg-primary/5 text-dark'}`}>
              {i + 10}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <div className="save-btn bg-primary text-background px-4 py-1.5 rounded-full font-mono text-[10px] uppercase shadow-sm">View Your Treatment Plan</div>
        </div>

        <svg
          className="absolute top-0 left-0 z-10 w-6 h-6 pointer-events-none cursor-svg drop-shadow-md"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#1A1A1A' }}
        >
          <path d="m4 4 7.07 17 2.51-7.39L21 11.07z" className="fill-white" />
        </svg>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="container px-6 py-24 mx-auto md:py-32 md:px-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ShufflerCard />
        <TypewriterCard />
        <SchedulerCard />
      </div>
    </section>
  );
};

// --- 4. PHILOSOPHY ("The Manifesto") ---
const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
        y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="relative py-32 md:py-56 px-6 md:px-16 bg-offWhite text-primary overflow-hidden shadow-[inset_0_20px_40px_rgba(0,0,0,0.02)]">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2600&auto=format&fit=crop"
          alt="Clinical architecture texture"
          className="object-cover w-full h-full filter grayscale"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl gap-8 mx-auto text-center md:gap-16">
        <p className="max-w-md font-mono text-sm tracking-widest uppercase phil-line md:text-base text-primary/60">
          Most dental offices treat teeth.
        </p>
        <h2 className="flex flex-col items-center gap-2">
          <span className="font-sans text-3xl font-bold tracking-tight phil-line md:text-5xl">We protect the foundation of your smile.</span>
          <span className="phil-line font-serif italic text-6xl md:text-[8rem] mt-2 block leading-none">Lasting <span className="text-accent drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">Confidence.</span></span>
        </h2>
      </div>
    </section>
  );
};

// --- 5. PROTOCOL ("Sticky Stacking Archive") ---
const Protocol = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 10%',
          end: '+=100%',
          pin: true,
          pinSpacing: i === cardsRef.current.length - 1,
        });

        const nextCard = cardsRef.current[i + 1];
        if (nextCard) {
          gsap.to(card, {
            scale: 0.9,
            filter: 'blur(20px)',
            opacity: 0.2,
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 90%',
              end: 'top 10%',
              scrub: true,
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const protocols = [
    {
      num: '01',
      title: 'Periodontal Evaluation',
      desc: 'Advanced 3D imaging, digital diagnostics, and an assessment of your gums, bone, and oral health to develop a treatment plan tailored to you.',
      image: 'https://i.imgur.com/BPiVuyf.jpeg?q=80&w=2600&auto=format&fit=crop',
      RenderVisual: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <g className="animate-[spin_15s_linear_infinite]" style={{ transformOrigin: 'center' }}>
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#06B6D4" strokeWidth="0.5" />
            <polygon points="50,20 80,40 80,60 50,80 20,60 20,40" fill="rgba(255,255,255,0.1)" stroke="#0F172A" strokeWidth="0.5" className="opacity-80" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#06B6D4" strokeWidth="0.5" strokeDasharray="2 4" />
          </g>
        </svg>
      )
    },
    {
      num: '02',
      title: 'Personalized Treatment Plan',
      desc: "We'll review your diagnosis, discuss every treatment option, explain your timeline, answer your questions, and provide transparent pricing before treatment begins.",
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2600&auto=format&fit=crop',
      RenderVisual: () => (
        <div className="relative flex items-center justify-center w-full h-full p-4 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-30">
            {Array.from({ length: 36 }).map((_, idx) => (
              <div key={idx} className="border border-slate-400 rounded-[2px]"></div>
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#06B6D4] animate-[scan_3s_ease-in-out_infinite]" style={{ animationDirection: 'alternate' }}></div>
          <style>{`@keyframes scan { from { top: 0; } to { top: 100%; } }`}</style>
        </div>
      )
    },
    {
      num: '03',
      title: 'Precision Periodontal Care',
      desc: 'From dental implants and gum grafting to laser therapy and periodontal surgery, our team delivers advanced treatment with modern techniques designed to maximize comfort and long-term results.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2600&auto=format&fit=crop',
      RenderVisual: () => (
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
          <path d="M0,50 L50,50 L60,20 L75,90 L90,10 L105,70 L115,50 L200,50"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="400"
            strokeDashoffset="400"
            className="animate-[pulseWave_3s_linear_infinite]"
          />
          <style>{`@keyframes pulseWave { 0% { stroke-dashoffset: 400; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -400; } }`}</style>
        </svg>
      )
    }
  ];

  return (
    <section ref={containerRef} id="protocol" className="px-6 py-24 pb-64 overflow-visible md:py-32 bg-background">
      <div className="relative flex flex-col items-center max-w-5xl gap-24 mx-auto">
        <div className="relative z-0 mb-12 text-center">
          <h2 className="font-sans text-4xl font-bold tracking-tight text-primary md:text-5xl">Clinical Protocol</h2>
          <p className="mt-6 font-mono text-sm tracking-widest uppercase text-primary/50">A systematic methodology for comfort.</p>
        </div>

        <div className="w-full relative mt-12 flex flex-col gap-[30vh]">
          {protocols.map((p, i) => (
            <div
              key={p.num}
              ref={el => cardsRef.current[i] = el}
              className={`w-full min-h-[60vh] md:min-h-[70vh] bg-white rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row border border-slate-100 shadow-[0_-10px_50px_rgba(15,23,42,0.06)] origin-top`}
              style={{ zIndex: i + 1 }}
            >
              <div className="z-10 flex flex-col justify-center flex-1 gap-6 pr-8">
                <span className="font-mono text-xl font-bold text-accent">[{p.num}]</span>
                <h3 className="font-sans text-3xl font-bold leading-tight tracking-tight md:text-5xl text-primary">{p.title}</h3>
                <p className="max-w-lg mt-4 font-serif text-xl italic leading-relaxed text-primary/70 md:text-2xl">{p.desc}</p>
              </div>
              <div className="flex-1 min-h-[250px] md:min-h-[400px] relative bg-offWhite rounded-[2rem] overflow-hidden flex items-center justify-center border border-slate-100 shadow-inner z-10">
                <img src={p.image} className="absolute inset-0 object-cover w-full h-full opacity-20 filter grayscale mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent"></div>
                <div className="relative z-20 flex items-center justify-center w-full h-full p-8">
                  <p.RenderVisual />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 6. CTA / PRICING ---
const CTASection = () => {
  return (
    <section className="container px-6 py-24 mx-auto md:px-16">
      <div className="bg-primary/5 rounded-[3rem] overflow-hidden relative p-12 md:p-24 flex flex-col items-center text-center shadow-[inset_0_0_100px_rgba(0,0,0,0.02)] border border-primary/10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>

        <h2 className="relative z-10 font-serif italic text-5xl md:text-[5rem] text-primary leading-none">Begin the process.</h2>
        <p className="relative z-10 max-w-xl mt-8 font-sans text-lg text-primary/80">
          Whether you're experiencing gum recession, periodontal disease, missing teeth, or have been referred by your dentist, we're here to help you restore your oral health with confidence.
        </p>

        <div className="relative z-10 mt-12 w-full max-w-md bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 border border-white shadow-2xl">
          <div className="mb-6 font-mono text-xs font-bold tracking-widest uppercase text-primary/60">Initial Assessment</div>
          <div className="mb-8 font-sans text-4xl font-bold tracking-tight text-primary">Book</div>

          <button
              onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")} className="w-full magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-bold text-lg mb-4 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all"
       >
          <span className="relative z-10">Consultation</span>
          </button>
          <button
              onClick={() => window.location.href = "tel:+17709945678"}
              className="w-full px-8 py-4 font-sans font-semibold transition-all border rounded-full shadow-sm magnetic-button bg-white/50 text-primary border-primary/10 hover:bg-white"
    >
          <span className="relative z-10">Call Us</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// --- 7. FOOTER (UPDATED WITH INSURANCE & PAYMENT COLUMN) ---
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
        {/* Column 1: Practice */}
        <div className="max-w-sm">
          <div className="mb-4 font-sans text-3xl font-bold tracking-tight text-white">ATL Perio Group</div>
          <p className="font-serif text-lg italic text-white/70">
            Atlanta's best Periodontist.
          </p>
        </div>

        {/* Columns 2-4: Services, Insurance & Payment, Legal */}
        <div className="grid grid-cols-2 gap-12 font-sans text-sm md:grid-cols-4">
          {/* Column 2: Services (all 10) */}
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

      {/* Footer bottom bar */}
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

// --- 8. MAIN APP WITH ROUTING ---
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/alloderm" element={<Alloderm />} />
      <Route path="/soft-tissue-grafting" element={<SoftTissueGrafting />} />
      <Route path="/lanap" element={<Lanap />} />
      <Route path="/laser-therapy" element={<LaserTherapy />} />
      <Route path="/guided-bone-regeneration" element={<GuidedBoneTissueRegeneration />} />
      <Route path="/aesthetic-crown-lengthening" element={<AestheticCrownLengthening />} />
      <Route path="/crown-lengthening" element={<FunctionalCrownLengthening />} />
      <Route path="/frenectomy" element={<Frenectomy />} />
      <Route path="/osseous-surgery" element={<OsseousSurgery />} />
      <Route path="/scaling-root-planing" element={<ScalingAndRootPlaning />} />
      <Route path="/periodontal-maintenance" element={<PeriodontalMaintenance />} />
    </Routes>
  );
}

// --- 9. HOMEPAGE COMPONENT ---
function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;