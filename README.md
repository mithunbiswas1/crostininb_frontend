# LogiCraft IT Platform

A modern, feature-rich logicraftit platform built with Next.js 16, React 19, and Tailwind CSS 4. This application provides a comprehensive online shopping experience with authentication, product management, and secure checkout.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 16 (App Router), React 19, and Tailwind CSS 4
- **Full logicraftit Functionality**: Complete shopping experience from browsing to checkout
- **Authentication System**: Secure user authentication with login, registration, and password recovery
- **Product Management**: Advanced filtering, sorting, and product variations
- **Shopping Cart**: Persistent cart with real-time updates
- **Secure Checkout**: Multiple payment options and order tracking
- **Responsive Design**: Mobile-first responsive design for all devices
- **Performance Optimized**: Fast loading with image optimization and code splitting
- **SEO Friendly**: Built-in SEO optimization for all pages
- **Code Quality**: Integrated linting and formatting with Biome

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (or yarn/pnpm/bun)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd logicraftit
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key

   # Authentication
   NEXT_PUBLIC_AUTH_SECRET=your_auth_secret

   # Payment Gateway
   NEXT_PUBLIC_PAYMENT_GATEWAY_URL=your_payment_gateway_url
   ```

## 🚦 Getting Started

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The page auto-updates as you edit files in the `src` directory.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Start Production Server

After building, start the production server:

```bash
npm start
```

## 📁 Project Structure

```
logicraftit/
├── public/              # Static assets (images, icons, fonts)
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── (auth)/     # Authentication routes
│   │   │   ├── login/
│   │   │   ├── registration/
│   │   │   └── forget-password/
│   │   ├── (checkout)/ # Checkout process
│   │   ├── (user)/     # User account pages
│   │   │   ├── profile/
│   │   │   ├── orders/
│   │   │   ├── favorites/
│   │   │   └── cart/
│   │   ├── products/   # Product-related pages
│   │   │   ├── [slug]/
│   │   │   ├── [category]/
│   │   │   └── [brand]/
│   │   ├── news/       # Blog/news pages
│   │   ├── pages/      # Static pages
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── faq/
│   │   │   └── policy/
│   │   ├── layout.js   # Root layout
│   │   ├── page.js     # Home page
│   │   └── globals.css # Global styles
│   ├── components/     # React components
│   │   ├── layout/     # Layout components
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── Header/
│   │   ├── common/     # Common components
│   │   │   ├── ProductCard/
│   │   │   ├── CategoryCard/
│   │   │   ├── Slider/
│   │   │   └── Breadcrumb/
│   │   ├── sections/   # Page sections
│   │   │   ├── HeroSection/
│   │   │   ├── FeaturedProducts/
│   │   │   ├── ProductShowcase/
│   │   │   └── Testimonials/
│   │   └── ui/         # UI components
│   │       ├── Button/
│   │       ├── Input/
│   │       ├── Card/
│   │       └── Modal/
│   ├── hooks/          # Custom React hooks
│   │   ├── useCart.js
│   │   ├── useAuth.js
│   │   └── useProducts.js
│   ├── lib/            # Utility functions
│   │   ├── api/        # API functions
│   │   ├── utils/      # Helper functions
│   │   └── constants/  # App constants
│   ├── store/          # State management (Redux)
│   │   ├── slices/
│   │   └── store.js
│   └── types/          # TypeScript types
├── biome.json          # Biome configuration
├── components.json     # Component configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies
└── postcss.config.mjs  # PostCSS configuration
```

## 🧰 Available Scripts

| Script           | Description                                       |
| ---------------- | ------------------------------------------------- |
| `npm run dev`    | Start development server on http://localhost:3000 |
| `npm run build`  | Create optimized production build                 |
| `npm start`      | Start production server                           |
| `npm run lint`   | Run Biome linter to check code quality            |
| `npm run format` | Format code with Biome                            |
| `npm test`       | Run tests                                         |

## 📱 Pages & Features

### Common Components

- **Navbar**: Logo, Search, Login, Wishlist, Profile, Cart
- **Footer**: Address section, Copyright & Social links

### Authentication Pages

- **Login** (`/login`): Login form with email/phone options
- **Registration** (`/registration`): Registration form with validation
- **Forget Password** (`/forget-password`): Password recovery via email/phone

### Main Pages

- **Home Page** (`/`): Hero slider, categories, featured products, recommendations
- **Products** (`/products`): Filtering, sorting, pagination
- **Category Products** (`/products/[category]`): Category-specific filtering
- **Brand Products** (`/products/[brand]`): Brand-specific products
- **Product Details** (`/products/[slug]`): Full product info, images, variations, reviews
- **Checkout** (`/checkout`): Shipping, billing, payment options
- **Cart** (`/cart`): Shopping cart management
- **Favorites** (`/favorites`): Saved items list
- **Orders** (`/orders`): Order history and tracking
- **Profile** (`/profile`): User account management

### Content Pages

- **News/Blog** (`/news`): Articles and updates
- **About** (`/pages/about`): Company information
- **Contact** (`/pages/contact`): Contact form and information
- **FAQ** (`/pages/faq`): Frequently asked questions
- **Policy Pages**: Terms, Privacy, Shipping, Return policies

## 🎨 Tech Stack

### Core Framework

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components & Libraries

- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon sets
- **[Embla Carousel](https://www.embla-carousel.com/)** - Lightweight carousel for sliders
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[class-variance-authority](https://cva.style/docs)** - Component variant management
- **[clsx](https://github.com/lukeed/clsx)** - Utility for constructing className strings
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind CSS classes

###
