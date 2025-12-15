// import { useEffect, useState } from "react";
// import type { FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import AudioRecorder from "../components/AudioRecorder";
// import { flaskApi, springApi } from "../api/axiosConfig";

// function AddByVoice() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // DO NOT CHANGE backend attributes
//   const [formData, setFormData] = useState({
//     productName: "",
//     brand: "",
//     price: "",
//     color: "",
//     description: "",
//     tags: "",
//   });

//   const [transcript, setTranscript] = useState("");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // ---------------------------
//   // AI PROCESSING
//   // ---------------------------
//   const handleAudioUpload = async (audioBlob: Blob) => {
//     setLoading(true);
//     const form = new FormData();
//     form.append("audio", audioBlob);

//     try {
//       console.log("Sending audio to AI...");
//       const res = await flaskApi.post("/process-voice", form);
//       console.log("AI RESPONSE:", res.data);

//       const root = res.data.data || res.data;
//       const attributes = root.extracted_attributes || {};
//       const generated = root.generated_content || {};

//       setFormData({
//         productName: attributes.product_name || "",
//         brand: attributes.brand || "",
//         price: attributes.price || "",
//         color:
//           attributes.colors && attributes.colors.length > 0
//             ? attributes.colors[0]
//             : "",
//         description:
//           generated.product_description_en || attributes.description || "",
//         tags: generated.suggested_tags
//           ? generated.suggested_tags.join(", ")
//           : attributes.qualities
//           ? attributes.qualities.join(", ")
//           : "",
//       });

//       toast.success("AI extracted product details!");
//     } catch (err) {
//       console.error("AI ERROR:", err);
//       toast.error("Failed to process audio.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------
//   // SAVE PRODUCT TO SPRING
//   // ---------------------------
//   // const handleSave = async (e: FormEvent) => {
//   //   e.preventDefault();
//   //   try {
//   //     setLoading(true);
//   //     await springApi.post("/catalog/save", formData);
//   //     toast.success("Product saved!");
//   //     navigate("/catalog");
//   //   } catch (err) {
//   //     console.error("SAVE ERROR:", err);
//   //     toast.error("Could not save product.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleSave = async (e: FormEvent) => {
//   //   e.preventDefault();

//   //   try {
//   //     setLoading(true);

//   //     // 1️⃣ Build product object EXACTLY as backend DTO expects
//   //     const productPayload = {
//   //       name: formData.productName,
//   //       brand: formData.brand,
//   //       description: formData.description,
//   //       price: Number(formData.price),
//   //       category: "General", // required by backend
//   //       discount: 0,
//   //       stockQuantity: 1,
//   //       productAvailable: true,
//   //       releaseDate: null,
//   //     };

//   //     // 2️⃣ Wrap inside multipart/form-data
//   //     const multipart = new FormData();
//   //     multipart.append("product", JSON.stringify(productPayload));

//   //     // (optional image later)
//   //     // multipart.append("image", selectedFile);

//   //     // 3️⃣ Call Spring API
//   //     await springApi.post("/catalog/save", multipart, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });

//   //     toast.success("Product saved successfully!");
//   //     navigate("/catalog");
//   //   } catch (err) {
//   //     console.error("SAVE ERROR:", err);
//   //     toast.error("Could not save product.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSave = async (e: FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       // 1️⃣ Build product object EXACTLY as backend DTO expects
//       const productPayload = {
//         name: formData.productName,
//         brand: formData.brand,
//         description: formData.description,
//         price: Number(formData.price),
//         category: "General", // required by backend
//         discount: 0,
//         stockQuantity: 1,
//         productAvailable: true,
//         releaseDate: null,
//       };

//       // 2️⃣ Wrap inside multipart/form-data
//       const multipart = new FormData();
//       multipart.append("product", JSON.stringify(productPayload));

//       // (optional image later)
//       // multipart.append("image", selectedFile);

