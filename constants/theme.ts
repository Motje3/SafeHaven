/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#7C6FE0';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#1A1A2E',
    background: '#F0EFFE',
    tint: tintColorLight,
    icon: '#8E8EAA',
    tabIconDefault: '#8E8EAA',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    subtle: '#E8E5FB',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    card: '#1E2022',
    subtle: '#2A2D30',
  },
};

export const LightVault = {
  // Background
  bgTop: '#FFFFFF',
  bgBottom: '#EDE8FD',

  // Glass cards (white frosted)
  glassBase: 'rgba(255, 255, 255, 0.80)',
  glassBorder: 'rgba(255, 255, 255, 0.95)',
  glassShadow: 'rgba(124, 111, 224, 0.12)',

  // Scan CTA card
  ctaColor: '#7C6FE0',
  ctaColorLight: '#9D8FF5',
  ctaShadow: 'rgba(124, 111, 224, 0.40)',

  // Brand
  purple: '#7C6FE0',
  purpleLight: '#A99CF0',
  purpleSoft: 'rgba(124, 111, 224, 0.12)',

  // Text
  textPrimary: '#1A1A2E',
  textSecondary: 'rgba(26, 26, 46, 0.55)',
  textMuted: 'rgba(26, 26, 46, 0.38)',
  textOnPurple: '#FFFFFF',

  // Status
  statusOnline: '#22C55E',
  statusOffline: '#EF4444',
  statusWarning: '#F59E0B',

  // Pastel action card tints
  actionBlue: 'rgba(147, 197, 253, 0.35)',
  actionGreen: 'rgba(134, 239, 172, 0.35)',
  actionYellow: 'rgba(253, 224, 71, 0.40)',
  actionPurple: 'rgba(196, 181, 253, 0.40)',

  // Coin
  coinGold: '#D97706',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
