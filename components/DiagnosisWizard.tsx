"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { Laptop } from "@/lib/types";
import LaptopCard from "./LaptopCard";

// ─── SpecScore ─────────────────────────────────────────────────────────────────
interface SpecScore {
  minRAM: number; recRAM: number; minSSD: number;
  gpuTier: number;   // 0=integrated 1=entry 2=mid 3=high 4=flagship
  maxWeight: number; minBattery: number; minScreen: number;
  needsPen: boolean; preferMac: boolean; requireMac: boolean;
  refreshRate: number;
  budget: { min: number; max: number };
}

// ─── Option type ───────────────────────────────────────────────────────────────
interface Opt {
  id: string; label: string; desc?: string;
  gpuTier?: number; gpuTierBoost?: number;
  recRAM?: number; minRAM?: number;
  refreshRate?: number; minScreen?: number;
  needsPen?: boolean; requireMac?: boolean; preferMac?: boolean;
}

// ─── Question type ─────────────────────────────────────────────────────────────
type QId =
  | "q1" | "q2" | "q3" | "q4"
  | "q5g" | "q6g" | "q7g"
  | "q5v" | "q6v" | "q7v"
  | "q5d" | "q6d"
  | "q5p" | "q6p"
  | "q8" | "q9" | "q10" | "q11";

interface QDef {
  id: QId; step: number; stepLabel: string; question: string;
  type: "single" | "multiple";
  maxSelect?: number; optional?: boolean;
  opts: Opt[];
}

// ─── Answers ───────────────────────────────────────────────────────────────────
interface Answers {
  q1: string; q2: string[]; q3: string[]; q4: string[];
  q5g: string[]; q6g: string; q7g: string;
  q5v: string; q6v: string; q7v: string;
  q5d: string; q6d: string;
  q5p: string[]; q6p: string[];
  q8: string; q9: string[]; q10: string; q11: string;
}
const INIT: Answers = {
  q1: "", q2: [], q3: [], q4: [],
  q5g: [], q6g: "", q7g: "",
  q5v: "", q6v: "", q7v: "",
  q5d: "", q6d: "",
  q5p: [], q6p: [],
  q8: "", q9: [], q10: "", q11: "",
};

