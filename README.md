# TrueArk

Modern Multi-Tenant Valuation and SaaS Management Platform.

## Project Structure

- **`frontend/`**: React 19 + Vite frontend styled with Tailwind CSS and Material Symbols.
  - Sign In / Authentication
  - SaaS Platform Admin Dashboard (Key Metrics, Valuation Volume & Tenant Growth Chart, Tenant Onboarding)
  - Company Master (Tenant Management, Filter, Status Change, DB Export)
  - Add New Company
  - Company View
  - Plan Master (Subscription Tiers, Monthly/Yearly Pricing, Limits)
  - Add / Edit Subscription Plan
  - Plan View
- **`server/`**: Python REST API backend service.

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Build

```bash
cd frontend
npm run build
```
