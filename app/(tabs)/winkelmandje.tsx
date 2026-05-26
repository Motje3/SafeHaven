import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';
import { CartItemRow } from '@/components/winkelmandje/cart-item-row';
import { StepCard } from '@/components/winkelmandje/step-card';
import { VoorraadTutorial } from '@/components/winkelmandje/voorraad-tutorial';

let voorraadTutorialSeen = false;

type CartItem = {
  id: string;
  name: string;
  brand: string;
  size: string;
  count: string;
  status: 'critical' | 'warning' | 'ok';
  thumbColor: string;
  thumbLabel: string;
  thumbSubLabel?: string;
  quantity: number;
};

const INITIAL_ITEMS: CartItem[] = [
  {
    id: '1',
    name: 'Soep in blik',
    brand: 'Unox',
    size: '100 g',
    count: '12/20',
    status: 'warning',
    thumbColor: '#C92A1F',
    thumbLabel: 'Unox',
    thumbSubLabel: 'Tomaten soep',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Penne',
    brand: 'Grand Italia',
    size: '500 g',
    count: '12/20',
    status: 'warning',
    thumbColor: '#F2C641',
    thumbLabel: 'Penne',
    thumbSubLabel: 'Grand Italia',
    quantity: 2,
  },
  {
    id: '3',
    name: 'Penne',
    brand: 'Grand Italia',
    size: '500 g',
    count: '12/20',
    status: 'warning',
    thumbColor: '#F2C641',
    thumbLabel: 'Penne',
    thumbSubLabel: 'Grand Italia',
    quantity: 2,
  },
];

export default function WinkelmandjeScreen() {
  const insets = useSafeAreaInsets();
  const [view, setView] = useState<'cart' | 'delivery'>('cart');
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [showTutorial, setShowTutorial] = useState(!voorraadTutorialSeen);

  const dismissTutorial = () => {
    voorraadTutorialSeen = true;
    setShowTutorial(false);
  };

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: Math.max(0, it.quantity + delta) } : it))
    );
  };

  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar
            title={view === 'cart' ? 'Voorraadbeheer' : 'Voorraadbeheer'}
            showBack
            reserveRightGutter
          />
        </Animated.View>

        <View style={styles.body}>
          <View style={styles.sheet}>
            <View style={styles.handle} />

            {view === 'cart' ? (
              <Animated.View entering={FadeInDown.duration(400).springify()}>
                <View style={styles.sheetHeader}>
                  <View style={styles.sheetHeaderRow}>
                    <MaterialIcons name="inventory-2" size={20} color="#0F172A" />
                    <Text style={styles.sheetTitle}>Jouw winkelmandje</Text>
                  </View>
                  <Text style={styles.sheetSubtitle}>
                    Controleer je items en geef je bijdrage door.
                  </Text>
                </View>

                <View style={styles.itemsList}>
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      name={item.name}
                      brand={item.brand}
                      size={item.size}
                      count={item.count}
                      status={item.status}
                      thumbColor={item.thumbColor}
                      thumbLabel={item.thumbLabel}
                      thumbSubLabel={item.thumbSubLabel}
                      quantity={item.quantity}
                      onDec={() => updateQty(item.id, -1)}
                      onInc={() => updateQty(item.id, 1)}
                    />
                  ))}
                </View>

                <View style={styles.totalRow}>
                  <View style={styles.totalLeft}>
                    <View style={styles.totalCheck}>
                      <MaterialIcons name="check" size={14} color="#FFFFFF" />
                    </View>
                    <Text style={styles.totalLabel}>Totaal items</Text>
                  </View>
                  <Text style={styles.totalValue}>{totalItems} items</Text>
                </View>

                <Pressable
                  onPress={() => setView('delivery')}
                  style={({ pressed }) => [styles.deliverBtn, pressed && { opacity: 0.88 }]}
                >
                  <MaterialCommunityIcons name="cart" size={20} color="#FFFFFF" />
                  <Text style={styles.deliverBtnText}>Afgeven bij de noodkast</Text>
                </Pressable>
              </Animated.View>
            ) : (
              <Animated.View entering={FadeInDown.duration(400).springify()}>
                <View style={styles.sheetHeader}>
                  <View style={styles.sheetHeaderRow}>
                    <View style={styles.greenCheckBubble}>
                      <MaterialIcons name="check" size={14} color="#FFFFFF" />
                    </View>
                    <Text style={styles.sheetTitle}>Bijdrage klaar om in te leveren!</Text>
                  </View>
                  <Text style={styles.sheetSubtitle}>
                    Volg de onderstaande stappen om je bijdrage af te geven.
                  </Text>
                </View>

                <View style={styles.stepsList}>
                  <StepCard
                    icon={{ kind: 'qr' }}
                    title="1. Scan bij jouw noodkast"
                    body="Laat deze QR-code scannen bij het inleverpunt om je bijdrage compleet te maken."
                  />
                  <StepCard
                    icon={{ kind: 'bin' }}
                    title="2. Doe de items in de bak"
                    body="Plaats alle items in de bak bij het inlever punt."
                    tipText="Zorg dat alles goed zichtbaar is in de bak."
                  />
                  <StepCard
                    icon={{ kind: 'check' }}
                    title="3. Winkelmand voltooid"
                    body="De items worden gescant en afgevinkt van je winkelmandje."
                  />
                </View>

                <Pressable
                  onPress={() => setView('cart')}
                  style={({ pressed }) => [styles.backLink, pressed && { opacity: 0.6 }]}
                >
                  <MaterialIcons name="arrow-back" size={18} color="#0F172A" />
                  <Text style={styles.backLinkText}>Terug naar winkelmandje</Text>
                </Pressable>
              </Animated.View>
            )}
          </View>
        </View>
      </ScrollView>

      {showTutorial && <VoorraadTutorial onClose={dismissTutorial} />}
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
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
    marginBottom: 14,
  },
  sheetHeader: {
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    flex: 1,
  },
  sheetSubtitle: {
    fontSize: 14,
    color: '#0F172A',
    marginTop: 6,
    marginLeft: 28,
  },
  greenCheckBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsList: {
    gap: 10,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  totalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totalCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  deliverBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#4ADE80',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 14,
  },
  deliverBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  stepsList: {
    gap: 12,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
    paddingVertical: 10,
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
});
