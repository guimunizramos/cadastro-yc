import { useState } from "react";

const maskPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

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

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  error?: string;
}

const SelectField = ({ label, options, value, onChange, placeholder, error }: SelectFieldProps) => (
  <div>
    <label className="form-label">{label} <span className="text-primary">*</span></label>
    <select
      className="input-field appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled className="bg-card text-muted-foreground">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-card text-foreground">{opt}</option>
      ))}
    </select>
    {error && <p className="text-sm text-destructive mt-1">{error}</p>}
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      await fetch("https://webhook.lp-youconprojetos.com.br/webhook/formulario-steel-frame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("admin:123456"),
        },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
    }

    window.location.href = "https://chat.whatsapp.com/BxXxLl9oORFDK16nmeBaX7?mode=gi_t";
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
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
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
            onChange={(e) => updateField(key, key === "telefone" ? maskPhone(e.target.value) : e.target.value)}
          />
          {errors[key] && <p className="text-sm text-destructive mt-1">{errors[key]}</p>}
        </div>
      ))}

      <SelectField
        label="Qual tipo de serviço você está em busca?"
        options={serviceOptions}
        value={formData.servico}
        onChange={(val) => updateField("servico", val)}
        placeholder="Selecione o tipo de serviço"
        error={errors.servico}
      />

      <SelectField
        label="Já possui terreno?"
        options={terrenoOptions}
        value={formData.terreno}
        onChange={(val) => updateField("terreno", val)}
        placeholder="Selecione uma opção"
        error={errors.terreno}
      />

      <SelectField
        label="Você já possui algum projeto?"
        options={projetoOptions}
        value={formData.projeto}
        onChange={(val) => updateField("projeto", val)}
        placeholder="Selecione uma opção"
        error={errors.projeto}
      />

      <SelectField
        label="Quando pretende iniciar a Obra?"
        options={prazoOptions}
        value={formData.prazo}
        onChange={(val) => updateField("prazo", val)}
        placeholder="Selecione um prazo"
        error={errors.prazo}
      />

      <SelectField
        label="Quanto você espera que irá custar sua obra/construção?"
        options={orcamentoOptions}
        value={formData.orcamento}
        onChange={(val) => updateField("orcamento", val)}
        placeholder="Selecione uma faixa de investimento"
        error={errors.orcamento}
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-primary py-4 text-lg font-bold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 mt-4"
      >
        {submitting ? "REDIRECIONANDO..." : "ENVIAR INFORMAÇÕES"}
      </button>
    </form>
  );
};

export default YouConForm;
