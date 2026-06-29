import Link from "next/link";
import laptopsData from "@/data/laptops.json";
import makersData from "@/data/makers.json";
import { Laptop, Maker } from "@/lib/types";
import LaptopCard from "@/components/LaptopCard";
import DiagnosisWizard from "@/components/DiagnosisWizard";

const laptops = laptopsData as Laptop[];
const makers = makersData as Maker[];

const categories = [
  { id: "programming", label: "開発",       icon: "💻", href: "/category/programming" },
  { id: "gaming",      label: "ゲーム",     icon: "🎮", href: "/category/gaming" },
  { id: "student",     label: "学生向け",   icon: "📚", href: "/category/student" },
  { id: "work",        label: "仕事向け",   icon: "💼", href: "/category/work" },
  { id: "creator",     label: "クリエイター", icon: "🎨", href: "/category/creator" },
  { id: "mobile",      label: "軽量モバイル", icon: "🏃", href: "/category/mobile" },
];

const popularOrder = [
  "nec-lavie-nextreme", "macbook-air-m4-13", "macbook-air-m3-13",
  "macbook-pro-m5-16", "thinkpad-x1-carbon", "macbook-air-m1-13",
  "ideapad-slim5-gen9", "asus-rog-zephyrus-g14",
];
const popularLaptops = popularOrder
  .map((id) => laptops.find((l) => l.id === id))
  .filter((l): l is Laptop => l !== undefined);

const makerOrder = ["apple", "nec", "lenovo", "dell", "hp", "asus", "microsoft"];
const featuredMakers = makerOrder
  .map((id) => makers.find((m) => m.id === id))
  .filter((m): m is Maker => m !== undefined);

const GUIDES = [
  { href: "/knowledge/pc-osusume-2026",      title: "PCおすすめ 2026年版 完全ガイド",      desc: "用途・予算・OS別に比較。迷ったらここから。",                   featured: true  },
  { href: "/knowledge/daigakusei-pc-2026",   title: "大学生のPCおすすめ 2026",             desc: "文系・理系・学部別に選び方を解説。MacBookとWindowsを比較。", featured: false },
  { href: "/knowledge/pc-10man-ika",         title: "10万円以下PCおすすめ 2026",           desc: "IdeaPad・VivoBook・Nitro Vのコスパ比較。",                    featured: false },
  { href: "/knowledge/video-henshu-pc-2026", title: "動画編集PCおすすめ 2026",             desc: "MacBook Pro M4 vs ROG G14。4K編集のスペックも解説。",         featured: false },
  { href: "/knowledge/programming-pc-2026",  title: "プログラミングPCおすすめ 2026",       desc: "Web開発・Python・機械学習向けに比較。Mac vs Windows。",        featured: false },
  { href: "/knowledge/spec-guide",           title: "PCスペックの読み方",                  desc: "CPU・RAM・SSD・GPUをゼロから解説。初心者必読。",              featured: false },
];

