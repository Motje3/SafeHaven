import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function Counter({ value, onChange, min = 0, max = 20 }: CounterProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <View style={styles.row}>
      <Pressable onPress={dec} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.6 }]}>
        <Text style={styles.symbol}>−</Text>
      </Pressable>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value.toString().padStart(value > 9 ? 2 : 1, '0')}</Text>
      </View>
      <Pressable onPress={inc} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.6 }]}>
        <Text style={styles.symbol}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 26,
  },
  valueBox: {
    width: 60,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
});
