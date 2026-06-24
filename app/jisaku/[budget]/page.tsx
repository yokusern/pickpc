import { Metadata } from "next";
import { notFound } from "next/navigation";
import buildsData from "@/data/builds.json";
import { Build } from "@/lib/types";
import Link from "next/link";

const builds = buildsData as Build[];
const formatter = new Intl.NumberFormat("ja-JP");

export function generateStaticParams() {
  return builds.map((b) => ({ budget: b.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ budget: string }> }): Promise<Metadata> {
  const { budget } = await params;
  const build = builds.find((b) => b.id === budget);
  if (!build) return {};
  return {
    title: `${build.name}（${build.budgetLabel}）`,
    description: `${build.target}のための自作PC構成。総額¥${formatter.format(build.totalPrice)}のパーツ一覧と性能データを公開。`,
  };
}

export default async function BuildPage({ params }: { params: Promise<{ budget: string }> }) {
  const { budget } = await params;
  const build = builds.find((b) => b.id === budget);
  if (!build) notFound();

  const totalCheck = build.parts.reduce((s, p) => s + p.price, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/jisaku" className="hover:text-blue-600">自作PCガイド</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{build.budgetLabel}構成</span>
      </nav>

      <div className="mb-8">
        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full mb-3">
          {build.budgetLabel} 自作PC構成
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{build.name}</h1>
        <p className="text-gray-600">{build.target}</p>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-sm text-gray-600">総額</p>
            <p className="text-3xl font-extrabold text-blue-600">¥{formatter.format(build.totalPrice)}</p>
            <p className="text-xs text-gray-400">※パーツ価格は変動します</p>
          </div>
          {build.games && (
            <div>
              <p className="text-sm text-gray-600 mb-1">快適に動くゲーム</p>
              <div className="flex flex-wrap gap-1">
                {build.games.map((g) => (
                  <span key={g} className="text-xs bg-white border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Parts Table */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">パーツ一覧</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">カテゴリ</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">製品名</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">価格</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden md:table-cell">選定理由</th>
              </tr>
            </thead>
            <tbody>
              {build.parts.map((part, i) => (
                <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 ${part.category === "OS" ? "bg-amber-50" : ""}`}>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">{part.category}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {part.amazonUrl ? (
                      <a
                        href={part.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-blue-600 hover:underline"
                      >
                        {part.name}
                      </a>
                    ) : (
                      part.name
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-semibold text-gray-900 whitespace-nowrap">
                    ¥{formatter.format(part.price)}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600 hidden md:table-cell">{part.reason}</td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-bold">
                <td className="py-3 px-4 text-sm" colSpan={2}>合計</td>
                <td className="py-3 px-4 text-sm text-right text-blue-700">¥{formatter.format(totalCheck)}</td>
                <td className="hidden md:table-cell" />
              </tr>
            </tbody>
          </table>
        </div>
        {build.osNote && (
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            💡 {build.osNote}
          </p>
        )}
      </section>

      {/* Performance */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">予想パフォーマンス</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ゲーム</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">設定</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">fps目安</th>
              </tr>
            </thead>
            <tbody>
              {build.performances.map((p, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{p.game}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{p.setting}</td>
                  <td className="py-3 px-4 text-sm text-right font-bold text-blue-600">{p.fps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Upgrades */}
      {build.upgrades && build.upgrades.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">アップグレード案</h2>
          <div className="space-y-3">
            {build.upgrades.map((u, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl">
                <span className="text-sm font-bold text-blue-600 shrink-0">{u.cost}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{u.what}</p>
                  <p className="text-xs text-gray-600">→ {u.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Other Builds */}
      <div className="mt-10 p-6 bg-gray-50 rounded-xl">
        <h2 className="font-bold mb-4">他の予算構成を見る</h2>
        <div className="flex flex-wrap gap-2">
          {builds
            .filter((b) => b.id !== build.id)
            .map((b) => (
              <Link
                key={b.id}
                href={`/jisaku/${b.id}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                {b.budgetLabel}構成
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
