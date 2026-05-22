import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ActivityIconVariant = 'group-green' | 'medical-yellow' | 'group-blue';

interface ActivityRowProps {
  time: string;
  title: string;
  location: string;
  variant: ActivityIconVariant;
  rsvp?: boolean;
}

const VARIANT_STYLES: Record<ActivityIconVariant, { bg: string; icon: keyof typeof MaterialIcons.glyphMap; iconColor: string }> = {
  'group-green': { bg: '#4ADE80', icon: 'groups', iconColor: '#FFFFFF' },
  'medical-yellow': { bg: '#F5C842', icon: 'medical-services', iconColor: '#FFFFFF' },
  'group-blue': { bg: '#7DC3E8', icon: 'groups', iconColor: '#FFFFFF' },
};

export function ActivityRow({ time, title, location, variant, rsvp }: ActivityRowProps) {
  const v = VARIANT_STYLES[variant];

  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: v.bg }]}>
        <MaterialIcons name={v.icon} size={26} color={v.iconColor} />
      </View>

      <View style={styles.divider} />

      <View style={styles.info}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.locRow}>
          <MaterialIcons name="place" size={14} color="#0F172A" />
          <Text style={styles.location}>Locatie: {location}</Text>
        </View>
      </View>

      <View style={styles.trailing}>
        {rsvp ? (
          <View style={styles.rsvpPill}>
            <Text style={styles.rsvpText}>Inschrijven</Text>
          </View>
        ) : null}
        <MaterialIcons name="keyboard-arrow-down" size={22} color="#0F172A" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: 56,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  time: {
    fontSize: 12,
    color: '#6B7280',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: '#0F172A',
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rsvpPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  rsvpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
});
