import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';
import { ChatFab } from '@/components/voorraad/chat-fab';
import { DonutProgressCard } from '@/components/voorraad/donut-progress-card';
import { FilterModal, type FilterCategory } from '@/components/voorraad/filter-modal';
import { InventoryItemCard } from '@/components/voorraad/inventory-item-card';
import { SegmentedTabs } from '@/components/voorraad/segmented-tabs';

const TABS = ['Ontbreekt', 'Compleet', 'Mijn bijdrage'];

type Item = {
  id: string;
  name: string;
  brand: string;
  size: string;
  count: string;
  status: 'critical' | 'warning' | 'ok';
  thumbColor: string;
  thumbLabel: string;
  thumbSubLabel?: string;
};

const ITEMS: Item[] = [
  {
    id: '1',
    name: 'Soep in blik',
    brand: 'Unox',
    size: '100 g',
    count: '12/20',
    status: 'critical',
    thumbColor: '#C92A1F',
    thumbLabel: 'Unox',
    thumbSubLabel: 'Tomaten soep',
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
  },
  {
    id: '3',
    name: 'Soep in blik',
    brand: 'Unox',
    size: '100 g',
    count: '12/20',
    status: 'warning',
    thumbColor: '#C92A1F',
    thumbLabel: 'Unox',
    thumbSubLabel: 'Tomaten soep',
  },
];

export default function MarketplaceScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterCategory[]>(['voedsel']);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Voorraadbeheer" reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <SegmentedTabs tabs={TABS} activeIndex={activeTab} onChange={setActiveTab} />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <DonutProgressCard percent={65} collected={200} remaining={10} />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            <View style={styles.listCard}>
              <View style={styles.listHeader}>
                <View style={styles.listTitleCol}>
                  <View style={styles.titleRow}>
                    <MaterialIcons name="restaurant" size={20} color="#0F172A" />
                    <Text style={styles.listTitle}>Inhoud</Text>
                  </View>
                  <Text style={styles.listCount}>3/10 items</Text>
                </View>

                <Pressable
                  onPress={() => setFilterOpen(true)}
                  style={({ pressed }) => [styles.filterBtn, pressed && { opacity: 0.7 }]}
                >
                  <MaterialIcons name="tune" size={16} color="#0F172A" />
                  <Text style={styles.filterText}>Filter</Text>
                  {selectedFilters.length > 0 && (
                    <View style={styles.filterCountDot}>
                      <Text style={styles.filterCountText}>{selectedFilters.length}</Text>
                    </View>
                  )}
                </Pressable>
              </View>

              <View style={styles.itemsList}>
                {ITEMS.map((item) => (
                  <InventoryItemCard
                    key={item.id}
                    name={item.name}
                    brand={item.brand}
                    size={item.size}
                    count={item.count}
                    status={item.status}
                    thumbColor={item.thumbColor}
                    thumbLabel={item.thumbLabel}
                    thumbSubLabel={item.thumbSubLabel}
                  />
                ))}
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      <View style={[styles.fabWrap, { bottom: insets.bottom + 100 }]}>
        <ChatFab count={3} />
      </View>

      <FilterModal
        visible={filterOpen}
        selected={selectedFilters}
        onClose={() => setFilterOpen(false)}
        onApply={setSelectedFilters}
      />
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
    gap: 16,
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
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
    marginBottom: 14,
  },
  listTitleCol: {
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  listTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  listCount: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 26,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  filterCountDot: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  filterCountText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  itemsList: {
    gap: 10,
  },
  fabWrap: {
    position: 'absolute',
    right: 20,
  },
});
