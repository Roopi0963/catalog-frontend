// import { useState, useEffect } from "react";
// import type { FormEvent, ChangeEvent } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";

// type Mode = "login" | "signup";

// const REGISTER_URL =
//   "https://catlog-agent-backend.onrender.com/api/auth/register";

// function AuthPage() {
//   const params = useParams<{ mode: Mode }>();
//   const navigate = useNavigate();
//   const initialMode: Mode = params.mode === "signup" ? "signup" : "login";

//   const [mode, setMode] = useState<Mode>(initialMode);
//   const [loading, setLoading] = useState(false);

//   // signup form state
//   const [signupForm, setSignupForm] = useState({
//     vendorName: "",
//     shopName: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Keep URL and mode synced
//   useEffect(() => {
//     if (params.mode === "signup" || params.mode === "login") {
//       setMode(params.mode);
//     }
//   }, [params.mode]);

//   // ⭐ DIRECT LOGIN → DASHBOARD (still dummy, no backend yet)
//   const handleLogin = (e: FormEvent) => {
//     e.preventDefault();
//     navigate("/dashboard"); // go to dashboard immediately
//   };

//   // handle signup input changes
//   const handleSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSignupForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ⭐ SIGNUP → CALL BACKEND REGISTER API
//   const handleSignup = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!signupForm.vendorName || !signupForm.email || !signupForm.password) {
//       alert("Please fill vendor name, email, and password.");
//       return;
//     }

//     if (signupForm.password !== signupForm.confirmPassword) {
//       alert("Password and Confirm Password do not match.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(REGISTER_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: signupForm.email,
//           password: signupForm.password,
//           name: signupForm.vendorName,
//           // In future, if backend supports:
//           // shopName: signupForm.shopName,
//           // phone: signupForm.phone,
//         }),
//       });

//       if (!response.ok) {
//         let message = "Signup failed. Please try again.";
//         try {
//           const data = await response.json();
//           if (data?.message) {
//             message = data.message;
//           }
//         } catch {
//           // ignore parse errors
//         }
//         alert(message);
//         setLoading(false);
//         return;
//       }

//       // const data = await response.json(); // use this later if needed

//       alert("Signup successful! Please login with your email & password.");
//       setLoading(false);
//       navigate("/auth/login");
//     } catch (error) {
//       console.error(error);
//       alert("Network error. Please check your internet and try again.");
//       setLoading(false);
//     }
//   };

//   const switchMode = (newMode: Mode) => {
//     navigate(`/auth/${newMode}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 text-slate-900 flex items-center justify-center px-4 py-10">
//       {/* Soft background blobs */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute -top-16 -left-10 h-52 w-52 rounded-full bg-violet-200/50 blur-3xl" />
//         <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
//       </div>

//       {/* Main container */}
//       <div className="relative w-full max-w-6xl grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
//         {/* LEFT SIDE CONTENT */}
//         <section className="hidden lg:flex flex-col gap-8">
//           <Link to="/" className="inline-flex items-center gap-2">
//             <div className="h-9 w-9 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
//               IV
//             </div>
//             <div className="leading-tight">
//               <p className="text-sm font-semibold tracking-tight">
//                 Voice Catalog Agent
//               </p>
//               <p className="text-[11px] text-slate-500">
//                 For rural &amp; small-scale vendors
//               </p>
//             </div>
//           </Link>

