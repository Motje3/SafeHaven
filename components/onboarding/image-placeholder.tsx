import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

interface ImagePlaceholderProps {
  label?: string;
  width?: number | string;
  height?: number;
  rounded?: number;
  style?: ViewStyle;
  variant?: 'soft' | 'card';
}

export function ImagePlaceholder({
  label = 'img',
  width = '100%',
  height = 200,
  rounded = 16,
  style,
  variant = 'soft',
}: ImagePlaceholderProps) {
  return (
    <View
      style={[
        styles.box,
        variant === 'soft' ? styles.soft : styles.card,
        { width: width as any, height, borderRadius: rounded },
        style,
      ]}
    >
      <Text style={[styles.label, variant === 'soft' ? styles.labelSoft : styles.labelCard]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  soft: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  card: {
    backgroundColor: '#F0EDE0',
    borderColor: 'rgba(15, 23, 42, 0.20)',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  labelSoft: {
    color: 'rgba(255, 255, 255, 0.55)',
  },
  labelCard: {
    color: 'rgba(15, 23, 42, 0.45)',
  },
});
