import { Metadata } from "next";
import { notFound } from "next/navigation";
import laptopsData from "@/data/laptops.json";
import { Laptop } from "@/lib/types";
import LaptopCard from "@/components/LaptopCard";

const laptops = laptopsData as Laptop[];

const categoryConfig: Record<string, {
  label: string;
  icon: string;
  desc: string;
  tags?: string[];
  maxPrice?: number;
  minScore?: number;
  sortBy?: keyof Laptop["score"];
  filter?: (l: Laptop) => boolean;
}> = {
  gaming: {
    label: "ゲーミングノートPC",
    icon: "🎮",
    desc: "FPS・オープンワールド・MMOに最適なゲーミングノートPC。RTX 4060〜4080搭載モデルを比較。",
    filter: (l) => l.tags.includes("gaming") || l.gpu.type === "discrete",
    sortBy: "performance",
  },
  student: {
    label: "学生向けノートPC",
    icon: "📚",
    desc: "レポート・プレゼン・プログラミング学習に最適なPC。10万円以下でも十分なモデルを紹介。",
    filter: (l) => l.tags.includes("student") || l.price <= 130000,
    sortBy: "value",
  },
  work: {
    label: "仕事・ビジネス向けPC",
    icon: "💼",
    desc: "資料作成・メール・Web会議が快適。キーボード品質・耐久性を重視したモデルを厳選。",
    filter: (l) => l.tags.includes("work"),
    sortBy: "keyboard",
  },
  creator: {
    label: "クリエイター向けPC",
    icon: "🎨",
    desc: "動画編集・写真現像・デザインが快適。ディスプレイ品質とGPU性能を重視したモデル。",
    filter: (l) => l.tags.includes("creator"),
    sortBy: "display",
  },
  mobile: {
    label: "軽量モバイルPC",
    icon: "🏃",
    desc: "毎日持ち運ぶ人向け。1.5kg以下・長バッテリーの軽量ノートPCを厳選。",
    filter: (l) => l.weight <= 1.6 || l.tags.includes("mobile"),
    sortBy: "portability",
  },
  general: {
    label: "一般用途PC",
    icon: "🌐",
    desc: "Web・YouTube・Office・SNS用途のコスパPC。日常の使いやすさを重視。",
    filter: (l) => l.tags.includes("general") || (l.price <= 120000 && !l.tags.includes("gaming")),
    sortBy: "value",
  },
  programming: {
    label: "プログラミング向けPC",
    icon: "💻",
    desc: "コーディング・開発環境・Docker・仮想マシンが快適に動くPC。",
    filter: (l) => l.ram >= 16 && (l.tags.includes("work") || l.tags.includes("creator") || l.tags.includes("student")),
    sortBy: "performance",
  },
  highend: {
    label: "ハイエンドPC",
    icon: "👑",
    desc: "予算20万円以上。最高性能・最高品質のノートPCを厳選。",
    filter: (l) => l.price >= 200000,
    sortBy: "overall",
  },
  budget: {
    label: "コスパ重視PC",
    icon: "💰",
    desc: "10万円以下でも十分使えるコスパノートPC。",
    filter: (l) => l.price <= 110000,
    sortBy: "value",
  },
  ai: {
    label: "AI・機械学習向けPC",
    icon: "🤖",
    desc: "PyTorch・TensorFlow向け。高VRAM GPU・大容量RAM搭載のPC。",
    filter: (l) => (l.gpu.vram ?? 0) >= 8 || l.ram >= 32,
    sortBy: "performance",
  },
  beginner: {
    label: "初心者・シニア向けPC",
    icon: "👋",
    desc: "PC初心者やシニアの方でも安心して使えるモデル。",
    filter: (l) => l.price <= 130000 && l.os === "windows",
    sortBy: "value",
  },
  dtm: {
    label: "DTM・音楽制作向けPC",
    icon: "🎵",
    desc: "DAW（Ableton・Logic Pro）が快適に動くPC。",
    filter: (l) => l.ram >= 16 && l.cpu.cores >= 8,
    sortBy: "performance",
  },
};

const slugList = Object.keys(categoryConfig);

export function generateStaticParams() {
  return slugList.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const config = categoryConfig[slug];
  if (!config) return {};
  return {
    title: config.label,
    description: config.desc,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = categoryConfig[slug];
  if (!config) notFound();

  const filtered = laptops
    .filter(config.filter ?? (() => true))
    .sort((a, b) => {
      const key = config.sortBy ?? "overall";
      return b.score[key] - a.score[key];
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-4">
        <a href="/category" className="hover:text-blue-600">カテゴリ</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{config.label}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">
          <span className="mr-2">{config.icon}</span>{config.label}
        </h1>
        <p className="text-gray-600">{config.desc}</p>
        <p className="text-sm text-gray-400 mt-1">{filtered.length}機種該当</p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">該当するPCが見つかりませんでした。</p>
          <a href="/category" className="mt-4 inline-block text-blue-600 hover:underline">
            カテゴリ一覧に戻る
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((l, i) => (
            <div key={l.id} className="relative">
              {i === 0 && (
                <div className="absolute -top-2 left-3 z-10 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  🥇 No.1 おすすめ
                </div>
              )}
              {i === 1 && (
                <div className="absolute -top-2 left-3 z-10 bg-gray-300 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  🥈 No.2
                </div>
              )}
              {i === 2 && (
                <div className="absolute -top-2 left-3 z-10 bg-orange-300 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  🥉 No.3
                </div>
              )}
              <LaptopCard laptop={l} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-blue-50 rounded-xl">
        <h2 className="font-bold text-lg mb-2">迷っているなら診断がおすすめ</h2>
        <p className="text-sm text-gray-700 mb-4">
          4つの質問に答えるだけで、あなたに最適なPCをズバリ提案します。
        </p>
        <a
          href="/shindan"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors text-sm"
        >
          無料PC診断を試す →
        </a>
      </div>
    </div>
  );
}
