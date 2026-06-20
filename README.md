<div align="center">

<img src="https://img.shields.io/badge/InternKit-Student%20Toolkit-6366f1?style=for-the-badge&logo=checkmarx&logoColor=white" alt="InternKit" />

# 🎓 Student Internship Application Toolkit
LIVE DEMO : (https://internkit.vercel.app/)
**A clean, fast, and student-friendly dashboard to manage internship applications.**  
Convert CGPA · Track preparation · Manage deadlines — all in one place.

[![Built for Digital Heroes](https://img.shields.io/badge/🦸_Built_for-Digital_Heroes-8b5cf6?style=for-the-badge)](https://digitalheroesco.com)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 📸 Preview

> A polished, dark-mode-first web app designed for engineering students applying for internships.

| Feature | Screenshot |
|---|---|
| 🌙 Dark Mode | Hero section with CGPA converter & checklist cards |
| ☀️ Light Mode | Clean white card layout with progress ring |

---

## ✨ Features

### 📊 CGPA → Percentage Converter
- Instantly converts CGPA (0–10 scale) to percentage using the formula:  
  **`Percentage = CGPA × 9.5`**
- Live animated scale bar showing CGPA position
- Grade badge: Outstanding / Distinction / First Class / Pass
- Full input validation with clear error messages
- Press `Enter` to convert

### ✅ Internship Preparation Checklist
- 6 key readiness items to track:
  - 📄 Resume ready
  - 🌐 Portfolio link ready
  - 💼 LinkedIn profile updated
  - 📋 NOC / College permission available
  - 🎓 College details filled correctly
  - 📧 Professional email ID created
- Visual progress bar + percentage (`4 / 6 completed · 67%`)
- ✅ Copy checklist as formatted text
- 🔄 Reset all items with one click
- State saved to **localStorage** — persists on refresh

### 📅 Deadline Reminders
- Add short notes like `"Apply by 19 June"` or `"Submit before Friday"`
- Press `Enter` or click **Add** to save
- Delete individual notes with ✕
- Clear all notes at once
- All notes saved to **localStorage**

### 🏆 Resume Readiness Score
- Animated SVG ring synced to your checklist completion %
- Updates live as you tick items

### 🌙 Dark / Light Mode Toggle
- One-click theme switch (☀️ / 🌙)
- Theme preference saved to **localStorage**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (Semantic) |
| Styling | Vanilla CSS3 (Custom Properties, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Inter + JetBrains Mono (Google Fonts) |
| Storage | Browser localStorage |
| Hosting | GitHub Pages / Vercel |

> **Zero dependencies. No frameworks. No build step needed.**

---

## 🚀 Getting Started

### Option 1 — Open directly (quickest)
```bash
# Just open index.html in your browser
start index.html
```

### Option 2 — Local dev server
```bash
# Using Python (built-in)
python -m http.server 8080

# Then visit
http://localhost:8080
```

### Option 3 — VS Code Live Server
Install the **Live Server** extension → Right-click `index.html` → **Open with Live Server**

---

## 📁 Project Structure

```
internship_app_toolkit/
│
├── index.html       # Main app structure (single page)
├── style.css        # Complete design system & responsive layout
├── app.js           # All interactive logic
└── README.md        # You are here
```

---

## 🌐 Deploy to GitHub Pages

1. Push this repo to GitHub (already done ✅)
2. Go to **Settings → Pages**
3. Set Source to **Deploy from branch → `main` → `/ (root)`**
4. Your app goes live at:  
   `https://ojaspatilofficial.github.io/internkit`

---

## 🧠 CGPA Conversion Logic

The app uses the **standard Indian university formula** recommended by most colleges:

```
Percentage = CGPA × 9.5
```

**Examples:**

| CGPA | Percentage | Grade |
|------|-----------|-------|
| 10.0 | 95.00% | 🏆 Outstanding |
| 8.5  | 80.75% | 🌟 Distinction |
| 7.0  | 66.50% | 👍 First Class |
| 5.0  | 47.50% | ✅ Pass |
| 3.0  | 28.50% | ⚠️ Below Average |

---

## 💡 Upcoming Ideas

- [ ] Export checklist as PDF
- [ ] Multiple deadline notes with dates
- [ ] Resume score calculator
- [ ] Company application tracker table
- [ ] PWA support (offline use)

---

## 👨‍💻 Developer

<div align="center">

**Ojas Patil**  
📧 [ojaspatil.work@gmail.com](mailto:ojaspatil.work@gmail.com)  

*"Built this tool to help students quickly manage internship applications by converting CGPA, tracking preparation tasks, and organizing deadlines in one simple dashboard."*

---

### 🦸 Built for [Digital Heroes](https://digitalheroesco.com)

[![Digital Heroes](https://img.shields.io/badge/Visit-digitalheroesco.com-6366f1?style=for-the-badge&logo=firefox&logoColor=white)](https://digitalheroesco.com)

</div>

---

<div align="center">

© 2026 Student Internship Application Toolkit · Made with ❤️ for engineering students

</div>
