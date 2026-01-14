# 🎉 Birthday Celebration Website

A beautiful, animated birthday website built with Next.js, React, and Framer Motion. Features reusable components for creating stunning birthday celebrations with memories, wishes, and lots of animations!

## ✨ Features

- 🎂 **Animated Hero Section** - Eye-catching birthday greeting with smooth animations
- 📸 **Memory Gallery** - Showcase previous memories and photos in a beautiful grid
- 💝 **Wishes Section** - Display birthday quotes and wishes with rotating cards
- 🎁 **Birthday Card** - Personalized message card component
- 🎊 **Confetti Animation** - Falling confetti effect
- 🎈 **Floating Balloons** - Animated balloons in the background
- 🎨 **Modern Design** - Beautiful gradients and smooth transitions
- ♻️ **Component-Based** - Fully reusable components for easy customization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd ahmed_birthday
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Personalize the Birthday Person

Edit `app/page.tsx` to customize:

```tsx
const birthdayPerson = {
  name: 'Ahmed', // Change to birthday person's name
  age: 25,       // Change to their age (optional)
};
```

### Add Your Own Memories

Edit the `MemoryGallery` component or pass custom memories:

```tsx
<MemoryGallery 
  memories={[
    {
      id: 1,
      image: '/path/to/image.jpg', // Optional
      title: 'Memory Title',
      description: 'Description of the memory',
      date: '2024'
    }
  ]}
/>
```

### Customize Wishes

Edit the `WishesSection` component or pass custom wishes:

```tsx
<WishesSection 
  wishes={[
    {
      id: 1,
      quote: 'Your custom wish here!',
      author: 'Your Name'
    }
  ]}
/>
```

## 📁 Project Structure

```
ahmed_birthday/
├── app/
│   ├── page.tsx          # Main page (combines all components)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── HeroSection.tsx       # Hero section with animations
│   ├── MemoryGallery.tsx     # Memory gallery component
│   ├── WishesSection.tsx     # Wishes/quotes section
│   ├── BirthdayCard.tsx      # Birthday card component
│   ├── ConfettiAnimation.tsx # Confetti animation
│   ├── FloatingBalloons.tsx  # Balloon animation
│   └── README.md             # Component documentation
└── public/               # Static assets (images, etc.)
```

## 🧩 Reusable Components

All components are designed to be reusable! Check out `components/README.md` for detailed documentation on each component.

### Quick Component Usage

```tsx
import HeroSection from '@/components/HeroSection';
import MemoryGallery from '@/components/MemoryGallery';
import WishesSection from '@/components/WishesSection';

// Use in your page
<HeroSection name="Name" age={25} />
<MemoryGallery memories={yourMemories} />
<WishesSection wishes={yourWishes} />
```

## 🎯 Key Technologies

- **Next.js 16** - React framework
- **React 19** - UI library
- **Framer Motion** - Animation library
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Features

- Gradient backgrounds
- Smooth scroll animations
- Hover effects
- Responsive design (mobile-friendly)
- Custom scrollbar styling
- Particle effects
- Rotating animations

## 💡 Tips for Reusability

1. **Copy Components**: Simply copy the `components/` folder to your new project
2. **Customize Props**: Each component accepts props for easy customization
3. **Modify Styles**: Update Tailwind classes or add custom CSS
4. **Add Images**: Place images in `public/` folder and reference them
5. **Extend Components**: Add new features by extending existing components

## 🚀 Deployment

Deploy easily on Vercel:

```bash
npm run build
```

Or use Vercel CLI:
```bash
vercel
```

## 📄 License

This project is open source and available for personal use.

## 🎉 Enjoy!

Have fun creating beautiful birthday celebrations! If you need help customizing, check the component documentation in `components/README.md`.

---

Made with ❤️ for special birthday celebrations 🎂✨
