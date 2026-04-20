# Robert Himam — Personal Website

Personal website and portfolio of **Mochammad Robbitul Himam**, Backend / Fullstack Engineer with 8+ years of experience building scalable microservices and high-performance APIs.

🌐 **Live:** [roberthimam.vercel.app](https://roberthimam.vercel.app)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Language:** TypeScript
- **Deployment:** Vercel

## Features

- Responsive design — mobile, tablet, desktop
- Sticky navbar with scroll-aware frosted glass effect
- Framer Motion scroll-triggered animations
- Live local time (WIB)
- Portfolio project cards with tech stack tags
- Resume sections: Experience, Achievements, Skills, Contact

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mateo-cv/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── Section.tsx
│       ├── ExperienceCard.tsx
│       ├── Tag.tsx
│       └── StatusBar.tsx
├── lib/
│   ├── data.ts        # All CV content
│   └── animations.ts  # Framer Motion variants
└── public/
    └── robert.png
```

## Customization

All content is centralized in `lib/data.ts` — edit your name, role, experience, projects, skills, and contact info there without touching any components.

## License

MIT