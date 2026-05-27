import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FillLevel = 'high' | 'mid' | 'low';

interface InventoryItem {
  label: string;
  level: FillLevel;
}

const LEVEL_COLOR: Record<FillLevel, string> = {
  high: '#22C55E',
  mid: '#F5C842',
  low: '#EF4444',
};

const LEVEL_FILL: Record<FillLevel, number> = {
  high: 1,
  mid: 0.55,
  low: 0.18,
};

const INVENTORY: InventoryItem[] = [
  { label: 'Water', level: 'high' },
  { label: 'Toiletartikelen', level: 'high' },
  { label: 'Voedsel', level: 'mid' },
  { label: 'Communicatie', level: 'low' },
];

const ACTION_ITEMS = ['Soep in blik', 'Noten', 'Noodradio', 'Batterijen', 'Zaklampen'];

const TOTAL_BLOCKS = 8;
const FILLED_BLOCKS = 6;

export function InventoryStatsRow() {
  return (
    <View style={styles.row}>
      {/* Totale voorraad */}
      <View style={[styles.card, styles.leftCard]}>
        <View style={styles.headerRow}>
          <MaterialIcons name="inventory-2" size={18} color="#0F172A" />
          <Text style={styles.headerTitle}>Totale voorraad</Text>
        </View>

        <View style={styles.itemsList}>
          {INVENTORY.map((item) => (
            <View key={item.label} style={styles.itemRow}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <View style={styles.miniBarTrack}>
                <View
                  style={[
                    styles.miniBarFill,
                    {
                      backgroundColor: LEVEL_COLOR[item.level],
                      width: `${LEVEL_FILL[item.level] * 100}%`,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footerSection}>
          <View style={styles.percentRow}>
            <Text style={styles.gevuldLabel}>Gevuld:</Text>
            <Text style={styles.percentText}>75%</Text>
          </View>
          <View style={styles.blockRow}>
            {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.block,
                  i < FILLED_BLOCKS ? styles.blockFilled : styles.blockEmpty,
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Actiepunten */}
      <View style={[styles.card, styles.rightCard]}>
        <View style={styles.headerRow}>
          <MaterialIcons name="warning-amber" size={18} color="#0F172A" />
          <Text style={styles.headerTitle}>Actiepunten</Text>
        </View>

        <View style={styles.actionsList}>
          {ACTION_ITEMS.map((item) => (
            <Text key={item} style={styles.actionItem}>
              {item}
            </Text>
          ))}
        </View>

        <View style={styles.activityFooter}>
          <MaterialIcons name="refresh" size={13} color="#6B7280" />
          <Text style={styles.activityText}>18 mensen actief in 24 uur</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  leftCard: {},
  rightCard: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemsList: {
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLabel: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '500',
    flex: 1,
  },
  miniBarTrack: {
    width: 36,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    marginLeft: 8,
  },
  miniBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  footerSection: {
    marginTop: 18,
    marginHorizontal: -14,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#F4F4F6',
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gevuldLabel: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#0F172A',
    fontWeight: '500',
  },
  percentText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
  },
  blockRow: {
    flexDirection: 'row',
    gap: 3,
  },
  block: {
    flex: 1,
    height: 14,
    borderRadius: 3,
  },
  blockFilled: {
    backgroundColor: '#4ADE80',
  },
  blockEmpty: {
    backgroundColor: '#D1D5DB',
  },
  actionsList: {
    gap: 6,
    flex: 1,
  },
  actionItem: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '500',
  },
  activityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 18,
    marginHorizontal: -14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: '#F4F4F6',
  },
  activityText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6B7280',
    fontWeight: '500',
  },
});
