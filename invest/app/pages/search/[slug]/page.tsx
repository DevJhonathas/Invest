
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { assets } from "@/app/data/assets";
import AssetDetails from "@/app/components/home/AssetDetails";

type AssetPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return assets.map((asset) => ({
    slug: asset.slug,
  }));
}

function AssetDetailsSkeleton() {
  const skeleton = "animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800";

  return (
    <div aria-busy="true" className="mt-8 space-y-5">
      <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className={`${skeleton} h-6 w-28`} />
          <div className={`${skeleton} h-10 w-36`} />
          <div className={`${skeleton} h-5 w-48`} />
        </div>

        <div className="space-y-3">
          <div className={`${skeleton} h-4 w-32 sm:ml-auto`} />
          <div className={`${skeleton} h-10 w-40`} />
          <div className={`${skeleton} h-5 w-28 sm:ml-auto`} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className={`${skeleton} h-6 w-44`} />
          <div className={`${skeleton} mt-3 h-4 w-60`} />
          <div className={`${skeleton} mt-8 h-56 w-full`} />
          <div className={`${skeleton} mt-6 h-4 w-3/4`} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className={`${skeleton} h-6 w-40`} />
          <div className={`${skeleton} mt-8 h-12 w-full`} />
          <div className={`${skeleton} mt-6 h-12 w-full`} />
          <div className={`${skeleton} mt-6 h-12 w-full`} />
          <div className={`${skeleton} mt-6 h-12 w-full`} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className={`${skeleton} h-6 w-40`} />
        <div className={`${skeleton} mt-5 h-16 w-full`} />
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
        <div className={`${skeleton} h-4 w-5/6`} />
      </div>
    </div>
  );
}

export default function AssetPage({ params }: AssetPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <Link
          href="/pages/search"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={16} />
          Voltar para pesquisa
        </Link>

        <Suspense fallback={<AssetDetailsSkeleton />}>
          <AssetDetails params={params} />
        </Suspense>
      </div>
    </main>
  );
}
