# Dar-Connect — Real Estate Extranet Platform

Dar-Connect is a modern real estate platform designed for the Algerian market, allowing tenants to browse premium properties in Algiers, Oran, and Constantine and submit visit requests seamlessly.

## 🚀 Technology Stack
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Backend/BaaS**: Supabase (Auth, PostgreSQL, Storage)
- **Icons**: Lucide React
- **Authentication**: Supabase SSR with Middleware protection

---

## 📋 Theme Mapping

| Component | Description |
|-----------|-------------|
| **Table A (locataires)** | Platform users/tenants. Stores personal info linked to Supabase Auth. |
| **Table B (maisons)** | Available real estate listings (Villa, Apartment, House). |
| **Table C (visites)** | Join table managing visit requests between tenants and properties. |
| **Storage (documents-visites)** | Secure bucket for identity verification (ID card scans). |

---

## 🏗️ Architecture Analysis

### Q1 — Why is Vercel + Supabase financially smarter than a traditional server for this project?
Using Vercel and Supabase shifts the project's financial model from **CAPEX (Capital Expenditure)** to **OPEX (Operational Expenditure)**. In a traditional setup, you would need upfront investment in hardware, networking, and server licenses (CAPEX). With this stack, you pay only for what you use (OPEX). Supabase provides a managed database and auth system, eliminating the need for dedicated DevOps staff, while Vercel handles global edge distribution, significantly lowering the total cost of ownership (TCO) for a startup or MVP.

### Q2 — How does Vercel handle scalability compared to a physical local data center?
Vercel uses a **Serverless/Edge** architecture. Unlike a physical data center where you must manually manage racks, cooling, and power, and anticipate traffic spikes by over-provisioning hardware, Vercel scales automatically. When traffic increases, Vercel spins up additional serverless functions instantly across a global network. There is no manual intervention required for load balancing or hardware maintenance, providing "infinite" scalability without the physical constraints of a local rack.

### Q3 — Structured vs. Unstructured Data
In Dar-Connect, data is categorized as follows:
- **Structured Data**: This is stored in **PostgreSQL** tables. It includes `locataires` (user profiles), `maisons` (listing details), and `visites` (request logs). This data follows a strict schema with defined relationships and constraints.
- **Unstructured Data**: This is stored in **Supabase Storage**. It includes property photos and the ID card scans uploaded by users. These are binary files that do not fit into a tabular format but are essential for the application's functionality.

---

## ⚙️ Setup Instructions

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Environment Variables**: Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Database Setup**: Run the SQL script found in `supabase/schema.sql` in your Supabase SQL Editor.
5. **Storage Setup**: Create a **private** bucket in Supabase named `documents-visites`.
6. **Run Locally**: `npm run dev`
