import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BuurtBannerProps {
  name?: string;
  detail?: string;
}

export function BuurtBanner({
  name = 'Buurt',
  detail = 'Ouden Noorden Rotterdam - 150 bewoners',
}: BuurtBannerProps) {
  return (
    <View style={styles.banner}>
      <View style={styles.row}>
        <MaterialIcons name="place" size={20} color="#4ADE80" />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#14342B',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  detail: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.92,
  },
});
