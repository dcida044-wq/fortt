import { Target, Eye, Shield, Clock, Leaf, Award } from "lucide-react";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card border border-border hover:border-accent p-6 rounded-sm transition-all duration-300 group hover:shadow-[0_0_30px_rgba(255,195,0,0.15)]"
            >
              <value.icon
                className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300"
                size={40}
              />
              <h4 className="font-montserrat font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {value.title}
              </h4>
              <p className="text-muted-foreground font-roboto leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
