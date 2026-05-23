import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ScreenTopBarProps {
  title: string;
  showBack?: boolean;
  reserveRightGutter?: boolean;
}

export function ScreenTopBar({
  title,
  showBack = false,
  reserveRightGutter = false,
}: ScreenTopBarProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Left side: reserved for the burger menu (positioned absolutely in MenuDrawer). */}
      <View style={[styles.side, styles.gutter]} />

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={[styles.side, styles.rightSide, reserveRightGutter && styles.rightGutter]}>
        {showBack && (
          <Pressable
            hitSlop={10}
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
          >
            <MaterialIcons name="chevron-right" size={28} color="#0F172A" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 4,
  },
  side: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  gutter: {
    marginLeft: 52,
  },
  rightGutter: {
    marginRight: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
});
