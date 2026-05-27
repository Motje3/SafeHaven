import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RuleSlideProps {
  title: string;
  body: string;
  width: number;
  height: number;
  background?: string;
  titleColor?: string;
  bodyColor?: string;
}

export function RuleSlide({
  title,
  body,
  width,
  height,
  background = '#14342B',
  titleColor = '#F5C842',
  bodyColor = '#E5E7EB',
}: RuleSlideProps) {
  return (
    <View style={[styles.slide, { width, height, backgroundColor: background }]}>
      <View style={styles.avatar} />
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      <Text style={[styles.body, { color: bodyColor }]}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 22,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D1D5DB',
    marginBottom: 22,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 22,
    marginBottom: 14,
  },
  body: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 20,
  },
});
