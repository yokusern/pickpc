import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="font-bold text-white mb-3">PickPC</p>
            <p className="text-sm">PCえらびの完全ガイド。診断・比較・自作PCまで網羅。</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">コンテンツ</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shindan" className="hover:text-white transition-colors">PC診断</Link></li>
              <li><Link href="/maker" className="hover:text-white transition-colors">メーカー図鑑</Link></li>
              <li><Link href="/category" className="hover:text-white transition-colors">カテゴリ別おすすめ</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">自作・パーツ</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jisaku" className="hover:text-white transition-colors">自作PCガイド</Link></li>
              <li><Link href="/parts/gpu" className="hover:text-white transition-colors">GPU比較</Link></li>
              <li><Link href="/parts/cpu" className="hover:text-white transition-colors">CPU比較</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">PC比較ツール</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">おすすめ記事</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/knowledge/pc-osusume-2026" className="hover:text-white transition-colors">PCおすすめ 2026年版</Link></li>
              <li><Link href="/knowledge/daigakusei-pc-2026" className="hover:text-white transition-colors">大学生のPCおすすめ</Link></li>
              <li><Link href="/knowledge/pc-10man-ika" className="hover:text-white transition-colors">10万以下PCおすすめ</Link></li>
              <li><Link href="/knowledge/video-henshu-pc-2026" className="hover:text-white transition-colors">動画編集PCおすすめ</Link></li>
              <li><Link href="/knowledge/programming-pc-2026" className="hover:text-white transition-colors">プログラミングPCおすすめ</Link></li>
              <li><Link href="/knowledge/spec-guide" className="hover:text-white transition-colors">スペックの読み方</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-xs text-center">
          <p>Amazonのアソシエイトとして、PickPCは適格販売により収入を得ています。</p>
          <p className="mt-1">掲載価格はAmazon検索結果に基づく参考価格です。実際の価格はAmazonのページをご確認ください。</p>
          <p className="mt-2">© 2026 PickPC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
