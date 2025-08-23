## Project Folder Structure

For this React component development assignment, I've structured the project with scalability in mind, following best practices for a modern React application. The folder structure is clean, modular, and separates concerns like components, utilities, demos, and documentation. Here's the clear folder structure:

# React Component Library Demo

This project implements two custom React components—InputField and DataTable—as per the assignment specifications. It uses React, TypeScript, TailwindCSS for styling, and Storybook for documentation and interactive previews. The components are built with modern patterns, focusing on flexibility, accessibility, and responsiveness.

## Features
- **InputField**: A versatile text input with variants (filled, outlined, ghost), sizes (sm, md, lg), states (disabled, invalid, loading), and optional features like clear button, password toggle, and theme support.
- **DataTable**: A functional table for displaying data with sorting, row selection (single/multiple), loading states, and empty states.
- Interactive demo application with theme toggling and live examples.
- Storybook integration for component documentation and isolated testing.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/react-components-demo.git
   cd react-components-demo
   ```

2. Install dependencies:
   ```
   npm install
   ```
   This installs React, TypeScript, TailwindCSS, Storybook, and testing libraries like Jest.

3. Start the development server:
   ```
   npm run start
   ```
   The demo app will be available at `http://localhost:3000`.

4. Run Storybook:
   ```
   npm run storybook
   ```
   Access it at `http://localhost:6006` to view isolated component stories and documentation.

5. Build for production:
   ```
   npm run build
   ```

6. Run tests:
   ```
   npm run test
   ```
   Includes basic unit tests for component rendering and interactions.

### Deployment
- For Storybook preview: Deploy using Chromatic or Vercel. Example: Push to a GitHub repo and connect to Vercel for automatic deploys.
- The demo app can be deployed to Vercel or Netlify for a live showcase.

## Description of My Approach

### Overall Strategy
I approached this assignment by first breaking down the requirements into core features, optional enhancements, and non-functional needs (e.g., accessibility, responsiveness). Since the task emphasized scalability, I used a modular structure with TypeScript for type safety and React hooks for state management. TailwindCSS was chosen for utility-first styling to keep things responsive and themeable without excessive custom CSS. Storybook was integrated early to document and test components in isolation, ensuring they work independently before integrating into the demo app.

### Component Development
- **InputField**:
  - Started with the base input element, adding props for customization using TypeScript interfaces.
  - Implemented variants via conditional Tailwind classes (e.g., background fills for 'filled', borders for 'outlined').
  - Added states with visual cues: spinners for loading, red borders for invalid, grayed-out for disabled.
  - Optional features like clear button and password toggle were added using conditional rendering and React state (e.g., `useState` for password visibility).
  - Theme support was handled via CSS variables and a context provider for light/dark modes, toggled globally.
  - Ensured accessibility with ARIA labels (e.g., `aria-invalid`, `aria-describedby` for errors) and keyboard focus handling.

- **DataTable**:
  - Used generics in TypeScript for flexible data handling (`<T>` for props).
  - Implemented sorting with a custom hook (`useSortableData`) that manages state and comparators.
  - Row selection used checkboxes with `useState` for tracking selected items, supporting single/multiple modes via props.
  - Loading state shows skeleton rows with Tailwind animations; empty state renders a centered message.
  - Made it responsive by using mobile-friendly layouts (e.g., stacked columns on small screens) and added ARIA roles (e.g., `role="table"`, `aria-sort` for columns).

### Demo and Documentation
- Built a single-page app with navigation to showcase components interactively, using React state for real-time prop changes.
- Included multiple data sets to demonstrate DataTable versatility.
- Storybook stories cover all variants, states, and edge cases, with controls for interactive testing.
- Added basic Jest tests for snapshot matching and event handling.

### Challenges and Choices
- Balancing optional features: Prioritized core requirements first, then added extras like theme support without overcomplicating the code.
- Performance: Used memoization (e.g., `React.memo`) for DataTable rows to optimize re-renders during sorting/selection.
- Accessibility: Followed WCAG guidelines minimally, focusing on ARIA and keyboard navigation.
- Time management: Completed in the 2-day window by prototyping in Storybook before full integration.

This approach results in reusable, well-documented components ready for production use. For any questions, feel free to reach out!
