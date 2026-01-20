// Utility to convert emoji to Twemoji image URL
// Handles ZWJ sequences and variation selectors correctly

export const emojiToTwemojiUrl = (emoji: string): string => {
  const codePoints: string[] = [];
  
  for (const char of emoji) {
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) continue;
    
    // Skip variation selector (FE0F) - Twemoji URLs don't include it
    if (codePoint === 0xFE0F) continue;
    
    codePoints.push(codePoint.toString(16));
  }
  
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${codePoints.join('-')}.png`;
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
