# Spy Cat Dashboard

A Next.js frontend application for managing a spy cat agency. This dashboard provides a modern interface for tracking field agents, their missions (if applicable), and managing agency operations.

## Stack

- **Framework**: Next.js 15.5.9
- **Library**: React 19
- **Styling**: TailwindCSS 3.4
- **Formatting**: ESLint 9, Prettier

## Prerequisites

Before starting, ensure the [Spy Cat Agency Backend](https://github.com/dmitrysdevfs/spy-cat-backend) is running at `http://localhost:8000`.

## Getting Started

1. **Clone the repository** and install dependencies:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory and copy the contents from `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## API Proxy Configuration

To prevent CORS issues and hide the backend URL from the browser, the application uses Next.js Rewrites as a proxy.

- **Frontend Endpoint**: `/api/backend`
- **Internal Destination**: `http://127.0.0.1:8000/api`

The proxy is configured in `next.config.mjs` and includes a trailing slash fix to ensure compatibility with Django Rest Framework's redirect logic.

## Scripts

- `npm run dev` — starts the development server with Hot Reloading.
- `npm run build` — creates an optimized production build.
- `npm run start` — starts the production server with the pre-built application.
- `npm run lint` — runs ESLint to check for code quality and style issues.

## Deployment

The project is optimized for deployment on the **Vercel** platform:
1. Connect your repository to the Vercel dashboard.
2. Configure environment variables (`NEXT_PUBLIC_API_BASE_URL` and `API_SERVER_URL`) in the project settings.
3. The project will automatically deploy on every push to the `main` branch.

## Project Structure

- `src/app/`: Next.js App Router and global styles.
- `src/components/`: Reusable UI components (CatForm, CatList).
- `src/lib/`: API client and utility functions.
- `public/`: Static assets and icons.
