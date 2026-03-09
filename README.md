# Finance Dashboard

A modern, responsive, and visually engaging frontend finance management dashboard built with React and Vite. This application allows users to effortlessly track their balances, monitor spending habits top categories, manage budgets, and record transactions in one centralized, beautiful interface.

## 🚀 Live Demo
<!-- [Add a link to the live demo here once deployed, e.g., https://your-project.vercel.app] -->
*Pending Deployment*

---

## 💡 What I Built & Why

I built a completely client-side personal finance dashboard. The goal was to create an experience that feels premium, lightning-fast, and highly interactive without the immediate need for a complex backend. 

**Key Choices Made:**
- **React & Vite:** Chosen for fast development cycles, hot module replacement, and efficient component-based architecture.
- **Client-Side Storage (State/Local):** To ensure privacy and immediate responsiveness, data is processed locally. We use robust JavaScript Date parsing to avoid timezone-shifting bugs when users log transactions across different geographies.
- **Custom CSS:** Avoided heavy UI libraries in favor of pure, modern CSS (using CSS variables, specific clamp() functions for fluid typography, and flex/grid layouts) to maintain complete control over the application's unique "Financery" aesthetic and guarantee pixel-perfect responsiveness.

---

## ✨ Features

- **Dynamic Balance Tracking:** Live calculations of total income, expenses, and current balances based on transaction history.
- **Interactive Balance Chart:** A responsive bar chart with a functional month-filter and enhanced hover states to visualize spending vs. income over time.
- **Categorized Spending:** A "Top Categories" donut chart utilizing hierarchical blue shading to instantly highlight the highest areas of expenditure.
- **Budget Management:** A visual gauge to track total spending against daily, weekly, monthly, or yearly budget goals.
- **Transaction History:** A fully sortable and filterable transaction table with distinct visual tags for Success, Pending, and Failed statuses.
- **Fully Responsive:** Fluidly adapts from desktop monitors down to mobile screens without breaking layouts or truncating data.

---

## 🛠️ Built With

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
- **Icons:** [Font Awesome](https://fontawesome.com/)

---

## ⏳ Time Spent

**Duration:** Approximately **68 hours** 
*(Started: March 6th, 7:00 PM — Ended: March 9th, 3:00 PM)*

---

## 🧗 Challenges Faced

The most significant challenge during this project was **picking out the perfect layout for the dashboard**. 

A dashboard requires visualizing an immense amount of data concurrently without overwhelming the user. Balancing the visual hierarchy between the chart, the metric cards, the recent transactions table, and the top categories while ensuring they all aligned elegantly across different screen sizes required extensive iteration and CSS grid tuning.

---

## 📈 Future Improvements

While the core functionality is solid, I plan to improve the following over time:
- **Font & Typography Selection:** Exploring premium web fonts to give the dashboard an even more high-end, institutional feel.
- **Color Selection:** Refining the color palette, perhaps introducing an optimized Dark Mode.
- **Responsiveness:** Further tweaking the mobile breakpoints to ensure absolutely flawless navigation on very small screens.
- **Overall Design Refinements:** Adding more micro-interactions, animations, and polishing empty states.

---

## 💻 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/emmanuelryann/finance-tracker.git
   cd finance-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to view the dashboard.
