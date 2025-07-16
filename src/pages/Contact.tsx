import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contact.successMessage'));
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('contact.title')}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('contact.howToReach')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-blue-500 rounded-xl">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold text-primary">{t('contact.phone')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-primary">+49 40 710 97523</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-emerald-500 rounded-xl">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold text-primary">{t('contact.email')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-primary">contact@aurex-kpital.de</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-purple-500 rounded-xl">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold text-primary">{t('contact.address')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-primary">Irma-Keilhack-Ring 24, 22145 Hamburg</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                  <MessageCircle className="h-6 w-6" />
                  {t('contact.formTitle')}
                </CardTitle>
                <CardDescription>
                  {t('contact.formDescription')}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t('contact.nameLabel')} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t('contact.emailLabel')} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{t('contact.messageLabel')} *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      placeholder={t('contact.messagePlaceholder')}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary hover:shadow-lg text-lg py-3">
                    {t('contact.sendButton')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map & Address */}
      <section className="py-20 bg-gradient-elegant relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Nous Localiser
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nos bureaux se situent au cœur de Hamburg, facilement accessibles
            </p>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Map placeholder */}
              <div className="h-96 bg-gradient-to-br from-secondary/30 to-muted/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <div className="text-xl font-bold text-primary mb-2">Carte Interactive</div>
                  <div className="text-muted-foreground">
                    Irma-Keilhack-Ring 24<br />
                    22145 Hamburg, Allemagne
                  </div>
                </div>
              </div>
              
              {/* Address details */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Informations Pratiques</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Adresse Complète</h4>
                    <p className="text-muted-foreground">
                      Aurex K-pital GmbH<br />
                      Irma-Keilhack-Ring 24<br />
                      22145 Hamburg<br />
                      Allemagne
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Accès Transports</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Métro U1 : Arrêt Ohlstedt (5 min à pied)</li>
                      <li>• Bus 276, 376 : Arrêt Keilhack-Ring</li>
                      <li>• Parking visiteurs disponible</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Services</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Accueil personnalisé</li>
                      <li>• Salle de réunion privée</li>
                      <li>• Accès PMR</li>
                      <li>• WiFi gratuit</li>
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:shadow-lg" asChild>
                    <a href="/demande">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Prendre rendez-vous
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;