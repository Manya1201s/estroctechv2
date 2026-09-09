import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {/* The host rewrites unknown paths to index.html, so without this catch-all a
          stray URL would mount the router with nothing to render — a blank page. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
