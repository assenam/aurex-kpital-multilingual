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

import Simulator from "./pages/Simulator";
import Request from "./pages/Request";
import Contact from "./pages/Contact";


import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import GDPR from "./pages/GDPR";
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
          
          <Route path="/simulateur" element={<Simulator />} />
          <Route path="/demande" element={<Request />} />
          <Route path="/contact" element={<Contact />} />
          
          
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/politique-confidentialite" element={<Privacy />} />
          <Route path="/conditions-generales" element={<Terms />} />
          <Route path="/protection-donnees" element={<GDPR />} />
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
