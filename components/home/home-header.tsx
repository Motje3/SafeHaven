import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { LightVault } from '@/constants/theme';

interface HomeHeaderProps {
  hasUnread?: boolean;
  isOnline?: boolean;
}

export function HomeHeader({ hasUnread = true, isOnline = true }: HomeHeaderProps) {
  const bellRotate = useSharedValue(0);

  useEffect(() => {
    // subtle shake on mount to draw attention
    const timeout = setTimeout(() => {
      bellRotate.value = withSequence(
        withTiming(-12, { duration: 60 }),
        withTiming(12, { duration: 60 }),
        withTiming(-8, { duration: 60 }),
        withTiming(8, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const bellStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${bellRotate.value}deg` }],
  }));

  const triggerShake = () => {
    bellRotate.value = withSequence(
      withTiming(-14, { duration: 55 }),
      withTiming(14, { duration: 55 }),
      withTiming(-9, { duration: 55 }),
      withTiming(9, { duration: 55 }),
      withTiming(0, { duration: 55 }),
    );
  };

  return (
    <View style={styles.container}>
      {/* Left: Logo + App name */}
      <View style={styles.left}>
        <View style={styles.logoCircle}>
          <MaterialIcons name="security" size={18} color={LightVault.purple} />
        </View>
        <Text style={styles.appName}>SafeHaven</Text>
      </View>

      {/* Right: Bell + Status — leave 52px for burger menu */}
      <View style={styles.right}>
        {/* Power status pill */}
        <View style={[styles.statusPill, isOnline ? styles.statusOnline : styles.statusWarning]}>
          {isOnline ? (
            <View style={[styles.statusDot, { backgroundColor: LightVault.statusOnline }]} />
          ) : (
            <MaterialIcons name="bolt" size={12} color={LightVault.statusWarning} />
          )}
          <Text style={[styles.statusText, { color: isOnline ? LightVault.statusOnline : LightVault.statusWarning }]}>
            {isOnline ? 'Online' : 'Outage Mode'}
          </Text>
        </View>

        {/* Notification bell */}
        <Pressable onPress={triggerShake} style={styles.bellBtn} hitSlop={8}>
          <Animated.View style={bellStyle}>
            <MaterialIcons
              name={hasUnread ? 'notifications' : 'notifications-none'}
              size={24}
              color={LightVault.textPrimary}
            />
          </Animated.View>
          {hasUnread && <View style={styles.unreadDot} />}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    // leave 52px on right handled by right container marginRight
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: LightVault.purpleSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: LightVault.textPrimary,
    letterSpacing: -0.3,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 52, // space for burger menu button
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusOnline: {
    backgroundColor: 'rgba(34, 197, 94, 0.10)',
    borderColor: 'rgba(34, 197, 94, 0.30)',
  },
  statusWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.10)',
    borderColor: 'rgba(245, 158, 11, 0.30)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  bellBtn: {
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 1,
    right: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
});
