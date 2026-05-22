import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressDotsProps {
  total: number;
  activeIndex: number;
  activeColor?: string;
  inactiveColor?: string;
}

export function ProgressDots({
  total,
  activeIndex,
  activeColor = '#F5C842',
  inactiveColor = '#5A6B62',
}: ProgressDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { backgroundColor: i === activeIndex ? activeColor : inactiveColor }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 5,
    flex: 1,
    maxWidth: 40,
    borderRadius: 3,
  },
});
