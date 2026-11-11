"use client";

import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import DatePicker, { registerLocale } from "react-datepicker";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Link from "next/link";
import { assets } from "@/app/data/assets";

registerLocale("pt-BR", ptBR);

import { useDarkMode } from "@/app/hook/useDarkMode";

import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BellRing,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Plus,
  Pencil,
  Search,
  Wallet,
  X,
  Trash2,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Footer from "@/app/components/layout/Footer";

type AssetType = "Ação" | "FII" | "ETF" | "BDR";
type OperationType = "Compra" | "Venda";
type Period = "1M" | "3M" | "6M" | "1A" | "Tudo";
type AssetFilter = "Todos" | AssetType;

type Holding = {
  id: string;
  ticker: string;
  name: string;
  type: AssetType;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  targetPercent: number;
};

type Transaction = {
  id: string;
  ticker: string;
  operation: OperationType;
  quantity: number;
  unitPrice: number;
  date: string;
};

type FormState = {
  ticker: string;
  name: string;
  type: AssetType;
  operation: OperationType;
  quantity: string;
  unitPrice: string;
  currentPrice: string;
  targetPercent: string;
  date: string;
};

type EditHoldingForm = {
  name: string;
  type: AssetType;
  currentPrice: string;
  targetPercent: string;
};

const initialHoldings: Holding[] = [
  {
    id: "1",
    ticker: "PETR4",
    name: "Petrobras",
    type: "Ação",
    quantity: 100,
    averagePrice: 34.2,
    currentPrice: 38.45,
    targetPercent: 12,
  },
  {
    id: "2",
    ticker: "ITUB4",
    name: "Itaú Unibanco",
    type: "Ação",
    quantity: 80,
    averagePrice: 31.8,
    currentPrice: 34.12,
    targetPercent: 15,
  },
  {
    id: "3",
    ticker: "VALE3",
    name: "Vale",
    type: "Ação",
    quantity: 40,
    averagePrice: 62.5,
    currentPrice: 59.8,
    targetPercent: 12,
  },
  {
    id: "4",
    ticker: "MXRF11",
    name: "Maxi Renda FII",
    type: "FII",
    quantity: 120,
    averagePrice: 10.12,
    currentPrice: 10.36,
    targetPercent: 8,
  },
  {
    id: "5",
    ticker: "HGLG11",
    name: "Pátria Logística FII",
    type: "FII",
    quantity: 8,
    averagePrice: 158.9,
    currentPrice: 161.3,
    targetPercent: 10,
  },
];

const initialTransactions: Transaction[] = [
  { id: "t1", ticker: "PETR4", operation: "Compra", quantity: 100, unitPrice: 34.2, date: "2026-10-14" },
  { id: "t2", ticker: "ITUB4", operation: "Compra", quantity: 80, unitPrice: 31.8, date: "2026-10-08" },
  { id: "t3", ticker: "MXRF11", operation: "Compra", quantity: 120, unitPrice: 10.12, date: "2026-09-25" },
];

const evolutionData: Record<Period, { label: string; value: number }[]> = {
  "1M": [
    { label: "03 Out", value: 10780 },
    { label: "08 Out", value: 10920 },
    { label: "13 Out", value: 10870 },
    { label: "18 Out", value: 11120 },
    { label: "23 Out", value: 11240 },
    { label: "28 Out", value: 11410 },
    { label: "03 Nov", value: 11500 },
  ],
  "3M": [
    { label: "Ago", value: 10120 },
    { label: "Meio Ago", value: 10480 },
    { label: "Set", value: 10390 },
    { label: "Meio Set", value: 10820 },
    { label: "Out", value: 10970 },
    { label: "Meio Out", value: 11260 },
    { label: "Nov", value: 11500 },
  ],
  "6M": [
    { label: "Mai", value: 9200 },
    { label: "Jun", value: 9480 },
    { label: "Jul", value: 9900 },
    { label: "Ago", value: 10120 },
    { label: "Set", value: 10820 },
    { label: "Out", value: 11120 },
    { label: "Nov", value: 11500 },
  ],
  "1A": [
    { label: "Dez", value: 8200 },
    { label: "Fev", value: 8650 },
    { label: "Abr", value: 9100 },
    { label: "Jun", value: 9480 },
    { label: "Ago", value: 10120 },
    { label: "Out", value: 11120 },
    { label: "Nov", value: 11500 },
  ],
  Tudo: [
    { label: "2023", value: 6500 },
    { label: "2024", value: 7400 },
    { label: "Jan 25", value: 7900 },
    { label: "Abr 25", value: 9100 },
    { label: "Jul 25", value: 9900 },
    { label: "Jan 26", value: 10400 },
    { label: "Nov 26", value: 11500 },
  ],
};

