import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LightVault } from '@/constants/theme';

interface ActivityItem {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  iconBg: string;
  description: string;
  time: string;
  detail?: string;
  detailColor?: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    icon: 'archive',
    iconColor: LightVault.purple,
    iconBg: 'rgba(196, 181, 253, 0.40)',
    description: 'Stored: First Aid Kit',
    time: '2h ago',
    detail: '+5 coins',
    detailColor: LightVault.coinGold,
  },
  {
    icon: 'unarchive',
    iconColor: '#16A34A',
    iconBg: 'rgba(134, 239, 172, 0.40)',
    description: 'Retrieved: Flashlight',
    time: 'Yesterday',
  },
  {
    icon: 'monetization-on',
    iconColor: LightVault.coinGold,
    iconBg: 'rgba(253, 224, 71, 0.45)',
    description: 'Coins earned: Community share',
    time: '2d ago',
    detail: '+12 coins',
    detailColor: LightVault.coinGold,
  },
];

export function RecentActivityFeed() {
  return (
    <View style={styles.container}>
      {/* Section header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Pressable hitSlop={8}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      {ACTIVITIES.map((item, i) => (
        <View key={i} style={styles.row}>
          {/* Inner top highlight */}
          <View style={styles.topHighlight} />

          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
            <MaterialIcons name={item.icon} size={18} color={item.iconColor} />
          </View>

          {/* Text */}
          <View style={styles.textBlock}>
            <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
            <View style={styles.timeRow}>
              <MaterialIcons name="access-time" size={11} color={LightVault.textMuted} />
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>

          {/* Detail */}
          {item.detail && (
            <Text style={[styles.detail, { color: item.detailColor }]}>{item.detail}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: LightVault.textSecondary,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: LightVault.purple,
  },
  row: {
    height: 68,
    borderRadius: 18,
    backgroundColor: LightVault.glassBase,
    borderWidth: 1,
    borderColor: LightVault.glassBorder,
    shadowColor: LightVault.glassShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 14,
    marginBottom: 10,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontWeight: '600',
    color: LightVault.textPrimary,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  time: {
    fontSize: 12,
    color: LightVault.textMuted,
  },
  detail: {
    fontSize: 13,
    fontWeight: '700',
  },
});
