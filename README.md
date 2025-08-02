
# TransactionListApp

A JavaScript-driven web app for listing, searching, sorting **and creating** financial transactions. Developed for a JavaScript course, it consumes a mock REST API served by JSON Server and delivers a fully responsive interface styled with **Tailwind CSS v3**.

## Table of Contents
1. [Features](#1-features)
2. [Tech Stack](#2-tech-stack)
3. [Setup](#3-setup)
4. [Usage](#4-usage)

---

## 1. Features
- **Fetch Data** – Retrieve the latest transaction list with a single click (Axios GET).
- **Create Transaction** – Add a new **deposit** or **withdrawal** entry via the form; the list refreshes automatically.
- **Search** – Query transactions by *reference ID* directly against the API.
- **Sort** – Order by **amount** or **date** (ascending / descending) with a smooth arrow‑rotation animation.
- **Responsive UI** – Optimised for mobile and desktop; layout, tables.
- **Error Handling** – API failures are trapped and logged without breaking the UI.

---

## 2. Tech Stack

| Layer | Tools / Libraries |
|-------|-------------------|
| **Frontend** | HTML5, JavaScript (ES6), Tailwind CSS v3, Axios |
| **Mock API** | JSON Server |
| **Tools** | Live Server (VS Code) |

---

## 3. Setup

```bash
# 1 – install dependencies
npm install

# 2 – launch the mock API on :3000
npm run server      # serves GET/POST /transactions

# 3 – open the app
#     (VS Code) Right‑click index.html → “Open with Live Server”
#     or start any static server pointed at the repo root
```

---

## 4. Usage

| Action | How‑to |
|--------|-------|
| **Fetch transactions** | Click **“Fetch Data”**; rows load into the table. |
| **Add transaction** | Enter amount choose *type* (deposit / withdraw) and press **Submit**. |
| **Search** | Type a ref‑ID in the search box – results filter in real time. |
| **Sort** | Use the price/date dropdowns in the header; arrow icon flips to show order. |

Each row shows: `id`, `type`, `amount`, `referenceId`, `date`, `weekday`, and `time`.


