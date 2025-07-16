import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Phone, Mail, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contact.form.successMessage'));
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {t('contact.hero.subtitle')}
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gold" />
                <span>{t('contact.hero.stats.responseTime')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-gold" />
                <span>{t('contact.hero.stats.experts')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  {t('contact.methods.title')}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {t('contact.methods.subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-l-4 border-l-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary rounded-lg">
                        <Phone className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{t('contact.methods.phone.title')}</h3>
                        <p className="text-muted-foreground mb-2">{t('contact.methods.phone.description')}</p>
                        <p className="font-medium">{t('contact.methods.phone.value')}</p>
                        <p className="text-sm text-muted-foreground">{t('contact.methods.phone.hours')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent bg-accent/5 hover:bg-accent/10 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent rounded-lg">
                        <Mail className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{t('contact.methods.email.title')}</h3>
                        <p className="text-muted-foreground mb-2">{t('contact.methods.email.description')}</p>
                        <p className="font-medium">{t('contact.methods.email.value')}</p>
                        <p className="text-sm text-muted-foreground">{t('contact.methods.email.hours')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-gold bg-gold/5 hover:bg-gold/10 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gold rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{t('contact.methods.address.title')}</h3>
                        <p className="text-muted-foreground mb-2">{t('contact.methods.address.description')}</p>
                        <p className="font-medium">{t('contact.methods.address.value')}</p>
                        <p className="text-sm text-muted-foreground">{t('contact.methods.address.hours')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
                    <MessageCircle className="h-6 w-6" />
                    {t('contact.form.title')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium">
                        {t('contact.form.fields.name')} *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="mt-2 h-12"
                        placeholder={t('contact.form.fields.name')}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base font-medium">
                        {t('contact.form.fields.email')} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-2 h-12"
                        placeholder={t('contact.form.fields.email')}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-base font-medium">
                        {t('contact.form.fields.message')} *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="mt-2 min-h-[120px] resize-none"
                        placeholder={t('contact.form.fields.message')}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-primary hover:shadow-lg transition-all duration-300 text-lg font-medium"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {t('contact.form.submitButton')}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      <p>{t('contact.form.commitment')}</p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;