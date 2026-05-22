import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const FILTERS = ['Alles', 'Beschikbaar'];

export function VoorzieningenSection() {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialIcons name="devices" size={20} color="#0F172A" />
        <Text style={styles.title}>Voorzieningen</Text>
      </View>

      <View style={styles.pillRow}>
        {FILTERS.map((label, i) => {
          const isActive = i === active;
          return (
            <Pressable
              key={label}
              onPress={() => setActive(i)}
              style={({ pressed }) => [
                styles.pill,
                isActive ? styles.pillActive : styles.pillInactive,
                pressed && !isActive && { opacity: 0.75 },
              ]}
            >
              <Text style={[styles.pillText, isActive ? styles.pillTextActive : styles.pillTextInactive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: '#F5C842',
    borderColor: '#F5C842',
  },
  pillInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#0F172A',
  },
  pillTextInactive: {
    color: '#0F172A',
  },
});
