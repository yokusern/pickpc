#!/usr/bin/env python3
"""
og:image を各メーカー製品ページから自動取得して
public/images/products/{id}.jpg に保存する。
"""

import json, os, re, time, urllib.request, urllib.error
from html.parser import HTMLParser
from pathlib import Path

# ── 製品ページURL一覧 ───────────────────────────────────────────────────
PRODUCT_PAGES = {
    "nec-lavie-nextreme":    "https://www.nec-lavie.jp/products/nextreme/",
    "macbook-pro-m5-16":     "https://www.apple.com/jp/macbook-pro/",
    "macbook-air-m4-13":     "https://www.apple.com/jp/macbook-air/",
    "macbook-air-m3-15":     "https://www.apple.com/jp/macbook-air/",
    "macbook-air-m3-13":     "https://www.apple.com/jp/macbook-air/",
    "macbook-air-m1-13":     "https://www.apple.com/jp/macbook-air/",
    "macbook-pro-m3-14":     "https://www.apple.com/jp/macbook-pro/",
    "thinkpad-x1-carbon":    "https://www.lenovo.com/jp/ja/p/laptops/thinkpad/thinkpadx1/thinkpad-x1-carbon-gen-13-(14-inch-intel)/len101t0091",
    "ideapad-slim5-gen9":    "https://www.lenovo.com/jp/ja/p/laptops/ideapad/ideapad-slim-series/ideapad-slim-5-gen-9-(14-inch-intel)/82xfcto1wwjp2",
    "legion-pro-5i":         "https://www.lenovo.com/jp/ja/p/laptops/legion-laptops/legion-pro-series/legion-pro-5i-gen-9-(16-inch-intel)/83df006qjp",
    "dell-xps-14":           "https://www.dell.com/ja-jp/shop/laptops/xps-14/spd/xps-14-9440-laptop",
    "alienware-m16-r2":      "https://www.dell.com/ja-jp/shop/gaming-laptops/alienware-m16-r2/spd/alienware-m16-r2-laptop",
    "hp-spectre-x360-14":    "https://www.hp.com/jp-ja/laptops/spectre.html",
    "hp-omen-16":            "https://www.hp.com/jp-ja/gaming/omen.html",
    "asus-rog-zephyrus-g14": "https://www.asus.com/jp/laptops/for-gaming/rog-zephyrus/rog-zephyrus-g14-2024/",
    "asus-zenbook-14-oled":  "https://www.asus.com/jp/laptops/for-home/zenbook/asus-zenbook-14-oled-ux3405/",
    "asus-tuf-a15":          "https://www.asus.com/jp/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15/",
    "surface-laptop-7":      "https://www.microsoft.com/ja-jp/surface/laptops/surface-laptop",
    "surface-pro-11":        "https://www.microsoft.com/ja-jp/surface/devices/surface-pro-11th-edition",
    "g-tune-e5":             "https://www.mouse-jp.co.jp/store/g-tune/",
    "daiv-z4":               "https://www.mouse-jp.co.jp/store/daiv/",
    "galleria-xa7c-r47":     "https://www.dospara.co.jp/",
    "acer-nitro-v15":        "https://www.acer.com/jp-ja/laptops/nitro/nitro-v15/latest",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "ja,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml",
}

OUT_DIR   = Path(__file__).parent.parent / "public" / "images" / "products"
JSON_PATH = Path(__file__).parent.parent / "data" / "laptops.json"


# ── og:image パーサ ────────────────────────────────────────────────────
class OGParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.og_image: str | None = None

    def handle_starttag(self, tag, attrs):
        if tag != "meta":
            return
        d = dict(attrs)
        if d.get("property") == "og:image" or d.get("name") == "og:image":
            self.og_image = d.get("content")


def fetch_html(url: str) -> str | None:
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  ⚠️  HTML取得失敗: {e}")
        return None


def fetch_og_image(url: str) -> str | None:
    html = fetch_html(url)
    if not html:
        return None
    p = OGParser()
    p.feed(html[:50_000])  # head部分だけ解析
    return p.og_image


def download_image(img_url: str, dest: Path) -> bool:
    if not img_url.startswith("http"):
        return False
    req = urllib.request.Request(img_url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = r.read()
        content_type = r.headers.get("Content-Type", "")
        if "webp" in content_type:
            dest = dest.with_suffix(".webp")
        elif "png" in content_type:
            dest = dest.with_suffix(".png")
        dest.write_bytes(data)
        print(f"  ✅ 保存: {dest.name} ({len(data)//1024}KB)")
        return str(dest)
    except Exception as e:
        print(f"  ⚠️  画像DL失敗: {e}")
        return False


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    laptops = json.loads(JSON_PATH.read_text(encoding="utf-8"))

    for laptop in laptops:
        lid = laptop["id"]
        url = PRODUCT_PAGES.get(lid)
        if not url:
            print(f"⏭  {lid}: URLなし → スキップ")
            continue

        # すでに画像がある場合はスキップ
        existing = list(OUT_DIR.glob(f"{lid}.*"))
        if existing:
            print(f"⏭  {lid}: 既存画像あり → スキップ ({existing[0].name})")
            rel = f"/images/products/{existing[0].name}"
            laptop["image"] = rel
            continue

        print(f"🔍 {lid}: {url}")
        og = fetch_og_image(url)
        if not og:
            print(f"  ❌ og:image 取得失敗")
            time.sleep(1)
            continue

        print(f"  📷 og:image → {og[:80]}...")
        dest = OUT_DIR / f"{lid}.jpg"
        result = download_image(og, dest)
        if result:
            # 実際の保存パス（拡張子が変わる場合がある）
            saved = list(OUT_DIR.glob(f"{lid}.*"))
            if saved:
                laptop["image"] = f"/images/products/{saved[0].name}"

        time.sleep(0.8)  # レート制限

    JSON_PATH.write_text(
        json.dumps(laptops, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    print("\n✅ laptops.json 更新完了")


if __name__ == "__main__":
    main()
