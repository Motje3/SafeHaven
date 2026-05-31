import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface DirectHelpCardProps {
  onPress?: () => void;
}

export function DirectHelpCard({ onPress }: DirectHelpCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.textCol}>
        <Text style={styles.title}>Direct hulp vragen</Text>
        <Text style={styles.subtitle}>Directe hulp uit de omgeving bij nood</Text>
      </View>

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.sosBtn, pressed && { opacity: 0.85 }]}
      >
        <MaterialCommunityIcons name="shield-alert" size={30} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  sosBtn: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#EF2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
