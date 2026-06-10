# 🌊 Deep Dive Portfolio

An immersive, 3D underwater-themed portfolio showcasing computer science projects, academic telemetry, and photography. Built with React, React Three Fiber (R3F), Vite, Three.js, and Tailwind CSS.

---

## ✨ Features

- **Immersive 3D Environment**: A real-time WebGL underwater scene featuring a floating submarine, dynamic caustics, and bubble particles.
- **Volumetric SVG Sunrays**: Smooth, high-performance caustics and light rays that ripple and bend, creating a realistic underwater feel.
- **Depth Telemetry**: A custom sidebar interface tracking your scroll position and simulated water depth as you dive through sections.
- **Academic Profile**: Grid showcasing coursework, academic history, and certificates.
- **Surface Interval**: Photography showcase highlighting hobbies between dives.
- **Sound Design**: Toggleable ambient underwater soundscape.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/) + [Drei](https://github.com/pmndrs/drei)
- **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   The static build files will be output to the `/dist` directory.
