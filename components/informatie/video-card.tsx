import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

interface VideoCardProps {
  title: string;
  width: number;
  height?: number;
  image: ImageSourcePropType;
  onPress?: () => void;
}

export function VideoCard({ title, width, height = 180, image, onPress }: VideoCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ width, opacity: pressed ? 0.85 : 1 }]}
    >
      <View style={[styles.card, { height }]}>
        <Image source={image} style={styles.image} resizeMode="cover" />

        <View style={styles.titleWrap}>
          <View style={styles.titlePill}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: '#222222',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
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
