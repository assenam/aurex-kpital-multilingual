import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';

const CTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gold/20 rounded-full blur-xl float"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card className="glass-card border-primary-foreground/30 max-w-4xl mx-auto shadow-hover hover-lift">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              {t('home.cta.title')} 
              <span className="gradient-text"> {t('home.cta.titleHighlight')} </span>
              {t('home.cta.titleEnd')}
            </h2>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('home.cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-gold hover:shadow-gold text-primary font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/demande">{t('home.cta.buttons.request')}</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg backdrop-blur btn-magnetic"
                asChild
              >
                <Link to="/simulateur">{t('home.cta.buttons.simulate')}</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg hover-glow"
                asChild
              >
                <Link to="/contact">{t('home.cta.buttons.contact')}</Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-primary-foreground/20">
              <p className="text-primary-foreground/80 mb-2">
                <strong className="text-gold">{t('home.cta.contact.phone')}:</strong> +33759282004 / +4915781095078
              </p>
              <p className="text-primary-foreground/80">
                <strong className="text-gold">{t('home.cta.contact.address')}:</strong> {t('home.cta.contact.addressValue')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;