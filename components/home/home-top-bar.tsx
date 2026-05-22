import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HomeTopBarProps {
  title?: string;
  lastUpdated?: string;
}

export function HomeTopBar({ title = 'Home', lastUpdated = '15:54' }: HomeTopBarProps) {
  return (
    <View style={styles.container}>
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
    paddingTop: 6,
  },
  titleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 52,
  },
  title: {
    fontSize: 20,
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
    fontSize: 13,
    fontStyle: 'italic',
    color: '#6B7280',
    fontWeight: '500',
  },
});
