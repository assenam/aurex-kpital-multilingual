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
          timeline: [
            { year: "2010", title: "Fondation", description: "Création de l'entreprise avec une vision claire : révolutionner le transport européen" },
            { year: "2015", title: "Expansion", description: "Extension de nos services vers 15 pays européens" },
            { year: "2020", title: "Innovation", description: "Lancement de notre plateforme digitale de suivi en temps réel" },
            { year: "2024", title: "Excellence", description: "Plus de 10 000 livraisons réussies et certification ISO 9001" }
          ],
          valuesTitle: "Nos Valeurs",
          values: [
            { title: "Fiabilité", description: "Nous tenons nos engagements, toujours.", icon: Shield },
            { title: "Innovation", description: "Nous adoptons les dernières technologies pour optimiser vos livraisons.", icon: Lightbulb },
            { title: "Durabilité", description: "Nous nous engageons pour un transport respectueux de l'environnement.", icon: Heart },
            { title: "Transparence", description: "Communication claire sur tous nos services.", icon: CheckCircle }
          ],
          teamTitle: "Notre Équipe",
          teamText: "Une équipe passionnée de professionnels dédiés à votre succès logistique.",
          team: [
            { name: "Marie Dubois", position: "Directrice Générale", experience: "15 ans", specialty: "Logistique internationale" },
            { name: "Jean Martin", position: "Directeur Technique", experience: "12 ans", specialty: "Innovation transport" },
            { name: "Sophie Laurent", position: "Directrice Commerciale", experience: "10 ans", specialty: "Relations clients" }
          ],
          certTitle: "Certifications",
          certText: "Nos certifications garantissent la qualité et la sécurité de nos services.",
          certifications: [
            { name: "ISO 9001", description: "Qualité", year: "2022" },
            { name: "ISO 14001", description: "Environnement", year: "2023" },
            { name: "GDPR", description: "Protection des données", year: "2021" }
          ],
          contactTitle: "Nous Contacter",
          contactText: "Prêt à transformer votre logistique ? Contactez-nous dès aujourd'hui.",
          experienceLabel: "d'expérience"
        };
      case 'de':
        return {
          badge: "ÜBER UNS",
          title: "Unsere Geschichte",
          subtitle: "Erfahren Sie, wie wir zu Ihrem vertrauenswürdigen Partner für Transport und Logistik geworden sind",
          storyTitle: "Unser Weg",
          storyText: "Seit unserer Gründung haben wir uns verpflichtet, innovative und zuverlässige Transportlösungen zu bieten. Unser erfahrenes Team arbeitet unermüdlich daran, Ihre Erwartungen zu übertreffen und die Zufriedenheit unserer Kunden in ganz Europa zu gewährleisten.",
          timelineTitle: "Wichtige Meilensteine",
          timeline: [
            { year: "2010", title: "Gründung", description: "Unternehmensgründung mit einer klaren Vision: Den europäischen Transport revolutionieren" },
            { year: "2015", title: "Expansion", description: "Erweiterung unserer Dienste auf 15 europäische Länder" },
            { year: "2020", title: "Innovation", description: "Start unserer digitalen Echtzeit-Tracking-Plattform" },
            { year: "2024", title: "Exzellenz", description: "Über 10.000 erfolgreiche Lieferungen und ISO 9001 Zertifizierung" }
          ],
          valuesTitle: "Unsere Werte",
          values: [
            { title: "Zuverlässigkeit", description: "Wir halten unsere Versprechen, immer.", icon: Shield },
            { title: "Innovation", description: "Wir nutzen die neuesten Technologien, um Ihre Lieferungen zu optimieren.", icon: Lightbulb },
            { title: "Nachhaltigkeit", description: "Wir engagieren uns für umweltfreundlichen Transport.", icon: Heart },
            { title: "Transparenz", description: "Klare Kommunikation über alle unsere Services.", icon: CheckCircle }
          ],
          teamTitle: "Unser Team",
          teamText: "Ein leidenschaftliches Team von Fachleuten, die sich Ihrem logistischen Erfolg widmen.",
          team: [
            { name: "Klaus Müller", position: "Geschäftsführer", experience: "15 Jahre", specialty: "Internationale Logistik" },
            { name: "Anna Schmidt", position: "Technische Leiterin", experience: "12 Jahre", specialty: "Transport Innovation" },
            { name: "Thomas Weber", position: "Vertriebsleiter", experience: "10 Jahre", specialty: "Kundenbeziehungen" }
          ],
          certTitle: "Zertifizierungen",
          certText: "Unsere Zertifizierungen garantieren die Qualität und Sicherheit unserer Dienste.",
          certifications: [
            { name: "ISO 9001", description: "Qualität", year: "2022" },
            { name: "ISO 14001", description: "Umwelt", year: "2023" },
            { name: "DSGVO", description: "Datenschutz", year: "2021" }
          ],
          contactTitle: "Kontaktieren Sie uns",
          contactText: "Bereit, Ihre Logistik zu transformieren? Kontaktieren Sie uns noch heute.",
          experienceLabel: "Jahre Erfahrung"
        };
      case 'pl':
        return {
          badge: "O NAS",
          title: "Nasza Historia",
          subtitle: "Dowiedz się, jak staliśmy się Twoim zaufanym partnerem w transporcie i logistyce",
          storyTitle: "Nasza Droga",
          storyText: "Od naszego powstania zobowiązaliśmy się do dostarczania innowacyjnych i niezawodnych rozwiązań transportowych. Nasz doświadczony zespół pracuje niestrudzenie, aby przekroczyć Twoje oczekiwania i zapewnić zadowolenie klientów w całej Europie.",
          timelineTitle: "Kluczowe Momenty",
          timeline: [
            { year: "2010", title: "Założenie", description: "Powstanie firmy z jasną wizją: rewolucjonizacja europejskiego transportu" },
            { year: "2015", title: "Ekspansja", description: "Rozszerzenie naszych usług na 15 krajów europejskich" },
            { year: "2020", title: "Innowacja", description: "Uruchomienie naszej cyfrowej platformy śledzenia w czasie rzeczywistym" },
            { year: "2024", title: "Doskonałość", description: "Ponad 10 000 udanych dostaw i certyfikacja ISO 9001" }
          ],
          valuesTitle: "Nasze Wartości",
          values: [
            { title: "Niezawodność", description: "Dotrzymujemy zobowiązań, zawsze.", icon: Shield },
            { title: "Innowacja", description: "Przyjmujemy najnowsze technologie, aby zoptymalizować Twoje dostawy.", icon: Lightbulb },
            { title: "Zrównoważoność", description: "Jesteśmy zaangażowani w transport przyjazny środowisku.", icon: Heart },
            { title: "Przejrzystość", description: "Jasna komunikacja o wszystkich naszych usługach.", icon: CheckCircle }
          ],
          teamTitle: "Nasz Zespół",
          teamText: "Zespół pasjonatów profesjonalistów oddanych Twojemu sukcesowi logistycznemu.",
          team: [
            { name: "Anna Kowalska", position: "Dyrektor Generalny", experience: "15 lat", specialty: "Logistyka międzynarodowa" },
            { name: "Piotr Nowak", position: "Dyrektor Techniczny", experience: "12 lat", specialty: "Innowacje transportowe" },
            { name: "Maria Wiśniewska", position: "Dyrektor Handlowy", experience: "10 lat", specialty: "Relacje z klientami" }
          ],
          certTitle: "Certyfikaty",
          certText: "Nasze certyfikaty gwarantują jakość i bezpieczeństwo naszych usług.",
          certifications: [
            { name: "ISO 9001", description: "Jakość", year: "2022" },
            { name: "ISO 14001", description: "Środowisko", year: "2023" },
            { name: "RODO", description: "Ochrona danych", year: "2021" }
          ],
          contactTitle: "Skontaktuj się z nami",
          contactText: "Gotowy do transformacji swojej logistyki? Skontaktuj się z nami już dziś.",
          experienceLabel: "lat doświadczenia"
        };
      case 'fi':
        return {
          badge: "TIETOA MEISTÄ",
          title: "Tarinaamme",
          subtitle: "Opi, kuinka meistä tuli luotettava kumppanisi kuljetuksissa ja logistiikassa",
          storyTitle: "Matkamme",
          storyText: "Perustamisestamme lähtien olemme sitoutuneet tarjoamaan innovatiivisia ja luotettavia kuljetusratkaisuja. Kokenut tiimimme työskentelee väsymättä ylittääkseen odotuksesi ja varmistaakseen asiakastyytyväisyyden kaikkialla Euroopassa.",
          timelineTitle: "Tärkeät Virstanpylväät",
          timeline: [
            { year: "2010", title: "Perustaminen", description: "Yrityksen perustaminen selkeällä visiolla: vallankumous eurooppalaisessa kuljetuksessa" },
            { year: "2015", title: "Laajentuminen", description: "Palveluidemme laajentaminen 15 Euroopan maahan" },
            { year: "2020", title: "Innovaatio", description: "Digitaalisen reaaliaikaisen seurantaalustamme lanseeraus" },
            { year: "2024", title: "Huippuosaaminen", description: "Yli 10 000 onnistunutta toimitusta ja ISO 9001 -sertifiointi" }
          ],
          valuesTitle: "Arvomme",
          values: [
            { title: "Luotettavuus", description: "Pidämme sitoumuksemme, aina.", icon: Shield },
            { title: "Innovaatio", description: "Omaksumme uusimmat teknologiat optimoidaksemme toimituksesi.", icon: Lightbulb },
            { title: "Kestävyys", description: "Olemme sitoutuneet ympäristöystävälliseen kuljetukseen.", icon: Heart },
            { title: "Läpinäkyvyys", description: "Selkeä viestintä kaikista palveluistamme.", icon: CheckCircle }
          ],
          teamTitle: "Tiimimme",
          teamText: "Intohimoinen joukko ammattilaisia, jotka ovat omistautuneet logistiseen menestykseesi.",
          team: [
            { name: "Marja Virtanen", position: "Toimitusjohtaja", experience: "15 vuotta", specialty: "Kansainvälinen logistiikka" },
            { name: "Mikko Laine", position: "Tekninen johtaja", experience: "12 vuotta", specialty: "Kuljetusteknologiat" },
            { name: "Anna Koskinen", position: "Myyntijohtaja", experience: "10 vuotta", specialty: "Asiakassuhteet" }
          ],
          certTitle: "Sertifikaatit",
          certText: "Sertifikaattimme takaavat palvelujemme laadun ja turvallisuuden.",
          certifications: [
            { name: "ISO 9001", description: "Laatu", year: "2022" },
            { name: "ISO 14001", description: "Ympäristö", year: "2023" },
            { name: "GDPR", description: "Tietosuoja", year: "2021" }
          ],
          contactTitle: "Ota yhteyttä",
          contactText: "Valmis muuttamaan logistiikkaasi? Ota yhteyttä tänään.",
          experienceLabel: "vuoden kokemus"
        };
      case 'es':
        return {
          badge: "SOBRE NOSOTROS",
          title: "Nuestra Historia",
          subtitle: "Descubre cómo nos convertimos en tu socio de confianza en transporte y logística",
          storyTitle: "Nuestro Camino",
          storyText: "Desde nuestros inicios, nos hemos comprometido a proporcionar soluciones de transporte innovadoras y confiables. Nuestro equipo experimentado trabaja incansablemente para superar sus expectativas y garantizar la satisfacción del cliente en toda Europa.",
          timelineTitle: "Hitos Clave",
          timeline: [
            { year: "2010", title: "Fundación", description: "Establecimiento de la empresa con una visión clara: revolucionar el transporte europeo" },
            { year: "2015", title: "Expansión", description: "Extensión de nuestros servicios a 15 países europeos" },
            { year: "2020", title: "Innovación", description: "Lanzamiento de nuestra plataforma digital de seguimiento en tiempo real" },
            { year: "2024", title: "Excelencia", description: "Más de 10,000 entregas exitosas y certificación ISO 9001" }
          ],
          valuesTitle: "Nuestros Valores",
          values: [
            { title: "Confiabilidad", description: "Cumplimos nuestros compromisos, siempre.", icon: Shield },
            { title: "Innovación", description: "Adoptamos las últimas tecnologías para optimizar sus entregas.", icon: Lightbulb },
            { title: "Sostenibilidad", description: "Estamos comprometidos con el transporte respetuoso con el medio ambiente.", icon: Heart },
            { title: "Transparencia", description: "Comunicación clara sobre todos nuestros servicios.", icon: CheckCircle }
          ],
          teamTitle: "Nuestro Equipo",
          teamText: "Un equipo apasionado de profesionales dedicados a su éxito logístico.",
          team: [
            { name: "Carmen García", position: "Directora General", experience: "15 años", specialty: "Logística internacional" },
            { name: "Luis Martínez", position: "Director Técnico", experience: "12 años", specialty: "Innovación en transporte" },
            { name: "Ana Rodríguez", position: "Directora Comercial", experience: "10 años", specialty: "Relaciones con clientes" }
          ],
          certTitle: "Certificaciones",
          certText: "Nuestras certificaciones garantizan la calidad y seguridad de nuestros servicios.",
          certifications: [
            { name: "ISO 9001", description: "Calidad", year: "2022" },
            { name: "ISO 14001", description: "Medio Ambiente", year: "2023" },
            { name: "GDPR", description: "Protección de datos", year: "2021" }
          ],
          contactTitle: "Contáctanos",
          contactText: "¿Listo para transformar tu logística? Contáctanos hoy.",
          experienceLabel: "años de experiencia"
        };
      case 'pt':
        return {
          badge: "SOBRE NÓS",
          title: "Nossa História",
          subtitle: "Descubra como nos tornamos seu parceiro de confiança em transporte e logística",
          storyTitle: "Nossa Jornada",
          storyText: "Desde nosso início, nos comprometemos a fornecer soluções de transporte inovadoras e confiáveis. Nossa equipe experiente trabalha incansavelmente para superar suas expectativas e garantir a satisfação do cliente em toda a Europa.",
          timelineTitle: "Marcos Importantes",
          timeline: [
            { year: "2010", title: "Fundação", description: "Estabelecimento da empresa com uma visão clara: revolucionar o transporte europeu" },
            { year: "2015", title: "Expansão", description: "Extensão de nossos serviços para 15 países europeus" },
            { year: "2020", title: "Inovação", description: "Lançamento de nossa plataforma digital de rastreamento em tempo real" },
            { year: "2024", title: "Excelência", description: "Mais de 10.000 entregas bem-sucedidas e certificação ISO 9001" }
          ],
          valuesTitle: "Nossos Valores",
          values: [
            { title: "Confiabilidade", description: "Cumprimos nossos compromissos, sempre.", icon: Shield },
            { title: "Inovação", description: "Adotamos as mais recentes tecnologias para otimizar suas entregas.", icon: Lightbulb },
            { title: "Sustentabilidade", description: "Estamos comprometidos com o transporte ambientalmente responsável.", icon: Heart },
            { title: "Transparência", description: "Comunicação clara sobre todos os nossos serviços.", icon: CheckCircle }
          ],
          teamTitle: "Nossa Equipe",
          teamText: "Uma equipe apaixonada de profissionais dedicados ao seu sucesso logístico.",
          team: [
            { name: "Maria Silva", position: "Diretora Geral", experience: "15 anos", specialty: "Logística internacional" },
            { name: "João Santos", position: "Diretor Técnico", experience: "12 anos", specialty: "Inovação em transporte" },
            { name: "Ana Costa", position: "Diretora Comercial", experience: "10 anos", specialty: "Relacionamento com clientes" }
          ],
          certTitle: "Certificações",
          certText: "Nossas certificações garantem a qualidade e segurança de nossos serviços.",
          certifications: [
            { name: "ISO 9001", description: "Qualidade", year: "2022" },
            { name: "ISO 14001", description: "Meio Ambiente", year: "2023" },
            { name: "GDPR", description: "Proteção de dados", year: "2021" }
          ],
          contactTitle: "Entre em Contato",
          contactText: "Pronto para transformar sua logística? Entre em contato conosco hoje.",
          experienceLabel: "anos de experiência"
        };
      case 'el':
        return {
          badge: "ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ",
          title: "Η Ιστορία μας",
          subtitle: "Ανακαλύψτε πώς γίναμε ο αξιόπιστος εταίρος σας στις μεταφορές και τη logistics",
          storyTitle: "Το Ταξίδι μας",
          storyText: "Από την ίδρυσή μας, έχουμε δεσμευτεί να παρέχουμε καινοτόμες και αξιόπιστες λύσεις μεταφοράς. Η έμπειρη ομάδα μας εργάζεται ακούραστα για να ξεπεράσει τις προσδοκίες σας και να εξασφαλίσει την ικανοποίηση των πελατών σε όλη την Ευρώπη.",
          timelineTitle: "Βασικά Ορόσημα",
          timeline: [
            { year: "2010", title: "Ίδρυση", description: "Ίδρυση της εταιρείας με σαφές όραμα: επανάσταση στις ευρωπαϊκές μεταφορές" },
            { year: "2015", title: "Επέκταση", description: "Επέκταση των υπηρεσιών μας σε 15 ευρωπαϊκές χώρες" },
            { year: "2020", title: "Καινοτομία", description: "Εκκίνηση της ψηφιακής πλατφόρμας παρακολούθησης σε πραγματικό χρόνο" },
            { year: "2024", title: "Αριστεία", description: "Πάνω από 10.000 επιτυχημένες παραδόσεις και πιστοποίηση ISO 9001" }
          ],
          valuesTitle: "Οι Αξίες μας",
          values: [
            { title: "Αξιοπιστία", description: "Τηρούμε τις δεσμεύσεις μας, πάντα.", icon: Shield },
            { title: "Καινοτομία", description: "Υιοθετούμε τις τελευταίες τεχνολογίες για να βελτιστοποιήσουμε τις παραδόσεις σας.", icon: Lightbulb },
            { title: "Βιωσιμότητα", description: "Είμαστε προσηλωμένοι σε φιλικές προς το περιβάλλον μεταφορές.", icon: Heart },
            { title: "Διαφάνεια", description: "Σαφής επικοινωνία για όλες τις υπηρεσίες μας.", icon: CheckCircle }
          ],
          teamTitle: "Η Ομάδα μας",
          teamText: "Μια παθιασμένη ομάδα επαγγελματιών αφοσιωμένη στη logistics επιτυχία σας.",
          team: [
            { name: "Μαρία Παπαδάκη", position: "Γενική Διευθύντρια", experience: "15 χρόνια", specialty: "Διεθνής logistics" },
            { name: "Γιάννης Κωστόπουλος", position: "Τεχνικός Διευθυντής", experience: "12 χρόνια", specialty: "Καινοτομία μεταφορών" },
            { name: "Ελένη Νικολάου", position: "Εμπορική Διευθύντρια", experience: "10 χρόνια", specialty: "Σχέσεις πελατών" }
          ],
          certTitle: "Πιστοποιήσεις",
          certText: "Οι πιστοποιήσεις μας εγγυώνται την ποιότητα και ασφάλεια των υπηρεσιών μας.",
          certifications: [
            { name: "ISO 9001", description: "Ποιότητα", year: "2022" },
            { name: "ISO 14001", description: "Περιβάλλον", year: "2023" },
            { name: "GDPR", description: "Προστασία δεδομένων", year: "2021" }
          ],
          contactTitle: "Επικοινωνήστε μαζί μας",
          contactText: "Έτοιμοι να μεταμορφώσετε τη logistics σας; Επικοινωνήστε μαζί μας σήμερα.",
          experienceLabel: "χρόνια εμπειρίας"
        };
      case 'it':
        return {
          badge: "CHI SIAMO",
          title: "La Nostra Storia",
          subtitle: "Scopri come siamo diventati il tuo partner di fiducia nei trasporti e nella logistica",
          storyTitle: "Il Nostro Percorso",
          storyText: "Dalla nostra fondazione, ci siamo impegnati a fornire soluzioni di trasporto innovative e affidabili. Il nostro team esperto lavora instancabilmente per superare le vostre aspettative e garantire la soddisfazione del cliente in tutta Europa.",
          timelineTitle: "Tappe Fondamentali",
          timeline: [
            { year: "2010", title: "Fondazione", description: "Costituzione dell'azienda con una visione chiara: rivoluzionare i trasporti europei" },
            { year: "2015", title: "Espansione", description: "Estensione dei nostri servizi a 15 paesi europei" },
            { year: "2020", title: "Innovazione", description: "Lancio della nostra piattaforma digitale di tracciamento in tempo reale" },
            { year: "2024", title: "Eccellenza", description: "Oltre 10.000 consegne di successo e certificazione ISO 9001" }
          ],
          valuesTitle: "I Nostri Valori",
          values: [
            { title: "Affidabilità", description: "Manteniamo i nostri impegni, sempre.", icon: Shield },
            { title: "Innovazione", description: "Adottiamo le tecnologie più recenti per ottimizzare le vostre consegne.", icon: Lightbulb },
            { title: "Sostenibilità", description: "Siamo impegnati per un trasporto rispettoso dell'ambiente.", icon: Heart },
            { title: "Trasparenza", description: "Comunicazione chiara su tutti i nostri servizi.", icon: CheckCircle }
          ],
          teamTitle: "Il Nostro Team",
          teamText: "Un team appassionato di professionisti dedicati al vostro successo logistico.",
          team: [
            { name: "Giulia Rossi", position: "Direttore Generale", experience: "15 anni", specialty: "Logistica internazionale" },
            { name: "Marco Bianchi", position: "Direttore Tecnico", experience: "12 anni", specialty: "Innovazione dei trasporti" },
            { name: "Francesca Verdi", position: "Direttore Commerciale", experience: "10 anni", specialty: "Rapporti clienti" }
          ],
          certTitle: "Certificazioni",
          certText: "Le nostre certificazioni garantiscono la qualità e la sicurezza dei nostri servizi.",
          certifications: [
            { name: "ISO 9001", description: "Qualità", year: "2022" },
            { name: "ISO 14001", description: "Ambiente", year: "2023" },
            { name: "GDPR", description: "Protezione dati", year: "2021" }
          ],
          contactTitle: "Contattaci",
          contactText: "Pronti a trasformare la vostra logistica? Contattateci oggi stesso.",
          experienceLabel: "anni di esperienza"
        };
      default:
        return {
          badge: "ABOUT US",
          title: "Our Story",
          subtitle: "Discover how we became your trusted partner in transport and logistics",
          storyTitle: "Our Journey",
          storyText: "Since our inception, we have been committed to providing innovative and reliable transport solutions. Our experienced team works tirelessly to exceed your expectations and ensure customer satisfaction across Europe.",
          timelineTitle: "Key Milestones",
          timeline: [
            { year: "2010", title: "Foundation", description: "Company establishment with a clear vision: revolutionizing European transport" },
            { year: "2015", title: "Expansion", description: "Extended our services to 15 European countries" },
            { year: "2020", title: "Innovation", description: "Launched our digital real-time tracking platform" },
            { year: "2024", title: "Excellence", description: "Over 10,000 successful deliveries and ISO 9001 certification" }
          ],
          valuesTitle: "Our Values",
          values: [
            { title: "Reliability", description: "We keep our commitments, always.", icon: Shield },
            { title: "Innovation", description: "We adopt the latest technologies to optimize your deliveries.", icon: Lightbulb },
            { title: "Sustainability", description: "We are committed to environmentally friendly transport.", icon: Heart },
            { title: "Transparency", description: "Clear communication about all our services.", icon: CheckCircle }
          ],
          teamTitle: "Our Team",
          teamText: "A passionate team of professionals dedicated to your logistics success.",
          team: [
            { name: "Sarah Johnson", position: "CEO", experience: "15 years", specialty: "International logistics" },
            { name: "Michael Brown", position: "CTO", experience: "12 years", specialty: "Transport innovation" },
            { name: "Emma Wilson", position: "Commercial Director", experience: "10 years", specialty: "Client relations" }
          ],
          certTitle: "Certifications",
          certText: "Our certifications guarantee the quality and safety of our services.",
          certifications: [
            { name: "ISO 9001", description: "Quality", year: "2022" },
            { name: "ISO 14001", description: "Environment", year: "2023" },
            { name: "GDPR", description: "Data protection", year: "2021" }
          ],
          contactTitle: "Contact Us",
          contactText: "Ready to transform your logistics? Contact us today.",
          experienceLabel: "years experience"
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

      {/* Timeline */}
      <section className="py-20 bg-gradient-soft-blue relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {content.timelineTitle}
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {content.timeline.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center gap-8 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <Card className="hover-lift border-0 shadow-md bg-gradient-to-br from-white to-gold/5 border-l-4 border-l-gold">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">{milestone.year}</div>
                          <CardTitle className="text-xl text-primary">{milestone.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:block w-6 h-6 bg-gradient-gold rounded-full flex-shrink-0 shadow-gold ring-4 ring-gold/20"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-elegant relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {content.valuesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.title} className="hover-lift border-0 shadow-md bg-gradient-to-br from-white via-gold/5 to-primary/5 hover:from-gold/10 hover:to-primary/10 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gradient-gold rounded-xl shadow-gold">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-section relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {content.teamTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {content.teamText}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.team.map((member, index) => (
              <Card key={member.name} className="hover-lift border-0 shadow-md bg-gradient-to-br from-white to-primary/5 hover:from-gold/5 hover:to-primary/10 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
                  <CardDescription className="text-gold font-medium">{member.position}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">{member.experience}</span> {content.experienceLabel}
                    </p>
                    <p className="text-sm text-muted-foreground">{member.specialty}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gradient-soft-gold relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {content.certTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {content.certText}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.certifications.map((cert, index) => (
              <Card key={cert.name} className="hover-lift border-0 shadow-md bg-gradient-to-br from-white to-gold/5 hover:from-gold/10 hover:to-primary/5 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{cert.name}</CardTitle>
                  <CardDescription className="text-gold font-medium">{cert.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Depuis {cert.year}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {content.contactTitle}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {content.contactText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-primary hover:bg-gold/90">
                <Link to="/contact">
                  <Mail className="h-5 w-5 mr-2" />
                  {content.contactTitle}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/services">
                  <Target className="h-5 w-5 mr-2" />
                  Nos Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;