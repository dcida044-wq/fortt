"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 40;
const FRAME_PATH = (n: number) =>
  `/frames/frame_${String(n).padStart(3, "0")}.jpg`;

// Easing muito suave — pequenas variações de ritmo, sem solavancos
const variableSpeedEase = (t: number): number => {
  const wave = Math.sin(t * Math.PI * 2) * 0.03;
  return Math.max(0, Math.min(1, t + wave));
};

// Interpolação linear
const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

export default function ImageSequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Pré-carregar todas as imagens
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Ajustar canvas ao tamanho da viewport
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext("2d");
    ctx?.scale(dpr, dpr);
    drawFrame(currentFrameRef.current);
  };

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;

    const lower = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(frameIndex)));
    const upper = Math.min(TOTAL_FRAMES - 1, lower + 1);
    const blend = frameIndex - lower;

    const imgA = imagesRef.current[lower];
    const imgB = imagesRef.current[upper];
    if (!imgA || !imgA.complete) return;

    const computeRect = (img: HTMLImageElement) => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let drawW: number, drawH: number, dx: number, dy: number;
      if (imgRatio > canvasRatio) {
        drawH = ch; drawW = ch * imgRatio;
        dx = (cw - drawW) / 2; dy = 0;
      } else {
        drawW = cw; drawH = cw / imgRatio;
        dx = 0; dy = (ch - drawH) / 2;
      }
      return { drawW, drawH, dx, dy };
    };

    ctx.clearRect(0, 0, cw, ch);

    // Frame base
    const a = computeRect(imgA);
    ctx.globalAlpha = 1;
    ctx.drawImage(imgA, a.dx, a.dy, a.drawW, a.drawH);

    // Cross-fade com o próximo frame para suavizar transição
    if (imgB && imgB.complete && upper !== lower && blend > 0) {
      const b = computeRect(imgB);
      ctx.globalAlpha = blend;
      ctx.drawImage(imgB, b.dx, b.dy, b.drawW, b.drawH);
      ctx.globalAlpha = 1;
    }
  };

  // Loop de animação contínuo (lerp para suavidade tipo vídeo)
  const animate = () => {
    const current = currentFrameRef.current;
    const target = targetFrameRef.current;
    const diff = target - current;

    if (Math.abs(diff) < 0.001) {
      currentFrameRef.current = target;
      drawFrame(target);
      runningRef.current = false;
      return;
    }

    // Lerp suave — quanto menor, mais suave (e mais "lento" a alcançar)
    currentFrameRef.current = lerp(current, target, 0.08);
    drawFrame(currentFrameRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(animate);
  };

  // Handler de scroll
  useEffect(() => {
    if (!isReady) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const rawProgress = Math.min(1, Math.max(0, scrolled / scrollDistance));

      const easedProgress = variableSpeedEase(rawProgress);
      targetFrameRef.current = easedProgress * (TOTAL_FRAMES - 1);
      startAnimation();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady]);

  const loadProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background"
      style={{ height: "400vh" }}
      aria-label="Sequência de imagens com scroll"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />

        {/* Loading overlay */}
        {!isReady && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background">
            <div className="mb-4 text-2xl font-montserrat font-bold text-foreground">
              A carregar experiência...
            </div>
            <div className="h-1 w-64 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {loadProgress}%
            </div>
          </div>
        )}

        {/* Overlay textual */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-8 lg:p-16">
          <div className="max-w-2xl">
            <div className="mb-3 inline-block rounded-full border border-primary/30 bg-background/40 px-4 py-1 text-xs font-roboto uppercase tracking-widest text-primary backdrop-blur-sm">
              Em Movimento
            </div>
            <h2 className="font-montserrat text-4xl font-black leading-tight text-foreground md:text-6xl lg:text-7xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              Construímos com <span className="text-primary">Precisão</span>
            </h2>
          </div>

          <div className="self-end max-w-md text-right">
            <p className="font-roboto text-lg text-foreground/90 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              Cada detalhe importa. Cada frame conta uma história de
              dedicação, técnica e excelência.
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <div className="text-xs font-roboto uppercase tracking-widest text-foreground/70">
            Continue a scrollar
          </div>
        </div>
      </div>
    </section>
  );
}
