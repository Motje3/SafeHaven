import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { CartItemRow } from '@/components/winkelmandje/cart-item-row';
import { StepCard } from '@/components/winkelmandje/step-card';

type CartItem = {
  id: string;
  name: string;
  brand: string;
  size: string;
  count: string;
  status: 'critical' | 'warning' | 'ok';
  image: ImageSourcePropType;
  quantity: number;
};

const INITIAL_ITEMS: CartItem[] = [
  {
    id: '1',
    name: 'Soep in blik',
    brand: 'Merk naar keuze',
    size: '800 ml',
    count: '0/20',
    status: 'critical',
    image: require('../../public/soep.png'),
    quantity: 2,
  },
  {
    id: '2',
    name: 'Penne',
    brand: 'Merk naar keuze',
    size: '500 g',
    count: '12/20',
    status: 'warning',
    image: require('../../public/penne.png'),
    quantity: 2,
  },
  {
    id: '3',
    name: 'Penne',
    brand: 'Merk naar keuze',
    size: '800 ml',
    count: '12/20',
    status: 'warning',
    image: require('../../public/penne.png'),
    quantity: 2,
  },
];

interface WinkelmandjeSheetProps {
  onScanRequest?: () => void;
}

export function WinkelmandjeSheet({ onScanRequest }: WinkelmandjeSheetProps) {
  const router = useRouter();
  const [view, setView] = useState<'cart' | 'delivery'>('cart');
  const [items, setItems] = useState(INITIAL_ITEMS);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: Math.max(0, it.quantity + delta) } : it))
    );
  };

  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);

  const handleScan = () => {
    if (onScanRequest) onScanRequest();
    else router.push('/qr-code' as any);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.handle} />

      {view === 'cart' ? (
        <Animated.View entering={FadeInDown.duration(300).springify()}>
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
                image={item.image}
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
            <Text style={styles.deliverBtnText}>Afgeven bij de BuurtHub</Text>
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeInDown.duration(300).springify()}>
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
            <Pressable
              onPress={handleScan}
              style={({ pressed }) => pressed && { opacity: 0.85 }}
            >
              <StepCard
                icon={{ kind: 'qr' }}
                title="1. Scan bij jouw BuurtHub"
                body="Laat deze QR-code scannen bij het inleverpunt om je bijdrage compleet te maken."
              />
            </Pressable>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 24,
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
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    flex: 1,
  },
  sheetSubtitle: {
    fontSize: 11,
    color: '#0F172A',
    marginTop: 6,
    marginLeft: 28,
  },
  greenCheckBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1BD15D',
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
    backgroundColor: '#1BD15D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '600',
  },
  deliverBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#1BD15D',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 14,
  },
  deliverBtnText: {
    fontSize: 12,
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
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
});
