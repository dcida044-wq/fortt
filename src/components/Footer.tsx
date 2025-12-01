const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary border-t-2 border-accent py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-3xl font-montserrat font-black text-foreground mb-4">
              FOR<span className="text-accent">TT</span>
            </div>
            <p className="text-muted-foreground font-roboto leading-relaxed">
              A solidez da construção, a visão do futuro.
            </p>
            <div className="mt-4 inline-flex items-center bg-accent/10 border border-accent/30 px-4 py-2 rounded-sm">
              <span className="text-sm font-roboto text-foreground">
                Alvará <strong>113336-PAR</strong>
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-montserrat font-bold text-xl text-foreground mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="text-muted-foreground hover:text-accent transition-colors font-roboto"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("servicos")}
                  className="text-muted-foreground hover:text-accent transition-colors font-roboto"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("sobre")}
                  className="text-muted-foreground hover:text-accent transition-colors font-roboto"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="text-muted-foreground hover:text-accent transition-colors font-roboto"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-bold text-xl text-foreground mb-4">
              Contacto
            </h3>
            <ul className="space-y-2 text-muted-foreground font-roboto">
              <li>
                <a
                  href="tel:+351939855248"
                  className="hover:text-accent transition-colors"
                >
                  +351 939 855 248
                </a>
              </li>
              <li>Algés, Portugal</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground font-roboto text-sm">
            © {new Date().getFullYear()} FORTT Construção Civil. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
