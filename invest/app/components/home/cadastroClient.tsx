
"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  UserRound,
  Mail,
  LockKeyhole,
} from "lucide-react";

type CadastroClientProps = {
  birthDateField: ReactNode;
};

export default function CadastroClient({
  birthDateField,
}: CadastroClientProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const birthDateValue = String(formData.get("birthDate") ?? "");

    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(birthDateValue);

    if (!match) {
      setError("Informe uma data de nascimento válida.");
      return;
    }

    const [, dayString, monthString, yearString] = match;

    const day = Number(dayString);
    const month = Number(monthString);
    const year = Number(yearString);

    const parsedDate = new Date(year, month - 1, day);

      if (
        year < 1900 ||
        parsedDate.getFullYear() !== year ||
        parsedDate.getMonth() !== month - 1 ||
        parsedDate.getDate() !== day
      ) {
        setError("Informe uma data de nascimento válida.");
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (parsedDate > today) {
        setError("A data de nascimento não pode ser futura.");
        return;
    }
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setMessage(
      "Formulário validado! O cadastro ainda não está conectado a um serviço de autenticação."
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
          >
            <ArrowLeft size={16} />
            Voltar ao início
          </Link>
        </header>

        <section className="mt-2 flex flex-1 items-center justify-center pb-8">
          <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-emerald-950 p-10 text-white lg:flex">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />

              <div className="relative z-10">
                <Link href="/" className="text-2xl font-bold tracking-tight">
                  invest<span className="text-emerald-400">.</span>
                </Link>

                <div className="mt-20">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                    Comece agora
                  </span>

                  <h1 className="mt-4 text-4xl font-bold leading-tight">
                    Seu futuro financeiro começa com uma decisão.
                  </h1>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-100/70">
                    Crie sua conta e tenha um espaço para acompanhar seus
                    investimentos, organizar sua carteira e acompanhar
                    oportunidades.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-xs text-emerald-100/50">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Invista com mais informação e planejamento.
              </div>
            </aside>

            <div className="p-6 sm:p-10 lg:p-12">
              <div className="mx-auto max-w-lg">
                <div className="mb-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400 lg:hidden">
                    <UserRound size={23} />
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Crie sua conta
                  </h2>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Preencha seus dados para começar a utilizar o Invest.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Nome
                      </label>
                      <div className="relative">
                        <UserRound
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Seu nome"
                          autoComplete="given-name"
                          required
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="surname" className={labelClass}>
                        Sobrenome
                      </label>
                      <input
                        id="surname"
                        name="surname"
                        type="text"
                        placeholder="Seu sobrenome"
                        autoComplete="family-name"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="birthDate" className={labelClass}>
                        Data de nascimento
                      </label>

                      {birthDateField}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="voce@email.com"
                          autoComplete="email"
                          required
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className={labelClass}>
                      Senha
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mínimo de 8 caracteres"
                        autoComplete="new-password"
                        minLength={8}
                        required
                        className={`${inputClass} pl-11 pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Digite sua senha novamente"
                        autoComplete="new-password"
                        required
                        className={`${inputClass} pl-11 pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Ocultar confirmação de senha"
                            : "Mostrar confirmação de senha"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    >
                      {error}
                    </p>
                  )}

                  {message && (
                    <p
                      role="status"
                      className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    >
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.99]"
                  >
                    Criar minha conta
                  </button>
                </form>

                <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
                  Já possui uma conta?{" "}
                  <Link
                    href="/pages/login"
                    className="font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Faça login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
