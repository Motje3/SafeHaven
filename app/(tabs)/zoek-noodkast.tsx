import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';

export default function ZoekNoodkastScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Zoek mijn Noodkast" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <View style={styles.heroCard}>
              <Image
                source={require('../../public/denoodkast.png')}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.heroBody}>
                <Text style={styles.heroTitle}>Noodkast Katendrecht</Text>
                <View style={styles.locationRow}>
                  <MaterialIcons name="place" size={16} color="#6B7280" />
                  <Text style={styles.locationText}>Waterleliekade 5</Text>
                </View>
                <View style={styles.walkPill}>
                  <MaterialIcons name="directions-walk" size={16} color="#0F172A" />
                  <Text style={styles.walkText}>5 minuten lopen</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.mapCard}>
              <Text style={styles.mapPlaceholder}>Kaartweergave</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()} style={styles.actions}>
            <Pressable style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.85 }]}>
              <MaterialCommunityIcons name="navigation-variant" size={18} color="#FFFFFF" />
              <Text style={styles.primaryBtnText}>Route starten</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.85 }]}>
              <MaterialIcons name="map" size={18} color="#14342B" />
              <Text style={styles.secondaryBtnText}>Open in Maps</Text>
            </Pressable>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(320).springify()}>
            <View style={styles.statusCard}>
              <StatusRow label="Status deur" value="Gesloten" valueColor="#0F172A" />
              <StatusRow label="Voorraad" value="75% gevuld" valueColor="#22C55E" />
              <StatusRow label="Laatste activiteit" value="2 min geleden" valueColor="#6B7280" last />
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

function StatusRow({
  label,
  value,
  valueColor,
  last,
}: {
  label: string;
  value: string;
  valueColor: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.statusRow, !last && styles.statusRowDivider]}>
      <Text style={styles.statusLabel}>{label}</Text>
      <Text style={[styles.statusValue, { color: valueColor }]}>{value}</Text>
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
    padding: 14,
    gap: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  image: { width: 110, height: 90 },
  heroBody: { flex: 1, gap: 4 },
  heroTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A', letterSpacing: -0.3 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 13, color: '#6B7280' },
  walkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F5C842',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  walkText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  mapCard: {
    height: 220,
    backgroundColor: '#E5E7EB',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholder: { fontSize: 13, color: '#6B7280', fontStyle: 'italic' },
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
  primaryBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
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
  secondaryBtnText: { color: '#14342B', fontWeight: '700', fontSize: 14 },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  statusRowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  statusLabel: { fontSize: 13, color: '#6B7280' },
  statusValue: { fontSize: 14, fontWeight: '700' },
});
