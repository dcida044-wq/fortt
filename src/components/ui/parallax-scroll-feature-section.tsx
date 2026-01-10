'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils";

interface Section {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    reverse: boolean;
}

const sections: Section[] = [
    {
        id: 1,
        title: "Construção Chave na Mão",
        description: "Desenvolvemos projetos completos do início ao fim. Desde a conceção até à entrega final, garantimos uma execução impecável com os mais altos padrões de qualidade e cumprimento rigoroso de prazos.",
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        reverse: false
    },
    {
        id: 2,
        title: "Remodelações de Excelência",
        description: "Transformamos espaços existentes em ambientes modernos e funcionais. A nossa equipa especializada garante renovações que respeitam a estrutura original enquanto incorporam as mais recentes tendências.",
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
        reverse: true
    },
    {
        id: 3,
        title: "Acabamentos de Qualidade",
        description: "Os detalhes fazem a diferença. Oferecemos acabamentos premium que elevam qualquer projeto, desde revestimentos de luxo a pinturas especializadas e soluções acústicas de alto desempenho.",
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
        reverse: false
    }
];

const SectionItem = ({ section, index }: { section: Section; index: number }) => {
    const sectionRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center start"]
    });

    const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
    const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
    const translateContent = useTransform(scrollYProgress, [0, 1], [-50, 0]);

    return (
        <div
            ref={sectionRef}
            className={cn(
                "flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-16 lg:py-24",
                section.reverse && "lg:flex-row-reverse"
            )}
        >
            <motion.div
                style={{ opacity: opacityContent, y: translateContent }}
                className="flex-1 space-y-6"
            >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-montserrat">
                    {section.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.description}
                </p>
            </motion.div>
            <div className="flex-1 w-full">
                <motion.div
                    style={{ clipPath: clipProgress }}
                    className="overflow-hidden rounded-2xl"
                >
                    <img
                        src={section.imageUrl}
                        alt={section.title}
                        className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export const ParallaxScrollFeatureSection = () => {
    return (
        <section className="relative bg-background">
            {/* Hero/Intro */}
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-montserrat">
                        Porquê Escolher-nos
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Descubra o que nos diferencia no mercado da construção civil
                    </p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="pt-8"
                    >
                        <ArrowDown className="w-8 h-8 text-primary mx-auto" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Sections */}
            <div className="container mx-auto px-4 lg:px-8">
                {sections.map((section, index) => (
                    <SectionItem key={section.id} section={section} index={index} />
                ))}
            </div>

            {/* End Section */}
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-4 pb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground font-montserrat">
                        Pronto para Começar?
                    </h3>
                    <p className="text-muted-foreground">
                        Entre em contacto connosco e transforme o seu projeto em realidade
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ParallaxScrollFeatureSection;
