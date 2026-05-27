import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type SupplyItem = { label: string; consumed?: boolean };

const SUPPLY_ITEMS: SupplyItem[] = [
  { label: '8 L drinkwater' },
  { label: '2x soep in blik', consumed: true },
  { label: '4x nootjes' },
  { label: '4x Volkoren Crackers' },
];

const TOTAL_BLOCKS = 8;
const CONSUMED_BLOCKS = 3;
const CONSUMED_PERCENT = 79;

type ActionItem = {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'] | React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconLib: 'm' | 'mc';
  bg: string;
  iconColor: string;
};

const ACTIONS: ActionItem[] = [
  { label: 'Blijf kalm', icon: 'favorite', iconLib: 'm', bg: '#FEE2E2', iconColor: '#EF2A2A' },
  { label: 'Controleer je veiligheid', icon: 'account-alert', iconLib: 'mc', bg: '#FEF3C7', iconColor: '#D97706' },
  { label: 'Meld je bij de noodkast', icon: 'home', iconLib: 'm', bg: '#D1FAE5', iconColor: '#16A34A' },
];

function ActionIcon({ item }: { item: ActionItem }) {
  if (item.iconLib === 'mc') {
    return (
      <MaterialCommunityIcons
        name={item.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
        size={18}
        color={item.iconColor}
      />
    );
  }
  return (
    <MaterialIcons
      name={item.icon as React.ComponentProps<typeof MaterialIcons>['name']}
      size={18}
      color={item.iconColor}
    />
  );
}

interface EmergencyStatsRowProps {
  onPressActions?: () => void;
}

export function EmergencyStatsRow({ onPressActions }: EmergencyStatsRowProps) {
  return (
    <View style={styles.row}>
      {/* Kluisvoorraad */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <MaterialIcons name="inventory-2" size={18} color="#0F172A" />
          <Text style={styles.headerTitle}>Kluisvoorraad</Text>
        </View>

        <Text style={styles.subtitle}>Vandaag te gebruiken:</Text>

        <View style={styles.itemsList}>
          {SUPPLY_ITEMS.map((item) => (
            <Text
              key={item.label}
              style={[styles.itemText, item.consumed && styles.itemTextConsumed]}
            >
              {item.label}
            </Text>
          ))}
        </View>

        <View style={styles.footerSection}>
          <View style={styles.percentRow}>
            <Text style={styles.percentLabel}>Verbruikt:</Text>
            <Text style={styles.percentText}>{CONSUMED_PERCENT}%</Text>
          </View>
          <View style={styles.blockRow}>
            {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.block,
                  i < CONSUMED_BLOCKS ? styles.blockConsumed : styles.blockEmpty,
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Directe acties */}
      <Pressable
        onPress={onPressActions}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
      >
        <View style={styles.headerRow}>
          <MaterialIcons name="warning" size={18} color="#DC2626" />
          <Text style={styles.headerTitle}>Directe acties</Text>
        </View>

        <View style={styles.actionsList}>
          {ACTIONS.map((action, idx) => (
            <View key={action.label}>
              <View style={styles.actionRow}>
                <View style={[styles.actionIconBubble, { backgroundColor: action.bg }]}>
                  <ActionIcon item={action} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </View>
              {idx < ACTIONS.length - 1 && <View style={styles.actionDivider} />}
            </View>
          ))}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 8,
  },
  itemsList: {
    gap: 4,
    paddingBottom: 14,
  },
  itemText: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '500',
  },
  itemTextConsumed: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
    fontWeight: '400',
  },
  footerSection: {
    marginTop: 'auto',
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
  percentLabel: {
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
  blockConsumed: {
    backgroundColor: '#F5C842',
  },
  blockEmpty: {
    backgroundColor: '#D1D5DB',
  },
  actionsList: {
    paddingBottom: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  actionIconBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    flex: 1,
    fontSize: 10,
    fontWeight: '600',
    color: '#0F172A',
  },
  actionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E7EB',
  },
});