// ─── Question definitions ──────────────────────────────────────────────────────
const Q: Record<QId, QDef> = {
  q1: {
    id: "q1", step: 1, stepLabel: "あなたについて", question: "あなたは？", type: "single",
    opts: [
      { id: "student-hs",  label: "🎒 中学生・高校生" },
      { id: "student-uni", label: "🎓 大学生・専門学生" },
      { id: "worker",      label: "💼 社会人（会社員）" },
      { id: "freelance",   label: "🏠 フリーランス・自営業" },
      { id: "creator-pro", label: "🎨 クリエイター（専業）" },
      { id: "senior",      label: "👴 シニア・PC初心者" },
    ],
  },
  q2: {
    id: "q2", step: 1, stepLabel: "あなたについて", question: "PCは主にどこで使う？", type: "multiple",
    opts: [
      { id: "home-desk", label: "🏠 自宅のデスクで" },
      { id: "cafe",      label: "☕ カフェや図書館" },
      { id: "commute",   label: "🚃 通学・通勤の移動中" },
      { id: "office",    label: "🏢 オフィス・学校" },
      { id: "bed",       label: "🛏 ベッドの上" },
    ],
  },
  q3: {
    id: "q3", step: 1, stepLabel: "あなたについて",
    question: "今のPCの不満は？（任意・初めて買う人はスキップ）",
    type: "multiple", optional: true,
    opts: [
      { id: "slow",         label: "🐌 とにかく遅い" },
      { id: "battery",      label: "🔋 バッテリーがすぐ切れる" },
      { id: "heavy",        label: "🏋️ 重すぎて持ち運べない" },
      { id: "storage",      label: "💾 容量がすぐ一杯になる" },
      { id: "screen-small", label: "🖥 画面が小さい" },
      { id: "noisy",        label: "🔊 ファンがうるさい" },
      { id: "first-pc",     label: "😵 PCを持っていない（初めて買う）" },
    ],
  },
  q4: {
    id: "q4", step: 2, stepLabel: "何に使う？",
    question: "メインの使い方は？（最大3つ）",
    type: "multiple", maxSelect: 3,
    opts: [
      { id: "programming", label: "💻 プログラミング" },
      { id: "gaming",      label: "🎮 ゲーム" },
      { id: "video",       label: "🎬 動画編集" },
      { id: "design",      label: "🎨 イラスト・デザイン" },
      { id: "docs",        label: "📝 レポート・文書作成" },
      { id: "web",         label: "🌐 ネット・YouTube・Netflix" },
      { id: "excel",       label: "📊 Excel・スプレッドシート（重め）" },
      { id: "photo",       label: "📸 写真編集（RAW現像）" },
      { id: "dtm",         label: "🎵 音楽制作（DTM）" },
      { id: "streaming",   label: "📡 配信（YouTube Live / Twitch）" },
      { id: "ai-ml",       label: "🤖 AI・機械学習" },
    ],
  },

  // ── Gaming ─────────────────────────────────────────────────────────────────
  q5g: {
    id: "q5g", step: 2, stepLabel: "ゲームの詳細", question: "どんなゲームをする？", type: "multiple",
    opts: [
      { id: "fps",       label: "🔫 FPS / TPS",        desc: "Valorant, Apex, CoD",     gpuTier: 3, refreshRate: 144, recRAM: 16 },
      { id: "openworld", label: "🌍 オープンワールド",  desc: "原神, エルデンリング, GTA", gpuTier: 3, recRAM: 32 },
      { id: "mmorpg",    label: "⚔️ MMORPG",            desc: "FF14, 黒い砂漠",          gpuTier: 2, recRAM: 16 },
      { id: "sandbox",   label: "🧱 サンドボックス",    desc: "Minecraft, テラリア",      gpuTier: 1, recRAM: 16 },
      { id: "racing",    label: "🏎 レース",            desc: "Forza, グランツーリスモ",  gpuTier: 2, recRAM: 16 },
      { id: "light",     label: "🎯 軽量対戦",          desc: "LoL, カードゲーム",        gpuTier: 0, recRAM: 8 },
      { id: "indie",     label: "🎲 インディー・レトロ", desc: "Undertale, Stardew Valley", gpuTier: 0, recRAM: 8 },
    ],
  },
  q6g: {
    id: "q6g", step: 2, stepLabel: "ゲームの詳細", question: "ゲームへのこだわりは？", type: "single",
    opts: [
      { id: "ultra",    label: "🖥 最高画質で遊びたい", desc: "ウルトラ設定",  gpuTierBoost: 1 },
      { id: "high",     label: "⚖️ そこそこ快適に",    desc: "高設定 60fps",  gpuTierBoost: 0 },
      { id: "playable", label: "💰 遊べればOK",         desc: "中設定",       gpuTierBoost: -1 },
      { id: "unknown",  label: "🤔 よくわからない",     desc: "",             gpuTierBoost: 0 },
    ],
  },
  q7g: {
    id: "q7g", step: 2, stepLabel: "ゲームの詳細", question: "モニターの希望は？", type: "single",
    opts: [
      { id: "144hz",   label: "🖥 144Hz以上",  desc: "FPSガチ勢向け", refreshRate: 144 },
      { id: "60hz",    label: "🖥 60Hzで十分", desc: "カジュアル",    refreshRate: 60 },
      { id: "4k",      label: "🖥 4K",          desc: "映像美重視",   gpuTierBoost: 1 },
      { id: "unknown", label: "🤔 わからない",  desc: "",             refreshRate: 60 },
    ],
  },

  // ── Video ──────────────────────────────────────────────────────────────────
  q5v: {
    id: "q5v", step: 2, stepLabel: "動画編集の詳細", question: "どんな動画を編集する？", type: "single",
    opts: [
      { id: "smartphone", label: "📱 スマホ撮影（1080p）",        recRAM: 16, gpuTier: 1 },
      { id: "camera-4k",  label: "📹 一眼カメラ（4K）",           recRAM: 32, gpuTier: 2 },
      { id: "pro",        label: "🎬 本格映像制作（4K60fps/RAW）", recRAM: 64, gpuTier: 3 },
      { id: "screen-rec", label: "🖥 画面録画・ゲーム実況",        recRAM: 16, gpuTier: 1 },
    ],
  },
  q6v: {
    id: "q6v", step: 2, stepLabel: "動画編集の詳細", question: "使うソフトは？", type: "single",
    opts: [
      { id: "premiere",  label: "🎬 Premiere Pro",    recRAM: 32, gpuTier: 2 },
      { id: "fcpx",      label: "🍎 Final Cut Pro",   requireMac: true },
      { id: "davinci",   label: "🎨 DaVinci Resolve", gpuTier: 3 },
      { id: "capcut",    label: "📱 CapCut（PC版）",  recRAM: 16, gpuTier: 1 },
      { id: "unknown",   label: "🤔 まだ決めてない",  recRAM: 16, gpuTier: 2 },
    ],
  },
  q7v: {
    id: "q7v", step: 2, stepLabel: "動画編集の詳細", question: "動画の長さは？", type: "single",
    opts: [
      { id: "short",   label: "📱 ショート（1分以内）", recRAM: 16 },
      { id: "youtube", label: "📺 YouTube（10〜30分）", recRAM: 32 },
      { id: "long",    label: "🎬 長尺（1時間以上）",   recRAM: 64 },
    ],
  },

  // ── Design ─────────────────────────────────────────────────────────────────
  q5d: {
    id: "q5d", step: 2, stepLabel: "デザインの詳細", question: "何をデザインする？", type: "single",
    opts: [
      { id: "illustration", label: "🎨 イラスト",       desc: "クリスタ / Procreate",    needsPen: true, recRAM: 16 },
      { id: "uiux",         label: "📐 UI/Webデザイン", desc: "Figma",                   recRAM: 16 },
      { id: "photo-edit",   label: "📸 写真加工",       desc: "Photoshop / Lightroom",   gpuTier: 1, recRAM: 16 },
      { id: "print",        label: "📄 印刷物",         desc: "Illustrator / InDesign",  minScreen: 15 },
      { id: "3dcg",         label: "🖌 3DCG",           desc: "Blender",                 gpuTier: 3, recRAM: 32 },
    ],
  },
  q6d: {
    id: "q6d", step: 2, stepLabel: "デザインの詳細", question: "ペンで直接描きたい？", type: "single",
    opts: [
      { id: "yes", label: "✏️ はい",    desc: "画面に直接描きたい", needsPen: true },
      { id: "no",  label: "🖱 いいえ",  desc: "マウスとペンタブを使う" },
    ],
  },

  // ── Programming ────────────────────────────────────────────────────────────
  q5p: {
    id: "q5p", step: 2, stepLabel: "開発の詳細", question: "何の開発をする？", type: "multiple",
    opts: [
      { id: "web",      label: "🌐 Web開発",      desc: "フロント / バックエンド", recRAM: 16 },
      { id: "ios",      label: "📱 iOSアプリ",    desc: "",                        requireMac: true, recRAM: 16 },
      { id: "android",  label: "📱 Androidアプリ",desc: "",                        recRAM: 16 },
      { id: "ai",       label: "🤖 AI・機械学習", desc: "",                        gpuTier: 3, recRAM: 32 },
      { id: "game-dev", label: "🎮 ゲーム開発",   desc: "Unity / Unreal",          gpuTier: 2, recRAM: 16 },
      { id: "docker",   label: "🐳 Docker使う",   desc: "",                        recRAM: 32 },
    ],
  },
  q6p: {
    id: "q6p", step: 2, stepLabel: "開発の詳細", question: "使うエディタ/ツールは？", type: "multiple",
    opts: [
      { id: "vscode",       label: "VSCode / Cursor",             recRAM: 16 },
      { id: "intellij",     label: "IntelliJ / Android Studio",   recRAM: 16 },
      { id: "xcode",        label: "Xcode",                       requireMac: true },
      { id: "docker-heavy", label: "Docker + 複数コンテナ",        recRAM: 32 },
    ],
  },

  // ── Final ──────────────────────────────────────────────────────────────────
  q8: {
    id: "q8", step: 3, stepLabel: "予算・優先度", question: "予算は？", type: "single",
    opts: [
      { id: "under-5", label: "〜5万円",    desc: "最低限動けばいい" },
      { id: "5-10",    label: "5〜10万円",  desc: "コスパ重視" },
      { id: "10-15",   label: "10〜15万円", desc: "バランス型" },
      { id: "15-20",   label: "15〜20万円", desc: "ちゃんとしたやつ" },
      { id: "20-30",   label: "20〜30万円", desc: "プロ仕様" },
      { id: "30-plus", label: "30万円〜",   desc: "妥協しない" },
      { id: "unknown", label: "🤔 わからない", desc: "用途から推奨予算を表示します" },
    ],
  },
  q9: {
    id: "q9", step: 3, stepLabel: "予算・優先度",
    question: "絶対に外せない条件は？（最大3つ、任意）",
    type: "multiple", maxSelect: 3, optional: true,
    opts: [
      { id: "light",      label: "🪶 軽さ（1.3kg以下）" },
      { id: "battery",    label: "🔋 バッテリー（10h以上）" },
      { id: "big-screen", label: "🖥 画面が大きい（15インチ以上）" },
      { id: "quiet",      label: "🔇 静音性" },
      { id: "keyboard",   label: "⌨️ キーボードの打ちやすさ" },
      { id: "design",     label: "🎨 デザイン・見た目" },
      { id: "durable",    label: "🛡 耐久性" },
      { id: "cheap",      label: "💰 とにかく安さ" },
      { id: "pen",        label: "🖊 タッチ・ペン対応" },
      { id: "ports",      label: "🔌 USBポートの数" },
    ],
  },
  q10: {
    id: "q10", step: 3, stepLabel: "予算・優先度", question: "ノート or デスクトップ？", type: "single",
    opts: [
      { id: "laptop",  label: "💻 ノートPC",       desc: "持ち運びたい" },
      { id: "desktop", label: "🖥 デスクトップ",   desc: "自宅メイン" },
      { id: "either",  label: "🤔 どちらでもいい", desc: "用途から判定します" },
    ],
  },
  q11: {
    id: "q11", step: 3, stepLabel: "予算・優先度", question: "OSの希望は？", type: "single",
    opts: [
      { id: "windows", label: "🪟 Windows" },
      { id: "mac",     label: "🍎 Mac" },
      { id: "either",  label: "🤔 どっちでもいい" },
      { id: "chromeos",label: "💡 ChromeOSも検討" },
    ],
  },
};

