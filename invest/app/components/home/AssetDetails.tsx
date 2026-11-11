
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
  TrendingUp,
  Info,
} from "lucide-react";

import { assets } from "@/app/data/assets";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function getChartPoints(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 600;
      const y = 150 - ((value - min) / range) * 110;

      return `${x},${y}`;
    })
    .join(" ");
}

type AssetDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AssetDetails({
  params,
}: AssetDetailsProps) {
  const { slug } = await params;

  const asset = assets.find((item) => item.slug === slug);

  if (!asset) {
    notFound();
  }

  const isPositive = asset.changePercent >= 0;
  const chartPoints = getChartPoints(asset.history);
  const Icon = isPositive ? TrendingUp : TrendingDown;

  const variationColor = isPositive
    ? "text-emerald-700 dark:text-emerald-400"
    : "text-red-600 dark:text-red-400";

  return (
    <>
      <section className="mt-8 flex flex-col gap-6 border-b border-slate-200 pb-8 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              {asset.type === "Ação" ? "Ação" : "Fundo imobiliário"}
            </span>

            <span className="text-xs text-slate-400">
              Mercado brasileiro
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {asset.ticker}
          </h1>

          <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
            {asset.name}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs font-medium text-slate-400">
            Cotação demonstrativa
          </p>

          <p className="mt-1 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
            {currencyFormatter.format(asset.price)}
          </p>

          <div
            className={`mt-2 inline-flex items-center gap-1.5 text-sm font-semibold ${variationColor}`}
          >
            {isPositive ? (
              <ArrowUpRight size={17} />
            ) : (
              <ArrowDownRight size={17} />
            )}

            {isPositive ? "+" : ""}
            {asset.changePercent.toFixed(2).replace(".", ",")}%
            <span className="font-normal text-slate-400">
              no período demonstrativo
            </span>
          </div>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Desempenho recente</h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Histórico ilustrativo do ativo.
              </p>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                isPositive
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
              }`}
            >
              <Icon size={15} />
              {isPositive ? "Valorização" : "Desvalorização"}
            </div>
          </div>

          <div className="mt-8">
            <svg
              viewBox="0 0 600 180"
              className="h-56 w-full overflow-visible"
              preserveAspectRatio="none"
              role="img"
              aria-label={`Gráfico demonstrativo de desempenho do ativo ${asset.ticker}`}
            >
              <line
                x1="0"
                y1="40"
                x2="600"
                y2="40"
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeDasharray="5 5"
              />

              <line
                x1="0"
                y1="90"
                x2="600"
                y2="90"
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeDasharray="5 5"
              />

              <line
                x1="0"
                y1="150"
                x2="600"
                y2="150"
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeDasharray="5 5"
              />

              <polygon
                points={`0,170 ${chartPoints} 600,170`}
                fill={isPositive ? "#10b981" : "#ef4444"}
                opacity="0.10"
              />

              <polyline
                points={chartPoints}
                fill="none"
                stroke={isPositive ? "#059669" : "#ef4444"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>Início do histórico</span>
            <span>Final do histórico</span>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
            <p className="text-xs leading-6 text-slate-400">
              Este gráfico utiliza uma sequência de valores fictícios para
              representar o funcionamento da página. Não corresponde ao
              histórico real de negociação.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <h2 className="text-lg font-bold">Resumo do ativo</h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Principais indicadores.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs text-slate-400">Segmento</p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {asset.segment}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
              <p className="text-xs text-slate-400">Volume negociado</p>
              <p className="mt-1 text-lg font-bold tabular-nums">
                {asset.volume}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
              <p className="text-xs text-slate-400">Dividend Yield</p>
              <p className="mt-1 text-lg font-bold tabular-nums">
                {asset.dividendYield !== null
                  ? `${asset.dividendYield.toFixed(2).replace(".", ",")}%`
                  : "Não informado"}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
              <p className="text-xs text-slate-400">Tipo de ativo</p>
              <p className="mt-1 text-sm font-semibold">
                {asset.type === "Ação" ? "Ação" : "Fundo imobiliário"}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <h2 className="text-lg font-bold">Sobre o ativo</h2>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500 dark:text-slate-400">
          {asset.description}
        </p>
      </section>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
        <Info
          size={18}
          className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400"
        />

        <p className="text-xs leading-6 text-emerald-900 dark:text-emerald-200">
          As informações apresentadas são demonstrativas e não representam
          recomendações de investimento. Os dados reais dependerão de uma
          futura integração com fontes de informações financeiras.
        </p>
      </div>
    </>
  );
}
