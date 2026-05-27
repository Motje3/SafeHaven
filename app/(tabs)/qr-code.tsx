import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function QrCodeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <Animated.View
          entering={FadeInDown.duration(380).springify()}
          style={[styles.topBar, { paddingTop: insets.top + 4 }]}
        >
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
          >
            <MaterialIcons name="chevron-left" size={28} color="#0F172A" />
          </Pressable>
          <Text style={styles.title}>Qr-code</Text>
          <View style={styles.backBtn} />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(140).duration(380)} style={styles.cardWrap}>
          <View style={styles.card}>
            <MaterialIcons name="qr-code-2" size={280} color="#0F172A" />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F4F6',
  },
  content: {
    flexGrow: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#F4F4F6',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  cardWrap: {
    paddingHorizontal: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
});
