import { useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: string;
  quantity: string;
  category: string;
  description: string;
  image?: string;
};

function Catalog() {
  // Temporary demo data – replace with backend data later
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Groundnut Oil",
      price: "₹180",
      quantity: "1L Bottle",
      category: "Grocery",
      description: "Cold-pressed oil suitable for daily cooking.",
      image: "/sample1.png",
    },
    {
      id: 2,
      name: "Fresh Rice",
      price: "₹50",
      quantity: "1kg Packet",
      category: "Grocery",
      description: "Soft and premium rice for everyday meals.",
      image: "/sample2.png",
    },
    {
      id: 3,
      name: "Turmeric Powder",
      price: "₹30",
      quantity: "100g",
      category: "Spices",
      description: "Pure turmeric powder with strong aroma.",
      image: "/sample3.png",
    },
  ]);

  const [search, setSearch] = useState("");
  const [shareProduct, setShareProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Derived share values for modal
  const shareUrl = shareProduct
    ? `${window.location.origin}/product/${shareProduct.id}`
    : "";
  const shareMessage = shareProduct
    ? `${shareProduct.name} - ${shareProduct.price} (${shareProduct.quantity})`
    : "";

  const handleShareClick = (product: Product) => {
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const message = `${product.name} - ${product.price} (${product.quantity})`;

    // If browser supports Web Share API (mobile, modern)
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: message,
          url: productUrl,
        })
        .catch(() => {
          // user cancelled, ignore
        });
    } else {
      // Fallback: open custom modal
      setShareProduct(product);
    }
  };

  const handleCloseShare = () => {
    setShareProduct(null);
  };

  const handleCopyLink = () => {
    if (!shareProduct) return;
    const productUrl = `${window.location.origin}/product/${shareProduct.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(productUrl);
      alert("Link copied to clipboard");
    } else {
      alert(productUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 px-4 py-10">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none opacity-60">
        <div className="absolute top-10 left-10 h-48 w-48 bg-violet-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 h-64 w-64 bg-sky-200/40 blur-3xl rounded-full" />
      </div>

      {/* PAGE HEADER */}
      <div className="relative max-w-7xl mx-auto mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">
          Your <span className="text-violet-700">Catalog 📄</span>
        </h1>

        <Link
          to="/dashboard"
          className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-sm hover:bg-slate-100 shadow-sm transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-7xl mx-auto mb-8">
        <div className="bg-white/90 p-4 rounded-2xl border border-slate-200 shadow backdrop-blur flex items-center gap-3">
          <span className="text-slate-500 text-xl">🔍</span>
          <input
            type="text"
            placeholder="Search products by name..."
            className="flex-1 outline-none bg-transparent text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* CATEGORY CHIPS (UI only, filter not wired yet) */}
      <div className="relative max-w-7xl mx-auto mb-8 flex flex-wrap gap-3 text-xs">
        {["All", "Grocery", "Hardware", "Spices", "Household", "Snacks", "Others"].map(
          (cat) => (
            <button
              key={cat}
              className="px-4 py-1.5 rounded-full bg-white border border-slate-300 shadow-sm hover:bg-slate-100 transition"
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* PRODUCT GRID */}
      <div className="relative max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-semibold text-slate-700 mb-2">
              No products found 😔
            </p>
            <p className="text-slate-500 mb-4">Try searching with another name.</p>

            <Link
              to="/add-manual"
              className="px-6 py-2 rounded-xl bg-violet-600 text-white text-sm hover:bg-violet-500 shadow transition"
            >
              + Add Product
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 fade-in">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-xl transition hover:-translate-y-1 duration-200"
              >
                {/* IMAGE */}
                <div className="h-40 w-full rounded-2xl overflow-hidden mb-4 flex items-center justify-center bg-slate-100">
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="h-full w-auto object-contain"
                  />
                </div>

                {/* PRODUCT INFO */}
                <p className="text-xs uppercase text-violet-600 font-semibold mb-1">
                  {product.category}
                </p>

                <h3 className="text-lg font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="text-sm text-slate-600 mt-1">
                  {product.description}
                </p>

                <p className="mt-2 text-lg font-semibold text-emerald-700">
                  {product.price}
                </p>

                <p className="text-xs text-slate-500 mt-1">{product.quantity}</p>

                {/* ACTION BUTTONS */}
                <div className="flex items-center justify-between mt-4 text-xs">
                  <button className="px-4 py-1.5 rounded-xl bg-violet-600 text-white hover:bg-violet-500 shadow transition">
                    Edit
                  </button>
                  <button className="px-4 py-1.5 rounded-xl bg-red-500 text-white hover:bg-red-400 shadow transition">
                    Delete
                  </button>
                  <button
                    className="px-4 py-1.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 shadow transition"
                    onClick={() => handleShareClick(product)}
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SHARE MODAL (fallback when Web Share API is not available) */}
      {shareProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative animate-section-fade">
            <button
              onClick={handleCloseShare}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-lg"
            >
              ×
            </button>

            <p className="text-sm font-semibold text-slate-800 mb-1">
              Share product
            </p>
            <p className="text-xs text-slate-500 mb-4">
              {shareMessage}
            </p>

            {/* SHARE OPTIONS */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              {/* WhatsApp */}
              <a
                href={
                  "https://wa.me/?text=" +
                  encodeURIComponent(`${shareMessage}\n${shareUrl}`)
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
              >
                <span className="text-lg">🟢</span>
                <span>WhatsApp</span>
              </a>

              {/* Instagram (open app/site – user pastes link) */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
              >
                <span className="text-lg">📸</span>
                <span>Instagram</span>
              </a>

              {/* Snapchat */}
              <a
                href="https://www.snapchat.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
              >
                <span className="text-lg">👻</span>
                <span>Snapchat</span>
              </a>

              {/* Telegram */}
              <a
                href={
                  "https://t.me/share/url?url=" +
                  encodeURIComponent(shareUrl) +
                  "&text=" +
                  encodeURIComponent(shareMessage)
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
              >
                <span className="text-lg">📨</span>
                <span>Telegram</span>
              </a>
            </div>

            {/* Copy link */}
            <button
              onClick={handleCopyLink}
              className="w-full text-xs px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              Copy product link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog;
