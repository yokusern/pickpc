#!/usr/bin/env python3
"""
Attempt to fetch product images for laptops that don't have images yet.
Tries multiple sources: manufacturer press pages, CDN URLs.
"""
import urllib.request
import urllib.error
import os
import time

OUT = "public/images/products"
os.makedirs(OUT, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "ja-JP,ja;q=0.9,en-US;q=0.8",
    "Referer": "https://www.google.com/",
}

# Direct image URLs to try for each laptop
TARGETS = [
    # ThinkPad X1 Carbon Gen 13 - Lenovo press
    {
        "id": "thinkpad-x1-carbon",
        "ext": "png",
        "urls": [
            "https://www.lenovo.com/medias/lenovo-laptops-thinkpad-x1-carbon-gen-13-hero.png?context=bWFzdGVyfHJvb3R8OTA0NjA4fGltYWdlL3BuZ3xoMzEvaGZlLzE3MzgwNzU4NDk5OTAyLnBuZ3ww",
            "https://www.lenovo.com/medias/lenovo-thinkpad-x1-carbon-gen13-2025.png",
        ],
    },
    # HP OMEN 16 - HP press
    {
        "id": "hp-omen-16",
        "ext": "png",
        "urls": [
            "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/knowledgebase/c08627455.png",
            "https://support.hp.com/doc-images/741/c08627455.png",
        ],
    },
    # Surface Laptop 7 - Microsoft
    {
        "id": "surface-laptop-7",
        "ext": "png",
        "urls": [
            "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW1lhvd?ver=9a3b",
            "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW1lhvc?ver=5e8f",
        ],
    },
    # Acer Nitro V 15 - Acer press CDN
    {
        "id": "acer-nitro-v15",
        "ext": "png",
        "urls": [
            "https://static.acer.com/up/Resource/Acer/Laptops/Nitro_V_15_AN515-58/Images/20230111-AN515-58-01.png",
            "https://static.acer.com/up/Resource/Acer/Laptops/Nitro_V_15/Images/20240424-Acer-Nitro-V-15-ANV15-51-01.png",
        ],
    },
    # IdeaPad Slim 5 Gen 9 - Lenovo CDN
    {
        "id": "ideapad-slim5-gen9",
        "ext": "png",
        "urls": [
            "https://www.lenovo.com/medias/lenovo-laptops-ideapad-slim-5-gen-9-14-amd-hero.png",
            "https://www.lenovo.com/medias/lenovo-laptop-ideapad-slim5-gen9-01.png",
        ],
    },
    # Legion Pro 5i Gen 9 - Lenovo CDN
    {
        "id": "legion-pro-5i",
        "ext": "png",
        "urls": [
            "https://www.lenovo.com/medias/lenovo-laptops-legion-pro-5i-gen-9-16-intel-hero.png",
            "https://www.lenovo.com/medias/lenovo-laptop-legion-pro-5i-gen9-01.png",
        ],
    },
    # HP Spectre x360 14 - HP CDN
    {
        "id": "hp-spectre-x360-14",
        "ext": "png",
        "urls": [
            "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/knowledgebase/c07975795.png",
        ],
    },
    # NEC LAVIE NEXTREME - NEC Japan
    {
        "id": "nec-lavie-nextreme",
        "ext": "png",
        "urls": [
            "https://jpn.nec.com/pc/lavie/nextreme/img/nextreme_product_carbon.png",
            "https://jpn.nec.com/products/bizpc/performance/img/nextreme_hero.jpg",
        ],
    },
    # G-Tune E5 - Mouse Computer CDN
    {
        "id": "g-tune-e5",
        "ext": "png",
        "urls": [
            "https://www.mouse-jp.co.jp/store/goods/images/g-tune/E5-I7G60BK-B_01.jpg",
            "https://www.mouse-jp.co.jp/store/goods/images/g-tune/e5-i7g60bk-b_main.jpg",
        ],
    },
    # DAIV Z4 - Mouse Computer CDN
    {
        "id": "daiv-z4",
        "ext": "png",
        "urls": [
            "https://www.mouse-jp.co.jp/store/goods/images/daiv/Z4-I7G60BK_01.jpg",
            "https://www.mouse-jp.co.jp/store/goods/images/daiv/z4-i7g60bk_main.jpg",
        ],
    },
    # GALLERIA XA7C-R47 - Dospara CDN
    {
        "id": "galleria-xa7c-r47",
        "ext": "png",
        "urls": [
            "https://www.dospara.co.jp/static_contents/img/item/p/galleria-xa7c-r47_main.jpg",
        ],
    },
]


def try_fetch(url: str, out_path: str) -> bool:
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            ct = resp.headers.get("Content-Type", "")
            # Must be an image
            if not (ct.startswith("image/") or len(data) > 5000):
                return False
            # Must be at least 10KB (avoid placeholder images)
            if len(data) < 10000:
                print(f"  Too small ({len(data)}B), skipping")
                return False
            with open(out_path, "wb") as f:
                f.write(data)
            print(f"  ✅ Saved {len(data)//1024}KB → {out_path}")
            return True
    except Exception as e:
        print(f"  ❌ {type(e).__name__}: {str(e)[:60]}")
        return False


def main():
    success = []
    fail = []

    for target in TARGETS:
        pid = target["id"]
        ext = target["ext"]
        out_path = os.path.join(OUT, f"{pid}.{ext}")

        if os.path.exists(out_path):
            print(f"[SKIP] {pid} already exists")
            continue

        print(f"\n[{pid}]")
        ok = False
        for url in target["urls"]:
            print(f"  Trying: {url[:70]}...")
            if try_fetch(url, out_path):
                ok = True
                break
            time.sleep(0.5)

        if ok:
            success.append(pid)
        else:
            fail.append(pid)

    print(f"\n\n=== Results ===")
    print(f"✅ Success ({len(success)}): {success}")
    print(f"❌ Failed  ({len(fail)}): {fail}")
    print(f"\nFailed products need manual image download.")
    if fail:
        print("Suggestions:")
        for pid in fail:
            print(f"  - {pid}: search '{pid.replace('-', ' ')}' on Google Images → save to public/images/products/{pid}.png")


if __name__ == "__main__":
    main()
