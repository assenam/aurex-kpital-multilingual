import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/contexts/TranslationContext';
import { 
  Calendar, User, Clock, TrendingUp, BookOpen, Tag,
  ArrowRight, Search, Filter, Share2, Eye, Heart
} from 'lucide-react';

const Blog = () => {
  const { t } = useTranslation();
  const featuredArticle = {
    title: "L'Intelligence Artificielle Révolutionne l'Analyse de Crédit en 2024",
    excerpt: "Découvrez comment nos algorithmes propriétaires d'IA permettent une évaluation du risque plus précise et des décisions de financement plus rapides, tout en maintenant l'équité et la transparence.",
    author: "Dr. Sophie Laurent",
    role: "Directrice Innovation",
    date: "15 Décembre 2024",
    readTime: "8 min",
    category: "Innovation",
    image: "/api/placeholder/800/400",
    views: 2847,
    likes: 156
  };

  const articles = [
    {
      title: "Guide Complet : Investir dans l'Immobilier en 2024",
      excerpt: "Stratégies, fiscalité et opportunités pour optimiser vos investissements immobiliers en Europe.",
      author: "Marco Antonelli",
      date: "12 Décembre 2024",
      readTime: "12 min",
      category: "Immobilier",
      views: 1934,
      featured: true
    },
    {
      title: "RGPD et Services Financiers : Bilan 6 Ans Après",
      excerpt: "Analyse de l'impact du RGPD sur l'innovation financière et les meilleures pratiques adoptées.",
      author: "Elena Rodriguez",
      date: "8 Décembre 2024",
      readTime: "6 min",
      category: "Réglementation",
      views: 892
    },
    {
      title: "Épargne Digitale : Les Nouveaux Comportements des Européens",
      excerpt: "Étude exclusive sur l'évolution des habitudes d'épargne à l'ère du numérique.",
      author: "Dr. Klaus Müller",
      date: "5 Décembre 2024",
      readTime: "10 min",
      category: "Économie",
      views: 1567
    },
    {
      title: "Prêts Étudiants : Financer ses Études sans Stress",
      excerpt: "Conseils pratiques et solutions innovantes pour financer ses études supérieures en Europe.",
      author: "Sophie Laurent",
      date: "2 Décembre 2024",
      readTime: "7 min",
      category: "Éducation",
      views: 1245
    },
    {
      title: "Cryptomonnaies et Finance Traditionnelle : Vers une Convergence ?",
      excerpt: "Analyse des opportunités et défis de l'intégration des actifs numériques dans les portefeuilles.",
      author: "Marco Antonelli",
      date: "28 Novembre 2024",
      readTime: "9 min",
      category: "Innovation",
      views: 2156
    },
    {
      title: "ESG et Investissement Responsable : Guide Pratique 2024",
      excerpt: "Comment intégrer les critères ESG dans vos décisions d'investissement pour un impact positif.",
      author: "Elena Rodriguez",
      date: "25 Novembre 2024",
      readTime: "11 min",
      category: "ESG",
      views: 987
    }
  ];

  const categories = [
    { name: "innovation", count: 12, color: "from-blue-500 to-blue-600" },
    { name: "realEstate", count: 8, color: "from-emerald-500 to-emerald-600" },
    { name: "regulation", count: 6, color: "from-purple-500 to-purple-600" },
    { name: "economy", count: 15, color: "from-amber-500 to-amber-600" },
    { name: "esg", count: 4, color: "from-green-500 to-green-600" },
    { name: "education", count: 7, color: "from-pink-500 to-pink-600" }
  ];

  const trending = [
    { title: "Taux immobiliers 2024", views: 5420 },
    { title: "IA et finance", views: 4856 },
    { title: "Investissement ESG", views: 3742 },
    { title: "Épargne inflation", views: 3124 },
    { title: "Prêts sans apport", views: 2856 }
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
                <BookOpen className="h-4 w-4 mr-2" />
                {t('blog.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('blog.title')}
              <span className="text-gold block">{t('blog.subtitle')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('blog.description')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <BookOpen className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">{t('blog.stats.articles.value')}</div>
                <div className="text-sm opacity-90">{t('blog.stats.articles.label')}</div>
              </div>
              <div className="text-center">
                <User className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">{t('blog.stats.experts.value')}</div>
                <div className="text-sm opacity-90">{t('blog.stats.experts.label')}</div>
              </div>
              <div className="text-center">
                <Eye className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">{t('blog.stats.readers.value')}</div>
                <div className="text-sm opacity-90">{t('blog.stats.readers.label')}</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">{t('blog.stats.satisfaction.value')}</div>
                <div className="text-sm opacity-90">{t('blog.stats.satisfaction.label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('blog.featured.title')}
            </h2>
          </div>

          <Card className="border-0 shadow-xl overflow-hidden hover-lift">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="h-64 lg:h-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                  <div className="text-xl font-bold text-primary">{t('blog.featured.title')}</div>
                </div>
              </div>
              
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-gradient-primary text-primary-foreground">
                    {featuredArticle.category}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredArticle.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {featuredArticle.likes}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4 leading-tight">
                  {featuredArticle.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary">{featuredArticle.author}</div>
                      <div className="text-sm text-muted-foreground">{featuredArticle.role}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredArticle.date}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-4 w-4" />
                      {featuredArticle.readTime} {t('blog.actions.readTime')}
                    </div>
                  </div>
                </div>
                
                <Button className="bg-gradient-primary hover:shadow-lg group">
                  {t('blog.actions.readMore')}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('blog.search.placeholder')}
                className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                {t('blog.search.allCategories')}
              </Button>
              {categories.map((category, index) => (
                <Button key={category.name} variant="outline" size="sm">
                  {t(`blog.categories.${category.name}`)} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Articles */}
            <div className="lg:col-span-3">
              <div className="grid gap-8">
                {articles.map((article, index) => (
                  <Card key={article.title} className={`border-0 shadow-lg hover-lift ${article.featured ? 'ring-2 ring-accent/20' : ''}`}>
                    <div className="grid md:grid-cols-3 gap-0">
                      <div className="h-48 md:h-auto bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary" />
                      </div>
                      
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline">{article.category}</Badge>
                          {article.featured && <Badge className="bg-accent text-accent-foreground">{t('blog.featured.title')}</Badge>}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            {article.views.toLocaleString()}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-primary mb-3 leading-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{article.author}</span>
                            <span>•</span>
                            <Calendar className="h-4 w-4" />
                            <span>{article.date}</span>
                            <span>•</span>
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="gap-2">
                            {t('blog.actions.read')}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  {t('blog.actions.loadMore')}
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Tag className="h-5 w-5" />
                    {t('blog.categories.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <div key={category.name} className="flex items-center justify-between py-2 border-b border-secondary/50 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`}></div>
                          <span className="text-sm font-medium">{t(`blog.categories.${category.name}`)}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{category.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <TrendingUp className="h-5 w-5" />
                    {t('blog.trending.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trending.map((trend, index) => (
                      <div key={trend.title} className="flex items-center justify-between py-2 border-b border-secondary/50 last:border-b-0">
                        <span className="text-sm font-medium text-primary hover:text-accent cursor-pointer">
                          {trend.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{trend.views.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-primary">{t('blog.newsletter.title')}</CardTitle>
                  <CardDescription>
                    {t('blog.newsletter.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder={t('blog.newsletter.placeholder')}
                      className="w-full px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button className="w-full bg-gradient-primary hover:shadow-lg">
                      {t('blog.newsletter.subscribe')}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      {t('blog.newsletter.disclaimer')}
                    </p>
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

export default Blog;