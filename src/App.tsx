import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { TranslationProvider, useTranslation } from "@/contexts/TranslationContext";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Simulator from "./pages/Simulator";
import Request from "./pages/Request";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Partners from "./pages/Partners";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = useTranslation();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoadingOverlay isVisible={isLoading} />
        <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/simulateur" element={<Simulator />} />
          <Route path="/demande" element={<Request />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/partenaires" element={<Partners />} />
          <Route path="/carrieres" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/mentions-legales" element={<Legal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

const App = () => (
  <TranslationProvider>
    <AppContent />
  </TranslationProvider>
);

export default App;
