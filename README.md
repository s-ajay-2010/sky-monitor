# SKY-MONITOR

A flight tracker, which features an World_War-2 radar-like UI, built with react for frontend and fastAPI(i like it).

## Features
- Track aircrafts near you.
- Location is not collected directly, so you get privacy.(although user coords sandboxing is not implemented, so you may need to enter coords everytime it refreshes:(

## Stack
- React (vite) for frontend.
- Python(FastAPI) for backend.

## Setup
```bash
git clone https://github.com/s-ajay-2010/sky-monitor.git
cd sky-monitor/backend
cp .env.example .env #add your own variables to the designated variables:)
python -m venv venv
pip install requirements.txt
python -m uvicorn main:app --reload
cd ..
cd sky-monitor/frontend
cp .env.example .env #add your own variables to the designated variables:)
npm run dev
```
and then open [http://localhost:5173](http://localhost:5173)

## UI
![Demo](media/demo.jpg)


# AI Usage: Nil