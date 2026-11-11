
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquareText,
  Lightbulb,
  AlertCircle,
  Send,
  CheckCircle2,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

export default function FeedbackPage() {
  const [type, setType] = useState("Sugestão");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus(
      "O formulário está preparado, mas ainda não possui integração para receber mensagens. Nenhum dado foi enviado."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={16} />
          Voltar ao início
        </Link>

        <section className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <MessageSquareText size={27} />
            </div>

            <span className="mt-7 block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Sua opinião importa
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ajude o Invest a evoluir.
            </h1>

            <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
              Encontrou algum problema? Tem uma ideia para melhorar a
              plataforma? Este espaço foi criado para receber suas
              reclamações, sugestões e recomendações.
            </p>

            <div className="mt-9 space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Lightbulb size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Compartilhe suas ideias
                  </h2>
                  <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    Sugestões de novos recursos e melhorias são sempre
                    bem-vindas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                  <AlertCircle size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Relate um problema
                  </h2>
                  <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    Encontrou um erro ou algo que não está funcionando
                    corretamente? Conte o que aconteceu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.03] dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-bold">
                Envie sua mensagem
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Preencha os campos abaixo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="feedbackType" className={labelClass}>
                  Tipo de mensagem
                </label>

                <select
                  id="feedbackType"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className={inputClass}
                >
                  <option value="Sugestão">Sugestão</option>
                  <option value="Reclamação">Reclamação</option>
                  <option value="Recomendação">Recomendação</option>
                  <option value="Relato de problema">
                    Relato de problema
                  </option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  E-mail para contato
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    (opcional)
                  </span>
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@email.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Sua mensagem
                </label>

                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Conte-nos como podemos melhorar..."
                  rows={6}
                  maxLength={2000}
                  required
                  className={`${inputClass} resize-none`}
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                  {message.length}/2000 caracteres
                </p>
              </div>

              {status && (
                <p
                  role="status"
                  className="rounded-xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300"
                >
                  {status}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.99]"
              >
                <Send size={17} />
                Enviar mensagem
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-6 text-slate-400">
              Sua mensagem é importante para o desenvolvimento do Invest.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
