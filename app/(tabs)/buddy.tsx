import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';

export default function BuddyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Jouw buddy" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <View style={styles.heroCard}>
              <View style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.buddyName}>Frank de Vries</Text>
                <Text style={styles.buddySub}>Beursplein 8 · 200m</Text>
                <View style={styles.statusPill}>
                  <View style={styles.dot} />
                  <Text style={styles.statusText}>Actief sinds 3 maanden</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Frank kan helpen met</Text>
              <View style={styles.chipRow}>
                {['Boodschappen', 'Mobiliteit', 'EHBO'].map((tag) => (
                  <View key={tag} style={styles.chip}>
                    <Text style={styles.chipText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()} style={styles.actions}>
            <Pressable style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.85 }]}>
              <MaterialCommunityIcons name="phone" size={18} color="#FFFFFF" />
              <Text style={styles.primaryBtnText}>Bel Frank</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.85 }]}>
              <MaterialCommunityIcons name="message-text" size={18} color="#14342B" />
              <Text style={styles.secondaryBtnText}>Bericht</Text>
            </Pressable>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(320).springify()}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Wat ik zelf bied</Text>
              <View style={styles.chipRow}>
                {['Gezelschap', 'Vertalen'].map((tag) => (
                  <View key={tag} style={[styles.chip, styles.chipMine]}>
                    <Text style={styles.chipMineText}>{tag}</Text>
                  </View>
                ))}
              </View>
              <Pressable style={({ pressed }) => [styles.linkBtn, pressed && { opacity: 0.6 }]}>
                <MaterialIcons name="edit" size={14} color="#14342B" />
                <Text style={styles.linkText}>Bewerk mijn aanbod</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F6' },
  content: {},
  body: { paddingHorizontal: 16, paddingTop: 12, gap: 14 },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    padding: 16,
    gap: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#F5D38A' },
  buddyName: { fontSize: 13, fontWeight: '800', color: '#0F172A', letterSpacing: -0.3 },
  buddySub: { fontSize: 10, color: '#6B7280', marginTop: 2 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22C55E' },
  statusText: { fontSize: 9, fontWeight: '600', color: '#166534' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: { fontSize: 12, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#F4F4F6', borderRadius: 8 },
  chipText: { fontSize: 9, fontWeight: '600', color: '#0F172A' },
  chipMine: { backgroundColor: '#14342B' },
  chipMineText: { fontSize: 9, fontWeight: '600', color: '#FFFFFF' },
  actions: { flexDirection: 'row', gap: 10 },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#14342B',
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 11 },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#14342B',
  },
  secondaryBtnText: { color: '#14342B', fontWeight: '700', fontSize: 11 },
  linkBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12, alignSelf: 'flex-start' },
  linkText: { fontSize: 10, fontWeight: '700', color: '#14342B' },
});
