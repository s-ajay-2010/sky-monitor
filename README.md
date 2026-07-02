# SKY-MONITOR

A flight tracker, which features an World_War-2 radar-like UI, built with react for frontend and fastAPI(i like it).

## Features
- Track aircrafts near you.
- Location is collected directly, but its never stored and stays in the client side only.

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

#open another terminal
cd sky-monitor/frontend
cp .env.example .env #add your own variables to the designated variables:)
npm install
npm run dev
```
and then open [http://localhost:5173](http://localhost:5173)

## UI
![Demo-1](media/demo-1.jpg)
![Demo-1](media/demo-2.jpg)

# TO my reviewer:
- If at all any issue arises(it should not and it won't but just in case), please feel free to send me the screenshots and details on slack @ajay .
- And please for god's sake give full details, why?: my last reviewer's feedback before rejecting it: "It fails to fetch the radar data because the backend appears to be down or broken." just it :sob:. Like What can I do with that info? I rightaway checked the same moment it got rejected just to know that all my services worked correctly and I was not able to replicate the issue, I'm reshipping it:).


# AI Usage: Nil