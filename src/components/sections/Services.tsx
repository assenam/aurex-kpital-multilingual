import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: "Prêts Personnels",
      description: "Solutions de financement adaptées à vos besoins personnels avec des conditions privilégiées.",
      features: ["Taux préférentiels", "Étude personnalisée", "Réponse rapide"],
      icon: "💰"
    },
    {
      title: "Financements Professionnels", 
      description: "Accompagnement des entreprises dans leurs projets de développement et d'investissement.",
      features: ["Crédit professionnel", "Leasing", "Affacturage"],
      icon: "🏢"
    },
    {
      title: "Investissements",
      description: "Conseils en placement et gestion de patrimoine pour optimiser vos investissements.",
      features: ["Gestion de portefeuille", "Conseils patrimoniaux", "Placements diversifiés"],
      icon: "📈"
    },
    {
      title: "Assurances",
      description: "Couvertures complètes pour protéger vos biens, votre famille et votre activité.",
      features: ["Assurance vie", "Assurance entreprise", "Protection juridique"],
      icon: "🛡️"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Nos Services Premium
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions financières sur mesure pour particuliers et professionnels, 
            avec l'expertise et la confiance d'un établissement reconnu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-foreground/80">
                      <span className="text-accent mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  asChild
                >
                  <Link to="/services">En savoir plus</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-elegant transition-all duration-300"
            asChild
          >
            <Link to="/services">Voir tous nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;