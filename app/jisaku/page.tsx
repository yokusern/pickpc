import { Metadata } from "next";
import Link from "next/link";
import buildsData from "@/data/builds.json";
import { Build } from "@/lib/types";

export const metadata: Metadata = {
  title: "自作PC完全ガイド",
  description: "自作PCのメリット・デメリット、予算別おすすめ構成、パーツ選びのコツを徹底解説。5万円〜30万円まで全構成を公開。",
};

const builds = buildsData as Build[];

const formatter = new Intl.NumberFormat("ja-JP");

export default function JisakuPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold mb-2">🔧 自作PC完全ガイド</h1>
        <p className="text-gray-600">予算別おすすめ構成・パーツ選びのコツを徹底解説</p>
      </div>

      {/* What is DIY PC */}
      <section className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-10">
        <h2 className="text-xl font-bold mb-4">自作PCとは？</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          自作PCとは、CPU・GPU・マザーボード・メモリ・SSDなどのパーツを個別に購入して、
          自分で組み立てるPCのこと。メーカー品（既製品）やBTOとは異なり、
          <strong>すべてのパーツを自由に選べる</strong>のが最大の特徴です。
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-green-700 mb-3">✅ 自作PCのメリット</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><span className="text-green-500">✓</span>同予算で高性能なPCが作れる（中間マージンなし）</li>
              <li className="flex gap-2"><span className="text-green-500">✓</span>好きなパーツだけ選べる（GPU重視・CPU重視など）</li>
              <li className="flex gap-2"><span className="text-green-500">✓</span>後からパーツを交換・アップグレードできる</li>
              <li className="flex gap-2"><span className="text-green-500">✓</span>自分でPCの仕組みが理解できる</li>
              <li className="flex gap-2"><span className="text-green-500">✓</span>ケース・光り方まで自分好みにできる</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-red-600 mb-3">❌ 自作PCのデメリット</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><span className="text-red-400">✗</span>組み立てに数時間かかる（初回は特に）</li>
              <li className="flex gap-2"><span className="text-red-400">✗</span>パーツの互換性確認が必要</li>
              <li className="flex gap-2"><span className="text-red-400">✗</span>トラブル時は自己解決が基本</li>
              <li className="flex gap-2"><span className="text-red-400">✗</span>デスクトップのみ（ノートPC自作は現実的でない）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Budget Builds */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">予算別おすすめ構成</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {builds.map((build) => (
            <Link
              key={build.id}
              href={`/jisaku/${build.id}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-blue-600">{build.budgetLabel}</p>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700">{build.name}</h3>
                </div>
                <p className="text-lg font-bold text-gray-900">¥{formatter.format(build.totalPrice)}</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">{build.target}</p>

              {build.games && (
                <div className="flex flex-wrap gap-1">
                  {build.games.slice(0, 3).map((g) => (
                    <span key={g} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{g}</span>
                  ))}
                </div>
              )}

              <p className="text-xs text-blue-600 mt-3 font-medium group-hover:underline">
                構成詳細を見る →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Part Selection Guide */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">パーツ選びの基本</h2>
        <div className="space-y-4">
          {[
            {
              part: "CPU",
              icon: "🔲",
              rule: "Intel vs AMD はどちらでもOK。ゲームなら Ryzen 5 7600 が最コスパ",
              detail: "CPUはゲームのシングルコア性能が重要。Ryzen 5 7600（¥23,000）はゲーム特化でコストを抑えたい人向けのCPU。動画編集やストリーミングが多いなら Ryzen 7 7700X（¥33,000）。",
            },
            {
              part: "GPU（グラフィックボード）",
              icon: "⚙️",
              rule: "予算の40〜50%をGPUに投資する。FHDなら RTX 4060 が最適解",
              detail: "ゲームPCの性能の核心はGPU。FHD 144fps なら RTX 4060（¥40,000）、QHD以上なら RTX 4070（¥72,000）。NVIDIAの DLSS は必須機能なので NVIDIA 推奨。",
            },
            {
              part: "メモリ",
              icon: "💾",
              rule: "ゲームは16GB以上。配信・クリエイターは32GB",
              detail: "今のゲームはほぼ16GBが最低ライン。デュアルチャネル（8GB×2 or 16GB×2）が必須。Ryzen 7000以降はDDR5を選ぶこと。",
            },
            {
              part: "SSD",
              icon: "💿",
              rule: "OS+ゲーム用に1TB NVMe Gen4以上。SATA SSDは避ける",
              detail: "NVMe Gen4（読込7000MB/s）がロード時間が最短。ゲームは1タイトル50〜100GBが一般的なので1TBは最低限。録画・編集するなら別途2TB SSDを追加。",
            },
            {
              part: "マザーボード",
              icon: "🖥",
              rule: "CPUに合わせてチップセットを選ぶ。B650M（AMD）/ B760（Intel）が最コスパ",
              detail: "Ryzen 7000 → B650M/X670、Core 14th → B760/Z790。オーバークロックしないならBシリーズで十分。ATX/M-ATXはケースサイズに合わせる。",
            },
            {
              part: "電源",
              icon: "⚡",
              rule: "GPUの推奨電力の2倍を目安。80+ Gold以上推奨",
              detail: "RTX 4060 → 650W、RTX 4070 → 750W、RTX 4080 → 1000W が目安。電源は安物を使うと全パーツが壊れるリスクがある。CORSAIR・Seasonic等の信頼できるメーカーを選ぶ。",
            },
          ].map((p) => (
            <div key={p.part} className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{p.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{p.part}</h3>
                  <p className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg inline-block mb-2">
                    💡 {p.rule}
                  </p>
                  <p className="text-sm text-gray-600">{p.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">まず構成を見てみよう</h2>
        <p className="text-blue-100 mb-6">予算別の構成詳細・パーツリスト・パフォーマンスデータをすべて公開</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {builds.map((b) => (
            <Link
              key={b.id}
              href={`/jisaku/${b.id}`}
              className="px-4 py-2 bg-white text-blue-600 font-bold rounded-full text-sm hover:bg-blue-50 transition-colors"
            >
              {b.budgetLabel}構成
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
