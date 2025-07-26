# Santos Travel - Travel Booking EngineA modern travel booking website built with Next.js, TypeScript, and Tailwind CSS. Inspired by the structure and functionality of Veena World, Santos Travel offers a comprehensive platform for booking travel packages across India and worldwide destinations.## Features- **Modern Design**: Clean, responsive design with a focus on user experience- **Tour Packages**: Browse and book packages for India, Europe, Asia, and worldwide destinations- **Search Functionality**: Advanced search with filters for destinations, dates, and travelers- **Customer Reviews**: Testimonials and reviews from satisfied travelers- **Travel Planner**: Interactive tool to plan your perfect trip- **Blog & Podcasts**: Travel insights, tips, and stories- **Responsive**: Mobile-first design that works on all devices## Tech Stack- **Framework**: Next.js 15 with App Router- **Language**: TypeScript- **Styling**: Tailwind CSS- **Icons**: Lucide React- **UI Components**: Headless UI- **Date Handling**: date-fns## Getting Started### Prerequisites- Node.js 18+ - npm or yarn### Installation1. Clone the repository:```bashgit clone <your-repo-url>cd santosking```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
└── components/         # React components
    ├── Header.tsx      # Navigation header
    ├── Footer.tsx      # Site footer
    ├── HeroSection.tsx # Homepage hero
    ├── DestinationSection.tsx
    ├── TourPackages.tsx
    ├── WhyChooseUs.tsx
    ├── TestimonialsSection.tsx
    └── BlogSection.tsx
```

## Key Features

### Navigation
- India tours
- World tours  
- Speciality tours
- Customized holidays
- Corporate travel

### Tour Packages
- Detailed package listings with pricing
- Multiple departure dates
- Customer ratings and reviews
- Easy booking process

### Why Choose Santos Travel
- All-inclusive packages
- Experienced tour managers
- 24/7 customer support
- Best value itineraries
- Trusted by thousands of travelers

## Customization

The website is built with reusable components and can be easily customized:

1. **Colors**: Update the color scheme in `tailwind.config.js`
2. **Content**: Modify data in components for different destinations and packages
3. **Branding**: Replace "Santos Travel" with your brand name throughout the codebase
4. **Features**: Add new sections by creating components and importing them in `page.tsx`

## Deployment

The app can be deployed to any platform that supports Next.js:

- **Vercel** (recommended): Push to GitHub and connect to Vercel
- **Netlify**: Build command: `npm run build`, Publish directory: `.next`
- **Self-hosted**: Run `npm run build` and `npm run start`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, contact us at:
- Email: travel@santos.travel
- Phone: 1800 22 7979

---

Built with ❤️ using Next.js and Tailwind CSS
