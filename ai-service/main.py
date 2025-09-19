from fastapi import FastAPI

app = FastAPI()

@app.get("/forecast/occupancy")
def occupancy():
    return {"forecast": [
        {"hour": "09:00", "occupancy": 25},
        {"hour": "18:00", "occupancy": 80}
    ]}

@app.get("/forecast/energy")
def energy():
    return {"forecast": [
        {"hour": "09:00", "kWh": 15},
        {"hour": "18:00", "kWh": 40}
    ]}

@app.get("/forecast/pv")
def pv():
    return {"sunny": [10,20,30,40], "cloudy": [5,10,12,18]}
