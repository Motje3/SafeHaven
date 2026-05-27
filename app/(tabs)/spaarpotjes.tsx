import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';
import { BuurtBanner } from '@/components/shared/buurt-banner';
import { SpaarpotRow } from '@/components/spaarpotjes/spaarpot-row';

type Spaarpot = {
  id: string;
  name: string;
  saved: number;
  goal: number;
};

const POTJES: Spaarpot[] = [
  { id: '1', name: 'Noodradio', saved: 32, goal: 80 },
  { id: '2', name: 'Noodradio', saved: 32, goal: 80 },
  { id: '3', name: 'Noodradio', saved: 32, goal: 80 },
  { id: '4', name: 'Noodradio', saved: 32, goal: 80 },
];

export default function SpaarpotjesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Spaarpotjes" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <BuurtBanner />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.listCard}>
              <View style={styles.listHeader}>
                <View style={styles.headerLeft}>
                  <MaterialIcons name="savings" size={20} color="#0F172A" />
                  <Text style={styles.listTitle}>Spaarpotjes</Text>
                </View>
              </View>

              <View style={styles.listBody}>
                {POTJES.map((p, i) => (
                  <React.Fragment key={p.id}>
                    <SpaarpotRow
                      name={p.name}
                      saved={p.saved}
                      goal={p.goal}
                      onPress={() => router.push('/spaarpotje' as any)}
                    />
                    {i < POTJES.length - 1 ? <View style={styles.divider} /> : null}
                  </React.Fragment>
                ))}
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            <View style={styles.suggestCard}>
              <View style={styles.suggestHeader}>
                <MaterialIcons name="savings" size={18} color="#0F172A" />
                <Text style={styles.suggestTitle}>Een spaarpotje aanmaken</Text>
              </View>
              <Text style={styles.suggestSub}>
                Suggesties  zijn altijd welkom in de community
              </Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(320).springify()}>
            <Pressable style={({ pressed }) => [styles.ctaBtn, pressed && { opacity: 0.9 }]}>
              <Text style={styles.ctaText}>Spaardoel starten</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F4F6',
  },
  scroll: {
    flex: 1,
  },
  content: {},
  body: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 14,
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  listBody: {},
  divider: {
    height: 1,
    backgroundColor: '#F0F0F2',
  },
  suggestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  suggestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  suggestTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  suggestSub: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 26,
  },
  ctaBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
});
