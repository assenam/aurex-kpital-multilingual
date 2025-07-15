import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import { 
  Calendar, Globe, Shield, Trophy, Target, Users, Award, 
  Sparkles, TrendingUp, Heart, Lightbulb, CheckCircle,
  Building2, Briefcase, GraduationCap, MapPin, Phone, Mail,
  Star, Zap, Rocket, HandHeart, Clock
} from 'lucide-react';

const About = () => {
  const { t, language } = useTranslation();
  
  // Debug logs pour diagnostiquer le problème de traduction
  console.log('About page - Current language:', language);
  console.log('About page - Badge translation test:', t('about.badge'));
  console.log('About page - Title translation test:', t('about.title'));

  const values = [
    {
      icon: Shield,
      title: t('about.values.security.title'),
      description: t('about.values.security.description')
    },
    {
      icon: Sparkles,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: HandHeart,
      title: t('about.values.support.title'),
      description: t('about.values.support.description')
    },
    {
      icon: Trophy,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    }
  ];



  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="inline-block mb-6">
              <Badge className="px-6 py-2 bg-gold text-primary font-semibold text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                {t('about.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('about.title')}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-3"
                asChild
              >
                <Link to="/contact">
                  <Mail className="h-5 w-5 mr-2" />
                  {t('about.hero.cta.contact')}
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
                asChild
              >
                <Link to="/simulateur">
                  <Rocket className="h-5 w-5 mr-2" />
                  {t('about.hero.cta.simulate')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">{t('about.stats.experience.value')}</div>
                <div className="text-muted-foreground">{t('about.stats.experience.label')}</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">{t('about.stats.companies.value')}</div>
                <div className="text-muted-foreground">{t('about.stats.companies.label')}</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">{t('about.stats.funding.value')}</div>
                <div className="text-muted-foreground">{t('about.stats.funding.label')}</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">{t('about.stats.countries.value')}</div>
                <div className="text-muted-foreground">{t('about.stats.countries.label')}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Heart className="h-4 w-4 mr-2" />
              {t('about.values.badge')}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.values.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('about.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-3"
                asChild
              >
                <Link to="/simulateur">
                  <Zap className="h-5 w-5 mr-2" />
                  {t('about.cta.simulate')}
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
                asChild
              >
                <Link to="/contact">
                  <Phone className="h-5 w-5 mr-2" />
                  {t('about.cta.expert')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;