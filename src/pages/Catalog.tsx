// import { useState } from "react";
// import { Link } from "react-router-dom";

// type Product = {
//   id: number;
//   name: string;
//   price: string;
//   quantity: string;
//   category: string;
//   description: string;
//   image?: string;
// };

// function Catalog() {
//   // Temporary demo data – replace with backend data later
//   const [products] = useState<Product[]>([
//     {
//       id: 1,
//       name: "Groundnut Oil",
//       price: "₹180",
//       quantity: "1L Bottle",
//       category: "Grocery",
//       description: "Cold-pressed oil suitable for daily cooking.",
//       image: "/sample1.png",
//     },
//     {
//       id: 2,
//       name: "Fresh Rice",
//       price: "₹50",
//       quantity: "1kg Packet",
//       category: "Grocery",
//       description: "Soft and premium rice for everyday meals.",
//       image: "/sample2.png",
//     },
//     {
//       id: 3,
//       name: "Turmeric Powder",
//       price: "₹30",
//       quantity: "100g",
//       category: "Spices",
//       description: "Pure turmeric powder with strong aroma.",
//       image: "/sample3.png",
//     },
//   ]);

//   const [search, setSearch] = useState("");
//   const [shareProduct, setShareProduct] = useState<Product | null>(null);

//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Derived share values for modal
//   const shareUrl = shareProduct
//     ? `${window.location.origin}/product/${shareProduct.id}`
//     : "";
//   const shareMessage = shareProduct
//     ? `${shareProduct.name} - ${shareProduct.price} (${shareProduct.quantity})`
//     : "";

//   const handleShareClick = (product: Product) => {
//     const productUrl = `${window.location.origin}/product/${product.id}`;
//     const message = `${product.name} - ${product.price} (${product.quantity})`;

//     // If browser supports Web Share API (mobile, modern)
//     if (navigator.share) {
//       navigator
//         .share({
//           title: product.name,
//           text: message,
//           url: productUrl,
//         })
//         .catch(() => {
//           // user cancelled, ignore
//         });
//     } else {
//       // Fallback: open custom modal
//       setShareProduct(product);
//     }
//   };

//   const handleCloseShare = () => {
//     setShareProduct(null);
//   };

//   const handleCopyLink = () => {
//     if (!shareProduct) return;
//     const productUrl = `${window.location.origin}/product/${shareProduct.id}`;
//     if (navigator.clipboard && navigator.clipboard.writeText) {
//       navigator.clipboard.writeText(productUrl);
//       alert("Link copied to clipboard");
//     } else {
//       alert(productUrl);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 px-4 py-10">
//       {/* Background glow */}
//       <div className="fixed inset-0 pointer-events-none opacity-60">
//         <div className="absolute top-10 left-10 h-48 w-48 bg-violet-200/40 blur-3xl rounded-full" />
//         <div className="absolute bottom-10 right-10 h-64 w-64 bg-sky-200/40 blur-3xl rounded-full" />
//       </div>

//       {/* PAGE HEADER */}
//       <div className="relative max-w-7xl mx-auto mb-10 flex items-center justify-between">
//         <h1 className="text-3xl font-semibold tracking-tight">
//           Your <span className="text-violet-700">Catalog 📄</span>
//         </h1>

//         <Link
//           to="/dashboard"
//           className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-sm hover:bg-slate-100 shadow-sm transition"
//         >
//           ← Back to Dashboard
//         </Link>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="relative max-w-7xl mx-auto mb-8">
//         <div className="bg-white/90 p-4 rounded-2xl border border-slate-200 shadow backdrop-blur flex items-center gap-3">
//           <span className="text-slate-500 text-xl">🔍</span>
//           <input
//             type="text"
//             placeholder="Search products by name..."
//             className="flex-1 outline-none bg-transparent text-sm"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* CATEGORY CHIPS (UI only, filter not wired yet) */}
//       <div className="relative max-w-7xl mx-auto mb-8 flex flex-wrap gap-3 text-xs">
//         {["All", "Grocery", "Hardware", "Spices", "Household", "Snacks", "Others"].map(
//           (cat) => (
//             <button
//               key={cat}
//               className="px-4 py-1.5 rounded-full bg-white border border-slate-300 shadow-sm hover:bg-slate-100 transition"
//             >
//               {cat}
//             </button>
//           )
//         )}
//       </div>

