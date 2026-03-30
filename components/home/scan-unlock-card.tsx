import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { LightVault } from '@/constants/theme';

export function ScanUnlockCard() {
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.6);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 1400, easing: Easing.out(Easing.quad) }),
        withTiming(1.0, { duration: 1400, easing: Easing.in(Easing.quad) }),
      ),
      -1,
      false,
    );
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1400, easing: Easing.out(Easing.quad) }),
        withTiming(0.6, { duration: 1400, easing: Easing.in(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const handlePressIn = () => {
    cardScale.value = withSpring(0.97, { damping: 20, stiffness: 300 });
  };

  const handlePressOut = () => {
    cardScale.value = withSpring(1.0, { damping: 20, stiffness: 300 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // TODO: Navigate to scan screen or trigger QR scanner
  };

  return (
    <View style={styles.wrapper}>
      {/* Pulsing outer glow ring */}
      <Animated.View style={[styles.pulseRing, pulseStyle]} pointerEvents="none" />

      {/* Card */}
      <Animated.View style={pressStyle}>
        <Pressable
          style={styles.card}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
        >
          {/* Inner top-edge highlight */}
          <View style={styles.topHighlight} />

          {/* Lighter overlay on right half */}
          <View style={styles.rightOverlay} />

          {/* Left content */}
          <View style={styles.leftContent}>
            {/* Label */}
            <View style={styles.labelRow}>
              <View style={styles.activeDot} />
              <Text style={styles.smallLabel}>UNLOCK CLOSET</Text>
            </View>

            {/* Main text */}
            <View style={styles.mainText}>
              <Text style={styles.scanTo}>Scan to</Text>
              <Text style={styles.open}>Open</Text>
            </View>

            {/* Hint */}
            <View style={styles.hintRow}>
              <MaterialIcons name="sensors" size={15} color="rgba(255,255,255,0.55)" />
              <Text style={styles.hintText}>Tap to connect</Text>
            </View>
          </View>

          {/* Right QR area */}
          <View style={styles.rightContent}>
            <View style={styles.qrFrame}>
              <MaterialIcons name="qr-code-scanner" size={44} color="rgba(255,255,255,0.90)" />
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 28,
    marginHorizontal: 24,
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    inset: -10,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: LightVault.purple,
    backgroundColor: 'transparent',
  },
  card: {
    height: 190,
    borderRadius: 28,
    backgroundColor: LightVault.ctaColor,
    shadowColor: LightVault.ctaShadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 28,
    elevation: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    zIndex: 1,
  },
  rightOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
  },
  leftContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#86EFAC',
  },
  smallLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: 'rgba(255, 255, 255, 0.70)',
  },
  mainText: {
    gap: 0,
  },
  scanTo: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  open: {
    fontSize: 30,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.65)',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hintText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.55)',
    fontWeight: '500',
  },
  rightContent: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrFrame: {
    width: 84,
    height: 84,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
