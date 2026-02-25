import { useState } from "react";

const serviceOptions = [
  "Projetos de Arquitetura e Engenharia",
  "Construção/Obra do Zero",
  "Reforma/Ampliação",
  "Design de Interiores",
];

const terrenoOptions = ["Sim", "Ainda não"];

const projetoOptions = [
  "Não, estou começando do zero",
  "Sim, já tenho o projeto arquitetônico",
  "Sim, já tenho todos os projetos (arquitetônico e complementares)",
  "Estou com um projeto em andamento",
];

const prazoOptions = [
  "01 a 03 meses",
  "03 a 06 meses",
  "06 meses a 01 ano",
  "Mais de 01 ano",
];

const orcamentoOptions = [
  "100 a 500 mil",
  "600 a 800 mil",
  "800 mil a 1.2 milhão",
  "1.2 a +2 milhões",
];

interface RadioGroupFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const RadioGroupField = ({ label, options, value, onChange, error }: RadioGroupFieldProps) => (
  <div className="space-y-3">
    <label className="form-label">{label} <span className="text-primary">*</span></label>
    <div className="grid gap-2">
      {options.map((opt) => (
        <div
          key={opt}
          className={`radio-option ${value === opt ? "selected" : ""}`}
          onClick={() => onChange(opt)}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
              value === opt ? "border-primary" : "border-muted-foreground"
            }`}
          >
            {value === opt && <div className="w-2 h-2 rounded-full bg-primary" />}
          </div>
          <span className="text-sm text-foreground">{opt}</span>
        </div>
      ))}
    </div>
    {error && <p className="text-sm text-destructive">{error}</p>}
  </div>
);

const YouConForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    servico: "",
    terreno: "",
    projeto: "",
    prazo: "",
    orcamento: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Campo obrigatório";
    if (!formData.email.trim()) newErrors.email = "Campo obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "E-mail inválido";
    if (!formData.telefone.trim()) newErrors.telefone = "Campo obrigatório";
    if (!formData.cidade.trim()) newErrors.cidade = "Campo obrigatório";
    if (!formData.servico) newErrors.servico = "Selecione uma opção";
    if (!formData.terreno) newErrors.terreno = "Selecione uma opção";
    if (!formData.projeto) newErrors.projeto = "Selecione uma opção";
    if (!formData.prazo) newErrors.prazo = "Selecione uma opção";
    if (!formData.orcamento) newErrors.orcamento = "Selecione uma opção";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Redirect to Google Calendar
    window.location.href = "https://calendar.app.google/dBuq3LUK1s6y9JRv9";
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* Text inputs */}
      {[
        { key: "nome", label: "Nome Completo", type: "text", placeholder: "Seu nome completo" },
        { key: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
        { key: "telefone", label: "Telefone (WhatsApp)", type: "tel", placeholder: "(00) 00000-0000" },
        { key: "cidade", label: "Cidade / Estado", type: "text", placeholder: "Ex: São Paulo / SP" },
      ].map(({ key, label, type, placeholder }) => (
        <div key={key}>
          <label className="form-label">
            {label} <span className="text-primary">*</span>
          </label>
          <input
            type={type}
            className="input-field"
            placeholder={placeholder}
            value={formData[key as keyof typeof formData]}
            onChange={(e) => updateField(key, e.target.value)}
          />
          {errors[key] && <p className="text-sm text-destructive mt-1">{errors[key]}</p>}
        </div>
      ))}

      {/* Radio groups */}
      <RadioGroupField
        label="Qual tipo de serviço você está em busca?"
        options={serviceOptions}
        value={formData.servico}
        onChange={(val) => updateField("servico", val)}
        error={errors.servico}
      />

      <RadioGroupField
        label="Já possui terreno?"
        options={terrenoOptions}
        value={formData.terreno}
        onChange={(val) => updateField("terreno", val)}
        error={errors.terreno}
      />

      <RadioGroupField
        label="Você já possui algum projeto?"
        options={projetoOptions}
        value={formData.projeto}
        onChange={(val) => updateField("projeto", val)}
        error={errors.projeto}
      />

      <RadioGroupField
        label="Quando pretende iniciar a Obra?"
        options={prazoOptions}
        value={formData.prazo}
        onChange={(val) => updateField("prazo", val)}
        error={errors.prazo}
      />

      <RadioGroupField
        label="Quanto você espera que irá custar sua obra/construção?"
        options={orcamentoOptions}
        value={formData.orcamento}
        onChange={(val) => updateField("orcamento", val)}
        error={errors.orcamento}
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-primary py-4 text-lg font-bold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 mt-4"
      >
        {submitting ? "REDIRECIONANDO..." : "ACESSAR HORÁRIOS DISPONÍVEIS"}
      </button>
    </form>
  );
};

export default YouConForm;
