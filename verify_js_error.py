
from playwright.sync_api import sync_playwright
import os
import time

def check_js_errors():
    cwd = os.getcwd()
    url = f"file://{cwd}/index.html"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console messages
        page.on("console", lambda msg: print(f"Console {msg.type}: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Page Error: {exc}"))

        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for animation
        time.sleep(1)

        # Check if landing page is visible
        try:
            visible = page.is_visible("#landing-page")
            print(f"Landing page visible: {visible}")

            # Check if .page.active has display: flex
            display = page.eval_on_selector("#landing-page", "el => getComputedStyle(el).display")
            print(f"Landing page display: {display}")

            # Check opacity
            opacity = page.eval_on_selector("#landing-page", "el => getComputedStyle(el).opacity")
            print(f"Landing page opacity: {opacity}")

            # Check if history page exists in DOM
            history_exists = page.evaluate("document.getElementById('history-page') !== null")
            print(f"History page found: {history_exists}")

        except Exception as e:
            print(f"Error checking visibility: {e}")

        browser.close()

if __name__ == "__main__":
    check_js_errors()
