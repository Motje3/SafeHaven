import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HomeTopBarProps {
  title?: string;
}

export function HomeTopBar({ title = 'Home' }: HomeTopBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    backgroundColor: '#F4F4F6',
  },
  titleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 52,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
});
