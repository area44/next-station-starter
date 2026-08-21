import time
from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")
        time.sleep(1)
        page.screenshot(path="verification/main_grid.png")
        print("Captured main_grid.png")

        # Click an image link
        links = page.get_by_role("link").all()
        print(f"Found {len(links)} links")
        for link in links:
            href = link.get_attribute("href")
            if href and "?photoId=" in href:
                link.click()
                time.sleep(1)
                page.screenshot(path="verification/modal_view.png")
                print("Captured modal_view.png")
                break

        browser.close()

if __name__ == "__main__":
    verify()