//       // 3️⃣ Call Spring API
//       await springApi.post("/catalog/save", multipart, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Product saved successfully!");
//       navigate("/catalog");
//     } catch (err) {
//       console.error("SAVE ERROR:", err);
//       toast.error("Could not save product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setTranscript("");
//     setFormData({
//       productName: "",
//       brand: "",
//       price: "",
//       color: "",
//       description: "",
//       tags: "",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 text-slate-900">
//       {/* HEADER */}
//       <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 z-40">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="text-xs text-slate-500 hover:text-slate-800"
//             >
//               ← Back
//             </button>

//             <div className="h-8 w-8 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-[11px] font-bold">
//               IV
//             </div>

//             <p className="font-semibold text-sm">Add Product by Voice</p>
//           </div>

//           <Link
//             to="/catalog"
//             className="px-4 py-1.5 rounded-full border text-xs sm:text-sm border-slate-300 text-slate-700 hover:bg-slate-100"
//           >
//             View Catalog
//           </Link>
//         </div>
//       </header>

//       {/* MAIN CONTAINER */}
//       <main className="max-w-7xl mx-auto px-6 py-10 grid gap-10 lg:grid-cols-[1.15fr,0.85fr]">
//         {/* LEFT SIDE */}
//         <div className="space-y-8">
//           {/* 🔊 SPEAKER + AUDIO RECORDER */}
//           <div className="bg-white/95 rounded-3xl border shadow-md p-6 md:p-7 backdrop-blur">
//             <div className="flex items-center justify-between mb-4">
//               <p className="text-sm font-semibold">Voice Capture</p>
//               <span className="text-[11px] text-slate-500">Step 1 of 2</span>
//             </div>

//             <div className="flex flex-col items-center my-6">
//               {/* SPEAKER EMOJI */}
//               <div
//                 className={`
//                   text-4xl mb-3 transition
//                   ${
//                     loading ? "animate-pulse text-violet-600" : "text-slate-500"
//                   }
//                 `}
//               >
//                 🔊
//               </div>

//               {/* MIC RECORDER */}
//               <div className="relative">
//                 {loading && (
//                   <div className="absolute -inset-3 rounded-full bg-violet-300/40 blur-xl animate-ping"></div>
//                 )}

//                 <div className="relative">
//                   <AudioRecorder
//                     onRecordingComplete={handleAudioUpload}
//                     isProcessing={loading}
//                   />
//                 </div>
//               </div>

//               <p className="text-xs text-slate-500 mt-3">
//                 {loading
//                   ? "Analyzing speech…"
//                   : "Tap the mic & speak naturally"}
//               </p>
//             </div>

//             {/* TRANSCRIPT */}
//             <label className="block text-xs font-semibold mb-1">
//               Transcript (optional)
//             </label>
//             <textarea
//               rows={3}
//               className="w-full border rounded-2xl px-3 py-2 text-sm focus:ring-2 focus:ring-violet-400"
//               value={transcript}
//               onChange={(e) => setTranscript(e.target.value)}
//               placeholder="Your spoken words appear here…"
//             />
//           </div>

//           {/* PRODUCT FORM */}
//           <form
//             onSubmit={handleSave}
//             className="bg-white/95 rounded-3xl border shadow-md p-6 md:p-7 backdrop-blur space-y-5"
//           >
//             <p className="text-sm font-semibold">Product Details</p>

//             {/* PRODUCT NAME */}
//             <div>
//               <label className="text-xs font-semibold">Product Name</label>
//               <input
//                 type="text"
//                 value={formData.productName}
//                 onChange={(e) =>
//                   setFormData({ ...formData, productName: e.target.value })
//                 }
//                 className="w-full border rounded-xl px-3 py-2.5 text-sm"
//                 placeholder="Example: Fresh Rice"
//               />
//             </div>

