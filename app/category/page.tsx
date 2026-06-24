import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "カテゴリ別おすすめPC",
  description: "ゲーミング・学生向け・仕事・クリエイター・軽量モバイルなど用途別のおすすめPCを徹底比較。",
};

const categories = [
  {
    id: "programming",
    label: "開発・プログラミング",
    icon: "💻",
    desc: "Web開発・Docker・AI・アプリ開発向けPC。メモリ16GB以上・SSD高速・キーボード品質を重視。",
    tags: ["メモリ16GB+", "高速SSD", "キーボード品質"],
  },
  {
    id: "gaming",
    label: "ゲーミング",
    icon: "🎮",
    desc: "FPS・オープンワールド・MMOに最適なゲーミングノートPC。RTX 4060〜4080搭載モデルを比較。",
    tags: ["RTX搭載", "高リフレッシュレート", "高性能CPU"],
  },
  {
    id: "student",
    label: "学生向け",
    icon: "📚",
    desc: "レポート・プレゼン・プログラミング学習に最適。10万円以下でも十分なモデルを紹介。",
    tags: ["コスパ", "軽量", "バッテリー長持ち"],
  },
  {
    id: "work",
    label: "仕事・ビジネス",
    icon: "💼",
    desc: "資料作成・メール・Web会議が快適。耐久性・キーボード品質・セキュリティ機能を重視。",
    tags: ["耐久性", "高品質キーボード", "長バッテリー"],
  },
  {
    id: "creator",
    label: "動画編集・クリエイター",
    icon: "🎨",
    desc: "Premiere Pro・After Effects・Photoshopが快適に動く。ディスプレイ品質とGPU性能が重要。",
    tags: ["高品質ディスプレイ", "高性能GPU", "大容量RAM"],
  },
  {
    id: "mobile",
    label: "軽量モバイル",
    icon: "🏃",
    desc: "毎日持ち運ぶ人向け。1.5kg以下・バッテリー12時間以上の軽量ノートPCを厳選。",
    tags: ["1.5kg以下", "バッテリー12時間+", "薄型"],
  },
  {
    id: "general",
    label: "一般用途",
    icon: "🌐",
    desc: "Web・YouTube・Office・SNS用途。コスパ重視で選ぶスタンダードなノートPC。",
    tags: ["コスパ", "使いやすい", "入門向け"],
  },
  {
    id: "programming",
    label: "プログラミング向け",
    icon: "💻",
    desc: "コーディング・開発環境・Docker・仮想マシンが快適。メモリ16GB以上を推奨。",
    tags: ["メモリ16GB+", "高性能CPU", "キーボード品質"],
  },
  {
    id: "dtm",
    label: "DTM・音楽制作",
    icon: "🎵",
    desc: "DAW（Ableton Live・Logic Pro）が快適に動くPC。低レイテンシーとCPU性能が鍵。",
    tags: ["高性能CPU", "低レイテンシー", "安定動作"],
  },
  {
    id: "ai",
    label: "AI・機械学習",
    icon: "🤖",
    desc: "PyTorch・TensorFlowを使った機械学習向け。GPU VRAM・RAM・CPUコア数が重要。",
    tags: ["高VRAM GPU", "32GB+ RAM", "高性能CPU"],
  },
  {
    id: "beginner",
    label: "初心者・シニア向け",
    icon: "👋",
    desc: "PC初心者やシニアの方でも安心して使えるモデル。サポートの充実度も重視。",
    tags: ["サポート充実", "使いやすい", "国産ブランド"],
  },
  {
    id: "highend",
    label: "ハイエンド",
    icon: "👑",
    desc: "予算20万円以上。最高性能・最高品質のノートPCを厳選。妥協なしの1台。",
    tags: ["最高性能", "プレミアム品質", "OLED"],
  },
  {
    id: "budget",
    label: "コスパ重視",
    icon: "💰",
    desc: "8万円以下でも十分使えるコスパPC。学生・副業・日常使いに。",
    tags: ["8万円以下", "コスパ", "必要十分"],
  },
];

export default function CategoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">カテゴリ別おすすめPC</h1>
        <p className="text-gray-600">用途・目的からおすすめPCを探す</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.id}`}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{c.icon}</span>
              <h2 className="font-bold text-gray-900 group-hover:text-blue-700">{c.label}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-3">{c.desc}</p>
            <div className="flex flex-wrap gap-1">
              {c.tags.map((t) => (
                <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
