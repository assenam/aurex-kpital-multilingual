import { useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const PartnersCarousel = () => {
  const partners = [
    {
      name: "Deutsche Bank",
      logo: "/lovable-uploads/1abc8da0-980b-46dd-92c3-36085eac2bf3.png",
      alt: "Deutsche Bank"
    },
    {
      name: "BNP Paribas",
      logo: "/lovable-uploads/69b3a7b9-1742-4f7a-a667-105c31f57852.png",
      alt: "BNP Paribas"
    },
    {
      name: "ING",
      logo: "/lovable-uploads/7012a5b7-7763-4eab-9cb7-5d84e34d97e6.png",
      alt: "ING Group"
    },
    {
      name: "Société Générale",
      logo: "/lovable-uploads/cda4e48e-825c-4b6b-9301-54221400e47d.png",
      alt: "Société Générale"
    },
    {
      name: "Allianz",
      logo: "/lovable-uploads/905a3520-c947-4b78-93c5-4b4623d63973.png",
      alt: "Allianz"
    },
    {
      name: "Klarna",
      logo: "/lovable-uploads/8b0e2217-58f6-49ce-ad65-91ce64087690.png",
      alt: "Klarna"
    },
    {
      name: "Revolut",
      logo: "/lovable-uploads/983971b0-6b85-4fa6-98e4-0a6839a5d3fb.png",
      alt: "Revolut"
    },
    {
      name: "N26",
      logo: "/lovable-uploads/15b84f6c-7b38-4a82-828c-b049879a982f.png",
      alt: "N26"
    },
    {
      name: "EY",
      logo: "/lovable-uploads/6fc19954-b9a8-423d-ab05-1878e41fa2aa.png",
      alt: "EY Financial Services"
    },
    {
      name: "PwC",
      logo: "/lovable-uploads/8ab259f9-9857-42d0-be76-ae6bd80c6054.png",
      alt: "PwC Germany"
    }
  ];

  const autoplayPlugin = Autoplay({
    delay: 3000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  return (
    <section className="py-16 bg-gradient-soft-gray border-t border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Nos Partenaires de Confiance
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un réseau d'excellence européen pour vous offrir les meilleures solutions financières
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            plugins={[autoplayPlugin]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <div className="p-4 md:p-6">
                    <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/20 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                      <div className="aspect-[3/2] flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={partner.alt}
                          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-background/80 backdrop-blur-sm border-border/20 hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-background/80 backdrop-blur-sm border-border/20 hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Plus de 25 partenaires européens • 27 pays couverts • 2.5Md€ de volume traité
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;