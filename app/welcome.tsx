import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInUp,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_W } = Dimensions.get('window');

// Brand colours — kept in sync with the onboarding flow (#14342B / #F5C842)
const GREEN_BG = '#14342B';
const GOLD = '#F5C842';

// welkom.png is 252 x 128 (≈ 1.97 : 1)
const LOGO_W = Math.min(SCREEN_W * 0.66, 300);
const LOGO_H = LOGO_W / (252 / 128);

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.content,
          { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 28 },
        ]}
      >
        {/* Logo — hero */}
        <View style={styles.logoSection}>
          <Animated.Image
            source={require('../public/welkom.png')}
            style={styles.logo}
            resizeMode="contain"
            entering={FadeIn.duration(900).delay(150)}
          />
        </View>

        {/* Auth options — rise in under the logo */}
        <Animated.View
          style={styles.bottomSection}
          entering={FadeInUp.duration(700).delay(650).springify()}
        >
          {/* Account aanmaken — primary */}
          <Pressable
            style={({ pressed }) => [styles.ctaButton, pressed && { opacity: 0.9 }]}
            onPress={() => router.push('/onboarding')}
          >
            <Text style={styles.ctaText}>Account aanmaken</Text>
            <Text style={styles.ctaArrow}>→</Text>
          </Pressable>

          {/* Inloggen — secondary */}
          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && { opacity: 0.7 }]}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.secondaryText}>Inloggen</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GREEN_BG,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },

  // Logo
  logoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_W,
    height: LOGO_H,
  },

  // Auth options
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
    paddingBottom: 4,
  },
  ctaButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    backgroundColor: GOLD,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  ctaArrow: {
    fontSize: 16,
    color: 'rgba(15,23,42,0.65)',
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
});
