import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Calendar, 
  Users, Headphones, AlertCircle, CheckCircle, Sparkles,
  Building, Globe, Shield, Award
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: '',
    urgency: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contactPage.form.successMessage'));
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: t('contactPage.methods.phone.title'),
      description: t('contactPage.methods.phone.description'),
      value: t('contactPage.methods.phone.value'),
      hours: t('contactPage.methods.phone.hours'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: t('contactPage.methods.email.title'),
      description: t('contactPage.methods.email.description'),
      value: t('contactPage.methods.email.value'),
      hours: t('contactPage.methods.email.hours'),
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: MapPin,
      title: t('contactPage.methods.address.title'),
      description: t('contactPage.methods.address.description'),
      value: t('contactPage.methods.address.value'),
      hours: t('contactPage.methods.address.hours'),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MessageCircle,
      title: t('contactPage.methods.chat.title'),
      description: t('contactPage.methods.chat.description'),
      value: t('contactPage.methods.chat.value'),
      hours: t('contactPage.methods.chat.hours'),
      color: "from-amber-500 to-amber-600"
    }
  ];

  const departments = [
    {
      name: t('contactPage.departments.commercial.name'),
      description: t('contactPage.departments.commercial.description'),
      contact: t('contactPage.departments.commercial.email'),
      phone: t('contactPage.departments.commercial.phone')
    },
    {
      name: t('contactPage.departments.client.name'),
      description: t('contactPage.departments.client.description'),
      contact: t('contactPage.departments.client.email'), 
      phone: t('contactPage.departments.client.phone')
    },
    {
      name: t('contactPage.departments.support.name'),
      description: t('contactPage.departments.support.description'),
      contact: t('contactPage.departments.support.email'),
      phone: t('contactPage.departments.support.phone')
    },
    {
      name: t('contactPage.departments.management.name'),
      description: t('contactPage.departments.management.description'),
      contact: t('contactPage.departments.management.email'),
      phone: t('contactPage.departments.management.phone')
    }
  ];

  const officeHours = [
    { 
      day: t('contactPage.officeHours.monday'), 
      hours: t('contactPage.officeHours.mondayHours'), 
      type: t('contactPage.officeHours.mondayType') 
    },
    { 
      day: t('contactPage.officeHours.saturday'), 
      hours: t('contactPage.officeHours.saturdayHours'), 
      type: t('contactPage.officeHours.saturdayType') 
    },
    { 
      day: t('contactPage.officeHours.sunday'), 
      hours: t('contactPage.officeHours.sundayHours'), 
      type: t('contactPage.officeHours.sundayType') 
    }
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
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('contactPage.hero.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('contactPage.hero.title')}
              <span className="text-gold block">{t('contactPage.hero.titleSpan')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('contactPage.hero.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Headphones className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">{t('contactPage.hero.stats.satisfaction.value')}</div>
                <div className="text-sm opacity-90">{t('contactPage.hero.stats.satisfaction.label')}</div>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">{t('contactPage.hero.stats.response.value')}</div>
                <div className="text-sm opacity-90">{t('contactPage.hero.stats.response.label')}</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">{t('contactPage.hero.stats.advisors.value')}</div>
                <div className="text-sm opacity-90">{t('contactPage.hero.stats.advisors.label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gradient-soft-gold relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gold/15 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl float" style={{ animationDelay: '1.5s' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('contactPage.methods.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('contactPage.methods.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={method.title} className="text-center hover-lift border-0 shadow-lg overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${method.color}`}></div>
                
                <CardHeader>
                  <div className={`mx-auto mb-4 p-4 bg-gradient-to-r ${method.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-primary">{method.title}</CardTitle>
                  <CardDescription className="text-sm">{method.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-semibold text-primary">{method.value}</div>
                    <div className="text-sm text-muted-foreground">{method.hours}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                    <MessageCircle className="h-6 w-6" />
                    {t('contactPage.form.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('contactPage.form.description')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t('contactPage.form.fields.name')} *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('contactPage.form.fields.email')} *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{t('contactPage.form.fields.phone')}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">{t('contactPage.form.fields.subject')}</Label>
                        <Select value={formData.subject} onValueChange={(value) => updateFormData('subject', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('contactPage.form.placeholders.subject')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="loan-request">{t('contactPage.form.subjects.loanRequest')}</SelectItem>
                            <SelectItem value="investment">{t('contactPage.form.subjects.investment')}</SelectItem>
                            <SelectItem value="insurance">{t('contactPage.form.subjects.insurance')}</SelectItem>
                            <SelectItem value="existing-client">{t('contactPage.form.subjects.existingClient')}</SelectItem>
                            <SelectItem value="partnership">{t('contactPage.form.subjects.partnership')}</SelectItem>
                            <SelectItem value="complaint">{t('contactPage.form.subjects.complaint')}</SelectItem>
                            <SelectItem value="other">{t('contactPage.form.subjects.other')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferredContact">{t('contactPage.form.fields.preferredContact')}</Label>
                        <Select value={formData.preferredContact} onValueChange={(value) => updateFormData('preferredContact', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('contactPage.form.placeholders.preferredContact')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">{t('contactPage.form.contactMethods.phone')}</SelectItem>
                            <SelectItem value="email">{t('contactPage.form.contactMethods.email')}</SelectItem>
                            <SelectItem value="appointment">{t('contactPage.form.contactMethods.appointment')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="urgency">{t('contactPage.form.fields.urgency')}</Label>
                        <Select value={formData.urgency} onValueChange={(value) => updateFormData('urgency', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('contactPage.form.placeholders.urgency')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">{t('contactPage.form.urgencyLevels.low')}</SelectItem>
                            <SelectItem value="medium">{t('contactPage.form.urgencyLevels.medium')}</SelectItem>
                            <SelectItem value="high">{t('contactPage.form.urgencyLevels.high')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">{t('contactPage.form.fields.message')} *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateFormData('message', e.target.value)}
                        placeholder={t('contactPage.form.placeholders.message')}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-primary hover:shadow-lg text-lg py-3">
                      <Sparkles className="h-5 w-5 mr-2" />
                      {t('contactPage.form.submit')}
                    </Button>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <strong>Engagement :</strong> {t('contactPage.form.commitment')}
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informations détaillées */}
            <div className="space-y-6">
              {/* Départements */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {t('contactPage.departments.title')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={dept.name} className="border-b border-secondary/50 last:border-b-0 pb-4 last:pb-0">
                        <div className="font-semibold text-primary mb-1">{dept.name}</div>
                        <div className="text-sm text-muted-foreground mb-2">{dept.description}</div>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-accent" />
                            <span>{dept.contact}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-accent" />
                            <span>{dept.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Horaires */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {t('contactPage.officeHours.title')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {officeHours.map((schedule, index) => (
                      <div key={schedule.day} className="flex justify-between items-center border-b border-secondary/50 last:border-b-0 pb-3 last:pb-0">
                        <div>
                          <div className="font-semibold text-primary">{schedule.day}</div>
                          <div className="text-sm text-muted-foreground">{schedule.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-accent">{schedule.hours}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    {t('contactPage.certifications.title')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm">{t('contactPage.certifications.iso')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm">{t('contactPage.certifications.gdpr')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm">{t('contactPage.certifications.eu')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm">Support multilingue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                      <Calendar className="h-5 w-5 mr-2" />
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