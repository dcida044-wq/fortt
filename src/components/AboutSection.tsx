import { Target, Eye, Shield, Clock, Leaf, Award } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Shield,
    title: "Ética e Transparência",
    description: "Compromisso inabalável com a honestidade e clareza em todas as relações.",
  },
  {
    icon: Award,
    title: "Qualidade",
    description: "Padrões superiores de execução e acabamento em cada projeto.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Proteção máxima de colaboradores, clientes e património.",
  },
  {
    icon: Clock,
    title: "Compromisso com Prazos",
    description: "Cumprimento rigoroso dos cronogramas estabelecidos.",
  },
  {
    icon: Leaf,
    title: "Respeito ao Meio Ambiente",
    description: "Práticas sustentáveis e responsabilidade ambiental.",
  },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-black text-4xl md:text-6xl text-foreground mb-4">
            Construindo o <span className="text-accent">Futuro</span>
          </h2>
          <p className="text-xl text-muted-foreground font-roboto">
            Assente em Valores
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12 mb-16">
          <div className="bg-card border border-accent/20 p-8 md:p-12 rounded-sm relative overflow-hidden group hover:border-accent transition-all duration-500">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
            <div className="flex items-start space-x-4 mb-4">
              <Target className="text-accent flex-shrink-0 mt-1" size={32} />
              <div>
                <h3 className="font-montserrat font-bold text-3xl text-accent mb-4">
                  Missão
                </h3>
                <p className="text-foreground font-roboto text-lg leading-relaxed">
                  Ser o parceiro de excelência na construção e reabilitação em
                  Portugal, superando as expectativas do cliente através de um
                  compromisso inabalável com a ética, a qualidade superior e o
                  respeito integral pelo ambiente e pelas pessoas.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-accent/20 p-8 md:p-12 rounded-sm relative overflow-hidden group hover:border-accent transition-all duration-500">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
            <div className="flex items-start space-x-4 mb-4">
              <Eye className="text-accent flex-shrink-0 mt-1" size={32} />
              <div>
                <h3 className="font-montserrat font-bold text-3xl text-accent mb-4">
                  Visão
                </h3>
                <p className="text-foreground font-roboto text-lg leading-relaxed">
                  Ser reconhecida a nível nacional como a construtora de
                  referência pela inovação nas práticas de engenharia e
                  arquitetura e pela entrega consistente de projetos que definem
                  novos padrões de qualidade e sustentabilidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="font-montserrat font-bold text-3xl text-foreground mb-2">
            Valores <span className="text-accent">Centrais</span>
          </h3>
          <p className="text-muted-foreground font-roboto">
            Os pilares que guiam cada decisão e ação
          </p>
        </div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 max-w-7xl mx-auto">
          <ValueGridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Shield className="h-4 w-4" />}
            title="Ética e Transparência"
            description="Compromisso inabalável com a honestidade e clareza em todas as relações."
          />
          <ValueGridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Award className="h-4 w-4" />}
            title="Qualidade"
            description="Padrões superiores de execução e acabamento em cada projeto."
          />
          <ValueGridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Shield className="h-4 w-4" />}
            title="Segurança"
            description="Proteção máxima de colaboradores, clientes e património."
          />
          <ValueGridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Clock className="h-4 w-4" />}
            title="Compromisso com Prazos"
            description="Cumprimento rigoroso dos cronogramas estabelecidos."
          />
          <ValueGridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Leaf className="h-4 w-4" />}
            title="Respeito ao Meio Ambiente"
            description="Práticas sustentáveis e responsabilidade ambiental."
          />
        </ul>
      </div>
    </section>
  );
};

interface ValueGridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const ValueGridItem = ({ area, icon, title, description }: ValueGridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-card p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-accent/30 bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-montserrat tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="font-roboto text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AboutSection;