// ─── Budget map ────────────────────────────────────────────────────────────────
const BUDGET: Record<string, { min: number; max: number }> = {
  "under-5": { min: 0,      max: 50000 },
  "5-10":    { min: 50000,  max: 100000 },
  "10-15":   { min: 100000, max: 150000 },
  "15-20":   { min: 150000, max: 200000 },
  "20-30":   { min: 200000, max: 300000 },
  "30-plus": { min: 300000, max: 9999999 },
  "unknown": { min: 0,      max: 9999999 },
};

// ─── Queue ─────────────────────────────────────────────────────────────────────
function buildQueue(q4: string[]): QId[] {
  const queue: QId[] = ["q1", "q2", "q3", "q4"];
  if (q4.includes("programming")) queue.push("q5p", "q6p");
  if (q4.includes("gaming"))      queue.push("q5g", "q6g", "q7g");
  if (q4.includes("video"))       queue.push("q5v", "q6v", "q7v");
  if (q4.includes("design"))      queue.push("q5d", "q6d");
  queue.push("q8", "q9", "q10", "q11");
  return queue;
}

// ─── Spec score ────────────────────────────────────────────────────────────────
function apply(s: SpecScore, o: Opt) {
  if (o.gpuTier !== undefined)      s.gpuTier    = Math.max(s.gpuTier, o.gpuTier);
  if (o.gpuTierBoost !== undefined) s.gpuTier    = Math.max(0, Math.min(4, s.gpuTier + o.gpuTierBoost));
  if (o.recRAM !== undefined)       s.recRAM     = Math.max(s.recRAM, o.recRAM);
  if (o.minRAM !== undefined)       s.minRAM     = Math.max(s.minRAM, o.minRAM);
  if (o.refreshRate !== undefined)  s.refreshRate= Math.max(s.refreshRate, o.refreshRate);
  if (o.minScreen !== undefined)    s.minScreen  = Math.max(s.minScreen, o.minScreen);
  if (o.needsPen)    s.needsPen   = true;
  if (o.requireMac)  s.requireMac = true;
  if (o.preferMac)   s.preferMac  = true;
}

