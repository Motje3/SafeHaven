import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BatteryStatusCardProps {
  title?: string;
  percent?: number;
  timeRemaining?: string;
  kwh?: number;
}

const TOTAL_BLOCKS = 20;

export function BatteryStatusCard({
  title = 'Aan het oplading..',
  percent = 65,
  timeRemaining = '3 uur en 50 minuten resterend',
  kwh = 74,
}: BatteryStatusCardProps) {
  const filled = Math.round((percent / 100) * TOTAL_BLOCKS);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="bolt" size={20} color="#F5A623" />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.percent}>{percent}%</Text>
      </View>

      <View style={styles.subRow}>
        <Text style={styles.subText}>{timeRemaining}</Text>
        <Text style={styles.subText}>{kwh} kWh</Text>
      </View>

      <View style={styles.blockRow}>
        {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
          <View
            key={i}
            style={[styles.block, i < filled ? styles.blockFilled : styles.blockEmpty]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  percent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  subText: {
    fontSize: 9,
    color: '#6B7280',
  },
  blockRow: {
    flexDirection: 'row',
    gap: 2,
  },
  block: {
    flex: 1,
    height: 18,
    borderRadius: 2,
  },
  blockFilled: {
    backgroundColor: '#1BD15D',
  },
  blockEmpty: {
    backgroundColor: '#D1D5DB',
  },
});
