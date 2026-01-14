'use client';

import { useState, useEffect } from 'react';
import IntroOverlay from '@/components/IntroOverlay';
import HeroSection from '@/components/HeroSection';
import MemoryGallery from '@/components/MemoryGallery';
import SecretDiary from '@/components/SecretDiary';
import WishesSection from '@/components/WishesSection';
import BirthdayCard from '@/components/BirthdayCard';
import ConfettiAnimation from '@/components/ConfettiAnimation';
import FloatingBalloons from '@/components/FloatingBalloons';
import SprinkleAnimation from '@/components/SprinkleAnimation';
import { calculateAge, isBirthdayToday, formatBirthdayDate, formatFullDate } from '@/utils/birthdayUtils';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSprinkles, setShowSprinkles] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);

  // Birthday information
  const birthDate = new Date(2001, 0, 15); // January 15, 2001 (month is 0-indexed)
  // Use new Date() for real-time, or set a specific date for testing
  // Set to 2026 birthday so age displays as 25
  const currentDate = new Date(2026, 0, 15);
  
  // Calculate age and check if today is birthday
  const age = calculateAge(birthDate, currentDate);
  const isTodayBirthday = isBirthdayToday(birthDate, currentDate);
  const birthdayDateFormatted = formatBirthdayDate(birthDate);
  const fullBirthDate = formatFullDate(birthDate);

  useEffect(() => {
    // On first load, keep confetti off until user "enters" (like the reference site).
    setShowConfetti(false);
  }, []);

  // Customize these props for the birthday person
  const birthdayPerson = {
    name: 'Ahmed',
    age: age,
    birthdayDate: birthdayDateFormatted,
    fullBirthDate: fullBirthDate,
    isTodayBirthday: isTodayBirthday,
  };

  return (
    <main className="min-h-screen">
      <IntroOverlay
        open={introOpen}
        title={`Happy Birthday ${birthdayPerson.name}💗`}
        subtitle="Click to enter the celebration — memories, wishes, and surprises are waiting."
        buttonText="Click to Enter Our World 💕"
        onEnter={() => {
          setIntroOpen(false);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), birthdayPerson.isTodayBirthday ? 10000 : 5000);
          // ensure we're at the top for the hero
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Animated Background Elements */}
      <FloatingBalloons />
      {showConfetti && <ConfettiAnimation />}
      {showSprinkles && <SprinkleAnimation />}

      {/* Main Sections */}
      <HeroSection 
        name={birthdayPerson.name} 
        age={birthdayPerson.age}
        birthdayDate={birthdayPerson.birthdayDate}
        isTodayBirthday={birthdayPerson.isTodayBirthday}
        onCelebrateClick={() => {
          // Show sprinkle animation
          setShowSprinkles(true);
          setTimeout(() => setShowSprinkles(false), 8000); // Longer duration for realistic animation
          
          // Scroll to wishes section (after a short delay to see sprinkles)
          setTimeout(() => {
            const wishesSection = document.getElementById('wishes');
            if (wishesSection) {
              wishesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 500);
        }}
      />
      <MemoryGallery />
      {/* <SecretDiary password="1501" /> */}
      <WishesSection />
      <BirthdayCard 
        message="On this special day, we celebrate you and all the joy you bring into our lives. May this year be filled with amazing adventures, wonderful opportunities, and countless moments of happiness. You deserve all the love and celebration in the world!"
        from="Everyone Who Loves You"
      />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 text-center px-4">
        <p className="text-base sm:text-lg">
          Made with ❤️ for a special birthday celebration
        </p>
        <p className="text-base sm:text-lg mt-2 font-semibold">
          {birthdayPerson.isTodayBirthday 
            ? '🎉 Today is your birthday! 🎉' 
            : `Celebrating on ${birthdayPerson.birthdayDate}`}
        </p>
        <p className="text-xs sm:text-sm mt-2 opacity-80">© 2025 Birthday Wishes</p>
      </footer>
    </main>
  );
}
