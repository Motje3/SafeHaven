import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface PillToggleProps {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}

export function PillToggle({ options, selected, onToggle }: PillToggleProps) {
  return (
    <View style={styles.wrap}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <Pressable
            key={option}
            onPress={() => onToggle(option)}
            style={({ pressed }) => [
              styles.pill,
              isSelected ? styles.pillSelected : styles.pillUnselected,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={[styles.pillText, isSelected ? styles.pillTextSelected : styles.pillTextUnselected]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
  },
  pillSelected: {
    backgroundColor: '#4ADE80',
  },
  pillUnselected: {
    backgroundColor: '#FFFFFF',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  pillTextSelected: {
    color: '#FFFFFF',
  },
  pillTextUnselected: {
    color: '#0F172A',
  },
});
