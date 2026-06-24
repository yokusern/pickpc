import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: { default: "PickPC | PCえらびの完全ガイド", template: "%s | PickPC" },
  description: "PCの選び方がわからない人のための完全ガイド。3分診断でおすすめPCを提案。予算¥5万〜¥40万、初心者〜プロまで対応。MacBook・ThinkPad・ゲーミングPCを徹底比較。",
  keywords: ["PC選び", "おすすめPC", "パソコン比較", "自作PC", "ゲーミングPC", "ノートパソコン", "MacBook", "ThinkPad", "PC診断", "大学生 パソコン"],
  metadataBase: new URL("https://pickpc.vercel.app"),
  openGraph: {
    siteName: "PickPC",
    type: "website",
    url: "https://pickpc.vercel.app",
    title: "PickPC | PCえらびの完全ガイド",
    description: "3分でわかる！あなたに最適なPC。初心者〜プロまで、予算・用途に合わせて比較・提案。",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "PickPC | 3分でわかる！あなたに最適なPC",
    description: "PC選びで迷ったらPickPC。診断・比較・自作PCまで、初心者でも最適な1台が見つかる。",
  },
  verification: {
    google: "ML4qNrmJxuVyEPMULNpSl59dwBAUvOowjPsYt1rrvgo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={geist.variable}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
