import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { useParallax } from '@/hooks/useScrollAnimation';

const Hero = () => {
  const offsetY = useParallax();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 grid-pattern opacity-10"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      ></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-xl float"></div>
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-primary/20 rounded-full blur-lg float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-accent/30 rounded-full blur-md float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Content with Enhanced Animations */}
          <div className="space-y-8">
            <div 
              className="scroll-fade-in"
              data-scroll-id="hero-title"
              style={{ transform: `translateY(${offsetY * 0.2}px)` }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight">
                Votre partenaire 
                <span className="gradient-text block"> financier </span>
                <span className="text-gold animate-glow">de confiance</span>
              </h1>
            </div>
            
            <div 
              className="scroll-slide-right"
              data-scroll-id="hero-subtitle"
              style={{ transform: `translateY(${offsetY * 0.15}px)` }}
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 mb-8 leading-relaxed max-w-4xl mx-auto">
                Depuis 1997, Aurex K-pital révolutionne l'accompagnement financier avec 
                <span className="text-gold font-semibold"> innovation et excellence</span>
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div 
              className="scroll-scale-in flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              data-scroll-id="hero-cta"
            >
              <Button 
                size="lg" 
                className="btn-magnetic hover-glow bg-gradient-gold hover:shadow-gold text-primary font-bold px-10 py-6 text-xl transition-all duration-500 hover:scale-110 rounded-2xl"
                asChild
              >
                <Link to="/simulateur">
                  ✨ Simuler mon prêt
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                className="glass-card hover-lift text-primary-foreground font-semibold px-10 py-6 text-xl rounded-2xl border-2 border-primary-foreground/30"
                asChild
              >
                <Link to="/services">
                  🚀 Découvrir l'innovation
                </Link>
              </Button>
            </div>

            {/* Enhanced Trust Indicators with Modern Cards */}
            <div 
              className="scroll-slide-left grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              data-scroll-id="hero-stats"
              style={{ transform: `translateY(${offsetY * 0.1}px)` }}
            >
              <Card className="glass-card hover-lift tilt-card p-8 text-center group cursor-pointer">
                <div className="text-5xl font-bold gradient-text mb-3 group-hover:animate-glow transition-all duration-300">25+</div>
                <div className="text-primary-foreground/90 text-lg font-medium">Années d'excellence</div>
                <div className="text-primary-foreground/60 text-sm mt-2">Innovation continue</div>
              </Card>
              
              <Card className="glass-card hover-lift tilt-card p-8 text-center group cursor-pointer">
                <div className="text-5xl font-bold gradient-text mb-3 group-hover:animate-glow transition-all duration-300">50K+</div>
                <div className="text-primary-foreground/90 text-lg font-medium">Clients conquis</div>
                <div className="text-primary-foreground/60 text-sm mt-2">Satisfaction garantie</div>
              </Card>
              
              <Card className="glass-card hover-lift tilt-card p-8 text-center group cursor-pointer">
                <div className="text-5xl font-bold gradient-text mb-3 group-hover:animate-glow transition-all duration-300">€5B+</div>
                <div className="text-primary-foreground/90 text-lg font-medium">Financements réalisés</div>
                <div className="text-primary-foreground/60 text-sm mt-2">Impact transformateur</div>
              </Card>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce hover:animate-glow transition-all duration-300 cursor-pointer">
              <ArrowDown className="h-8 w-8 text-gold opacity-80 hover:opacity-100" />
              <div className="text-primary-foreground/60 text-sm mt-2 font-medium">Découvrir</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;