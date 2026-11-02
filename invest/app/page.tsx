import Link from "next/link";
export default function Home() {
    return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <main>
        {/* HERO */}
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-100 dark:border-emerald-900/70 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"/>
              <span className="text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-300">
                SEUS INVESTIMENTOS SOB CONTROLE
              </span>
            </div>
            <h1 className="max-w-2xl text-4xl leading-[1.15] font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl lg:text-6xl">
              Acompanhe o mercado.
              <span className="mt-2 block text-emerald-600 dark:text-emerald-400">
                Saiba quando agir.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
              Acompanhe suas ações e fundos imobiliários em um só lugar.
              Monitore a evolução da sua carteira e configure alertas
              personalizados para não perder suas metas de valorização.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/cadastro" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/10 transition-all hover:-translate-y-0.5 hover:bg-emerald-700">
                Começar agora
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/cotacoes" className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-7 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors hover:border-emerald-200 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/70">
                Explorar cotações
              </Link>
            </div>
            <div className="mt-9 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              Acompanhe seus investimentos de forma simples e organizada.
            </div>
          </div>
          {/* DEMONSTRAÇÃO DO SISTEMA */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-emerald-100/60 dark:bg-emerald-950/40 blur-3xl"/>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xl shadow-slate-900/[0.04] sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Resumo da carteira
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Visão geral dos seus investimentos
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-2.5 text-slate-500 dark:text-slate-400">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M7 9h10M7 13h6"/>
                  </svg>
                </div>
              </div>
              <div className="mt-7 rounded-2xl bg-[#f8faf9] dark:bg-slate-950 p-5">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Patrimônio total
                </p>
                <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
                    R$ 18.420,80
                  </h2>
                  <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m5 12 7-7 7 7M12 5v14"/>
                    </svg>
                    +8,42%
                  </span>
                </div>
                <div className="mt-5 flex h-12 items-end gap-1.5">
                  {[25, 40, 32, 55, 45, 65, 50, 75, 63, 90, 72, 100].map((height, index) => (<div key={index} className="flex-1 rounded-t-sm bg-emerald-500/80" style={{ height: `${height}%` }}/>))}
                </div>
                <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-400">
                  Evolução ilustrativa do patrimônio
                </p>
              </div>
              {/* ALERTA PERSONALIZADO */}
              <div className="mt-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
                      <path d="M10 21h4"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
                        Meta de valorização atingida!
                      </p>
                      <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2 py-1 text-[9px] font-bold tracking-wide text-emerald-800 dark:text-emerald-300">
                        ALERTA
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-emerald-900/80 dark:text-emerald-200/90">
                      PETR4 atingiu a valorização definida por você.
                      Considere avaliar a realização do lucro.
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-emerald-200/70 dark:border-emerald-800 pt-3">
                      <span className="text-xs text-emerald-800 dark:text-emerald-300">
                        Meta configurada
                      </span>
                      <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                        +12,00%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between px-1">
                <span className="text-xs text-slate-400 dark:text-slate-400">
                  Exemplo de funcionamento
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Dados fictícios
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* FUNCIONALIDADES */}
        <section className="border-y border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                MAIS CLAREZA PARA INVESTIR
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
                Tudo o que você precisa em um só lugar.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
                Ferramentas para acompanhar seus investimentos e tomar
                decisões com mais informação.
              </p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {/* CARD 1 */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/[0.04]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3"/>
                    <path d="M8 16v-4m4 4V8m4 8v-6"/>
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-slate-100">
                  Acompanhe sua carteira
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Visualize o patrimônio, acompanhe a rentabilidade e entenda
                  como seus investimentos estão evoluindo.
                </p>
              </div>
              {/* CARD 2 */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/[0.04]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
                    <path d="M10 21h4"/>
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-slate-100">
                  Configure seus alertas
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Defina uma meta de valorização para cada ativo e receba
                  avisos quando o percentual estabelecido for atingido.
                </p>
              </div>
              {/* CARD 3 */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/[0.04]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="m7 14 4-4 3 3 6-7"/>
                    <path d="M15 6h5v5"/>
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-slate-100">
                  Explore o mercado
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Consulte ações, fundos imobiliários e outros ativos da
                  bolsa brasileira em um ambiente organizado.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* COMO FUNCIONA */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
            <div>
              <span className="text-xs font-bold tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                SEU INVESTIMENTO, SUAS METAS
              </span>
              <h2 className="mt-4 max-w-lg text-3xl leading-tight font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
                Você define seus objetivos. Nós ajudamos a acompanhá-los.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-400">
                Nem sempre é possível acompanhar o mercado durante todo o
                dia. Por isso, você pode estabelecer metas de valorização
                e deixar o Invest monitorar os ativos por você.
              </p>
              <Link href="/cadastro" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300 transition-colors hover:text-emerald-800 dark:hover:text-emerald-200">
                Criar minha conta
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="space-y-7">
              {[
            {
                number: "01",
                title: "Adicione seus investimentos",
                description: "Registre os ativos que deseja acompanhar em sua carteira.",
            },
            {
                number: "02",
                title: "Estabeleça sua meta",
                description: "Escolha o percentual de valorização que deseja monitorar.",
            },
            {
                number: "03",
                title: "Receba o alerta",
                description: "Quando o ativo atingir sua meta, você será avisado para avaliar uma possível venda.",
            },
        ].map((step) => (<div key={step.number} className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 dark:border-emerald-900/70 bg-white dark:bg-slate-900 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>))}
            </div>
          </div>
        </section>
        {/* CTA FINAL */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#102b25] dark:bg-[#071d18] px-7 py-14 text-center sm:px-12 sm:py-16">
            <span className="text-xs font-bold tracking-[0.16em] text-emerald-300">
              COMECE A ACOMPANHAR
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Tenha mais controle sobre seus investimentos.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Organize sua carteira, acompanhe o mercado e configure
              alertas de acordo com suas metas.
            </p>
            <Link href="/cadastro" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-400">
              Criar conta gratuitamente
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
              invest<span className="text-emerald-600 dark:text-emerald-400">.</span>
            </span>
          </Link>
          <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
            Acompanhe seus investimentos com mais clareza.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-400">
            {/* © <CurrentYear/> Invest. Todos os direitos reservados. */}
          </p>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-4 text-center">
          <p className="mx-auto max-w-4xl text-[11px] leading-5 text-slate-400 dark:text-slate-400">
            As informações e os alertas da plataforma têm caráter
            exclusivamente informativo. O Invest não executa operações
            automaticamente nem constitui recomendação de compra ou venda
            de ativos.
          </p>
        </div>
      </footer>
    </div>);
}
