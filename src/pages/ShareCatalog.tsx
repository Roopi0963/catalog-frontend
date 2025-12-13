import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ShareCatalog() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const catalogURL = `${window.location.origin}/catalog`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(catalogURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 text-slate-900 px-6 py-10">

      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
            IV
          </div>
          <p className="font-semibold text-slate-700">Back to Dashboard</p>
        </Link>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto bg-white/90 rounded-3xl border border-slate-200 shadow-xl p-8 backdrop-blur-xl animate-section-fade">

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-2">
          Share Your Catalog
        </h1>
        <p className="text-slate-600 text-sm mb-6">
          Choose where you want to share your full product catalog with customers.
        </p>

        {/* PREVIEW BOX */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-10">
          <p className="text-sm font-semibold text-slate-700 mb-3">Catalog preview</p>

          <div className="flex flex-col gap-3 text-xs text-slate-600">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              Rice 1kg – ₹50
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              Groundnut Oil 1L – ₹180
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              Sugar 1kg – ₹45
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-3">
            *This is only a preview. Customers will see your full catalog.
          </p>
        </div>

        {/* SHARE OPTIONS */}
        <h2 className="text-lg font-semibold mb-4">Share via</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">

          {/* WHATSAPP */}
          <button
            onClick={() =>
              window.open(`https://wa.me/?text=${encodeURIComponent(catalogURL)}`, "_blank")
            }
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm transition"
          >
            <span className="text-3xl">🟢</span>
            <span className="text-xs font-medium">WhatsApp</span>
          </button>

          {/* INSTAGRAM */}
          <button
            onClick={() => window.open("https://instagram.com", "_blank")}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm transition"
          >
            <span className="text-3xl">📸</span>
            <span className="text-xs font-medium">Instagram</span>
          </button>

          {/* SNAPCHAT */}
          <button
            onClick={() => window.open("https://snapchat.com", "_blank")}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm transition"
          >
            <span className="text-3xl">👻</span>
            <span className="text-xs font-medium">Snapchat</span>
          </button>

          {/* TELEGRAM */}
          <button
            onClick={() =>
              window.open(`https://t.me/share/url?url=${encodeURIComponent(catalogURL)}`, "_blank")
            }
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm transition"
          >
            <span className="text-3xl">📨</span>
            <span className="text-xs font-medium">Telegram</span>
          </button>

          {/* COPY LINK */}
          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm transition"
          >
            <span className="text-3xl">🔗</span>
            <span className="text-xs font-medium">{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-3 text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          Back to Dashboard
        </button>
      </main>
    </div>
  );
}

export default ShareCatalog;
