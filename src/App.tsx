import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import AddByVoice from "./pages/AddByVoice"; // ✅ NEW PAGE IMPORT
import AddManual from "./pages/AddManual";
import Catalog from "./pages/Catalog";
import SettingsPage from "./pages/SettingsPage";
import ShareCatalog from "./pages/ShareCatalog";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/:mode" element={<AuthPage />} />
        {/* VENDOR ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* ADD PRODUCT BY VOICE */}
        <Route path="/add-voice" element={<AddByVoice />} />{" "}
        {/* ✅ NEW ROUTE */}
        <Route path="/add-manual" element={<AddManual />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/share-catalog" element={<ShareCatalog />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* OPTIONAL — 404 PAGE */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
