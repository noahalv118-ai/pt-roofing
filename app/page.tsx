"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Menu, X, Phone, Mail, MapPin, Clock,
  ChevronDown, ChevronRight,
  Star, Shield, CheckCircle, ArrowRight,
  Home, Layers, PaintBucket, Eye, Hammer, Wrench, Umbrella,
  Users, Search, MessageSquare, DollarSign, ThumbsUp,
  Share2, Globe, AtSign, Link as LinkIcon,
} from "lucide-react";

/* ══════════════════════════════════════════════
   STATIC DATA
══════════════════════════════════════════════ */

const NAV_LINKS = [
  { href: "#about",        label: "About"        },
  { href: "#services",     label: "Services"     },
  { href: "#gallery",      label: "Gallery"      },
  { href: "#testimonials", label: "Reviews"      },
  { href: "#process",      label: "Process"      },
  { href: "#contact",      label: "Contact"      },
];

const SERVICES = [
  {
    Icon: Home, dark: false,
    title: "Roofing",
    desc: "Premium roofing solutions built to withstand Texas weather. From minor repairs to complete tear-offs, every job is done right the first time.",
    items: ["Roof repairs", "Roof replacements", "Storm damage inspections"],
  },
  {
    Icon: Layers, dark: true,
    title: "Siding",
    desc: "Protect and beautify your home's exterior with durable, energy-efficient siding that lasts for decades and adds real curb appeal.",
    items: ["Siding installation", "Siding replacement", "Exterior protection"],
  },
  {
    Icon: PaintBucket, dark: false,
    title: "Painting",
    desc: "Flawless interior and exterior paint work with meticulous surface preparation for a finish that looks great and lasts for years.",
    items: ["Interior painting", "Exterior painting", "Surface preparation"],
  },
  {
    Icon: Eye, dark: true,
    title: "Windows",
    desc: "Upgrade to energy-efficient windows that slash utility bills, boost comfort, and dramatically improve your home's appearance.",
    items: ["Energy-efficient windows", "Window replacement", "Improved curb appeal"],
  },
  {
    Icon: Hammer, dark: false,
    title: "Interior Remodeling",
    desc: "Transform kitchens, bathrooms, and living spaces with expert craftsmanship that blends beauty, function, and lasting quality.",
    items: ["Kitchens", "Bathrooms", "General home renovations"],
  },
  {
    Icon: Wrench, dark: true,
    title: "Foundation Repair",
    desc: "Protect your biggest investment from the ground up. We identify and fix foundation issues before they become catastrophic problems.",
    items: ["Foundation inspections", "Structural solutions", "Crack repairs"],
  },
  {
    Icon: Umbrella, dark: false,
    title: "Patio Covers",
    desc: "Extend your living space outdoors with custom shade structures built for Texas summers — where style meets serious function.",
    items: ["Custom patio covers", "Outdoor living enhancements", "Shade structures"],
  },
];

const BENEFITS = [
  { Icon: Search,       title: "Free Inspections",          desc: "No-cost on-site inspections so you understand exactly what your home needs before spending a dime." },
  { Icon: Users,        title: "Experienced Team",           desc: "Licensed pros with years of hands-on expertise across roofing, remodeling, and exterior work." },
  { Icon: Shield,       title: "High-Quality Materials",    desc: "We use only premium, manufacturer-backed materials rated for Texas heat, hail, and storms." },
  { Icon: MessageSquare,title: "Transparent Communication", desc: "No surprises — detailed scopes, regular updates, and open communication from start to finish." },
  { Icon: DollarSign,   title: "Competitive Pricing",       desc: "Fair, itemized estimates that respect your budget without ever cutting corners on quality." },
  { Icon: ThumbsUp,     title: "Satisfaction Guaranteed",   desc: "We don't leave until you're fully satisfied. Your home, your standards — we meet them every time." },
];

