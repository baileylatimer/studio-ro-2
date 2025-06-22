# STUDIO–RO® Website

A modern dance practice website built with Remix, Sanity CMS, and Tailwind CSS. This is a rebuild of the original Gatsby site with enhanced features for class booking and content management.

## Tech Stack

- **Frontend Framework**: Remix
- **CMS**: Sanity
- **Styling**: Tailwind CSS
- **Animations**: GSAP (ready to implement)
- **Hosting**: Netlify
- **Future Integrations**: Stripe (payments), Instagram automation

## Project Structure

```
studio-ro-2/
├── app/                    # Remix application
│   ├── components/        # React components
│   ├── routes/           # Page routes
│   ├── styles/           # CSS files
│   ├── lib/              # Utility functions
│   └── fonts/            # Custom fonts
├── sanity-studio/        # Sanity CMS studio
│   └── schemas/          # Content schemas
├── public/               # Static assets
└── build/               # Production build (generated)
```

## Features

### Current Features
- ✅ Responsive design matching original site aesthetic
- ✅ Hero video section with overlay text
- ✅ Showreel gallery with video previews
- ✅ About page with image and text content
- ✅ Contact page with phone/email links
- ✅ Multi-language support (English/Spanish ready)
- ✅ Sanity CMS for content management

### Future Features (Ready to Implement)
- 📲 Instagram integration for class announcements
- 💳 Stripe payment integration for class bookings
- 📧 Email confirmations for bookings
- 📅 Class scheduling system
- 🎯 Landing page at `/book` for Instagram traffic

## Setup Instructions

### 1. Clone and Install

```bash
# Clone the repository
git clone [repository-url]
cd studio-ro-2

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required variables:
- `SANITY_PROJECT_ID`: Your Sanity project ID
- `SANITY_DATASET`: Usually "production"

### 3. Sanity Setup

```bash
# Navigate to Sanity studio
cd sanity-studio

# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# Initialize Sanity (if new project)
sanity init

# Deploy Sanity Studio
sanity deploy
```

### 4. Run Development Server

```bash
# From root directory
npm run dev
```

The site will be available at `http://localhost:3000`

### 5. Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

## Content Management

### Accessing Sanity Studio

1. Local: Run `npm run sanity` and visit `http://localhost:3333`
2. Deployed: Visit `https://[your-project-name].sanity.studio`

### Content Types

1. **Site Settings**
   - Hero video and description
   - About page content
   - Contact information
   - Social media links

2. **Showreel Videos**
   - Title and description
   - Cover video (preview)
   - Main video
   - Tags (heels, commercial)
   - Teacher and location info

3. **Classes** (for future booking system)
   - Class details
   - Schedule
   - Pricing
   - Instructor info

## Instagram Integration Flow

The site is prepared for Instagram-driven class bookings:

1. Post on Instagram with call-to-action
2. Auto-DM sends link to `rocio.dance/book`
3. User lands on booking page
4. Selects class date/time
5. Pays via Stripe
6. Receives email confirmation

## Development Notes

### Adding New Routes

Create new files in `app/routes/`:
```typescript
// app/routes/new-page.tsx
export default function NewPage() {
  return <Layout>...</Layout>
}
```

### Modifying Styles

- Global styles: `app/styles/tailwind.css`
- Component styles: Use Tailwind utility classes
- Custom animations: Ready for GSAP integration

### Working with Sanity

1. Add new schemas in `sanity-studio/schemas/`
2. Import in `sanity-studio/schemas/index.ts`
3. Deploy schema changes: `sanity deploy`

## Troubleshooting

### Common Issues

1. **TypeScript errors**: Run `npm install` to ensure all dependencies are installed
2. **Sanity connection**: Check environment variables are set correctly
3. **Build errors**: Clear cache with `rm -rf .cache build`

### Support

For issues or questions, please contact the development team.

## License

© 2024 STUDIO–RO®. All rights reserved.
