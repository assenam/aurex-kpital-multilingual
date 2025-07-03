import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import { Gem, Building2, TrendingUp, Shield, Sparkles, Target } from 'lucide-react';

const Services = () => {
  const { visibleElements } = useScrollAnimation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      title: "Prêts Personnels",
      description: "Solutions de financement ultra-personnalisées avec des conditions révolutionnaires.",
      features: ["IA pour taux optimal", "Réponse en 2h", "Flexibilité maximale"],
      icon: Gem,
      gradient: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50"
    },
    {
      title: "Financements Pro", 
      description: "Propulsez votre entreprise vers l'excellence avec nos solutions innovantes.",
      features: ["Financement express", "Accompagnement expert", "Solutions sur mesure"],
      icon: Building2,
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50"
    },
    {
      title: "Investissements Smart",
      description: "Optimisation patrimoniale avec intelligence artificielle et expertise humaine.",
      features: ["Portfolio intelligent", "Conseils premium", "Rendement optimisé"],
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50"
    },
    {
      title: "Assurances 360°",
      description: "Protection totale et innovative pour tous vos projets de vie et business.",
      features: ["Couverture complète", "Claims en 24h", "Support premium"],
      icon: Shield,
      gradient: "from-rose-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-background to-muted/20"></div>
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl float"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary/15 rounded-full blur-xl float" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div 
          className="text-center mb-20 scroll-fade-in"
          data-scroll-id="services-header"
        >
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-gradient-gold rounded-full text-primary font-semibold text-sm tracking-wide uppercase flex items-center gap-2 justify-center">
              <Sparkles className="h-4 w-4" />
              Innovation Financière
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            Services 
            <span className="gradient-text block">Nouvelle Génération</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            L'avenir de la finance est ici. Découvrez nos solutions révolutionnaires 
            <span className="text-accent font-semibold"> alimentées par l'IA</span> et l'expertise humaine.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`scroll-slide-right group relative`}
              data-scroll-id={`service-${index}`}
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className={`
                hover-lift tilt-card h-full transition-all duration-500 border-0 overflow-hidden
                ${hoveredCard === index ? 'scale-105 shadow-hover z-10' : ''}
                ${service.bgColor}
              `}>
                {/* Card Glow Effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500
                `}></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 group-hover:animate-shimmer">
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"></div>
                </div>

                <CardHeader className="text-center pb-4 relative z-10">
                  <div className={`
                    mb-6 transition-all duration-500 transform flex justify-center
                    ${hoveredCard === index ? 'scale-125 rotate-12' : ''}
                  `}>
                    <service.icon className="h-16 w-16 text-primary" />
                  </div>
                  <CardTitle className={`
                    text-2xl font-bold mb-3 transition-all duration-300
                    bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent
                  `}>
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-foreground/80 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-foreground/90">
                        <span className={`
                          mr-3 w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}
                          ${hoveredCard === index ? 'animate-glow' : ''}
                        `}></span>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`
                      w-full btn-magnetic transition-all duration-500 border-0
                      bg-gradient-to-r ${service.gradient} hover:shadow-2xl hover:scale-105
                      text-white font-semibold rounded-xl py-3
                    `}
                    asChild
                  >
                    <Link to="/services">
                      Découvrir → 
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div 
          className="text-center scroll-scale-in"
          data-scroll-id="services-cta"
        >
          <Button 
            size="lg" 
            className="btn-magnetic hover-glow bg-gradient-primary hover:shadow-hover text-white font-bold px-12 py-6 text-xl transition-all duration-500 hover:scale-110 rounded-2xl"
            asChild
          >
            <Link to="/services" className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Explorer tous nos services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;