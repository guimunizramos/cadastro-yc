import YouConForm from "@/components/YouConForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-6 flex justify-center border-b border-border">
        <span className="text-2xl font-bold tracking-wider text-foreground font-heading">
          YOU<span className="text-primary">CON</span>
        </span>
      </header>

      {/* Hero */}
      <main className="flex-1 px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-6 font-heading">
            DÊ O PRÓXIMO PASSO PARA A SUA CASA EM{" "}
            <span className="text-primary">STEEL FRAME</span>
          </h1>
          <p className="text-base md:text-lg text-secondary-foreground leading-relaxed max-w-2xl mx-auto">
            Preencha o formulário rápido abaixo para que nossa equipe técnica entenda o momento
            atual do seu projeto. Ao finalizar, você será direcionado para nossa agenda exclusiva,
            onde poderá escolher o melhor dia e horário para a sua reunião de viabilidade.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border p-6 md:p-10">
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
  );
};

export default Index;
