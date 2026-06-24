#!/usr/bin/env python3
"""
Try to get product images from review/spec sites that don't block bots.
"""
import urllib.request
import urllib.parse
import urllib.error
import html.parser
import os
import time

OUT = "public/images/products"
os.makedirs(OUT, exist_ok=True)

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

class OgImageParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.og_image = None
        self.images = []

    def handle_starttag(self, tag, attrs):
        attrs_d = dict(attrs)
        if tag == "meta":
            if attrs_d.get("property") in ("og:image", "twitter:image"):
                if attrs_d.get("content"):
                    self.og_image = attrs_d["content"]
        if tag == "img":
            src = attrs_d.get("src", "")
            if src and not src.startswith("data:") and len(src) > 10:
                self.images.append(src)

def fetch_html(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "ja-JP,ja;q=0.9"})
    with urllib.request.urlopen(req, timeout=12) as r:
        return r.read().decode("utf-8", errors="replace")

def fetch_image(url, out_path):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.google.com/"})
    with urllib.request.urlopen(req, timeout=12) as r:
        data = r.read()
        ct = r.headers.get("Content-Type", "")
        if not ct.startswith("image/"):
            return False
        if len(data) < 10000:
            return False
        with open(out_path, "wb") as f:
            f.write(data)
        print(f"  ✅ {len(data)//1024}KB → {out_path}")
        return True

# Targets: laptop id → list of review page URLs
TARGETS = [
    {
        "id": "thinkpad-x1-carbon",
        "ext": "jpg",
        "pages": [
            "https://www.notebookcheck.net/Lenovo-ThinkPad-X1-Carbon-Gen-13-review.html",
            "https://pc.watch.impress.co.jp/docs/column/hothot/1571437.html",
        ],
    },
    {
        "id": "hp-omen-16",
        "ext": "jpg",
        "pages": [
            "https://www.notebookcheck.net/HP-Omen-16-2024-review.html",
        ],
    },
    {
        "id": "surface-laptop-7",
        "ext": "jpg",
        "pages": [
            "https://pc.watch.impress.co.jp/docs/column/hothot/1607768.html",
            "https://www.notebookcheck.net/Microsoft-Surface-Laptop-7-review.html",
        ],
    },
    {
        "id": "acer-nitro-v15",
        "ext": "jpg",
        "pages": [
            "https://www.notebookcheck.net/Acer-Nitro-V-15-review.html",
        ],
    },
    {
        "id": "ideapad-slim5-gen9",
        "ext": "jpg",
        "pages": [
            "https://www.notebookcheck.net/Lenovo-IdeaPad-Slim-5-Gen-9-14-review.html",
        ],
    },
    {
        "id": "legion-pro-5i",
        "ext": "jpg",
        "pages": [
            "https://www.notebookcheck.net/Lenovo-Legion-Pro-5i-Gen-9-review.html",
            "https://pc.watch.impress.co.jp/docs/column/hothot/1588888.html",
        ],
    },
    {
        "id": "hp-spectre-x360-14",
        "ext": "jpg",
        "pages": [
            "https://www.notebookcheck.net/HP-Spectre-x360-14-review.html",
        ],
    },
    {
        "id": "nec-lavie-nextreme",
        "ext": "jpg",
        "pages": [
            "https://pc.watch.impress.co.jp/docs/column/hothot/1608640.html",
            "https://ascii.jp/elem/000/004/187/4187000/",
        ],
    },
    {
        "id": "g-tune-e5",
        "ext": "jpg",
        "pages": [
            "https://pc.watch.impress.co.jp/docs/column/hothot/1581671.html",
        ],
    },
    {
        "id": "galleria-xa7c-r47",
        "ext": "jpg",
        "pages": [
            "https://pc.watch.impress.co.jp/docs/column/hothot/1571600.html",
        ],
    },
    {
        "id": "daiv-z4",
        "ext": "jpg",
        "pages": [
            "https://pc.watch.impress.co.jp/docs/column/hothot/1574234.html",
        ],
    },
]


def main():
    success, fail = [], []

    for target in TARGETS:
        pid = target["id"]
        ext = target["ext"]
        out_path = os.path.join(OUT, f"{pid}.{ext}")

        if os.path.exists(out_path) or os.path.exists(out_path.replace(".jpg", ".png")):
            print(f"[SKIP] {pid} already exists")
            continue

        print(f"\n[{pid}]")
        ok = False
        for page_url in target["pages"]:
            print(f"  Fetching page: {page_url[:70]}...")
            try:
                html_content = fetch_html(page_url)
                parser = OgImageParser()
                parser.feed(html_content)

                if parser.og_image:
                    img_url = parser.og_image
                    if img_url.startswith("//"):
                        img_url = "https:" + img_url
                    print(f"  og:image found: {img_url[:70]}...")
                    if fetch_image(img_url, out_path):
                        ok = True
                        break
                else:
                    print(f"  No og:image found on page")
            except Exception as e:
                print(f"  Page error: {type(e).__name__}: {str(e)[:60]}")
            time.sleep(1)

        if ok:
            success.append(pid)
        else:
            fail.append(pid)

    print(f"\n\n=== Results ===")
    print(f"✅ Success ({len(success)}): {success}")
    print(f"❌ Failed  ({len(fail)}): {fail}")
    if fail:
        print(f"\n手動でのダウンロードが必要なPCリスト:")
        for pid in fail:
            print(f"  {pid}")


if __name__ == "__main__":
    main()
