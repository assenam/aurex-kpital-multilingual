import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { Calculator, TrendingUp, CheckCircle, Info, Sparkles, Euro, Calendar, Percent } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const Simulator = () => {
  const { t } = useTranslation();
  const [loanAmount, setLoanAmount] = useState([25000]);
  const [duration, setDuration] = useState([60]);
  const [loanType, setLoanType] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [hasGuarantee, setHasGuarantee] = useState('');

  // Calcul des résultats
  const calculateResults = () => {
    const amount = loanAmount[0];
    const months = duration[0];
    
    // Taux basé sur le type de prêt et les critères
    let baseRate = 3.5; // Taux de base
    
    switch(loanType) {
      case 'personal': baseRate = 2.9; break;
      case 'auto': baseRate = 2.1; break;
      case 'real-estate': baseRate = 3.2; break;
      case 'professional': baseRate = 3.8; break;
      case 'student': baseRate = 1.5; break;
      default: baseRate = 3.5;
    }

    // Ajustements selon profil
    if (monthlyIncome && parseInt(monthlyIncome) > 4000) baseRate -= 0.3;
    if (hasGuarantee === 'yes') baseRate -= 0.5;
    if (months <= 24) baseRate -= 0.2;
    if (amount < 10000) baseRate += 0.3;

    const monthlyRate = baseRate / 100 / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      rate: Math.round(baseRate * 100) / 100
    };
  };

  const results = calculateResults();

  const loanTypes = [
    { value: 'personal', label: t('simulator.form.loanTypes.personal.label'), description: t('simulator.form.loanTypes.personal.description') },
    { value: 'auto', label: t('simulator.form.loanTypes.auto.label'), description: t('simulator.form.loanTypes.auto.description') },
    { value: 'real-estate', label: t('simulator.form.loanTypes.realEstate.label'), description: t('simulator.form.loanTypes.realEstate.description') },
    { value: 'professional', label: t('simulator.form.loanTypes.professional.label'), description: t('simulator.form.loanTypes.professional.description') },
    { value: 'student', label: t('simulator.form.loanTypes.student.label'), description: t('simulator.form.loanTypes.student.description') },
    { value: 'consolidation', label: t('simulator.form.loanTypes.consolidation.label'), description: t('simulator.form.loanTypes.consolidation.description') }
  ];

  const advantages = [
    { text: t('simulator.advantages.items.rates'), icon: Percent },
    { text: t('simulator.advantages.items.earlyRepayment'), icon: Calendar },
    { text: t('simulator.advantages.items.response'), icon: CheckCircle },
    { text: t('simulator.advantages.items.support'), icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-premium-dark"></div>
        <div className="absolute inset-0 grid-pattern opacity-15"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold/20 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gold/15 rounded-full blur-3xl float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="inline-block mb-6">
              <Badge className="px-6 py-2 bg-gold text-primary font-semibold text-sm">
                <Calculator className="h-4 w-4 mr-2" />
                {t('simulator.title')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('simulator.title')}
              <span className="text-gold block">{t('simulator.titleSecond')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('simulator.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="py-20 bg-gradient-soft-gray relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                    <Calculator className="h-6 w-6" />
                    {t('simulator.configuration.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('simulator.configuration.description')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-8">
                  {/* Type de prêt */}
                  <div>
                    <Label className="text-lg font-semibold text-primary mb-4 block">
                      {t('simulator.form.loanType')}
                    </Label>
                    <Select value={loanType} onValueChange={setLoanType}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={t('simulator.form.loanType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {loanTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Montant */}
                  <div>
                    <Label className="text-lg font-semibold text-primary mb-4 block">
                      {t('simulator.form.amount').replace('(€)', '')}: {loanAmount[0].toLocaleString()}€
                    </Label>
                    <Slider
                      value={loanAmount}
                      onValueChange={setLoanAmount}
                      max={500000}
                      min={1000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>1 000€</span>
                      <span>500 000€</span>
                    </div>
                  </div>

                  {/* Durée */}
                  <div>
                    <Label className="text-lg font-semibold text-primary mb-4 block">
                      {t('simulator.form.duration').replace('(mois)', '')}: {duration[0]} {t('simulator.result.units.months')} ({Math.round(duration[0]/12)} {t('simulator.result.units.years')})
                    </Label>
                    <Slider
                      value={duration}
                      onValueChange={setDuration}
                      max={300}
                      min={12}
                      step={6}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>12 {t('simulator.result.units.months')}</span>
                      <span>300 {t('simulator.result.units.months')} (25 {t('simulator.result.units.years')})</span>
                    </div>
                  </div>

                  {/* Revenus */}
                  <div>
                    <Label htmlFor="income" className="text-lg font-semibold text-primary mb-4 block">
                      {t('simulator.form.income')}
                    </Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder={t('simulator.form.income').includes('Ex:') ? t('simulator.form.income').split('Ex:')[1] : "3500"}
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="h-12"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('simulator.form.incomeHelper')}
                    </p>
                  </div>

                  {/* Garanties */}
                  <div>
                    <Label className="text-lg font-semibold text-primary mb-4 block">
                      {t('simulator.form.guarantee')}
                    </Label>
                    <Select value={hasGuarantee} onValueChange={setHasGuarantee}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={t('simulator.form.guarantee')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{t('simulator.form.guaranteeOptions.yes')}</SelectItem>
                        <SelectItem value="no">{t('simulator.form.guaranteeOptions.no')}</SelectItem>
                        <SelectItem value="maybe">{t('simulator.form.guaranteeOptions.maybe')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Résultats */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {t('simulator.result.title')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-gradient-primary rounded-xl text-primary-foreground">
                    <div className="text-3xl font-bold mb-2">
                      {results.monthlyPayment}€
                    </div>
                    <div className="text-sm opacity-90">
                      {t('simulator.result.monthlyPayment')}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-muted-foreground">{t('simulator.result.interestRate')}</span>
                      <span className="font-bold text-accent">{results.rate}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-muted-foreground">{t('simulator.result.totalCost')}</span>
                      <span className="font-bold">{results.totalInterest.toLocaleString()}€</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-muted-foreground">{t('simulator.result.totalRepayment')}</span>
                      <span className="font-bold">{results.totalPayment.toLocaleString()}€</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-primary hover:shadow-lg text-lg py-3" asChild>
                      <a href="/demande">
                        <Sparkles className="h-5 w-5 mr-2" />
                        {t('simulator.cta.buttons.request')}
                      </a>
                    </Button>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/contact">
                        {t('simulator.cta.buttons.consultant')}
                      </a>
                    </Button>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-amber-800">
                        <strong>Information :</strong> {t('simulator.result.disclaimer')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Avantages */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-primary">
                    {t('simulator.advantages.title')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {advantages.map((advantage, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <advantage.icon className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm text-muted-foreground">{advantage.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-elegant relative overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('simulator.cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('simulator.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-lg font-bold px-8 py-4" asChild>
                <a href="/demande">
                  <Euro className="h-5 w-5 mr-2" />
                  {t('simulator.cta.buttons.officialRequest')}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/services">
                  <Calculator className="h-5 w-5 mr-2" />
                  {t('simulator.cta.buttons.allServices')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Simulator;