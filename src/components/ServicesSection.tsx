import { Building2, Hammer, Home, Ruler, HardHat, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import civilImage from "@/assets/service-civil.jpg";
import renovationImage from "@/assets/service-renovation.jpg";
import architectureImage from "@/assets/service-architecture.jpg";

const services = [
  {
    icon: Building2,
    title: "Construção Civil",
    description:
      "Obras novas de raiz, incluindo estruturas, acabamentos e infraestruturas completas.",
    image: civilImage,
  },
  {
    icon: Hammer,
    title: "Remodelações e Restaurações",
    description:
      "Transformação de espaços interiores e exteriores, modernização e recuperação de edifícios.",
    image: renovationImage,
  },
  {
    icon: Home,
    title: "Reabilitação Urbana",
    description:
      "Intervenção em edifícios antigos ou degradados, valorizando o património e revitalizando áreas urbanas.",
    image: renovationImage,
  },
  {
    icon: Ruler,
    title: "Projetos de Arquitetura e Interiores",
    description:
      "Concepção, design e planeamento de projetos habitacionais, comerciais e de interiores.",
    image: architectureImage,
  },
  {
    icon: HardHat,
    title: "Serviços de Engenharia",
    description:
      "Consultoria técnica, gestão de projeto, cálculos estruturais e soluções de engenharia.",
    image: civilImage,
  },
  {
    icon: ClipboardCheck,
    title: "Fiscalização de Obra",
    description:
      "Controlo de qualidade, cumprimento de prazos e gestão orçamental rigorosa em todas as fases da construção.",
    image: architectureImage,
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
