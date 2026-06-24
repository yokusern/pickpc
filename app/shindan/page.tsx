import { Metadata } from "next";
import laptopsData from "@/data/laptops.json";
import { Laptop } from "@/lib/types";
import DiagnosisWizard from "@/components/DiagnosisWizard";

export const metadata: Metadata = {
  title: "PC診断",
  description: "4つの質問に答えるだけで、あなたに最適なPCを提案します。ゲーム・仕事・動画編集・学業など用途別におすすめPCをズバリ提案。",
};

const laptops = laptopsData as Laptop[];

export default function ShindanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-blue-600 font-semibold text-sm mb-2">🎯 PC診断</p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">あなたに最適なPCを探す</h1>
          <p className="text-gray-600">4つの質問に答えるだけ。所要時間：約1分</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <DiagnosisWizard laptops={laptops} />
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
          <p className="font-semibold mb-1">💡 診断のポイント</p>
          <ul className="space-y-1 text-blue-700">
            <li>• 予算はPC本体のみの金額で選んでください（モニター・周辺機器は含みません）</li>
            <li>• ゲームをする場合は「ゲーム」を選択してください</li>
            <li>• 迷ったら「どちらでも」を選ぶと広めに提案します</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