function pickOpts(qid: QId, ids: string[]): Opt[] {
  return Q[qid].opts.filter(o => ids.includes(o.id));
}

function computeSpec(a: Answers): SpecScore {
  const s: SpecScore = {
    minRAM: 8, recRAM: 8, minSSD: 512, gpuTier: 0,
    maxWeight: 999, minBattery: 0, minScreen: 0,
    needsPen: false, preferMac: false, requireMac: false,
    refreshRate: 60, budget: { min: 0, max: 9999999 },
  };

  // Q2: mobility
  if (a.q2.includes("commute")) { s.maxWeight = Math.min(s.maxWeight, 1.4); s.minBattery = Math.max(s.minBattery, 12); }
  else if (a.q2.includes("cafe") || a.q2.includes("bed")) { s.maxWeight = Math.min(s.maxWeight, 1.6); s.minBattery = Math.max(s.minBattery, 10); }

  // Q3: issues → hints
  if (a.q3.includes("heavy"))        s.maxWeight  = Math.min(s.maxWeight, 1.5);
  if (a.q3.includes("battery"))      s.minBattery = Math.max(s.minBattery, 10);
  if (a.q3.includes("screen-small")) s.minScreen  = Math.max(s.minScreen, 14);

  // Q4: non-branched uses
  if (a.q4.includes("streaming")) { s.recRAM = Math.max(s.recRAM, 32); }
  if (a.q4.includes("ai-ml"))     { s.gpuTier = Math.max(s.gpuTier, 3); s.recRAM = Math.max(s.recRAM, 32); }
  if (a.q4.includes("photo"))     { s.gpuTier = Math.max(s.gpuTier, 1); s.recRAM = Math.max(s.recRAM, 16); }
  if (a.q4.includes("excel"))     { s.recRAM = Math.max(s.recRAM, 16); }
  if (a.q4.includes("dtm"))       { s.recRAM = Math.max(s.recRAM, 16); if (a.q11 !== "windows") s.preferMac = true; }

  // Branch answers — applied in flow order so gpuTierBoost stacks correctly
  pickOpts("q5g", a.q5g).forEach(o => apply(s, o));
  if (a.q6g) { const o = Q.q6g.opts.find(x => x.id === a.q6g); if (o) apply(s, o); }
  if (a.q7g) { const o = Q.q7g.opts.find(x => x.id === a.q7g); if (o) apply(s, o); }
  if (a.q5v) { const o = Q.q5v.opts.find(x => x.id === a.q5v); if (o) apply(s, o); }
  if (a.q6v) { const o = Q.q6v.opts.find(x => x.id === a.q6v); if (o) apply(s, o); }
  if (a.q7v) { const o = Q.q7v.opts.find(x => x.id === a.q7v); if (o) apply(s, o); }
  if (a.q5d) { const o = Q.q5d.opts.find(x => x.id === a.q5d); if (o) apply(s, o); }
  if (a.q6d) { const o = Q.q6d.opts.find(x => x.id === a.q6d); if (o) apply(s, o); }
  pickOpts("q5p", a.q5p).forEach(o => apply(s, o));
  pickOpts("q6p", a.q6p).forEach(o => apply(s, o));

  // Q8: budget
  s.budget = BUDGET[a.q8] ?? { min: 0, max: 9999999 };

  // Q9: must-have
  if (a.q9.includes("light"))      s.maxWeight  = Math.min(s.maxWeight, 1.3);
  if (a.q9.includes("battery"))    s.minBattery = Math.max(s.minBattery, 10);
  if (a.q9.includes("big-screen")) s.minScreen  = Math.max(s.minScreen, 15);
  if (a.q9.includes("pen"))        s.needsPen   = true;

  // Q10: form factor
  if (a.q10 === "desktop") { s.maxWeight = 999; s.minBattery = 0; }

  // Q11: OS
  if (a.q11 === "mac")     s.preferMac = true;
  if (a.q11 === "windows" && !s.requireMac) s.preferMac = false;

  s.recRAM = Math.max(s.recRAM, s.minRAM);
  return s;
}

