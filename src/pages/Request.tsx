import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { 
  FileText, Clock, Shield, CheckCircle, Upload, User, Mail, 
  Phone, Euro, Calendar, Building, MapPin, Briefcase, GraduationCap,
  AlertCircle, Sparkles, Users, Target
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const Request = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    emailConfirmation: '',
    phone: '',
    birthDate: '',
    nationality: '',
    otherNationality: '',
    maritalStatus: '',
    dependents: '',
    
    // Adresse
    address: '',
    city: '',
    postalCode: '',
    country: 'Allemagne',
    housingType: '',
    
    // Situation professionnelle
    employmentStatus: '',
    profession: '',
    employer: '',
    employmentDuration: '',
    monthlyIncome: '',
    additionalIncome: '',
    
    // Demande de financement
    loanType: '',
    amount: '',
    duration: '',
    purpose: '',
    hasGuarantee: '',
    
    // Informations financières
    bankName: '',
    hasOtherLoans: '',
    monthlyExpenses: '',
    
    // Documents
    hasRequiredDocs: false,
    acceptsTerms: false,
    acceptsMarketing: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification que les emails correspondent
    if (formData.email !== formData.emailConfirmation) {
      alert('Les adresses email ne correspondent pas. Veuillez vérifier.');
      return;
    }
    
    // Ici on traiterait la soumission du formulaire
    alert('Votre demande a été envoyée avec succès ! Nous vous contacterons sous 24h.');
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { number: "01", title: "Informations personnelles", description: "Vos données de base" },
    { number: "02", title: "Situation professionnelle", description: "Votre emploi et revenus" },
    { number: "03", title: "Demande de financement", description: "Détails de votre projet" },
    { number: "04", title: "Validation", description: "Vérification et envoi" }
  ];

  const requiredDocuments = [
    "Pièce d'identité en cours de validité",
    "3 derniers bulletins de salaire",
    "Dernier avis d'imposition",
    "Relevé de compte des 3 derniers mois",
    "Justificatif de domicile récent",
    "Devis ou facture pro forma (si applicable)"
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
                <FileText className="h-4 w-4 mr-2" />
                Demande Express
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Demande de Financement
              <span className="text-gold block">Personnalisée</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Remplissez notre formulaire sécurisé et obtenez une réponse 
              personnalisée sous 24h maximum.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Clock className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">24h</div>
                <div className="text-sm opacity-90">Réponse garantie</div>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">100%</div>
                <div className="text-sm opacity-90">Sécurisé</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">Expert</div>
                <div className="text-sm opacity-90">Dédié</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mb-3">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-primary to-primary/30 ml-4"></div>
                  )}
                </div>
                <h3 className="font-semibold text-primary text-sm">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-gradient-soft-blue relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informations personnelles */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {t('request.form.personalInfo.title')}
                    </CardTitle>
                    <CardDescription>
                      {t('request.form.personalInfo.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">{t('request.form.personalInfo.fields.firstName')} *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t('request.form.personalInfo.fields.lastName')} *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="email">{t('request.form.personalInfo.fields.email')} *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="emailConfirmation">{t('request.form.personalInfo.fields.emailConfirmation')} *</Label>
                        <Input
                          id="emailConfirmation"
                          type="email"
                          value={formData.emailConfirmation}
                          onChange={(e) => updateFormData('emailConfirmation', e.target.value)}
                          onPaste={(e) => e.preventDefault()}
                          onDrop={(e) => e.preventDefault()}
                          onDragOver={(e) => e.preventDefault()}
                          placeholder="Retapez votre email pour confirmation"
                          required
                        />
                        {formData.email && formData.emailConfirmation && formData.email !== formData.emailConfirmation && (
                          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            Les adresses email ne correspondent pas
                          </p>
                        )}
                        {formData.email && formData.emailConfirmation && formData.email === formData.emailConfirmation && (
                          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            Adresses email confirmées
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="birthDate">Date de naissance *</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => updateFormData('birthDate', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nationalité</Label>
                        <Select value={formData.nationality} onValueChange={(value) => updateFormData('nationality', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre nationalité" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto bg-background z-50">
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted">Europe</div>
                            <SelectItem value="allemande">Allemande</SelectItem>
                            <SelectItem value="autrichienne">Autrichienne</SelectItem>
                            <SelectItem value="belge">Belge</SelectItem>
                            <SelectItem value="bulgare">Bulgare</SelectItem>
                            <SelectItem value="chypriote">Chypriote</SelectItem>
                            <SelectItem value="croate">Croate</SelectItem>
                            <SelectItem value="danoise">Danoise</SelectItem>
                            <SelectItem value="espagnole">Espagnole</SelectItem>
                            <SelectItem value="estonienne">Estonienne</SelectItem>
                            <SelectItem value="finlandaise">Finlandaise</SelectItem>
                            <SelectItem value="française">Française</SelectItem>
                            <SelectItem value="grecque">Grecque</SelectItem>
                            <SelectItem value="hongroise">Hongroise</SelectItem>
                            <SelectItem value="irlandaise">Irlandaise</SelectItem>
                            <SelectItem value="italienne">Italienne</SelectItem>
                            <SelectItem value="lettone">Lettone</SelectItem>
                            <SelectItem value="lituanienne">Lituanienne</SelectItem>
                            <SelectItem value="luxembourgeoise">Luxembourgeoise</SelectItem>
                            <SelectItem value="maltaise">Maltaise</SelectItem>
                            <SelectItem value="neerlandaise">Néerlandaise</SelectItem>
                            <SelectItem value="polonaise">Polonaise</SelectItem>
                            <SelectItem value="portugaise">Portugaise</SelectItem>
                            <SelectItem value="roumaine">Roumaine</SelectItem>
                            <SelectItem value="slovaque">Slovaque</SelectItem>
                            <SelectItem value="slovene">Slovène</SelectItem>
                            <SelectItem value="suedoise">Suédoise</SelectItem>
                            <SelectItem value="tcheque">Tchèque</SelectItem>
                            <SelectItem value="britannique">Britannique</SelectItem>
                            <SelectItem value="suisse">Suisse</SelectItem>
                            <SelectItem value="norvegienne">Norvégienne</SelectItem>
                            <SelectItem value="islandaise">Islandaise</SelectItem>
                            <SelectItem value="serbe">Serbe</SelectItem>
                            <SelectItem value="montenegrine">Monténégrine</SelectItem>
                            <SelectItem value="bosniaque">Bosniaque</SelectItem>
                            <SelectItem value="albanaise">Albanaise</SelectItem>
                            <SelectItem value="macedonienne">Macédonienne</SelectItem>
                            <SelectItem value="moldave">Moldave</SelectItem>
                            <SelectItem value="ukrainienne">Ukrainienne</SelectItem>
                            <SelectItem value="bielorusse">Biélorusse</SelectItem>
                            <SelectItem value="russe">Russe</SelectItem>
                            
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted mt-2">Amérique du Nord</div>
                            <SelectItem value="americaine">Américaine (États-Unis)</SelectItem>
                            <SelectItem value="canadienne">Canadienne</SelectItem>
                            <SelectItem value="mexicaine">Mexicaine</SelectItem>
                            
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted mt-2">Amérique Centrale</div>
                            <SelectItem value="guatémaltèque">Guatémaltèque</SelectItem>
                            <SelectItem value="belizienne">Bélizienne</SelectItem>
                            <SelectItem value="salvadorienne">Salvadorienne</SelectItem>
                            <SelectItem value="hondurienne">Hondurienne</SelectItem>
                            <SelectItem value="nicaraguayenne">Nicaraguayenne</SelectItem>
                            <SelectItem value="costaricaine">Costaricaine</SelectItem>
                            <SelectItem value="panameenne">Panaméenne</SelectItem>
                            
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted mt-2">Amérique du Sud</div>
                            <SelectItem value="argentine">Argentine</SelectItem>
                            <SelectItem value="bolivienne">Bolivienne</SelectItem>
                            <SelectItem value="bresilienne">Brésilienne</SelectItem>
                            <SelectItem value="chilienne">Chilienne</SelectItem>
                            <SelectItem value="colombienne">Colombienne</SelectItem>
                            <SelectItem value="equatorienne">Équatorienne</SelectItem>
                            <SelectItem value="guyanienne">Guyanienne</SelectItem>
                            <SelectItem value="paraguayenne">Paraguayenne</SelectItem>
                            <SelectItem value="peruvienne">Péruvienne</SelectItem>
                            <SelectItem value="surinamaise">Surinamaise</SelectItem>
                            <SelectItem value="uruguayenne">Uruguayenne</SelectItem>
                            <SelectItem value="venezuelienne">Vénézuélienne</SelectItem>
                            
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted mt-2">Autre</div>
                            <SelectItem value="autre">Autre nationalité</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {/* Champ conditionnel pour autre nationalité */}
                        {formData.nationality === 'autre' && (
                          <div className="mt-3">
                            <Label htmlFor="otherNationality">Précisez votre nationalité</Label>
                            <Input
                              id="otherNationality"
                              value={formData.otherNationality}
                              onChange={(e) => updateFormData('otherNationality', e.target.value)}
                              placeholder="Ex: Japonaise, Australienne, Marocaine..."
                              required={formData.nationality === 'autre'}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="maritalStatus">Situation familiale</Label>
                        <Select value={formData.maritalStatus} onValueChange={(value) => updateFormData('maritalStatus', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Célibataire</SelectItem>
                            <SelectItem value="married">Marié(e)</SelectItem>
                            <SelectItem value="divorced">Divorcé(e)</SelectItem>
                            <SelectItem value="widowed">Veuf/Veuve</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Situation professionnelle */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Situation Professionnelle
                    </CardTitle>
                    <CardDescription>
                      Informations sur votre emploi et vos revenus
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employmentStatus">Statut professionnel *</Label>
                        <Select value={formData.employmentStatus} onValueChange={(value) => updateFormData('employmentStatus', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employee">Salarié CDI</SelectItem>
                            <SelectItem value="cdd">Salarié CDD</SelectItem>
                            <SelectItem value="freelance">Indépendant</SelectItem>
                            <SelectItem value="entrepreneur">Chef d'entreprise</SelectItem>
                            <SelectItem value="retiree">Retraité</SelectItem>
                            <SelectItem value="student">Étudiant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="profession">Profession</Label>
                        <Input
                          id="profession"
                          value={formData.profession}
                          onChange={(e) => updateFormData('profession', e.target.value)}
                          placeholder="Ex: Ingénieur, Médecin..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employer">Employeur</Label>
                        <Input
                          id="employer"
                          value={formData.employer}
                          onChange={(e) => updateFormData('employer', e.target.value)}
                          placeholder="Nom de l'entreprise"
                        />
                      </div>
                      <div>
                        <Label htmlFor="employmentDuration">Ancienneté (mois)</Label>
                        <Input
                          id="employmentDuration"
                          type="number"
                          value={formData.employmentDuration}
                          onChange={(e) => updateFormData('employmentDuration', e.target.value)}
                          placeholder="Ex: 24"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="monthlyIncome">Revenus mensuels nets *</Label>
                        <Input
                          id="monthlyIncome"
                          type="number"
                          value={formData.monthlyIncome}
                          onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                          placeholder="Ex: 3500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="additionalIncome">Autres revenus (optionnel)</Label>
                        <Input
                          id="additionalIncome"
                          type="number"
                          value={formData.additionalIncome}
                          onChange={(e) => updateFormData('additionalIncome', e.target.value)}
                          placeholder="Ex: 500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Demande de financement */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                      <Euro className="h-5 w-5" />
                      Demande de Financement
                    </CardTitle>
                    <CardDescription>
                      Détails de votre projet
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="loanType">Type de financement *</Label>
                        <Select value={formData.loanType} onValueChange={(value) => updateFormData('loanType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">Prêt Personnel</SelectItem>
                            <SelectItem value="auto">Crédit Auto</SelectItem>
                            <SelectItem value="real-estate">Crédit Immobilier</SelectItem>
                            <SelectItem value="professional">Financement Pro</SelectItem>
                            <SelectItem value="student">Prêt Étudiant</SelectItem>
                            <SelectItem value="consolidation">Rachat de Crédits</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="amount">Montant souhaité (€) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={formData.amount}
                          onChange={(e) => updateFormData('amount', e.target.value)}
                          placeholder="Ex: 25000"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Durée souhaitée (mois)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={formData.duration}
                          onChange={(e) => updateFormData('duration', e.target.value)}
                          placeholder="Ex: 60"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hasGuarantee">Garantie disponible</Label>
                        <Select value={formData.hasGuarantee} onValueChange={(value) => updateFormData('hasGuarantee', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Oui</SelectItem>
                            <SelectItem value="no">Non</SelectItem>
                            <SelectItem value="maybe">À évaluer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="purpose">Objet du financement *</Label>
                      <Textarea
                        id="purpose"
                        value={formData.purpose}
                        onChange={(e) => updateFormData('purpose', e.target.value)}
                        placeholder="Décrivez brièvement votre projet..."
                        rows={4}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Validation */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Validation et Envoi
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="hasRequiredDocs"
                          checked={formData.hasRequiredDocs}
                          onCheckedChange={(checked) => updateFormData('hasRequiredDocs', checked as boolean)}
                        />
                        <Label htmlFor="hasRequiredDocs" className="text-sm leading-relaxed">
                          Je certifie disposer des documents requis et pouvoir les fournir sur demande
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="acceptsTerms"
                          checked={formData.acceptsTerms}
                          onCheckedChange={(checked) => updateFormData('acceptsTerms', checked as boolean)}
                          required
                        />
                        <Label htmlFor="acceptsTerms" className="text-sm leading-relaxed">
                          J'accepte les conditions générales et la politique de confidentialité *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="acceptsMarketing"
                          checked={formData.acceptsMarketing}
                          onCheckedChange={(checked) => updateFormData('acceptsMarketing', checked as boolean)}
                        />
                        <Label htmlFor="acceptsMarketing" className="text-sm leading-relaxed">
                          J'accepte de recevoir des offres commerciales personnalisées
                        </Label>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:shadow-lg text-lg py-4"
                      disabled={!formData.acceptsTerms || (formData.email !== formData.emailConfirmation)}
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Envoyer ma demande
                    </Button>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <strong>Engagement qualité :</strong> Nous nous engageons à vous contacter 
                          sous 24h pour étudier votre demande et vous proposer une solution adaptée.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Documents requis */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Documents requis
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Préparez ces documents pour accélérer le traitement :
                  </p>
                  <ul className="space-y-2">
                    {requiredDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-primary">
                    Besoin d'aide ?
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="font-semibold text-primary">+49 40 710 97523</div>
                    <div className="text-sm text-muted-foreground">Lun-Ven: 8h-19h</div>
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Nous contacter
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Sécurité */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Sécurité garantie
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Données chiffrées SSL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Conformité RGPD</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Aucune utilisation commerciale</span>
                    </div>
                  </div>
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

export default Request;