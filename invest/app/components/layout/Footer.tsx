// "use client";

import Link from "next/link";
// import CurrentYear from "./currentYear";
import { Suspense } from "react";
import { connection } from "next/server";

async function CurrentYear() {
  await connection();

  return <span>{new Date().getFullYear()}</span>;
}

export default function Footer(){
  return(
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
            ©{" "}
            <Suspense
              fallback={
                <span className="invisible" aria-hidden="true">
                  2026
                </span>
              }
            >
              <CurrentYear />
            </Suspense>{" "}
            Invest. Todos os direitos reservados.
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
  );
}