//             {/* BRAND + COLOR */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs font-semibold">Brand</label>
//                 <input
//                   type="text"
//                   value={formData.brand}
//                   onChange={(e) =>
//                     setFormData({ ...formData, brand: e.target.value })
//                   }
//                   className="w-full border rounded-xl px-3 py-2.5 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="text-xs font-semibold">Color</label>
//                 <input
//                   type="text"
//                   value={formData.color}
//                   onChange={(e) =>
//                     setFormData({ ...formData, color: e.target.value })
//                   }
//                   className="w-full border rounded-xl px-3 py-2.5 text-sm"
//                 />
//               </div>
//             </div>

//             {/* PRICE */}
//             <div>
//               <label className="text-xs font-semibold">Price (₹)</label>
//               <input
//                 type="number"
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData({ ...formData, price: e.target.value })
//                 }
//                 className="w-full border rounded-xl px-3 py-2.5 text-sm"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div>
//               <label className="text-xs font-semibold">Description</label>
//               <textarea
//                 rows={3}
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 className="w-full border rounded-xl px-3 py-2.5 text-sm"
//               />
//             </div>

//             {/* TAGS */}
//             <div>
//               <label className="text-xs font-semibold">Tags</label>
//               <input
//                 type="text"
//                 value={formData.tags}
//                 onChange={(e) =>
//                   setFormData({ ...formData, tags: e.target.value })
//                 }
//                 className="w-full border rounded-xl px-3 py-2.5 text-sm"
//                 placeholder="rice, grocery"
//               />
//             </div>

//             {/* BUTTONS */}
//             <div className="flex gap-3 pt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-5 py-2.5 bg-violet-600 text-white rounded-full text-sm hover:bg-violet-500"
//               >
//                 {loading ? "Saving…" : "Save Product"}
//               </button>

//               <button
//                 type="button"
//                 onClick={handleClear}
//                 className="px-4 py-2.5 border rounded-full text-sm hover:bg-slate-100"
//               >
//                 Clear
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* RIGHT SIDE – PREVIEW */}
//         <aside>
//           <div className="bg-white/95 rounded-3xl border shadow-md p-6 space-y-4">
//             <p className="text-sm font-semibold">Live Preview</p>

//             <div className="border rounded-2xl bg-slate-50 p-4 space-y-2">
//               <p className="text-xs text-slate-500 uppercase">
//                 {formData.brand || "Brand"}
//               </p>

//               <p className="text-base font-semibold">
//                 {formData.productName || "Product Name"}
//               </p>

//               <p className="text-xs text-slate-600">
//                 {formData.description || "Description will appear here…"}
//               </p>

//               <p className="text-sm font-semibold text-emerald-700">
//                 {formData.price ? `₹${formData.price}` : "Price"}
//               </p>

//               {formData.tags && (
//                 <div className="flex flex-wrap gap-1">
//                   {formData.tags.split(",").map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-2 py-0.5 border rounded-full bg-white text-xs"
//                     >
//                       {tag.trim()}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </aside>
//       </main>
//     </div>
//   );
// }

// export default AddByVoice;

// import { useEffect, useState } from "react";
// import type { FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import AudioRecorder from "../components/AudioRecorder";
// import { flaskApi, springApi } from "../api/axiosConfig";

// function AddByVoice() {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);

//   // Backend-aligned fields
//   const [formData, setFormData] = useState({
//     productName: "",
//     brand: "",
//     price: "",
//     color: "",
//     description: "",
//     tags: "",
//   });

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   /* ===================== AI VOICE PROCESSING ===================== */
//   const handleAudioUpload = async (audioBlob: Blob) => {
//     setLoading(true);
//     const form = new FormData();
//     form.append("audio", audioBlob);

//     try {
//       const res = await flaskApi.post("/process-voice", form);

//       const root = res.data.data || res.data;
//       const attributes = root.extracted_attributes || {};
//       const generated = root.generated_content || {};

