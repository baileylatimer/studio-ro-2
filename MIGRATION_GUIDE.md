# Migration Guide: Gatsby to Remix

This guide outlines the steps to migrate from the existing Gatsby site to the new Remix + Sanity setup.

## Overview of Changes

### Tech Stack Migration
- **From**: Gatsby + No CMS
- **To**: Remix + Sanity CMS + Future booking capabilities

### Key Improvements
1. **Content Management**: All content now managed through Sanity CMS
2. **Performance**: Faster builds and better runtime performance with Remix
3. **Scalability**: Ready for booking system integration
4. **Developer Experience**: Modern tooling and easier maintenance

## Migration Steps

### 1. Content Migration

#### Videos
The original site has videos in `src/videos/`. These need to be:
1. Uploaded to a CDN or cloud storage (e.g., Cloudinary, AWS S3)
2. Added to Sanity as Showreel entries with proper metadata

#### Images
- About page image (`src/images/ro-about.jpg`)
- Upload to Sanity and link in Site Settings

#### Text Content
- Hero description
- About page text
- Contact information
- All currently hardcoded - needs to be added to Sanity

### 2. Sanity Setup

1. Create a new Sanity project:
```bash
cd sanity-studio
sanity init
# Choose: Create new project
# Dataset: production
```

2. Deploy Sanity Studio:
```bash
sanity deploy
# Choose a unique hostname for your studio
```

3. Get your project ID from `sanity.json` and add to `.env`:
```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
```

### 3. Content Entry in Sanity

#### Site Settings (One-time setup)
1. Go to your Sanity Studio
2. Create Site Settings document with:
   - Hero video URL
   - Hero description (English/Spanish)
   - Home about description
   - About page image
   - About page text (array of paragraphs)
   - Contact info (US phone, ES phone, email)
   - Social media links

#### Showreel Videos
For each video, create a Showreel entry:
- Title
- Description
- Cover video URL (preview)
- Main video URL (full video)
- Tag: "heels" or "commercial"
- Teacher name
- Location

### 4. Domain & Hosting

#### Netlify Setup
1. Connect your GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Environment variables:
   - Add `SANITY_PROJECT_ID`
   - Add `SANITY_DATASET`

#### Domain Configuration
- Point `rocio.dance` to Netlify
- Set up SSL certificate (automatic with Netlify)

### 5. Testing Checklist

Before going live, verify:
- [ ] All pages load correctly
- [ ] Videos play properly
- [ ] Navigation works on mobile/desktop
- [ ] Contact links work
- [ ] Showreel filtering works
- [ ] Fonts display correctly
- [ ] Responsive design matches original

### 6. Future Enhancements

The new site is prepared for:
1. **Instagram Integration**
   - ManyChat webhook endpoint ready at `/api/instagram`
   - Auto-DM flow configuration

2. **Booking System**
   - `/book` page ready for Stripe integration
   - Class schema in Sanity ready for content

3. **Email Notifications**
   - Environment variables ready for email service
   - Webhook handlers can be added to `/api/`

## Rollback Plan

If issues arise:
1. Keep the old Gatsby site deployed on a subdomain
2. DNS can be switched back quickly
3. All content in Sanity is preserved

## Support

For migration assistance:
- Sanity documentation: https://www.sanity.io/docs
- Remix documentation: https://remix.run/docs
- Check the README.md for development setup

## Timeline

Estimated migration time:
- Sanity setup: 1 hour
- Content migration: 2-3 hours
- Testing: 1-2 hours
- DNS switch: 30 minutes

Total: ~1 day with buffer time
