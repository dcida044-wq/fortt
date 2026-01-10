import React, { useState, useEffect, useRef } from 'react';

const slidesData = [
  {
    title: "Construção Chave na Mão",
    description: "Desenvolvemos projetos completos do início ao fim. Desde a conceção até à entrega final, garantimos uma execução impecável com os mais altos padrões de qualidade.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Remodelações de Excelência",
    description: "Transformamos espaços existentes em ambientes modernos e funcionais. A nossa equipa especializada garante renovações que respeitam a estrutura original.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Acabamentos de Qualidade",
    description: "Os detalhes fazem a diferença. Oferecemos acabamentos premium que elevam qualquer projeto, desde revestimentos de luxo a pinturas especializadas.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Projetos Personalizados",
    description: "Cada cliente é único. Desenvolvemos soluções à medida das suas necessidades, com acompanhamento dedicado em todas as fases do projeto.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
];

export function ScrollingFeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const stepHeight = scrollableHeight / slidesData.length;
      const newActiveIndex = Math.min(
        slidesData.length - 1,
        Math.floor(container.scrollTop / stepHeight)
      );
      setActiveIndex(newActiveIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const gridPatternStyle: React.CSSProperties = {
    backgroundImage: `
      linear-gradient(to right, rgba(0, 0, 0, 0.12) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 1px, transparent 1px)
    `,
    backgroundSize: '3.5rem 3.5rem',
  };

  const handlePaginationClick = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const stepHeight = scrollableHeight / slidesData.length;
      container.scrollTo({ top: stepHeight * index, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-y-scroll scroll-smooth bg-background text-foreground"
    >
      <div className="h-[400vh]">
        <div
          ref={stickyPanelRef}
          className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
              
              {/* Left Column: Text Content & Pagination */}
              <div className="flex flex-col justify-center space-y-8 order-2 lg:order-1">
                
                {/* Pagination Bars */}
                <div className="flex items-center gap-2">
                {slidesData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePaginationClick(index)}
                      className={`h-1 rounded-full transition-all duration-500 ease-in-out ${
                        index === activeIndex ? 'w-12 bg-primary' : 'w-6 bg-muted-foreground/30'
                      }`}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Text Content */}
                <div className="relative h-[200px] md:h-[180px]">
                  {slidesData.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === activeIndex
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8 pointer-events-none'
                      }`}
                    >
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-4 text-foreground">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <a
                    href="#contacto"
                    className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300"
                  >
                    Pedir Orçamento
                  </a>
                </div>
              </div>

              {/* Right Column: Image with Grid Background */}
              <div
                className="relative h-[50vh] lg:h-[70vh] rounded-3xl overflow-hidden order-1 lg:order-2 bg-secondary"
                style={gridPatternStyle}
              >
                <div className="absolute inset-4 md:inset-8 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-primary/20">
                  <div className="relative w-full h-full">
                    {slidesData.map((slide, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          index === activeIndex
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                        }`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://placehold.co/800x1200/e2e8f0/4a5568?text=Image+Not+Found`;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollingFeatureShowcase;
