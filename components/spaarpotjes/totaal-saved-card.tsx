import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TotaalSavedCardProps {
  amount: number;
  goal: number;
  totalBlocks?: number;
}

export function TotaalSavedCard({ amount, goal, totalBlocks = 20 }: TotaalSavedCardProps) {
  const percent = Math.min(100, Math.round((amount / goal) * 100));
  const filled = Math.round((percent / 100) * totalBlocks);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Totaal gespaard</Text>
      <Text style={styles.amount}>€{amount}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.metaLeft}>
          Van <Text style={styles.metaBold}>€{goal}</Text> doelbedrag
        </Text>
        <Text style={styles.metaRight}>{percent}%</Text>
      </View>

      <View style={styles.blockRow}>
        {Array.from({ length: totalBlocks }).map((_, i) => (
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
    backgroundColor: '#14342B',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  amount: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1.5,
    marginTop: 6,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metaLeft: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  metaBold: {
    fontWeight: '800',
  },
  metaRight: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  blockRow: {
    flexDirection: 'row',
    gap: 3,
  },
  block: {
    flex: 1,
    height: 22,
    borderRadius: 3,
  },
  blockFilled: {
    backgroundColor: '#4ADE80',
  },
  blockEmpty: {
    backgroundColor: '#5A6B62',
  },
});
