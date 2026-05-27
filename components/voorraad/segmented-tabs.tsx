import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface SegmentedTabsProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export function SegmentedTabs({ tabs, activeIndex, onChange }: SegmentedTabsProps) {
  return (
    <View style={styles.row}>
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(i)}
            style={({ pressed }) => [
              styles.tab,
              isActive ? styles.tabActive : styles.tabInactive,
              pressed && !isActive && { opacity: 0.7 },
            ]}
          >
            <Text style={[styles.tabText, isActive ? styles.tabTextActive : styles.tabTextInactive]}>
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#14342B',
  },
  tabInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabTextInactive: {
    color: '#0F172A',
  },
});