// ─── Reasons ───────────────────────────────────────────────────────────────────
function buildReasons(a: Answers, s: SpecScore): { label: string; why: string }[] {
  const r: { label: string; why: string }[] = [];
  if (s.requireMac) {
    r.push({ label: "OS: Mac必須",
      why: a.q5p.includes("ios") || a.q6p.includes("xcode") ? "iOS開発はXcode（Mac専用）が必要" : "Final Cut ProはMac専用ソフト"
    });
  }
  const GPU_LBL: Record<number, string> = { 1: "RTX 4050相当", 2: "RTX 4060以上", 3: "RTX 4070以上", 4: "RTX 4080以上" };
  const MAC_GPU_LBL: Record<number, string> = { 1: "Apple M3以上", 2: "Apple M3 Pro以上", 3: "Apple M4 Pro / M4 Max以上", 4: "Apple M4 Max以上" };
  const isMacReason = s.requireMac || a.q11 === "mac";
  if (s.gpuTier >= 2) {
    const w = [
      a.q6g === "ultra" && "最高画質ゲームには高性能GPUが必要",
      a.q5g.includes("fps") && "FPS 144fps・高設定ゲームに中位GPU以上が必要",
      (a.q6v === "davinci" || a.q5v === "pro") && "DaVinci Resolve・4K動画のGPUエンコードに必須",
      a.q5d === "3dcg" && "BlenderのCyclesレンダリング速度はGPUに直結",
      a.q5p.includes("ai") && (isMacReason ? "AppleシリコンのNeural Engineで高速AI処理" : "PyTorchのCUDA演算にはNVIDIA GPUが必須"),
    ].find(Boolean);
    const gpuLabel = isMacReason ? MAC_GPU_LBL[s.gpuTier] : GPU_LBL[s.gpuTier];
    r.push({ label: `GPU: ${gpuLabel}`, why: (w as string) ?? (isMacReason ? "高性能なAppleシリコンが必要" : "専用GPUで処理速度が大幅に向上") });
  }
  if (s.recRAM >= 64) {
    r.push({ label: `RAM: ${s.recRAM}GB以上`, why: "4K60fps・RAW素材の同時編集、または長尺動画書き出しに必要" });
  } else if (s.recRAM >= 32) {
    const w = [
      a.q5g.includes("openworld") && "原神・GTA等のオープンワールドは32GBで安定",
      (a.q5p.includes("docker") || a.q6p.includes("docker-heavy")) && "DockerでDB+API+Cacheを同時起動すると16GBはスワップが頻発",
      a.q7v === "youtube" && "YouTube動画の長時間編集には32GBが推奨",
      a.q5p.includes("ai") && "AI・機械学習の学習・推論でメモリを大量消費",
    ].find(Boolean);
    r.push({ label: `RAM: ${s.recRAM}GB以上`, why: (w as string) ?? "重い処理を複数同時に行うため" });
  } else if (s.recRAM >= 16) {
    r.push({ label: "RAM: 16GB以上", why: "開発・編集・ゲームの実用的な最低ライン" });
  }
  if (s.maxWeight <= 1.3)        r.push({ label: "重量: 1.3kg以下", why: "指定した「軽さ優先」条件" });
  else if (s.maxWeight <= 1.4)   r.push({ label: "重量: 1.4kg以下", why: "毎日の通学・通勤での持ち運びには1.4kg以下が快適" });
  else if (s.maxWeight <= 1.6)   r.push({ label: "重量: 1.6kg以下", why: "カフェへの持ち運びを考慮" });
  if (s.minBattery >= 12)        r.push({ label: "バッテリー: 12h以上", why: "移動中に充電できない場面も多い" });
  else if (s.minBattery >= 10)   r.push({ label: "バッテリー: 10h以上", why: "外出先でコンセントなしでも安心" });
  if (s.refreshRate >= 144)      r.push({ label: "144Hz以上のディスプレイ", why: "FPSゲームで144fps以上を活かすには高リフレッシュレートが必要" });
  if (s.needsPen)                r.push({ label: "ペン入力対応", why: "画面に直接描くにはペン対応デバイスが必要（Surface Pro等）" });
  return r;
}

// ─── Laptop scoring ────────────────────────────────────────────────────────────
function gpuTierOf(l: Laptop): number {
  if (l.gpu.type === "integrated") return 0;
  const m = l.gpu.model.toLowerCase();
  if (["4090","4080","5080"].some(x => m.includes(x))) return 4;
  if (["4070","5070","7900"].some(x => m.includes(x))) return 3;
  if (["4060","7700","7800"].some(x => m.includes(x))) return 2;
  return 1;
}

