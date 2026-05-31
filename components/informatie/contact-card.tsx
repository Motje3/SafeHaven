import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface ContactCardProps {
  name: string;
  role: string;
  width: number;
  avatarTint?: string;
}

export function ContactCard({ name, role, width }: ContactCardProps) {
  return (
    <View style={[styles.card, { width }]}>
      <Image source={require('../../public/dog.png')} style={styles.avatar} resizeMode="cover" />
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
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  role: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
  },
});
