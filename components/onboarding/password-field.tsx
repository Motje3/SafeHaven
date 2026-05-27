import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

interface PasswordFieldProps extends Omit<TextInputProps, 'style' | 'secureTextEntry'> {
  label: string;
  required?: boolean;
}

export function PasswordField({ label, required, ...inputProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.asterisk}>*</Text>}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
        />
        <Pressable
          onPress={() => setVisible((v) => !v)}
          hitSlop={10}
          style={({ pressed }) => [styles.eyeBtn, pressed && { opacity: 0.6 }]}
        >
          <MaterialIcons
            name={visible ? 'visibility' : 'visibility-off'}
            size={20}
            color="#6B6357"
          />
        </Pressable>
      </View>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    paddingVertical: 2,
    paddingHorizontal: 0,
    marginTop: 2,
    letterSpacing: 2,
  },
  eyeBtn: {
    padding: 4,
    marginLeft: 8,
  },
});
