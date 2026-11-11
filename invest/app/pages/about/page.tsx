
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  Wallet,
  BellRing,
  Code2,
  Target,
  MessageSquareText,
} from "lucide-react";

import Image from "next/image";

export const metadata = {
  title: "Sobre | Invest",
  description: "Conheça o projeto Invest e seu propósito.",
};

const features = [
  {
    icon: Search,
    title: "Explore o mercado",
    description:
      "Pesquise ações e fundos imobiliários, conheça seus indicadores e acompanhe suas movimentações.",
  },
  {
    icon: Wallet,
    title: "Organize sua carteira",
    description:
      "Reúna seus ativos em um só lugar e acompanhe a evolução dos seus investimentos.",
  },
  {
    icon: BellRing,
    title: "Acompanhe oportunidades",
    description:
      "Configure alertas personalizados de valorização para acompanhar os ativos de seu interesse.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <section className="mx-auto max-w-3xl py-12 text-center sm:py-20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-emerald-700  dark:text-emerald-400">
            <Image src="/icons/logo.svg" width={20} height={20} alt=""/>
          </div>

          <span className="mt-6 block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Conheça o Invest
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Mais clareza para acompanhar seus investimentos.
          </h1>

          <p className="mt-6 text-base leading-8 text-slate-500 dark:text-slate-400 sm:text-lg">
            O Invest nasceu com a proposta de tornar o acompanhamento do
            mercado financeiro mais simples, organizado e acessível,
            reunindo informações sobre ações e fundos imobiliários em um
            único ambiente.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-10 border-y border-slate-200 py-12 dark:border-slate-800 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Nosso propósito
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Por que o Invest foi criado?
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-8 text-slate-500 dark:text-slate-400 sm:text-base">
            <p>
              Acompanhar investimentos envolve observar diferentes ativos,
              comparar variações e entender como uma carteira evolui ao
              longo do tempo. O Invest foi idealizado para centralizar
              essas informações e facilitar essa experiência.
            </p>

            <p>
              A ideia é oferecer ferramentas que ajudem o usuário a
              acompanhar suas ações e fundos imobiliários, organizar sua
              carteira e estabelecer parâmetros próprios para observar
              oportunidades no mercado.
            </p>

            <p>
              Mais do que apresentar números, o objetivo é proporcionar
              uma experiência intuitiva, na qual cada pessoa tenha mais
              facilidade para acompanhar suas decisões financeiras.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Funcionalidades
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              O que você encontra no Invest?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Recursos pensados para facilitar o acompanhamento e a
              organização dos seus investimentos.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-base font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-12">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Code2 size={22} />
            </div>

            <span className="mt-6 block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Desenvolvimento
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              Um projeto em constante evolução.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              O Invest também é um projeto de desenvolvimento de software,
              criado para colocar em prática conhecimentos em programação,
              construção de interfaces e desenvolvimento web. Sua evolução
              acontece gradualmente, com novas funcionalidades e melhorias
              de experiência.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
              O código-fonte e o desenvolvimento do projeto podem ser
              acompanhados no meu GitHub.
            </p>
          </div>

          <Link
            href="https://github.com/DevJhonathas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            <Code2 size={18} />
            Meu GitHub
            <ArrowUpRight size={16} />
          </Link>
        </section>

        <section className="mt-10 flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Target size={19} />
          </div>

          <h2 className="text-xl font-bold">
            Informação para decisões mais conscientes.
          </h2>

          <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
            O Invest tem como propósito ajudar você a acompanhar seus
            investimentos com mais organização. As informações apresentadas
            não constituem recomendações financeiras.
          </p>

          <Link
            href="/pages/search"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Explorar o mercado
            <ArrowUpRight size={16} />
          </Link>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <MessageSquareText size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Sua opinião faz a diferença.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                  Tem alguma sugestão, reclamação ou recomendação? Compartilhe
                  sua experiência e ajude a tornar o Invest cada vez melhor.
                </p>
              </div>
            </div>

            <Link
              href="/pages/feedback"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Enviar feedback
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
