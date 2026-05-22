import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

// Lazy-load 3D Spline scene — só monta quando entra na viewport
const SplineScene = lazy(() =>
  import("@/components/ui/splite").then((m) => ({ default: m.SplineScene }))
);

const Spline3DSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

      <div className="container mx-auto px-4">
        <Card className="w-full h-[500px] bg-background/80 relative overflow-hidden border-accent/20">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="hsl(var(--fortt-yellow))"
          />

          <div className="flex flex-col md:flex-row h-full">
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
                Experiência Interativa 3D
              </h2>
              <p className="mt-4 text-muted-foreground font-roboto max-w-lg">
                Explore nossos projetos em 3D. Criamos experiências imersivas que
                capturam atenção e demonstram a excelência da FORTT em cada detalhe.
              </p>
            </div>

            <div className="flex-1 relative min-h-[300px]">
              {shouldLoad && (
                <Suspense fallback={<div className="w-full h-full" />}>
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </Suspense>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Spline3DSection;
