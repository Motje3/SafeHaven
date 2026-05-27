import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface YesNoButtonsProps {
  value?: 'ja' | 'nee' | null;
  onChange: (value: 'ja' | 'nee') => void;
}

export function YesNoButtons({ value, onChange }: YesNoButtonsProps) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => onChange('ja')}
        style={({ pressed }) => [
          styles.btn,
          value === 'ja' && styles.btnSelected,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={styles.label}>Ja</Text>
        <MaterialIcons name="check" size={18} color="#0F172A" />
      </Pressable>

      <Pressable
        onPress={() => onChange('nee')}
        style={({ pressed }) => [
          styles.btn,
          value === 'nee' && styles.btnSelected,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={styles.label}>Nee</Text>
        <MaterialIcons name="close" size={18} color="#0F172A" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 11,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    minWidth: 86,
    justifyContent: 'center',
  },
  btnSelected: {
    backgroundColor: '#F5C842',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
});
