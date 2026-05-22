import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
  activeColor?: string;
  inactiveColor?: string;
}

export function PaginationDots({
  count,
  activeIndex,
  activeColor = '#14342B',
  inactiveColor = '#D1D5DB',
}: PaginationDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              {
                width: isActive ? 22 : 22,
                backgroundColor: isActive ? activeColor : inactiveColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
});