const TESTIMONIALS = [
  { initials: "SM", name: "Sarah Mitchell",    loc: "Austin, TX",       project: "Roof Replacement",     text: "Horizon Home Remodeling  exceeded our expectations. The roof replacement was completed quickly and professionally. The crew respected our property throughout and the final result is absolutely stunning." },
  { initials: "JR", name: "James Rodriguez",   loc: "Round Rock, TX",   project: "Interior Remodeling",  text: "Hired HR for a complete kitchen and bathroom remodel. Communication was excellent from first call to final walkthrough. The craftsmanship is genuinely top-notch — we'll use them for every project going forward." },
  { initials: "LT", name: "Linda Thompson",    loc: "Cedar Park, TX",   project: "Siding & Painting",    text: "Our home's exterior needed serious attention after years of wear. HR gave us an honest estimate and delivered exactly what they promised. The transformation to our curb appeal is remarkable." },
  { initials: "MF", name: "Mark & Dana Foster",loc: "Pflugerville, TX", project: "Patio Cover & Windows",text: "The new patio cover and energy-efficient windows have changed how we live in our home. AC bills dropped noticeably within the first month. HR was professional, clean, punctual, and a pleasure to work with." },
];

const PROCESS = [
  { n: "01", title: "Free Inspection & Consultation", desc: "We visit your home at no charge, assess every detail, and listen carefully to your goals." },
  { n: "02", title: "Detailed Estimate",              desc: "Receive a transparent, itemized quote with zero hidden fees or vague line items." },
  { n: "03", title: "Project Planning",               desc: "We confirm materials, set a schedule, and coordinate every detail before a single nail is driven." },
  { n: "04", title: "Professional Installation",      desc: "Our licensed crew executes with precision and treats your home with genuine respect." },
  { n: "05", title: "Final Walkthrough",              desc: "We tour the completed work together and won't close the job until you're 100% satisfied." },
];

const AREAS = [
  "Austin","Round Rock","Cedar Park","Pflugerville","Georgetown",
  "Leander","Kyle","Buda","Hutto","Taylor","Manor","Lakeway",
  "Bee Cave","Dripping Springs","San Marcos","New Braunfels",
];

const FAQS = [
  { q: "How soon can you start?",                        a: "We schedule free inspections within 2–3 business days and typically begin projects within 1–2 weeks of contract signing." },
  { q: "Are you licensed and insured?",                  a: "Yes — Horizon Home Remodeling  is fully licensed in Texas and carries both general liability and workers' compensation insurance." },
  { q: "Do you offer financing?",                        a: "We partner with financing providers to offer flexible payment plans. Ask about available options during your free estimate." },
  { q: "Do you work with insurance claims?",             a: "Absolutely. We have extensive experience with insurance adjusters, will document all damage, and help guide you through the entire claims process." },
  { q: "How long does a roof replacement take?",         a: "Most residential replacements are completed in 1–2 days. Complex or larger projects may require additional time — we provide a clear timeline upfront." },
  { q: "What warranties do you offer?",                  a: "We back all work with a workmanship warranty plus pass through manufacturer warranties on materials. Full details are included in every estimate." },
];

