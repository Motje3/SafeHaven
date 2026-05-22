import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface DoorStatusCardProps {
  locked?: boolean;
  onToggle?: () => void;
}

export function DoorStatusCard({ locked = true, onToggle }: DoorStatusCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.textCol}>
        <Text style={styles.title}>Deur van de noodkast</Text>
        <Text style={styles.subtitle}>
          Status: <Text style={styles.subtitleItalic}>{locked ? 'Gesloten' : 'Open'}</Text>
        </Text>
      </View>

      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [styles.lockBtn, pressed && { opacity: 0.85 }]}
      >
        <MaterialIcons
          name={locked ? 'lock' : 'lock-open'}
          size={28}
          color="#14342B"
        />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  subtitleItalic: {
    fontStyle: 'italic',
    color: '#6B7280',
  },
  lockBtn: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#F5C842',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
