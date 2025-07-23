import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
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

// Component wrapper to handle language from URL
const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const { changeLanguage, language } = useTranslation();
  
  React.useEffect(() => {
    if (lang && lang !== language) {
      changeLanguage(lang as any);
    }
  }, [lang, language, changeLanguage]);
  
  return <>{children}</>;
};

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
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to="/fr/" replace />} />
          
          {/* Language-specific routes */}
          <Route path="/:lang" element={<LanguageWrapper><Index /></LanguageWrapper>} />
          <Route path="/:lang/services" element={<LanguageWrapper><Services /></LanguageWrapper>} />
          <Route path="/:lang/simulateur" element={<LanguageWrapper><Simulator /></LanguageWrapper>} />
          <Route path="/:lang/demande" element={<LanguageWrapper><Request /></LanguageWrapper>} />
          <Route path="/:lang/contact" element={<LanguageWrapper><Contact /></LanguageWrapper>} />
          <Route path="/:lang/mentions-legales" element={<LanguageWrapper><Legal /></LanguageWrapper>} />
          <Route path="/:lang/politique-confidentialite" element={<LanguageWrapper><Privacy /></LanguageWrapper>} />
          <Route path="/:lang/conditions-generales" element={<LanguageWrapper><Terms /></LanguageWrapper>} />
          <Route path="/:lang/protection-donnees" element={<LanguageWrapper><GDPR /></LanguageWrapper>} />
          
          {/* Legacy routes without language - redirect to French */}
          <Route path="/services" element={<Navigate to="/fr/services" replace />} />
          <Route path="/simulateur" element={<Navigate to="/fr/simulateur" replace />} />
          <Route path="/demande" element={<Navigate to="/fr/demande" replace />} />
          <Route path="/contact" element={<Navigate to="/fr/contact" replace />} />
          <Route path="/mentions-legales" element={<Navigate to="/fr/mentions-legales" replace />} />
          <Route path="/politique-confidentialite" element={<Navigate to="/fr/politique-confidentialite" replace />} />
          <Route path="/conditions-generales" element={<Navigate to="/fr/conditions-generales" replace />} />
          <Route path="/protection-donnees" element={<Navigate to="/fr/protection-donnees" replace />} />
          
          {/* 404 - Catch all */}
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
