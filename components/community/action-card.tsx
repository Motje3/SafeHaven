import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ActionIconConfig =
  | { lib: 'material'; name: React.ComponentProps<typeof MaterialIcons>['name']; color?: string; size?: number }
  | { lib: 'mc'; name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color?: string; size?: number };

interface ActionCardProps {
  label: string;
  icon: ActionIconConfig;
  width: number;
  height?: number;
  active?: boolean;
  onPress?: () => void;
}

export function ActionCard({ label, icon, width, height = 170, active, onPress }: ActionCardProps) {
  const renderIcon = () => {
    const color = icon.color ?? '#0F172A';
    const size = icon.size ?? 44;
    if (icon.lib === 'mc') return <MaterialCommunityIcons name={icon.name} size={size} color={color} />;
    return <MaterialIcons name={icon.name} size={size} color={color} />;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { width, height },
        active && styles.cardActive,
        pressed && { opacity: 0.88 },
      ]}
    >
      <View style={styles.iconWrap}>{renderIcon()}</View>
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardActive: {
    borderWidth: 2,
    borderColor: '#EF2A2A',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 21,
  },
  labelActive: {
    color: '#EF2A2A',
  },
});
