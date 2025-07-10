import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Gem, Building2, TrendingUp, Shield, Sparkles, Target, 
  CheckCircle, ArrowRight, Clock, Users, Award, Calculator,
  FileText, PiggyBank, Banknote, CreditCard, Home, Briefcase
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useMemo } from 'react';

const Services = () => {
  const { t } = useTranslation();
  const mainServices = useMemo(() => [
    {
      title: t('services.page.personal.title'),
      description: t('services.page.personal.description'),
      icon: Gem,
      gradient: "from-blue-500 to-purple-600",
      features: [
        t('services.page.personal.features.0'),
        t('services.page.personal.features.1'),
        t('services.page.personal.features.2'),
        t('services.page.personal.features.3'),
        t('services.page.personal.features.4')
      ],
      useCases: [
        t('services.page.personal.useCases.0'),
        t('services.page.personal.useCases.1'),
        t('services.page.personal.useCases.2'),
        t('services.page.personal.useCases.3'),
        t('services.page.personal.useCases.4')
      ]
    },
    {
      title: t('services.page.business.title'),
      description: t('services.page.business.description'),
      icon: Building2,
      gradient: "from-emerald-500 to-teal-600",
      features: [
        t('services.page.business.features.0'),
        t('services.page.business.features.1'),
        t('services.page.business.features.2'),
        t('services.page.business.features.3'),
        t('services.page.business.features.4')
      ],
      useCases: [
        t('services.page.business.useCases.0'),
        t('services.page.business.useCases.1'),
        t('services.page.business.useCases.2'),
        t('services.page.business.useCases.3'),
        t('services.page.business.useCases.4')
      ]
    },
    {
      title: t('services.page.investment.title'),
      description: t('services.page.investment.description'),
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-600",
      features: [
        t('services.page.investment.features.0'),
        t('services.page.investment.features.1'),
        t('services.page.investment.features.2'),
        t('services.page.investment.features.3'),
        t('services.page.investment.features.4')
      ],
      useCases: [
        t('services.page.investment.useCases.0'),
        t('services.page.investment.useCases.1'),
        t('services.page.investment.useCases.2'),
        t('services.page.investment.useCases.3'),
        t('services.page.investment.useCases.4')
      ]
    },
    {
      title: t('services.page.insurance.title'),
      description: t('services.page.insurance.description'),
      icon: Shield,
      gradient: "from-rose-500 to-pink-600",
      features: [
        t('services.page.insurance.features.0'),
        t('services.page.insurance.features.1'),
        t('services.page.insurance.features.2'),
        t('services.page.insurance.features.3'),
        t('services.page.insurance.features.4')
      ],
      useCases: [
        t('services.page.insurance.useCases.0'),
        t('services.page.insurance.useCases.1'),
        t('services.page.insurance.useCases.2'),
        t('services.page.insurance.useCases.3'),
        t('services.page.insurance.useCases.4')
      ]
    }
  ], [t]);

  const specializedProducts = useMemo(() => [
    {
      title: t('services.page.specialized.mortgage.title'),
      description: t('services.page.specialized.mortgage.description'),
      icon: Home,
      rate: t('services.page.specialized.mortgage.rate')
    },
    {
      title: t('services.page.specialized.student.title'),
      description: t('services.page.specialized.student.description'),
      icon: FileText,
      rate: t('services.page.specialized.student.rate')
    },
    {
      title: t('services.page.specialized.savings.title'),
      description: t('services.page.specialized.savings.description'),
      icon: PiggyBank,
      rate: t('services.page.specialized.savings.rate')
    },
    {
      title: t('services.page.specialized.card.title'),
      description: t('services.page.specialized.card.description'),
      icon: CreditCard,
      rate: t('services.page.specialized.card.rate')
    }
  ], [t]);

  const processSteps = useMemo(() => [
    {
      step: "01",
      title: t('services.page.process.step1.title'),
      description: t('services.page.process.step1.description')
    },
    {
      step: "02", 
      title: t('services.page.process.step2.title'),
      description: t('services.page.process.step2.description')
    },
    {
      step: "03",
      title: t('services.page.process.step3.title'),
      description: t('services.page.process.step3.description')
    },
    {
      step: "04",
      title: t('services.page.process.step4.title'),
      description: t('services.page.process.step4.description')
    }
  ], [t]);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-premium-dark"></div>
        <div className="absolute inset-0 grid-pattern opacity-15"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gold/15 rounded-full blur-2xl float" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="inline-block mb-6">
              <Badge className="px-6 py-2 bg-gold text-primary font-semibold text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                {t('services.page.hero.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('services.hero.title')}
              <span className="text-gold block">{t('services.hero.subtitle')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('services.page.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4" asChild>
                <Link to="/simulateur">
                  <Calculator className="h-5 w-5 mr-2" />
                  {t('services.page.hero.cta1')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/demande">
                  <FileText className="h-5 w-5 mr-2" />
                  {t('services.page.hero.cta2')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gradient-soft-blue relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('services.main.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.main.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {mainServices.map((service, index) => (
              <Card key={service.title} className="hover-lift border-0 shadow-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${service.gradient}`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-primary">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground text-lg">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-3">{t('services.page.main.features')} :</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-3">{t('services.page.main.useCases')} :</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.useCases.map((useCase, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg`} asChild>
                      <Link to="/demande">
                        {t('services.page.main.cta')}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Products */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('services.specialized.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.specialized.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializedProducts.map((product, index) => (
              <Card key={product.title} className="text-center hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-xl">
                    <product.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg font-bold text-primary">{product.title}</CardTitle>
                  <CardDescription className="text-sm">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent mb-4">{product.rate}</div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/demande">{t('services.page.specialized.cta')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-elegant relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('services.page.process.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.page.process.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-primary/30"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t('services.page.cta.title')}
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              {t('services.page.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4" asChild>
                <Link to="/demande">
                  <Users className="h-5 w-5 mr-2" />
                  {t('services.page.cta.btn1')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">
                  <Clock className="h-5 w-5 mr-2" />
                  {t('services.page.cta.btn2')}
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-primary-foreground/20">
              <p className="text-primary-foreground/80 mb-2">
                <strong className="text-gold">{t('footer.contact.phone')} :</strong> +49 40 710 97523
              </p>
              <p className="text-primary-foreground/80">
                <strong className="text-gold">{t('footer.contact.address')} :</strong> Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;