// Utility to convert emoji to Twemoji image URL
// This is needed because Windows doesn't natively support flag emojis

export const emojiToTwemojiUrl = (emoji: string): string => {
  const codePoints = [...emoji]
    .map(char => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join('-');
  
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${codePoints}.png`;
};

// Check if an emoji is likely a flag (regional indicators or special flags)
export const isFlagEmoji = (emoji: string): boolean => {
  // Regional indicator symbols range from U+1F1E6 to U+1F1FF
  const firstCodePoint = emoji.codePointAt(0);
  
  // Check for regional indicator (country flags like 🇧🇷)
  if (firstCodePoint && firstCodePoint >= 0x1F1E6 && firstCodePoint <= 0x1F1FF) {
    return true;
  }
  
  // Check for special flags (🏳️, 🏴, 🚩, etc.)
  const flagEmojis = ['🏳️', '🏴', '🏁', '🚩', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🎌'];
  if (flagEmojis.some(flag => emoji.includes(flag.charAt(0)))) {
    return true;
  }
  
  // Check for subdivision flags (like 🏴󠁧󠁢󠁥󠁮󠁧󠁿)
  if (emoji.includes('🏴') && emoji.length > 2) {
    return true;
  }
  
  return false;
};

// A more robust approach - check if the emoji renders correctly
// For now, we'll just use Twemoji for all emojis in the flags category
export const shouldUseTwemoji = (emoji: string, categoryId: string): boolean => {
  return categoryId === 'flags';
};
