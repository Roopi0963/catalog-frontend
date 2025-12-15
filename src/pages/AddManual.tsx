// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function AddManual() {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // TODO: connect backend API → Add product manually
//     setTimeout(() => {
//       setLoading(false);
//       alert("Product added manually! (API will connect later)");

//       navigate("/catalog"); // redirect later when catalog page is created
//     }, 800);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 text-slate-900 px-4 py-10">

//       {/* Background Soft Glows */}
//       <div className="fixed inset-0 pointer-events-none opacity-60">
//         <div className="absolute top-10 left-10 h-48 w-48 bg-violet-200/40 blur-3xl rounded-full"></div>
//         <div className="absolute bottom-10 right-10 h-64 w-64 bg-sky-200/40 blur-3xl rounded-full"></div>
//       </div>

//       {/* CONTAINER */}
//       <div className="relative max-w-4xl mx-auto">

//         {/* Page Header */}
//         <div className="mb-10 flex items-center justify-between">
//           <h1 className="text-3xl font-semibold tracking-tight">
//             Add Product <span className="text-violet-700">Manually ✏️</span>
//           </h1>

//           <Link
//             to="/dashboard"
//             className="px-4 py-2 rounded-xl text-sm bg-white border border-slate-300 hover:bg-slate-100 shadow-sm transition"
//           >
//             ← Back to Dashboard
//           </Link>
//         </div>

//         {/* FORM CARD */}
//         <div className="
//           bg-white/90 border border-slate-200
//           rounded-3xl p-8 shadow-xl backdrop-blur-md
//           fade-in
//         ">
//           <h2 className="text-lg font-semibold mb-6 text-slate-700">
//             Product Details
//           </h2>

//           <form className="space-y-6" onSubmit={handleSubmit}>

//             {/* PRODUCT TITLE */}
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-600">
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:ring-2 focus:ring-violet-400"
//                 placeholder="e.g. Groundnut Oil 1L"
//                 required
//               />
//             </div>

//             {/* PRICE + QUANTITY */}
//             <div className="grid sm:grid-cols-2 gap-5">
//               <div className="space-y-2">
//                 <label className="text-xs font-semibold text-slate-600">
//                   Price (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:ring-2 focus:ring-violet-400"
//                   placeholder="e.g. 180"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-semibold text-slate-600">
//                   Quantity / Unit
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:ring-2 focus:ring-violet-400"
//                   placeholder="e.g. 1L Bottle"
//                   required
//                 />
//               </div>
//             </div>

//             {/* CATEGORY */}
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-600">
//                 Category
//               </label>
//               <select
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:ring-2 focus:ring-violet-400"
//                 required
//               >
//                 <option value="">Select a category</option>
//                 <option>Grocery</option>
//                 <option>Household</option>
//                 <option>Personal Care</option>
//                 <option>Snacks & Beverages</option>
//                 <option>Stationery</option>
//                 <option>Hardware</option>
//                 <option>Others</option>
//               </select>
//             </div>

//             {/* DESCRIPTION */}
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-600">
//                 Description
//               </label>
//               <textarea
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:ring-2 focus:ring-violet-400"
//                 placeholder="Short product description"
//                 rows={3}
//                 required
//               ></textarea>
//             </div>

//             {/* IMAGE UPLOAD */}
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-600">
//                 Product Image (optional)
//               </label>

//               <input
//                 type="file"
//                 accept="image/*"
//                 className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-violet-600 file:text-white hover:file:bg-violet-500"
//               />
//             </div>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="
//                 w-full py-3 rounded-xl text-sm font-semibold
//                 bg-violet-600 text-white
//                 hover:bg-violet-500 transition shadow-md
//                 disabled:opacity-60
//               "
//             >
//               {loading ? "Adding Product..." : "Add Product"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddManual;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { springApi } from "../api/axiosConfig";
import { toast } from "react-hot-toast";

function AddManual() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. Initialize ALL fields to empty strings "" (Never undefined or null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stockQuantity: "",
    category: "",
    description: "",
    brand: "",
    discount: 0,
    releaseDate: new Date().toISOString(),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      const productJson = JSON.stringify({
        name: formData.name,
        price: parseFloat(formData.price) || 0,
        stockQuantity: parseInt(formData.stockQuantity) || 0,
        category: formData.category || "General",
        description: formData.description,
        brand: formData.brand || "Generic",
        discount: 0,
        productAvailable: true,
        releaseDate: new Date().toISOString(),
      });

      data.append("product", productJson);

      if (imageFile) {
        data.append("image", imageFile);
      }

      await springApi.post("/catalog/save", data);

      toast.success("Product added successfully!");
      navigate("/catalog");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <h1 className="text-2xl font-bold mb-6">Add Product Manually</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* PRODUCT NAME */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Product Name
            </label>
            <input
              name="name"
              value={formData.name} // 2. Controlled Input
              onChange={handleChange}
              placeholder="e.g. Basmati Rice"
              className="w-full border p-2 rounded-lg"
              autoComplete="off" // 3. Fix Autocomplete warning
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* PRICE */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Price (₹)
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border p-2 rounded-lg"
                autoComplete="off"
                required
              />
            </div>

            {/* QUANTITY */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Stock Quantity
              </label>
              <input
                name="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="0"
                className="w-full border p-2 rounded-lg"
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* BRAND */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Brand (Optional)
            </label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g. India Gate"
              className="w-full border p-2 rounded-lg"
              autoComplete="off"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg bg-white"
              autoComplete="off"
            >
              <option value="">Select Category</option>
              <option value="Grocery">Grocery</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border p-2 rounded-lg"
              placeholder="Product details..."
              autoComplete="off"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-2.5 border rounded-xl text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddManual;
