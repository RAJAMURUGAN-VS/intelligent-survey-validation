# ◆ Sentinel — Intelligent Survey Data Validation Platform

> **Hackathon Prototype** — Front-end only, no backend, no database, no real API.

A polished, production-quality-looking web application built for India's National Statistical Office (NSO) to detect anomalies in PLFS (Periodic Labour Force Survey) data using probabilistic and ML techniques.

## 🚀 Quick Start

```bash
cd sentinel-app
npm install
npm run dev
```

Open http://localhost:5173 in your browser. Navigate to `/login`, enter any User ID + Password, and click **Access Dashboard**.

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18 + Vite + TypeScript** | Core framework |
| **React Router v6** | Client-side routing |
| **Tailwind CSS v4** | Styling with custom design tokens |
| **Framer Motion** | Animations, page transitions, micro-interactions |
| **Recharts** | Charts (line, scatter, bar, radar, donut, radial) |
| **lucide-react** | Icon system |
| **Space Grotesk + JetBrains Mono** | Typography (Google Fonts) |

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/login` | Access Gateway | Animated split-screen login with role selector |
| `/dashboard` | Command Center | Bento-grid KPIs, anomaly rate chart, enumerator scatter, live activity feed |
| `/ingestion` | Data Ingestion Hub | Live/Batch mode toggle, streaming log panel, ingestion history table |
| `/model-lab` | Model Lab | 5 ML models, flow diagram, slider controls, ROC curve, train simulation |
| `/rules` | Integrity Rules Engine | Accordion tree, sentence builder, live rule testing |
| `/anomalies` | Anomaly Explorer | 3-way tabs: Cluster/Record/Aggregate, scatter with detail panel, radar chart |
| `/validation` | Validation Console | Interactive/Batch modes, staggered field checks, terminal console |
| `/analytics` | Analytics & Performance | Multi-line metrics, heatmap, funnel chart, resolution donut |
| `/reports` | Reports & Export Center | Report templates, document preview, format selection, export history |

## 🎨 Design System

**Statistical Command Center** — glassmorphism UI on deep charcoal backgrounds:

- **Background**: `#0B1220` → `#121A2B` gradient with topographic SVG texture at 4% opacity
- **Surfaces**: `#141C2E` with `1px` teal-glow border (`rgba(45,212,191,0.15)`)
- **Teal Accent**: `#2DD4BF` — primary interactive color
- **Amber Accent**: `#F5A524` — warnings and anomaly callouts
- **Violet Accent**: `#8B7FE8` — ML/intelligence elements
- **Danger**: `#F04438` | **Success**: `#2ED47A`

## 📁 Project Structure

```
sentinel-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppLayout.tsx    # App shell (Sidebar + TopBar)
│   │   ├── Sidebar.tsx      # Collapsible nav with animated active indicator
│   │   ├── TopBar.tsx       # Survey selector, search, notifications
│   │   ├── StatusStrip.tsx  # Bottom live status bar
│   │   ├── GlassCard.tsx    # Glassmorphism card
│   │   ├── KpiCard.tsx      # KPI with count-up animation
│   │   ├── PulseDot.tsx     # Live status pulsing dot
│   │   ├── BellCurveIcon.tsx # SVG bell curve motif
│   │   ├── SeverityBadge.tsx # Teal/amber/red pill badge
│   │   ├── SegmentedControl.tsx # Animated tab switcher
│   │   ├── DataTable.tsx    # Sortable/filterable table
│   │   ├── DetailDrawer.tsx # Slide-in detail panel
│   │   └── Toast.tsx        # Toast notification system
│   ├── data/                # Mock data (TypeScript constants)
│   │   ├── dashboardMetrics.ts
│   │   ├── anomalyRecords.ts
│   │   ├── states.ts
│   │   ├── models.ts
│   │   ├── rules.ts
│   │   ├── ingestionHistory.ts
│   │   ├── reportTemplates.ts
│   │   ├── enumeratorHeatmap.ts
│   │   └── analyticsData.ts
│   ├── pages/               # Route pages
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── IngestionPage.tsx
│   │   ├── ModelLabPage.tsx
│   │   ├── RulesPage.tsx
│   │   ├── AnomaliesPage.tsx
│   │   ├── ValidationPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   └── ReportsPage.tsx
│   ├── App.tsx              # Router configuration
│   ├── main.tsx             # Entry point
│   └── index.css            # Global design system CSS
├── index.html
├── vite.config.ts
└── package.json
```

## ⚠️ Hackathon Disclaimer

This is a **front-end-only prototype** built for demonstration purposes:
- All data is **hardcoded mock data** in TypeScript files
- **No backend, no database, no real API calls**
- No authentication (any input navigates to dashboard)
- No data persistence across page refreshes
- Animations simulate "live" behavior via `setInterval` and `setTimeout`

All PLFS field values, enumerator IDs, record IDs, and statistics are **realistic but fictional**.

## 📊 Mock Data Coverage

- **15 anomaly records** with full field details, radar chart data, and action states
- **24 Indian states** with flag counts, rates, and regional breakdowns  
- **5 ML model configs** (Isolation Forest, Z-Score, Bayesian, LSTM, DBSCAN)
- **16 integrity rules** across 5 categories (Referential, Existential, Range, Cross-Survey, Temporal)
- **8 ingestion history entries** + live log pool of 15 entries
- **5 report templates** + 6 export history entries
- **12 enumerators × 8 weeks** performance heatmap data
- **3 date range variants** for analytics time series (7D/30D/Quarter)

---

Built for the NSO Intelligent Data Validation Hackathon 2025.
