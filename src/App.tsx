import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { TranslationProvider } from "@/contexts/TranslationContext";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Simulator from "./pages/Simulator";
import Request from "./pages/Request";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import GDPR from "./pages/GDPR";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function MultilangRoutes() {
  const { lang } = useParams();

  return (
    <TranslationProvider language={lang}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="services" element={<Services />} />
            <Route path="simulateur" element={<Simulator />} />
            <Route path="demande" element={<Request />} />
            <Route path="contact" element={<Contact />} />
            <Route path="mentions-legales" element={<Legal />} />
            <Route path="politique-confidentialite" element={<Privacy />} />
            <Route path="conditions-generales" element={<Terms />} />
            <Route path="protection-donnees" element={<GDPR />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </TranslationProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rediriger la racine vers la langue par défaut */}
        <Route path="/" element={<Navigate to="/fr" />} />
        
        {/* Routes multilingues */}
        <Route path="/:lang/*" element={<MultilangRoutes />} />
        
        {/* Page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;