function scoreL(l: Laptop, s: SpecScore, a: Answers): number {
  if (s.requireMac && l.os !== "macos")                   return -9999;
  if (a.q11 === "windows" && !s.requireMac && l.os === "macos") return -9999;
  if (l.price > s.budget.max * 1.08)                       return -9999;
  if (l.ram < s.minRAM)                                     return -9999 + l.ram;
  if (s.maxWeight < 999 && l.weight > s.maxWeight + 0.2)   return -9999;
  if (s.minBattery > 0 && l.battery < s.minBattery - 2)   return -9999;
  if (s.minScreen > 0 && l.display.size < s.minScreen)     return -9999;
  const lt = gpuTierOf(l);
  if (lt < s.gpuTier - 1)                                  return -9999;

  let sc = l.score.overall * 2;
  sc += (lt - s.gpuTier) * 8;
  if (l.ram >= s.recRAM) sc += 20; else if (l.ram >= s.minRAM) sc += 10;
  if (s.refreshRate >= 144) { sc += l.display.refresh >= 144 ? 15 : -25; }
  if (s.maxWeight <= 1.6) { sc += (3.0 - l.weight) * 10; sc += l.score.portability * 0.15; }
  if (s.minBattery >= 10) sc += Math.min(l.battery, 22);
  if (a.q4.includes("gaming"))   sc += l.score.performance * 0.3;
  if (a.q4.includes("video") || a.q4.includes("design")) { sc += l.score.display * 0.3; sc += l.score.performance * 0.2; }
  if (a.q4.includes("programming") || a.q4.includes("docs")) sc += l.score.keyboard * 0.25;
  if (s.preferMac && l.os === "macos") sc += 20;
  if (!s.preferMac && !s.requireMac && l.os === "macos") sc -= 10;
  if (l.price >= s.budget.min && l.price <= s.budget.max) sc += 10;
  sc += l.score.value * 0.08;
  return sc;
}

// ─── State helpers ─────────────────────────────────────────────────────────────
function setField(na: Answers, qid: QId, v: string | string[]) {
  switch (qid) {
    case "q1": na.q1 = v as string; break;
    case "q2": na.q2 = v as string[]; break;
    case "q3": na.q3 = v as string[]; break;
    case "q4": na.q4 = v as string[]; break;
    case "q5g": na.q5g = v as string[]; break;
    case "q6g": na.q6g = v as string; break;
    case "q7g": na.q7g = v as string; break;
    case "q5v": na.q5v = v as string; break;
    case "q6v": na.q6v = v as string; break;
    case "q7v": na.q7v = v as string; break;
    case "q5d": na.q5d = v as string; break;
    case "q6d": na.q6d = v as string; break;
    case "q5p": na.q5p = v as string[]; break;
    case "q6p": na.q6p = v as string[]; break;
    case "q8":  na.q8  = v as string; break;
    case "q9":  na.q9  = v as string[]; break;
    case "q10": na.q10 = v as string; break;
    case "q11": na.q11 = v as string; break;
  }
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function DiagnosisWizard({ laptops }: { laptops: Laptop[] }) {
  const [ans, setAns]     = useState<Answers>({ ...INIT });
  const [hist, setHist]   = useState<QId[]>([]);
  const [cur, setCur]     = useState<QId>("q1");
  const [pending, setPending] = useState<string[]>([]);
  const [done, setDone]   = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Dynamic queue based on current/pending q4
  const queue = useMemo(
    () => buildQueue(cur === "q4" ? pending : ans.q4),
    [ans.q4, cur, pending]
  );
  const curIdx = queue.indexOf(cur);
  const pct    = Math.round(((curIdx + 1) / queue.length) * 100);
  const qDef   = Q[cur];

  // Auto-scroll when question changes
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [cur, done]);

  function advance(na: Answers) {
    const nq = buildQueue(na.q4);
    const ni = nq.indexOf(cur) + 1;
    if (ni >= nq.length) { setAns(na); setDone(true); return; }
    const next = nq[ni];
    setHist([...hist, cur]);
    setAns(na);
    setCur(next);
    // Pre-fill pending for multi-select
    if (Q[next].type === "multiple") {
      const v = na[next as keyof Answers];
      setPending(Array.isArray(v) ? [...v] : []);
    } else { setPending([]); }
  }

  function handleSingle(id: string) {
    const na = { ...ans };
    setField(na, cur, id);
    advance(na);
  }

  function handleMultiNext() {
    const na = { ...ans };
    setField(na, cur, pending);
    if (cur === "q4") {
      // Clear stale branch answers when q4 changes
      na.q5g = []; na.q6g = ""; na.q7g = "";
      na.q5v = ""; na.q6v = ""; na.q7v = "";
      na.q5d = ""; na.q6d = "";
      na.q5p = []; na.q6p = [];
    }
    advance(na);
  }

  function toggle(id: string) {
    const max = qDef.maxSelect ?? 999;
    setPending(prev =>
      prev.includes(id) ? prev.filter(x => x !== id)
      : prev.length < max ? [...prev, id] : prev
    );
  }

  function goBack() {
    if (!hist.length) return;
    const prev = hist[hist.length - 1];
    setHist(hist.slice(0, -1));
    setCur(prev);
    setDone(false);
    if (Q[prev].type === "multiple") {
      const v = ans[prev as keyof Answers];
      setPending(Array.isArray(v) ? [...v] : []);
    } else { setPending([]); }
  }

  function reset() { setAns({ ...INIT }); setHist([]); setCur("q1"); setPending([]); setDone(false); }

  if (done) return <Result ans={ans} laptops={laptops} onReset={reset} />;

  // requireMac notice before q11
  const showMacNote = cur === "q11" && (() => {
    const tmp = computeSpec({ ...ans, q8: ans.q8 || "unknown", q10: ans.q10 || "either" });
    return tmp.requireMac;
  })();

  return (
    <div ref={ref} className="max-w-2xl mx-auto scroll-mt-16">
      {/* Progress */}
      <div className="mb-6">
        <div className="pc-wizard-step-label">
          <span>{qDef.step === 1 ? "STEP 1 — あなたについて" : qDef.step === 2 ? "STEP 2 — 使い方の詳細" : "STEP 3 — 予算・優先度"}</span>
          <span>Q{curIdx + 1} / {queue.length}</span>
        </div>
        <div className="pc-progress-bar">
          <div className="pc-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Mac notice */}
      {showMacNote && (
        <div className="pc-mac-alert mb-4">
          <p className="pc-mac-alert-title">⚠️ 選択した用途にはMacが必要です</p>
          <p className="pc-mac-alert-body">iOS開発（Xcode）またはFinal Cut ProはMac専用のため、Mac以外の選択肢はフィルタリングされます。</p>
        </div>
      )}

      <h2 className="pc-wizard-question">{qDef.question}</h2>
      {qDef.type === "multiple" && (
        <p className="pc-wizard-multi-hint">
          複数選択できます{qDef.maxSelect ? `（最大${qDef.maxSelect}つ）` : ""}
          {pending.length > 0 ? ` — ${pending.length}つ選択中` : ""}
        </p>
      )}

      <div className="space-y-2 mb-6">
        {qDef.opts.map(opt => {
          const sel   = qDef.type === "multiple" && pending.includes(opt.id);
          const maxed = !!(qDef.type === "multiple" && qDef.maxSelect && pending.length >= qDef.maxSelect && !pending.includes(opt.id));
          return (
            <button
              type="button"
              key={opt.id}
              disabled={maxed}
              data-selected={sel}
              data-disabled={maxed}
              onClick={() => !maxed && (qDef.type === "multiple" ? toggle(opt.id) : handleSingle(opt.id))}
              className="pc-opt-card"
            >
              {qDef.type === "multiple" && (
                <div className="pc-opt-check">
                  {sel && <span className="pc-opt-check-mark">✓</span>}
                </div>
              )}
              <div>
                <p className="pc-opt-text">{opt.label}</p>
                {opt.desc && <p className="pc-opt-desc">{opt.desc}</p>}
              </div>
            </button>
          );
        })}
      </div>

      {qDef.type === "multiple" && (
        <div className="flex gap-3">
          <button type="button" onClick={handleMultiNext} disabled={pending.length === 0 && !qDef.optional} className="flex-1 pc-wizard-next">
            次へ →
          </button>
          {qDef.optional && (
            <button type="button" onClick={() => advance(ans)} className="pc-wizard-skip">特になし</button>
          )}
        </div>
      )}

      {hist.length > 0 && (
        <button type="button" onClick={goBack} className="pc-wizard-back">
          ← 前の質問に戻る
        </button>
      )}
    </div>
  );
}

