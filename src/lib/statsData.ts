import * as LucideIcons from "lucide-react";
import { emojiCategories } from "./emojiData";
import { fontStyles } from "./unicodeFonts";

// Get icons count from lucide-react
const getIconsCount = (): number => {
  const excludeList = new Set([
    'createLucideIcon',
    'default',
    'icons',
    'createElement',
    'LucideIcon',
    'dynamicIconImports',
    'Icon',
  ]);
  
  let count = 0;
  for (const [name, component] of Object.entries(LucideIcons)) {
    if (excludeList.has(name)) continue;
    if (!/^[A-Z]/.test(name)) continue;
    if (typeof component === 'function' || 
        (typeof component === 'object' && component !== null && '$$typeof' in component)) {
      count++;
    }
  }
  return count;
};

// Get emojis count
const getEmojisCount = (): number => {
  return emojiCategories.reduce((acc, cat) => acc + cat.emojis.length, 0);
};

// Material Design colors count (19 palettes × 10 shades)
const COLORS_COUNT = 190;

// Google Fonts count (approximate - can be dynamic from API)
const FONTS_COUNT = 1907;

// Insta styles count
const getInstaStylesCount = (): number => {
  return fontStyles.length;
};

export const getStatsData = () => ({
  fonts: FONTS_COUNT,
  icons: getIconsCount(),
  emojis: getEmojisCount(),
  colors: COLORS_COUNT,
  instaStyles: getInstaStylesCount(),
});
