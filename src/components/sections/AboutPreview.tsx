import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPreview = () => {
  const stats = [
    { value: "1997", label: "Année de création" },
    { value: "Hamburg", label: "Siège social" },
    { value: "HRB 80635", label: "Registre de commerce" },
    { value: "DE00976259", label: "Safe-Nummer" }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              Plus de 25 ans 
              <span className="bg-gradient-gold bg-clip-text text-transparent"> d'excellence </span>
              financière
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Établie à Hamburg depuis 1997, Aurex K-pital s'est imposée comme un acteur de référence 
              dans le secteur financier. Notre expertise reconnue et notre approche personnalisée 
              nous permettent d'accompagner nos clients dans leurs projets les plus ambitieux.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Avec une équipe de spécialistes expérimentés et une technologie de pointe, 
              nous offrons des solutions sur mesure qui répondent aux exigences les plus élevées 
              du marché financier moderne.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-elegant transition-all duration-300"
                asChild
              >
                <Link to="/a-propos">Découvrir notre histoire</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/20 hover:bg-primary/5"
                asChild
              >
                <Link to="/contact">Prendre contact</Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label} 
                className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;