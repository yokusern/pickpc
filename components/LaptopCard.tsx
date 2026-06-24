import Image from "next/image";
import { Laptop } from "@/lib/types";

interface Props {
  laptop: Laptop;
  showAffiliate?: boolean;
}

const makerGradients: Record<string, string> = {
  apple:     "from-gray-200 via-gray-100 to-slate-200",
  lenovo:    "from-red-900 via-gray-900 to-gray-800",
  asus:      "from-blue-950 via-slate-900 to-gray-900",
  hp:        "from-blue-700 via-blue-800 to-blue-900",
  dell:      "from-blue-700 via-gray-700 to-gray-800",
  microsoft: "from-blue-100 via-gray-50 to-slate-100",
  nec:       "from-blue-900 via-indigo-900 to-blue-950",
  mouse:     "from-emerald-900 via-gray-900 to-gray-800",
  dospara:   "from-red-700 via-gray-800 to-gray-900",
  acer:      "from-green-800 via-gray-800 to-gray-900",
  dynabook:  "from-blue-800 via-blue-700 to-blue-600",
  frontier:  "from-orange-700 via-gray-700 to-gray-800",
};

const LaptopIcon = () => (
  <svg viewBox="0 0 64 48" className="w-16 h-12 opacity-30" fill="currentColor">
    <rect x="8" y="4" width="48" height="32" rx="3" className="text-white"/>
    <rect x="12" y="8" width="40" height="24" rx="1" className="text-gray-400"/>
    <path d="M2 40 h60 l-4 4 H6 z" className="text-white"/>
  </svg>
);

function weightInfo(w: number): { emoji: string; label: string; cls: string } {
  if (w < 1.0) return { emoji: "🪶", label: "超軽量", cls: "bg-emerald-50 text-emerald-700" };
  if (w < 1.3) return { emoji: "🪶", label: "軽量",   cls: "bg-emerald-50 text-emerald-700" };
  if (w < 1.5) return { emoji: "📦", label: "標準",   cls: "bg-gray-100 text-gray-600" };
  if (w < 2.0) return { emoji: "📦", label: "やや重い", cls: "bg-orange-50 text-orange-700" };
  return { emoji: "🏠", label: "据え置き向き", cls: "bg-red-50 text-red-700" };
}

function batteryInfo(h: number): { emoji: string; label: string } {
  if (h < 8)  return { emoji: "⚡", label: "短め（充電器必須）" };
  if (h < 12) return { emoji: "🔋", label: "標準（半日OK）" };
  if (h < 18) return { emoji: "🔋", label: "長持ち（丸1日OK）" };
  return { emoji: "🔋", label: "超長持ち（充電器不要）" };
}

function ramLabel(gb: number): string {
  if (gb <= 8)  return "普段使い向け";
  if (gb <= 16) return "万人向け・最適";
  if (gb <= 32) return "動画編集・プロ向け";
  return "業務レベル";
}

function storageLabel(gb: number): string {
  if (gb <= 256) return "クラウド併用推奨";
  if (gb <= 512) return "ほとんどの人に◎";
  if (gb <= 1024) return "動画素材も安心";
  return "プロ向け大容量";
}

function gpuLabel(model: string, type: string): string | null {
  const m = model.toLowerCase();
  if (type === "integrated") {
    if (m.includes("m5"))  return "動画編集もプロ級";
    if (m.includes("m4") || m.includes("m3") || m.includes("m2") || m.includes("m1")) return "動画・軽いクリエイティブOK";
    if (m.includes("arc")) return "AI処理対応の最新内蔵GPU";
    return "動画視聴・日常作業向け";
  }
  if (m.includes("4090") || m.includes("4080")) return "最高峰・プロクリエイター向け";
  if (m.includes("4070")) return "最新3Dゲームも高画質で快適";
  if (m.includes("4060")) return "ほとんどのゲームが中〜高画質で快適";
  if (m.includes("4050")) return "人気ゲームが遊べる入門ゲーミング";
  if (m.includes("3080") || m.includes("3070")) return "前世代フラグシップ。まだまだ現役";
  return null;
}

function refreshLabel(hz: number): string {
  if (hz <= 60)  return "事務・動画向け";
  if (hz <= 120) return "ヌルヌル滑らか";
  return "ゲーマー向け";
}

