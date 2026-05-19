"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
}

type Status = "idle" | "submitting" | "success";

const projectTypes = ["Residencial", "Comercial", "Interiores", "Institucional", "Outro"];
const budgets = [
  "Até R$ 200 mil",
  "R$ 200 mil – R$ 500 mil",
  "R$ 500 mil – R$ 1 milhão",
  "Acima de R$ 1 milhão",
  "A definir",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Campo obrigatório";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "E-mail inválido";
    if (!form.phone.trim()) e.phone = "Campo obrigatório";
    if (!form.projectType) e.projectType = "Selecione uma opção";
    if (!form.message.trim()) e.message = "Campo obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1600));
    setStatus("success");
  };

  const set = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const input = (field: keyof FormData) =>
    `w-full bg-transparent border-b pb-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors duration-300 ${
      errors[field]
        ? "border-red-400 focus:border-red-600"
        : "border-stone-300 focus:border-stone-900"
    }`;

  return (
    <section id="contato" className="py-32 lg:py-40 px-6 lg:px-8 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-stone-400" />
                <span className="text-xs tracking-[0.3em] uppercase text-stone-500">
                  Contato
                </span>
              </div>
              <h2 className="font-serif text-5xl lg:text-6xl font-light text-stone-900 leading-tight">
                Vamos criar algo{" "}
                <em>extraordinário</em> juntos?
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Cada projeto começa com uma conversa. Conte-nos sobre sua visão e
              exploraremos juntos as possibilidades.
            </p>
            <div className="space-y-5 pt-2">
              {[
                { label: "E-mail", value: "contato@planoarq.com.br" },
                { label: "Telefone", value: "+55 (11) 3456-7890" },
                { label: "Endereço", value: "Av. Paulista, 1374 — São Paulo, SP" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-[10px] text-stone-400 tracking-[0.25em] uppercase mb-1">
                    {item.label}
                  </div>
                  <div className="text-stone-800 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full border border-stone-300 flex items-center justify-center">
                    <Check size={22} className="text-stone-700" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-stone-900 mb-2">
                      Mensagem Enviada
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Retornaremos em até 24 horas úteis.
                    </p>
                  </div>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name:"",email:"",phone:"",projectType:"",budget:"",message:"" }); }}
                    className="text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors underline underline-offset-4"
                  >
                    Enviar nova mensagem
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <input
                        type="text"
                        placeholder="Nome completo *"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={input("name")}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="E-mail *"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={input("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Telefone / WhatsApp *"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={input("phone")}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <CustomSelect
                      options={projectTypes}
                      value={form.projectType}
                      onChange={(v) => set("projectType", v)}
                      placeholder="Tipo de Projeto *"
                      error={errors.projectType}
                    />
                    <CustomSelect
                      options={budgets}
                      value={form.budget}
                      onChange={(v) => set("budget", v)}
                      placeholder="Orçamento Estimado"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Conte-nos sobre o seu projeto *"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={4}
                      className={`${input("message")} resize-none`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="w-full py-4 bg-stone-900 text-white text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 hover:bg-stone-800 transition-colors disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      "Enviar Mensagem"
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
