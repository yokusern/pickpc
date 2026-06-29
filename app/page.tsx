import Link from "next/link";
import laptopsData from "@/data/laptops.json";
import makersData from "@/data/makers.json";
import { Laptop, Maker } from "@/lib/types";
import LaptopCard from "@/components/LaptopCard";
import DiagnosisWizard from "@/components/DiagnosisWizard";

const laptops = laptopsData as Laptop[];
const makers = makersData as Maker[];

const categories = [
  { id: "programming", label: "開発", icon: "💻", href: "/category/programming" },
  { id: "gaming", label: "ゲーミング", icon: "🎮", href: "/category/gaming" },
  { id: "student", label: "学生向け", icon: "📚", href: "/category/student" },
  { id: "work", label: "仕事向け", icon: "💼", href: "/category/work" },
  { id: "creator", label: "クリエイター", icon: "🎨", href: "/category/creator" },
  { id: "mobile", label: "軽量モバイル", icon: "🏃", href: "/category/mobile" },
];

const popularOrder = [
  "nec-lavie-nextreme",
  "macbook-air-m4-13",
  "macbook-air-m3-13",
  "macbook-pro-m5-16",
  "thinkpad-x1-carbon",
  "macbook-air-m1-13",
  "ideapad-slim5-gen9",
  "asus-rog-zephyrus-g14",
  "asus-zenbook-14-oled",
  "asus-tuf-a15",
];
const popularLaptops = popularOrder
  .map((id) => laptops.find((l) => l.id === id))
  .filter((l): l is Laptop => l !== undefined);

const makerOrder = ["apple", "nec", "lenovo", "dell", "hp", "asus", "microsoft"];
const featuredMakers = makerOrder
  .map((id) => makers.find((m) => m.id === id))
  .filter((m): m is Maker => m !== undefined);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pc-hero">
        <div className="pc-hero-inner">
          <p className="pc-hero-eyebrow">PC診断 · 比較 · 自作ガイド</p>
          <h1 className="pc-hero-h1">
            目的と予算を選ぶだけ。<br />
            <span className="pc-accent">最適なPC</span>が決まる。
          </h1>
          <p className="pc-hero-sub">
            ゲーム・開発・動画編集・学業。用途と予算から3分で診断。
            MacBook・ThinkPad・ゲーミングPCを徹底比較。
          </p>
          <div className="pc-hero-btns">
            <Link href="/shindan" className="pc-btn-primary">
              無料でPC診断をする →
            </Link>
            <Link href="/category/gaming" className="pc-btn-secondary">
              カテゴリから探す
            </Link>
          </div>
          <p className="pc-hero-note">バナー広告なし · 登録不要 · Amazonアソシエイトリンクあり</p>
        </div>
      </section>

      {/* Quick Category */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold mb-5 text-center text-gray-800">用途から探す</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-all pc-card-hover"
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-xs font-medium text-gray-700">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Diagnosis CTA */}
      <section className="bg-white border-y border-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">PC診断</h2>
            <p className="text-gray-600">最大8問の質問に答えるだけ。最適なPCをすぐ提案します。</p>
          </div>
          <DiagnosisWizard laptops={laptops} />
        </div>
      </section>

      {/* Popular PCs */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">人気のおすすめPC</h2>
          <Link href="/category" className="pc-link">すべて見る →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularLaptops.map((l) => (
            <LaptopCard key={l.id} laptop={l} />
          ))}
        </div>
      </section>

      {/* Makers Section */}
      <section className="pc-section-tint py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">メーカー図鑑</h2>
            <Link href="/maker" className="pc-link">全メーカー見る →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {featuredMakers.map((m) => (
              <Link
                key={m.id}
                href={`/maker/${m.id}`}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-sm transition-all pc-card-hover"
              >
                <p className="font-bold text-sm text-gray-900">{m.name}</p>
                <p className="text-[11px] text-gray-500 mt-1 leading-tight line-clamp-2">{m.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIY CTA */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl">
            <p className="pc-diy-label">🔧 自作PC完全ガイド</p>
            <h2 className="text-3xl font-bold mb-4">自分でPCを組む、という選択肢</h2>
            <p className="text-gray-300 mb-6">
              10万円の予算で、同じ値段の既製品より2倍の性能を出せることがある。
              予算別・ゲーム別の推奨構成を全部公開します。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/jisaku"
                className="px-6 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                自作PCガイドを見る
              </Link>
              <Link
                href="/jisaku/mid-100k"
                className="px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors"
              >
                10万円構成を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Article Hub */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">PC選びガイド</h2>
          <Link href="/knowledge/pc-osusume-2026" className="pc-link">すべて見る →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/knowledge/pc-osusume-2026", title: "PCおすすめ 2026年版 完全ガイド", desc: "用途・予算・OS別に比較。迷ったらここから。", badge: "★ 総合ガイド" },
            { href: "/knowledge/daigakusei-pc-2026", title: "大学生のPCおすすめ 2026", desc: "文系・理系・学部別に選び方を解説。MacBookとWindowsを比較。", badge: "" },
            { href: "/knowledge/pc-10man-ika", title: "10万円以下PCおすすめ 2026", desc: "IdeaPad・VivoBook・Nitro Vのコスパ比較。", badge: "" },
            { href: "/knowledge/video-henshu-pc-2026", title: "動画編集PCおすすめ 2026", desc: "MacBook Pro M4 vs ROG G14。4K編集のスペックも解説。", badge: "" },
            { href: "/knowledge/programming-pc-2026", title: "プログラミングPCおすすめ 2026", desc: "Web開発・Python・機械学習向けに比較。Mac vs Windows。", badge: "" },
            { href: "/knowledge/spec-guide", title: "PCスペックの読み方", desc: "CPU・RAM・SSD・GPUをゼロから解説。初心者必読。", badge: "" },
          ].map(({ href, title, desc, badge }) => (
            <Link
              key={href}
              href={href}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all pc-card-hover"
            >
              {badge && <span className="pc-badge">{badge}</span>}
              <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="pc-section-tint py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">PickPCの特徴</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "診断でズバリ提案", desc: "質問に答えるだけで、あなたの用途・予算に最適なPCを提案。迷いをなくします。" },
              { icon: "📊", title: "徹底した比較情報", desc: "メーカー13社・機種100モデル以上のスペック・評価を網羅。横断比較も簡単。" },
              { icon: "🔧", title: "自作PCも完全サポート", desc: "予算別・ゲーム別の推奨構成、パーツ選びのコツ、組み立て手順まで解説。" },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <p className="text-3xl mb-3">{f.icon}</p>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts Compare CTA */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-6">パーツ比較</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/parts/gpu"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-all pc-card-hover"
          >
            <p className="text-2xl mb-2">⚙️</p>
            <h3 className="font-bold text-gray-900 mb-1">GPU比較</h3>
            <p className="text-sm text-gray-600">RTX 4050〜4090、RX 7600〜7900まで全部比較。用途別おすすめも。</p>
          </Link>
          <Link
            href="/parts/cpu"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-all pc-card-hover"
          >
            <p className="text-2xl mb-2">🔲</p>
            <h3 className="font-bold text-gray-900 mb-1">CPU比較</h3>
            <p className="text-sm text-gray-600">Intel vs AMD、世代別比較、Apple Mシリーズまで徹底解説。</p>
          </Link>
        </div>
      </section>
    </>
  );
}
