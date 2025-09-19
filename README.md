🌱 Greenovators – Green Access Intelligence Platform

This repo contains the MVP hackathon project for the Greenovators team.
It is organized by module so each team member can work independently but integrate smoothly.

greenovators/
│
├── backend-dotnet/             # ASP.NET Core Web API (Jayesh)
├── ai-service/                 # Python AI/ML Forecast Service (Muffeeze)
├── dashboard-frontend/         # React Dashboard (Janmesh)
├── mobile-app/                 # Flutter Mobile App (Shubham)
├── devops/                     # Docker + CI/CD (Neer)
├── designer-assets/            # Mockups, logo, slides (Adarsh)
└── README.md

👥 Team Roles & Setup Instructions
🔹 Monil – Coordinator / Solution Architect

Oversee repo structure and integration.

Help unblock devs.

Validate presentation and demo flow.

Can run backend & AI locally for quick testing (dotnet run and uvicorn main:app).

🔹 Jayesh – Backend (.NET API)

📁 backend-dotnet/

Install .NET 7 SDK
.

Run API locally:

cd backend-dotnet
dotnet run


API will start at: http://localhost:5000

Endpoints available:

POST /api/tap → simulate tap, return eco-points.

GET /api/dashboard/summary → ESG KPIs mock.

GET /api/forecast/occupancy → mock occupancy.

GET /api/recommendations → action cards.

DB layer: PostgreSQL schema (tables: Users, Events, EcoPoints) → can mock for hackathon.

🔹 Muffeeze – AI/ML Service (FastAPI)

📁 ai-service/

Install dependencies:

cd ai-service
pip install -r requirements.txt


Run service:

uvicorn main:app --reload --port 8001


Runs on http://localhost:8001

Endpoints:

/forecast/occupancy → returns hourly occupancy forecast.

/forecast/energy → returns kWh forecast.

/forecast/pv → sunny vs cloudy PV outputs.

Goal: Later can connect with real CSV/IoT data. For hackathon, keep stub JSON working.

🔹 Janmesh – Dashboard (React)

📁 dashboard-frontend/

Install Node.js (v18+).

Run dashboard locally:

cd dashboard-frontend
npm install
npm start


Opens at: http://localhost:3000

Components to implement:

SummaryTiles.js → kWh saved, CO₂ avoided, eco-points issued.

OccupancyChart.js → show forecasted occupancy (use mock from /forecast/occupancy).

RecommendationsPanel.js → live recommended actions (consume /api/recommendations).

🔹 Shubham – Mobile App (Flutter)

📁 mobile-app/

Install Flutter SDK.

Run app:

cd mobile-app
flutter pub get
flutter run


Screens:

TapScreen.dart → simulate tap & get eco-points.

WalletScreen.dart → show eco-points balance.

RewardsScreen.dart → show reward catalog.

Connect APIs:

POST /api/tap

GET /api/users/{id}/points (mock)

🔹 Neer – DevOps

📁 devops/

Setup docker-compose.yml to run:

Backend (.NET API)

AI Service (FastAPI)

PostgreSQL DB

Verify all services start with:

docker-compose up


Ensure logging works for quick debugging.

Optional: Setup GitHub Actions for CI/CD.

🔹 Shweta – QA & Demo

Use Postman collection (qa-tests/collection.json) → import and test APIs.

Test mobile + dashboard flows manually.

Help prepare demo rehearsal script.

Act as backup speaker during presentation.

🔹 Adarsh – Designer

📁 designer-assets/

Prepare Figma mockups (mobile + dashboard).

Design presentation slides with clear flow:

Problem → Personas → Solution → Demo → Value.

Provide branding assets (logo, theme colors).

Act as critic to polish UI/UX.

🚀 Run All Services (Local Demo)

Start backend (.NET):

cd backend-dotnet
dotnet run


Start AI service:

cd ai-service
uvicorn main:app --reload --port 8001


Start dashboard:

cd dashboard-frontend
npm start


Start mobile app:

cd mobile-app
flutter run

✅ Hackathon MVP Scope

Live tap simulation → eco-points update (mobile).

Dashboard → ESG KPIs + live recommendation card.

AI service → returns mock forecasts (occupancy, energy, PV).

Presentation + demo flow rehearsed.