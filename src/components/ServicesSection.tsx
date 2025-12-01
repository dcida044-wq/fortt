import { Key, LayoutGrid, Paintbrush, Volume2, Droplets, Zap, Palette, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import civilImage from "@/assets/service-civil.jpg";
import renovationImage from "@/assets/service-renovation.jpg";
import architectureImage from "@/assets/service-architecture.jpg";

const services = [
  {
    icon: Key,
    title: "Construção Chave na Mão",
    description:
      "Projeto completo do início ao fim, entregamos o seu espaço pronto a habitar sem preocupações.",
    image: civilImage,
  },
  {
    icon: LayoutGrid,
    title: "Divisórias",
    description:
      "Instalação de divisórias em pladur, vidro ou outros materiais para otimizar espaços.",
    image: renovationImage,
  },
  {
    icon: Paintbrush,
    title: "Pinturas",
    description:
      "Serviços de pintura interior e exterior com acabamentos de alta qualidade.",
    image: architectureImage,
  },
  {
    icon: Volume2,
    title: "Isolamento Acústico",
    description:
      "Soluções de insonorização para garantir conforto e privacidade nos seus espaços.",
    image: renovationImage,
  },
  {
    icon: Droplets,
    title: "Impermeabilização",
    description:
      "Proteção contra infiltrações e humidade em coberturas, varandas e fachadas.",
    image: civilImage,
  },
  {
    icon: Zap,
    title: "Elétrica",
    description:
      "Instalações elétricas completas, reparações e modernização de sistemas.",
    image: architectureImage,
  },
  {
    icon: Palette,
    title: "Revestimentos e Decorações",
    description:
      "Aplicação de revestimentos e soluções decorativas para valorizar os seus ambientes.",
    image: renovationImage,
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-black text-4xl md:text-6xl text-foreground mb-4">
            Soluções <span className="text-accent">360º</span>
          </h2>
          <p className="text-xl text-muted-foreground font-roboto max-w-3xl mx-auto">
            Construção, Reabilitação e Engenharia: Da concepção à entrega final,
            garantimos excelência em cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group bg-card border-border hover:border-accent transition-all duration-500 overflow-hidden hover:shadow-[0_0_40px_rgba(255,195,0,0.2)]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <service.icon className="text-accent" size={40} />
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-2xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-roboto leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
