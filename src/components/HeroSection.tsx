import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--fortt-yellow))"
      />
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-accent/20">
            <CheckCircle2 className="text-accent" size={20} />
            <span className="text-sm font-roboto font-medium text-foreground">
              Alvará 113336-PAR
            </span>
          </div>

          <p className="text-accent font-montserrat font-bold text-lg md:text-xl mb-4 tracking-wider uppercase">
            FORTT: A Solidez da Construção, a Visão do Futuro
          </p>

          <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
            A Sua Obra em Mãos de{" "}
            <span className="text-accent">Excelência</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-roboto mb-12 max-w-2xl mx-auto">
            Construção civil, reabilitação urbana e serviços de engenharia com
            padrões superiores de qualidade e compromisso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-montserrat font-bold text-lg px-8 py-6 shadow-[0_0_40px_rgba(255,195,0,0.3)] hover:shadow-[0_0_60px_rgba(255,195,0,0.5)] transition-all duration-300"
            >
              Solicitar Orçamento Gratuito
            </Button>
            <Button
              onClick={() => {
                const element = document.getElementById("servicos");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              size="lg"
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-montserrat font-bold text-lg px-8 py-6 transition-all duration-300"
            >
              Conheça os Nossos Serviços
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-accent rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
