from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import re


playwright_instance = None
browser = None

def get_browser():
   global playwright_instance
   global browser
   
   if browser is None:
       playwright_instance = sync_playwright().start()
       browser = playwright_instance.chromium.launch(headless=False, args=["--disable-blink-features=AutomationControlled"])
    
   return browser

def scrape_fr24(callsign):
    page = None
    try:
        browser = get_browser()
        page = browser.new_page()
        page.goto(f"https://flightradar24.com/data/flights/{callsign.lower()}", wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(2000)
        
        html = page.content()
        soup = BeautifulSoup(html, "html.parser")
        
        print("\nTITLE:")
        print(soup.title.text)
        
        if "Just a moment..." in soup.title.text:
            print("Cloudflare bloacked request blud:(")
            
            return{
                "registration": "Unknown",
                "aircraft": "Unknown",
                "origin": "Unknown",
                "destination": "Unknown",
                "status": "Blocked",
            }
            
        rows = soup.find_all("tr")
        for row in rows[:20]:
            text = row.get_text(" ", strip=True)
            
            if "Play" in text:
                registration = re.search(r"[A-Z]{1,2}-[A-Z0-9]+", text)
                registration = (registration.group() if registration else "Unknown")
                
                aircraft = re.search(r"\b(A[0-9]{3}[A-Z]?|E[0-9]{3}|CRJ[0-9]?|AT[0-9]{2}|32N|73H)\b", text)
                aircraft = (aircraft.group() if aircraft else "Unknown")
                
                return{
                    "registration": registration,
                    "aircraft": aircraft,
                    "origin": "Unknown",
                    "destination": "Unknown",
                    "status": "Tracked",
                }
    
    except Exception as e:
        print(f"FLIGHT-RADAR24 scrape FAILED: {e}")
        
    finally:
        if page:
            page.close()
            
    return{
        "registration": "Unknown",
        "aircraft": "Unknown",
        "origin": "Unknown",
        "destination": "Unknown",
        "status": "Unknown",
        }