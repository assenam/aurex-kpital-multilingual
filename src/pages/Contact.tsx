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

const Contact = () => {
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
    alert('Votre message a été envoyé avec succès ! Nous vous contacterons rapidement.');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Téléphone",
      description: "Parlez directement à nos conseillers",
      value: "+49 40 710 97523",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-17h",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Envoyez-nous vos questions",
      value: "contact@aurex-kpital.de",
      hours: "Réponse sous 4h en moyenne",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: MapPin,
      title: "Adresse",
      description: "Visitez nos bureaux à Hamburg",
      value: "Irma-Keilhack-Ring 24, 22145 Hamburg",
      hours: "Sur rendez-vous uniquement",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MessageCircle,
      title: "Chat en ligne",
      description: "Assistance instantanée",
      value: "Disponible 24h/7j",
      hours: "Réponse immédiate",
      color: "from-amber-500 to-amber-600"
    }
  ];

  const departments = [
    {
      name: "Service Commercial",
      description: "Nouvelles demandes et informations",
      contact: "commercial@aurex-kpital.de",
      phone: "+49 40 710 97523"
    },
    {
      name: "Service Client",
      description: "Suivi de dossiers existants",
      contact: "client@aurex-kpital.de", 
      phone: "+49 40 710 97524"
    },
    {
      name: "Support Technique",
      description: "Assistance plateforme et outils",
      contact: "support@aurex-kpital.de",
      phone: "+49 40 710 97525"
    },
    {
      name: "Direction",
      description: "Réclamations et suggestions",
      contact: "direction@aurex-kpital.de",
      phone: "+49 40 710 97520"
    }
  ];

  const officeHours = [
    { day: "Lundi - Vendredi", hours: "8h00 - 19h00", type: "Conseillers disponibles" },
    { day: "Samedi", hours: "9h00 - 17h00", type: "Service réduit" },
    { day: "Dimanche", hours: "Fermé", type: "Urgences uniquement" }
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
                Support Excellence
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Contactez Nos
              <span className="text-gold block">Experts</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Notre équipe dédiée vous accompagne à chaque étape de votre projet financier. 
              Plusieurs moyens pour nous joindre selon vos préférences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Headphones className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">97%</div>
                <div className="text-sm opacity-90">Satisfaction client</div>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">2h</div>
                <div className="text-sm opacity-90">Temps de réponse moyen</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">25+</div>
                <div className="text-sm opacity-90">Conseillers experts</div>
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
              Comment Nous Joindre
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choisissez le canal qui vous convient le mieux
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
                    Envoyez-nous un message
                  </CardTitle>
                  <CardDescription>
                    Nous vous répondons rapidement et de manière personnalisée
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
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
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Sujet</Label>
                        <Select value={formData.subject} onValueChange={(value) => updateFormData('subject', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisissez un sujet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="loan-request">Demande de prêt</SelectItem>
                            <SelectItem value="investment">Conseil en investissement</SelectItem>
                            <SelectItem value="insurance">Assurance</SelectItem>
                            <SelectItem value="existing-client">Client existant</SelectItem>
                            <SelectItem value="partnership">Partenariat</SelectItem>
                            <SelectItem value="complaint">Réclamation</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferredContact">Mode de contact préféré</Label>
                        <Select value={formData.preferredContact} onValueChange={(value) => updateFormData('preferredContact', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Comment préférez-vous être contacté ?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">Téléphone</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="appointment">Rendez-vous</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="urgency">Niveau d'urgence</Label>
                        <Select value={formData.urgency} onValueChange={(value) => updateFormData('urgency', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Normal (48h)</SelectItem>
                            <SelectItem value="medium">Urgent (24h)</SelectItem>
                            <SelectItem value="high">Très urgent (4h)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Votre message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateFormData('message', e.target.value)}
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-primary hover:shadow-lg text-lg py-3">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Envoyer le message
                    </Button>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <strong>Engagement :</strong> Nous nous engageons à vous répondre 
                          dans les délais indiqués selon le niveau d'urgence sélectionné.
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
                    Nos Départements
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
                    Horaires d'ouverture
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
                    Garanties & Certifications
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm">Données sécurisées ISO 27001</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm">Conformité RGPD</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm">Agréé Union Européenne</span>
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