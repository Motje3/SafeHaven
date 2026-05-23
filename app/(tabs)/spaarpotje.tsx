import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ImagePlaceholder } from '@/components/onboarding/image-placeholder';
import { ScreenTopBar } from '@/components/shared/screen-top-bar';

const BLOCKS = 20;

type Transaction = {
  label: string;
  amount: number;
};

const TRANSACTIONS: Transaction[] = [
  { label: 'Vandaag', amount: 9.0 },
  { label: '12 mei 2026', amount: 5.0 },
  { label: '12 mei 2026', amount: 5.0 },
  { label: '11 mei 2026', amount: 8.0 },
];

export default function SpaarpotjeScreen() {
  const insets = useSafeAreaInsets();
  const saved = 32;
  const goal = 80;
  const remaining = goal - saved;
  const filled = Math.round((saved / goal) * BLOCKS);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Noodradio" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <View style={styles.heroCard}>
              <ImagePlaceholder
                label="img"
                height={180}
                rounded={14}
                variant="card"
                style={styles.heroPlaceholder}
              />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.detailCard}>
              <Text style={styles.title}>Noodradio</Text>
              <Text style={styles.subtitle}>Blijf op de hoogte, ook als de stroom uitvalt.</Text>

              <View style={styles.dateRow}>
                <MaterialIcons name="event" size={14} color="#6B7280" />
                <Text style={styles.dateText}>Donderdag 16 april</Text>
                <MaterialIcons name="schedule" size={14} color="#6B7280" style={{ marginLeft: 6 }} />
                <Text style={styles.dateText}>13:22</Text>
              </View>

              <View style={styles.amountRow}>
                <View style={styles.amountCol}>
                  <Text style={styles.amountValue}>€{saved}</Text>
                  <Text style={styles.amountLabel}>Gespaard</Text>
                </View>
                <View style={styles.amountDivider} />
                <View style={styles.amountCol}>
                  <Text style={styles.amountValue}>€{goal}</Text>
                  <Text style={styles.amountLabel}>Doelbedrag</Text>
                </View>
              </View>

              <View style={styles.blockRow}>
                {Array.from({ length: BLOCKS }).map((_, i) => (
                  <View
                    key={i}
                    style={[styles.block, i < filled ? styles.blockFilled : styles.blockEmpty]}
                  />
                ))}
              </View>

              <Text style={styles.remainingText}>Nog €{remaining} te gaan!</Text>

              <Pressable
                style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.88 }]}
              >
                <MaterialIcons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addBtnText}>Toevoegen</Text>
              </Pressable>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            <View style={styles.transactionsCard}>
              <Text style={styles.txTitle}>Recente toevoegingen</Text>

              {TRANSACTIONS.map((tx, i) => (
                <React.Fragment key={i}>
                  <View style={styles.txRow}>
                    <Text style={styles.txLabel}>{tx.label}</Text>
                    <Text style={styles.txAmount}>+ €{tx.amount.toFixed(2)}</Text>
                  </View>
                  {i < TRANSACTIONS.length - 1 ? <View style={styles.txDivider} /> : null}
                </React.Fragment>
              ))}
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
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  heroPlaceholder: {
    backgroundColor: '#E6F2D9',
    borderColor: 'rgba(15, 23, 42, 0.15)',
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 14,
    color: '#0F172A',
    marginTop: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
  },
  dateText: {
    fontSize: 13,
    color: '#6B7280',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 22,
    marginBottom: 16,
  },
  amountCol: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -1.0,
  },
  amountLabel: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  amountDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#E5E7EB',
  },
  blockRow: {
    flexDirection: 'row',
    gap: 3,
  },
  block: {
    flex: 1,
    height: 22,
    borderRadius: 3,
  },
  blockFilled: {
    backgroundColor: '#4ADE80',
  },
  blockEmpty: {
    backgroundColor: '#D1D5DB',
  },
  remainingText: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 16,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#14342B',
    paddingVertical: 14,
    borderRadius: 12,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  transactionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  txTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  txLabel: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#22C55E',
  },
  txDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
});
