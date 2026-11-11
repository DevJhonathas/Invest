
import Link from "next/link";
import { Home, LogIn, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-5 py-16 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <section className="w-full max-w-lg text-center">
        <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">
          <span className="absolute text-[110px] font-black tracking-tighter text-emerald-600/10 dark:text-emerald-400/10">
            404
          </span>

          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-900/5 dark:border-emerald-900/60 dark:bg-emerald-500/10 dark:text-emerald-400">
            <SearchX size={38} strokeWidth={1.6} />
          </div>
        </div>

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
          Erro 404
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Página não encontrada.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
          Parece que o endereço que você está tentando acessar não existe
          ou foi movido. Não se preocupe, você pode voltar e continuar
          explorando o Invest.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            <Home size={17} />
            Voltar ao início
          </Link>

          <Link
            href="/pages/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-slate-800"
          >
            <LogIn size={17} />
            Entrar na conta
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          Ainda não possui uma conta?{" "}
          <Link
            href="/pages/cadastro"
            className="font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Cadastre-se gratuitamente.
          </Link>
        </p>

        <p className="mt-10 text-xs text-slate-400">
          invest<span className="font-bold text-emerald-600 dark:text-emerald-400">.</span>
          <span className="ml-2">Seu espaço para acompanhar investimentos.</span>
        </p>
      </section>
    </main>
  );
}