const pieColors = ["#10b981", "#0ea5e9", "#8b5cf6", "#f59e0b"];

const currency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const percentage = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;

const shortDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR").format(new Date(`${date}T12:00:00`));

const getTodayDate = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const emptyForm = (date = ""): FormState => ({
  ticker: "",
  name: "",
  type: "Ação",
  operation: "Compra",
  quantity: "",
  unitPrice: "",
  currentPrice: "",
  targetPercent: "10",
  date,
});

export default function WalletPage() {
  const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [realizedResult, setRealizedResult] = useState(0);
  const [period, setPeriod] = useState<Period>("6M");
  const [assetFilter, setAssetFilter] = useState<AssetFilter>("Todos");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState("");
  const [editingHolding, setEditingHolding] = useState<Holding | null>(null);
  const [editForm, setEditForm] = useState<EditHoldingForm>({
    name: "",
    type: "Ação",
    currentPrice: "",
    targetPercent: "10",
  });
  const [editError, setEditError] = useState("");

  const isDark = useDarkMode();

  const portfolio = useMemo(() => {
    const invested = holdings.reduce(
      (total, item) => total + item.quantity * item.averagePrice,
      0
    );
    const current = holdings.reduce(
      (total, item) => total + item.quantity * item.currentPrice,
      0
    );
    const unrealized = current - invested;
    const returnPercent = invested > 0 ? (unrealized / invested) * 100 : 0;

    return { invested, current, unrealized, returnPercent };
  }, [holdings]);

  const handleDeleteHolding = (item: Holding) => {
  const confirmed = window.confirm(
        `Deseja realmente remover ${item.ticker} da sua carteira?`
      );

      if (!confirmed) return;

      setHoldings((current) =>
        current.filter((holding) => holding.id !== item.id)
      );
    };

  const reachedAlerts = useMemo(
    () =>
      holdings.filter((item) => {
        const result = ((item.currentPrice - item.averagePrice) / item.averagePrice) * 100;
        return item.targetPercent > 0 && result >= item.targetPercent;
      }),
    [holdings]
  );

  const filteredHoldings = useMemo(() => {
    return holdings.filter((item) => {
      const matchesType = assetFilter === "Todos" || item.type === assetFilter;
      const matchesSearch =
        item.ticker.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [holdings, assetFilter, search]);

  const allocationData = useMemo(() => {
    const totals = holdings.reduce<Record<string, number>>((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + item.quantity * item.currentPrice;
      return acc;
    }, {});
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [holdings]);

  const performanceByAsset = useMemo(
    () =>
      holdings.map((item) => ({
        ticker: item.ticker,
        result: ((item.currentPrice - item.averagePrice) / item.averagePrice) * 100,
      })),
    [holdings]
  );

  // Abre o modal preenchendo os dados do ativo selecionado.
  const openEditModal = (item: Holding) => {
    setEditingHolding(item);

    setEditForm({
      name: item.name,
      type: item.type,
      currentPrice: String(item.currentPrice),
      targetPercent: String(item.targetPercent),
    });

    setEditError("");
  };

  // Fecha o modal.
  const closeEditModal = () => {
    setEditingHolding(null);
    setEditError("");
  };

  // Salva as alterações.
  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingHolding) return;

    const currentPrice = Number(editForm.currentPrice);
    const targetPercent = Number(editForm.targetPercent || 0);

    if (!editForm.name.trim()) {
      setEditError("Informe o nome do ativo.");
      return;
    }

    if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
      setEditError("Informe uma cotação válida.");
      return;
    }

    if (!Number.isFinite(targetPercent) || targetPercent < 0) {
      setEditError("A meta de valorização não pode ser negativa.");
      return;
    }

    setHoldings((current) =>
      current.map((item) =>
        item.id === editingHolding.id
          ? {
              ...item,
              name: editForm.name.trim(),
              type: editForm.type,
              currentPrice,
              targetPercent,
            }
          : item
      )
    );

    closeEditModal();
  };

  const openModal = () => {
    setForm(emptyForm(getTodayDate()));
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormError("");
  };

  const updateForm = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const ticker = form.ticker.trim().toUpperCase();
    const quantity = Number(form.quantity);
    const unitPrice = Number(form.unitPrice);
    const currentPrice = Number(form.currentPrice);
    const targetPercent = Number(form.targetPercent || 0);

    if (!ticker || !form.name.trim() || !form.date) {
      setFormError("Preencha o código, o nome do ativo e a data da operação.");
      return;
    }
    if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unitPrice) || unitPrice <= 0) {
      setFormError("Informe uma quantidade e um preço de operação maiores que zero.");
      return;
    }
    if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
      setFormError("Informe uma cotação de demonstração válida.");
      return;
    }
    if (targetPercent < 0) {
      setFormError("A meta de valorização não pode ser negativa.");
      return;
    }

    const existing = holdings.find((item) => item.ticker === ticker);

    if (form.operation === "Venda" && !existing) {
      setFormError("Esse ativo ainda não está na carteira. Registre uma compra primeiro.");
      return;
    }

    if (form.operation === "Venda" && existing && quantity > existing.quantity) {
      setFormError(`Você possui apenas ${existing.quantity} unidade(s) de ${ticker}.`);
      return;
    }

    if (form.operation === "Compra") {
      if (existing) {
        const newQuantity = existing.quantity + quantity;
        const newAverage =
          (existing.quantity * existing.averagePrice + quantity * unitPrice) / newQuantity;

        setHoldings((current) =>
          current.map((item) =>
            item.ticker === ticker
              ? {
                  ...item,
                  name: form.name.trim(),
                  type: form.type,
                  quantity: newQuantity,
                  averagePrice: newAverage,
                  currentPrice,
                  targetPercent,
                }
              : item
          )
        );
      } else {
        setHoldings((current) => [
          ...current,
          {
            id: `${Date.now()}`,
            ticker,
            name: form.name.trim(),
            type: form.type,
            quantity,
            averagePrice: unitPrice,
            currentPrice,
            targetPercent,
          },
        ]);
      }
    } else if (existing) {
      setRealizedResult((current) => current + (unitPrice - existing.averagePrice) * quantity);
      setHoldings((current) =>
        current
          .map((item) =>
            item.ticker === ticker
              ? { ...item, quantity: item.quantity - quantity, currentPrice }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    }

    setTransactions((current) => [
      {
        id: `${Date.now()}`,
        ticker,
        operation: form.operation,
        quantity,
        unitPrice,
        date: form.date,
      },
      ...current,
    ]);

    closeModal();
  };

  const chartGrid = isDark ? "#334155" : "#e2e8f0";
  const chartText = isDark ? "#94a3b8" : "#64748b";
  const tooltipStyle = {
    backgroundColor: isDark ? "#0f172a" : "#ffffff",
    border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
    borderRadius: "12px",
    color: isDark ? "#f1f5f9" : "#0f172a",
    fontSize: "12px",
  };

  return (
    <main className="min-h-screen bg-[#f8faf9] px-5 py-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* CABEÇALHO */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 dark:border-emerald-900/70 dark:bg-emerald-950/50">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-semibold tracking-wide text-emerald-800 dark:text-emerald-300">
                ÁREA DO INVESTIDOR
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
              Minha carteira
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Acompanhe seu patrimônio, analise seus resultados e gerencie suas operações.
            </p>
          </div>

          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-900/10 transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            <Plus size={18} />
            Registrar operação
          </button>
        </div>

        {/* AVISO DE DADOS DE DEMONSTRAÇÃO */}
        <div className="mt-7 flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-900/70 dark:bg-sky-950/30">
          <AlertCircle className="mt-0.5 shrink-0 text-sky-700 dark:text-sky-300" size={18} />
          <p className="text-xs leading-5 text-sky-900 dark:text-sky-200">
            <strong>Ambiente de demonstração:</strong> os ativos, cotações e séries históricas iniciais são fictícios. As operações adicionadas aqui alteram apenas esta visualização e não são salvas após atualizar a página.
          </p>
        </div>

        {/* INDICADORES */}
        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Patrimônio atual"
            value={currency(portfolio.current)}
            detail={`${holdings.length} ativos na carteira`}
            icon={<Wallet size={19} />}
            iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
          />
          <MetricCard
            title="Total investido"
            value={currency(portfolio.invested)}
            detail="Custo das posições em aberto"
            icon={<CircleDollarSign size={19} />}
            iconClass="bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300"
          />
          <MetricCard
            title="Resultado em aberto"
            value={currency(portfolio.unrealized)}
            detail={percentage(portfolio.returnPercent)}
            positive={portfolio.unrealized >= 0}
            icon={portfolio.unrealized >= 0 ? <ArrowUpRight size={19} /> : <ArrowDownRight size={19} />}
            iconClass="bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300"
          />
          <MetricCard
            title="Resultado realizado"
            value={currency(realizedResult)}
            detail="Operações de venda registradas"
            positive={realizedResult >= 0}
            icon={<Activity size={19} />}
            iconClass="bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
          />
        </section>

        {/* ALERTAS */}
        {reachedAlerts.length > 0 && (
          <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-900/70 dark:bg-emerald-950/30 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                  <BellRing size={19} />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
                    {reachedAlerts.length === 1 ? "Meta de valorização atingida" : "Metas de valorização atingidas"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-emerald-900/80 dark:text-emerald-200/90">
                    {reachedAlerts.map((item) => item.ticker).join(", ")} alcançou o percentual definido. Avalie suas posições; o alerta não executa vendas.
                  </p>
                </div>
              </div>
              <span className="w-fit rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-bold tracking-wide text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                {reachedAlerts.length} {reachedAlerts.length === 1 ? "ALERTA" : "ALERTAS"}
              </span>
            </div>
          </section>
        )}

        {/* GRÁFICOS */}
        <section className="mt-7 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Evolução do patrimônio</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Histórico ilustrativo para visualização do gráfico</p>
              </div>
              <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                {(["1M", "3M", "6M", "1A", "Tudo"] as Period[]).map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setPeriod(item)}
                    className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                      period === item
                        ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolutionData[period]} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={chartGrid} strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: chartText, fontSize: 11 }} dy={10} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: chartText, fontSize: 11 }}
                    tickFormatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`}
                    width={62}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [currency(Number(value)), "Patrimônio"]}
                    labelStyle={{ color: chartText, marginBottom: 4 }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#portfolioGradient)" activeDot={{ r: 5, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Distribuição da carteira</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Participação por tipo de ativo</p>
            </div>

            {allocationData.length > 0 ? (
              <>
                <div className="relative mt-2 h-[210px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={allocationData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={3} stroke="none">
                        {allocationData.map((entry, index) => (
                          <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} formatter={(value) => currency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Patrimônio</span>
                    <span className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100">{currency(portfolio.current)}</span>
                  </div>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-2">
                  {allocationData.map((item, index) => (
                    <div key={item.name} className="flex min-w-0 items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                      <span className="truncate text-xs text-slate-600 dark:text-slate-400">{item.name}</span>
                      <span className="ml-auto text-xs font-semibold text-slate-800 dark:text-slate-200">{portfolio.current ? `${((item.value / portfolio.current) * 100).toFixed(1)}%` : "0%"}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <EmptyChartMessage />
            )}
          </div>
        </section>

        {/* DESEMPENHO POR ATIVO */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Desempenho por ativo</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Variação entre o preço médio e a cotação demonstrativa atual</p>
          </div>
          {performanceByAsset.length > 0 ? (
            <div className="mt-5 h-[230px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceByAsset} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={chartGrid} strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="ticker" axisLine={false} tickLine={false} tick={{ fill: chartText, fontSize: 11 }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: chartText, fontSize: 11 }} tickFormatter={(value: number) => `${value}%`} width={45} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;

                      const value = Number(payload[0].value ?? 0);

                      const resultColor =
                        value >= 0
                          ? isDark
                            ? "#34d399"
                            : "#059669"
                          : isDark
                            ? "#fb7185"
                            : "#e11d48";

                      return (
                        <div
                          style={{
                            ...tooltipStyle,
                            padding: "10px 12px",
                          }}
                        >
                          <p
                            style={{
                              color: resultColor,
                              fontWeight: 600,
                              fontSize: "13px",
                            }}
                          >
                            Resultado: {percentage(value)}
                          </p>

                          <p
                            style={{
                              color: chartText,
                              fontSize: "11px",
                              marginTop: "4px",
                            }}
                          >
                            {String(label ?? "")}
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="result" radius={[5, 5, 0, 0]} maxBarSize={46}>
                    {performanceByAsset.map((entry) => (
                      <Cell key={entry.ticker} fill={entry.result >= 0 ? "#10b981" : "#f87171"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChartMessage /> 
          )}
        </section>

        {/* ATIVOS */}
        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Meus ativos
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Posições e resultados individuais
                </p>
              </div>

              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 px-3.5 py-2.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
              >
                <Plus size={15} />
                Adicionar ativo
              </button>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {(["Todos", "Ação", "FII", "ETF", "BDR"] as AssetFilter[]).map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    onClick={() => setAssetFilter(filter)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                      assetFilter === filter
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:max-w-xs">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar ativo..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50 dark:bg-slate-950/70">
                <tr className="text-[10px] font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                  <th className="px-6 py-3">ATIVO</th>
                  <th className="px-4 py-3 text-right">QUANTIDADE</th>
                  <th className="px-4 py-3 text-right">PREÇO MÉDIO</th>
                  <th className="px-4 py-3 text-right">COTAÇÃO</th>
                  <th className="px-4 py-3 text-right">VALOR ATUAL</th>
                  <th className="px-4 py-3 text-right">RESULTADO</th>
                  <th className="px-6 py-3 text-right">META</th>
                  <th className="px-6 py-3 text-center">AÇÕES</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredHoldings.map((item) => {
                  const assetDetails = assets.find(
                    (asset) => asset.ticker.toUpperCase() === item.ticker.toUpperCase()
                  );
                  const currentValue = item.quantity * item.currentPrice;
                  const investedValue = item.quantity * item.averagePrice;
                  const result = currentValue - investedValue;
                  const resultPercent =
                    investedValue > 0 ? (result / investedValue) * 100 : 0;

                  const targetReached =
                    item.targetPercent > 0 &&
                    resultPercent >= item.targetPercent;

                  return (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                    >
                      {/* ATIVO */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              {item.ticker.slice(0, 2)}
                            </div>

                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                {assetDetails ? (
                                  <Link
                                    href={`/pages/search/${assetDetails.slug}`}
                                    className="rounded-sm transition-colors hover:text-emerald-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:text-emerald-400"
                                  >
                                    {item.ticker}
                                  </Link>
                                ) : (
                                  item.ticker
                                )}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                {item.name} · {item.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* QUANTIDADE */}
                      <td className="px-4 py-4 text-right text-sm text-slate-700 dark:text-slate-300">
                        {item.quantity}
                      </td>

                      {/* PREÇO MÉDIO */}
                      <td className="px-4 py-4 text-right text-sm text-slate-700 dark:text-slate-300">
                        {currency(item.averagePrice)}
                      </td>

                      {/* COTAÇÃO */}
                      <td className="px-4 py-4 text-right text-sm text-slate-700 dark:text-slate-300">
                        {currency(item.currentPrice)}
                      </td>

                      {/* VALOR ATUAL */}
                      <td className="px-4 py-4 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {currency(currentValue)}
                      </td>

                      {/* RESULTADO */}
                      <td className="px-4 py-4 text-right">
                        <p
                          className={`text-sm font-semibold ${
                            result >= 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {currency(result)}
                        </p>

                        <p
                          className={`mt-0.5 text-[11px] ${
                            result >= 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {percentage(resultPercent)}
                        </p>
                      </td>

                      {/* META */}
                      <td className="px-6 py-4 text-right">
                        {item.targetPercent > 0 ? (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              targetReached
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            }`}
                          >
                            {targetReached && <CheckCircle2 size={12} />}
                            +{item.targetPercent.toFixed(1).replace(".", ",")}%
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Sem meta
                          </span>
                        )}
                      </td>
                      {/* AÇÕES */}
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center gap-1.5">

                          {/* EDITAR */}
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            title={`Editar ${item.ticker}`}
                            aria-label={`Editar ${item.ticker}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-sky-50 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-slate-500 dark:hover:bg-sky-950/40 dark:hover:text-sky-400"
                          >
                            <Pencil size={16} />
                          </button>

                          {/* EXCLUIR */}
                          <button
                            type="button"
                            onClick={() => handleDeleteHolding(item)}
                            title={`Remover ${item.ticker} da carteira`}
                            aria-label={`Remover ${item.ticker} da carteira`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-slate-500 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* NENHUM ATIVO ENCONTRADO */}
                {filteredHoldings.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Nenhum ativo encontrado
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Altere os filtros ou registre uma nova operação.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>


        {/* OPERAÇÕES RECENTES */}
        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900 sm:p-6 mb-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Operações recentes</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Últimas compras e vendas registradas nesta demonstração</p>
            </div>
            <Clock3 size={18} className="text-slate-400" />
          </div>

          {transactions.length > 0 ? (
            <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-1 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${transaction.operation === "Compra" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"}`}>
                      {transaction.operation === "Compra" ? <ArrowDownRight size={17} /> : <ArrowUpRight size={17} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{transaction.operation} · {transaction.ticker}</p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{transaction.quantity} unidade(s) · {shortDate(transaction.date)}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{currency(transaction.quantity * transaction.unitPrice)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">Nenhuma operação registrada.</p>
          )}
        </section>
      </div>


      {/* MODAL DE EDIÇÃO */}
      {editingHolding && (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center overflow-y-auto bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeEditModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-modal-title"
            className="my-auto w-full max-w-xl rounded-t-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-3xl sm:p-7"
          >
            {/* CABEÇALHO */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                  <Pencil size={18} />
                </div>

                <h2
                  id="edit-modal-title"
                  className="text-xl font-bold text-slate-950 dark:text-slate-50"
                >
                  Editar ativo
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Atualize as informações de {editingHolding.ticker}.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                aria-label="Fechar modal"
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORMULÁRIO */}
            <form onSubmit={handleEditSubmit} className="mt-6 space-y-5">

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Código do ativo
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
                  {editingHolding.ticker}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <FormField label="Nome do ativo">
                  <input
                    required
                    value={editForm.name}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Nome da empresa"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Categoria">
                  <select
                    value={editForm.type}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        type: event.target.value as AssetType,
                      }))
                    }
                    className={inputClass}
                  >
                    <option value="Ação">Ação</option>
                    <option value="FII">FII</option>
                    <option value="ETF">ETF</option>
                    <option value="BDR">BDR</option>
                  </select>
                </FormField>

                <FormField
                  label="Cotação atual (demonstração)"
                  hint="No futuro, será atualizada automaticamente pela API."
                >
                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={editForm.currentPrice}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        currentPrice: event.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </FormField>

                <FormField
                  label="Meta de valorização (%)"
                  hint="Defina 0 para desativar o alerta."
                >
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={editForm.targetPercent}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        targetPercent: event.target.value,
                      }))
                    }
                    placeholder="10"
                    className={inputClass}
                  />
                </FormField>

              </div>

              {/* INFORMAÇÕES SOBRE A EDIÇÃO */}
              <div className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-3 dark:border-sky-900/70 dark:bg-sky-950/30">
                <p className="text-xs leading-5 text-sky-900 dark:text-sky-200">
                  <strong>Observação:</strong> a quantidade e o preço médio são
                  controlados pelo histórico de compras e vendas. Para alterá-los,
                  registre uma nova operação na carteira.
                </p>
              </div>

              {/* ERRO */}
              {editError && (
                <div
                  role="alert"
                  className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-300"
                >
                  {editError}
                </div>
              )}

              {/* BOTÕES */}
              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  <CheckCircle2 size={17} />
                  Salvar alterações
                </button>

              </div>
            </form>
          </div>
        </div>
      )}


      {/* MODAL DE OPERAÇÃO */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="operation-modal-title"
            className="my-auto w-full max-w-2xl rounded-t-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-3xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="operation-modal-title" className="text-xl font-bold text-slate-950 dark:text-slate-50">Registrar operação</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Adicione uma compra ou venda à sua carteira.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Fechar modal"
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">Tipo de operação</label>
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 dark:bg-slate-800">
                  {(["Compra", "Venda"] as OperationType[]).map((operation) => (
                    <button
                      type="button"
                      key={operation}
                      onClick={() => updateForm("operation", operation)}
                      className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${form.operation === operation ? operation === "Compra" ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300" : "bg-white text-rose-700 shadow-sm dark:bg-slate-700 dark:text-rose-300" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"}`}
                    >
                      {operation}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Código do ativo" hint="Ex.: PETR4 ou MXRF11">
                  <input required maxLength={12} value={form.ticker} onChange={(event) => updateForm("ticker", event.target.value.toUpperCase())} placeholder="PETR4" className={inputClass} />
                </FormField>
                <FormField label="Nome do ativo">
                  <input required value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Petrobras" className={inputClass} />
                </FormField>
                <FormField label="Categoria">
                  <select value={form.type} onChange={(event) => updateForm("type", event.target.value as AssetType)} className={inputClass}>
                    <option>Ação</option>
                    <option>FII</option>
                    <option>ETF</option>
                    <option>BDR</option>
                  </select>
                </FormField>
                <FormField label="Data da operação">
                  <DatePicker
                    selected={form.date ? parseISO(form.date) : null}
                    onChange={(date: Date | null) =>
                      updateForm(
                        "date",
                        date ? format(date, "yyyy-MM-dd") : ""
                      )
                    }
                    locale="pt-BR"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/AAAA"
                    required
                    showPopperArrow={false}
                    wrapperClassName="w-full"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Quantidade" hint="Número de ações ou cotas">
                  <input required min="0.0001" step="0.0001" type="number" value={form.quantity} onChange={(event) => updateForm("quantity", event.target.value)} placeholder="100" className={inputClass} />
                </FormField>
                <FormField label="Preço por unidade" hint="Preço pago ou recebido na operação">
                  <input required min="0.01" step="0.01" type="number" value={form.unitPrice} onChange={(event) => updateForm("unitPrice", event.target.value)} placeholder="35,50" className={inputClass} />
                </FormField>
                <FormField label="Cotação atual (demonstração)" hint="No futuro, virá automaticamente do backend">
                  <input required min="0.01" step="0.01" type="number" value={form.currentPrice} onChange={(event) => updateForm("currentPrice", event.target.value)} placeholder="38,20" className={inputClass} />
                </FormField>
                <FormField label="Meta de valorização (%)" hint="Opcional; use 0 para não configurar">
                  <input min="0" step="0.1" type="number" value={form.targetPercent} onChange={(event) => updateForm("targetPercent", event.target.value)} placeholder="10" className={inputClass} />
                </FormField>
              </div>

              {formError && (
                <div role="alert" className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs leading-5 text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-300">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {formError}
                </div>
              )}

              {form.operation === "Venda" && (
                <p className="rounded-lg bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                  O resultado realizado será calculado pela diferença entre o preço de venda informado e o preço médio da posição, multiplicada pela quantidade vendida. Taxas e impostos ainda não são considerados nesta demonstração.
                </p>
              )}

              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeModal} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  Cancelar
                </button>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700">
                  <CheckCircle2 size={17} />
                  Salvar operação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

type MetricCardProps = {
  title: string;
  value: string;
  detail: string;
  icon: ReactNode;
  iconClass: string;
  positive?: boolean;
};

function MetricCard({ title, value, detail, icon, iconClass, positive }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}>{icon}</div>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50">{value}</p>
      <p className={`mt-1.5 text-xs ${positive === undefined ? "text-slate-500 dark:text-slate-400" : positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
        {detail}
      </p>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

function FormField({ label, hint, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-[10px] leading-4 text-slate-400 dark:text-slate-500">{hint}</p>}
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500";

function EmptyChartMessage() {
  return (
    <div className="flex h-48 flex-col items-center justify-center text-center">
      <Activity size={24} className="text-slate-300 dark:text-slate-600" />
      <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">Sem dados para exibir</p>
      <p className="mt-1 text-xs text-slate-400">Adicione ativos à sua carteira.</p>
    </div>
  );
}
