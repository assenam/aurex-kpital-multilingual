import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Calendar, Globe, Shield, Trophy, Target, Users, Award, 
  Sparkles, TrendingUp, Heart, Lightbulb, CheckCircle,
  Building2, Briefcase, GraduationCap, MapPin, Phone, Mail
} from 'lucide-react';

const About = () => {
  const { t, language } = useTranslation();
  
  const getContent = () => {
    switch (language) {
      case 'fr':
        return {
          badge: "À PROPOS DE NOUS",
          title: "Notre Histoire",
          subtitle: "Découvrez comment nous sommes devenus votre partenaire de confiance en transport et logistique",
          storyTitle: "Notre Parcours",
          storyText: "Depuis notre création, nous nous sommes engagés à fournir des solutions de transport innovantes et fiables. Notre équipe expérimentée travaille sans relâche pour dépasser vos attentes et garantir la satisfaction de nos clients à travers l'Europe.",
          timelineTitle: "Moments Clés",
          valuesTitle: "Nos Valeurs",
          teamTitle: "Notre Équipe",
          certTitle: "Certifications",
          contactTitle: "Nous Contacter"
        };
      case 'de':
        return {
          badge: "ÜBER UNS",
          title: "Unsere Geschichte", 
          subtitle: "Erfahren Sie, wie wir zu Ihrem vertrauenswürdigen Partner für Transport und Logistik geworden sind",
          storyTitle: "Unser Weg",
          storyText: "Seit unserer Gründung haben wir uns verpflichtet, innovative und zuverlässige Transportlösungen zu bieten. Unser erfahrenes Team arbeitet unermüdlich daran, Ihre Erwartungen zu übertreffen und die Zufriedenheit unserer Kunden in ganz Europa zu gewährleisten.",
          timelineTitle: "Wichtige Meilensteine",
          valuesTitle: "Unsere Werte",
          teamTitle: "Unser Team",
          certTitle: "Zertifizierungen", 
          contactTitle: "Kontaktieren Sie uns"
        };
      case 'pl':
        return {
          badge: "O NAS",
          title: "Nasza Historia",
          subtitle: "Dowiedz się, jak staliśmy się Twoim zaufanym partnerem w transporcie i logistyce",
          storyTitle: "Nasza Droga", 
          storyText: "Od naszego powstania zobowiązaliśmy się do dostarczania innowacyjnych i niezawodnych rozwiązań transportowych. Nasz doświadczony zespół pracuje niestrudzenie, aby przekroczyć Twoje oczekiwania i zapewnić zadowolenie klientów w całej Europie.",
          timelineTitle: "Kluczowe Momenty",
          valuesTitle: "Nasze Wartości",
          teamTitle: "Nasz Zespół",
          certTitle: "Certyfikaty",
          contactTitle: "Skontaktuj się z nami"
        };
      case 'fi':
        return {
          badge: "TIETOA MEISTÄ",
          title: "Tarinaamme",
          subtitle: "Opi, kuinka meistä tuli luotettava kumppanisi kuljetuksissa ja logistiikassa",
          storyTitle: "Matkamme",
          storyText: "Perustamisestamme lähtien olemme sitoutuneet tarjoamaan innovatiivisia ja luotettavia kuljetusratkaisuja. Kokenut tiimimme työskentelee väsymättä ylittääkseen odotuksesi ja varmistaakseen asiakastyytyväisyyden kaikkialla Euroopassa.",
          timelineTitle: "Tärkeät Virstanpylväät",
          valuesTitle: "Arvomme",
          teamTitle: "Tiimimme", 
          certTitle: "Sertifikaatit",
          contactTitle: "Ota yhteyttä"
        };
      case 'es':
        return {
          badge: "SOBRE NOSOTROS",
          title: "Nuestra Historia",
          subtitle: "Descubre cómo nos convertimos en tu socio de confianza en transporte y logística",
          storyTitle: "Nuestro Camino",
          storyText: "Desde nuestros inicios, nos hemos comprometido a proporcionar soluciones de transporte innovadoras y confiables. Nuestro equipo experimentado trabaja incansablemente para superar sus expectativas y garantizar la satisfacción del cliente en toda Europa.",
          timelineTitle: "Hitos Clave",
          valuesTitle: "Nuestros Valores",
          teamTitle: "Nuestro Equipo",
          certTitle: "Certificaciones",
          contactTitle: "Contáctanos"
        };
      case 'pt':
        return {
          badge: "SOBRE NÓS",
          title: "Nossa História", 
          subtitle: "Descubra como nos tornamos seu parceiro de confiança em transporte e logística",
          storyTitle: "Nossa Jornada",
          storyText: "Desde nosso início, nos comprometemos a fornecer soluções de transporte inovadoras e confiáveis. Nossa equipe experiente trabalha incansavelmente para superar suas expectativas e garantir a satisfação do cliente em toda a Europa.",
          timelineTitle: "Marcos Importantes",
          valuesTitle: "Nossos Valores",
          teamTitle: "Nossa Equipe",
          certTitle: "Certificações",
          contactTitle: "Entre em Contato"
        };
      case 'el':
        return {
          badge: "ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ",
          title: "Η Ιστορία μας",
          subtitle: "Ανακαλύψτε πώς γίναμε ο αξιόπιστος εταίρος σας στις μεταφορές και τη logistics",
          storyTitle: "Το Ταξίδι μας",
          storyText: "Από την ίδρυσή μας, έχουμε δεσμευτεί να παρέχουμε καινοτόμες και αξιόπιστες λύσεις μεταφοράς. Η έμπειρη ομάδα μας εργάζεται ακούραστα για να ξεπεράσει τις προσδοκίες σας και να εξασφαλίσει την ικανοποίηση των πελατών σε όλη την Ευρώπη.",
          timelineTitle: "Βασικά Ορόσημα",
          valuesTitle: "Οι Αξίες μας", 
          teamTitle: "Η Ομάδα μας",
          certTitle: "Πιστοποιήσεις",
          contactTitle: "Επικοινωνήστε μαζί μας"
        };
      case 'it':
        return {
          badge: "CHI SIAMO",
          title: "La Nostra Storia",
          subtitle: "Scopri come siamo diventati il tuo partner di fiducia nei trasporti e nella logistica",
          storyTitle: "Il Nostro Percorso",
          storyText: "Dalla nostra fondazione, ci siamo impegnati a fornire soluzioni di trasporto innovative e affidabili. Il nostro team esperto lavora instancabilmente per superare le vostre aspettative e garantire la soddisfazione del cliente in tutta Europa.",
          timelineTitle: "Tappe Fondamentali",
          valuesTitle: "I Nostri Valori",
          teamTitle: "Il Nostro Team", 
          certTitle: "Certificazioni",
          contactTitle: "Contattaci"
        };
      default:
        return {
          badge: "ABOUT US",
          title: "Our Story",
          subtitle: "Discover how we became your trusted partner in transport and logistics",
          storyTitle: "Our Journey",
          storyText: "Since our inception, we have been committed to providing innovative and reliable transport solutions. Our experienced team works tirelessly to exceed your expectations and ensure customer satisfaction across Europe.",
          timelineTitle: "Key Milestones", 
          valuesTitle: "Our Values",
          teamTitle: "Our Team",
          certTitle: "Certifications",
          contactTitle: "Contact Us"
        };
    }
  };

  const content = getContent();

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
                <Calendar className="h-4 w-4 mr-2" />
                {content.badge}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {content.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gradient-soft-gold relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                {content.storyTitle}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-xl leading-relaxed mb-6">
                {content.storyText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;