import { CheckCircle2 } from "lucide-react";
import { ShaderHero } from "@/components/ui/shader-hero";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById("servicos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio">
      <ShaderHero
        trustBadge={{
          text: "Alvará 113336-PAR",
          icon: <CheckCircle2 className="text-accent" size={20} />
        }}
        headline={{
          line1: "A Sua Obra em Mãos de",
          line2: "Excelência"
        }}
        subtitle="Construção civil, reabilitação urbana e serviços de engenharia com padrões superiores de qualidade e compromisso."
        buttons={{
          primary: {
            text: "Solicitar Orçamento Gratuito",
            onClick: scrollToContact
          },
          secondary: {
            text: "Conheça os Nossos Serviços",
            onClick: scrollToServices
          }
        }}
      />
    </section>
  );
};

export default HeroSection;
