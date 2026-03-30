import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
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
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

function FloatingIcon() {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2200 }),
        withTiming(0, { duration: 2200 }),
      ),
      -1,
      false,
    );
  }, []);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={floatStyle}
      entering={FadeIn.duration(800).delay(200)}
    >
      {/* Glow ring behind image */}
      <View style={styles.glowRing} />
      <Image
        source={require('../assets/images/t-icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* Background blobs */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.blobTop} />
        <View style={styles.blobMid} />
        <View style={styles.blobBottom} />
      </View>

      {/* Content */}
      <View style={[styles.content, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 32 }]}>

        {/* Icon */}
        <View style={styles.iconSection}>
          <FloatingIcon />
        </View>

        {/* Text block */}
        <View style={styles.textSection}>
          <Animated.Text
            style={styles.appName}
            entering={FadeInDown.duration(600).delay(400).springify()}
          >
            SafeHaven
          </Animated.Text>

          <Animated.Text
            style={styles.tagline}
            entering={FadeInDown.duration(600).delay(520).springify()}
          >
            Your community's lifeline.
          </Animated.Text>
        </View>

        {/* Bottom section */}
        <Animated.View
          style={styles.bottomSection}
          entering={FadeInUp.duration(600).delay(700).springify()}
        >
          {/* CTA Button */}
          <Pressable
            style={({ pressed }) => [styles.ctaButton, pressed && { opacity: 0.88 }]}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.ctaText}>Get Started</Text>
            <Text style={styles.ctaArrow}>→</Text>
          </Pressable>

          <Text style={styles.footerNote}>Power out. Community in.</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Background layers
  blobTop: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: 'rgba(124, 111, 224, 0.10)',
    top: -140,
    left: SCREEN_W / 2 - 210,
  },
  blobMid: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#EDE8FD',
    top: SCREEN_H * 0.45,
    right: -80,
  },
  blobBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(167, 139, 250, 0.08)',
    bottom: -60,
    left: -60,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },

  // Icon
  iconSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(124, 111, 224, 0.10)',
    alignSelf: 'center',
    top: -10,
  },
  icon: {
    width: 200,
    height: 200,
  },

  // Text
  textSection: {
    alignItems: 'center',
    gap: 10,
    paddingBottom: 8,
  },
  appName: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1A1A2E',
    letterSpacing: -1,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(26,26,46,0.50)',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  // Bottom
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingTop: 12,
  },
  ctaButton: {
    width: '100%',
    height: 58,
    borderRadius: 20,
    backgroundColor: '#7C6FE0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: 'rgba(124,111,224,0.60)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 10,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  ctaArrow: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '400',
  },
  footerNote: {
    fontSize: 12,
    color: 'rgba(26,26,46,0.35)',
    textAlign: 'center',
    fontWeight: '500',
  },
});
