import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LightVault } from '@/constants/theme';

export default function ChatScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Community Chat</Text>
      <Text style={styles.subtitle}>
        Talk with everyone in your neighborhood
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: LightVault.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: LightVault.textSecondary,
  },
});