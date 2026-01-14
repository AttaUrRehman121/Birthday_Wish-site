/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: Date, currentDate: Date = new Date()): number {
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Check if today is the birthday
 */
export function isBirthdayToday(birthDate: Date, currentDate: Date = new Date()): boolean {
  return (
    currentDate.getMonth() === birthDate.getMonth() &&
    currentDate.getDate() === birthDate.getDate()
  );
}

/**
 * Format date to readable string
 */
export function formatBirthdayDate(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long' 
  });
}

/**
 * Format full date with year
 */
export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });
}

