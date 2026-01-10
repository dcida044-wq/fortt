'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react"

interface Section {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const sections: Section[] = [
    {
        id: 1,
        title: "Construção Chave na Mão",
        description: "Desenvolvemos projetos completos do início ao fim. Desde a conceção até à entrega final, garantimos uma execução impecável com os mais altos padrões de qualidade e cumprimento rigoroso de prazos.",
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    },
    {
        id: 2,
        title: "Remodelações de Excelência",
        description: "Transformamos espaços existentes em ambientes modernos e funcionais. A nossa equipa especializada garante renovações que respeitam a estrutura original enquanto incorporam as mais recentes tendências.",
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    },
    {
        id: 3,
        title: "Acabamentos de Qualidade",
        description: "Os detalhes fazem a diferença. Oferecemos acabamentos premium que elevam qualquer projeto, desde revestimentos de luxo a pinturas especializadas e soluções acústicas de alto desempenho.",
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    }
];

export const ParallaxScrollFeatureSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % sections.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % sections.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + sections.length) % sections.length);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    const imageVariants = {
        enter: {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
        },
        center: {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
        },
        exit: {
            clipPath: "inset(0 0 0 100%)",
            opacity: 0,
        },
    };

    const currentSection = sections[activeIndex];

    return (
        <section className="relative bg-background overflow-hidden">
            {/* Hero/Intro */}
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-4 pt-16">
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

            {/* Main Content Section */}
            <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 min-h-[500px]">
                    {/* Text Content */}
                    <div className="flex-1 relative h-[250px] lg:h-[300px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentSection.id}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0 space-y-6"
                            >
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-montserrat">
                                    {currentSection.title}
                                </h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {currentSection.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Image */}
                    <div className="flex-1 w-full relative h-[300px] md:h-[400px] lg:h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSection.id}
                                variants={imageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute inset-0 overflow-hidden rounded-2xl"
                            >
                                <img
                                    src={currentSection.imageUrl}
                                    alt={currentSection.title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-6 mt-12">
                    <button
                        onClick={handlePrev}
                        className="p-3 rounded-full border border-border hover:bg-accent transition-colors"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex gap-3">
                        {sections.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > activeIndex ? 1 : -1);
                                    setActiveIndex(index);
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === activeIndex
                                        ? "bg-primary w-8"
                                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                }`}
                                aria-label={`Ir para secção ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full border border-border hover:bg-accent transition-colors"
                        aria-label="Próximo"
                    >
                        <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                </div>
            </div>

            {/* End Section */}
            <div className="min-h-[30vh] flex flex-col items-center justify-center text-center px-4 pb-16">
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