// ─── Result ────────────────────────────────────────────────────────────────────
const USE_LBL: Record<string, string> = {
  programming: "開発", gaming: "ゲーム", video: "動画編集", design: "デザイン",
  docs: "文書作成", web: "ネット・動画", excel: "Excel", photo: "写真編集",
  dtm: "DTM", streaming: "配信", "ai-ml": "AI・機械学習",
};
const USER_LBL: Record<string, string> = {
  "student-hs": "高校生", "student-uni": "大学生", worker: "社会人",
  freelance: "フリーランス", "creator-pro": "クリエイター", senior: "シニア",
};
const GPU_DESC: Record<number, string> = {
  0: "内蔵GPUでOK", 1: "RTX 4050相当", 2: "RTX 4060以上", 3: "RTX 4070以上", 4: "RTX 4080以上",
};
function recBudget(s: SpecScore): string {
  if (s.gpuTier >= 3 || s.recRAM >= 64) return "¥20〜30万円";
  if (s.gpuTier >= 2 || s.recRAM >= 32) return "¥15〜20万円";
  if (s.gpuTier >= 1 || s.recRAM >= 16) return "¥10〜15万円";
  return "¥6〜10万円";
}

function Result({ ans: a, laptops, onReset }: { ans: Answers; laptops: Laptop[]; onReset: () => void }) {
  const spec    = useMemo(() => computeSpec(a), [a]);
  const reasons = useMemo(() => buildReasons(a, spec), [a, spec]);
  const { ranked, isFallback } = useMemo(() => {
    const scores = [...laptops].map(l => ({ l, sc: scoreL(l, spec, a) }));
    const main = scores.filter(x => x.sc > 0).sort((x, y) => y.sc - x.sc).slice(0, 6).map(x => x.l);
    if (main.length > 0) return { ranked: main, isFallback: false };
    const relaxSpec: SpecScore = {
      ...spec,
      maxWeight: spec.maxWeight < 900 ? spec.maxWeight + 0.5 : 999,
      minBattery: Math.max(0, spec.minBattery - 4),
      gpuTier: Math.max(0, spec.gpuTier - 1),
    };
    const fallback = [...laptops]
      .map(l => ({ l, sc: scoreL(l, relaxSpec, a) }))
      .filter(x => x.sc > 0)
      .sort((x, y) => y.sc - x.sc)
      .slice(0, 6)
      .map(x => x.l);
    return { ranked: fallback, isFallback: true };
  }, [laptops, spec, a]);

  const osLabel = spec.requireMac ? "Mac（macOS）必須"
    : a.q11 === "windows" ? "Windows 11"
    : a.q11 === "mac" ? "macOS"
    : a.q11 === "chromeos" ? "ChromeOS"
    : "Windows / Mac どちらでも";

  const isUnknownBudget = a.q8 === "unknown" || !a.q8;
  const isMacOnly = spec.requireMac || a.q11 === "mac";
  const isWinOnly = a.q11 === "windows" && !spec.requireMac;
  const cpuLabel  = isMacOnly ? "Apple M3 以上" : isWinOnly ? "Core i7 / Ryzen 7 以上" : "Core i7 / Ryzen 7 / Apple M3 以上";

  return (
    <div>
      {/* Spec card */}
      <div className="pc-result-card">
        <p className="pc-result-kicker">🎯 診断結果</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {a.q1 && <span className="pc-result-tag-user">{USER_LBL[a.q1] ?? a.q1}</span>}
          {a.q4.map(u => <span key={u} className="pc-result-tag-use">{USE_LBL[u] ?? u}</span>)}
          {(a.q2.includes("commute") || a.q2.includes("cafe")) && <span className="pc-result-tag-mobile">外出して使う</span>}
        </div>

        {isUnknownBudget && (
          <div className="pc-result-budget-hint">
            <span className="pc-result-budget-label">推奨予算目安：</span>
            <span>{recBudget(spec)}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <p className="pc-result-spec-heading">推奨スペック</p>
            <ul className="space-y-2 text-sm">
              {([
                ["OS", osLabel],
                ["CPU", cpuLabel],
                ["RAM", `${spec.recRAM}GB以上`],
                spec.gpuTier > 0 ? ["GPU", isMacOnly ? (spec.gpuTier >= 3 ? "Apple M4 Pro / M4 Max 以上" : "Apple M3 Pro 以上（内蔵GPU）") : GPU_DESC[spec.gpuTier]] : null,
                spec.maxWeight < 999 ? ["重量", `${spec.maxWeight}kg以下`] : null,
                spec.minBattery > 0  ? ["電池", `${spec.minBattery}h以上`] : null,
                spec.refreshRate > 60 ? ["画面", `${spec.refreshRate}Hz以上`] : null,
                spec.needsPen ? ["入力", "ペン対応必須"] : null,
              ] as ([string,string]|null)[]).filter((x): x is [string,string] => x !== null).map(([k,v]) => (
                <li key={k} className="pc-result-spec-row">
                  <span className="pc-result-spec-key">{k}</span>
                  <span className={k === "RAM" ? "pc-result-spec-val-green" : "pc-result-spec-val"}>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {reasons.length > 0 && (
            <div>
              <p className="pc-result-spec-heading">💡 なぜこのスペック？</p>
              <ul className="space-y-2">
                {reasons.slice(0, 5).map((r, i) => (
                  <li key={i} className="pc-result-reason">
                    <span className="pc-result-reason-label">{r.label}：</span>
                    <span className="pc-result-reason-body">{r.why}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Desktop notice */}
      {a.q10 === "desktop" && (
        <div className="pc-result-desktop-notice">
          <p className="pc-result-desktop-icon">🖥</p>
          <div className="flex-1">
            <p className="pc-result-desktop-title">デスクトップPCを希望の場合</p>
            <p className="pc-result-desktop-body">同予算でノートPCより高性能なデスクトップが作れます。BTOメーカーや自作PCをご検討ください。</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a href="/jisaku" className="pc-result-desktop-btn-primary">自作PCガイド</a>
            <a href="/maker/dospara" className="pc-result-desktop-btn-outline">BTOメーカー</a>
          </div>
        </div>
      )}

      {/* Ranked laptops */}
      <h2 className="pc-result-ranked-title">
        {isFallback && ranked.length > 0 ? "条件に近いおすすめPC" : `あなた専用おすすめPC — トップ${ranked.length}選`}
      </h2>
      {isFallback && ranked.length > 0 && (
        <div className="pc-result-fallback-notice">
          ⚠️ ご指定の条件を完全に満たすPCが現在のラインナップにありません。条件を少し緩めた近い候補を表示しています。
        </div>
      )}
      {ranked.length === 0 ? (
        <div className="pc-result-empty">
          <p className="text-3xl mb-3">😓</p>
          <p className="pc-result-empty-title">条件に合うPCが見つかりませんでした</p>
          <p className="pc-result-empty-sub">予算を増やすか、条件を変えてもう一度お試しください</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ranked.map((l, i) => (
            <div key={l.id} className="relative pt-3">
              {i === 0 && <div className="pc-rank-1">🥇 最もおすすめ</div>}
              {i === 1 && <div className="pc-rank-2">🥈 2位</div>}
              {i === 2 && <div className="pc-rank-3">🥉 3位</div>}
              <LaptopCard laptop={l} />
            </div>
          ))}
        </div>
      )}

      <div className="pc-result-actions">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("AIがぴったりのPCをおすすめしてくれた🎯\nあなたも3分で分かる👇")}&url=${encodeURIComponent("https://pickpc.vercel.app")}&hashtags=PickPC,PC選び,AI診断`}
          target="_blank"
          rel="noopener noreferrer"
          className="pc-result-share-btn"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          Xでシェアする
        </a>
        <button type="button" onClick={onReset} className="pc-result-reset-btn">
          ← もう一度診断する
        </button>
      </div>
    </div>
  );
}
