import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface VideoCardProps {
  title: string;
  width: number;
  height?: number;
  gradient?: [string, string];
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
}

export function VideoCard({
  title,
  width,
  height = 180,
  gradient = ['#3F3F46', '#18181B'],
  icon,
  onPress,
}: VideoCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ width, opacity: pressed ? 0.85 : 1 }]}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { height }]}
      >
        {icon && (
          <View style={styles.iconWrap} pointerEvents="none">
            <MaterialCommunityIcons name={icon} size={64} color="rgba(255,255,255,0.25)" />
          </View>
        )}

        <View style={styles.titleWrap}>
          <View style={styles.titlePill}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 10,
  },
  iconWrap: {
    position: 'absolute',
    top: 18,
    right: 14,
  },
  titleWrap: {
    alignItems: 'flex-start',
  },
  titlePill: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 3,
    maxWidth: '90%',
  },
  titleText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
    lineHeight: 17,
  },
});
