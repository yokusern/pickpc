import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

const BASE = "https://pickpc.vercel.app";
const AMAZON_TAG = "gearmasterrev-22";
const amz = (q: string) => `https://www.amazon.co.jp/s?k=${encodeURIComponent(q)}&tag=${AMAZON_TAG}`;

/* ────────── Article data ────────── */
const articles: Record<string, {
  title: string;
  desc: string;
  date: string;
  content: React.ReactNode;
}> = {

  /* ========== PILLAR ========== */
  "pc-osusume-2026": {
    title: "PCおすすめ 2026年版｜用途・予算別に完全ガイド",
    desc: "2026年最新のおすすめPCを用途・予算・OS別に比較。大学生・動画編集・ゲーミング・プログラミング向けの選び方をPickPCが解説。",
    date: "2026-06-21",
    content: (
      <div className="prose max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-blue-900 mb-1">📌 この記事の結論（すぐに決めたい方へ）</p>
          <ul className="text-sm text-blue-800 space-y-1 mt-2">
            <li>✅ <strong>まず試したい</strong> → <Link href="/shindan" className="underline">3分PC診断</Link>で用途・予算を入力すると最適な1台が出ます</li>
            <li>✅ <strong>大学生・普段使い</strong> → <Link href="/knowledge/daigakusei-pc-2026" className="underline">MacBook Air M4（¥14万台〜）</Link> が最も支持されています</li>
            <li>✅ <strong>予算5万以下</strong> → <Link href="/knowledge/pc-5man-ika" className="underline">IdeaPad Slim 1 Gen9（¥4万台〜）</Link> が入門ベストバリュー</li>
            <li>✅ <strong>予算10万以下</strong> → <Link href="/knowledge/pc-10man-ika" className="underline">IdeaPad Slim 5 Gen9（¥7万台〜）</Link> が現実的なベストバリュー</li>
            <li>✅ <strong>動画編集・クリエイター</strong> → <Link href="/knowledge/video-henshu-pc-2026" className="underline">MacBook Pro M4（¥24万台〜）</Link> またはROG Zephyrus G14</li>
            <li>✅ <strong>プログラミング・エンジニア</strong> → <Link href="/knowledge/programming-pc-2026" className="underline">MacBook Air M4 or ThinkPad X1 Carbon</Link></li>
          </ul>
        </div>

        <h2>2026年おすすめPC 用途×予算クイック比較表</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">用途</th>
                <th className="text-left p-3 border border-gray-200">〜7万円</th>
                <th className="text-left p-3 border border-gray-200">7〜15万円</th>
                <th className="text-left p-3 border border-gray-200">15万円〜</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["普段使い・大学", "IdeaPad Slim 5", "MacBook Air M4", "MacBook Air M4 15インチ"],
                ["在宅勤務・テレワーク", "Pavilion 15", "Surface Laptop 6", "ThinkPad X1 Carbon"],
                ["動画編集・クリエイター", "△（厳しい）", "ROG Zephyrus G14", "MacBook Pro M4"],
                ["ゲーミング", "Nitro V 16", "TUF Gaming A15", "Legion Pro 5i Gen9"],
                ["プログラミング", "IdeaPad Slim 5", "MacBook Air M4", "ThinkPad X1 Carbon"],
              ].map(([use, lo, mid, hi], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="p-3 border border-gray-200 font-medium">{use}</td>
                  <td className="p-3 border border-gray-200 text-sm text-gray-700">{lo}</td>
                  <td className="p-3 border border-gray-200 text-sm font-medium text-blue-700">{mid}</td>
                  <td className="p-3 border border-gray-200 text-sm text-gray-700">{hi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>用途別おすすめ記事</h2>
        <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { href: "/knowledge/daigakusei-pc-2026", title: "大学生のPCおすすめ 2026", desc: "文系・理系・工学部別に比較。予算別のベスト選択肢を解説。" },
            { href: "/knowledge/pc-10man-ika", title: "予算10万以下のPCおすすめ 2026", desc: "IdeaPad・VivoBook・Pavilionを比較。コスパ重視の5台。" },
            { href: "/knowledge/video-henshu-pc-2026", title: "動画編集PCおすすめ 2026", desc: "MacBook Pro M4・ROG G14・Legion Proを予算別に比較。" },
            { href: "/knowledge/programming-pc-2026", title: "プログラミングPCおすすめ 2026", desc: "Mac vs Windows。言語・フレームワーク別の最適解を解説。" },
          ].map(({ href, title, desc }) => (
            <Link key={href} href={href} className="block p-4 border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all">
              <p className="font-bold text-gray-900 text-sm mb-1">{title}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </Link>
          ))}
        </div>

        <h2>予算別おすすめPC一覧（2026年版）</h2>

        <h3>〜7万円：コスパ重視モデル</h3>
        <p>7万円以下の選択肢はWindows一択です。日常的なWeb閲覧・Office作業・動画視聴に十分な性能があります。</p>
        <ul>
          <li><strong>IdeaPad Slim 5 Gen9（¥7万台〜）</strong>：バランス良好。Ryzen 5・16GB RAMで普段使いに十分</li>
          <li><strong>VivoBook 15 2024（¥6万台〜）</strong>：価格帯最安クラス。軽い作業向け</li>
          <li><strong>Inspiron 15 3535（¥6万台〜）</strong>：DELLの入門機。信頼性と価格のバランス</li>
        </ul>
        <p>→ 詳しくは<Link href="/knowledge/pc-10man-ika">10万以下PCおすすめ記事</Link>で比較しています。</p>

        <h3>7〜15万円：バランス重視モデル</h3>
        <p>最も選択肢が広い価格帯です。MacとWindowsどちらも選べます。</p>
        <ul>
          <li><strong>MacBook Air M4 13" （¥14万台〜）</strong>：2026年最も売れているノートPC。バッテリー18時間・ファンレス・軽量1.24kg</li>
          <li><strong>ZenBook 14 OLED（¥14万台〜）</strong>：有機ELディスプレイが美しいWindowsノート</li>
          <li><strong>Surface Laptop 6（¥17万台〜）</strong>：Copilot+ PC対応・Touch対応・5G対応モデルも</li>
          <li><strong>Acer Swift Go 14（¥9万台〜）</strong>：軽量Windows。コスパ重視の方に</li>
        </ul>

        <h3>15万円〜：ハイパフォーマンスモデル</h3>
        <ul>
          <li><strong>MacBook Pro M4 14"（¥24万台〜）</strong>：プロの動画編集・音楽制作・プログラミングに最適</li>
          <li><strong>ThinkPad X1 Carbon Gen13（¥23万台〜）</strong>：ビジネス用途の頂点。キーボードが業界最高レベル</li>
          <li><strong>ROG Zephyrus G14（¥18万台〜）</strong>：ゲーム＋動画編集をこなすハイブリッド</li>
          <li><strong>Legion Pro 5i Gen9（¥17万台〜）</strong>：ゲーミングPC最高コスパ</li>
        </ul>

        <h2>PCの選び方 3ステップ</h2>
        <div className="bg-gray-50 rounded-xl p-5 my-4">
          <ol className="space-y-3">
            <li><strong>Step 1：用途を決める</strong>（ゲーム／動画編集／プログラミング／普段使い）<br /><span className="text-sm text-gray-600">→ 迷ったら<Link href="/shindan" className="text-blue-600 underline">PC診断</Link>を試す</span></li>
            <li><strong>Step 2：OSを決める</strong>（Mac or Windows）<br /><span className="text-sm text-gray-600">→ ゲームをするならWindows一択。それ以外はMacも有力</span></li>
            <li><strong>Step 3：予算を決める</strong><br /><span className="text-sm text-gray-600">→ 最低でもRAM16GB・SSD512GB以上を目安にする</span></li>
          </ol>
        </div>

        <h2>まとめ：2026年のPC選びはまずMacBook Air M4を検討する</h2>
        <p>多くの用途でMacBook Air M4（¥14万台〜）が最有力です。バッテリー18時間・ファンレス・軽量1.24kgという組み合わせは他に競合がありません。Windowsが必要な場合やゲームをする場合は、IdeaPad Slim 5（予算重視）またはROG Zephyrus G14（ゲーム＋クリエイター）を検討してください。</p>
        <p>→ あなたの用途・予算を入力すると最適な1台が出る<Link href="/shindan">PC診断はこちら</Link></p>
      </div>
    ),
  },

  /* ========== CLUSTER 1: 大学生 ========== */
  "daigakusei-pc-2026": {
    title: "大学生のPCおすすめ 2026年版｜文系・理系・学部別に比較",
    desc: "大学生向けPCおすすめ2026年版。文系・理系・工学部別に予算7〜15万台の選び方を解説。MacBookとWindowsを徹底比較。",
    date: "2026-06-21",
    content: (
      <div className="prose max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-blue-900 mb-2">📌 先に結論</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✅ <strong>ほとんどの大学生</strong>：MacBook Air M4（¥14万台〜）→ バッテリー・軽さ・性能の3拍子が揃う</li>
            <li>✅ <strong>予算を抑えたい</strong>：IdeaPad Slim 5 Gen9（¥7万台〜）→ 日常使いに十分な性能</li>
            <li>✅ <strong>工学部・理系でWindows必須ソフトあり</strong>：IdeaPad Slim 5 or ThinkPad T14</li>
            <li>✅ <strong>情報系・プログラミングメイン</strong>：MacBook Air M4（Unixベースで開発環境が快適）</li>
          </ul>
        </div>

        <h2>大学生向けPC 比較表（2026年版）</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">機種</th>
                <th className="text-left p-3 border border-gray-200">価格</th>
                <th className="text-left p-3 border border-gray-200">重さ</th>
                <th className="text-left p-3 border border-gray-200">バッテリー</th>
                <th className="text-left p-3 border border-gray-200">こんな人向け</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["MacBook Air M4 13インチ", "¥14万台〜", "1.24kg", "18時間", "理系・情報系・軽さ重視"],
                ["MacBook Air M4 15インチ", "¥17万台〜", "1.51kg", "18時間", "大画面で作業したい"],
                ["IdeaPad Slim 5 Gen9", "¥7万台〜", "1.46kg", "約10時間", "予算重視・Windows必須"],
                ["Surface Laptop 6", "¥17万台〜", "1.34kg", "約19時間", "タッチ操作・デザイン重視"],
                ["Acer Swift Go 14", "¥9万台〜", "1.35kg", "約15時間", "コスパ重視・軽量Windows"],
              ].map(([name, price, weight, battery, for_], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="p-3 border border-gray-200 font-medium text-blue-700">{name}</td>
                  <td className="p-3 border border-gray-200">{price}</td>
                  <td className="p-3 border border-gray-200">{weight}</td>
                  <td className="p-3 border border-gray-200">{battery}</td>
                  <td className="p-3 border border-gray-200 text-xs text-gray-600">{for_}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>学部・専攻別のおすすめPC</h2>

        <h3>文系（法学・経済・文学・社会学など）</h3>
        <p>レポート・論文・Excel・Zoomさえ動けばOK。持ち運びが多いので<strong>軽さとバッテリー</strong>を最優先に。</p>
        <div className="bg-blue-50 rounded-xl p-4 my-3">
          <p className="font-bold">1位：MacBook Air M4 13"（¥14万台〜）</p>
          <p className="text-sm">ファンレスで動作音ゼロ・バッテリー18時間・1.24kg。授業中に充電器が不要なのは大きなメリット。iPhoneユーザーなら連携も快適。</p>
          <a href={amz("MacBook Air M4 2025 13インチ")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 my-3">
          <p className="font-bold">予算重視2位：IdeaPad Slim 5 Gen9（¥7万台〜）</p>
          <p className="text-sm">Ryzen 5 / 16GB RAM / 512GB SSD。Office作業・Web閲覧・Zoom授業に十分。MacBook Air の半額以下で揃う。</p>
          <a href={amz("IdeaPad Slim 5 Gen9 Ryzen")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>
        </div>

        <h3>理系（数学・物理・化学・生物）</h3>
        <p>データ解析ソフト（MATLAB・R・Python）が動けばOK。Windowsの場合はRAM16GB以上を必ず選ぶこと。</p>
        <div className="bg-blue-50 rounded-xl p-4 my-3">
          <p className="font-bold">1位：MacBook Air M4（¥14万台〜）</p>
          <p className="text-sm">Python・R・Jupyter Notebookが快適に動く。Apple SiliconのUnix環境は理系の研究にも向く。研究室のサーバーへのSSH接続も楽。</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 my-3">
          <p className="font-bold">Windows派2位：ThinkPad T14 Gen5（¥12万台〜）</p>
          <p className="text-sm">研究室がWindowsのみ対応のソフトを使う場合の選択肢。Core Ultra搭載で処理性能も十分。</p>
          <a href={amz("ThinkPad T14 Gen5")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>
        </div>

        <h3>工学部・情報系・プログラミング専攻</h3>
        <p>コンパイル・仮想環境・複数ターミナルを同時に使うためRAM16GB以上が必須。詳しくは<Link href="/knowledge/programming-pc-2026">プログラミング向けPC記事</Link>で解説しています。</p>
        <div className="bg-blue-50 rounded-xl p-4 my-3">
          <p className="font-bold">1位：MacBook Air M4（¥14万台〜）</p>
          <p className="text-sm">Unix環境・homebrew・Dockerが快適に動く。バッテリーが長いので講義と実験を充電器なしで過ごせる。情報系の学生に最も多く選ばれている。</p>
        </div>

        <h3>デザイン・映像・クリエイター系</h3>
        <p>IllustratorやPremiere Proを動かすなら、MacBook Pro M4（¥24万台〜）が理想ですが予算が厳しい場合はROG Zephyrus G14も選択肢。詳しくは<Link href="/knowledge/video-henshu-pc-2026">動画編集PC記事</Link>参照。</p>

        <h2>大学生がPCを選ぶときに最低限チェックすること</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 my-4">
          <ul className="text-sm space-y-2">
            <li>✅ <strong>RAM 16GB以上</strong>（8GBは2026年では最低限すぎる）</li>
            <li>✅ <strong>SSD 512GB以上</strong>（256GBはすぐ満杯になる）</li>
            <li>✅ <strong>重さ1.5kg以下</strong>（毎日通学に持ち歩くなら必須）</li>
            <li>✅ <strong>バッテリー10時間以上</strong>（充電器なしで1日持つかが基準）</li>
            <li>⚠️ <strong>研究室・学科のソフトがWindowsのみ対応なら要確認</strong></li>
          </ul>
        </div>

        <h2>まとめ：大学生には MacBook Air M4 がベスト</h2>
        <p>2026年時点で大学生の最有力候補は<strong>MacBook Air M4</strong>です。バッテリー18時間・ファンレス・軽量1.24kgの組み合わせは、毎日学校に持ち歩く学生生活に最適です。予算が厳しい場合は<strong>IdeaPad Slim 5 Gen9</strong>が現実的な選択肢です。</p>
        <p>用途と予算を入力するとあなたに合った1台が出る→<Link href="/shindan">PC診断を試す</Link></p>
      </div>
    ),
  },

  /* ========== CLUSTER 2: 予算10万以下 ========== */
  "pc-10man-ika": {
    title: "10万円以下のPCおすすめ 2026｜コスパ重視の5台を比較",
    desc: "予算10万円以下のノートPCおすすめ2026年版。IdeaPad・VivoBook・Pavilionを比較。日常使い・在宅勤務向け5台を解説。",
    date: "2026-06-21",
    content: (
      <div className="prose max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-blue-900 mb-2">📌 先に結論：10万以下のベスト3</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>🥇 <strong>IdeaPad Slim 5 Gen9（¥7万台〜）</strong>：Ryzen 5 / 16GB RAM / 512GB → バランス最良</li>
            <li>🥈 <strong>Acer Swift Go 14（¥9万台〜）</strong>：軽量1.35kg / 15時間 → 持ち運び重視の人向け</li>
            <li>🥉 <strong>Acer Nitro V 16（¥8万台〜）</strong>：RTX 4050搭載 → 軽いゲームもしたい人向け</li>
          </ul>
        </div>

        <h2>10万円以下PC 比較表（2026年版）</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">機種</th>
                <th className="text-left p-3 border border-gray-200">価格</th>
                <th className="text-left p-3 border border-gray-200">CPU/RAM/SSD</th>
                <th className="text-left p-3 border border-gray-200">重さ</th>
                <th className="text-left p-3 border border-gray-200">特徴</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["IdeaPad Slim 5 Gen9", "¥79,800〜", "Ryzen 5 / 16GB / 512GB", "1.46kg", "バランス◎ コスパ最良"],
                ["VivoBook 15 2024", "¥69,800〜", "Core i5 / 8GB / 512GB", "1.70kg", "最安クラス 入門向け"],
                ["Inspiron 15 3535", "¥69,800〜", "Ryzen 5 / 8GB / 512GB", "1.74kg", "DELLの安心感 入門向け"],
                ["Acer Swift Go 14", "¥99,800〜", "Core Ultra 5 / 16GB / 512GB", "1.35kg", "軽量＋長時間＋AI機能"],
                ["Acer Nitro V 16", "¥89,800〜", "Core i5 / 16GB + RTX 4050", "2.40kg", "ゲームもしたい人向け"],
              ].map(([name, price, spec, weight, feat], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="p-3 border border-gray-200 font-medium text-blue-700">{name}</td>
                  <td className="p-3 border border-gray-200">{price}</td>
                  <td className="p-3 border border-gray-200 text-xs">{spec}</td>
                  <td className="p-3 border border-gray-200">{weight}</td>
                  <td className="p-3 border border-gray-200 text-xs text-gray-600">{feat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>各モデルの詳細レビュー</h2>

        <h3>🥇 1位：IdeaPad Slim 5 Gen9（¥7万台〜）</h3>
        <p>10万以下で最もバランスが良いモデルです。Ryzen 5・16GB RAM・512GB SSDという組み合わせで日常のほぼすべての作業をこなせます。</p>
        <ul>
          <li>✅ 16GB RAM搭載（8GBの安売りモデルより格段に快適）</li>
          <li>✅ OLED/IPS選べるディスプレイ</li>
          <li>✅ USB-C充電対応</li>
          <li>⚠️ バッテリーは約10時間（MacBook Airには劣る）</li>
        </ul>
        <a href={amz("IdeaPad Slim 5 Gen9 2024")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>

        <h3>🥈 2位：Acer Swift Go 14（¥9万台〜）</h3>
        <p>Core Ultra 5搭載・1.35kg・バッテリー約15時間。この価格でここまで軽量・長持ちなWindowsノートは珍しい。AI処理（NPU）にも対応。</p>
        <ul>
          <li>✅ 1.35kgの軽量ボディ</li>
          <li>✅ バッテリー約15時間</li>
          <li>✅ Core Ultra（Copilot+ PC）対応</li>
          <li>⚠️ 画面は60Hz止まり</li>
        </ul>
        <a href={amz("Acer Swift Go 14 2024 Core Ultra")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>

        <h3>🥉 3位：Acer Nitro V 16（¥8万台〜）</h3>
        <p>RTX 4050搭載で10万以下の唯一の外部GPU搭載機。重い（2.4kg）ので持ち運びより自宅メインで軽いゲームもしたい人向け。</p>
        <a href={amz("Acer Nitro V 16 RTX4050")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>

        <h3>4位：VivoBook 15 2024 / Inspiron 15 3535（¥6万台〜）</h3>
        <p>最安クラス。ただし<strong>RAM 8GBのモデルが多い</strong>ため、16GBモデルを選ぶこと。8GBは2026年では明らかに少ない。</p>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-3">
          <p className="font-bold text-red-800">⚠️ 注意：8GBモデルは避けること</p>
          <p className="text-sm text-red-700">6万円台のモデルには8GBのものが多い。8GBだとChrome（タブ10個）＋Zoom＋Wordを同時に使うだけで重くなる。必ず16GBを選ぶこと。</p>
        </div>

        <h2>10万以下PCで「できること・できないこと」</h2>
        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-bold text-green-800 mb-2">✅ できること</p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>Web閲覧・YouTube・Netflix</li>
              <li>Word・Excel・PowerPoint</li>
              <li>Zoom・Teams・オンライン授業</li>
              <li>軽いプログラミング（HTML/CSS/Python）</li>
              <li>写真編集（Lightroom 軽め）</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-bold text-red-800 mb-2">⚠️ 厳しいこと</p>
            <ul className="text-sm text-red-700 space-y-1">
              <li>4K動画の本格編集</li>
              <li>最新ゲームの高画質プレイ</li>
              <li>機械学習・深層学習（GPU必要）</li>
              <li>大規模な仮想環境の同時起動</li>
            </ul>
          </div>
        </div>

        <h2>まとめ</h2>
        <p>予算10万以下なら<strong>IdeaPad Slim 5 Gen9（¥7万台〜）</strong>がベストバリューです。必ずRAM16GB以上のモデルを選んでください。軽さ・バッテリーを重視するなら<strong>Acer Swift Go 14（¥9万台〜）</strong>がおすすめです。</p>
        <p>もう少し予算を上げられるなら→<Link href="/knowledge/daigakusei-pc-2026">大学生向けPC（MacBook Air M4含む）</Link>も参考にどうぞ。</p>
        <p>→ <Link href="/shindan">PC診断で用途・予算を入力してみる</Link></p>
      </div>
    ),
  },

  /* ========== CLUSTER 3: 動画編集 ========== */
  "video-henshu-pc-2026": {
    title: "動画編集PCおすすめ 2026｜MacとWindowsを予算別に比較",
    desc: "動画編集・YouTube向けPCのおすすめ2026年版。MacBook Pro M4・ROG Zephyrus G14・Legion Pro 5iを予算別に比較。4K編集に必要なスペックを解説。",
    date: "2026-06-21",
    content: (
      <div className="prose max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-blue-900 mb-2">📌 先に結論</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✅ <strong>Macユーザー・Final Cut Pro使用</strong>：MacBook Pro M4 14"（¥24万台〜）→ 動画編集性能は現時点でノートPC最高</li>
            <li>✅ <strong>Premiere Pro・DaVinci Resolve（Windows）</strong>：ROG Zephyrus G14（¥18万台〜）→ RTX GPU＋高解像度ディスプレイ</li>
            <li>✅ <strong>予算17万台でゲームもしたい</strong>：Legion Pro 5i Gen9（¥17万台〜）→ 性能・価格バランス◎</li>
            <li>⚠️ <strong>FHD軽い編集のみ</strong>：MacBook Air M4（¥14万台〜）でも十分（4K本格編集は厳しい）</li>
          </ul>
        </div>

        <h2>動画編集PC 比較表（2026年版）</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">機種</th>
                <th className="text-left p-3 border border-gray-200">価格</th>
                <th className="text-left p-3 border border-gray-200">CPU・GPU</th>
                <th className="text-left p-3 border border-gray-200">4K編集</th>
                <th className="text-left p-3 border border-gray-200">おすすめ用途</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["MacBook Pro M4 14インチ", "¥24万台〜", "M4 Pro + 20コアGPU", "◎ 快適", "Final Cut / Logic Pro / プロ向け"],
                ["ROG Zephyrus G14 2024", "¥18万台〜", "Ryzen 9 + RTX 4070", "◎ 快適", "Premiere / DaVinci / ゲームも"],
                ["Legion Pro 5i Gen9", "¥17万台〜", "Core i7 + RTX 4070", "○ 十分", "コスパ重視ゲーミング兼用"],
                ["Alienware m16 R2", "¥24万台〜", "Core i9 + RTX 4070Ti", "◎ 最速", "最高スペックWindowsノート"],
                ["MacBook Air M4 13インチ", "¥14万台〜", "M4 + 10コアGPU", "△ 軽いなら可", "FHD軽編集・外出が多い人"],
              ].map(([name, price, spec, edit4k, use], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="p-3 border border-gray-200 font-medium text-blue-700">{name}</td>
                  <td className="p-3 border border-gray-200">{price}</td>
                  <td className="p-3 border border-gray-200 text-xs">{spec}</td>
                  <td className="p-3 border border-gray-200 font-medium">{edit4k}</td>
                  <td className="p-3 border border-gray-200 text-xs text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>動画編集に必要なスペックの基準</h2>
        <div className="bg-gray-50 rounded-xl p-5 my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border-b border-gray-200">用途</th>
                <th className="text-left p-2 border-b border-gray-200">最低スペック</th>
                <th className="text-left p-2 border-b border-gray-200">推奨スペック</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["FHD YouTube（〜1080p）", "Core i5 / 16GB / 512GB", "Core i7 / 16GB / SSD 1TB"],
                ["4K動画編集", "Core i7 / 32GB / RTX 4060", "Core i9 / 32GB / RTX 4070+"],
                ["Final Cut Pro（Mac）", "M3 / 16GB以上", "M4 Pro / 24GB以上"],
              ].map(([use, min, rec], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-white" : ""}>
                  <td className="p-2 border-b border-gray-200 font-medium">{use}</td>
                  <td className="p-2 border-b border-gray-200 text-xs text-orange-700">{min}</td>
                  <td className="p-2 border-b border-gray-200 text-xs text-green-700">{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Mac vs Windows｜動画編集はどちらが良いか</h2>

        <h3>MacBook Pro M4（Final Cut Proユーザー向け）</h3>
        <p>Apple SiliconはProResコーデックのハードウェアエンコードに最適化されています。Final Cut Pro（¥36,800の買い切り）との組み合わせでWindowsでは実現できない速さで書き出しが完了します。バッテリーも22時間で外でも作業できます。</p>
        <ul>
          <li>✅ Final Cut ProのProRes書き出しが高速</li>
          <li>✅ バッテリー22時間</li>
          <li>✅ XDRディスプレイ（1000nit）で色確認が正確</li>
          <li>⚠️ ゲームはほぼ不可</li>
          <li>⚠️ Adobe Premiere ProはWindowsより最適化が弱い</li>
        </ul>
        <a href={amz("MacBook Pro M4 Pro 14インチ")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>

        <h3>ROG Zephyrus G14 2024（Premiere Pro・DaVinciユーザー向け）</h3>
        <p>Ryzen 9 + RTX 4070の組み合わせでAdobe Premiere Pro・DaVinci Resolveを高速実行。144Hz/OLED搭載で色の確認もできます。ゲーミングPCですが動画編集機としても優秀。</p>
        <ul>
          <li>✅ RTX 4070でCUDAアクセラレーション（Adobe系で重要）</li>
          <li>✅ OLED 144Hz ディスプレイ</li>
          <li>✅ ゲームも動画編集も両立</li>
          <li>⚠️ 重い（約1.65kg）</li>
          <li>⚠️ バッテリーは8〜10時間（高負荷時はさらに短い）</li>
        </ul>
        <a href={amz("ROG Zephyrus G14 2024 RTX4070")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>

        <h2>よくある質問</h2>
        <div className="space-y-3 my-4">
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-bold cursor-pointer">MacBook Air M4で動画編集はできますか？</summary>
            <p className="text-sm text-gray-700 mt-2">FHD（1080p）の軽い編集は十分できます。ただし4K映像の長時間編集・複数トラックの合成・カラーグレーディングはM4 Proチップ搭載のMacBook Proを推奨します。</p>
          </details>
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-bold cursor-pointer">YouTubeの動画編集なら何万円のPCが必要ですか？</summary>
            <p className="text-sm text-gray-700 mt-2">FHD撮影・月数本程度なら15〜18万円台のROG Zephyrus G14かMacBook Air M4で十分です。4K撮影・週複数本・チャンネル登録者1万人以上を目指すなら20万円以上を推奨します。</p>
          </details>
        </div>

        <h2>まとめ</h2>
        <p>動画編集PCの最有力は<strong>MacBook Pro M4（¥24万台〜）</strong>と<strong>ROG Zephyrus G14 2024（¥18万台〜）</strong>の2択です。Final Cut Proを使うならMac、Premiere Pro・DaVinciならWindowsを選んでください。</p>
        <p>→ <Link href="/shindan">PC診断で用途を入力してみる</Link> | <Link href="/category/creator">クリエイター向けPC一覧</Link></p>
      </div>
    ),
  },

  /* ========== CLUSTER 4: プログラミング ========== */
  "programming-pc-2026": {
    title: "プログラミングPCおすすめ 2026｜エンジニア・学生向けに比較",
    desc: "プログラミング・Web開発向けPCのおすすめ2026年版。MacBook Air M4・ThinkPad X1 Carbon・Surface Laptop 6を比較。言語別の選び方も解説。",
    date: "2026-06-21",
    content: (
      <div className="prose max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-blue-900 mb-2">📌 先に結論</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✅ <strong>Web開発・Python・学生エンジニア</strong>：MacBook Air M4（¥14万台〜）→ Unix環境・Homebrew・軽さの三拍子</li>
            <li>✅ <strong>TypeScript/Next.js/React開発（Windows派）</strong>：Surface Laptop 6（¥17万台〜）またはThinkPad T14</li>
            <li>✅ <strong>長時間タイピングが多いビジネスエンジニア</strong>：ThinkPad X1 Carbon（¥23万台〜）→ キーボードが業界最高</li>
            <li>✅ <strong>予算重視でプログラミング学習</strong>：IdeaPad Slim 5 Gen9（¥7万台〜）→ VSCode・Dockerも動く</li>
          </ul>
        </div>

        <h2>プログラミング向けPC 比較表（2026年版）</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">機種</th>
                <th className="text-left p-3 border border-gray-200">価格</th>
                <th className="text-left p-3 border border-gray-200">RAM</th>
                <th className="text-left p-3 border border-gray-200">重さ</th>
                <th className="text-left p-3 border border-gray-200">おすすめ層</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["MacBook Air M4 13インチ", "¥14万台〜", "16GB〜", "1.24kg", "Web開発・Python・学生"],
                ["MacBook Pro M4 14インチ", "¥24万台〜", "24GB〜", "1.61kg", "本格開発・重い処理"],
                ["ThinkPad X1 Carbon Gen13", "¥23万台〜", "16GB〜", "1.12kg", "タイピング重視・法人エンジニア"],
                ["Surface Laptop 6", "¥17万台〜", "16GB〜", "1.34kg", "Windows環境・Copilot+ PC"],
                ["IdeaPad Slim 5 Gen9", "¥7万台〜", "16GB〜", "1.46kg", "プログラミング学習・予算重視"],
              ].map(([name, price, ram, weight, for_], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="p-3 border border-gray-200 font-medium text-blue-700">{name}</td>
                  <td className="p-3 border border-gray-200">{price}</td>
                  <td className="p-3 border border-gray-200">{ram}</td>
                  <td className="p-3 border border-gray-200">{weight}</td>
                  <td className="p-3 border border-gray-200 text-xs text-gray-600">{for_}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>プログラミング向けPCの最低スペック</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 my-4">
          <ul className="text-sm space-y-2">
            <li>✅ <strong>RAM 16GB以上</strong>（Docker + Chrome + VSCode + ターミナルを同時に使うと8GBは即不足）</li>
            <li>✅ <strong>SSD 512GB以上</strong>（Nodeモジュール・仮想環境でひたすら消費される）</li>
            <li>✅ <strong>キーボードが打ちやすいこと</strong>（毎日8時間以上打つなら最重要項目）</li>
            <li>✅ <strong>Retinaクラスの解像度</strong>（長時間コード画面を見るので目に優しい解像度が重要）</li>
            <li>⚠️ <strong>GPUは不要（機械学習以外）</strong>：Webフロントエンド・バックエンドにGPUは影響なし</li>
          </ul>
        </div>

        <h2>言語・フレームワーク別のおすすめPC</h2>

        <h3>Python・機械学習・データサイエンス</h3>
        <p>Jupyter Notebook・scikit-learn・PyTorchを使うならRAM 16GB以上必須。本格的な機械学習（学習処理）にはGPUが必要ですが、推論・データ分析レベルならMacBook Air M4で十分。</p>
        <div className="bg-blue-50 rounded-xl p-4 my-3">
          <p className="font-bold">おすすめ：MacBook Air M4（¥14万台〜）</p>
          <p className="text-sm">Apple SiliconはMLコアを搭載しており、TensorFlow/PyTorchのMetal対応が進んでいる。Homebrewでpyenvが即セットアップできる。</p>
        </div>

        <h3>Web開発（JavaScript / TypeScript / Next.js）</h3>
        <p>Node.jsのビルド処理はCPUを使う。Vite/Webpackのウォッチモード中にブラウザ複数タブを開くのでRAM 16GB以上が快適。</p>
        <div className="bg-blue-50 rounded-xl p-4 my-3">
          <p className="font-bold">おすすめ：MacBook Air M4 or IdeaPad Slim 5 Gen9</p>
          <p className="text-sm">macOSならHomebrew・zsh・iTerm2が快適に使える。WindowsならWSL2（Windows Subsystem for Linux）をセットアップすることで同等環境を作れる。</p>
        </div>

        <h3>Android / iOS / モバイル開発</h3>
        <ul>
          <li><strong>iOS開発（Swift / React Native）</strong>：Macが必須。Xcodeの実行にはMacが必要。MacBook Air M4以上を選ぶこと。</li>
          <li><strong>Android開発（Kotlin / Java）</strong>：MacでもWindowsでも可。Android Studioは重い（RAM 16GB推奨）。</li>
        </ul>

        <h3>インフラ・DevOps・Docker</h3>
        <p>DockerはRAM 16GB以上が快適。複数コンテナを同時に立ち上げるケースも多いのでRAM 32GBあると余裕。MacBook Proが理想。</p>

        <h2>Mac vs Windows｜プログラミングはどちらが良いか</h2>
        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-bold text-lg mb-2">🍎 Macを選ぶとき</p>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>✅ iOS / macOSアプリ開発</li>
              <li>✅ Unix/Linux環境が必要な開発</li>
              <li>✅ バッテリーを最重視</li>
              <li>✅ Docker・Homebrew環境が快適</li>
              <li>✅ 現場のエンジニアがMacを使っている</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-bold text-lg mb-2">🪟 Windowsを選ぶとき</p>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>✅ .NET / C# / Windows向けアプリ開発</li>
              <li>✅ ゲーム開発（Unity / Unreal Engine）</li>
              <li>✅ 企業がWindows統一環境</li>
              <li>✅ 予算を抑えたい</li>
              <li>✅ GPU（機械学習・CUDA）が必要</li>
            </ul>
          </div>
        </div>

        <h2>まとめ</h2>
        <p>2026年のプログラミング向けPC最有力は<strong>MacBook Air M4（¥14万台〜）</strong>です。Web開発・Python・データサイエンス・モバイル開発のどれをやるにもバランスが良く、バッテリー18時間で自宅〜カフェ〜大学の移動でも充電器が不要です。予算が厳しい場合は<strong>IdeaPad Slim 5 Gen9（¥7万台〜）</strong>のRAM 16GBモデルが最低ラインです。</p>
        <p>→ <Link href="/shindan">PC診断でプログラミングを選んで試してみる</Link> | <Link href="/category/programming">プログラミング向けPC一覧</Link></p>
      </div>
    ),
  },

  /* ── 既存 3本 ─────────────────────────────────────── */
  "spec-guide": {
    title: "PCスペックの読み方（超初心者向け）",
    desc: "CPU・RAM・SSD・GPU・ディスプレイのスペックをゼロから解説。これを読めばPC選びで迷わない。",
    date: "2026-06-10",
    content: (
      <div className="prose max-w-none">
        <h2>PCスペックで見るべき5項目</h2>
        <p>PCを買うとき、スペック表には難しい言葉が並んでいます。でも実際に見るべき項目は5つだけです。</p>
        <h3>1. CPU（プロセッサ）</h3>
        <p>CPUはPCの「頭脳」です。計算処理をこなす中心パーツ。数字が大きいほど高性能。</p>
        <div className="bg-gray-50 rounded-xl p-4 my-4">
          <p className="font-bold mb-2">目安</p>
          <ul>
            <li>Core i3 / Ryzen 3 → 軽い作業（Web・Office）</li>
            <li>Core i5 / Ryzen 5 → 普段使い・プログラミング学習（おすすめ）</li>
            <li>Core i7 / Ryzen 7 → 動画編集・ゲーム</li>
            <li>Core i9 / Ryzen 9 → プロ向け・高負荷作業</li>
            <li>Apple M4 → MacBook Airの最新チップ（2025年〜）。性能・電力効率が優秀</li>
          </ul>
        </div>
        <h3>2. RAM（メモリ）</h3>
        <p>RAMはPCの「作業スペース」。多いほど一度に複数の作業がこなせる。</p>
        <div className="bg-gray-50 rounded-xl p-4 my-4">
          <p className="font-bold mb-2">目安</p>
          <ul>
            <li>8GB → 最低限。動画を見ながら別の作業が難しい</li>
            <li>16GB → 普段使いに最適。大半の用途で十分（推奨）</li>
            <li>32GB → 動画編集・配信・重いゲームにも余裕</li>
            <li>64GB → 4K動画編集・機械学習向け</li>
          </ul>
        </div>
        <h3>3. SSD（ストレージ）</h3>
        <p>SSDはデータを保存する「倉庫」。多いほど多くのファイルが入る。また速さも重要。</p>
        <div className="bg-gray-50 rounded-xl p-4 my-4">
          <ul>
            <li>256GB → 最低限。すぐ満杯になる可能性あり</li>
            <li>512GB → 一般的な使い方なら十分</li>
            <li>1TB → ゲームや写真・動画が多い人向け（推奨）</li>
            <li>NVMe（M.2）SSD → SATAより数倍高速。できればNVMeを選ぶこと</li>
          </ul>
        </div>
        <h3>4. GPU（グラフィックボード）</h3>
        <p>GPUは映像処理専門のパーツ。ゲームや動画編集では重要。</p>
        <div className="bg-gray-50 rounded-xl p-4 my-4">
          <ul>
            <li>内蔵GPU → ゲームには不向き。普段使いなら十分</li>
            <li>RTX 4060 → FHDゲームで快適</li>
            <li>RTX 4070 → QHD・4Kゲームも可能</li>
          </ul>
        </div>
        <h3>5. ディスプレイ</h3>
        <div className="bg-gray-50 rounded-xl p-4 my-4">
          <ul>
            <li>解像度: FHD（1920×1080）→ 標準。QHD・4Kはより鮮明</li>
            <li>リフレッシュレート: 60Hz→普通、144Hz→ゲームで有利</li>
            <li>パネル: IPS→視野角広い、OLED→発色最高</li>
            <li>サイズ: 13-14インチ→携帯向き、15-16インチ→自宅メイン</li>
          </ul>
        </div>
        <p>→ スペックが理解できたら<Link href="/shindan">PC診断</Link>でおすすめを絞り込んでみましょう。</p>
      </div>
    ),
  },

  "windows-vs-mac": {
    title: "WindowsとMacの違い｜どちらを選ぶべきか",
    desc: "WindowsとMacそれぞれの特徴・メリット・デメリットを比較。あなたに合ったOSはどちらか。",
    date: "2026-06-10",
    content: (
      <div className="prose max-w-none">
        <h2>結論：目的で決まる</h2>
        <p>どちらが「良い」かは目的次第です。ゲームをするなら Windows 一択。プログラミング・デザイン・動画編集をメインにするなら Mac が選択肢に入ります。</p>
        <h3>Windowsを選ぶべき人</h3>
        <ul>
          <li>ゲームをしたい（ほとんどのゲームはWindowsのみ対応）</li>
          <li>会社・学校がWindowsで統一されている</li>
          <li>AutoCAD・特定のWindows専用ソフトを使う</li>
          <li>コストを抑えたい（Macは基本的に高価）</li>
        </ul>
        <h3>Macを選ぶべき人</h3>
        <ul>
          <li>iPhone・iPad・Apple Watchをすでに使っている</li>
          <li>プログラミング・Web開発をしたい</li>
          <li>動画編集・写真現像・デザインが多い</li>
          <li>バッテリー持ちを最優先する（M4搭載Macは18時間超）</li>
        </ul>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 my-4">
          <p className="font-bold">⚠️ 注意点</p>
          <p>MacはWindowsソフトが基本的に動きません。企業で使うWindowsソフトがある場合は必ず事前確認を。</p>
        </div>
        <p>→ OS選びが決まったら<Link href="/shindan">PC診断</Link>で候補を絞りましょう。詳しくは<Link href="/knowledge/programming-pc-2026">プログラミング向けPC記事</Link>も参照。</p>
      </div>
    ),
  },

  "pc-5man-ika": {
    title: "5万円以下のPCおすすめ 2026｜予算重視の3台を徹底比較",
    desc: "予算5万円以下のノートPCおすすめ2026年版。IdeaPad・VivoBook・Chromebookを比較。軽作業・大学のレポート・Zoom対応の選び方を解説。",
    date: "2026-06-23",
    content: (
      <div className="prose max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-blue-900 mb-2">📌 先に結論：5万以下のベスト3</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>🥇 <strong>Lenovo IdeaPad Slim 1 Gen 9（¥4万台〜）</strong>：Ryzen 3 / 8GB RAM / 256GB → 入門ベストバリュー</li>
            <li>🥈 <strong>ASUS VivoBook Go 15（¥4万台〜）</strong>：コンパクト・バッテリー良好 → 持ち運び重視</li>
            <li>🥉 <strong>Lenovo Chromebook Duet 3（¥3万台〜）</strong>：Web・YouTube・Docs専用に割り切るなら最速</li>
          </ul>
          <p className="text-xs text-blue-700 mt-3">⚠️ 5万以下はRAM 8GBが標準。重い作業には向かないため「何に使うか」を先に決めてから選ぶことが大切です。</p>
        </div>

        <h2>5万円以下PC 比較表（2026年版）</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">機種</th>
                <th className="text-left p-3 border border-gray-200">価格目安</th>
                <th className="text-left p-3 border border-gray-200">CPU/RAM/SSD</th>
                <th className="text-left p-3 border border-gray-200">重さ</th>
                <th className="text-left p-3 border border-gray-200">向いている使い方</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Lenovo IdeaPad Slim 1 Gen 9", "¥4万台〜", "Ryzen 3 7320U / 8GB / 256GB", "1.46kg", "レポート・Zoom・動画視聴"],
                ["ASUS VivoBook Go 15", "¥4万台〜", "Ryzen 3 7320U / 8GB / 256GB", "1.70kg", "コスパ重視の普段使い"],
                ["Acer Aspire Go 15", "¥3万台〜", "Core i3 / 8GB / 128GB", "1.72kg", "最安クラス。割り切り用"],
                ["Lenovo Chromebook Duet 3", "¥3万台〜", "Snapdragon 7c Gen2 / 8GB", "0.92kg", "Web・Google Docs専用"],
                ["HP 14s（Ryzen版）", "¥4万台〜", "Ryzen 3 / 8GB / 256GB", "1.43kg", "薄型・スタイリッシュ重視"],
              ].map(([name, price, spec, weight, feat], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="p-3 border border-gray-200 font-medium text-blue-700">{name}</td>
                  <td className="p-3 border border-gray-200">{price}</td>
                  <td className="p-3 border border-gray-200 text-xs">{spec}</td>
                  <td className="p-3 border border-gray-200">{weight}</td>
                  <td className="p-3 border border-gray-200 text-xs text-gray-600">{feat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>5万以下で「できること・できないこと」</h2>
        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-bold text-green-800 mb-2">✅ できること</p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>Web閲覧・YouTube・Netflixの視聴</li>
              <li>Word・Excel・PowerPoint（軽め）</li>
              <li>Zoom・Teams・オンライン授業</li>
              <li>レポート・論文作成</li>
              <li>Python・HTML/CSS の入門学習</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-bold text-red-800 mb-2">⚠️ 厳しいこと</p>
            <ul className="text-sm text-red-700 space-y-1">
              <li>Chromeタブを20個以上同時に開く</li>
              <li>動画編集（Premiere・DaVinci等）</li>
              <li>ゲーム（軽いゲームも厳しい場合あり）</li>
              <li>複数アプリの同時起動（重くなる）</li>
              <li>Adobe Lightroom・Photoshopの快適使用</li>
            </ul>
          </div>
        </div>

        <h2>各モデルの詳細</h2>

        <h3>🥇 1位：Lenovo IdeaPad Slim 1 Gen 9（¥4万台〜）</h3>
        <p>5万以下では最もバランスが良いモデルです。Ryzen 3 7320U・8GB RAM・256GB SSDを搭載。大学のレポート作成・Zoom授業・YouTubeといった用途なら問題なく動きます。</p>
        <ul>
          <li>✅ Ryzen 3搭載で同価格帯のCore i3より高性能</li>
          <li>✅ バッテリーは約9〜10時間</li>
          <li>✅ USB-C搭載（充電・データ転送）</li>
          <li>⚠️ SSD 256GBは少なめ。外付けSSDかクラウドストレージの併用を推奨</li>
          <li>⚠️ 動画編集・ゲームには向かない</li>
        </ul>
        <a href={amz("Lenovo IdeaPad Slim 1 Gen 9 2024")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>

        <h3>🥈 2位：ASUS VivoBook Go 15（¥4万台〜）</h3>
        <p>ASUSの入門ラインで、IdeaPad Slim 1とほぼ同スペック。デザインがシンプルでスタイリッシュな点が特徴。学校・カフェへの持ち運びにも使いやすいサイズ感です。</p>
        <ul>
          <li>✅ ASUS製品の品質・サポートの安心感</li>
          <li>✅ バッテリー約8〜10時間</li>
          <li>⚠️ SSD 256GBは少なめ（IdeaPadと同様）</li>
        </ul>
        <a href={amz("ASUS VivoBook Go 15 2024 Ryzen")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">Amazonで価格を確認</a>

        <h3>🥉 3位：Chromebook（¥3万台〜）</h3>
        <p>Windowsアプリが不要で「GoogleドキュメントとYouTubeだけ使えれば十分」という人向け。軽量・バッテリー持ちが優秀で、起動も速い。ただしWindowsソフトは動きません。</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 my-3">
          <p className="font-bold text-yellow-800">⚠️ Chromebookを選ぶ前に確認</p>
          <ul className="text-sm text-yellow-700 mt-2 space-y-1">
            <li>大学の授業でWindowsソフト指定がないか確認する</li>
            <li>Microsoft Office（有料）は使えないが、Google Docsで代替可能</li>
            <li>Adobe系・プログラミングIDE・ゲームは基本非対応</li>
          </ul>
        </div>
        <a href={amz("Chromebook ノートパソコン 2024")} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded-lg">AmazonでChromebookを見る</a>

        <h2>5万以下PCを選ぶときの3つの注意点</h2>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-4">
          <p className="font-bold text-red-900 mb-3">❌ やってはいけない選び方</p>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-sm text-red-800">1. 「最安値」だけで選ぶ</p>
              <p className="text-sm text-red-700">Celeron・Pentium搭載の2〜3万円台は快適性が大幅に落ちる。最低でもRyzen 3またはCore i3を選ぶこと。</p>
            </div>
            <div>
              <p className="font-bold text-sm text-red-800">2. RAM 4GBモデルを買う</p>
              <p className="text-sm text-red-700">2026年にRAM 4GBは即戦力にならない。かならず8GB以上を選ぶ。</p>
            </div>
            <div>
              <p className="font-bold text-sm text-red-800">3. SSD 128GBで妥協する</p>
              <p className="text-sm text-red-700">Windowsのアップデートだけで数十GBが消える。256GB以上を目安に。128GBなら外付けSSD（¥3,000〜）が必須。</p>
            </div>
          </div>
        </div>

        <h2>まとめ：5万以下で迷ったらこう選ぶ</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">こんな人</th>
                <th className="text-left p-3 border border-gray-200">おすすめ</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["とにかく安く・普通に使いたい", "IdeaPad Slim 1 Gen9（¥4万台）"],
                ["デザイン重視・ASUS派", "VivoBook Go 15（¥4万台）"],
                ["Webとドキュメントだけでいい", "Chromebook（¥3万台）"],
                ["あと1〜2万足せる", "→ IdeaPad Slim 5 Gen9（¥7万台）に上げる方が満足度◎"],
              ].map(([who, rec], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="p-3 border border-gray-200">{who}</td>
                  <td className="p-3 border border-gray-200 font-medium text-blue-700">{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>予算を少し上げられる場合は<Link href="/knowledge/pc-10man-ika">10万以下PC（IdeaPad Slim 5 Gen9）</Link>の方が満足度が大きく上がります。</p>
        <p>→ <Link href="/shindan">PC診断で自分に合う1台を探す</Link></p>
      </div>
    ),
  },

  "used-pc": {
    title: "中古PCは買っていいのか？価格相場と注意点まとめ",
    desc: "MacBook・ThinkPadの中古相場、メルカリ購入の注意点、おすすめ購入先を徹底解説。2026年6月最新情報。",
    date: "2026-06-10",
    content: (
      <div className="prose max-w-none">
        <h2>結論：コスパを求めるなら「有り」。ただし確認事項を守ること</h2>
        <p>新品より30〜50%安く買える中古PCは魅力的です。ただし、確認を怠るとバッテリー劣化や初期化不完全など思わぬトラブルにあうことも。</p>
        <h3>MacBook 中古相場まとめ（2026年6月）</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="bg-gray-100">
              <th className="text-left p-3 border border-gray-200">モデル</th>
              <th className="text-left p-3 border border-gray-200">メルカリ相場</th>
              <th className="text-left p-3 border border-gray-200">整備済み品</th>
              <th className="text-left p-3 border border-gray-200">ひとこと</th>
            </tr></thead>
            <tbody>
              {[
                ["MacBook Air M1", "¥50,000〜70,000", "¥67,000〜80,000", "入門に最適"],
                ["MacBook Air M2", "¥80,000〜110,000", "¥100,000〜115,000", "バランス型。長く使える"],
                ["MacBook Air M3", "¥100,000〜130,000", "¥115,000〜140,000", "型落ちだが最新に近い性能 ◎"],
                ["MacBook Air M4", "—", "¥161,000〜", "最新。新品¥164,800〜"],
              ].map(([m, merc, ref, note], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="p-3 border border-gray-200 font-medium">{m}</td>
                  <td className="p-3 border border-gray-200">{merc}</td>
                  <td className="p-3 border border-gray-200">{ref}</td>
                  <td className="p-3 border border-gray-200 text-blue-700">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>中古・メルカリ購入の注意点</h3>
        <div className="bg-blue-50 rounded-xl p-4 my-4">
          <p className="font-bold mb-2">✅ 安全に買うためのチェックリスト</p>
          <ul>
            <li>出品者の評価が★4.5以上、取引件数50件以上を目安にする</li>
            <li>「初期化済み」「アクティベーションロック解除済み」の記載を確認</li>
            <li>バッテリーの充放電回数を事前に質問する</li>
            <li>CPU世代（Core i5 第10世代以降推奨）とWindows 11対応を確認</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4">
          <p className="font-bold mb-2">⚠️ 絶対にやってはいけないこと</p>
          <ul>
            <li><strong>MacのActivation Lockが解除されていない個体は絶対に買わない</strong>（文鎮になる）</li>
            <li>「ジャンク品」「動作未確認」は初心者は避ける</li>
          </ul>
        </div>
        <p>→ 新品を検討する場合は<Link href="/knowledge/pc-osusume-2026">PCおすすめ 2026年版</Link>も参照してください。</p>
      </div>
    ),
  },
};

/* ────────── Static params ────────── */
const slugList = Object.keys(articles);

export function generateStaticParams() {
  return slugList.map((slug) => ({ slug }));
}

/* ────────── Metadata ────────── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.desc,
    alternates: { canonical: `${BASE}/knowledge/${slug}` },
    openGraph: {
      title: article.title,
      description: article.desc,
      type: "article",
      url: `${BASE}/knowledge/${slug}`,
      publishedTime: article.date,
    },
  };
}

/* ────────── Page ────────── */
export default async function KnowledgePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.desc,
    datePublished: article.date,
    dateModified: "2026-06-21",
    author: { "@type": "Person", name: "YO-KO", url: "https://yokoportofolio.vercel.app" },
    publisher: { "@type": "Organization", name: "PickPC", url: BASE },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/knowledge/${slug}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "PickPC", item: BASE },
      { "@type": "ListItem", position: 2, name: "知識ベース", item: `${BASE}/knowledge` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${BASE}/knowledge/${slug}` },
    ],
  };

  const otherSlugs = slugList.filter((s) => s !== slug);

  return (
    <>
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="breadcrumb-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1 flex-wrap">
          <Link href="/" className="hover:text-blue-600">PickPC</Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{article.title}</span>
        </nav>

        {/* Article header */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">{article.title}</h1>
          <p className="text-gray-500 text-sm mb-3">{article.desc}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>更新: {article.date}</span>
            <Link href="/shindan" className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold hover:bg-blue-700">
              PC診断を試す →
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-gray max-w-none [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:my-3 [&_a]:text-blue-600 [&_a]:underline">
          {article.content}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="font-bold text-gray-900 mb-2">用途・予算を入力してPC診断</p>
          <p className="text-sm text-gray-600 mb-4">3分でわかる。あなたに最適な1台をズバリ提案します。</p>
          <Link href="/shindan" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700">
            無料でPC診断する →
          </Link>
        </div>

        {/* Related articles */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="font-bold text-lg mb-4">関連記事</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {otherSlugs.map((s) => (
              <Link
                key={s}
                href={`/knowledge/${s}`}
                className="p-4 border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <p className="font-semibold text-gray-900 text-sm">{articles[s].title}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{articles[s].desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
