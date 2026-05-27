import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HomeTopBarProps {
  title?: string;
  lastUpdated?: string;
}

export function HomeTopBar({ title = 'Home', lastUpdated = '15:54' }: HomeTopBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.refreshRow}>
        <MaterialIcons name="refresh" size={14} color="#6B7280" />
        <Text style={styles.refreshText}>{lastUpdated}</Text>
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
  refreshRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  refreshText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
    fontWeight: '500',
  },
});
