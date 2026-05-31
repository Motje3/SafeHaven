import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

type StockStatus = 'critical' | 'warning' | 'ok';

interface CartItemRowProps {
  name: string;
  brand: string;
  size: string;
  count: string;
  status: StockStatus;
  image: ImageSourcePropType;
  quantity: number;
  onDec?: () => void;
  onInc?: () => void;
}

const STATUS_COLOR: Record<StockStatus, string> = {
  critical: '#EF4444',
  warning: '#F5C842',
  ok: '#1BD15D',
};

// Soft green behind the product thumbnails
const THUMB_GREEN = '#E9F2E1';

export function CartItemRow({
  name,
  brand,
  size,
  count,
  status,
  image,
  quantity,
  onDec,
  onInc,
}: CartItemRowProps) {
  return (
    <View style={styles.card}>
      <View style={styles.thumb}>
        <Image source={image} style={styles.thumbImage} resizeMode="contain" />
      </View>

      <View style={styles.divider} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>
          {brand}, {size}
        </Text>
        <View style={[styles.countBadge, { backgroundColor: STATUS_COLOR[status] }]}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      </View>

      <View style={styles.qtyControls}>
        <Pressable
          onPress={onDec}
          hitSlop={6}
          style={({ pressed }) => [styles.qtyBtn, styles.qtyBtnDec, pressed && { opacity: 0.7 }]}
        >
          <MaterialIcons name="remove" size={18} color="#0F172A" />
        </Pressable>
        <Text style={styles.qtyValue}>{quantity}</Text>
        <Pressable
          onPress={onInc}
          hitSlop={6}
          style={({ pressed }) => [styles.qtyBtn, styles.qtyBtnInc, pressed && { opacity: 0.7 }]}
        >
          <MaterialIcons name="add" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#EEEEF1',
  },
  thumb: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: THUMB_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  divider: {
    width: 1,
    height: 56,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  meta: {
    fontSize: 10,
    color: '#6B7280',
  },
  countBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 4,
  },
  countText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnDec: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0F172A',
  },
  qtyBtnInc: {
    backgroundColor: '#1BD15D',
  },
  qtyValue: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    minWidth: 22,
    textAlign: 'center',
  },
});
