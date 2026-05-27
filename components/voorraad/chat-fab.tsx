import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ChatFabProps {
  count?: number;
  onPress?: () => void;
}

export function ChatFab({ count = 3, onPress }: ChatFabProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.fab, pressed && { opacity: 0.88 }]}
    >
      <MaterialIcons name="chat-bubble-outline" size={22} color="#FFFFFF" />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#14342B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 12,
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#22C55E',
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F4F4F6',
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
