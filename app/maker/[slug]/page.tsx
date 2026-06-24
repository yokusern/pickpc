import { Metadata } from "next";
import { notFound } from "next/navigation";
import makersData from "@/data/makers.json";
import laptopsData from "@/data/laptops.json";
import { Maker, Laptop } from "@/lib/types";
import LaptopCard from "@/components/LaptopCard";
import ScoreBar from "@/components/ScoreBar";

const makers = makersData as Maker[];
const laptops = laptopsData as Laptop[];

export function generateStaticParams() {
  return makers.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const maker = makers.find((m) => m.id === slug);
  if (!maker) return {};
  return {
    title: `${maker.name}のPC一覧・評価`,
    description: `${maker.nameJa}（${maker.name}）の特徴・強み・弱み・おすすめ機種を徹底解説。${maker.tagline}`,
  };
}

const ratingLabels: { key: keyof Maker["ratings"]; label: string; color: string }[] = [
  { key: "performance", label: "性能", color: "bg-blue-500" },
  { key: "design", label: "デザイン", color: "bg-purple-500" },
  { key: "keyboard", label: "キーボード", color: "bg-indigo-500" },
  { key: "display", label: "ディスプレイ", color: "bg-cyan-500" },
  { key: "value", label: "コスパ", color: "bg-green-500" },
  { key: "support", label: "サポート", color: "bg-orange-500" },
];

export default async function MakerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const maker = makers.find((m) => m.id === slug);
  if (!maker) notFound();

  const featuredLaptops = laptops.filter((l) => maker.featuredModels.includes(l.id));
  const otherLaptops = laptops.filter(
    (l) => l.maker === maker.id && !maker.featuredModels.includes(l.id)
  );

  const overallRating = Math.round(
    Object.values(maker.ratings).reduce((a, b) => a + b, 0) / Object.keys(maker.ratings).length
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/maker" className="hover:text-blue-600">メーカー図鑑</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{maker.name}</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{maker.name}</h1>
        <p className="text-gray-500 text-sm">{maker.nameJa} / {maker.country}{maker.hq ? ` / ${maker.hq}` : ""}{maker.founded ? ` / 設立${maker.founded}年` : ""}</p>
        {maker.marketShare && (
          <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            世界シェア {maker.marketShare}%
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Overview */}
        <div className="lg:col-span-2">
          <h2 className="font-bold text-xl mb-3">概要</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{maker.overview}</p>

          {/* Series */}
          <h2 className="font-bold text-xl mb-4">ラインナップ</h2>
          <div className="space-y-3">
            {maker.series.map((s) => (
              <div key={s.name} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div>
                    <p className="font-bold text-gray-900">{s.name}</p>
                    <p className="text-xs text-blue-600 mb-1">対象: {s.target}</p>
                    <p className="text-sm text-gray-600">{s.desc}</p>
                    {s.lines && s.lines.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {s.lines.map((l) => (
                          <span key={l} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {l}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div>
          <div className="bg-gray-50 rounded-2xl p-5 mb-5">
            <div className="text-center mb-4">
              <p className="text-4xl font-extrabold text-blue-600">{overallRating}</p>
              <p className="text-sm text-gray-500">総合評価 / 100</p>
            </div>
            <div className="space-y-3">
              {ratingLabels.map((r) => (
                <ScoreBar
                  key={r.key}
                  label={r.label}
                  value={maker.ratings[r.key]}
                  color={r.color}
                />
              ))}
            </div>
          </div>

          {/* Pros/Cons */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-green-700 mb-2">✅ 強み</h3>
              <ul className="space-y-1">
                {maker.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-green-500 shrink-0">✓</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-600 mb-2">❌ 弱み</h3>
              <ul className="space-y-1">
                {maker.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-red-400 shrink-0">✗</span>{w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-bold text-blue-800 mb-1">こんな人におすすめ</h3>
              <p className="text-sm text-blue-700">{maker.recommend}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Models */}
      {featuredLaptops.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5">おすすめ機種</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredLaptops.map((l) => (
              <LaptopCard key={l.id} laptop={l} />
            ))}
          </div>
        </section>
      )}

      {/* Other Models */}
      {otherLaptops.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-5">その他の機種</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherLaptops.map((l) => (
              <LaptopCard key={l.id} laptop={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
