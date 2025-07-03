import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Votre partenaire 
              <span className="bg-gradient-gold bg-clip-text text-transparent"> financier </span>
              de confiance
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Depuis 1997, Aurex K-pital accompagne particuliers et entreprises dans leurs projets de financement, 
              d'investissement et d'assurance haut de gamme.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-gold hover:shadow-gold text-primary font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/simulateur">Simuler mon prêt</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg backdrop-blur"
                asChild
              >
                <Link to="/services">Découvrir nos services</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-background/10 backdrop-blur border-primary-foreground/20 p-6 hover:shadow-elegant transition-all duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">25+</div>
                  <div className="text-primary-foreground/80">Années d'expérience</div>
                </div>
              </Card>
              
              <Card className="bg-background/10 backdrop-blur border-primary-foreground/20 p-6 hover:shadow-elegant transition-all duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">10K+</div>
                  <div className="text-primary-foreground/80">Clients satisfaits</div>
                </div>
              </Card>
              
              <Card className="bg-background/10 backdrop-blur border-primary-foreground/20 p-6 hover:shadow-elegant transition-all duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">€2B+</div>
                  <div className="text-primary-foreground/80">Financements accordés</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-primary-foreground/60" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;