import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GreetingSection } from '@/components/home/greeting-section';
import { HomeHeader } from '@/components/home/home-header';
import { QuickActionsGrid } from '@/components/home/quick-actions-grid';
import { RecentActivityFeed } from '@/components/home/recent-activity-feed';
import { ScanUnlockCard } from '@/components/home/scan-unlock-card';

const SCREEN_W = Dimensions.get('window').width;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* Background: white-to-lavender gradient + ambient blobs */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.bgTop} />
        <View style={styles.bgBottom} />
        <View style={[styles.blob1, { left: SCREEN_W / 2 - 175 }]} />
        <View style={styles.blob2} />
      </View>

      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 14, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <HomeHeader hasUnread={true} isOnline={true} />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
          <GreetingSection userName="User" isAvailable={true} />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
          <ScanUnlockCard />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
          <QuickActionsGrid />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(320).springify()}>
          <RecentActivityFeed />
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#FFFFFF',
  },
  bgBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#EDE8FD',
  },
  blob1: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(124, 111, 224, 0.09)',
    top: -100,
  },
  blob2: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(167, 139, 250, 0.07)',
    bottom: 100,
    right: -60,
  },
  scroll: {
    flex: 1,
  },
  content: {},
});