const GALLERY = [
  { cat: "roofing",  label: "Roof Replacement",   src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { cat: "interior", label: "Kitchen Remodel",    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
  { cat: "exterior", label: "Exterior Renovation",src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80" },
  { cat: "patio",    label: "Patio Cover",         src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80" },
  { cat: "roofing",  label: "New Shingle Roof",    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" },
  { cat: "interior", label: "Bathroom Renovation", src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80" },
  { cat: "exterior", label: "Siding Install",      src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80" },
  { cat: "patio",    label: "Outdoor Living Space",src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80" },
];

/* ══════════════════════════════════════════════
   SMALL HELPERS
══════════════════════════════════════════════ */

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
      ))}
    </div>
  );
}

function SectionHeader({ label, title, light = false, center = false }: {
  label: string; title: React.ReactNode; light?: boolean; center?: boolean;
}) {
  return (
    <div className={`mb-14 reveal ${center ? "text-center" : ""}`}>
      <div className={`flex items-center gap-3 mb-3 ${center ? "justify-center" : ""}`}>
        <span className="w-7 h-0.5 bg-orange-500 inline-block" />
        <span className="sec-label">{label}</span>
        {center && <span className="w-7 h-0.5 bg-orange-500 inline-block" />}
      </div>
      <h2 className={`display-heading text-5xl lg:text-6xl ${light ? "text-white" : "text-[#0F172A]"}`}>
        {title}
      </h2>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════ */

function EstimateModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div className="bg-[#0F172A] px-7 py-5 flex items-center justify-between">
          <div>
            <h3 className="display-heading text-white text-2xl">Get Your Free Estimate</h3>
            <p className="text-slate-400 text-sm mt-0.5">We respond within 24 hours</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={22} />
          </button>
        </div>

        <div className="px-7 py-6">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle size={60} className="text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Request Received!</h4>
              <p className="text-[#334155]">We'll be in touch within 24 hours to confirm your free estimate.</p>
              <button onClick={onClose} className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setDone(true); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-1">First Name</label>
                  <input required className="f-input" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-1">Last Name</label>
                  <input required className="f-input" placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1">Phone</label>
                <input required type="tel" className="f-input" placeholder="(512) 555-0100" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1">Email</label>
                <input required type="email" className="f-input" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1">Service Needed</label>
                <select required className="f-input">
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1">Message</label>
                <textarea className="f-input" rows={3} placeholder="Tell us about your project…" />
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors">
                Schedule My Free Estimate →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */

export default function Page() {
  const [scrolled,  setScrolled]  = useState(false);
  const [mobileOpen,setMobileOpen]= useState(false);
  const [modal,     setModal]     = useState(false);
  const [galFilter, setGalFilter] = useState("all");
  const [openFaq,   setOpenFaq]   = useState<number | null>(null);
  const [contactOk, setContactOk] = useState(false);

  /* sticky nav */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* scroll reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const gallery = galFilter === "all" ? GALLERY : GALLERY.filter(g => g.cat === galFilter);

  return (
    <main>
      {modal && <EstimateModal onClose={() => setModal(false)} />}

      {/* ── FLOAT CTA ── */}
      <a
        href="tel:+15125550100"
        className="float-cta bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-3.5 shadow-2xl flex items-center gap-2 font-bold transition-colors"
      >
        <Phone size={20} />
        <span className="hidden sm:inline text-sm">Call Now</span>
      </a>

      {/* ══════════════════════════════════════════
          NAV
      ══════════════════════════════════════════ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "nav-solid" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

          {/* logo */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white shadow flex items-center justify-center">
              <Image src="/hrlogo.jpg" alt="Horizon Remodeling logo" width={44} height={44} className="object-cover" />
            </div>
            <div>
              <p className="display-heading text-white text-xl leading-none">Horizon Home</p>
              <p className="text-orange-400 text-[10px] font-semibold tracking-widest">REMODELING</p>
            </div>
          </a>

          {/* desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="text-white/85 hover:text-orange-400 transition-colors text-sm font-semibold tracking-wide uppercase">
                {l.label}
              </a>
            ))}
          </div>

          {/* desktop right */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+15125550100" className="flex items-center gap-1.5 text-white/85 hover:text-orange-400 transition-colors text-sm font-semibold">
              <Phone size={15} /> (512) 555-0100
            </a>
            <button onClick={() => setModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105">
              Free Estimate
            </button>
          </div>

          {/* hamburger */}
          <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0F172A] border-t border-white/10 px-6 py-6 space-y-3">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="block text-white/85 hover:text-orange-400 font-semibold py-2 border-b border-white/6 text-lg">
                {l.label}
              </a>
            ))}
            <button onClick={() => { setModal(true); setMobileOpen(false); }}
              className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold mt-3 text-lg">
              Get Free Estimate
            </button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=85')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="hero-overlay absolute inset-0" />

        {/* diagonal accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-2/5 h-full opacity-[.07]"
            style={{ background: "linear-gradient(135deg, transparent 50%, #F97316 50%)" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="max-w-3xl">
            {/* badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 anim-fade-in">
              <Shield size={13} /> Licensed & Insured · Texas Proud
            </div>

            <h1 className="display-heading text-white text-[clamp(3.4rem,9vw,5.5rem)] mb-6 anim-fade-up d100">
              Protect,{" "}
              <span className="gradient-text">Improve,</span>
              <br />&amp; Transform<br />Your Home.
            </h1>

            <p className="text-white/80 text-lg sm:text-xl max-w-xl leading-relaxed mb-10 anim-fade-up d200">
              Expert roofing, remodeling, and home improvement services you can trust.
              Serving Texas homeowners with quality craftsmanship since day one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 anim-fade-up d300">
              <button onClick={() => setModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2">
                <Search size={19} /> Get Free Inspection
              </button>
              <button onClick={() => setModal(true)}
                className="bg-white/10 hover:bg-white/18 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-2">
                <Clock size={19} /> Schedule an Estimate
              </button>
            </div>

            {/* trust chips */}
            <div className="flex flex-wrap gap-5 mt-12 anim-fade-up d400">
              {["500+ Projects Completed","5-Star Rated","Free Estimates","Fully Insured"].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-white/65 text-sm">
                  <CheckCircle size={14} className="text-orange-400" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/45 animate-bounce">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-[#0F172A] py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { n: "500+", l: "Projects Completed" },
            { n: "15+",  l: "Years Experience"   },
            { n: "100%", l: "Licensed & Insured" },
            { n: "4.9★", l: "Google Rating"      },
          ].map(s => (
            <div key={s.l} className="reveal">
              <p className="display-heading text-orange-400 text-4xl lg:text-5xl">{s.n}</p>
              <p className="text-slate-400 text-sm mt-1 font-medium">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

          {/* image */}
          <div className="relative reveal">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Horizon Remodeling team at work"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/55 to-transparent rounded-2xl" />
            </div>
            {/* badge */}
            <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white rounded-2xl p-5 shadow-xl">
              <p className="display-heading text-4xl">15+</p>
              <p className="text-sm font-semibold mt-0.5">Years of Excellence</p>
            </div>
          </div>

          {/* content */}
          <div className="reveal">
            <SectionHeader label="About Us" title="Your Trusted Home Improvement Partner" />
            <p className="text-[#334155] text-lg leading-relaxed mb-5">
              Horizon Home Remodeling  is committed to helping homeowners protect and enhance their
              biggest investment. Our team delivers quality workmanship, transparent communication,
              and lasting results on every project — no exceptions.
            </p>
            <p className="text-[#334155] leading-relaxed mb-9">
              From emergency roof repairs to full-scale interior remodels, we bring the same dedication:
              treat your home like our own, communicate clearly, and deliver results built to last decades.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {["Licensed & Insured","Experienced Professionals","Free Estimates","Quality Materials","Satisfaction Focused","Locally Owned & Operated"].map(i => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-orange-500/12 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle size={13} className="text-orange-500" />
                  </div>
                  <span className="text-[#334155] text-sm font-medium">{i}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setModal(true)}
              className="bg-[#0F172A] hover:bg-[#334155] text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2">
              Get Your Free Estimate <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader center label="Our Services" title="Complete Home Improvement Solutions" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ Icon, dark, title, desc, items }, i) => (
              <div
                key={title}
                className="service-card bg-white rounded-2xl overflow-hidden shadow-md reveal"
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                {/* card header */}
                <div className={`p-6 flex items-center gap-4 ${dark ? "bg-gradient-to-br from-blue-800 to-blue-950" : "bg-gradient-to-br from-orange-500 to-orange-600"}`}>
                  <Icon size={30} className="text-white shrink-0" />
                  <h3 className="font-family-['Barlow_Condensed'] text-white text-2xl font-bold leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-[#334155] mb-5 leading-relaxed text-sm">{desc}</p>
                  <ul className="space-y-2 mb-6">
                    {items.map(it => (
                      <li key={it} className="flex items-center gap-2 text-[#334155] text-sm">
                        <ChevronRight size={13} className="text-orange-500 shrink-0" />{it}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setModal(true)}
                    className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-bold text-sm transition-colors group">
                    Learn More <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader center light label="Why Choose Us" title="The HR Difference" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="benefit-card bg-white/5 border border-white/10 rounded-2xl p-7 reveal"
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <div className="w-12 h-12 bg-orange-500/15 rounded-xl flex items-center justify-center mb-5 text-orange-400">
                  <Icon size={26} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════ */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader center label="Project Gallery" title="Our Work Speaks for Itself" />

          {/* filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 reveal">
            {["all","roofing","interior","exterior","patio"].map(cat => (
              <button key={cat} onClick={() => setGalFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all capitalize ${galFilter === cat ? "bg-orange-500 text-white shadow" : "bg-slate-100 text-[#334155] hover:bg-slate-200"}`}>
                {cat === "all" ? "All Projects" : cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <div key={`${g.label}-${i}`} className="relative rounded-xl overflow-hidden group cursor-pointer reveal" style={{ transitionDelay: `${i * 45}ms` }}>
                <img src={g.src} alt={g.label} className="w-full h-52 object-cover gallery-item" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-white font-bold text-sm">{g.label}</p>
                    <p className="text-orange-400 text-xs capitalize">{g.cat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-7 h-0.5 bg-orange-500 inline-block" />
              <span className="sec-label">Customer Reviews</span>
              <span className="w-7 h-0.5 bg-orange-500 inline-block" />
            </div>
            <h2 className="display-heading text-[#0F172A] text-5xl lg:text-6xl">What Homeowners Say</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Stars />
              <span className="text-[#334155] font-semibold text-sm">4.9 / 5 based on 200+ reviews</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col reveal"
                style={{ transitionDelay: `${i * 70}ms` }}>
                <Stars />
                <p className="text-[#334155] text-sm leading-relaxed my-4 flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A] text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.project} · {t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google badge */}
          <div className="text-center mt-12 reveal">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-6 py-3 shadow-sm">
              <div className="flex">
                {["bg-blue-500","bg-red-500","bg-yellow-400","bg-green-500"].map((c, i) => (
                  <div key={i} className={`w-5 h-5 rounded-full ${c} ${i > 0 ? "-ml-1" : ""}`} />
                ))}
              </div>
              <span className="text-[#334155] font-semibold text-sm">Rated 4.9 / 5 on Google Reviews</span>
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════ */}
      <section id="process" className="py-24 bg-[#0F172A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader center light label="How It Works" title="Our Simple 5-Step Process" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS.map((step, i) => (
              <div key={step.n} className="relative text-center reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="relative mb-5">
                  <div className="w-16 h-16 bg-orange-500/20 border-2 border-orange-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="display-heading text-orange-400 text-2xl">{step.n}</span>
                  </div>
                  {i < PROCESS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 h-px bg-gradient-to-r from-orange-500/50 to-slate-700"
                      style={{ left: "calc(50% + 33px)", width: "calc(100% - 66px + 24px)" }} />
                  )}
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14 reveal">
            <button onClick={() => setModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl">
              Start With a Free Inspection →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICE AREAS
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <SectionHeader label="Where We Work" title="Proudly Serving Texas Homeowners" />
            <p className="text-[#334155] text-lg leading-relaxed mb-6">
              We serve homeowners throughout the Greater Austin area and surrounding communities.
              Not sure if we reach your neighborhood? Call us — we likely do.
            </p>
            <div className="flex items-center gap-2 text-[#334155]">
              <MapPin size={17} className="text-orange-500" />
              <span className="font-semibold">Greater Austin & Surrounding Areas, TX</span>
            </div>
          </div>

          <div className="reveal">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AREAS.map(a => (
                <div key={a}
                  className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-[#334155] hover:border-orange-500 hover:text-orange-500 transition-all cursor-default">
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader center label="FAQ" title="Common Questions Answered" />

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm reveal"
                style={{ transitionDelay: `${i * 55}ms` }}>
                <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-bold text-[#0F172A] text-sm sm:text-base">{f.q}</span>
                  <ChevronDown size={19} className={`text-orange-500 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[#334155] text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MID-PAGE CTA BAND
      ══════════════════════════════════════════ */}
      <div className="bg-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center reveal">
          <h2 className="display-heading text-white text-5xl lg:text-6xl mb-4">Ready to Start Your Project?</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Get a free, no-obligation estimate from Texas's most trusted home improvement team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setModal(true)}
              className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
              <Search size={19} /> Get Free Estimate
            </button>
            <a href="tel:+15125550100"
              className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
              <Phone size={19} /> (512) 555-0100
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">

          {/* left info */}
          <div className="reveal">
            <SectionHeader label="Contact Us" title="Get Your Free Estimate Today" />
            <p className="text-[#334155] text-lg leading-relaxed mb-10">
              Ready to protect and transform your home? Contact us for a free inspection and detailed estimate.
              No pressure, no obligation — just honest guidance.
            </p>

            {[
              { Icon: Phone, label: "Phone",        content: <a href="tel:+15125550100" className="text-[#334155] hover:text-orange-500 transition-colors text-lg">(512) 555-0100</a> },
              { Icon: Mail,  label: "Email",         content: <a href="mailto:info@HRroofing.com" className="text-[#334155] hover:text-orange-500 transition-colors text-lg">info@HRroofing.com</a> },
              { Icon: MapPin,label: "Service Area",  content: <span className="text-[#334155] text-lg">Greater Austin Area, Texas</span> },
              { Icon: Clock, label: "Business Hours",content: <><p className="text-[#334155]">Mon–Fri: 7 am – 6 pm</p><p className="text-[#334155]">Sat: 8 am – 4 pm</p></> },
            ].map(({ Icon, label, content }) => (
              <div key={label} className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={19} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] mb-0.5 text-sm">{label}</p>
                  {content}
                </div>
              </div>
            ))}
          </div>

          {/* form */}
          <div className="reveal">
            <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-slate-200">
              {contactOk ? (
                <div className="text-center py-14">
                  <CheckCircle size={62} className="text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Message Sent!</h3>
                  <p className="text-[#334155]">We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setContactOk(true); }} className="space-y-4">
                  <h3 className="text-[#0F172A] text-2xl font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Send Us a Message
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-[#334155] mb-1">Full Name *</label>
                      <input required className="f-input" placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#334155] mb-1">Phone *</label>
                      <input required type="tel" className="f-input" placeholder="(512) 555-0100" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#334155] mb-1">Email *</label>
                    <input required type="email" className="f-input" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#334155] mb-1">Service Needed *</label>
                    <select required className="f-input">
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                      <option>Other / Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#334155] mb-1">Message</label>
                    <textarea className="f-input" rows={4} placeholder="Tell us about your project…" />
                  </div>
                  <button type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02]">
                    Get Your Free Estimate Today →
                  </button>
                  <p className="text-slate-400 text-xs text-center">We respect your privacy. Your info is never shared.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-[#0F172A] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

            {/* brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                  <Image src="/hrlogo.jpg" alt="Horizon Remodeling" width={44} height={44} className="object-cover" />
                </div>
                <div>
                  <p className="display-heading text-xl leading-none">Horizon Remodeling</p>
                  <p className="text-orange-400 text-[10px] font-semibold tracking-widest">& RENOVATIONS</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Texas's trusted home improvement company. Quality craftsmanship, honest service, lasting results.
              </p>
              {/* social */}
              <div className="flex gap-2.5">
                {[Share2, Globe, AtSign, LinkIcon].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* services */}
            <div>
              <h4 className="text-white font-bold text-base uppercase tracking-wider mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Services</h4>
              <ul className="space-y-2">
                {SERVICES.map(s => (
                  <li key={s.title}>
                    <a href="#services" className="text-slate-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2">
                      <ChevronRight size={12} className="text-orange-500" />{s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* links */}
            <div>
              <h4 className="text-white font-bold text-base uppercase tracking-wider mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { href: "#about",        label: "About Us"       },
                  { href: "#gallery",      label: "Project Gallery"},
                  { href: "#testimonials", label: "Reviews"        },
                  { href: "#contact",      label: "Contact Us"     },
                  { href: "#",             label: "Privacy Policy" },
                  { href: "#",             label: "Terms of Service"},
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-slate-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2">
                      <ChevronRight size={12} className="text-orange-500" />{l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* contact */}
            <div>
              <h4 className="text-white font-bold text-base uppercase tracking-wider mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Contact</h4>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-3"><Phone size={15} className="text-orange-400 mt-0.5 shrink-0" /><a href="tel:+15125550100" className="text-slate-400 hover:text-white text-sm transition-colors">(512) 555-0100</a></li>
                <li className="flex gap-3"><Mail size={15} className="text-orange-400 mt-0.5 shrink-0" /><a href="mailto:info@HRroofing.com" className="text-slate-400 hover:text-white text-sm transition-colors">info@HRroofing.com</a></li>
                <li className="flex gap-3"><MapPin size={15} className="text-orange-400 mt-0.5 shrink-0" /><span className="text-slate-400 text-sm">Greater Austin Area, TX</span></li>
              </ul>
              <button onClick={() => setModal(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-bold text-sm transition-colors">
                Free Estimate
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Horizon Home Remodeling . All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Shield size={13} className="text-orange-500" />
              <span>Licensed &amp; Insured in Texas</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
