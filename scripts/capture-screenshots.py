#!/usr/bin/env python3
"""Capture web screenshots of deployed Vercel apps using Playwright."""

import asyncio
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Installing playwright...")
    import subprocess
    subprocess.run(["pip", "install", "playwright"], check=True)
    from playwright.async_api import async_playwright

SCREENSHOTS_DIR = Path.home() / "diomande-automation" / "public" / "projects" / "screenshots"

SITES = [
    # Already have screenshots — recapture with updated URLs
    ("cali-lights", "https://cali-lights.vercel.app"),
    ("milkmen-delivery", "https://milkmendelivery.vercel.app"),
    ("meaning-full-power", "https://meaningfullpower.com"),
    ("serenity-store", "https://serenity-store.vercel.app"),
    ("learnnko", "https://learnnko.vercel.app"),
    ("stabent", "https://www.stabent.com"),
    ("cc-dashboard", "https://compass-dashboard.vercel.app"),
    ("diomande-automation", "https://diomande-automation.vercel.app"),
    ("qr-dynamic", "https://qr-dynamic.vercel.app"),
    # New screenshots
    ("timeline-app", "https://timeline-app.vercel.app"),
    ("session-threads-ui", "https://session-threads-ui.vercel.app"),
    ("audio-engine", "https://audio-engine.vercel.app"),
    ("pulse", "https://pulse-landing.vercel.app"),
    ("linkit", "https://linkit.vercel.app"),
    ("buffbarista-dance", "https://buffbarista-dance.vercel.app"),
    ("nexus-portal", "https://nexus-portal.vercel.app"),
    ("mfp-landing", "https://mfp-landing.vercel.app"),
    ("mfp-storefront", "https://storefront-rosy-kappa.vercel.app"),
    ("bwb", "https://pos-wine-theta.vercel.app"),
    ("plaisir", "https://pplaisir.vercel.app"),
]


async def capture(slug: str, url: str, browser):
    try:
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        await page.goto(url, wait_until="networkidle", timeout=30000)
        await asyncio.sleep(2)  # let animations settle
        out = SCREENSHOTS_DIR / f"{slug}.png"
        await page.screenshot(path=str(out), type="png")
        print(f"  OK  {slug} -> {out.name}")
        await page.close()
        return True
    except Exception as e:
        print(f"  FAIL {slug}: {e}")
        return False


async def main():
    SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Capturing {len(SITES)} screenshots...")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Run sequentially to avoid overwhelming the browser
        results = []
        for slug, url in SITES:
            result = await capture(slug, url, browser)
            results.append(result)
        await browser.close()

    ok = sum(results)
    print(f"\nDone: {ok}/{len(SITES)} captured to {SCREENSHOTS_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
