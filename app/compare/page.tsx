"use client";
import { useState } from "react";
import laptopsData from "@/data/laptops.json";
import { Laptop } from "@/lib/types";

const laptops = laptopsData as Laptop[];
const formatter = new Intl.NumberFormat("ja-JP");

const SCORE_KEYS: { key: keyof Laptop["score"]; label: string }[] = [
  { key: "overall", label: "総合" },
  { key: "performance", label: "性能" },
  { key: "portability", label: "携帯性" },
  { key: "display", label: "ディスプレイ" },
  { key: "keyboard", label: "キーボード" },
  { key: "value", label: "コスパ" },
];

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filtered = laptops.filter(
    (l) =>
      !selected.includes(l.id) &&
      (l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.maker.toLowerCase().includes(search.toLowerCase()) ||
        l.cpu.model.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedLaptops = selected
    .map((id) => laptops.find((l) => l.id === id)!)
    .filter(Boolean);

  function add(id: string) {
    if (selected.length >= 3) return;
    setSelected([...selected, id]);
    setSearch("");
  }

  function remove(id: string) {
    setSelected(selected.filter((s) => s !== id));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">🆚 PC比較ツール</h1>
        <p className="text-gray-600">最大3台のPCを並べてスペック・評価を比較できます</p>
      </div>

      {/* Selector */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 mb-4">
          {selectedLaptops.map((l) => (
            <div
              key={l.id}
              className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5"
            >
              <span className="text-sm font-medium text-blue-800">{l.name}</span>
              <button
                onClick={() => remove(l.id)}
                className="text-blue-500 hover:text-blue-700 text-lg leading-none"
              >
                ×
              </button>
            </div>
          ))}
          {selected.length < 3 && (
            <span className="text-sm text-gray-500 py-1.5">
              {3 - selected.length}台追加できます
            </span>
          )}
        </div>

        {selected.length < 3 && (
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="PC名・メーカー・CPUで検索..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
            />
            {search && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto mt-1">
                {filtered.length === 0 ? (
                  <p className="text-sm text-gray-500 p-4">見つかりませんでした</p>
                ) : (
                  filtered.slice(0, 8).map((l) => (
                    <button
                      key={l.id}
                      onClick={() => add(l.id)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      <p className="text-sm font-medium text-gray-900">{l.name}</p>
                      <p className="text-xs text-gray-500">
                        {l.cpu.model} / {l.ram}GB RAM / ¥{formatter.format(l.price)}〜
                      </p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {selected.length === 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">人気のPCから選ぶ：</p>
            <div className="flex flex-wrap gap-2">
              {laptops
                .filter((l) => l.popular)
                .slice(0, 6)
                .map((l) => (
                  <button
                    key={l.id}
                    onClick={() => add(l.id)}
                    className="text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:border-blue-400 text-gray-700"
                  >
                    {l.name}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selectedLaptops.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 bg-gray-50 border border-gray-200 w-32 text-gray-600">項目</th>
                {selectedLaptops.map((l) => (
                  <th key={l.id} className="py-3 px-4 bg-blue-50 border border-gray-200 text-left">
                    <p className="font-bold text-gray-900 text-xs leading-tight">{l.name}</p>
                    <p className="text-[10px] text-gray-400">参考価格</p>
                    <p className="text-blue-700 font-bold">¥{formatter.format(l.price)}〜</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Scores */}
              {SCORE_KEYS.map(({ key, label }) => {
                const vals = selectedLaptops.map((l) => l.score[key]);
                const max = Math.max(...vals);
                return (
                  <tr key={key} className="border-b border-gray-100">
                    <td className="py-2.5 px-4 bg-gray-50 border-x border-gray-200 text-gray-600 font-medium">{label}</td>
                    {selectedLaptops.map((l) => {
                      const v = l.score[key];
                      const isMax = v === max && selectedLaptops.length > 1;
                      return (
                        <td key={l.id} className={`py-2.5 px-4 border-x border-gray-200 ${isMax ? "bg-green-50" : ""}`}>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                              <div
                                className={`${isMax ? "bg-green-500" : "bg-blue-400"} h-1.5 rounded-full`}
                                style={{ width: `${v}%` }}
                              />
                            </div>
                            <span className={`text-xs font-bold ${isMax ? "text-green-700" : "text-gray-700"}`}>{v}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Specs */}
              {[
                { label: "CPU", render: (l: Laptop) => l.cpu.model },
                { label: "RAM", render: (l: Laptop) => `${l.ram}GB` },
                { label: "GPU", render: (l: Laptop) => l.gpu.model },
                { label: "ストレージ", render: (l: Laptop) => `${l.storage.size}GB ${l.storage.type.toUpperCase()}` },
                { label: "画面", render: (l: Laptop) => `${l.display.size}" ${l.display.resolution}` },
                { label: "リフレッシュレート", render: (l: Laptop) => `${l.display.refresh}Hz` },
                { label: "パネル", render: (l: Laptop) => l.display.panel ?? "—" },
                { label: "重量", render: (l: Laptop) => `${l.weight}kg` },
                { label: "バッテリー", render: (l: Laptop) => `${l.battery}時間` },
                { label: "OS", render: (l: Laptop) => l.os.toUpperCase() },
              ].map(({ label, render }) => (
                <tr key={label} className="border-b border-gray-100">
                  <td className="py-2.5 px-4 bg-gray-50 border-x border-gray-200 text-gray-600 font-medium">{label}</td>
                  {selectedLaptops.map((l) => (
                    <td key={l.id} className="py-2.5 px-4 border-x border-gray-200 text-gray-700">
                      {render(l)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Pros */}
              <tr className="border-b border-gray-100 bg-green-50">
                <td className="py-2.5 px-4 border-x border-gray-200 text-green-800 font-medium">強み</td>
                {selectedLaptops.map((l) => (
                  <td key={l.id} className="py-2.5 px-4 border-x border-gray-200">
                    <ul className="space-y-0.5">
                      {l.pros.slice(0, 3).map((p, i) => (
                        <li key={i} className="text-xs text-green-700 flex gap-1">
                          <span>✓</span>{p}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Cons */}
              <tr className="border-b border-gray-100 bg-red-50">
                <td className="py-2.5 px-4 border-x border-gray-200 text-red-700 font-medium">弱み</td>
                {selectedLaptops.map((l) => (
                  <td key={l.id} className="py-2.5 px-4 border-x border-gray-200">
                    <ul className="space-y-0.5">
                      {l.cons.slice(0, 3).map((c, i) => (
                        <li key={i} className="text-xs text-red-600 flex gap-1">
                          <span>✗</span>{c}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Affiliate */}
              <tr>
                <td className="py-3 px-4 bg-gray-50 border-x border-gray-200 text-gray-600 font-medium">購入リンク</td>
                {selectedLaptops.map((l) => (
                  <td key={l.id} className="py-3 px-4 border-x border-gray-200">
                    <div className="flex flex-col gap-1.5">
                      {l.amazonUrl && (
                        <a
                          href={l.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="block text-center text-xs py-1.5 px-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg"
                        >
                          Amazon
                        </a>
                      )}
                      {l.makerUrl && (
                        <a
                          href={l.makerUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="block text-center text-xs py-1.5 px-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg"
                        >
                          公式
                        </a>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedLaptops.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-4">🆚</p>
          <p className="text-lg">比較するPCを選んでください</p>
          <p className="text-sm mt-1">最大3台まで同時比較できます</p>
        </div>
      )}
    </div>
  );
}
