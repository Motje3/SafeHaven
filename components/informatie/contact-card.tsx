import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ContactCardProps {
  name: string;
  role: string;
  width: number;
  avatarTint?: string;
}

export function ContactCard({ name, role, width, avatarTint = '#BFE0EE' }: ContactCardProps) {
  return (
    <View style={[styles.card, { width }]}>
      <View style={[styles.avatar, { backgroundColor: avatarTint }]}>
        <MaterialCommunityIcons name="dog" size={28} color="#FFFFFF" />
      </View>
      <View style={styles.text}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  role: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#6B7280',
  },
});
