import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface SpaarpotRowProps {
  name: string;
  saved: number;
  goal: number;
  onPress?: () => void;
}

const BLOCKS = 14;

export function SpaarpotRow({
  name,
  saved,
  goal,
  onPress,
}: SpaarpotRowProps) {
  const percent = Math.min(100, saved / goal);
  const filled = Math.round(percent * BLOCKS);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.88 }]}>
      <View style={styles.thumb}>
        <Image
          source={require('../../public/noodradioicon.png')}
          style={styles.thumbImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.amount}>
              <Text style={styles.amountBold}>€{saved}</Text>{' '}
              <Text style={styles.amountMuted}>van €{goal}</Text>
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#0F172A" />
        </View>

        <View style={styles.blockRow}>
          {Array.from({ length: BLOCKS }).map((_, i) => (
            <View
              key={i}
              style={[styles.block, i < filled ? styles.blockFilled : styles.blockEmpty]}
            />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#E9F2E1',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  amount: {
    fontSize: 10,
    marginTop: 2,
  },
  amountBold: {
    fontWeight: '800',
    color: '#0F172A',
  },
  amountMuted: {
    color: '#6B7280',
  },
  blockRow: {
    flexDirection: 'row',
    gap: 2,
  },
  block: {
    flex: 1,
    height: 12,
    borderRadius: 2,
  },
  blockFilled: {
    backgroundColor: '#1BD15D',
  },
  blockEmpty: {
    backgroundColor: '#E5E7EB',
  },
});
