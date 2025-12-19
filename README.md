# Car4You - Car Rental Application

A modern, responsive car rental booking website built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- **Vehicle Selection**: Browse and filter vehicles by category.
- **Real-time Pricing**: Live price updates based on rental duration, insurance, and extras.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Step-by-Step Booking**: Clear progress indication through the booking process.
- **Swiss Localization**: CHF currency and appropriate date handling.

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Lucide React (Icons)

## Getting Started

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Run Development Server**:

    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Project Structure

- `src/components`: Reusable UI components (VehicleCard, PriceSummary, etc.)
- `src/context`: React Context for global state management (BookingContext)
- `src/data`: Mock data for vehicles, insurance, and extras
- `src/pages`: Main application pages (VehicleSelection, RentalDetails, etc.)
- `src/types`: TypeScript definitions

## Design Decisions

- **State Management**: React Context is used to manage the booking state across the multi-step wizard, avoiding prop drilling.
- **Styling**: Tailwind CSS is used for rapid, consistent styling with a custom purple theme.
- **Mobile First**: A fixed bottom bar on mobile ensures the primary action and price are always visible.
