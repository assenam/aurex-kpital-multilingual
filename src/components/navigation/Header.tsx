import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from '@/contexts/TranslationContext';
import type { Language } from '@/contexts/TranslationContext';

const Header = () => {
  const { t, language } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to create language-aware URLs
  const createLocalizedUrl = useCallback((path: string) => {
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `/${language}${cleanPath ? '/' + cleanPath : ''}`;
  }, [language]);

  const navigation = useMemo(() => [
    { name: t('menu.home'), href: createLocalizedUrl('') },
    { name: t('menu.services'), href: createLocalizedUrl('services') },
    { name: t('menu.simulator'), href: createLocalizedUrl('simulateur') },
    { name: t('menu.contact'), href: createLocalizedUrl('contact') }
  ], [t, createLocalizedUrl]);

  return (
    <header className={`
      sticky top-0 z-50 w-full transition-all duration-500
      ${isScrolled 
        ? 'glass-card shadow-elegant backdrop-blur-md' 
        : 'bg-transparent'
      }
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={createLocalizedUrl('')} className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/1d79ff42-26c3-4b9b-bab8-3c9b2d1e8db2.png" 
                alt="Aurex K-pital" 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {/* CTA Button */}
            <Button 
              variant="default" 
              className="hidden sm:inline-flex bg-gradient-primary hover:shadow-elegant transition-all duration-300"
              asChild
            >
              <Link to={createLocalizedUrl('demande')}>{t('menu.request')}</Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="md:hidden"
                  size="icon"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button 
                      variant="default" 
                      className="w-full bg-gradient-primary"
                      asChild
                    >
                      <Link to={createLocalizedUrl('demande')} onClick={() => setIsOpen(false)}>
                        {t('menu.request')}
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;