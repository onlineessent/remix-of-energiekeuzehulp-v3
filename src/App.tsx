
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage"; // Changed from import { IntroPage }
import Index from "./pages/Index"; // Changed from import { Index }
import { AdminRoute } from "./components/admin/AdminRoute";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/keuzehulp" element={<Index />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
