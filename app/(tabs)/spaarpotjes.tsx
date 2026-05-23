import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';
import { BuurtBanner } from '@/components/shared/buurt-banner';
import { SpaarpotRow } from '@/components/spaarpotjes/spaarpot-row';
import { TotaalSavedCard } from '@/components/spaarpotjes/totaal-saved-card';

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
            <TotaalSavedCard amount={32} goal={200} />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            <View style={styles.listCard}>
              <View style={styles.listHeader}>
                <View style={styles.headerLeft}>
                  <MaterialIcons name="savings" size={20} color="#0F172A" />
                  <Text style={styles.listTitle}>Spaarpotjes</Text>
                </View>
                <Pressable
                  style={({ pressed }) => [styles.newBtn, pressed && { opacity: 0.7 }]}
                  hitSlop={6}
                >
                  <Text style={styles.newBtnText}>Nieuw potje</Text>
                  <View style={styles.plusBubble}>
                    <MaterialIcons name="add" size={16} color="#FFFFFF" />
                  </View>
                </Pressable>
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
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  newBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  plusBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4ADE80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listBody: {},
  divider: {
    height: 1,
    backgroundColor: '#F0F0F2',
  },
});
