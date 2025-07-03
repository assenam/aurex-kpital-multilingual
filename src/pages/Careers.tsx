import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/contexts/TranslationContext';
import { 
  Users, Briefcase, MapPin, Clock, Euro, GraduationCap, 
  TrendingUp, Heart, Coffee, Gamepad2, Car, Plane,
  Code, BarChart, Shield, Headphones, Building
} from 'lucide-react';

const Careers = () => {
  const { t } = useTranslation();
  const openPositions = [
    {
      title: "Senior Data Scientist",
      department: "Innovation & IA",
      location: "Hamburg, Allemagne",
      type: "CDI",
      experience: "5+ ans",
      salary: "75-95K€",
      description: "Développement d'algorithmes prédictifs pour l'analyse de risque et l'optimisation des portefeuilles clients.",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Finance"],
      urgent: true
    },
    {
      title: "Conseiller Financier Senior",
      department: "Relation Client",
      location: "Hamburg / Remote",
      type: "CDI",
      experience: "3+ ans",
      salary: "50-65K€ + primes",
      description: "Accompagnement personnalisé de clients premium dans leurs projets d'investissement et de financement.",
      skills: ["Conseil financier", "Gestion patrimoniale", "Relation client", "Allemand", "Anglais"]
    },
    {
      title: "Développeur Full-Stack",
      department: "Technology",
      location: "Hamburg",
      type: "CDI",
      experience: "3+ ans",
      salary: "60-80K€",
      description: "Développement et maintenance de notre plateforme digitale clients et outils internes.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"]
    },
    {
      title: "Risk Analyst",
      department: "Gestion des Risques",
      location: "Hamburg",
      type: "CDI",
      experience: "2+ ans",
      salary: "45-60K€",
      description: "Analyse et évaluation des risques de crédit, développement de modèles de scoring.",
      skills: ["Analyse quantitative", "Excel avancé", "R/Python", "Réglementation bancaire"]
    },
    {
      title: "Marketing Digital Manager",
      department: "Marketing",
      location: "Hamburg / Remote",
      type: "CDI",
      experience: "4+ ans",
      salary: "55-70K€",
      description: "Stratégie digitale, acquisition client online, optimisation des conversions.",
      skills: ["SEO/SEA", "Analytics", "CRM", "Content Marketing", "Growth Hacking"]
    },
    {
      title: "Compliance Officer",
      department: "Conformité",
      location: "Hamburg",
      type: "CDI",
      experience: "5+ ans",
      salary: "65-85K€",
      description: "Supervision de la conformité réglementaire, mise en place des procédures RGPD et AML.",
      skills: ["Droit bancaire", "RGPD", "AML", "Audit", "Réglementation UE"]
    }
  ];

  const benefits = [
    {
      icon: Euro,
      title: "Rémunération Attractive",
      description: "Salaire compétitif + primes de performance + intéressement aux bénéfices",
      details: ["13ème mois garanti", "Primes objectives trimestrielles", "Stock-options pour les seniors"]
    },
    {
      icon: Clock,
      title: "Flexibilité Maximale",
      description: "Horaires flexibles et télétravail jusqu'à 3 jours par semaine",
      details: ["Horaires libres 7h-20h", "Remote work jusqu'à 60%", "Workation possible 4 semaines/an"]
    },
    {
      icon: GraduationCap,
      title: "Formation Continue",
      description: "Budget formation 3000€/an + certifications prises en charge",
      details: ["Formations techniques", "Certifications professionnelles", "Conférences internationales"]
    },
    {
      icon: Heart,
      title: "Bien-être au Travail",
      description: "Mutuelle premium + sport + événements équipe",
      details: ["Mutuelle famille 100%", "Salle de sport sur site", "Team building mensuel"]
    },
    {
      icon: Car,
      title: "Mobilité",
      description: "Véhicule de fonction ou allocation transport",
      details: ["Voiture ou vélo électrique", "Parking gratuit", "Transports publics remboursés"]
    },
    {
      icon: Plane,
      title: "Congés Généreux",
      description: "30 jours de congés + RTT + congés exceptionnels",
      details: ["5 semaines de base", "RTT négociables", "Congés ancienneté"]
    }
  ];

  const culture = [
    {
      icon: TrendingUp,
      title: "Innovation Permanente",
      description: "Nous investissons 15% de notre temps dans la R&D et l'exploration de nouvelles idées"
    },
    {
      icon: Users,
      title: "Esprit d'Équipe",
      description: "Collaboration transversale, entraide et célébration des succès collectifs"
    },
    {
      icon: Coffee,
      title: "Convivialité",
      description: "Petit-déjeuners d'équipe, afterworks, événements familiaux et sorties team building"
    },
    {
      icon: Gamepad2,
      title: "Work-Life Balance",
      description: "Salle de jeux, espaces détente, politique de déconnexion respectée"
    }
  ];

  const departments = [
    { name: "Technology", icon: Code, count: 12, description: "Développement produit et infrastructure" },
    { name: "Finance & Risk", icon: BarChart, count: 8, description: "Analyse financière et gestion des risques" },
    { name: "Customer Success", icon: Headphones, count: 15, description: "Relation client et support" },
    { name: "Compliance", icon: Shield, count: 4, description: "Conformité et réglementation" },
    { name: "Operations", icon: Building, count: 6, description: "Opérations et administration" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="inline-block mb-6">
              <Badge className="px-6 py-2 bg-gold text-primary font-semibold text-sm">
                <Users className="h-4 w-4 mr-2" />
                Rejoignez-nous
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Construisons l'Avenir
              <span className="text-gold block">de la Finance</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Rejoignez une équipe passionnée qui révolutionne les services financiers 
              en Europe avec innovation, excellence et bienveillance.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <Users className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">45+</div>
                <div className="text-sm opacity-90">Collaborateurs</div>
              </div>
              <div className="text-center">
                <Briefcase className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">12</div>
                <div className="text-sm opacity-90">Postes ouverts</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">25%</div>
                <div className="text-sm opacity-90">Croissance annuelle</div>
              </div>
              <div className="text-center">
                <Heart className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">4.8/5</div>
                <div className="text-sm opacity-90">Satisfaction équipe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Postes Ouverts
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez les opportunités qui vous attendent chez Aurex K-pital
            </p>
          </div>

          <div className="grid gap-6">
            {openPositions.map((job, index) => (
              <Card key={job.title} className="hover-lift border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl text-primary">{job.title}</CardTitle>
                        {job.urgent && <Badge className="bg-accent text-accent-foreground">Urgent</Badge>}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          {job.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <Euro className="h-4 w-4" />
                          {job.salary}
                        </div>
                      </div>
                      <CardDescription className="mb-4">{job.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="ml-4 bg-gradient-primary hover:shadow-lg">
                      Postuler
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Nos Équipes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez les différents départements et leurs missions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <Card key={dept.name} className="text-center hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-xl">
                    <dept.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-primary">{dept.name}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent mb-2">{dept.count}</div>
                  <div className="text-sm text-muted-foreground">collaborateurs</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Vos Avantages
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un package complet pour votre épanouissement professionnel et personnel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} className="hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-primary rounded-xl">
                      <benefit.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg text-primary">{benefit.title}</CardTitle>
                  </div>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefit.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Notre Culture
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              L'esprit Aurex K-pital au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culture.map((value, index) => (
              <Card key={value.title} className="hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-primary rounded-xl">
                      <value.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à Nous Rejoindre ?
            </h2>
            <p className="text-xl mb-12 text-primary-foreground/90">
              Candidature spontanée ou postulez directement sur un poste ouvert
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4">
                <Briefcase className="h-5 w-5 mr-2" />
                Candidature Spontanée
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Users className="h-5 w-5 mr-2" />
                Voir Tous les Postes
              </Button>
            </div>

            <div className="mt-12 text-sm text-primary-foreground/80">
              <p>Contact RH : <strong>careers@aurex-kpital.de</strong> | +49 40 710 97535</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;