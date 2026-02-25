import YouConForm from "@/components/YouConForm";
import logoYoucon from "@/assets/logo-youcon.png";
import bgDesktop from "@/assets/bg-desktop.jpg";
import bgMobile from "@/assets/bg-mobile.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={bgMobile} />
          <img
            src={bgDesktop}
            alt=""
            className="w-full h-full object-cover opacity-50" />

        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="py-6 flex justify-center border-b border-border">
          <img src={logoYoucon} alt="YouCon" className="h-10 md:h-12" />
        </header>

        {/* Hero */}
        <main className="flex-1 px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block mb-6 px-5 py-1.5 rounded-full border border-primary text-primary uppercase text-xs font-semibold tracking-widest">
              OPORTUNIDADE EXCLUSIVA
            </span>
            <h1 className="text-3xl font-extrabold leading-tight text-foreground mb-6 font-heading px-0 md:text-6xl">
              DÊ O PRÓXIMO PASSO PARA A SUA CASA EM{" "}
              <span className="text-primary">STEEL FRAME</span>
            </h1>
            <p className="text-base text-secondary-foreground leading-relaxed max-w-2xl mx-auto md:text-sm">
              Preencha o formulário rápido abaixo para que nossa equipe técnica entenda o momento
              atual do seu projeto. Ao finalizar, você será direcionado para nossa agenda exclusiva,
              onde poderá escolher o melhor dia e horário para a sua reunião de viabilidade.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 md:p-10">
            <YouConForm />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 YouCon Arquitetura e Engenharia. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>);

};

export default Index;