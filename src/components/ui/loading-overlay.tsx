import { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export const LoadingOverlay = ({ isVisible, onComplete }: LoadingOverlayProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Animation complète après 300ms
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm
        flex items-center justify-center
        transition-all duration-300
        ${isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Logo animé */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-gold/20"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-8 border border-gold/30">
            <img 
              src="/lovable-uploads/1d79ff42-26c3-4b9b-bab8-3c9b2d1e8db2.png" 
              alt="Aurex K-pital" 
              className="h-16 w-auto animate-float"
            />
          </div>
        </div>
        
        {/* Barre de progression */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-gold animate-shimmer rounded-full"
            style={{
              animation: 'shimmer 0.3s ease-in-out'
            }}
          />
        </div>
        
        {/* Texte de chargement */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Changement de langue...
        </p>
      </div>
    </div>
  );
};