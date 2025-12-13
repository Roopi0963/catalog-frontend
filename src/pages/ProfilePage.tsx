import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Temporary mock vendor details
  const [vendorName, setVendorName] = useState("Lakshmi Devi");
  const [shopName, setShopName] = useState("Sri Lakshmi General Store");
  const [phone, setPhone] = useState("9876543210");
  const [location, setLocation] = useState("Andhra Pradesh, India");

  // Profile Picture State
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    alert("Profile updated (backend will be connected later)");
  };

  const handleLogout = () => {
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 text-slate-900 px-6 py-10">

      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="h-9 w-9 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
            IV
          </div>
          <p className="font-semibold text-slate-700">Back to Dashboard</p>
        </Link>
      </header>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto bg-white/90 rounded-3xl border border-slate-200 shadow-xl p-10 backdrop-blur-xl animate-section-fade">

        {/* TITLE */}
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Profile Settings
        </h1>
        <p className="text-slate-600 text-sm mb-8">
          Update your personal and shop details.
        </p>

        {/* PROFILE PICTURE */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div
              className="
                h-28 w-28 rounded-full overflow-hidden 
                shadow-md bg-violet-100 border border-violet-300
                flex items-center justify-center
              "
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl text-violet-600">👤</span>
              )}
            </div>

            {/* Hidden file upload input */}
            <input
              id="profileUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <label
            htmlFor="profileUpload"
            className="mt-3 text-xs text-violet-600 hover:text-violet-500 cursor-pointer underline font-medium"
          >
            Change Picture
          </label>
        </div>

        {/* DETAILS FORM */}
        <div className="space-y-6">

          {/* Vendor Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Vendor Name
            </label>
            <input
              type="text"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-violet-400 outline-none"
            />
          </div>

          {/* Shop Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shop / Business Name
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-violet-400 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-violet-400 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-violet-400 outline-none"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold shadow-md hover:bg-violet-500 transition"
          >
            Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold shadow-md hover:bg-red-400 transition"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
