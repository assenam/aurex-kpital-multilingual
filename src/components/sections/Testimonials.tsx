import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/contexts/TranslationContext';
import { Star, Quote } from 'lucide-react';
import { useMemo } from 'react';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = useMemo(() => [
    {
      name: t('testimonials.clients.0.name'),
      location: t('testimonials.clients.0.location'),
      feedback: t('testimonials.clients.0.feedback')
    },
    {
      name: t('testimonials.clients.1.name'),
      location: t('testimonials.clients.1.location'),
      feedback: t('testimonials.clients.1.feedback')
    },
    {
      name: t('testimonials.clients.2.name'),
      location: t('testimonials.clients.2.location'),
      feedback: t('testimonials.clients.2.feedback')
    }
  ], [t]);

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-section">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-muted/5 to-gold/5"></div>
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/15 rounded-full blur-2xl float"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl float" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover-lift glass-card p-8 text-center group cursor-pointer border-0 relative overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-gold/20 group-hover:text-gold/40 transition-colors duration-300">
                <Quote className="h-8 w-8" />
              </div>

              <CardContent className="p-0 relative z-10">
                {/* Stars */}
                <div className="flex justify-center mb-6 group-hover:animate-glow transition-all duration-300">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 text-gold fill-gold" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Feedback */}
                <blockquote className="text-foreground/90 text-lg leading-relaxed mb-8 italic">
                  "{testimonial.feedback}"
                </blockquote>

                {/* Client Info */}
                <div className="border-t border-border pt-6">
                  <div className="font-bold text-primary text-lg mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.location}
                  </div>
                </div>
              </CardContent>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">{t('testimonials.stats.satisfaction')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">{t('testimonials.stats.clients')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">€5B+</div>
              <div className="text-sm text-muted-foreground">{t('testimonials.stats.funding')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">25</div>
              <div className="text-sm text-muted-foreground">{t('testimonials.stats.experience')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;