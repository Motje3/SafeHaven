import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LightVault } from '@/constants/theme';

interface Props {
  onBack: () => void;
}

export function Meetups({ onBack }: Props) {
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color={LightVault.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Community Meetups</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: LightVault.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: LightVault.textSecondary,
  },
});