//           <div>
//             <p className="text-[11px] font-semibold tracking-[0.25em] text-violet-600 uppercase mb-3">
//               vendor portal
//             </p>
//             <h1 className="text-3xl xl:text-4xl font-semibold leading-snug tracking-tight">
//               {mode === "login"
//                 ? "Welcome back to your voice catalog."
//                 : "Create your vendor account in a few steps."}
//             </h1>
//             <p className="mt-4 text-sm text-slate-600 max-w-lg leading-relaxed">
//               Use this portal to create and manage your voice-generated product
//               catalogs. One account can support a full shop, from grocery items
//               to hardware supplies.
//             </p>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2 text-xs text-slate-600">
//             <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
//               <p className="font-semibold text-slate-900 mb-1">
//                 Built for low digital skills
//               </p>
//               <p className="leading-relaxed">
//                 Vendors only need to speak product details. The system handles
//                 text, structure, and suggestions behind the scenes.
//               </p>
//             </div>
//             <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
//               <p className="font-semibold text-slate-900 mb-1">
//                 Simple onboarding
//               </p>
//               <p className="leading-relaxed">
//                 Register with basic shop details and a phone number—no complex
//                 documents or long forms required.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* RIGHT SIDE – LOGIN / SIGNUP FORM */}
//         <section className="w-full">
//           <div className="bg-white/95 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
//             {/* Mobile logo */}
//             <div className="flex items-center justify-between mb-4 lg:hidden">
//               <Link to="/" className="inline-flex items-center gap-2">
//                 <div className="h-8 w-8 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
//                   IV
//                 </div>
//                 <span className="text-xs font-semibold">
//                   Voice Catalog Agent
//                 </span>
//               </Link>
//             </div>

//             {/* Toggle buttons */}
//             <div className="flex mb-6 bg-slate-100 rounded-2xl p-1 text-sm">
//               <button
//                 type="button"
//                 onClick={() => switchMode("login")}
//                 className={`flex-1 py-2 rounded-xl font-medium transition ${
//                   mode === "login"
//                     ? "bg-white text-slate-900 shadow-sm"
//                     : "text-slate-500"
//                 }`}
//               >
//                 Login
//               </button>
//               <button
//                 type="button"
//                 onClick={() => switchMode("signup")}
//                 className={`flex-1 py-2 rounded-xl font-medium transition ${
//                   mode === "signup"
//                     ? "bg-white text-slate-900 shadow-sm"
//                     : "text-slate-500"
//                 }`}
//               >
//                 Sign up
//               </button>
//             </div>

//             {/* LOGIN FORM */}
//             {mode === "login" ? (
//               <form onSubmit={handleLogin} className="space-y-5">
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1">
//                     Vendor ID / Phone Number
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
//                     placeholder="Enter your registered vendor ID or phone"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
//                     placeholder="Enter your password"
//                     required
//                   />
//                 </div>

//                 <div className="flex items-center justify-between text-[11px] text-slate-500">
//                   <label className="inline-flex items-center gap-1.5">
//                     <input
//                       type="checkbox"
//                       className="rounded border-slate-300 text-violet-600"
//                     />
//                     <span>Remember me</span>
//                   </label>
//                   <button
//                     type="button"
//                     className="text-violet-600 hover:text-violet-500 font-medium"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full mt-1 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition"
//                 >
//                   Login as vendor
//                 </button>

//                 <p className="text-[11px] text-slate-500 text-center mt-3">
//                   New to the platform?{" "}
//                   <button
//                     type="button"
//                     onClick={() => switchMode("signup")}
//                     className="text-violet-600 hover:text-violet-500 font-semibold"
//                   >
//                     Create a vendor account
//                   </button>
//                 </p>
//               </form>
//             ) : (
//               /* SIGNUP FORM */
//               <form onSubmit={handleSignup} className="space-y-4">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 mb-1">
//                       Vendor name
//                     </label>
//                     <input
//                       type="text"
//                       name="vendorName"
//                       value={signupForm.vendorName}
//                       onChange={handleSignupChange}
//                       className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
//                       placeholder="Your full name"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 mb-1">
//                       Shop / business name
//                     </label>
//                     <input
//                       type="text"
//                       name="shopName"
//                       value={signupForm.shopName}
//                       onChange={handleSignupChange}
//                       className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
//                       placeholder="e.g. Sri Lakshmi General Store"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1">
//                     Phone number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={signupForm.phone}
//                     onChange={handleSignupChange}
//                     className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
//                     placeholder="Vendor contact number"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={signupForm.email}
//                     onChange={handleSignupChange}
//                     className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
//                     placeholder="Vendor email address"
//                     required
//                   />
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 mb-1">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={signupForm.password}
//                       onChange={handleSignupChange}
//                       className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
//                       placeholder="Create a strong password"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 mb-1">
//                       Confirm password
//                     </label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       value={signupForm.confirmPassword}
//                       onChange={handleSignupChange}
//                       className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
//                       placeholder="Re-enter password"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full mt-1 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 disabled:opacity-60 transition"
//                 >
//                   {loading ? "Creating account..." : "Sign up as vendor"}
//                 </button>

