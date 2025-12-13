import { useEffect, useRef } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

/**
 * FadeInSection
 * Wrap any block with this to make it fade-in when scrolled into view.
 */
type FadeInSectionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

function FadeInSection({ children, className = "", ...rest }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("fade-section-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-section ${className}`} {...rest}>
      {children}
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* NAVBAR */}
      <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-sm font-bold glow-hover">
              IV
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">
                Voice Catalog Agent
              </p>
              <p className="text-[11px] text-slate-500">
                For rural &amp; small-scale vendors
              </p>
            </div>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-slate-900 transition-colors"
            >
              How it works
            </a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">
              Pricing
            </a>
            <a href="#vendors" className="hover:text-slate-900 transition-colors">
              For vendors
            </a>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Link
              to="/auth/login"
              className="px-4 py-1.5 rounded-full border border-slate-300 text-slate-700 bg-white/70 hover:bg-slate-100 glow-hover"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="px-4 py-1.5 rounded-full bg-violet-600 text-white font-semibold shadow-sm hover:bg-violet-500 glow-hover"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-16 grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
          {/* Left: text */}
          <div className="animate-hero">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-violet-600 uppercase mb-3">
              vendor-first voice catalog
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
              Turn your{" "}
              <span className="text-violet-700">spoken words</span> into a{" "}
              <span className="text-sky-600">beautiful product catalog</span>.
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl">
              Voice Catalog Agent lets small and rural vendors create digital
              catalogs simply by speaking. No typing, no English required — just
              describe your products as you talk to customers and we generate
              ready-to-share product cards.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/auth/signup"
                className="px-6 py-2.5 rounded-full bg-violet-600 text-white text-sm font-semibold shadow-md hover:bg-violet-500 glow-hover"
              >
                Get Started Free
              </Link>
              <Link
                to="/auth/login"
                className="px-6 py-2.5 rounded-full border border-slate-300 text-sm text-slate-700 bg-white/70 hover:bg-white hover:shadow-sm glow-hover"
              >
                I&apos;m already a vendor
              </Link>
            </div>

            {/* Small highlights */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-4 text-[11px] sm:text-xs text-slate-600">
              <div className="rounded-xl border border-slate-200 bg-white/80 p-3 hover:shadow-sm glow-hover">
                <p className="font-semibold text-slate-900 mb-1">
                  Voice-only input
                </p>
                <p>Vendors describe products in their own language.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/80 p-3 hover:shadow-sm glow-hover">
                <p className="font-semibold text-slate-900 mb-1">
                  Auto catalog fields
                </p>
                <p>We detect title, price, quantity and description.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/80 p-3 hover:shadow-sm glow-hover">
                <p className="font-semibold text-slate-900 mb-1">
                  Share everywhere
                </p>
                <p>Use your catalog on WhatsApp, printouts, or apps.</p>
              </div>
            </div>
          </div>

          {/* Right: mockup card / image */}
          <div className="relative animate-hero-card">
            {/* Soft gradient blobs behind card */}
            <div className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-violet-200/80 blur-3xl" />
            <div className="absolute bottom-0 -left-16 h-44 w-44 rounded-full bg-sky-200/80 blur-3xl" />

            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden glow-hover">
              {/* Top bar */}
              <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-violet-600 text-white text-xs font-semibold flex items-center justify-center">
                    VS
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">
                      Sri Lakshmi General Store
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Voice catalog preview
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live
                </span>
              </div>

{/* Hero mockup / image */}
<div className="px-5 pt-4">
  <div className="rounded-2xl bg-gradient-to-br from-violet-100 via-amber-50 to-sky-100 
                  overflow-hidden animate-float-soft flex items-center justify-center p-4">

    <img
      src="/vendor-image.png"
      alt="Vendor using voice to create a product catalog"
      className="w-full h-auto object-contain drop-shadow-md"
    />

  </div>
</div>


              {/* Product cards */}
              <div className="px-5 pt-5 pb-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-3 hover:shadow-md glow-hover">
                  <p className="text-[11px] uppercase tracking-wide text-violet-600 mb-1">
                    Grocery · Daily staple
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Fresh Rice 1kg Packet
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Soft, everyday rice from trusted local suppliers. Perfect
                    for family meals.
                  </p>
                  <p className="mt-2 text-sm font-semibold text-emerald-700">
                    ₹50.00
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-3 hover:shadow-md glow-hover">
                  <p className="text-[11px] uppercase tracking-wide text-amber-600 mb-1">
                    Oil · Essentials
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Groundnut Oil 1L Bottle
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Cold-pressed oil suitable for daily cooking with a rich
                    aroma.
                  </p>
                  <p className="mt-2 text-sm font-semibold text-emerald-700">
                    ₹180.00
                  </p>
                </div>
              </div>

              {/* Tags strip */}
              <div className="px-5 pb-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex flex-wrap gap-1.5">
                  {["grocery", "local shop", "voice catalog", "WhatsApp-ready"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
                <span className="text-emerald-600 font-medium">
                  3× faster listing
                </span>
              </div>
            </div>
          </div>
        </section>

{/* FEATURES SECTION */}
<FadeInSection
  className="bg-white border-t border-slate-200 py-16"
  id="features"
>
  <div className="max-w-7xl mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-14">
      <h2 className="text-3xl font-semibold mb-3">
        Powerful features for real vendors
      </h2>
      <p className="text-slate-600 text-sm max-w-2xl mx-auto">
        Designed to make catalog creation effortless for shop owners, small
        vendors, and rural businesses — all through simple voice commands.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {/* Feature 1 */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 hover:shadow-lg transition-all glow-hover">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-2xl">
          🎙️
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2">
          Multilingual Voice Input
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Speak naturally in your local language — the system understands your
          accent, mixed speech, and real shop environment.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 hover:shadow-lg transition-all glow-hover">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl">
          🧠
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2">
          Smart Field Extraction
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Product name, price, units, brand, quantity — everything is detected
          automatically from your speech.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 hover:shadow-lg transition-all glow-hover">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-2xl">
          📲
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2">
          Share-Ready Product Cards
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Automatically formats clean product cards ready to share on WhatsApp,
          printouts, or digital catalogs.
        </p>
      </div>

      {/* Feature 4 */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 hover:shadow-lg transition-all glow-hover">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
          ⚡
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2">
          Fast Catalog Generation
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Create an entire digital catalog 3× faster than manual typing. Update
          prices and products instantly.
        </p>
      </div>

      {/* Feature 5 */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 hover:shadow-lg transition-all glow-hover">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-2xl">
          🔄
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2">
          Real-Time Editing
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Edit product cards instantly with voice or touch — pricing, quantity,
          descriptions & images update live.
        </p>
      </div>

      {/* Feature 6 */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 hover:shadow-lg transition-all glow-hover">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-2xl">
          🔐
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2">
          Secure & Private
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Vendor data stays encrypted and private — safe from misuse, leaks, or
          unauthorized access.
        </p>
      </div>
    </div>
  </div>
</FadeInSection>

{/* HOW IT WORKS */}
<FadeInSection
  className="bg-[#f9fafb] border-t border-slate-200 py-16"
  id="how-it-works"
>
  <div className="max-w-7xl mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-14">
      <h2 className="text-3xl font-semibold mb-3">How It Works</h2>
      <p className="text-slate-600 text-sm max-w-2xl mx-auto">
        Voice Catalog Agent listens as you describe your products and converts
        your natural speech into clean, shareable product cards automatically.
      </p>
    </div>

    {/* Steps Grid */}
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4 text-sm">

      {/* Step 1 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-all glow-hover h-full flex flex-col">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center text-2xl">
            🛒
          </div>
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2 text-center">
          1. Log In & Start Voice Mode
        </h3>
        <p className="text-slate-600 leading-relaxed text-center">
          Vendor opens the app and selects <strong>“Add product by voice.”</strong> 
          No typing or setup required.
        </p>
      </div>

      {/* Step 2 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-all glow-hover h-full flex flex-col">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl">
            🎙️
          </div>
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2 text-center">
          2. Speak Details Naturally
        </h3>
        <p className="text-slate-600 leading-relaxed text-center">
          Vendor speaks product name, price, size, brand, and any details in 
          their own language—just like talking to a customer.
        </p>
      </div>

      {/* Step 3 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-all glow-hover h-full flex flex-col">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
            🧠
          </div>
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2 text-center">
          3. System Converts Speech
        </h3>
        <p className="text-slate-600 leading-relaxed text-center">
          Speech is transcribed, cleaned, and analyzed. The system extracts 
          fields automatically and suggests tags.
        </p>
      </div>

      {/* Step 4 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-all glow-hover h-full flex flex-col">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-2xl">
            📦
          </div>
        </div>
        <h3 className="font-semibold text-sm text-slate-900 mb-2 text-center">
          4. Product Card is Created
        </h3>
        <p className="text-slate-600 leading-relaxed text-center">
          Vendor quickly reviews and saves. The product instantly appears in 
          their digital catalog—ready to share.
        </p>
      </div>

    </div>
  </div>
</FadeInSection>

{/* PRICING TEASER */}
<FadeInSection
  className="bg-white border-t border-slate-200 py-16"
  id="pricing"
>
  <div className="max-w-7xl mx-auto px-4 text-sm">
    {/* Header */}
    <div className="text-center mb-14">
      <h2 className="text-3xl font-semibold mb-3">Simple, vendor-first pricing</h2>
      <p className="text-slate-600 max-w-2xl mx-auto">
        Start free while you build your catalog. Upgrade only when you&apos;re ready
        for advanced controls, analytics, and more shops under the same account.
      </p>
    </div>

    {/* Pricing grid */}
    <div className="grid gap-8 md:grid-cols-3">
      {/* Plan 1 - Basic */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 hover:shadow-lg transition-all glow-hover flex flex-col">
        <p className="text-xs font-semibold tracking-wide text-slate-600 uppercase mb-1">
          Basic
        </p>
        <p className="text-2xl font-semibold text-slate-900 mb-1">
          ₹0 <span className="text-xs font-normal text-slate-500">/ month</span>
        </p>
        <p className="text-xs text-slate-600 mb-4">
          Ideal for testing the system with a small number of products.
        </p>
        <ul className="text-xs text-slate-700 space-y-2 mb-6 list-disc list-inside">
          <li>Up to 50 products</li>
          <li>Daily voice entries</li>
          <li>Basic catalog sharing</li>
        </ul>
        <button
          disabled
          className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-[11px] text-slate-600 cursor-not-allowed"
        >
          Included in pilot
        </button>
      </div>

      {/* Plan 2 - Starter (Highlighted) */}
      <div className="rounded-3xl border-2 border-violet-400 bg-violet-50 p-8 shadow-lg flex flex-col relative overflow-hidden">
        <span className="absolute right-4 top-4 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
          Recommended
        </span>
        <p className="text-xs font-semibold tracking-wide text-violet-700 uppercase mb-1">
          Starter for vendors
        </p>
        <p className="text-3xl font-semibold text-slate-900 mb-1">
          ₹0 <span className="text-xs font-normal text-slate-500">/ month</span>
        </p>
        <p className="text-xs text-slate-600 mb-4">
          Perfect for a single shop owner getting their first full digital catalog.
        </p>
        <ul className="text-xs text-slate-700 space-y-2 mb-6 list-disc list-inside">
          <li>Up to 100 products in catalog</li>
          <li>Unlimited voice entries per day</li>
          <li>WhatsApp-shareable product cards</li>
          <li>Basic tags & search inside catalog</li>
        </ul>
        <Link
          to="/auth/signup"
          className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-2 text-[11px] font-semibold text-white hover:bg-violet-500 shadow-sm glow-hover"
        >
          Create free account
        </Link>
      </div>

      {/* Plan 3 - Plus */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 hover:shadow-lg transition-all glow-hover flex flex-col">
        <p className="text-xs font-semibold tracking-wide text-slate-600 uppercase mb-1">
          Plus (future)
        </p>
        <p className="text-2xl font-semibold text-slate-900 mb-1">
          ₹— <span className="text-xs font-normal text-slate-500">/ month</span>
        </p>
        <p className="text-xs text-slate-600 mb-4">
          Concept plan for multiple branches, analytics and integrations.
        </p>
        <ul className="text-xs text-slate-700 space-y-2 mb-6 list-disc list-inside">
          <li>Multiple shop profiles</li>
          <li>Advanced usage analytics</li>
          <li>Export data to other systems</li>
        </ul>
        <button
          disabled
          className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-[11px] text-slate-600 cursor-not-allowed"
        >
          Coming soon
        </button>
      </div>
    </div>
  </div>
</FadeInSection>

       {/* VENDOR SECTION */}
<FadeInSection
  className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-t border-slate-200 py-20"
  id="vendors"
>
  <div className="max-w-7xl mx-auto px-4 grid gap-16 md:grid-cols-[1.2fr,0.9fr] items-start text-sm">

    {/* Left content */}
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.25em] text-violet-600 uppercase mb-4">
          for real-world shops
        </p>
        <h2 className="text-3xl font-semibold leading-snug mb-4">
          Built for real vendors, not just apps.
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4 text-[14px]">
          Many small shop owners are left behind in the digital economy because tools
          expect typing, English skills, and complex phone usage. This project is focused
          on reducing that gap and making catalog creation as natural as speaking to a customer.
        </p>
        <p className="text-slate-600 leading-relaxed text-[14px]">
          Whether it&apos;s a kirana store, hardware shop, or small clothing vendor, they can
          all speak their way into the digital world with minimal friction and maximum comfort.
        </p>
      </div>

      {/* Benefits grid */}
      <div className="grid gap-4 sm:grid-cols-2 text-[12px] sm:text-sm">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[12px]">
            ✓
          </span>
          <p className="text-slate-700 leading-relaxed">
            Works in noisy shop environments with mixed-language speech.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[12px]">
            ✓
          </span>
          <p className="text-slate-700 leading-relaxed">
            Designed for low-tech users who are more comfortable speaking than typing.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-[12px]">
            ✓
          </span>
          <p className="text-slate-700 leading-relaxed">
            Catalogs can be shared on WhatsApp, printed, or shown to walk-in customers.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-[12px]">
            ✓
          </span>
          <p className="text-slate-700 leading-relaxed">
            Mobile-first experience that works even on basic Android smartphones.
          </p>
        </div>
      </div>
    </div>

    {/* Right: image + quote card */}
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 sm:p-8 shadow-lg glow-hover space-y-6">


{/* Wider + slightly taller container to fit full image without cropping */}
<div
  className="
    rounded-2xl overflow-hidden mb-4
    bg-gradient-to-br from-violet-100 via-sky-50 to-amber-50
    flex items-center justify-center
    h-40 sm:h-50 md:h-60       /* slightly increased height */
    w-full max-w-[55%] mx-auto /* increased width */
  "
>
  <img
    src="/image2.png"
    alt="Vendor using voice catalog"
    className="max-h-full max-w-full object-contain drop-shadow-md"
  />
</div>

      {/* Quote */}
      <div className="relative pt-6">
        <span className="absolute -top-2 left-0 text-4xl text-violet-300">
          “
        </span>

        <p className="font-semibold text-slate-900 leading-snug mb-2 pl-6 text-[14px]">
          &quot;I just speak once, and my whole catalog is ready to share.&quot;
        </p>

        <p className="text-xs text-slate-600 leading-relaxed pl-6">
          Earlier I used to write prices in a notebook and send photos on WhatsApp.
          Now the system remembers everything and updates prices instantly.
        </p>

        <p className="mt-3 text-[11px] text-slate-500 pl-6">
          — Sample rural shop owner (pilot user)
        </p>
      </div>
    </div>
  </div>
</FadeInSection>


      </main>

 {/* FOOTER */}
<footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-20">
  {/* gradient blobs */}
  <div className="relative">
    <div className="absolute -top-10 left-10 h-32 w-32 bg-violet-500/20 blur-3xl rounded-full pointer-events-none" />
    <div className="absolute -bottom-10 right-10 h-32 w-32 bg-sky-400/20 blur-3xl rounded-full pointer-events-none" />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-[1.3fr,1fr,1fr]">
    {/* Brand + description */}
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
          IV
        </div>
        <span className="text-base font-semibold tracking-tight">
          Voice Catalog Agent
        </span>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
        Helping rural and small-scale vendors digitize their shops using
        simple voice-based product cataloging — no typing, no tech skills needed.
      </p>

      <p className="text-xs text-slate-500 mt-4">
        © {new Date().getFullYear()} Voice Catalog Agent. All rights reserved.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-sm font-semibold text-slate-200 mb-3 tracking-wide">
        Quick Links
      </h3>
      <ul className="space-y-2 text-sm">
        <li>
          <a
            href="#features"
            className="hover:text-violet-400 transition"
          >
            Features
          </a>
        </li>
        <li>
          <a
            href="#pricing"
            className="hover:text-violet-400 transition"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="#vendors"
            className="hover:text-violet-400 transition"
          >
            For Vendors
          </a>
        </li>
      </ul>
    </div>

    {/* Contact / Social */}
    <div>
      <h3 className="text-sm font-semibold text-slate-200 mb-3 tracking-wide">
        Connect with us
      </h3>

      <p className="text-sm text-slate-400 mb-3">
        Reach out for support or partnership opportunities.
      </p>

      <div className="flex gap-4 text-lg">
        <a
          href="#"
          className="hover:text-violet-400 transition"
          title="Instagram"
        >
          <i className="ri-instagram-line"></i>
        </a>
        <a
          href="#"
          className="hover:text-violet-400 transition"
          title="WhatsApp"
        >
          <i className="ri-whatsapp-line"></i>
        </a>
        <a
          href="#"
          className="hover:text-violet-400 transition"
          title="Email"
        >
          <i className="ri-mail-line"></i>
        </a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}

export default LandingPage;
