# SignLearn - Frontend

Interactive platform for learning sign language built with Next.js 15, React 19, and TypeScript.

## 🎨 Color Scheme

The project uses a carefully designed color palette optimized for accessibility and visual clarity:

- **Primary**: Blue (`oklch(0.55 0.18 250)`) - Main brand color, used for buttons, links, and primary actions
- **Secondary**: Yellow/Orange (`oklch(0.75 0.15 75)`) - Accent color for highlights and secondary actions
- **Destructive**: Red (`oklch(0.577 0.245 27.325)`) - Error states and destructive actions
- **Muted**: Neutral grays - Backgrounds, borders, and subtle text

All colors are defined in OKLCH color space for better consistency and accessibility. Dark mode is fully supported.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file (see `.env.example`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
client/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── contexts/         # React contexts (Auth, etc.)
├── lib/              # Utilities and API client
├── hooks/            # Custom React hooks
├── public/           # Static assets
└── styles/           # Global styles
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📝 Features

- 🔐 Authentication (Sign In/Up)
- 📚 Dictionary with video demonstrations
- 🔄 Translator (Text-to-Sign / Sign-to-Text)
- 🎮 Practice Games
- 👤 User Profile & Settings
- 🌙 Dark Mode Support
- 📱 Fully Responsive

## 🎯 API Integration

The project uses a centralized API service (`lib/api.ts`) with interceptors for:
- Automatic token injection
- Error handling
- 401 redirect to login

## 🔧 Development

```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## 📦 Key Dependencies

See `package.json` for full list. Main dependencies:
- next, react, react-dom
- tailwindcss, @tailwindcss/postcss
- @radix-ui/* (UI primitives)
- axios (HTTP client)
- framer-motion (animations)
- next-themes (dark mode)
- lucide-react (icons)

## 🌈 Color Usage Guidelines

- Use `text-primary` for primary text accents
- Use `bg-primary` for primary backgrounds
- Use `border-primary` for primary borders
- Always pair with `text-primary-foreground` for text on primary backgrounds
- Use semantic colors: `destructive`, `muted`, `accent`
- Avoid hard-coded colors; use theme variables instead

## 📄 License

ISC

