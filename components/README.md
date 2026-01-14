# Birthday Website Components

This directory contains reusable components for creating beautiful birthday celebration websites.

## Components

### 🎉 HeroSection
The main hero section with animated birthday greetings.

**Props:**
- `name` (string, optional): Name of the birthday person (default: "Birthday Star")
- `age` (number, optional): Age to display
- `birthdayDate` (string, optional): Birthday date to display (e.g., "15 January")

**Usage:**
```tsx
<HeroSection name="Ahmed" age={25} birthdayDate="15 January" />
```

---

### 📸 MemoryGallery
A beautiful gallery to showcase previous memories and photos.

**Props:**
- `memories` (Memory[], optional): Array of memory objects
  - `id`: Unique identifier
  - `image`: Image URL (optional)
  - `title`: Memory title
  - `description`: Memory description
  - `date`: Date string (optional)

**Usage:**
```tsx
<MemoryGallery 
  memories={[
    {
      id: 1,
      title: "First Birthday",
      description: "Amazing memories!",
      date: "2020"
    }
  ]}
/>
```

---

### 💝 WishesSection
A section displaying birthday wishes and quotes with smooth animations.

**Props:**
- `wishes` (Wish[], optional): Array of wish objects
  - `id`: Unique identifier
  - `quote`: The wish/quote text
  - `author`: Author name (optional)

**Usage:**
```tsx
<WishesSection 
  wishes={[
    {
      id: 1,
      quote: "Happy Birthday!",
      author: "Your Friend"
    }
  ]}
/>
```

---

### 🎁 BirthdayCard
A special card component for personalized messages.

**Props:**
- `message` (string, optional): The birthday message
- `from` (string, optional): Who the message is from

**Usage:**
```tsx
<BirthdayCard 
  message="Wishing you the best!"
  from="Your Family"
/>
```

---

### 🎊 ConfettiAnimation
Animated confetti that falls from the top of the screen.

**Usage:**
```tsx
<ConfettiAnimation />
```

**Note:** This component automatically cleans up after 5 seconds. You can control it with state if needed.

---

### 🎈 FloatingBalloons
Floating balloons animation in the background.

**Usage:**
```tsx
<FloatingBalloons />
```

---

## Customization

All components are fully customizable and can be easily modified to match your design preferences. Simply edit the component files to change colors, animations, or styling.

## Reusability

These components are designed to be reusable across different birthday websites. Simply:
1. Copy the components you need
2. Customize the props
3. Import and use in your pages

Enjoy creating beautiful birthday celebrations! 🎂🎉✨

