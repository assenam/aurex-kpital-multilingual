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
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
    country: '',
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

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification que les emails correspondent
    if (formData.email !== formData.emailConfirmation) {
      toast({
        title: "Erreur",
        description: t('request.form.validation.emailMismatchAlert'),
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Préparer les données pour l'email
      const emailData = {
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.birthDate,
          nationality: formData.nationality,
          maritalStatus: formData.maritalStatus,
          dependents: formData.dependents,
        },
        professionalInfo: {
          employmentStatus: formData.employmentStatus,
          employer: formData.employer,
          position: formData.profession,
          workDuration: formData.employmentDuration,
          monthlyIncome: formData.monthlyIncome,
          otherIncome: formData.additionalIncome,
        },
        financingRequest: {
          loanType: formData.loanType,
          amount: formData.amount,
          duration: formData.duration,
          purpose: formData.purpose,
          guarantee: formData.hasGuarantee,
        }
      };

      // Envoyer l'email via l'edge function
      const { data, error } = await supabase.functions.invoke('send-request-email', {
        body: emailData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Succès !",
        description: t('request.form.validation.successAlert'),
      });

      // Reset du formulaire après succès
      setFormData({
        firstName: '', lastName: '', email: '', emailConfirmation: '', phone: '',
        birthDate: '', nationality: '', otherNationality: '', maritalStatus: '', dependents: '',
        address: '', city: '', postalCode: '', country: '', housingType: '',
        employmentStatus: '', profession: '', employer: '', employmentDuration: '',
        monthlyIncome: '', additionalIncome: '', loanType: '', amount: '',
        duration: '', purpose: '', hasGuarantee: '', bankName: '',
        hasOtherLoans: '', monthlyExpenses: '', hasRequiredDocs: false,
        acceptsTerms: false, acceptsMarketing: false
      });

    } catch (error) {
      console.error('Error sending request:', error);
      toast({
        title: "Erreur",
        description: t('request.form.validation.errorAlert'),
        variant: "destructive",
      });
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { number: "01", title: t('request.steps.0.title'), description: t('request.steps.0.description') },
    { number: "02", title: t('request.steps.1.title'), description: t('request.steps.1.description') },
    { number: "03", title: t('request.steps.2.title'), description: t('request.steps.2.description') },
    { number: "04", title: t('request.steps.3.title'), description: t('request.steps.3.description') }
  ];

  const requiredDocuments = [
    t('request.sidebar.documents.list.0'),
    t('request.sidebar.documents.list.1'), 
    t('request.sidebar.documents.list.2'),
    t('request.sidebar.documents.list.3'),
    t('request.sidebar.documents.list.4')
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
                {t('request.hero.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('request.hero.title')}
              <span className="text-gold block">{t('request.hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('request.hero.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Clock className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">{t('request.hero.stats.responseTime.value')}</div>
                <div className="text-sm opacity-90">{t('request.hero.stats.responseTime.label')}</div>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">{t('request.hero.stats.security.value')}</div>
                <div className="text-sm opacity-90">{t('request.hero.stats.security.label')}</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-lg">{t('request.hero.stats.expert.value')}</div>
                <div className="text-sm opacity-90">{t('request.hero.stats.expert.label')}</div>
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
                          placeholder={t('request.form.personalInfo.fields.emailConfirmationPlaceholder')}
                          required
                        />
                        {formData.email && formData.emailConfirmation && formData.email !== formData.emailConfirmation && (
                          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {t('request.form.personalInfo.validation.emailMismatch')}
                          </p>
                        )}
                        {formData.email && formData.emailConfirmation && formData.email === formData.emailConfirmation && (
                          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            {t('request.form.personalInfo.validation.emailConfirmed')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{t('request.form.personalInfo.fields.phone')} *</Label>
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
                        <Label htmlFor="birthDate">{t('request.form.personalInfo.fields.birthDate')} *</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => updateFormData('birthDate', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality">{t('request.form.personalInfo.fields.nationality')}</Label>
                        <Select value={formData.nationality} onValueChange={(value) => updateFormData('nationality', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('request.form.personalInfo.fields.nationalityPlaceholder')} />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto bg-background z-50">
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted">{t('request.form.personalInfo.nationalityGroups.europe')}</div>
                            <SelectItem value="allemande">{t('request.form.personalInfo.nationalities.german')}</SelectItem>
                            <SelectItem value="autrichienne">{t('request.form.personalInfo.nationalities.austrian')}</SelectItem>
                            <SelectItem value="belge">{t('request.form.personalInfo.nationalities.belgian')}</SelectItem>
                            <SelectItem value="bulgare">{t('request.form.personalInfo.nationalities.bulgarian')}</SelectItem>
                            <SelectItem value="chypriote">{t('request.form.personalInfo.nationalities.cypriot')}</SelectItem>
                            <SelectItem value="croate">{t('request.form.personalInfo.nationalities.croatian')}</SelectItem>
                            <SelectItem value="danoise">{t('request.form.personalInfo.nationalities.danish')}</SelectItem>
                            <SelectItem value="espagnole">{t('request.form.personalInfo.nationalities.spanish')}</SelectItem>
                            <SelectItem value="estonienne">{t('request.form.personalInfo.nationalities.estonian')}</SelectItem>
                            <SelectItem value="finlandaise">{t('request.form.personalInfo.nationalities.finnish')}</SelectItem>
                            <SelectItem value="française">{t('request.form.personalInfo.nationalities.french')}</SelectItem>
                            <SelectItem value="grecque">{t('request.form.personalInfo.nationalities.greek')}</SelectItem>
                            <SelectItem value="hongroise">{t('request.form.personalInfo.nationalities.hungarian')}</SelectItem>
                            <SelectItem value="irlandaise">{t('request.form.personalInfo.nationalities.irish')}</SelectItem>
                            <SelectItem value="italienne">{t('request.form.personalInfo.nationalities.italian')}</SelectItem>
                            <SelectItem value="lettone">{t('request.form.personalInfo.nationalities.latvian')}</SelectItem>
                            <SelectItem value="lituanienne">{t('request.form.personalInfo.nationalities.lithuanian')}</SelectItem>
                            <SelectItem value="luxembourgeoise">{t('request.form.personalInfo.nationalities.luxembourgish')}</SelectItem>
                            <SelectItem value="maltaise">{t('request.form.personalInfo.nationalities.maltese')}</SelectItem>
                            <SelectItem value="neerlandaise">{t('request.form.personalInfo.nationalities.dutch')}</SelectItem>
                            <SelectItem value="polonaise">{t('request.form.personalInfo.nationalities.polish')}</SelectItem>
                            <SelectItem value="portugaise">{t('request.form.personalInfo.nationalities.portuguese')}</SelectItem>
                            <SelectItem value="roumaine">{t('request.form.personalInfo.nationalities.romanian')}</SelectItem>
                            <SelectItem value="slovaque">{t('request.form.personalInfo.nationalities.slovak')}</SelectItem>
                            <SelectItem value="slovene">{t('request.form.personalInfo.nationalities.slovenian')}</SelectItem>
                            <SelectItem value="suedoise">{t('request.form.personalInfo.nationalities.swedish')}</SelectItem>
                            <SelectItem value="tcheque">{t('request.form.personalInfo.nationalities.czech')}</SelectItem>
                            <SelectItem value="britannique">{t('request.form.personalInfo.nationalities.british')}</SelectItem>
                            <SelectItem value="suisse">{t('request.form.personalInfo.nationalities.swiss')}</SelectItem>
                            <SelectItem value="norvegienne">{t('request.form.personalInfo.nationalities.norwegian')}</SelectItem>
                            <SelectItem value="islandaise">{t('request.form.personalInfo.nationalities.icelandic')}</SelectItem>
                            <SelectItem value="serbe">{t('request.form.personalInfo.nationalities.serbian')}</SelectItem>
                            <SelectItem value="montenegrine">{t('request.form.personalInfo.nationalities.montenegrin')}</SelectItem>
                            <SelectItem value="bosniaque">{t('request.form.personalInfo.nationalities.bosnian')}</SelectItem>
                            <SelectItem value="albanaise">{t('request.form.personalInfo.nationalities.albanian')}</SelectItem>
                            <SelectItem value="macedonienne">{t('request.form.personalInfo.nationalities.macedonian')}</SelectItem>
                            <SelectItem value="moldave">{t('request.form.personalInfo.nationalities.moldovan')}</SelectItem>
                            <SelectItem value="ukrainienne">{t('request.form.personalInfo.nationalities.ukrainian')}</SelectItem>
                            <SelectItem value="bielorusse">{t('request.form.personalInfo.nationalities.belarusian')}</SelectItem>
                            <SelectItem value="russe">{t('request.form.personalInfo.nationalities.russian')}</SelectItem>
                            
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted mt-2">{t('request.form.personalInfo.nationalityGroups.northAmerica')}</div>
                            <SelectItem value="americaine">{t('request.form.personalInfo.nationalities.american')}</SelectItem>
                            <SelectItem value="canadienne">{t('request.form.personalInfo.nationalities.canadian')}</SelectItem>
                            <SelectItem value="mexicaine">{t('request.form.personalInfo.nationalities.mexican')}</SelectItem>
                            
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted mt-2">{t('request.form.personalInfo.nationalityGroups.centralAmerica')}</div>
                            <SelectItem value="guatémaltèque">{t('request.form.personalInfo.nationalities.guatemalan')}</SelectItem>
                            <SelectItem value="belizienne">{t('request.form.personalInfo.nationalities.belizean')}</SelectItem>
                            <SelectItem value="salvadorienne">{t('request.form.personalInfo.nationalities.salvadoran')}</SelectItem>
                            <SelectItem value="hondurienne">{t('request.form.personalInfo.nationalities.honduran')}</SelectItem>
                            <SelectItem value="nicaraguayenne">{t('request.form.personalInfo.nationalities.nicaraguan')}</SelectItem>
                            <SelectItem value="costaricaine">{t('request.form.personalInfo.nationalities.costarican')}</SelectItem>
                            <SelectItem value="panameenne">{t('request.form.personalInfo.nationalities.panamanian')}</SelectItem>
                            
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted mt-2">{t('request.form.personalInfo.nationalityGroups.southAmerica')}</div>
                            <SelectItem value="argentine">{t('request.form.personalInfo.nationalities.argentine')}</SelectItem>
                            <SelectItem value="bolivienne">{t('request.form.personalInfo.nationalities.bolivian')}</SelectItem>
                            <SelectItem value="bresilienne">{t('request.form.personalInfo.nationalities.brazilian')}</SelectItem>
                            <SelectItem value="chilienne">{t('request.form.personalInfo.nationalities.chilean')}</SelectItem>
                            <SelectItem value="colombienne">{t('request.form.personalInfo.nationalities.colombian')}</SelectItem>
                            <SelectItem value="equatorienne">{t('request.form.personalInfo.nationalities.ecuadorian')}</SelectItem>
                            <SelectItem value="guyanienne">{t('request.form.personalInfo.nationalities.guyanese')}</SelectItem>
                            <SelectItem value="paraguayenne">{t('request.form.personalInfo.nationalities.paraguayan')}</SelectItem>
                            <SelectItem value="peruvienne">{t('request.form.personalInfo.nationalities.peruvian')}</SelectItem>
                            <SelectItem value="surinamaise">{t('request.form.personalInfo.nationalities.surinamese')}</SelectItem>
                            <SelectItem value="uruguayenne">{t('request.form.personalInfo.nationalities.uruguayan')}</SelectItem>
                            <SelectItem value="venezuelienne">{t('request.form.personalInfo.nationalities.venezuelan')}</SelectItem>
                            
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted mt-2">{t('request.form.personalInfo.nationalityGroups.other')}</div>
                            <SelectItem value="autre">{t('request.form.personalInfo.nationalities.other')}</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {/* Champ conditionnel pour autre nationalité */}
                        {formData.nationality === 'autre' && (
                          <div className="mt-3">
                            <Label htmlFor="otherNationality">{t('request.form.personalInfo.fields.otherNationality')}</Label>
                            <Input
                              id="otherNationality"
                              value={formData.otherNationality}
                              onChange={(e) => updateFormData('otherNationality', e.target.value)}
                              placeholder={t('request.form.personalInfo.fields.otherNationalityPlaceholder')}
                              required={formData.nationality === 'autre'}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="maritalStatus">{t('request.form.personalInfo.fields.maritalStatus')}</Label>
                        <Select value={formData.maritalStatus} onValueChange={(value) => updateFormData('maritalStatus', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('request.form.personalInfo.fields.maritalStatusPlaceholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">{t('request.form.personalInfo.maritalOptions.single')}</SelectItem>
                            <SelectItem value="married">{t('request.form.personalInfo.maritalOptions.married')}</SelectItem>
                            <SelectItem value="divorced">{t('request.form.personalInfo.maritalOptions.divorced')}</SelectItem>
                            <SelectItem value="widowed">{t('request.form.personalInfo.maritalOptions.widowed')}</SelectItem>
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
                      {t('request.form.professionalInfo.title')}
                    </CardTitle>
                    <CardDescription>
                      {t('request.form.professionalInfo.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employmentStatus">{t('request.form.professionalInfo.fields.employmentStatus')} *</Label>
                        <Select value={formData.employmentStatus} onValueChange={(value) => updateFormData('employmentStatus', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('request.form.professionalInfo.fields.employmentStatusPlaceholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employee">{t('request.form.professionalInfo.employmentOptions.employee')}</SelectItem>
                            <SelectItem value="selfEmployed">{t('request.form.professionalInfo.employmentOptions.selfEmployed')}</SelectItem>
                            <SelectItem value="business">{t('request.form.professionalInfo.employmentOptions.business')}</SelectItem>
                            <SelectItem value="retired">{t('request.form.professionalInfo.employmentOptions.retired')}</SelectItem>
                            <SelectItem value="student">{t('request.form.professionalInfo.employmentOptions.student')}</SelectItem>
                            <SelectItem value="unemployed">{t('request.form.professionalInfo.employmentOptions.unemployed')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="profession">{t('request.form.professionalInfo.fields.position')}</Label>
                        <Input
                          id="profession"
                          value={formData.profession}
                          onChange={(e) => updateFormData('profession', e.target.value)}
                          placeholder={t('request.form.professionalInfo.fields.positionPlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employer">{t('request.form.professionalInfo.fields.company')}</Label>
                        <Input
                          id="employer"
                          value={formData.employer}
                          onChange={(e) => updateFormData('employer', e.target.value)}
                          placeholder={t('request.form.professionalInfo.fields.companyPlaceholder')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="employmentDuration">{t('request.form.professionalInfo.fields.workExperience')}</Label>
                        <Input
                          id="employmentDuration"
                          type="number"
                          value={formData.employmentDuration}
                          onChange={(e) => updateFormData('employmentDuration', e.target.value)}
                          placeholder={t('request.form.professionalInfo.fields.workExperiencePlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="monthlyIncome">{t('request.form.professionalInfo.fields.monthlyIncome')} *</Label>
                        <Input
                          id="monthlyIncome"
                          type="number"
                          value={formData.monthlyIncome}
                          onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                          placeholder={t('request.form.professionalInfo.fields.monthlyIncomePlaceholder')}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="additionalIncome">{t('request.form.professionalInfo.fields.additionalIncome')}</Label>
                        <Input
                          id="additionalIncome"
                          type="number"
                          value={formData.additionalIncome}
                          onChange={(e) => updateFormData('additionalIncome', e.target.value)}
                          placeholder={t('request.form.professionalInfo.fields.additionalIncomePlaceholder')}
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
                      {t('request.form.financingRequest.title')}
                    </CardTitle>
                    <CardDescription>
                      {t('request.form.financingRequest.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="loanType">{t('request.form.financingRequest.fields.loanType')} *</Label>
                        <Select value={formData.loanType} onValueChange={(value) => updateFormData('loanType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('request.form.financingRequest.fields.loanTypePlaceholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">{t('request.form.financingRequest.loanOptions.personal')}</SelectItem>
                            <SelectItem value="auto">{t('request.form.financingRequest.loanOptions.auto')}</SelectItem>
                            <SelectItem value="real-estate">{t('request.form.financingRequest.loanOptions.real_estate')}</SelectItem>
                            <SelectItem value="professional">{t('request.form.financingRequest.loanOptions.professional')}</SelectItem>
                            <SelectItem value="student">{t('request.form.financingRequest.loanOptions.student')}</SelectItem>
                            <SelectItem value="consolidation">{t('request.form.financingRequest.loanOptions.debt_consolidation')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="amount">{t('request.form.financingRequest.fields.amount')} *</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={formData.amount}
                          onChange={(e) => updateFormData('amount', e.target.value)}
                          placeholder={t('request.form.financingRequest.fields.amountPlaceholder')}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">{t('request.form.financingRequest.fields.duration')}</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={formData.duration}
                          onChange={(e) => updateFormData('duration', e.target.value)}
                          placeholder={t('request.form.financingRequest.fields.durationPlaceholder')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hasGuarantee">{t('request.form.financingRequest.fields.hasGuarantee')}</Label>
                        <Select value={formData.hasGuarantee} onValueChange={(value) => updateFormData('hasGuarantee', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('request.form.financingRequest.fields.guaranteePlaceholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">{t('request.form.financingRequest.guaranteeOptions.yes')}</SelectItem>
                            <SelectItem value="no">{t('request.form.financingRequest.guaranteeOptions.no')}</SelectItem>
                            <SelectItem value="maybe">{t('request.form.financingRequest.guaranteeOptions.maybe')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="purpose">{t('request.form.financingRequest.fields.purpose')} *</Label>
                      <Textarea
                        id="purpose"
                        value={formData.purpose}
                        onChange={(e) => updateFormData('purpose', e.target.value)}
                        placeholder={t('request.form.financingRequest.fields.purposePlaceholder')}
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
                      {t('request.form.validation.title')}
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
                          {t('request.form.validation.fields.hasRequiredDocs')}
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
                          {t('request.form.validation.fields.acceptsTerms')}
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="acceptsMarketing"
                          checked={formData.acceptsMarketing}
                          onCheckedChange={(checked) => updateFormData('acceptsMarketing', checked as boolean)}
                        />
                        <Label htmlFor="acceptsMarketing" className="text-sm leading-relaxed">
                          {t('request.form.validation.fields.acceptsMarketing')}
                        </Label>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:shadow-lg text-lg py-4"
                      disabled={!formData.acceptsTerms || (formData.email !== formData.emailConfirmation)}
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      {t('request.form.validation.submitButton')}
                    </Button>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          {t('request.form.validation.qualityCommitment')}
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
                    {t('request.sidebar.documents.title')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('request.sidebar.documents.subtitle')}
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
                    {t('request.sidebar.help.title')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="font-semibold text-primary">{t('request.sidebar.help.phone')}</div>
                    <div className="text-sm text-muted-foreground">{t('request.sidebar.help.schedule')}</div>
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      {t('request.sidebar.help.contactButton')}
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Sécurité */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {t('request.sidebar.security.title')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>{t('request.sidebar.security.features.0')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>{t('request.sidebar.security.features.1')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>{t('request.sidebar.security.features.2')}</span>
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