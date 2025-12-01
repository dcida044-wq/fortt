import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-montserrat font-black text-foreground">
            FOR<span className="text-accent">TT</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-foreground hover:text-accent transition-colors font-roboto font-medium"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection("servicos")}
            className="text-foreground hover:text-accent transition-colors font-roboto font-medium"
          >
            Serviços
          </button>
          <button
            onClick={() => scrollToSection("sobre")}
            className="text-foreground hover:text-accent transition-colors font-roboto font-medium"
          >
            Sobre Nós
          </button>
          <Button
            onClick={() => scrollToSection("contacto")}
            variant="default"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-montserrat font-bold"
          >
            Contacto
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover:text-accent transition-colors font-roboto font-medium text-left"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-foreground hover:text-accent transition-colors font-roboto font-medium text-left"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-foreground hover:text-accent transition-colors font-roboto font-medium text-left"
            >
              Sobre Nós
            </button>
            <Button
              onClick={() => scrollToSection("contacto")}
              variant="default"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-montserrat font-bold w-full"
            >
              Contacto
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