export default function HomePage() {
  return (
    <div className="pc-page">

      {/* ── Header ── */}
      <header className="pc-header">
        <div className="pc-header-inner">
          <Link href="/" className="pc-logo">
            Pick<span className="pc-logo-accent">PC</span>
          </Link>
          <nav className="pc-nav">
            <Link href="/shindan"  className="pc-nav-link">PC診断</Link>
            <Link href="/category" className="pc-nav-link">カテゴリ</Link>
            <Link href="/compare"  className="pc-nav-link">比較</Link>
            <Link href="/jisaku"   className="pc-nav-link">自作</Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pc-hero">
        <div className="pc-hero-inner">
          <span className="pc-hero-kicker pc-reveal">PC診断 · 比較 · 自作ガイド</span>
          <h1 className="pc-hero-h1 pc-reveal pc-reveal-d1">
            目的と予算を入力するだけで、<br />
            <em>最適なPC</em>が決まる。
          </h1>
          <p className="pc-hero-sub pc-reveal pc-reveal-d2">
            ゲーム・開発・動画編集・学業。用途と予算から3分で診断。
            MacBook・ThinkPad・ゲーミングPCを徹底比較。
          </p>
          <div className="pc-hero-btns pc-reveal pc-reveal-d3">
            <Link href="/shindan"  className="pc-btn-primary">無料でPC診断をする →</Link>
            <Link href="/category" className="pc-btn-secondary">カテゴリから探す</Link>
          </div>
          <div className="pc-hero-pills">
            <span className="pc-pill">📊 23機種収録</span>
            <span className="pc-pill">⚡ 最大8問の診断</span>
            <span className="pc-pill">🔒 登録不要・無料</span>
            <span className="pc-pill">📝 Amazonアソシエイト表示あり</span>
          </div>
        </div>
      </section>

      {/* ── Category strip ── */}
      <div className="pc-cat-strip">
        <div className="pc-cat-inner">
          {categories.map((c) => (
            <Link key={c.id} href={c.href} className="pc-cat-link">
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Diagnosis ── */}
      <section className="pc-section-tint">
        <div className="pc-section">
          <h2 className="pc-section-h2">PC診断</h2>
          <p className="pc-section-sub">最大8問の質問に答えるだけ。最適なPCをすぐ提案します。</p>
          <DiagnosisWizard laptops={laptops} />
        </div>
      </section>

      {/* ── Popular PCs ── */}
      <section className="pc-section">
        <div className="pc-row-between">
          <h2 className="pc-section-h2">人気のおすすめPC</h2>
          <Link href="/category" className="pc-link-green">すべて見る →</Link>
        </div>
        {popularLaptops[0] && (
          <div className="pc-featured-wrapper">
            <LaptopCard laptop={popularLaptops[0]} featured />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularLaptops.slice(1, 7).map((l) => (
            <LaptopCard key={l.id} laptop={l} />
          ))}
        </div>
      </section>

      {/* ── Maker section ── */}
      <section className="pc-section-tint">
        <div className="pc-section">
          <div className="pc-row-between">
            <h2 className="pc-section-h2">メーカー図鑑</h2>
            <Link href="/maker" className="pc-link-green">全メーカー見る →</Link>
          </div>
          <div className="pc-maker-grid">
            {featuredMakers.map((m) => (
              <Link key={m.id} href={`/maker/${m.id}`} className="pc-maker-chip">
                <span>💻</span>
                <span className="pc-maker-name">{m.name}</span>
                <span className="pc-maker-tag">{m.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide articles ── */}
      <section className="pc-section">
        <div className="pc-row-between">
          <h2 className="pc-section-h2">PC選びガイド</h2>
          <Link href="/knowledge/pc-osusume-2026" className="pc-link-green">すべて見る →</Link>
        </div>
        <div className="pc-auto-grid">
          {GUIDES.map(({ href, title, desc, featured }) => (
            <Link
              key={href}
              href={href}
              className={`pc-guide-card${featured ? " pc-guide-card-featured" : ""}`}
            >
              {featured && <span className="pc-guide-featured-badge">総合ガイド</span>}
              <h3 className="pc-guide-title">{title}</h3>
              <p className="pc-guide-desc">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── DIY CTA ── */}
      <section className="pc-section-tint">
        <div className="pc-section">
          <div className="pc-diy-block">
            <p className="pc-diy-kicker">🔧 自作PC完全ガイド</p>
            <h2 className="pc-diy-h2">自分でPCを組む、という選択肢</h2>
            <p className="pc-diy-body">
              10万円の予算で、同じ値段の既製品より2倍の性能を出せることがある。
              予算別・ゲーム別の推奨構成を全部公開します。
            </p>
            <div className="pc-diy-btns">
              <Link href="/jisaku"          className="pc-btn-primary">自作PCガイドを見る</Link>
              <Link href="/jisaku/mid-100k" className="pc-diy-outline-btn">10万円構成を見る</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parts compare ── */}
      <section className="pc-section">
        <h2 className="pc-section-h2 pc-section-mb24">パーツ比較</h2>
        <div className="pc-auto-grid">
          {[
            { href: "/parts/gpu", icon: "⚙️", title: "GPU比較", desc: "RTX 4050〜4090、RX 7600〜7900まで全部比較。用途別おすすめも。" },
            { href: "/parts/cpu", icon: "🔲", title: "CPU比較", desc: "Intel vs AMD、世代別比較、Apple Mシリーズまで徹底解説。" },
          ].map((p) => (
            <Link key={p.href} href={p.href} className="pc-card pc-parts-card">
              <p className="pc-parts-icon">{p.icon}</p>
              <h3 className="pc-parts-title">{p.title}</h3>
              <p className="pc-parts-desc">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pc-footer">
        <p>Amazonのアソシエイトとして、PickPCは適格販売により収入を得ています。掲載価格はAmazon検索結果に基づく参考価格です。</p>
        <p>© 2026 PickPC</p>
      </footer>
    </div>
  );
}
