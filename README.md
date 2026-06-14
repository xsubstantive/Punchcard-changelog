# Changelog Template

A minimal changelog template built using Next.js. Used to showcase product releases, features, and bug fixes in chronological order.

## Features

- ✨ **Timeline Design** - Visual timeline with dates and versions
- 🌙 **Dark Mode** - Automatic theme switching
- 📱 **Responsive** - Optimized for all devices
- 🔄 **MDX Support** - Write changelog entries in MDX
- ⚡ **Fast** - Built with Next.js 15 and React Server Components

## Project Structure

```
changelog-template/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── metadata.ts
│   └── opengraph-image.tsx
├── changelog/content/      # MDX changelog entries
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/                    # Utilities
├── public/                 # Static assets
├── mdx-components.tsx      # MDX component overrides
└── source.config.ts        # Fumadocs configuration
```

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Run development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Adding Changelog Entries

Create a new MDX file in `changelog/content/` with format `YYYY-MM-DD.mdx`:

```mdx
---
title: "Your Update Title"
description: "Brief description"
date: "2025-06-15"
tags: ["Feature", "Bug Fix"]
version: "1.2"
---

Your changelog content here...
```

## Scripts

- `pnpm dev` - Development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linting

## Tech Stack

- **Framework**: Next.js 15
- **Content**: Fumadocs MDX
- **Styling**: Tailwind CSS
- **UI**: shadcn/ui components
- **TypeScript**: Full type safety

## Deployment

Deploy to any Next.js compatible platform:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

## License

MIT License 
