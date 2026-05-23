import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DoorStatusCard } from '@/components/home/door-status-card';
import { EmergencyAlertModal } from '@/components/home/emergency-alert-modal';
import { DirectHelpCard } from '@/components/home/emergency/direct-help-card';
import { EmergencyStatsRow } from '@/components/home/emergency/emergency-stats-row';
import { NeighborhoodAlertsCard } from '@/components/home/emergency/neighborhood-alerts-card';
import { HomeTopBar } from '@/components/home/home-top-bar';
import { InUseCard } from '@/components/home/in-use-card';
import { InventoryStatsRow } from '@/components/home/inventory-stats-row';
import { StatusBannerCard } from '@/components/home/status-banner-card';
import { useEmergency } from '@/hooks/use-emergency';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { emergency, showModal, acknowledge } = useEmergency();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 6, paddingBottom: 140 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <HomeTopBar title="Home" lastUpdated="15:54" />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <StatusBannerCard variant={emergency ? 'alert' : 'ok'} />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            {emergency ? <DirectHelpCard /> : <DoorStatusCard locked />}
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            {emergency ? (
              <EmergencyStatsRow onPressActions={() => router.push('/informatie')} />
            ) : (
              <InventoryStatsRow />
            )}
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(320).springify()}>
            {emergency ? <NeighborhoodAlertsCard /> : <InUseCard />}
          </Animated.View>
        </View>
      </ScrollView>

      {emergency && (
        <EmergencyAlertModal
          visible={showModal}
          title={emergency.title}
          timestamp={emergency.timestamp}
          message={emergency.message}
          onAcknowledge={acknowledge}
        />
      )}
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
    paddingTop: 14,
    gap: 14,
  },
});
