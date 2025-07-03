import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { Calendar, Globe, FileText, Shield, Trophy, Target, MessageCircle } from 'lucide-react';

const AboutPreview = () => {
  const { visibleElements } = useScrollAnimation();
  const offsetY = useParallax();

  const stats = [
    { value: "1997", label: "Fondée avec vision", icon: Calendar, gradient: "from-blue-500 to-indigo-600" },
    { value: "Hamburg", label: "Cœur de l'Europe", icon: Globe, gradient: "from-emerald-500 to-teal-600" },
    { value: "HRB 80635", label: "Excellence certifiée", icon: FileText, gradient: "from-purple-500 to-violet-600" },
    { value: "DE00976259", label: "Sécurité garantie", icon: Shield, gradient: "from-amber-500 to-orange-600" }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Parallax Background Effects */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      ></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gold/20 rounded-full blur-xl float" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 right-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Content */}
          <div 
            className="scroll-slide-right space-y-8"
            data-scroll-id="about-content"
            style={{ transform: `translateY(${offsetY * 0.1}px)` }}
          >
            <div className="inline-block mb-6">
              <span className="px-6 py-3 glass-card text-primary font-semibold text-sm tracking-wide uppercase rounded-full flex items-center gap-2">
                <Target className="h-4 w-4" />
                Pionniers depuis 25 ans
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Un quart de siècle 
              <span className="gradient-text block">d'innovation</span>
              <span className="text-accent">financière</span>
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-muted-foreground">
                <span className="text-accent font-semibold">Depuis Hamburg 1997</span>, 
                Aurex K-pital révolutionne l'accompagnement financier en combinant 
                <span className="text-primary font-semibold"> expertise traditionnelle</span> et 
                <span className="gradient-text font-semibold"> technologies de pointe</span>.
              </p>

              <p className="text-muted-foreground">
                Notre approche unique allie intelligence artificielle, analyses prédictives 
                et conseil humain personnalisé pour des solutions qui transforment 
                <span className="text-accent font-semibold"> réellement vos projets</span> en succès.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button 
                size="lg" 
                className="btn-magnetic hover-glow bg-gradient-primary hover:shadow-hover text-white font-bold px-8 py-4 text-lg transition-all duration-500 hover:scale-105 rounded-xl"
                asChild
              >
                <Link to="/a-propos" className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Notre Histoire
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                className="glass-card hover-lift text-primary border-primary/20 font-semibold px-8 py-4 text-lg rounded-xl"
                asChild
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Parlons Projet
                </Link>
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div 
            className="scroll-slide-left"
            data-scroll-id="about-stats"
            style={{ transform: `translateY(${offsetY * 0.05}px)` }}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.label} 
                  className={`
                    group tilt-card hover-lift p-6 text-center transition-all duration-500 border-0 overflow-hidden
                    bg-gradient-to-br from-background/80 to-secondary/30 backdrop-blur-sm
                  `}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Gradient Overlay */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500
                  `}></div>
                  
                  <CardContent className="p-0 relative z-10">
                    <div className="mb-4 group-hover:animate-glow transition-all duration-300 flex justify-center">
                      <stat.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div className={`
                      text-xl md:text-2xl font-bold mb-2 transition-all duration-300
                      bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent
                    `}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium leading-tight">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Trust Element */}
            <div className="mt-8 p-6 glass-card rounded-2xl text-center">
              <div className="mb-3 flex justify-center">
                <Trophy className="h-8 w-8 text-gold" />
              </div>
              <div className="text-lg font-semibold text-primary mb-2">
                Leader Européen Certifié
              </div>
              <div className="text-sm text-muted-foreground">
                Excellence reconnue en financement innovant
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;