// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { springApi } from "../api/axiosConfig";

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState<File | null>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     brand: "",
//     description: "",
//     price: "",
//   });

//   /* ================= FETCH PRODUCT ================= */
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await springApi.get(`/catalog/${id}`);
//         const product = res.data;

//         setFormData({
//           name: product.name,
//           brand: product.brand,
//           description: product.description,
//           price: String(product.price),
//         });
//       } catch (error) {
//         toast.error("Failed to load product");
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   /* ================= UPDATE PRODUCT ================= */
//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = {
//         name: formData.name,
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
//       multipart.append("product", JSON.stringify(payload));

//       if (image) {
//         multipart.append("image", image);
//       }

//       await springApi.put(`/catalog/update/${id}`, multipart);

//       toast.success("Product updated successfully");
//       navigate("/catalog");
//     } catch (error) {
//       console.error(error);
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
//       <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

//       <form onSubmit={handleUpdate} className="space-y-4">
//         <input
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className="w-full border rounded-xl px-3 py-2"
//           placeholder="Product Name"
//         />

//         <input
//           value={formData.brand}
//           onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
//           className="w-full border rounded-xl px-3 py-2"
//           placeholder="Brand"
//         />

//         <input
//           type="number"
//           value={formData.price}
//           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//           className="w-full border rounded-xl px-3 py-2"
//           placeholder="Price"
//         />

//         <textarea
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//           className="w-full border rounded-xl px-3 py-2"
//           placeholder="Description"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => e.target.files && setImage(e.target.files[0])}
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-violet-600 text-white py-2 rounded-xl"
//         >
//           {loading ? "Updating..." : "Update Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { springApi } from "../api/axiosConfig";

function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
  });

  /* ================= FETCH EXISTING PRODUCT ================= */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await springApi.get(`/catalog/${id}`);
        const product = res.data;

        // ✅ PREFILL FORM (THIS IS THE KEY)
        setFormData({
          name: product.name ?? "",
          brand: product.brand ?? "",
          description: product.description ?? "",
          price: String(product.price ?? ""),
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product details");
        navigate("/catalog");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  /* ================= UPDATE PRODUCT ================= */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      toast.error("Name and price are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        brand: formData.brand,
        description: formData.description,
        price: Number(formData.price),
        category: "General",
        discount: 0,
        stockQuantity: 1,
        productAvailable: true,
        releaseDate: null,
      };

      const multipart = new FormData();
      multipart.append("product", JSON.stringify(payload));

      if (image) {
        multipart.append("image", image);
      }

      await springApi.put(`/catalog/update/${id}`, multipart);

      toast.success("Product updated successfully");
      navigate("/catalog");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Product Name"
        />

        <input
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Brand"
        />

        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Price"
        />

        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Description"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
        />

        <button
          disabled={loading}
          className="w-full bg-violet-600 text-white py-2 rounded-xl"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
