
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  // TrendingUp,
} from "lucide-react";

import Image from "next/image";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFeedback(
      "A autenticação por e-mail ainda precisa ser conectada ao sistema."
    );
  };

  const handleSocialLogin = (provider: string) => {
    setFeedback(
      `O acesso com ${provider} estará disponível após a integração da autenticação.`
    );
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <main className="flex min-h-screen flex-col">
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
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.04] dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2">
              <div className="relative flex flex-col justify-between overflow-hidden bg-[#102b25] p-8 text-white dark:bg-[#071d18] sm:p-10 lg:p-12">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    SEUS INVESTIMENTOS SOB CONTROLE
                  </span>

                  <h2 className="mt-8 max-w-md text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                    Seu patrimônio merece{" "}
                    <span className="text-emerald-400">
                      mais atenção.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
                    Acompanhe seus investimentos, organize sua carteira e
                    monitore suas metas em um só lugar.
                  </p>
                </div>

                <div className="relative z-10 mt-12 space-y-5">
                  {[
                    {
                      title: "Acompanhe sua carteira",
                      description:
                        "Tenha uma visão organizada dos seus ativos e resultados.",
                    },
                    {
                      title: "Defina suas metas",
                      description:
                        "Configure alertas personalizados de valorização.",
                    },
                    {
                      title: "Explore o mercado",
                      description:
                        "Consulte diferentes ativos e acompanhe suas cotações.",
                    },
                  ].map((item, index) => (
                    <div key={item.title} className="flex gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-xs font-bold text-emerald-300">
                        0{index + 1}
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 mt-12 border-t border-white/10 pt-5">
                  <p className="text-xs text-slate-400">
                    Organize hoje. Acompanhe sua evolução.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-10 lg:p-12">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                    Bem-vindo de volta
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Entre na sua conta para continuar acompanhando seus
                    investimentos.
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Google")}
                    className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Image src="/icons/google.svg" alt="" width={20} height={20} />
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Apple")}
                    className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Image src="/icons/apple.svg" alt="" width={20} height={20} />
                    Apple
                  </button>
                </div>

                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                  <span className="text-[11px] font-medium text-slate-400">
                    OU CONTINUE COM E-MAIL
                  </span>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      E-mail
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="seuemail@exemplo.com"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <label
                        htmlFor="password"
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Senha
                      </label>

                      <span className="text-[11px] text-slate-400">
                        Proteja suas credenciais
                      </span>
                    </div>

                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Digite sua senha"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={
                          showPassword ? "Ocultar senha" : "Mostrar senha"
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  {feedback && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200"
                    >
                      {feedback}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/10 transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    Entrar na minha conta
                    <ArrowRight size={17} />
                  </button>
                </form>

                <div className="mt-8 border-t border-slate-100 pt-6 text-center dark:border-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Ainda não tem uma conta?{" "}
                    <Link
                      href="/pages/cadastro"
                      className="font-bold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      Criar conta
                    </Link>
                  </p>
                </div>

                <p className="mt-6 text-center text-[11px] leading-5 text-slate-400 dark:text-slate-500">
                  Ao continuar, você concorda com os termos de uso e a
                  política de privacidade do Invest.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