//       {/* PRODUCT GRID */}
//       <div className="relative max-w-7xl mx-auto">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-xl font-semibold text-slate-700 mb-2">
//               No products found 😔
//             </p>
//             <p className="text-slate-500 mb-4">Try searching with another name.</p>

//             <Link
//               to="/add-manual"
//               className="px-6 py-2 rounded-xl bg-violet-600 text-white text-sm hover:bg-violet-500 shadow transition"
//             >
//               + Add Product
//             </Link>
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 fade-in">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-xl transition hover:-translate-y-1 duration-200"
//               >
//                 {/* IMAGE */}
//                 <div className="h-40 w-full rounded-2xl overflow-hidden mb-4 flex items-center justify-center bg-slate-100">
//                   <img
//                     src={product.image || "/placeholder.png"}
//                     alt={product.name}
//                     className="h-full w-auto object-contain"
//                   />
//                 </div>

//                 {/* PRODUCT INFO */}
//                 <p className="text-xs uppercase text-violet-600 font-semibold mb-1">
//                   {product.category}
//                 </p>

//                 <h3 className="text-lg font-semibold text-slate-900">
//                   {product.name}
//                 </h3>

//                 <p className="text-sm text-slate-600 mt-1">
//                   {product.description}
//                 </p>

//                 <p className="mt-2 text-lg font-semibold text-emerald-700">
//                   {product.price}
//                 </p>

//                 <p className="text-xs text-slate-500 mt-1">{product.quantity}</p>

//                 {/* ACTION BUTTONS */}
//                 <div className="flex items-center justify-between mt-4 text-xs">
//                   <button className="px-4 py-1.5 rounded-xl bg-violet-600 text-white hover:bg-violet-500 shadow transition">
//                     Edit
//                   </button>
//                   <button className="px-4 py-1.5 rounded-xl bg-red-500 text-white hover:bg-red-400 shadow transition">
//                     Delete
//                   </button>
//                   <button
//                     className="px-4 py-1.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 shadow transition"
//                     onClick={() => handleShareClick(product)}
//                   >
//                     Share
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* SHARE MODAL (fallback when Web Share API is not available) */}
//       {shareProduct && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
//           <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative animate-section-fade">
//             <button
//               onClick={handleCloseShare}
//               className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-lg"
//             >
//               ×
//             </button>

//             <p className="text-sm font-semibold text-slate-800 mb-1">
//               Share product
//             </p>
//             <p className="text-xs text-slate-500 mb-4">
//               {shareMessage}
//             </p>

//             {/* SHARE OPTIONS */}
//             <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
//               {/* WhatsApp */}
//               <a
//                 href={
//                   "https://wa.me/?text=" +
//                   encodeURIComponent(`${shareMessage}\n${shareUrl}`)
//                 }
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
//               >
//                 <span className="text-lg">🟢</span>
//                 <span>WhatsApp</span>
//               </a>

//               {/* Instagram (open app/site – user pastes link) */}
//               <a
//                 href="https://www.instagram.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
//               >
//                 <span className="text-lg">📸</span>
//                 <span>Instagram</span>
//               </a>

//               {/* Snapchat */}
//               <a
//                 href="https://www.snapchat.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
//               >
//                 <span className="text-lg">👻</span>
//                 <span>Snapchat</span>
//               </a>

