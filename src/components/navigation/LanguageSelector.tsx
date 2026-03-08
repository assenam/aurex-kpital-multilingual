import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
];

export const LanguageSelector = () => {
  const { language, changeLanguage } = useTranslation();
  const [currentLang, setCurrentLang] = useState(() => {
    return languages.find(lang => lang.code === language) || languages[0];
  });

  useEffect(() => {
    const newLang = languages.find(lang => lang.code === language) || languages[0];
    setCurrentLang(newLang);
  }, [language]);

  const handleLanguageChange = (selectedLanguage: typeof languages[0]) => {
    setCurrentLang(selectedLanguage);
    changeLanguage(selectedLanguage.code as any);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 border border-border/50 hover:bg-secondary/50"
        >
          <span className="mr-1">{currentLang.flag}</span>
          <span className="hidden sm:inline mr-1">{currentLang.name}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-background border-border/50 shadow-elegant"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center space-x-2 cursor-pointer hover:bg-secondary/50"
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {currentLang.code === language.code && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};