import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  HelpCircle, Search, Clock, Shield, Euro, FileText, Users, 
  AlertCircle, CheckCircle, Phone, Mail, MessageCircle
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const FAQ = () => {
  const { t } = useTranslation();

  const categories = [
    {
      title: t('faq.categories.personalLoans.title'),
      icon: Euro,
      questions: [
        {
          question: t('faq.categories.personalLoans.questions.amounts.question'),
          answer: t('faq.categories.personalLoans.questions.amounts.answer')
        },
        {
          question: t('faq.categories.personalLoans.questions.rates.question'),
          answer: t('faq.categories.personalLoans.questions.rates.answer')
        },
        {
          question: t('faq.categories.personalLoans.questions.justification.question'),
          answer: t('faq.categories.personalLoans.questions.justification.answer')
        },
        {
          question: t('faq.categories.personalLoans.questions.timing.question'),
          answer: t('faq.categories.personalLoans.questions.timing.answer')
        }
      ]
    },
    {
      title: t('faq.categories.mortgage.title'),
      icon: Shield,
      questions: [
        {
          question: t('faq.categories.mortgage.questions.downPayment.question'),
          answer: t('faq.categories.mortgage.questions.downPayment.answer')
        },
        {
          question: t('faq.categories.mortgage.questions.propertyTypes.question'),
          answer: t('faq.categories.mortgage.questions.propertyTypes.answer')
        },
        {
          question: t('faq.categories.mortgage.questions.duration.question'),
          answer: t('faq.categories.mortgage.questions.duration.answer')
        },
        {
          question: t('faq.categories.mortgage.questions.rates.question'),
          answer: t('faq.categories.mortgage.questions.rates.answer')
        }
      ]
    },
    {
      title: t('faq.categories.investment.title'),
      icon: FileText,
      questions: [
        {
          question: t('faq.categories.investment.questions.minimum.question'),
          answer: t('faq.categories.investment.questions.minimum.answer')
        },
        {
          question: t('faq.categories.investment.questions.recommendations.question'),
          answer: t('faq.categories.investment.questions.recommendations.answer')
        },
        {
          question: t('faq.categories.investment.questions.guarantee.question'),
          answer: t('faq.categories.investment.questions.guarantee.answer')
        },
        {
          question: t('faq.categories.investment.questions.tracking.question'),
          answer: t('faq.categories.investment.questions.tracking.answer')
        }
      ]
    },
    {
      title: t('faq.categories.business.title'),
      icon: Users,
      questions: [
        {
          question: t('faq.categories.business.questions.amounts.question'),
          answer: t('faq.categories.business.questions.amounts.answer')
        },
        {
          question: t('faq.categories.business.questions.projects.question'),
          answer: t('faq.categories.business.questions.projects.answer')
        },
        {
          question: t('faq.categories.business.questions.guarantees.question'),
          answer: t('faq.categories.business.questions.guarantees.answer')
        },
        {
          question: t('faq.categories.business.questions.timeline.question'),
          answer: t('faq.categories.business.questions.timeline.answer')
        }
      ]
    },
    {
      title: t('faq.categories.account.title'),
      icon: HelpCircle,
      questions: [
        {
          question: t('faq.categories.account.questions.create.question'),
          answer: t('faq.categories.account.questions.create.answer')
        },
        {
          question: t('faq.categories.account.questions.documents.question'),
          answer: t('faq.categories.account.questions.documents.answer')
        },
        {
          question: t('faq.categories.account.questions.security.question'),
          answer: t('faq.categories.account.questions.security.answer')
        },
        {
          question: t('faq.categories.account.questions.support.question'),
          answer: t('faq.categories.account.questions.support.answer')
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-8">
                <HelpCircle className="h-4 w-4" />
                {t('faq.hero.badge')}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('faq.hero.title')} <span className="gradient-text">{t('faq.hero.titleHighlight')}</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                {t('faq.hero.description')}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('faq.hero.searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <div className="text-muted-foreground">{t('faq.stats.questions')}</div>
              </Card>
              <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">{t('faq.stats.satisfaction')}</div>
              </Card>
              <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">2h</div>
                <div className="text-muted-foreground">{t('faq.stats.responseTime')}</div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Categories Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {categories.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="p-8 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <category.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem 
                            key={faqIndex} 
                            value={`${categoryIndex}-${faqIndex}`}
                            className="border border-border/50 rounded-lg px-6"
                          >
                            <AccordionTrigger className="text-left hover:text-primary transition-colors py-6">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('faq.support.title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                {t('faq.support.description')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-8 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t('faq.support.phone.title')}</h3>
                  <p className="text-muted-foreground mb-4">{t('faq.support.phone.description')}</p>
                  <Badge variant="secondary" className="text-primary">
                    {t('faq.support.phone.hours')}
                  </Badge>
                </Card>

                <Card className="p-8 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t('faq.support.email.title')}</h3>
                  <p className="text-muted-foreground mb-4">{t('faq.support.email.description')}</p>
                  <Badge variant="secondary" className="text-primary">
                    {t('faq.support.email.response')}
                  </Badge>
                </Card>

                <Card className="p-8 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t('faq.support.chat.title')}</h3>
                  <p className="text-muted-foreground mb-4">{t('faq.support.chat.description')}</p>
                  <Badge variant="secondary" className="text-primary">
                    {t('faq.support.chat.availability')}
                  </Badge>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;