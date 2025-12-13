import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 text-slate-900 relative">
      {/* Soft background lights */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-72 w-72 bg-violet-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-0 h-96 w-96 bg-sky-300/30 blur-3xl rounded-full" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
              IV
            </div>
            <p className="font-semibold text-slate-900 text-sm tracking-tight">
              Vendor Dashboard
            </p>
          </div>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-full text-sm shadow-sm hover:shadow-md transition"
            >
              <span className="text-slate-700 font-medium">Vendor</span>
              <img
                src="https://ui-avatars.com/api/?name=Vendor&background=7c3aed&color=fff"
                className="h-7 w-7 rounded-full"
              />
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  My Profile
                </Link>

                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16 relative">

{/* WELCOME BANNER */}
<section className="fade-in">
  <div
    className="
      relative rounded-3xl 
      bg-gradient-to-r from-white via-slate-100 to-slate-200
      border border-slate-200 
      shadow-md 
      p-10 md:p-12 
      flex flex-col md:flex-row 
      justify-between 
      items-start md:items-center 
      gap-10
      animate-section-fade
    "
  >
    {/* Animated soft background glows */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-10 left-10 h-32 w-32 bg-slate-300/40 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-0 right-20 h-40 w-40 bg-slate-400/30 rounded-full blur-3xl animate-float-slower"></div>
    </div>

    {/* LEFT TEXT */}
    <div className="relative z-10 max-w-xl space-y-4 animate-slide-up">
      <p className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
        Vendor Home
      </p>

      <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 leading-snug">
        Welcome back,{" "}
        <span className="text-slate-600">
          Vendor{" "}
          <span className="inline-block animate-wave align-middle">👋</span>
        </span>
      </h1>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
        Manage your products, add items using voice, and share your digital
        catalog with customers — all from an easy and friendly dashboard.
      </p>
    </div>

    {/* RIGHT MINI CARD */}
    <div className="relative z-10 w-full max-w-xs animate-slide-up-delayed">
      <div
        className="
          rounded-2xl 
          bg-white/90 
          border border-slate-200 
          p-5 
          shadow 
          backdrop-blur-sm
          transform transition duration-300
          hover:shadow-lg hover:-translate-y-1
        "
      >
        <p className="text-xs font-semibold text-slate-600 mb-3">
          Today at a glance
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Voice entries</span>
            <span className="font-medium text-slate-700">12</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">New products</span>
            <span className="font-medium text-slate-700">4</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Catalog completion</span>
            <span className="font-medium text-slate-700">92%</span>
          </div>
        </div>

        {/* Smooth progress bar */}
        <div className="mt-4">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full w-[92%] bg-slate-500 rounded-full animate-grow-soft"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* STAT CARDS */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 fade-in">
          {[
            { label: "Total Products", value: "48", color: "from-violet-100 to-violet-50" },
            { label: "Voice Entries Today", value: "12", color: "from-emerald-100 to-emerald-50" },
            { label: "Most Viewed Product", value: "Rice 1kg", color: "from-amber-100 to-amber-50" },
            { label: "Catalog Completion", value: "92%", color: "from-sky-100 to-sky-50" }
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${item.color} p-5 shadow-sm hover:shadow-md transition`}
            >
              <p className="text-xs uppercase text-slate-500 mb-1">
                {item.label}
              </p>
              <p className="text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* QUICK ACTIONS */}
        <section className="fade-in">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/add-voice"
              className="rounded-3xl bg-violet-600 text-white text-center py-5 text-sm font-semibold shadow-md hover:bg-violet-500 transition"
            >
              🎤 Add Product by Voice
            </Link>

            <Link
              to="/add-manual"
              className="rounded-3xl bg-white border border-slate-300 text-center py-5 text-sm shadow-md hover:shadow-lg transition"
            >
              ⌨️ Add Product Manually
            </Link>

            <Link
              to="/catalog"
              className="rounded-3xl bg-white border border-slate-300 text-center py-5 text-sm shadow-md hover:shadow-lg transition"
            >
              📄 View Catalog
            </Link>

            <Link
  to="/share-catalog"
  className="rounded-3xl bg-emerald-500 text-white text-center py-5 text-sm font-semibold 
             shadow-md hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] 
             transition-transform transition-colors block"
>
  📤 Share Catalog
</Link>

          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className="fade-in">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <div className="rounded-3xl bg-white/90 border border-slate-200 shadow-md divide-y backdrop-blur-sm">
            {[
              "Added: Groundnut Oil 1L Bottle",
              "Edited: Fresh Rice 1kg Packet",
              "Generated Card: Sugar 1kg",
              "Added: Turmeric Powder 100g"
            ].map((log, idx) => (
              <div
                key={idx}
                className="px-6 py-4 text-sm text-slate-700 hover:bg-slate-50 transition"
              >
                {log}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
