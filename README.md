# 🌊 Nereus
> **AI-Powered Conversational Ocean Intelligence & 3D Earth Discovery Platform**

Nereus is an interactive scientific ocean intelligence platform that enables researchers, oceanographers, students, and hackathon judges to query, discover, and visualize real ARGO ocean observations in natural language. Focused on the Indian Ocean, Arabian Sea, and Bay of Bengal, Nereus turns complex NetCDF/Parquet datasets into interactive 3D Earth visualizations, vertical thermohaline profiles, and AI-driven scientific explanations — running 100% locally with ₹0 budget.

---

## 📌 Problem & Solution

### The Problem
Discovering and processing ARGO float observations usually requires writing complex Python/Julia scripts (`xarray`, `netCDF4`, `pandas`), parsing multi-gigabyte spatial datasets, or mastering esoteric database query syntax. Non-programmer oceanographers and policymakers struggle to quickly retrieve targeted insights like thermocline gradients or regional salinity contrasts.

### The Solution
FloatChat bridges the gap between natural language and oceanographic data infrastructure:
1. **Ask in Plain English**: *"Show temperature profile for float 2902746"* or *"Compare Arabian Sea and Bay of Bengal temperature"*.
2. **Instant Intent Extraction**: Converts user input into structured JSON intent models using LLMs (or an offline rule-based regex parser).
3. **Interactive Visualization**: Renders Leaflet float location maps, trajectory paths, and Recharts vertical thermohaline profiles (with ocean depth inverted downwards).
4. **AI "Explain This"**: Generates grounded scientific explanations of observation graphs using actual data statistics.

---

## 📐 Architecture Diagram

```
                              USER
                               │
                               ▼
                   ┌───────────────────────┐
                   │     FloatChat UI      │
                   │                       │
                   │  Chat / Map / Chart   │
                   └───────────┬───────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │    Next.js Backend    │
                   │      API Routes       │
                   └───────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
         ┌──────────────┐              ┌──────────────┐
         │  AI Intent   │              │  ARGO Data   │
         │    Parser    │              │    Layer     │
         └──────┬───────┘              └──────┬───────┘
                │                             │
         Structured JSON              DuckDB / Parquet / JSON
                │                             │
                └──────────────┬──────────────┘
                               ▼
                        Data Processing
                               │
                               ▼
                      Visualization Engine
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
             Charts                         Maps
                │                             │
                └──────────────┬──────────────┘
                               ▼
                         AI Explanation
```

---

## 🌟 Key Features

- **Conversational Context Memory**: Handles follow-up queries seamlessly (e.g., *"Show temperature in Arabian Sea"* ➔ *"What about salinity?"* ➔ *"Compare it with Bay of Bengal"*).
- **Rule-Based Fallback Engine**: If no LLM API key is present or network fails, the system uses regex-based intent parsing (`lib/ai/fallback-parser.ts`), making the demo 100% reliable for hackathons.
- **Scientific Visualization**:
  - **Vertical Profile Charts**: Temperature & Salinity vs Depth (0m to 2000m) with depth inverted downwards per oceanographic convention.
  - **Spatial Drift Trajectory Maps**: Plots multi-cycle float drift vectors using Leaflet polylines.
  - **Regional Comparisons**: Side-by-side vertical profile comparisons (Arabian Sea high salinity vs Bay of Bengal freshwater outflow).
  - **Summary Statistics Cards**: Min, Max, Average, Count, and Depth Range calculations.
- **"Explain This Visualization"**: Instant scientific breakdown explaining thermocline depths, haloclines, and water mass characteristics based on actual calculated values.
- **Data Provenance**: Every response cites data source (ARGO / Copernicus Marine / INCOIS Indian Ocean Node), dataset name, and retrieval timestamp.

---

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **Visualizations**: Recharts (Charts), Leaflet & React-Leaflet (Maps)
- **Backend / API**: Next.js Server API Routes (`/api/chat`, `/api/argo/*`)
- **Data Layer**: JSON / DuckDB / Parquet for offline local performance
- **AI / NLP**: Gemini API (`@google/generative-ai`) with Regex Rule Fallback
- **Data Preparation (Python)**: `pandas`, `numpy`, `xarray`, `netCDF4`, `pyarrow`

---

## 📊 ARGO Data Provenance

FloatChat utilizes data derived from global ARGO observations focused on the **Indian Ocean Region**:
- **Primary Source**: Copernicus Marine Data Store / Global Data Assembly Centre (GDAC)
- **Secondary API**: Argovis (University of Colorado Boulder)
- **National Context**: INCOIS (Indian National Centre for Ocean Information Services) — National Argo Data Centre of India
- **Sample Float IDs Included**: `2902746`, `2902747`, `5906234`, `1902341`, `2903321`, `6903210`

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js v18+ or v20+
- Python 3.10+ (for optional data preparation scripts)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd floatchat
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *Note: `DEMO_MODE=true` is enabled by default. No paid API keys are required.*

4. **Verify local dataset (Optional Python check)**:
   ```bash
   npm run seed
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000` in your web browser.

---

## 🧪 Demo Test Queries (Hackathon Evaluation)

Test these 7 queries during hackathon evaluation:

1. **Search Floats**: `"Show ARGO floats around India"`
2. **Temperature Profile**: `"Show temperature profile for float 2902746"`
3. **Float Trajectory**: `"Show trajectory of float 2902746"`
4. **Depth Salinity**: `"Show salinity at 500 meters"`
5. **Regional Comparison**: `"Compare Arabian Sea and Bay of Bengal temperature"`
6. **Conversational Context**:
   - Query 1: `"Show temperature in Arabian Sea"`
   - Follow-up 2: `"What about salinity?"`
7. **Explain This**: Click the **"🔬 Explain this"** button on any visualization.

---

## 📡 API Reference

- `POST /api/chat`: Processes natural language message, executes intent query, returns visualization payload + AI explanation.
- `GET /api/argo/search?region={region}&start_date={date}`: Filters floats by spatial region.
- `GET /api/argo/profile?float_id={id}&variable={temp|sal}`: Returns vertical profile measurements.
- `GET /api/argo/trajectory?float_id={id}`: Returns drift coordinates over time.
- `GET /api/argo/stats?region={region}&variable={temp|sal}&depth={m}`: Calculates min, max, mean, stddev statistics.

---

## 💡 Why This Architecture?

1. **Natural Language**: Researchers do not need to memorize SQL or Python DataFrame syntax.
2. **Scientific Correctness**: Calculations occur in the data layer rather than being hallucinated by an LLM.
3. **Explainability**: Combines visual maps & charts with structured AI explanations.
4. **Data Provenance**: Clear attribution to ARGO, Copernicus Marine, and INCOIS.
5. **Resilience**: Rule fallback parser ensures 100% uptime even during offline presentations.
6. **Scalability**: Local JSON/Parquet layer can be swapped for PostgreSQL/PostGIS or DuckDB in production.

---

## 🔮 Future Scope

- Global ARGO fleet scale integration (4,000+ active floats worldwide).
- Biogeochemical ARGO variables (Dissolved Oxygen, Nitrate, pH, Chlorophyll-a).
- Spatial anomaly detection & marine heatwave alerts.
- Multi-source oceanographic data fusion (Satellite SST + Altimetry + ARGO).
