import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, FileText, Scale, Users, CheckCircle, Building } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const Legal = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="inline-block mb-6">
              <Badge className="px-6 py-2 bg-gold text-primary font-semibold text-sm">
                <Scale className="h-4 w-4 mr-2" />
                {t('legal.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('legal.title.main')}
              <span className="text-gold block">{t('legal.title.subtitle')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('legal.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="mentions" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12">
              <TabsTrigger value="mentions">{t('legal.tabs.mentions')}</TabsTrigger>
              <TabsTrigger value="privacy">{t('legal.tabs.privacy')}</TabsTrigger>
              <TabsTrigger value="terms">{t('legal.tabs.terms')}</TabsTrigger>
              <TabsTrigger value="gdpr">{t('legal.tabs.gdpr')}</TabsTrigger>
            </TabsList>

            {/* Mentions Légales */}
            <TabsContent value="mentions">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-primary">
                    <Building className="h-6 w-6" />
                    {t('legal.mentions.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('legal.mentions.description')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="prose prose-lg max-w-none space-y-8">
                  <div className="grid gap-6">
                    {/* Company Information */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.company.title')}</h3>
                      <div className="bg-secondary/30 p-6 rounded-lg space-y-2">
                        <p><strong>{t('legal.mentions.company.name')}:</strong> Aurex K-pital GmbH</p>
                        <p><strong>{t('legal.mentions.company.type')}:</strong> {t('legal.mentions.company.typeValue')}</p>
                        <p><strong>{t('legal.mentions.company.capital')}:</strong> 2 500 000 €</p>
                        <p><strong>{t('legal.mentions.company.address')}:</strong> Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne</p>
                        <p><strong>{t('legal.mentions.company.register')}:</strong> Hamburg HRB 147852</p>
                        <p><strong>{t('legal.mentions.company.vat')}:</strong> DE 312 456 789</p>
                        <p><strong>{t('legal.mentions.company.siren')}:</strong> 523 456 789</p>
                      </div>
                    </div>

                    {/* Management */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.management.title')}</h3>
                      <div className="space-y-2">
                        <p><strong>{t('legal.mentions.management.ceo')}:</strong> Dr. Klaus Müller</p>
                        <p><strong>{t('legal.mentions.management.cio')}:</strong> Sophie Laurent</p>
                        <p><strong>{t('legal.mentions.management.cro')}:</strong> Marco Antonelli</p>
                      </div>
                    </div>

                    {/* Activity */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.activity.title')}</h3>
                      <p className="mb-4">{t('legal.mentions.activity.description')}</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>{t('legal.mentions.activity.services.banking')}</li>
                        <li>{t('legal.mentions.activity.services.investment')}</li>
                        <li>{t('legal.mentions.activity.services.insurance')}</li>
                        <li>{t('legal.mentions.activity.services.wealth')}</li>
                      </ul>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.contact.title')}</h3>
                      <div className="bg-secondary/30 p-6 rounded-lg space-y-2">
                        <p><strong>{t('legal.mentions.contact.phone')}:</strong> +33759282004</p>
                        <p><strong>{t('legal.mentions.contact.email')}:</strong> contact@aurex-kpital.de</p>
                        <p><strong>{t('legal.mentions.contact.hours')}:</strong> {t('legal.mentions.contact.schedule')}</p>
                      </div>
                    </div>

                    {/* Hosting */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.hosting.title')}</h3>
                      <p className="mb-4">{t('legal.mentions.hosting.description')}</p>
                      <div className="bg-secondary/30 p-6 rounded-lg">
                        <p><strong>Amazon Web Services EMEA SARL</strong><br />
                        38 Avenue John F. Kennedy, L-1855 Luxembourg<br />
                        Téléphone: +33759282004</p>
                      </div>
                    </div>

                    {/* Intellectual Property */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.intellectual.title')}</h3>
                      <p>{t('legal.mentions.intellectual.description')}</p>
                    </div>

                    {/* Responsibility */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.responsibility.title')}</h3>
                      <p>{t('legal.mentions.responsibility.description')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Policy */}
            <TabsContent value="privacy">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-primary">
                    <Shield className="h-6 w-6" />
                    {t('legal.privacy.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('legal.privacy.description')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="prose prose-lg max-w-none space-y-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-blue-800 mb-2">{t('legal.privacy.lastUpdate')}</h4>
                        <p className="text-blue-700">{t('legal.privacy.compliance')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    {/* Data Controller */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.controller.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.controller.content')}</div>
                    </div>

                    {/* Data Collected */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.dataCollected.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.dataCollected.content')}</div>
                    </div>

                    {/* Purposes */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.purposes.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.purposes.content')}</div>
                    </div>

                    {/* Legal Basis */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.legalBasis.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.legalBasis.content')}</div>
                    </div>

                    {/* Data Sharing */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.dataSharing.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.dataSharing.content')}</div>
                    </div>

                    {/* Data Retention */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.retention.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.retention.content')}</div>
                    </div>

                    {/* Your Rights */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.rights.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.rights.content')}</div>
                    </div>

                    {/* Security */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.security.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.security.content')}</div>
                    </div>

                    {/* International Transfers */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.transfers.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.transfers.content')}</div>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.contact.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.privacy.sections.contact.content')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Terms and Conditions */}
            <TabsContent value="terms">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-primary">
                    <FileText className="h-6 w-6" />
                    {t('legal.terms.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('legal.terms.description')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="prose prose-lg max-w-none space-y-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-800 mb-2">{t('legal.terms.effectiveDate')}</h4>
                        <p className="text-green-700">{t('legal.terms.lastUpdate')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    {/* Object */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.object.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.terms.sections.object.content')}</div>
                    </div>

                    {/* Services */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.services.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.terms.sections.services.content')}</div>
                    </div>

                    {/* Registration */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.registration.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.terms.sections.registration.content')}</div>
                    </div>

                    {/* Obligations */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.obligations.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.terms.sections.obligations.content')}</div>
                    </div>

                    {/* Fees */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.fees.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.terms.sections.fees.content')}</div>
                    </div>

                    {/* Responsibility */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.responsibility.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.terms.sections.responsibility.content')}</div>
                    </div>

                    {/* Termination */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.termination.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.terms.sections.termination.content')}</div>
                    </div>

                    {/* Applicable Law */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.applicableLaw.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.terms.sections.applicableLaw.content')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* GDPR Compliance */}
            <TabsContent value="gdpr">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-primary">
                    <Users className="h-6 w-6" />
                    {t('legal.gdpr.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('legal.gdpr.description')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="prose prose-lg max-w-none space-y-8">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-purple-800 mb-2">{t('legal.gdpr.compliance')}</h4>
                        <p className="text-purple-700">{t('legal.gdpr.commitment')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    {/* Principles */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.gdpr.sections.principles.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.gdpr.sections.principles.content')}</div>
                    </div>

                    {/* Rights */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.gdpr.sections.rights.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.gdpr.sections.rights.content')}</div>
                    </div>

                    {/* Procedures */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.gdpr.sections.procedures.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.gdpr.sections.procedures.content')}</div>
                    </div>

                    {/* Breach */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.gdpr.sections.breach.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.gdpr.sections.breach.content')}</div>
                    </div>

                    {/* DPO */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.gdpr.sections.dpo.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.gdpr.sections.dpo.content')}</div>
                    </div>

                    {/* Training */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.gdpr.sections.training.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.gdpr.sections.training.content')}</div>
                    </div>

                    {/* Updates */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.gdpr.sections.updates.title')}</h3>
                      <div className="whitespace-pre-line">{t('legal.gdpr.sections.updates.content')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Legal;