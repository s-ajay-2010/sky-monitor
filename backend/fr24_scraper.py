from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import re

def scrape_fr24(callsign):
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=False)
            page = browser.new_page()
            page.goto(f"https://www.flightradar24.com/data/flights/{callsign.lower()}", wait_until ="domcontentloaded", timeout=60000)
            page.wait_for_timeout(5000)
            html = page.content()
            soup = BeautifulSoup(html, "html.parser")
            print("\nTITLE:")
            print(soup.title.text)
            print("\nROWS:\n")
            rows = soup.find_all("tr")
            for row in rows[:20]:
                text = row.get_text(" ", strip=True)
                if ("Play" in text):
                    print("\nMATCHED FLIGHT:\n")
                    print(text)
                    print("-" * 50)

                    registration = re.search(r"F-[A-Z0-9]+", text)
                    if registration:
                        registration = registration.group()
                    else:
                        registration = "Unknown"
            
                    aircraft = re.search(r"\b(A20N|B738|A320|A359|B77W|32N|73H)\b", text)
                    if aircraft:
                        aircraft = aircraft.group()
                    else:
                        aircraft = "Unknown"
            
                    flight_data= {
                        "registration": registration,
                        "aircraft": aircraft,
                    }

                    return flight_data
    except Exception as e:
        print(f"FLIGHT RADAR24 scrape FAILED: {e}")
        return{
            "registration": "Unknown",
            "aircraft": "Unknown",
            "origin": "Unknown",
            "destination": "Unknown",
            "status": "Unknown",
            }    
        
    return{
    "registration": "Unknown",
    "aircraft": "Unknown",
    "origin": "Unknown",
    "destination": "Unknown",
    "status": "Unknown",
    }
    