# Quote Generator App

A modern, responsive web app built with Next.js that lets users generate and discover inspirational quotes by topic or at random. The app sources quotes from a local dataset and external APIs (DummyJSON, ZenQuotes), and includes features such as theme toggling, easy sharing, and robust error handling.

## Live Demo

- [Production Deployment](https://nexium-shahriyar.vercel.app/)

## Features

- **Topic-Based Search:** Enter a topic (e.g., "success") to find relevant quotes from the local dataset.
- **Random Quotes:** Get random quotes from DummyJSON or ZenQuotes APIs if no topic is provided or no matches are found.
- **Dark/Light Mode:** Toggle between light and dark themes. Preferences are saved in local storage.
- **Copy & Share:** Easily copy quotes to your clipboard or use the Web Share API (with clipboard fallback).
- **Responsive Design:** Optimized for all devices using Tailwind CSS and DaisyUI.
- **Accessible UI:** Built with ARIA labels and keyboard navigation support.
- **Robust Error Handling:** Gracefully falls back to alternative APIs or error messages when needed.

## Tech Stack

- **Framework:** Next.js 15.3.5
- **Language:** TypeScript
- **Styling:** Tailwind CSS, DaisyUI
- **UI Components:** shadcn/ui (`Button`, `Input`)
- **Icons:** Lucide React
- **Toasts:** Sonner
- **Fonts:** Inter (via `next/font/google`)
- **APIs:** DummyJSON, ZenQuotes
- **Deployment:** Vercel

## Project Structure

```
quote-generator-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
├── components/
│   ├── QuoteForm.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── use-toast.tsx
├── data/
│   ├── quotes.json
├── lib/
│   ├── utils.ts
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
```

## Getting Started

### Prerequisites

- **Node.js:** v22 or newer
- **npm:** v10 or newer
- **Git:** For cloning the repository

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SherryCodes911/Nexium_Shahriyar.git
   cd quote-generator-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint

## Usage

- **Search Quotes:** Enter a topic (e.g., "success", "life") to filter quotes. Leave blank for a random quote.
- **Theme Toggle:** Click the moon/sun icon in the header to switch between dark and light modes.
- **Copy & Share:** Use the "Copy" button to copy a quote, or "Share" to use the Web Share API (with clipboard fallback).

## Deployment

The app is deployed on Vercel: [https://nexium-shahriyar.vercel.app/](https://nexium-shahriyar.vercel.app/)

To deploy your own:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   Follow the prompts to complete deployment.

## Roadmap

- Save favorite quotes to local storage
- Add loading skeletons for improved UX
- Visualize quote trends with Chart.js
- Integrate more quote APIs
- Add offline support with service workers

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [DummyJSON](https://dummyjson.com/)
- [ZenQuotes](https://zenquotes.io/)
- [Vercel](https://vercel.com/)

---

For questions or feedback, please open an issue on GitHub or contact: shahriyar.global@gmail.com
