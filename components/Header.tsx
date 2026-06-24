"use client";
import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "PC診断", href: "/shindan" },
  { label: "メーカー図鑑", href: "/maker" },
  { label: "カテゴリ", href: "/category" },
  { label: "自作PC", href: "/jisaku" },
  { label: "パーツ比較", href: "/parts/gpu" },
  { label: "比較ツール", href: "/compare" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-blue-600 tracking-tight">
          Pick<span className="text-gray-900">PC</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/shindan"
            className="ml-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
          >
            診断スタート
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <div className="w-5 h-0.5 bg-gray-700 mb-1" />
          <div className="w-5 h-0.5 bg-gray-700 mb-1" />
          <div className="w-5 h-0.5 bg-gray-700" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <div className="p-4">
            <Link
              href="/shindan"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white text-sm rounded-full"
              onClick={() => setOpen(false)}
            >
              PC診断スタート
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
