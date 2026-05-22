import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionCard, type ActionIconConfig } from '@/components/community/action-card';
import { NotificationItem } from '@/components/community/notification-item';
import { ScreenTopBar } from '@/components/shared/screen-top-bar';

const SCREEN_W = Dimensions.get('window').width;
const PAGE_PAD = 16;
const GRID_GAP = 12;
const CARD_W = (SCREEN_W - PAGE_PAD * 2 - GRID_GAP) / 2;

type GridAction = {
  label: string;
  icon: ActionIconConfig;
};

const ACTIONS: GridAction[] = [
  { label: 'Ik heb hulp nodig', icon: { lib: 'mc', name: 'shield-alert', color: '#0F172A', size: 44 } },
  { label: 'Ik ben bij de kast', icon: { lib: 'material', name: 'home', color: '#EF4444', size: 44 } },
  { label: 'Ik heb hulp nodig', icon: { lib: 'mc', name: 'shield-alert', color: '#0F172A', size: 36 } },
  { label: 'Wie is er bij de\nkast?', icon: { lib: 'mc', name: 'shield-alert', color: '#0F172A', size: 48 } },
];

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Community" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()} style={styles.grid}>
            {ACTIONS.map((a, i) => (
              <ActionCard key={`${a.label}-${i}`} label={a.label} icon={a.icon} width={CARD_W} />
            ))}
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.notificationsCard}>
              <View style={styles.notifHeader}>
                <MaterialIcons name="notifications" size={20} color="#14342B" />
                <Text style={styles.notifTitle}>Meldingen</Text>
              </View>

              <View style={styles.divider} />

              <NotificationItem
                variant="plain"
                message="Gavin en 24 anderen zijn nu bij de noodkast"
                timestamp="12:45"
              />
              <View style={styles.divider} />

              <NotificationItem
                variant="alert"
                who="Frank"
                location="beursplein 8"
                timestamp="12:45"
              />
              <View style={styles.divider} />

              <NotificationItem
                variant="reply"
                message="Lola vraagt wie er bij de kast is"
                timestamp="12:45"
              />
              <View style={styles.divider} />

              <NotificationItem
                variant="alert"
                who="Lola"
                location="beursplein 8"
                timestamp="12:45"
              />
            </View>
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
    paddingHorizontal: PAGE_PAD,
    paddingTop: 12,
    gap: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  notificationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  notifHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  notifTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#14342B',
    letterSpacing: -0.3,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
});