//       setFormData({
//         productName: attributes.product_name || "",
//         brand: attributes.brand || "",
//         price: attributes.price || "",
//         color:
//           attributes.colors && attributes.colors.length > 0
//             ? attributes.colors[0]
//             : "",
//         description:
//           generated.product_description_en || attributes.description || "",
//         tags: generated.suggested_tags
//           ? generated.suggested_tags.join(", ")
//           : attributes.qualities
//           ? attributes.qualities.join(", ")
//           : "",
//       });

//       toast.success("AI extracted product details");
//     } catch (err) {
//       console.error(err);
//       toast.error("Voice processing failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===================== SAVE PRODUCT ===================== */
//   // const handleSave = async (e: FormEvent) => {
//   //   e.preventDefault();

//   //   try {
//   //     setLoading(true);

//   //     // Backend DTO structure
//   //     const productPayload = {
//   //       name: formData.productName,
//   //       brand: formData.brand,
//   //       description: formData.description,
//   //       price: Number(formData.price),
//   //       category: "General",
//   //       discount: 0,
//   //       stockQuantity: 1,
//   //       productAvailable: true,
//   //       releaseDate: null,
//   //     };

//   //     const multipart = new FormData();
//   //     multipart.append("product", JSON.stringify(productPayload));

//   //     // ✅ Image support
//   //     if (selectedImage) {
//   //       multipart.append("image", selectedImage);
//   //     }

//   //     await springApi.post("/catalog/save", multipart, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });

//   //     toast.success("Product saved successfully");
//   //     navigate("/catalog");
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.error("Failed to save product");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleSave = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const productPayload = {
//         name: formData.productName,
//         brand: formData.brand,
//         description: formData.description,
//         price: Number(formData.price),
//         category: "General",
//         discount: 0,
//         stockQuantity: 1,
//         productAvailable: true,
//         releaseDate: null,
//       };

//       const multipart = new FormData();

//       // ✅ SEND JSON AS application/json
//       multipart.append(
//         "product",
//         new Blob([JSON.stringify(productPayload)], {
//           type: "application/json",
//         })
//       );

//       if (selectedImage) {
//         multipart.append("image", selectedImage);
//       }

//       await springApi.post("/catalog/save", multipart);

//       toast.success("Product saved successfully");
//       navigate("/catalog");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setTranscript("");
//     setSelectedImage(null);
//     setFormData({
//       productName: "",
//       brand: "",
//       price: "",
//       color: "",
//       description: "",
//       tags: "",
//     });
//   };

//   /* ===================== UI ===================== */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50">
//       {/* HEADER */}
//       <header className="sticky top-0 bg-white/80 backdrop-blur border-b z-40">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="text-xs text-slate-500 hover:text-slate-800"
//           >
//             ← Back
//           </button>

//           <Link
//             to="/catalog"
//             className="px-4 py-1.5 rounded-full border text-xs hover:bg-slate-100"
//           >
//             View Catalog
//           </Link>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-10 grid gap-10 lg:grid-cols-[1.15fr,0.85fr]">
//         {/* LEFT */}
//         <div className="space-y-8">
//           {/* VOICE */}
//           <div className="bg-white rounded-3xl border shadow p-6">
//             <p className="text-sm font-semibold mb-4">Voice Capture</p>

//             <div className="flex flex-col items-center">
//               <div
//                 className={`text-4xl mb-3 ${
//                   loading ? "animate-pulse text-violet-600" : "text-slate-400"
//                 }`}
//               >
//                 🔊
//               </div>

//               <AudioRecorder
//                 onRecordingComplete={handleAudioUpload}
//                 isProcessing={loading}
//               />

//               <p className="text-xs text-slate-500 mt-3">
//                 {loading ? "Analyzing…" : "Tap mic & speak"}
//               </p>
//             </div>

//             <textarea
//               rows={3}
//               value={transcript}
//               onChange={(e) => setTranscript(e.target.value)}
//               className="w-full border rounded-xl mt-4 px-3 py-2 text-sm"
//               placeholder="Transcript (optional)"
//             />
//           </div>

//           {/* FORM */}
//           <form
//             onSubmit={handleSave}
//             className="bg-white rounded-3xl border shadow p-6 space-y-5"
//           >
//             <p className="text-sm font-semibold">Product Details</p>

//             <input
//               value={formData.productName}
//               onChange={(e) =>
//                 setFormData({ ...formData, productName: e.target.value })
//               }
//               className="w-full border rounded-xl px-3 py-2.5 text-sm"
//               placeholder="Product Name"
//             />

//             <input
//               value={formData.brand}
//               onChange={(e) =>
//                 setFormData({ ...formData, brand: e.target.value })
//               }
//               className="w-full border rounded-xl px-3 py-2.5 text-sm"
//               placeholder="Brand"
//             />

//             <input
//               type="number"
//               value={formData.price}
//               onChange={(e) =>
//                 setFormData({ ...formData, price: e.target.value })
//               }
//               className="w-full border rounded-xl px-3 py-2.5 text-sm"
//               placeholder="Price"
//             />

//             <textarea
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               className="w-full border rounded-xl px-3 py-2.5 text-sm"
//               placeholder="Description"
//             />

//             {/* IMAGE */}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 if (e.target.files && e.target.files.length > 0) {
//                   setSelectedImage(e.target.files[0]);
//                 }
//               }}
//               className="w-full border rounded-xl px-3 py-2.5 text-sm"
//             />

//             {/* BUTTONS */}
//             <div className="flex gap-3">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-5 py-2.5 bg-violet-600 text-white rounded-full text-sm"
//               >
//                 {loading ? "Saving…" : "Save Product"}
//               </button>

//               <button
//                 type="button"
//                 onClick={handleClear}
//                 className="px-4 py-2.5 border rounded-full text-sm"
//               >
//                 Clear
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* RIGHT PREVIEW */}
//         <aside>
//           <div className="bg-white rounded-3xl border shadow p-6 space-y-3">
//             <p className="text-sm font-semibold">Live Preview</p>

