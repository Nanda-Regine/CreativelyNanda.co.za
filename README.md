# 🎨 Nanda's Portfolio - Creative Technologist

A stunning, animated portfolio website showcasing work at the intersection of technology, creativity, and business.

Built with **Next.js 14**, **Tailwind CSS**, and pure creative energy.

---

## 🌈 Design Philosophy

**"Editorial Technologist"** - Magazine-quality layouts meet tech sophistication.

### Color Palette
- **Navy** (#0A1128) - Deep, sophisticated base
- **Beige** (#E8DCC4) - Warm, elegant neutral
- **Cherry** (#C1292E) - Bold, energetic accent
- **White** (#FEFEFE) - Clean, modern

### Typography
- **Display**: Cormorant Garamond (elegant serif for headers)
- **Body**: Manrope (clean sans-serif for readability)

### Key Features
✨ Smooth scroll animations  
✨ Mobile-responsive (works beautifully on all devices)  
✨ Page transitions with staggered reveals  
✨ Grain texture overlay for depth  
✨ AI chatbot assistant (Nanda AI)  
✨ Custom scrollbar styling  
✨ Hover effects & micro-interactions  

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure
```
portfolio/
├── app/                    # Pages (Next.js App Router)
│   ├── layout.js           # Root layout with nav & footer
│   ├── globals.css         # Global styles & animations
│   ├── page.js             # Home page
│   ├── about/page.js       # About Nanda
│   ├── projects/page.js    # Projects showcase
│   ├── work/page.js        # Work experience
│   ├── education/page.js   # Education & certifications
│   ├── notion/page.js      # Notion systems
│   ├── mirembe/page.js     # Mirembe Muse business
│   ├── poetry/page.js      # Poetry & performances
│   └── contact/page.js     # Contact form
│
├── components/             # Reusable components
│   ├── Navigation.jsx      # Site navigation with mobile menu
│   ├── Footer.jsx          # Site footer
│   └── NandaAI.jsx         # AI chatbot widget
│
├── public/                 # Static assets
│   ├── cv.pdf              # Downloadable CV
│   └── assets/             # Images, icons, etc.
│
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind customization
├── next.config.js          # Next.js configuration
└── .env.local              # Environment variables (API keys)
```

---

## 📄 Pages Built

### ✅ Complete
- **Home** - Hero section + quick links grid
- **About** - Bio, skills, values, philosophy
- **Projects** - Filterable project showcase (True Access, CreativelyNanda, VisionBoard Pro, PoetryTube, Notion templates)
- **Work Experience** - Full career timeline with highlights
- **Education** - Nelson Mandela University degrees + technical certifications
- **Notion Systems** - Template products + custom system design
- **Mirembe Muse** - Multi-vertical business showcase (wellness, digital, studio)
- **Poetry & Performances** - "Inside Her Roses" book + TV features + community work
- **Contact** - Contact form + social links + services

### 🎯 Components
- **Navigation** - Responsive nav with mobile menu
- **Footer** - Multi-column footer with links
- **Nanda AI** - Chatbot widget (placeholder - connect OpenAI API)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | CSS Animations + Framer Motion |
| **Fonts** | Google Fonts (Cormorant Garamond, Manrope) |
| **Hosting** | Vercel (recommended) |
| **AI Integration** | OpenAI API (for chatbot) |

---

## 🎨 Responsive Design

This portfolio is **fully mobile-responsive**:
- Mobile-first Tailwind approach
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Touch-friendly buttons & navigation
- Optimized typography for all screen sizes
- Mobile hamburger menu

Test on different devices for best experience!

---

## 🤖 Nanda AI Chatbot Setup

The chatbot is currently a **placeholder**. To make it fully functional:

1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Add to `.env.local`:
```
   NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
```
3. Update `components/NandaAI.jsx` with API integration
4. Example implementation:
```javascript
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       model: 'gpt-4',
       messages: messages,
     }),
   });
```

---

## 📝 Content Customization

### Add Your Own Content

1. **Projects**: Update `app/projects/page.js` - add your projects array
2. **Work**: Update `app/work/page.js` - add your experiences
3. **Education**: Already has your NMU degrees + certifications
4. **Images**: Add to `public/assets/` and reference in components
5. **CV**: Replace `public/cv.pdf` with your actual CV
6. **Social Links**: Update in `components/Footer.jsx` and `app/contact/page.js`

### Update Colors/Fonts

Edit `tailwind.config.js`:
```javascript
colors: {
  navy: { DEFAULT: '#YourColor' },
  // ... etc
},
fontFamily: {
  display: ['YourFont', 'serif'],
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (OpenAI API key, etc.)
5. Deploy!

Vercel auto-deploys on every push to main branch.

### Other Options
- **Netlify**: Works great with Next.js
- **Railway**: Good for full-stack apps
- **Self-hosted**: Use `npm run build` + `npm start`

---

## 📊 Performance

Target metrics:
- ✅ Lighthouse Performance: 95+
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 100

Optimizations included:
- Image optimization (Next.js Image component ready)
- Font preloading
- CSS minification
- Code splitting
- Lazy loading

---

## 📝 Git Workflow & Commit Messages

Use these commit patterns for clean GitHub history:
```bash
# Initial setup
git init
git add .
git commit -m "feat: initialize Next.js portfolio with custom design system"

# Adding content
git commit -m "content: add real work experience timeline"
git commit -m "content: populate projects with case studies"
git commit -m "content: add poetry book showcase"

# Features
git commit -m "feat: add AI chatbot component"
git commit -m "feat: implement mobile navigation menu"
git commit -m "feat: add contact form validation"

# Styling
git commit -m "style: enhance project card hover animations"
git commit -m "style: improve mobile responsive layouts"
git commit -m "style: add gradient backgrounds to hero section"

# Fixes
git commit -m "fix: resolve navigation z-index issue"
git commit -m "fix: correct mobile menu overlay"

# Refactoring
git commit -m "refactor: optimize component structure"
git commit -m "refactor: improve code organization"
```

---

## 🎯 Next Steps

### Phase 1: Content ✅ (Current)
- ✅ All pages built with real content
- ✅ Responsive design implemented
- ✅ Animations & interactions working

### Phase 2: Enhancement (Next 24-48h)
- [ ] Connect OpenAI API to chatbot
- [ ] Add real project images
- [ ] Replace placeholder CV
- [ ] Add social media links
- [ ] Set up contact form backend

### Phase 3: Polish (48-72h)
- [ ] Performance optimization
- [ ] SEO meta tags
- [ ] Analytics integration
- [ ] Browser testing
- [ ] Final deployment

---

## 💡 Tips

**Development:**
- Use `npm run dev` for hot-reload during development
- Check browser console for errors
- Test on mobile devices early and often

**Content:**
- Keep images under 500KB for performance
- Use WebP format for images when possible
- Write alt text for accessibility

**Deployment:**
- Test production build locally first: `npm run build && npm start`
- Set environment variables in hosting platform
- Enable custom domain in hosting settings

---

## 🆘 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
```

**Styles not loading?**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**Module not found?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📧 Contact

**Nanda**  
Creative Technologist  
📍 Port Elizabeth, South Africa  
✉️ hello@creativelynanda.co.za  

---

## 📜 License

© 2025 Nanda. All rights reserved.

---

**Built with ❤️, React, and a lot of coffee**

*"Technology should amplify humanity, not replace it."*