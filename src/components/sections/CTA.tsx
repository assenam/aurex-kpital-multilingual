import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card className="bg-background/10 backdrop-blur border-primary-foreground/20 max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Prêt à concrétiser 
              <span className="bg-gradient-gold bg-clip-text text-transparent"> vos projets </span>
              ?
            </h2>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Nos experts sont à votre disposition pour étudier votre situation 
              et vous proposer les meilleures solutions de financement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-gold hover:shadow-gold text-primary font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/demande">Faire une demande</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg backdrop-blur"
                asChild
              >
                <Link to="/simulateur">Simuler un prêt</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg"
                asChild
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-primary-foreground/20">
              <p className="text-primary-foreground/80 mb-2">
                <strong>Téléphone :</strong> +49 40 710 97523
              </p>
              <p className="text-primary-foreground/80">
                <strong>Adresse :</strong> Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;