
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  TrendingDown,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  SlidersHorizontal,
} from "lucide-react";

import { assets, type Asset } from "@/app/data/assets";

type CategoryFilter = "Todos" | "Ações" | "FIIs";
type MovementFilter = "Todas" | "Altas" | "Quedas";

const categoryOptions: CategoryFilter[] = ["Todos", "Ações", "FIIs"];

const movementOptions: {
  label: string;
  value: MovementFilter;
}[] = [
  { label: "Todas", value: "Todas" },
  { label: "Em alta", value: "Altas" },
  { label: "Em queda", value: "Quedas" },
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function AssetCard({ asset }: { asset: Asset }) {
  const isPositive = asset.changePercent >= 0;

  return (
    <Link
      href={`/pages/search/${asset.slug}`}
      className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:shadow-black/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
            {asset.ticker}
          </span>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {asset.name}
          </p>
        </div>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {asset.type === "Ação" ? "Ação" : "FII"}
        </span>
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">Preço ilustrativo</p>
          <p className="mt-1 text-xl font-bold tabular-nums text-slate-900 dark:text-white">
            {currencyFormatter.format(asset.price)}
          </p>
        </div>

        <div
          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {isPositive ? "+" : ""}
          {asset.changePercent.toFixed(2).replace(".", ",")}%
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">
        <span>{asset.segment}</span>
        <span className="font-medium text-emerald-700 transition-colors group-hover:text-emerald-800 dark:text-emerald-400 dark:group-hover:text-emerald-300">
          Ver detalhes
        </span>
      </div>
    </Link>
  );
}

function AssetSection({
  title,
  description,
  items,
  type,
}: {
  title: string;
  description: string;
  items: Asset[];
  type: "up" | "down";
}) {
  const Icon = type === "up" ? TrendingUp : TrendingDown;

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Icon
              size={19}
              className={
                type === "up" ? "text-emerald-600" : "text-red-500"
              }
            />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <span className="shrink-0 text-xs font-medium text-slate-400">
          {items.length} {items.length === 1 ? "ativo" : "ativos"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((asset) => (
          <AssetCard key={asset.slug} asset={asset} />
        ))}
      </div>
    </section>
  );
}

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("Todos");
  const [movement, setMovement] = useState<MovementFilter>("Todas");

  const normalizedSearch = normalizeText(search.trim());

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      normalizeText(asset.ticker).includes(normalizedSearch) ||
      normalizeText(asset.name).includes(normalizedSearch) ||
      normalizeText(asset.segment).includes(normalizedSearch);

    const matchesCategory =
      category === "Todos" ||
      (category === "Ações" && asset.type === "Ação") ||
      (category === "FIIs" && asset.type === "FII");

    const matchesMovement =
      movement === "Todas" ||
      (movement === "Altas" && asset.changePercent > 0) ||
      (movement === "Quedas" && asset.changePercent < 0);

    return matchesSearch && matchesCategory && matchesMovement;
  });

  const gainers = filteredAssets
    .filter((asset) => asset.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent);

  const losers = filteredAssets
    .filter((asset) => asset.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <section>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Mercado financeiro
            </span>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore o mercado.
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
              Pesquise ações e fundos imobiliários, acompanhe suas
              movimentações e encontre informações sobre os ativos que
              despertam seu interesse. Tudo em um só lugar.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <div className="flex items-start gap-3">
            <Info
              size={19}
              className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400"
            />

            <p className="text-xs leading-6 text-emerald-900 dark:text-emerald-200 sm:text-sm">
              Os valores e as variações exibidos nesta versão são
              demonstrativos. As cotações reais serão disponibilizadas quando
              a integração com uma fonte de dados financeiros for implementada.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquise por nome, ticker ou segmento..."
              aria-label="Pesquisar ações e fundos imobiliários"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-950"
            />
          </div>

          <div className="mt-6 flex flex-col gap-5 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Categoria
              </p>

              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((option) => {
                  const active = category === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCategory(option)}
                      aria-pressed={active}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <SlidersHorizontal size={14} />
                Movimentação
              </p>

              <div className="flex flex-wrap gap-2">
                {movementOptions.map((option) => {
                  const active = movement === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMovement(option.value)}
                      aria-pressed={active}
                      className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {filteredAssets.length}{" "}
            {filteredAssets.length === 1
              ? "ativo encontrado"
              : "ativos encontrados"}
          </p>

          <p className="text-xs text-slate-400">
            Ordenados pela variação percentual
          </p>
        </div>

        {filteredAssets.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-5 py-16 text-center dark:border-slate-700">
            <Search
              size={30}
              className="mx-auto text-slate-300 dark:text-slate-600"
            />

            <h2 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
              Nenhum ativo encontrado
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Tente pesquisar por outro nome ou ticker, ou altere os filtros.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("Todos");
                setMovement("Todas");
              }}
              className="mt-5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Limpar filtros
            </button>
          </div>
        ) : movement === "Todas" ? (
          <>
            {gainers.length > 0 && (
              <AssetSection
                title="Maiores altas"
                description="Ativos com as maiores valorizações."
                items={gainers}
                type="up"
              />
            )}

            {losers.length > 0 && (
              <AssetSection
                title="Maiores quedas"
                description="Ativos com as maiores desvalorizações."
                items={losers}
                type="down"
              />
            )}
          </>
        ) : (
          <AssetSection
            title={movement === "Altas" ? "Ativos em alta" : "Ativos em queda"}
            description={
              movement === "Altas"
                ? "Ativos ordenados da maior para a menor valorização."
                : "Ativos ordenados da maior para a menor desvalorização."
            }
            items={movement === "Altas" ? gainers : losers}
            type={movement === "Altas" ? "up" : "down"}
          />
        )}
      </div>
    </main>
  );
}
