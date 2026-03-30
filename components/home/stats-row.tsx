import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LightVault } from '@/constants/theme';

interface StatsRowProps {
  coins?: number;
  itemsStored?: number;
  nearbyCount?: number;
}

interface StatCardProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  value: string;
  label: string;
}

function StatCard({ icon, iconColor, value, label }: StatCardProps) {
  return (
    <View style={styles.card}>
      {/* Inner top highlight */}
      <View style={styles.topHighlight} />
      <MaterialIcons name={icon} size={18} color={iconColor} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export function StatsRow({ coins = 142, itemsStored = 7, nearbyCount = 3 }: StatsRowProps) {
  return (
    <View style={styles.container}>
      <StatCard
        icon="monetization-on"
        iconColor={LightVault.coinGold}
        value={coins.toString()}
        label="SafeCoins"
      />
      <StatCard
        icon="inventory-2"
        iconColor={LightVault.purple}
        value={itemsStored.toString()}
        label="Stored"
      />
      <StatCard
        icon="location-on"
        iconColor={LightVault.statusOnline}
        value={nearbyCount.toString()}
        label="Nearby"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  card: {
    flex: 1,
    height: 82,
    borderRadius: 20,
    backgroundColor: LightVault.glassBase,
    borderWidth: 1,
    borderColor: LightVault.glassBorder,
    shadowColor: LightVault.glassShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 4,
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: LightVault.textPrimary,
    marginTop: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: LightVault.textSecondary,
  },
});
