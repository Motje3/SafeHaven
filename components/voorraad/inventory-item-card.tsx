import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type StockStatus = 'critical' | 'warning' | 'ok';

interface InventoryItemCardProps {
  name: string;
  brand: string;
  size: string;
  count: string;
  status: StockStatus;
  thumbColor?: string;
  thumbLabel?: string;
  thumbSubLabel?: string;
  onAdd?: () => void;
}

const STATUS_COLOR: Record<StockStatus, string> = {
  critical: '#EF4444',
  warning: '#F5C842',
  ok: '#22C55E',
};

export function InventoryItemCard({
  name,
  brand,
  size,
  count,
  status,
  thumbColor = '#E5E7EB',
  thumbLabel = '',
  thumbSubLabel = '',
  onAdd,
}: InventoryItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.thumb, { backgroundColor: thumbColor }]}>
        {thumbLabel ? (
          <View style={styles.thumbInner}>
            <Text style={styles.thumbLabel}>{thumbLabel}</Text>
            {thumbSubLabel ? <Text style={styles.thumbSubLabel}>{thumbSubLabel}</Text> : null}
          </View>
        ) : null}
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

      <Pressable
        onPress={onAdd}
        style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.85 }]}
        hitSlop={6}
      >
        <MaterialIcons name="add" size={20} color="#FFFFFF" />
      </Pressable>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbInner: {
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  thumbLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  thumbSubLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    marginTop: 2,
    textTransform: 'uppercase',
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
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  meta: {
    fontSize: 13,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#14342B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
