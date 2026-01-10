"use client"

import * as React from "react"

import { useMeasure } from "@uidotdev/usehooks"
import { VariantProps, cva } from "class-variance-authority"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"

const processCardVariants = cva("flex border backdrop-blur-lg", {
  variants: {
    variant: {
      indigo:
        "flex border text-slate-50 border-slate-700 backdrop-blur-lg bg-gradient-to-br from-[rgba(15,23,42,0.7)_40%] to-[#3730a3_120%]",
      fortt:
        "flex border text-foreground border-border backdrop-blur-lg bg-gradient-to-br from-background/90 to-primary/20",
      light: "shadow bg-white text-gray-900",
    },
    size: {
      sm: "min-w-[25%] max-w-[25%]",
      md: "min-w-[50%] max-w-[50%]",
      lg: "min-w-[75%] max-w-[75%]",
      xl: "min-w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "fortt",
    size: "md",
  },
})

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

interface ProcessCardProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof processCardVariants> {
  itemsLength: number
  index: number
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}

export const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <section
        ref={scrollRef}
        className={cn("relative min-h-[300vh]", className)}
        {...props}
      >
        {children}
      </section>
    </ContainerScrollContext.Provider>
  )
}

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "sticky top-0 flex h-screen w-full items-center overflow-hidden",
      className
    )}
    {...props}
  />
))
ContainerSticky.displayName = "ContainerSticky"

export const ProcessCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-36 shrink-0 items-center justify-center border-r border-inherit bg-inherit",
      className
    )}
    {...props}
  />
))
ProcessCardTitle.displayName = "ProcessCardTitle"

export const ProcessCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-full flex-col justify-center gap-3 p-6", className)}
    {...props}
  />
))
ProcessCardBody.displayName = "ProcessCardBody"

export const ProcessCard: React.FC<ProcessCardProps> = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext()
  const start = index / itemsLength
  const end = start + 1 / itemsLength
  const [innerWidth, setInnerWidth] = React.useState(0)
  const [ref, { width }] = useMeasure()

  React.useEffect(() => {
    setInnerWidth(window.innerWidth)
    const handleResize = () => setInnerWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [innerWidth, -((width ?? 0) * index) + 64 * index]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        x: index > 0 ? x : 0,
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  )
}
ProcessCard.displayName = "ProcessCard"

// Demo component with Fortt Engenharia content
const PROCESS_PHASES = [
  {
    id: "process-1",
    title: "Consulta Inicial",
    description:
      "Reunimo-nos consigo para compreender a sua visão, necessidades e orçamento. Analisamos o espaço, identificamos desafios e oportunidades, criando as bases para um projeto de sucesso.",
  },
  {
    id: "process-2",
    title: "Projeto e Planeamento",
    description:
      "A nossa equipa desenvolve plantas detalhadas, cronogramas e orçamentos. Apresentamos propostas visuais que permitem visualizar o resultado final antes de iniciar a obra.",
  },
  {
    id: "process-3",
    title: "Execução da Obra",
    description:
      "Com uma equipa experiente e materiais de qualidade, executamos o projeto com rigor e profissionalismo. Acompanhamento constante garante que tudo decorre conforme planeado.",
  },
  {
    id: "process-4",
    title: "Entrega e Garantia",
    description:
      "Após inspeção final detalhada, entregamos o projeto concluído. Oferecemos garantia completa e suporte pós-obra para a sua total tranquilidade.",
  },
]

export const ProcessTimeline = () => {
  return (
    <ContainerScroll className="bg-background">
      <ContainerSticky className="flex-col gap-8 px-4 lg:px-16">
        <div className="flex w-full flex-col items-start gap-4 pt-8">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl font-montserrat">
            <span className="text-primary">O Nosso</span> Processo
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Do primeiro contacto à entrega final, acompanhamos cada fase do seu
            projeto com dedicação e profissionalismo.
          </p>
        </div>

        <div className="flex w-full gap-16 py-8">
          {PROCESS_PHASES.map((phase, index) => (
            <ProcessCard
              key={phase.id}
              index={index}
              itemsLength={PROCESS_PHASES.length}
              size="md"
              variant="fortt"
              className="h-64 rounded-2xl"
            >
              <ProcessCardTitle>
                <span className="text-5xl font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </ProcessCardTitle>
              <ProcessCardBody>
                <h3 className="text-xl font-semibold text-foreground">
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </ProcessCardBody>
            </ProcessCard>
          ))}
        </div>
      </ContainerSticky>
    </ContainerScroll>
  )
}

export default ProcessTimeline
