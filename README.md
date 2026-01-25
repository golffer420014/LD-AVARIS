# LD AVARIS - Premium Manpower Solutions

A high-end, multi-language corporate website built for **LD AVARIS**, a leading manpower and recruitment agency. This project focuses on delivering a premium user experience with modern aesthetics and seamless internationalization.

## 🚀 Tech Stack

- **Framework**: [Astro 5](https://astro.build/) - The web framework for content-driven websites.
- **UI Engine**: [Vue 3](https://vuejs.org/) - Powering interactive components.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utilizing the latest Vite-based styling engine.
- **Icons**: [Lucide Vue Next](https://lucide.dev/guide/packages/lucide-vue-next) - Clean and consistent iconography.
- **i18n**: Custom multi-language implementation (Thai/English).
- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime & package manager.

## 💡 Key Concepts

### 1. Internationalization (i18n)
The project features a robust i18n system defined in `src/i18n/`. It supports automatic routing and language switching between Thai (`th`) and English (`en`).

### 2. Premium Design System
The UI is built with a minimalist, high-end aesthetic, focusing on:
- **Clean Typography**: Optimized for both Thai and Latin characters.
- **Responsive Layouts**: Seamless experience across mobile and desktop.
- **Interactive Components**: Powered by Vue islands for optimal performance.

### 3. Service-Oriented Modules
The application is modularized into several key sections:
- **Workforces**: Showcasing available manpower categories.
- **Clients**: Demonstrating global reach and trust.
- **Contact**: Integrated contact details with social media connectivity.

## 📁 Project Structure

```text
/
├── src/
│   ├── assets/       # Images, icons, and global styles
│   ├── components/   # Vue & Astro components
│   ├── i18n/         # Translation files and logic
│   ├── layouts/      # Base page layouts
│   └── pages/        # Astro routes and page content
├── public/           # Static assets
└── astro.config.mjs  # Astro configuration
```

## 🛠️ Development

### Prerequisites
- [Bun](https://bun.sh/) installed on your machine.

### Commands
| Command | Action |
| :--- | :--- |
| `bun install` | Install dependencies |
| `bun run dev` | Start local development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |

---
*Developed with ❤️ for LD AVARIS.*