//                 <p className="text-[11px] text-slate-500 text-center mt-3 leading-relaxed">
//                   By creating an account, you agree to use this platform
//                   responsibly to manage genuine vendor catalogs.
//                 </p>
//               </form>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default AuthPage;

import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// IMPORTANT: Always use .env value
const API_BASE = import.meta.env.VITE_SPRING_API_URL;

type Mode = "login" | "signup";

function AuthPage() {
  const params = useParams<{ mode: Mode }>();
  const navigate = useNavigate();

  const initialMode: Mode = params.mode === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<Mode>(initialMode);

  const [loading, setLoading] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form
  const [signupForm, setSignupForm] = useState({
    vendorName: "",
    shopName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Keep URL and mode synced
  useEffect(() => {
    if (params.mode === "signup" || params.mode === "login") {
      setMode(params.mode);
    }
  }, [params.mode]);

  // ------------------------------------
  // LOGIN HANDLER (Spring Boot)
  // ------------------------------------
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (!res.ok) {
        alert("Invalid login credentials.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Save token + vendor name for Dashboard
      localStorage.setItem("token", data.token);
      localStorage.setItem("vendorName", data.name);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // SIGNUP HANDLER (Spring Boot)
  // ------------------------------------
  const handleSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupForm.vendorName,
          email: signupForm.email,
          password: signupForm.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        alert(errorData?.message || "Signup failed. Try again.");
        setLoading(false);
        return;
      }

      alert("Signup success! Please login now.");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: Mode) => {
    navigate(`/auth/${newMode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 text-slate-900 flex items-center justify-center px-4 py-10">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-10 h-52 w-52 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        {/* LEFT SECTION */}
        <section className="hidden lg:flex flex-col gap-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
              IV
            </div>
            <div>
              <p className="text-sm font-semibold">Voice Catalog Agent</p>
              <p className="text-[11px] text-slate-500">
                For rural & small-scale vendors
              </p>
            </div>
          </Link>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-violet-600 uppercase mb-3">
              vendor portal
            </p>
            <h1 className="text-3xl font-semibold leading-snug">
              {mode === "login"
                ? "Welcome back to your voice catalog."
                : "Create your vendor account in a few steps."}
            </h1>
            <p className="mt-4 text-sm text-slate-600 max-w-lg leading-relaxed">
              Speak to create product catalogs. Manage your shop digitally with
              no typing required.
            </p>
          </div>
        </section>

        {/* RIGHT SECTION */}
        <section className="w-full">
          <div className="bg-white/95 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            {/* Toggle buttons */}
            <div className="flex mb-6 bg-slate-100 rounded-2xl p-1 text-sm">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex-1 py-2 rounded-xl font-medium ${
                  mode === "login"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`flex-1 py-2 rounded-xl font-medium ${
                  mode === "signup"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* LOGIN FORM */}
            {mode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 disabled:opacity-60"
                >
                  {loading ? "Logging in..." : "Login as vendor"}
                </button>
              </form>
            ) : (
              // SIGNUP FORM
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Vendor name
                    </label>
                    <input
                      type="text"
                      name="vendorName"
                      value={signupForm.vendorName}
                      onChange={handleSignupChange}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Shop / business name
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      value={signupForm.shopName}
                      onChange={handleSignupChange}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                      placeholder="Sri Lakshmi General Store"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={signupForm.phone}
                    onChange={handleSignupChange}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                    placeholder="Contact number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                    placeholder="Vendor email"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                      placeholder="Create password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={signupForm.confirmPassword}
                      onChange={handleSignupChange}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Sign up as vendor"}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthPage;
