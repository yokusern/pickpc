import { Metadata } from "next";
import Link from "next/link";
import makersData from "@/data/makers.json";
import { Maker } from "@/lib/types";
import ScoreBar from "@/components/ScoreBar";

export const metadata: Metadata = {
  title: "メーカー図鑑",
  description: "Apple・Lenovo・Dell・HP・ASUS・MSI・ドスパラなど13メーカーの特徴・評価・おすすめモデルを徹底解説。",
};

const makers = makersData as Maker[];

export default function MakerListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">メーカー図鑑</h1>
        <p className="text-gray-600">全{makers.length}メーカーの特徴・強み・おすすめ機種を徹底解説</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {makers.map((maker) => (
          <Link
            key={maker.id}
            href={`/maker/${maker.id}`}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="mb-3">
              <h2 className="font-bold text-lg text-gray-900 group-hover:text-blue-700">{maker.name}</h2>
              <p className="text-sm text-gray-500">{maker.country} / {maker.series.length}ラインナップ</p>
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{maker.tagline}</p>

            <div className="space-y-1.5 mb-4">
              <ScoreBar label="性能" value={maker.ratings.performance} color="bg-blue-500" />
              <ScoreBar label="デザイン" value={maker.ratings.design} color="bg-purple-500" />
              <ScoreBar label="コスパ" value={maker.ratings.value} color="bg-green-500" />
              <ScoreBar label="サポート" value={maker.ratings.support} color="bg-orange-500" />
            </div>

            <div className="flex flex-wrap gap-1">
              {maker.strengths.slice(0, 2).map((s, i) => (
                <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                  ✓ {s.substring(0, 15)}{s.length > 15 ? "…" : ""}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-6 bg-blue-50 rounded-xl">
        <h2 className="font-bold text-lg mb-3">メーカー選びに迷ったら</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gray-900 mb-1">💼 ビジネス向け</p>
            <p className="text-gray-600">Lenovo ThinkPad、Microsoft Surface、dynabook が定番。キーボード品質・堅牢性が高い。</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">🎮 ゲーミング向け</p>
            <p className="text-gray-600">ASUS ROG、ドスパラ GALLERIA、Acer Nitroがコスパ優秀。MSI・Alienwareはハイエンド。</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">🎨 クリエイター向け</p>
            <p className="text-gray-600">Apple MacBook Pro、Dell XPS、ASUS Zenbookがディスプレイ品質・性能で優れている。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
