# College Website

A modern, dynamic, and fully responsive College Website built with React, TailwindCSS, and Framer Motion for the frontend, and Sanity CMS for managing dynamic content such as announcements, faculty, departments, and events.

## Tech Stack
- **Frontend**: React, React Router
- **Styling**: TailwindCSS, PostCSS
- **Animations**: Framer Motion, Lenis (smooth scrolling)
- **Icons**: Lucide React
- **Backend / CMS**: Sanity Studio

## Project Structure
- `src/` - The React frontend application.
  - `components/` - Reusable UI components and sections.
  - `pages/` - Page-level components used by React Router.
  - `lib/` - Utilities and the Sanity client configuration (`sanity.js`).
  - `data/` - Static fallback data.
- `studio/` - The Sanity CMS application and schema definitions.
- `public/` - Static assets.

## Setup & Installation

### 1. Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### 2. Install Dependencies
Navigate to the root directory and install frontend dependencies:
```bash
npm install
```

### 3. Running the React Frontend Locally
To start the React development server:
```bash
npm start
```
The frontend will run on `http://localhost:3000` by default.

### 4. Running Sanity Studio
To manage the content, you need to run the Sanity Studio.
Navigate to the `studio/` directory:
```bash
cd studio
npm install
npm run dev
```
The studio will run on `http://localhost:3333`.

## Deployment
- **Frontend**: The React app can be built using `npm run build` and deployed to any static host (Vercel, Netlify, or Apache/Nginx).
- **Sanity Studio**: The CMS can be deployed using `npx sanity deploy` within the `studio` folder. Make sure to add your deployed frontend URL to the CORS origins in your Sanity project settings.