//               {/* Telegram */}
//               <a
//                 href={
//                   "https://t.me/share/url?url=" +
//                   encodeURIComponent(shareUrl) +
//                   "&text=" +
//                   encodeURIComponent(shareMessage)
//                 }
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
//               >
//                 <span className="text-lg">📨</span>
//                 <span>Telegram</span>
//               </a>
//             </div>

//             {/* Copy link */}
//             <button
//               onClick={handleCopyLink}
//               className="w-full text-xs px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
//             >
//               Copy product link
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Catalog;
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* ===================== TYPES ===================== */
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  productAvailable: boolean;
  imageData?: string | null;
}

/* ===================== COMPONENT ===================== */
const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareProduct, setShareProduct] = useState<Product | null>(null);

  /* ===================== FETCH PRODUCTS ===================== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_SPRING_API_URL;

        if (!API_BASE_URL) {
          throw new Error("VITE_SPRING_API_URL is not defined");
        }

        const response = await fetch(`${API_BASE_URL}/catalog/public`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const raw = await response.text();
          console.error("Non-JSON response:", raw);
          throw new Error("API did not return JSON");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ===================== SEARCH ===================== */
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  /* ===================== SHARE ===================== */
  const handleShare = (product: Product) => {
    const url = `${window.location.origin}/product/${product.id}`;
    const text = `${product.name} - ₹${product.price}`;

    if (navigator.share) {
      navigator.share({ title: product.name, text, url }).catch(() => {});
    } else {
      setShareProduct(product);
    }
  };

  const copyLink = () => {
    if (!shareProduct) return;
    navigator.clipboard.writeText(
      `${window.location.origin}/product/${shareProduct.id}`
    );
    alert("Product link copied");
  };

  /* ===================== STATES ===================== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  const handleDelete = async (productId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const API_BASE_URL = import.meta.env.VITE_SPRING_API_URL;

      const response = await fetch(
        `${API_BASE_URL}/catalog/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      // Update UI without refresh
      setProducts((prev) => prev.filter((p) => p.id !== productId));

      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-slate-50 to-violet-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">
          Product <span className="text-violet-600">Catalog</span>
        </h1>
        <Link to="/dashboard" className="px-4 py-2 border rounded-xl">
          ← Back
        </Link>
      </div>

      <div className="max-w-7xl mx-auto mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full p-4 border rounded-xl outline-none"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-slate-600">No products found</p>
      ) : (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white p-5 rounded-3xl border shadow hover:shadow-lg"
            >
              <div className="h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center">
                <img
                  src={
                    p.imageData
                      ? `data:image/jpeg;base64,${p.imageData}`
                      : "/placeholder.png"
                  }
                  alt={p.name}
                  className="h-full object-contain"
                />
              </div>

              <p className="text-xs text-violet-600 uppercase font-semibold">
                {p.category}
              </p>

              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-slate-600">{p.description}</p>

              <p className="mt-2 font-semibold text-emerald-700">₹{p.price}</p>

              <p className="text-xs text-slate-500">Stock: {p.stockQuantity}</p>

              <div className="flex justify-between mt-4 text-xs">
                {/* <button className="px-4 py-1.5 bg-violet-600 text-white rounded-xl">
                  Edit
                </button> */}
                <Link
  to={`/edit-product/${p.id}`}
  className="px-4 py-1.5 bg-violet-600 text-white rounded-xl"
>
  Edit
</Link>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-4 py-1.5 bg-red-500 text-white rounded-xl"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleShare(p)}
                  className="px-4 py-1.5 bg-emerald-500 text-white rounded-xl"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {shareProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm relative">
            <button
              onClick={() => setShareProduct(null)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <p className="font-semibold mb-2">Share product</p>
            <p className="text-xs mb-4">
              {shareProduct.name} - ₹{shareProduct.price}
            </p>

            <button
              onClick={copyLink}
              className="w-full bg-slate-900 text-white py-2 rounded-xl"
            >
              Copy product link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
