import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, FileText, Scale, AlertCircle, Calendar, 
  Building, Mail, Phone, Globe, CheckCircle, Lock
} from 'lucide-react';
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
                
                <CardContent className="prose prose-lg max-w-none">
                  <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.company.title')}</h3>
                  <div className="bg-secondary/30 p-6 rounded-lg mb-6">
                    <p><strong>{t('legal.mentions.company.name')}:</strong> Aurex K-pital GmbH</p>
                    <p><strong>{t('legal.mentions.company.type')}:</strong> {t('legal.mentions.company.typeValue')}</p>
                    <p><strong>{t('legal.mentions.company.capital')}:</strong> 2 500 000 €</p>
                    <p><strong>{t('legal.mentions.company.address')}:</strong> Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne</p>
                    <p><strong>{t('legal.mentions.company.register')}:</strong> Hamburg HRB 147852</p>
                    <p><strong>{t('legal.mentions.company.vat')}:</strong> DE 312 456 789</p>
                    <p><strong>{t('legal.mentions.company.siren')}:</strong> 523 456 789</p>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.management.title')}</h3>
                  <p><strong>{t('legal.mentions.management.ceo')}:</strong> Dr. Klaus Müller</p>
                  <p><strong>{t('legal.mentions.management.cio')}:</strong> Sophie Laurent</p>
                  <p><strong>{t('legal.mentions.management.cro')}:</strong> Marco Antonelli</p>

                  <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.activity.title')}</h3>
                  <p>{t('legal.mentions.activity.description')}</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>{t('legal.mentions.activity.services.banking')}</li>
                    <li>{t('legal.mentions.activity.services.investment')}</li>
                    <li>{t('legal.mentions.activity.services.insurance')}</li>
                    <li>{t('legal.mentions.activity.services.wealth')}</li>
                  </ul>

                  <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.contact.title')}</h3>
                  <div className="bg-secondary/30 p-6 rounded-lg mb-6">
                    <p><strong>{t('legal.mentions.contact.phone')}:</strong> +33759282004</p>
                    <p><strong>{t('legal.mentions.contact.email')}:</strong> contact@aurex-kpital.de</p>
                    <p><strong>{t('legal.mentions.contact.hours')}:</strong> {t('legal.mentions.contact.schedule')}</p>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.hosting.title')}</h3>
                  <p>{t('legal.mentions.hosting.description')}</p>
                  <p><strong>Amazon Web Services EMEA SARL</strong><br />
                  38 Avenue John F. Kennedy, L-1855 Luxembourg<br />
                  {t('legal.mentions.contact.phone')}: +33759282004</p>

                  <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.intellectual.title')}</h3>
                  <p>{t('legal.mentions.intellectual.description')}</p>

                  <h3 className="text-xl font-bold text-primary mb-4">{t('legal.mentions.responsibility.title')}</h3>
                  <p>{t('legal.mentions.responsibility.description')}</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Politique de Confidentialité */}
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
                
                <CardContent className="prose prose-lg max-w-none">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-blue-800 mb-2">{t('legal.privacy.lastUpdate')}</h4>
                        <p className="text-blue-700">{t('legal.privacy.compliance')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 1 - Responsable du Traitement */}
                  {t('legal.privacy.sections.controller.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.controller.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.controller.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">1. Responsable du Traitement</h3>
                      <p>Aurex K-pital GmbH, société immatriculée sous le numéro HRB 147852 au registre du commerce de Hamburg, dont le siège social est situé Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne.</p>
                      <p><strong>Délégué à la Protection des Données :</strong> privacy@aurex-kpital.de</p>
                    </>
                  )}

                  {/* Section 2 - Données Collectées */}
                  {t('legal.privacy.sections.dataCollected.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.dataCollected.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.dataCollected.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">2. Données Collectées</h3>
                      <p>Nous collectons les catégories de données suivantes :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Données d'identification :</strong> nom, prénom, date de naissance, nationalité</li>
                        <li><strong>Coordonnées :</strong> adresse postale, email, téléphone</li>
                        <li><strong>Données financières :</strong> revenus, patrimoine, historique bancaire</li>
                        <li><strong>Données de connexion :</strong> adresse IP, cookies, logs de navigation</li>
                        <li><strong>Données comportementales :</strong> interactions avec nos services</li>
                      </ul>
                    </>
                  )}

                  {/* Section 3 - Finalités du Traitement */}
                  {t('legal.privacy.sections.purposes.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.purposes.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.purposes.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">3. Finalités du Traitement</h3>
                      <p>Vos données sont traitées pour :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>L'exécution de nos services financiers</li>
                        <li>L'évaluation de votre solvabilité</li>
                        <li>La prévention de la fraude et le blanchiment</li>
                        <li>Le respect de nos obligations légales</li>
                        <li>L'amélioration de nos services</li>
                        <li>La communication commerciale (avec votre consentement)</li>
                      </ul>
                    </>
                  )}
                  {/* Section 4 - Base Légale */}
                  {t('legal.privacy.sections.legalBasis.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.legalBasis.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.legalBasis.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">4. Base Légale</h3>
                      <p>Nos traitements sont fondés sur :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Exécution contractuelle :</strong> pour la fourniture de nos services</li>
                        <li><strong>Obligation légale :</strong> conformité réglementaire (KYC, AML)</li>
                        <li><strong>Intérêt légitime :</strong> prévention de la fraude, amélioration des services</li>
                        <li><strong>Consentement :</strong> communications marketing, cookies non essentiels</li>
                      </ul>
                    </>
                  )}

                  {/* Section 5 - Partage des Données */}
                  {t('legal.privacy.sections.dataSharing.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.dataSharing.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.dataSharing.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">5. Partage des Données</h3>
                      <p>Vos données peuvent être partagées avec :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Nos partenaires bancaires et financiers</li>
                        <li>Les organismes de crédit et d'assurance</li>
                        <li>Les autorités de régulation (BaFin, ACPR)</li>
                        <li>Nos prestataires techniques (sous contrat strict)</li>
                        <li>Les autorités judiciaires sur réquisition</li>
                      </ul>
                    </>
                  )}

                  {/* Section 6 - Conservation des Données */}
                  {t('legal.privacy.sections.retention.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.retention.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.retention.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">6. Conservation des Données</h3>
                      <p>Nous conservons vos données :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Données client actif :</strong> durée de la relation + 5 ans</li>
                        <li><strong>Données financières :</strong> 10 ans après la fin du contrat</li>
                        <li><strong>Données de connexion :</strong> 13 mois maximum</li>
                        <li><strong>Données marketing :</strong> 3 ans après le dernier contact</li>
                      </ul>
                    </>
                  )}

                  {/* Section 7 - Vos Droits */}
                  {t('legal.privacy.sections.rights.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.rights.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.rights.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">7. Vos Droits</h3>
                      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                        <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                        <li><strong>Droit à l'effacement :</strong> supprimer vos données (sous conditions)</li>
                        <li><strong>Droit de limitation :</strong> restreindre le traitement</li>
                        <li><strong>Droit de portabilité :</strong> récupérer vos données</li>
                        <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                        <li><strong>Droit de retrait du consentement</strong></li>
                      </ul>
                      <p><strong>Pour exercer vos droits :</strong> privacy@aurex-kpital.de</p>
                    </>
                  )}

                  {/* Section 8 - Sécurité */}
                  {t('legal.privacy.sections.security.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.security.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.security.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">8. Sécurité</h3>
                      <p>Nous mettons en place des mesures techniques et organisationnelles appropriées :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Chiffrement des données (AES-256)</li>
                        <li>Accès restreint et contrôlé</li>
                        <li>Surveillance continue des systèmes</li>
                        <li>Formation régulière du personnel</li>
                        <li>Audits de sécurité périodiques</li>
                      </ul>
                    </>
                  )}

                  {/* Section 9 - Transferts Internationaux */}
                  {t('legal.privacy.sections.transfers.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.transfers.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.transfers.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">9. Transferts Internationaux</h3>
                      <p>Certaines données peuvent être transférées vers des pays tiers avec des garanties appropriées (clauses contractuelles types, décisions d'adéquation de la Commission européenne).</p>
                    </>
                  )}

                  {/* Section 10 - Contact */}
                  {t('legal.privacy.sections.contact.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.privacy.sections.contact.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.privacy.sections.contact.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">10. Contact</h3>
                      <p>Pour toute question relative à cette politique :</p>
                      <p><strong>Email :</strong> privacy@aurex-kpital.de<br />
                      <strong>Courrier :</strong> Aurex K-pital - DPO, Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne</p>
                      <p>Vous avez également le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente (CNIL en France, BfDI en Allemagne).</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conditions Générales d'Utilisation */}
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
                
                <CardContent className="prose prose-lg max-w-none">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-amber-800 mb-2">Version en vigueur au 1er décembre 2024</h4>
                        <p className="text-amber-700">Ces conditions s'appliquent à tous les utilisateurs de nos services.</p>
                      </div>
                    </div>
                  </div>

                  {/* Article 1 */}
                  {t('legal.terms.sections.article1.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article1.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article1.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 1 - Objet</h3>
                      <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation des services proposés par Aurex K-pital GmbH via sa plateforme digitale et ses canaux de distribution.</p>
                    </>
                  )}

                  {/* Article 2 */}
                  {t('legal.terms.sections.article2.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article2.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article2.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 2 - Acceptation des Conditions</h3>
                      <p>L'utilisation de nos services implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services.</p>
                    </>
                  )}

                  {/* Article 3 */}
                  {t('legal.terms.sections.article3.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article3.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article3.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 3 - Services Proposés</h3>
                      <p>Aurex K-pital propose les services suivants :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Courtage en opérations bancaires</li>
                        <li>Conseil en investissements financiers</li>
                        <li>Intermédiation en assurance</li>
                        <li>Gestion de patrimoine</li>
                        <li>Outils de simulation et d'analyse</li>
                      </ul>
                    </>
                  )}

                  {/* Article 4 */}
                  {t('legal.terms.sections.article4.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article4.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article4.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 4 - Conditions d'Accès</h3>
                      <p>Pour accéder à nos services, vous devez :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Être majeur et avoir la capacité juridique</li>
                        <li>Résider dans l'Union Européenne</li>
                        <li>Fournir des informations exactes et complètes</li>
                        <li>Respecter les lois et réglementations applicables</li>
                      </ul>
                    </>
                  )}

                  {/* Article 5 */}
                  {t('legal.terms.sections.article5.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article5.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article5.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 5 - Compte Utilisateur</h3>
                      <p>La création d'un compte nécessite :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>La fourniture d'informations véridiques</li>
                        <li>La création d'un mot de passe sécurisé</li>
                        <li>La validation de votre identité (KYC)</li>
                        <li>L'acceptation de nos politiques</li>
                      </ul>
                      <p>Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte.</p>
                    </>
                  )}

                  {/* Article 6 */}
                  {t('legal.terms.sections.article6.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article6.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article6.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 6 - Obligations de l'Utilisateur</h3>
                      <p>En utilisant nos services, vous vous engagez à :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Fournir des informations exactes et les maintenir à jour</li>
                        <li>Utiliser les services conformément à leur destination</li>
                        <li>Ne pas porter atteinte à la sécurité des systèmes</li>
                        <li>Respecter les droits de propriété intellectuelle</li>
                        <li>Ne pas utiliser les services à des fins illégales</li>
                      </ul>
                    </>
                  )}

                  {/* Article 7 */}
                  {t('legal.terms.sections.article7.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article7.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article7.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 7 - Responsabilité d'Aurex K-pital</h3>
                      <p>Aurex K-pital s'engage à :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Fournir des services avec diligence et professionnalisme</li>
                        <li>Respecter la réglementation financière en vigueur</li>
                        <li>Protéger vos données personnelles</li>
                        <li>Maintenir la sécurité de ses systèmes</li>
                      </ul>
                      <p>Notre responsabilité est limitée aux préjudices directs et prévisibles. Nous ne pouvons être tenus responsables des pertes financières résultant de vos décisions d'investissement.</p>
                    </>
                  )}

                  {/* Article 8 */}
                  {t('legal.terms.sections.article8.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article8.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article8.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 8 - Propriété Intellectuelle</h3>
                      <p>Tous les éléments de la plateforme (textes, images, logos, logiciels) sont protégés par les droits de propriété intellectuelle. Toute utilisation non autorisée est interdite.</p>
                    </>
                  )}

                  {/* Article 9 */}
                  {t('legal.terms.sections.article9.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article9.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article9.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 9 - Disponibilité du Service</h3>
                      <p>Nous nous efforçons d'assurer une disponibilité maximale de nos services. Cependant, des interruptions peuvent survenir pour maintenance, mise à jour ou cas de force majeure.</p>
                    </>
                  )}

                  {/* Article 10 */}
                  {t('legal.terms.sections.article10.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article10.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article10.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 10 - Modification des CGU</h3>
                      <p>Ces CGU peuvent être modifiées à tout moment. Les modifications entrent en vigueur dès leur publication sur la plateforme. Il vous appartient de consulter régulièrement ces conditions.</p>
                    </>
                  )}

                  {/* Article 11 */}
                  {t('legal.terms.sections.article11.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article11.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article11.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 11 - Résiliation</h3>
                      <p>Vous pouvez résilier votre compte à tout moment. Nous nous réservons le droit de suspendre ou fermer un compte en cas de violation des présentes CGU.</p>
                    </>
                  )}

                  {/* Article 12 */}
                  {t('legal.terms.sections.article12.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article12.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article12.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 12 - Droit Applicable et Juridiction</h3>
                      <p>Ces CGU sont régies par le droit allemand. En cas de litige, les tribunaux de Hamburg sont seuls compétents, sauf disposition légale contraire.</p>
                    </>
                  )}

                  {/* Article 13 */}
                  {t('legal.terms.sections.article13.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.article13.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.article13.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Article 13 - Médiation</h3>
                      <p>En cas de litige, vous pouvez recourir à la médiation auprès du médiateur de l'Association des Banques Allemandes (Bankenverband) avant toute action judiciaire.</p>
                    </>
                  )}

                  {/* Contact */}
                  {t('legal.terms.sections.contact.title') ? (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">{t('legal.terms.sections.contact.title')}</h3>
                      <div className="whitespace-pre-line mb-6">{t('legal.terms.sections.contact.content')}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-primary mb-4">Contact</h3>
                      <p>Pour toute question relative aux CGU :<br />
                      <strong>Email :</strong> legal@aurex-kpital.de<br />
                      <strong>Adresse :</strong> Aurex K-pital GmbH, Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* RGPD */}
            <TabsContent value="gdpr">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-primary">
                    <Shield className="h-6 w-6" />
                    {t('legal.gdpr.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('legal.gdpr.description')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="prose prose-lg max-w-none">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-800 mb-2">Certification RGPD Compliant</h4>
                        <p className="text-green-700">Aurex K-pital est certifié conforme au Règlement Général sur la Protection des Données depuis mai 2018.</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4">Notre Engagement RGPD</h3>
                  <p>Aurex K-pital s'engage pleinement dans la protection de vos données personnelles conformément au Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (RGPD).</p>

                  <h3 className="text-xl font-bold text-primary mb-4">Gouvernance des Données</h3>
                  <h4 className="text-lg font-semibold text-primary mb-3">Délégué à la Protection des Données (DPO)</h4>
                  <div className="bg-secondary/30 p-6 rounded-lg mb-6">
                    <p><strong>Nom :</strong> Dr. Sarah Weber</p>
                    <p><strong>Qualifications :</strong> Juriste spécialisée en droit numérique, certifiée CIPP/E</p>
                    <p><strong>Contact :</strong> dpo@aurex-kpital.de</p>
                    <p><strong>Mission :</strong> Supervision de la conformité, conseil et formation, point de contact avec les autorités de contrôle</p>
                  </div>

                  <h4 className="text-lg font-semibold text-primary mb-3">Comité de Protection des Données</h4>
                  <p>Un comité pluridisciplinaire se réunit mensuellement pour :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Évaluer les nouveaux traitements de données</li>
                    <li>Conduire les analyses d'impact (AIPD)</li>
                    <li>Superviser les incidents de sécurité</li>
                    <li>Mettre à jour les procédures internes</li>
                  </ul>

                  <h3 className="text-xl font-bold text-primary mb-4">Registre des Activités de Traitement</h3>
                  <p>Conformément à l'article 30 du RGPD, nous tenons un registre détaillé de toutes nos activités de traitement :</p>
                  
                  <h4 className="text-lg font-semibold text-primary mb-3">Traitements Principaux</h4>
                  <div className="space-y-4">
                    <div className="border border-secondary rounded-lg p-4">
                      <h5 className="font-semibold text-primary mb-2">Gestion de la Relation Client</h5>
                      <p><strong>Finalité :</strong> Exécution des contrats, suivi commercial</p>
                      <p><strong>Base légale :</strong> Exécution du contrat, intérêt légitime</p>
                      <p><strong>Données :</strong> Identité, contact, situation financière</p>
                      <p><strong>Conservation :</strong> Durée de la relation + 5 ans</p>
                    </div>
                    
                    <div className="border border-secondary rounded-lg p-4">
                      <h5 className="font-semibold text-primary mb-2">Évaluation du Risque de Crédit</h5>
                      <p><strong>Finalité :</strong> Analyse de solvabilité, prévention du surendettement</p>
                      <p><strong>Base légale :</strong> Obligation légale, intérêt légitime</p>
                      <p><strong>Données :</strong> Historique bancaire, revenus, patrimoine</p>
                      <p><strong>Conservation :</strong> 10 ans après fin du contrat</p>
                    </div>
                    
                    <div className="border border-secondary rounded-lg p-4">
                      <h5 className="font-semibold text-primary mb-2">Lutte Anti-Blanchiment (LAB)</h5>
                      <p><strong>Finalité :</strong> Respect des obligations réglementaires</p>
                      <p><strong>Base légale :</strong> Obligation légale</p>
                      <p><strong>Données :</strong> KYC, transactions, alertes</p>
                      <p><strong>Conservation :</strong> 5 ans minimum</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4">Mesures de Sécurité</h3>
                  <h4 className="text-lg font-semibold text-primary mb-3">Sécurité Technique</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Chiffrement :</strong> AES-256 pour les données au repos, TLS 1.3 pour les transmissions</li>
                    <li><strong>Contrôle d'accès :</strong> Authentification multi-facteurs, principe du moindre privilège</li>
                    <li><strong>Surveillance :</strong> Monitoring 24/7, détection d'intrusion automatisée</li>
                    <li><strong>Sauvegarde :</strong> Backup chiffré quotidien, test de restauration mensuel</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-primary mb-3">Sécurité Organisationnelle</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Formation :</strong> Sensibilisation RGPD obligatoire pour tous les employés</li>
                    <li><strong>Gestion des incidents :</strong> Procédure de notification sous 72h</li>
                    <li><strong>Audits :</strong> Audit de sécurité externe annuel</li>
                    <li><strong>Contractualisation :</strong> Clauses RGPD avec tous les sous-traitants</li>
                  </ul>

                  <h3 className="text-xl font-bold text-primary mb-4">Transferts Internationaux</h3>
                  <p>Les transferts de données hors UE sont encadrés par :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Clauses Contractuelles Types (CCT) 2021</strong> approuvées par la Commission européenne</li>
                    <li><strong>Mesures de protection supplémentaires</strong> (chiffrement, pseudonymisation)</li>
                    <li><strong>Évaluation préalable</strong> du niveau de protection du pays tiers</li>
                    <li><strong>Mécanismes de suspension</strong> en cas de non-respect des garanties</li>
                  </ul>

                  <h3 className="text-xl font-bold text-primary mb-4">Exercice de vos Droits</h3>
                  <h4 className="text-lg font-semibold text-primary mb-3">Processus Simplifié</h4>
                  <div className="bg-secondary/30 p-6 rounded-lg mb-6">
                    <p><strong>Portail dédié :</strong> rights.aurex-kpital.de</p>
                    <p><strong>Email :</strong> privacy@aurex-kpital.de</p>
                    <p><strong>Courrier :</strong> DPO - Aurex K-pital, Irma-Keilhack-Ring 24, 22145 Hamburg</p>
                    <p><strong>Délai de réponse :</strong> 1 mois maximum (extensible à 3 mois si complexe)</p>
                  </div>

                  <h4 className="text-lg font-semibold text-primary mb-3">Droits Disponibles</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-secondary rounded-lg p-4">
                      <h5 className="font-semibold text-primary mb-2">Droit d'Accès</h5>
                      <p className="text-sm text-muted-foreground">Obtenir une copie de toutes vos données et informations sur leur traitement</p>
                    </div>
                    <div className="border border-secondary rounded-lg p-4">
                      <h5 className="font-semibold text-primary mb-2">Droit de Rectification</h5>
                      <p className="text-sm text-muted-foreground">Corriger ou compléter vos données inexactes ou incomplètes</p>
                    </div>
                    <div className="border border-secondary rounded-lg p-4">
                      <h5 className="font-semibold text-primary mb-2">Droit à l'Effacement</h5>
                      <p className="text-sm text-muted-foreground">Demander la suppression de vos données (sous conditions)</p>
                    </div>
                    <div className="border border-secondary rounded-lg p-4">
                      <h5 className="font-semibold text-primary mb-2">Droit de Portabilité</h5>
                      <p className="text-sm text-muted-foreground">Récupérer vos données dans un format structuré</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4">Analyses d'Impact (AIPD)</h3>
                  <p>Nous conduisons systématiquement des AIPD pour :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Tout nouveau produit ou service</li>
                    <li>Les modifications des traitements existants</li>
                    <li>L'utilisation de nouvelles technologies</li>
                    <li>Les traitements à risque élevé</li>
                  </ul>

                  <h3 className="text-xl font-bold text-primary mb-4">Violations de Données</h3>
                  <p>En cas de violation de données personnelles :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Notification CNIL :</strong> Sous 72h si risque pour les droits et libertés</li>
                    <li><strong>Information des personnes :</strong> Sans délai si risque élevé</li>
                    <li><strong>Mesures correctives :</strong> Immédiate pour limiter l'impact</li>
                    <li><strong>Documentation :</strong> Registre de tous les incidents</li>
                  </ul>

                  <h3 className="text-xl font-bold text-primary mb-4">Certification et Audits</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-secondary/30 p-6 rounded-lg">
                      <h4 className="font-semibold text-primary mb-3">Certifications</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ ISO 27001 (Sécurité de l'information)</li>
                        <li>✓ SOC 2 Type II (Contrôles organisationnels)</li>
                        <li>✓ GDPR Compliance (Certification annuelle)</li>
                      </ul>
                    </div>
                    <div className="bg-secondary/30 p-6 rounded-lg">
                      <h4 className="font-semibold text-primary mb-3">Audits</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Audit RGPD externe annuel</li>
                        <li>• Audit de sécurité semestriel</li>
                        <li>• Tests d'intrusion trimestriels</li>
                        <li>• Audit interne mensuel</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4">Contact et Réclamation</h3>
                  <p>Pour toute question ou réclamation relative au RGPD :</p>
                  <div className="bg-secondary/30 p-6 rounded-lg mb-6">
                    <p><strong>DPO :</strong> Dr. Sarah Weber - dpo@aurex-kpital.de</p>
                    <p><strong>Équipe Privacy :</strong> privacy@aurex-kpital.de</p>
                    <p><strong>Téléphone :</strong> +33759282004 (ligne dédiée)</p>
                  </div>

                  <p>Vous disposez également du droit d'introduire une réclamation auprès des autorités de contrôle :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Allemagne :</strong> BfDI (Bundesbeauftragte für den Datenschutz)</li>
                    <li><strong>France :</strong> CNIL (Commission Nationale de l'Informatique et des Libertés)</li>
                    <li><strong>UE :</strong> Autorité de contrôle de votre pays de résidence</li>
                  </ul>
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