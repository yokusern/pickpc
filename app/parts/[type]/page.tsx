import { Metadata } from "next";
import { notFound } from "next/navigation";
import gpusData from "@/data/gpus.json";
import cpusData from "@/data/cpus.json";
import { GPU, CPU } from "@/lib/types";
import Link from "next/link";

const gpus = gpusData as GPU[];
const cpus = cpusData as CPU[];

const typeConfig: Record<string, { label: string; icon: string; desc: string }> = {
  gpu: {
    label: "GPU比較",
    icon: "⚙️",
    desc: "NVIDIA RTX・AMD Radeonの最新GPU比較。性能スコア・価格・コスパを一覧で比較。用途別おすすめも。",
  },
  cpu: {
    label: "CPU比較",
    icon: "🔲",
    desc: "Intel Core・AMD Ryzen・Apple Mシリーズの最新CPU比較。コア数・クロック・消費電力・コスパを比較。",
  },
};

export function generateStaticParams() {
  return Object.keys(typeConfig).map((type) => ({ type }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const config = typeConfig[type];
  if (!config) return {};
  return { title: config.label, description: config.desc };
}

const formatter = new Intl.NumberFormat("ja-JP");

function tierLabel(tier: string) {
  const map: Record<string, { label: string; color: string }> = {
    budget: { label: "エントリー", color: "bg-green-100 text-green-700" },
    mid: { label: "ミドル", color: "bg-blue-100 text-blue-700" },
    high: { label: "ハイ", color: "bg-purple-100 text-purple-700" },
    flagship: { label: "フラッグシップ", color: "bg-red-100 text-red-700" },
  };
  return map[tier] ?? { label: tier, color: "bg-gray-100 text-gray-700" };
}

export default async function PartsPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const config = typeConfig[type];
  if (!config) notFound();

  if (type === "gpu") {
    const sorted = [...gpus].sort((a, b) => b.score - a.score);
    const maxScore = Math.max(...gpus.map((g) => g.score));

    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-4">
          <span>パーツ比較</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">GPU</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2">⚙️ GPU比較表（2026年最新）</h1>
          <p className="text-gray-600">{config.desc}</p>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-xs text-green-600 font-semibold mb-1">FHD向け</p>
            <p className="font-bold text-gray-900">RTX 4060</p>
            <p className="text-sm text-gray-600">FHD 144fps の最適解。¥39,800</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs text-blue-600 font-semibold mb-1">バランス最良</p>
            <p className="font-bold text-gray-900">RTX 4070 Super</p>
            <p className="text-sm text-gray-600">QHD〜4K 60fps。¥82,000</p>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <p className="text-xs text-purple-600 font-semibold mb-1">最高性能</p>
            <p className="font-bold text-gray-900">RTX 5080</p>
            <p className="text-sm text-gray-600">4K 144fps。次世代DLSS 4。¥198,000</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-3 font-semibold text-gray-600">GPU名</th>
                <th className="text-center py-3 px-3 font-semibold text-gray-600">VRAM</th>
                <th className="text-center py-3 px-3 font-semibold text-gray-600">性能</th>
                <th className="text-center py-3 px-3 font-semibold text-gray-600">消費電力</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-600">価格</th>
                <th className="text-center py-3 px-3 font-semibold text-gray-600">FHD144</th>
                <th className="text-center py-3 px-3 font-semibold text-gray-600">QHD60</th>
                <th className="text-center py-3 px-3 font-semibold text-gray-600">4K60</th>
                <th className="text-left py-3 px-3 font-semibold text-gray-600">クラス</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((gpu) => {
                const tier = tierLabel(gpu.tier);
                return (
                  <tr key={gpu.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-900">
                      <div>
                        <p className="font-semibold">{gpu.name}</p>
                        <p className="text-xs text-gray-500">{gpu.brand === "nvidia" ? "NVIDIA" : "AMD"} • {gpu.series}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">{gpu.vram}GB</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${Math.round((gpu.score / maxScore) * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{gpu.score}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center text-gray-600">{gpu.tdp}W</td>
                    <td className="py-3 px-3 text-right font-semibold">¥{formatter.format(gpu.price)}</td>
                    <td className="py-3 px-3 text-center">{gpu.fhd144fps ? "✅" : "❌"}</td>
                    <td className="py-3 px-3 text-center">{gpu.qhd60fps ? "✅" : "❌"}</td>
                    <td className="py-3 px-3 text-center">{gpu.uhd60fps ? "✅" : "❌"}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tier.color}`}>
                        {tier.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Use Case Guide */}
        <section>
          <h2 className="text-xl font-bold mb-4">用途別おすすめGPU</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { use: "FPS（Apex/Valorant）144fps", gpu: "RTX 4060", price: "¥39,800" },
              { use: "オープンワールド（原神・エルデン）", gpu: "RTX 4070", price: "¥72,000" },
              { use: "4K・高グラ・動画編集", gpu: "RTX 4070 Super", price: "¥82,000" },
              { use: "AI・機械学習（PyTorch）", gpu: "RTX 4080 Super", price: "¥118,000" },
              { use: "とにかく安く済ませたい", gpu: "RTX 4050 / RX 7600", price: "¥32,000〜" },
              { use: "4K 144fps・配信同時", gpu: "RTX 5080", price: "¥198,000" },
            ].map((r) => (
              <div key={r.use} className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{r.use}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-blue-600">{r.gpu}</p>
                  <p className="text-xs text-gray-500">{r.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cross links */}
        <div className="mt-10 flex gap-3 flex-wrap">
          <Link href="/parts/cpu" className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-400 transition-colors">
            CPU比較を見る →
          </Link>
          <Link href="/jisaku" className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-400 transition-colors">
            自作PC構成を見る →
          </Link>
        </div>
      </div>
    );
  }

  // CPU page
  const sorted = [...cpus].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...cpus.map((c) => c.score));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-4">
        <span>パーツ比較</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">CPU</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">🔲 CPU比較表（2026年最新）</h1>
        <p className="text-gray-600">{config.desc}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-xs text-green-600 font-semibold mb-1">ゲーム向け</p>
          <p className="font-bold text-gray-900">Ryzen 5 7600</p>
          <p className="text-sm text-gray-600">6コア・ゲーム最適。¥22,800</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs text-blue-600 font-semibold mb-1">バランス最良</p>
          <p className="font-bold text-gray-900">Ryzen 7 7700X</p>
          <p className="text-sm text-gray-600">8コア・配信+ゲーム両立。¥32,800</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
          <p className="text-xs text-purple-600 font-semibold mb-1">Mac向け</p>
          <p className="font-bold text-gray-900">Apple M3 Max</p>
          <p className="text-sm text-gray-600">動画編集・開発の高負荷作業に対応</p>
        </div>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-3 font-semibold text-gray-600">CPU名</th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">コア/スレッド</th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">Boost</th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">TDP</th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">性能</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600">価格</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">クラス</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((cpu) => {
              const tier = tierLabel(cpu.tier);
              return (
                <tr key={cpu.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3">
                    <p className="font-semibold text-gray-900">{cpu.name}</p>
                    <p className="text-xs text-gray-500">{cpu.brand === "intel" ? "Intel" : cpu.brand === "amd" ? "AMD" : "Apple"} • {cpu.generation}</p>
                  </td>
                  <td className="py-3 px-3 text-center">{cpu.cores}C / {cpu.threads}T</td>
                  <td className="py-3 px-3 text-center">{cpu.boostClock}GHz</td>
                  <td className="py-3 px-3 text-center text-gray-600">{cpu.tdp}W</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${Math.round((cpu.score / maxScore) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold">{cpu.score}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-semibold">
                    {cpu.price ? `¥${formatter.format(cpu.price)}` : "—"}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${tier.color}`}>
                      {tier.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">用途別おすすめCPU</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { use: "コスパゲーミング", cpu: "Ryzen 5 7600", price: "¥22,800" },
            { use: "ゲーム+配信の両立", cpu: "Ryzen 7 7700X", price: "¥32,800" },
            { use: "動画編集・3DCG（Windows）", cpu: "Core i9-14900K", price: "¥62,000" },
            { use: "MacBook（日常・開発）", cpu: "Apple M3", price: "MacBook Air搭載" },
            { use: "MacBook Pro（クリエイター）", cpu: "Apple M3 Pro", price: "MacBook Pro搭載" },
            { use: "最高ゲーム性能（3D V-Cache）", cpu: "Ryzen 9 7950X3D", price: "¥88,000" },
          ].map((r) => (
            <div key={r.use} className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{r.use}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-blue-600">{r.cpu}</p>
                <p className="text-xs text-gray-500">{r.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 flex gap-3 flex-wrap">
        <Link href="/parts/gpu" className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-400 transition-colors">
          GPU比較を見る →
        </Link>
        <Link href="/jisaku" className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-400 transition-colors">
          自作PC構成を見る →
        </Link>
      </div>
    </div>
  );
}
