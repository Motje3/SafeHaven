import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LightVault } from '@/constants/theme';

interface GreetingSectionProps {
  userName?: string;
  isAvailable?: boolean;
}

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning,';
  if (hour < 17) return 'Good afternoon,';
  return 'Good evening,';
}

export function GreetingSection({ userName = 'User', isAvailable = true }: GreetingSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.timeGreeting}>{getTimeGreeting()}</Text>
      <Text style={styles.name}>Hi, {userName}</Text>

      <View style={[styles.availabilityPill, isAvailable ? styles.pillAvailable : styles.pillLocked]}>
        <MaterialIcons
          name={isAvailable ? 'lock-open' : 'lock'}
          size={15}
          color={isAvailable ? LightVault.statusOnline : LightVault.statusOffline}
        />
        <Text style={[styles.pillText, { color: isAvailable ? LightVault.statusOnline : LightVault.statusOffline }]}>
          {isAvailable ? 'Closet Available' : 'Closet Locked'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  timeGreeting: {
    fontSize: 16,
    fontWeight: '400',
    color: LightVault.textSecondary,
    marginBottom: 2,
  },
  name: {
    fontSize: 32,
    fontWeight: '700',
    color: LightVault.textPrimary,
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  availabilityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
  },
  pillAvailable: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderColor: 'rgba(34, 197, 94, 0.30)',
  },
  pillLocked: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: 'rgba(239, 68, 68, 0.30)',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
