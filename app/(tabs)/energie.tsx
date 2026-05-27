import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BatteryStatusCard } from '@/components/energie/battery-status-card';
import { ChargingIllustration } from '@/components/energie/charging-illustration';
import { OpbrengstpiekCard } from '@/components/energie/opbrengstpiek-card';
import { TipsCard } from '@/components/energie/tips-card';
import { VoorzieningenSection } from '@/components/energie/voorzieningen-section';
import { ScreenTopBar } from '@/components/shared/screen-top-bar';

export default function EnergieScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Energie" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <ChargingIllustration />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <BatteryStatusCard />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            <OpbrengstpiekCard />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(320).springify()}>
            <VoorzieningenSection />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(400).springify()}>
            <TipsCard />
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F4F6',
  },
  scroll: {
    flex: 1,
  },
  content: {},
  body: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 14,
  },
});