//             <p className="text-xs uppercase text-slate-500">
//               {formData.brand || "Brand"}
//             </p>

//             <p className="text-lg font-semibold">
//               {formData.productName || "Product Name"}
//             </p>

//             <p className="text-sm text-slate-600">
//               {formData.description || "Description"}
//             </p>

//             <p className="font-semibold text-emerald-700">
//               {formData.price ? `₹${formData.price}` : "Price"}
//             </p>
//           </div>
//         </aside>
//       </main>
//     </div>
//   );
// }

// export default AddByVoice;

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AudioRecorder from "../components/AudioRecorder";
import { flaskApi, springApi } from "../api/axiosConfig";

function AddByVoice() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // ✅ Backend-aligned state
  const [formData, setFormData] = useState({
    productName: "",
    brand: "Generic",
    price: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ===================== AI VOICE PROCESSING ===================== */
  const handleAudioUpload = async (audioBlob: Blob) => {
    setLoading(true);

    const form = new FormData();
    form.append("audio", audioBlob);

    try {
      const res = await flaskApi.post("/process-voice", form);

      const data = res.data;

      const attributes = data.extracted_attributes || {};
      const generated = data.generated_content || {};

      setFormData({
        productName: attributes.product_name || "",
        brand: attributes.brand || "Generic", // ✅ Flask does NOT return brand
        price: attributes.price ? String(attributes.price) : "",
        description: generated.product_description_en || "",
        tags: attributes.materials ? attributes.materials.join(", ") : "",
      });

      toast.success("AI extracted product details");
    } catch (err) {
      console.error(err);
      toast.error("Voice processing failed");
    } finally {
      setLoading(false);
    }
  };

  /* ===================== SAVE PRODUCT ===================== */
  // const handleSave = async (e: FormEvent) => {
  //   e.preventDefault();

  //   if (!formData.productName || !formData.price) {
  //     toast.error("Product name and price are required");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const productPayload = {
  //       name: formData.productName.trim(),
  //       brand: formData.brand || "Generic",
  //       description: formData.description,
  //       price: Number(formData.price),
  //       category: "General",
  //       discount: 0,
  //       stockQuantity: 1,
  //       productAvailable: true,
  //       releaseDate: null,
  //     };

  //     const multipart = new FormData();

  //     // ✅ IMPORTANT: send JSON as STRING (Spring-compatible)
  //     multipart.append("product", JSON.stringify(productPayload));

  //     if (selectedImage) {
  //       multipart.append("image", selectedImage);
  //     }

  //     await springApi.post("/catalog/save", multipart);

  //     toast.success("Product saved successfully");
  //     navigate("/catalog");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to save product");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.productName || !formData.price) {
      toast.error("Product name and price are required");
      return;
    }

    setLoading(true);

    try {
      const productPayload = {
        name: formData.productName.trim(),
        brand: formData.brand || "Generic",
        description: formData.description,
        price: Number(formData.price),
        category: "General",
        discount: 0,
        stockQuantity: 1,
        productAvailable: true,
        releaseDate: null,
      };

      const multipart = new FormData();

      // ✅ THIS IS THE KEY FIX
      multipart.append("product", JSON.stringify(productPayload));

      if (selectedImage) {
        multipart.append("image", selectedImage);
      }

      await springApi.post("/catalog/save", multipart);

      toast.success("Product saved successfully");
      navigate("/catalog");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setFormData({
      productName: "",
      brand: "Generic",
      price: "",
      description: "",
      tags: "",
    });
  };

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50">
      {/* HEADER */}
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            ← Back
          </button>

          <Link
            to="/catalog"
            className="px-4 py-1.5 rounded-full border text-xs hover:bg-slate-100"
          >
            View Catalog
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid gap-10 lg:grid-cols-[1.15fr,0.85fr]">
        {/* LEFT */}
        <div className="space-y-8">
          {/* VOICE */}
          <div className="bg-white rounded-3xl border shadow p-6">
            <p className="text-sm font-semibold mb-4">Voice Capture</p>

            <div className="flex flex-col items-center">
              <div
                className={`text-4xl mb-3 ${
                  loading ? "animate-pulse text-violet-600" : "text-slate-400"
                }`}
              >
                🔊
              </div>

              <AudioRecorder
                onRecordingComplete={handleAudioUpload}
                isProcessing={loading}
              />

              <p className="text-xs text-slate-500 mt-3">
                {loading ? "Analyzing…" : "Tap mic & speak"}
              </p>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSave}
            className="bg-white rounded-3xl border shadow p-6 space-y-5"
          >
            <p className="text-sm font-semibold">Product Details</p>

            <input
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
              className="w-full border rounded-xl px-3 py-2.5 text-sm"
              placeholder="Product Name"
            />

            <input
              value={formData.brand}
              disabled
              className="w-full border rounded-xl px-3 py-2.5 text-sm bg-slate-100"
              placeholder="Brand"
            />

            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full border rounded-xl px-3 py-2.5 text-sm"
              placeholder="Price"
            />

            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border rounded-xl px-3 py-2.5 text-sm"
              placeholder="Description"
            />

            {/* IMAGE */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedImage(e.target.files[0]);
                }
              }}
              className="w-full border rounded-xl px-3 py-2.5 text-sm"
            />

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-violet-600 text-white rounded-full text-sm"
              >
                {loading ? "Saving…" : "Save Product"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2.5 border rounded-full text-sm"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT PREVIEW */}
        <aside>
          <div className="bg-white rounded-3xl border shadow p-6 space-y-3">
            <p className="text-sm font-semibold">Live Preview</p>

            <p className="text-xs uppercase text-slate-500">{formData.brand}</p>

            <p className="text-lg font-semibold">
              {formData.productName || "Product Name"}
            </p>

            <p className="text-sm text-slate-600">
              {formData.description || "Description"}
            </p>

            <p className="font-semibold text-emerald-700">
              {formData.price ? `₹${formData.price}` : "Price"}
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default AddByVoice;