export default function LaptopCard({ laptop, showAffiliate = true }: Props) {
  const formatter = new Intl.NumberFormat("ja-JP");
  const gradient = makerGradients[laptop.maker] ?? "from-gray-700 via-gray-600 to-gray-700";
  const wInfo = weightInfo(laptop.weight);
  const bInfo = batteryInfo(laptop.battery);
  const storageTB = laptop.storage.size >= 900
    ? `${Math.round(laptop.storage.size / 1000)}TB`
    : `${laptop.storage.size}GB`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {/* ブランドカラーエリア / 製品画像 */}
      <div className={`${laptop.image ? "bg-white" : `bg-gradient-to-br ${gradient}`} h-32 flex items-center justify-center relative overflow-hidden`}>
        {laptop.image ? (
          <Image
            src={laptop.image}
            alt={laptop.name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <LaptopIcon />
        )}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
          {laptop.featured && (
            <span className="text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">★ イチオシ</span>
          )}
          {laptop.badge?.includes("コスパ") && (
            <span className="text-xs bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">{laptop.badge}</span>
          )}
          {laptop.badge?.includes("予算") && (
            <span className="text-xs bg-gray-500 text-white font-bold px-2 py-0.5 rounded-full">{laptop.badge}</span>
          )}
          {laptop.badge && !laptop.badge.includes("コスパ") && !laptop.badge.includes("予算") && (
            <span className="text-xs bg-white/90 text-gray-800 font-bold px-2 py-0.5 rounded-full">{laptop.badge}</span>
          )}
          {laptop.new && (
            <span className="text-xs bg-green-500 text-white font-bold px-2 py-0.5 rounded-full">NEW</span>
          )}
        </div>
      </div>

      <div className="p-5">
        {/* 名前・価格・スコア */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            {!laptop.featured && !laptop.new && !laptop.badge && laptop.popular && (
              <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mr-1 mb-1">人気</span>
            )}
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{laptop.name}</h3>
            {laptop.highlight && (
              <p className="text-xs text-blue-600 mt-0.5 leading-snug">{laptop.highlight}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            {laptop.isRefurbished ? (
              <div>
                <p className="text-[10px] text-gray-400 font-medium">メルカリ相場</p>
                <p className="text-lg font-bold text-orange-600">
                  ¥{formatter.format(laptop.price)}<span className="text-xs font-normal text-gray-400">〜</span>
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-gray-500 font-medium">参考価格</p>
                <p className="text-lg font-bold text-gray-900">
                  {Math.floor(laptop.price / 10000)}万円台<span className="text-xs font-normal text-gray-500">〜</span>
                </p>
              </div>
            )}
            <div className="flex items-center gap-1 justify-end mt-1">
              <span className="text-yellow-500 text-xs">★</span>
              <span className="text-sm font-semibold">{laptop.score.overall}</span>
              <span className="text-xs text-gray-400">/100</span>
            </div>
          </div>
        </div>

        {/* スペック＋一言解説 */}
        <div className="space-y-1.5 text-xs mb-3">
          <div className="flex items-center gap-2">
            <span className="w-9 shrink-0 text-gray-400">重さ</span>
            <span className="text-gray-700">{laptop.weight}kg</span>
            <span className={`ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${wInfo.cls}`}>
              {wInfo.emoji} {wInfo.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-9 shrink-0 text-gray-400">RAM</span>
            <span className="text-gray-700">{laptop.ram}GB</span>
            <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap bg-blue-50 text-blue-700">
              {ramLabel(laptop.ram)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-9 shrink-0 text-gray-400">SSD</span>
            <span className="text-gray-700">{storageTB}</span>
            <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap bg-green-50 text-green-700">
              {storageLabel(laptop.storage.size)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-9 shrink-0 text-gray-400">電池</span>
            <span className="text-gray-700">約{laptop.battery}時間</span>
            <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap bg-yellow-50 text-yellow-700">
              {bInfo.emoji} {bInfo.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-9 shrink-0 text-gray-400">GPU</span>
            <span className="text-gray-700 truncate">{laptop.gpu.model.replace(" GPU", "").replace("Apple ", "")}</span>
            {gpuLabel(laptop.gpu.model, laptop.gpu.type) && (
              <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap bg-indigo-50 text-indigo-700">
                {gpuLabel(laptop.gpu.model, laptop.gpu.type)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-9 shrink-0 text-gray-400">CPU</span>
            <span className="text-gray-700 truncate">{laptop.cpu.model}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-9 shrink-0 text-gray-400">画面</span>
            <span className="text-gray-700">{laptop.display.size}&quot; {laptop.display.refresh}Hz</span>
            {laptop.display.refresh > 60 && (
              <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap bg-purple-50 text-purple-700">
                {refreshLabel(laptop.display.refresh)}
              </span>
            )}
          </div>
        </div>

        {/* 強み・弱み */}
        <ul className="space-y-0.5 mb-3">
          {laptop.pros.slice(0, 2).map((p, i) => (
            <li key={i} className="text-xs text-gray-600 flex gap-1">
              <span className="text-green-500 shrink-0">✓</span>{p}
            </li>
          ))}
          {laptop.cons[0] && (
            <li className="text-xs text-gray-500 flex gap-1">
              <span className="text-orange-400 shrink-0">△</span>{laptop.cons[0]}
            </li>
          )}
        </ul>

        {/* 購入ボタン */}
        {showAffiliate && (
          <div className="flex gap-2 flex-wrap">
            {laptop.amazonUrl && (
              <a
                href={laptop.amazonUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 text-center text-xs py-2 px-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors"
              >
                Amazonで探す
              </a>
            )}
            {laptop.rakutenUrl && (
              <a
                href={laptop.rakutenUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 text-center text-xs py-2 px-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
              >
                楽天で見る
              </a>
            )}
            {laptop.makerUrl && (
              <a
                href={laptop.makerUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 text-center text-xs py-2 px-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
              >
                公式で見る
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
