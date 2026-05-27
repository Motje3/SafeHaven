import React from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  required?: boolean;
  compact?: boolean;
}

export function FormField({ label, required, compact, ...inputProps }: FormFieldProps) {
  return (
    <View style={[styles.field, compact && styles.compact]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.asterisk}>*</Text>}
      </View>
      <TextInput
        style={styles.input}
        placeholderTextColor="#A0A0A0"
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: '#F0EDE0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 10,
  },
  compact: {
    paddingHorizontal: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  label: {
    fontSize: 10,
    color: '#6B6357',
    fontWeight: '500',
  },
  asterisk: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '700',
  },
  input: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    paddingVertical: 2,
    paddingHorizontal: 0,
    marginTop: 2,
  },
});
