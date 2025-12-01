import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  email: z.string().trim().email({ message: "Email inválido" }).max(255, { message: "Email deve ter menos de 255 caracteres" }),
  phone: z.string().trim().min(9, { message: "Telefone inválido" }).max(20, { message: "Telefone deve ter menos de 20 caracteres" }),
  message: z.string().trim().min(10, { message: "Mensagem muito curta" }).max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" }),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);
      
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contacto brevemente.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-black text-4xl md:text-6xl text-foreground mb-4">
            Vamos Construir <span className="text-accent">Juntos?</span>
          </h2>
          <p className="text-xl text-muted-foreground font-roboto">
            Entre em contacto para um orçamento gratuito
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="bg-card border border-border p-6 rounded-sm hover:border-accent transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <Phone className="text-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={28} />
                <div>
                  <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                    Telefone
                  </h3>
                  <a
                    href="tel:+351939855248"
                    className="text-muted-foreground hover:text-accent transition-colors font-roboto text-lg"
                  >
                    +351 939 855 248
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-sm hover:border-accent transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <Mail className="text-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={28} />
                <div>
                  <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                    Email
                  </h3>
                  <p className="text-muted-foreground font-roboto">
                    Brevemente disponível
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-sm hover:border-accent transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <MapPin className="text-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={28} />
                <div>
                  <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                    Morada
                  </h3>
                  <p className="text-muted-foreground font-roboto leading-relaxed">
                    Rua Marquês de Pombal, Lote 5<br />
                    Escritório 2A<br />
                    4700-123 Braga, Portugal
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/30 p-6 rounded-sm">
              <p className="text-sm font-roboto text-foreground flex items-center">
                <span className="inline-block w-2 h-2 bg-accent rounded-full mr-3"></span>
                Alvará de Construção: <strong className="ml-2">113336-PAR</strong>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Nome *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-card border-border focus:border-accent font-roboto text-lg"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-card border-border focus:border-accent font-roboto text-lg"
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Telefone *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-card border-border focus:border-accent font-roboto text-lg"
              />
            </div>
            <div>
              <Textarea
                placeholder="Descreva o seu projeto ou pedido de orçamento *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="bg-card border-border focus:border-accent font-roboto text-lg resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-montserrat font-bold text-lg py-6 shadow-[0_0_40px_rgba(255,195,0,0.3)] hover:shadow-[0_0_60px_rgba(255,195,0,0.5)] transition-all duration-300"
            >
              {isSubmitting ? "A Enviar..." : "Enviar Pedido de Orçamento"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
