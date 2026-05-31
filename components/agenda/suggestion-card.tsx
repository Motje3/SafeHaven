import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface SuggestionCardProps {
  onSubmit?: () => void;
}

export function SuggestionCard({ onSubmit }: SuggestionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialIcons name="event" size={20} color="#1BD15D" />
        <Text style={styles.title}>Een activiteit toevoegen?</Text>
      </View>
      <Text style={styles.subtitle}>Suggesties zijn altijd welkom in de community</Text>

      <Pressable
        onPress={onSubmit}
        style={({ pressed }) => [styles.btn, pressed && { opacity: 0.88 }]}
      >
        <Text style={styles.btnText}>Suggestie indienen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 14,
  },
  btn: {
    backgroundColor: '#1BD15D',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
});
