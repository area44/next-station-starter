import time
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Open home page
        print("Navigating to http://localhost:3000...")
        page.goto("http://localhost:3000")

        # Wait for the images to load
        page.wait_for_selector("img", timeout=10000)
        time.sleep(2)

        # Take home screenshot
        print("Taking home page screenshot...")
        page.screenshot(path="verification/screenshot.png")

        # Click the first image to trigger dialog
        print("Clicking first image...")
        images = page.locator("img")
        if images.count() > 0:
            images.first.click()
            time.sleep(2)
            # Take dialog screenshot
            print("Taking open dialog screenshot...")
            page.screenshot(path="verification/screenshot_dialog.png")
        else:
            print("No images found to click.")

        browser.close()

if __name__ == "__main__":
    run()
