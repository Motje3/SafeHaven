import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';
import { ChatFab } from '@/components/voorraad/chat-fab';
import { DonutProgressCard } from '@/components/voorraad/donut-progress-card';
import { FilterModal, type FilterCategory } from '@/components/voorraad/filter-modal';
import { InventoryItemCard } from '@/components/voorraad/inventory-item-card';
import { SegmentedTabs } from '@/components/voorraad/segmented-tabs';
import { VoorraadTutorial } from '@/components/winkelmandje/voorraad-tutorial';
import { WinkelmandjeSheet } from '@/components/winkelmandje/winkelmandje-sheet';
import { useEmergency } from '@/hooks/use-emergency';

// Module-level flag so the 5-step tutorial only shows once per app session.
let voorraadTutorialSeen = false;

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
    brand: 'Merk naar keuze',
    size: '800 ml',
    count: '0/20',
    status: 'critical',
    thumbColor: '#E2EAD5',
    thumbLabel: 'Unox',
    thumbSubLabel: 'Tomaten soep',
  },
  {
    id: '2',
    name: 'Penne',
    brand: 'Merk naar keuze',
    size: '500 g',
    count: '12/20',
    status: 'warning',
    thumbColor: '#F5E7C8',
    thumbLabel: 'Penne',
    thumbSubLabel: 'Grand Italia',
  },
  {
    id: '3',
    name: 'Soep in blik',
    brand: 'Merk naar keuze',
    size: '800 ml',
    count: '20/20',
    status: 'ok',
    thumbColor: '#E2EAD5',
    thumbLabel: 'Unox',
    thumbSubLabel: 'Tomaten soep',
  },
];

const NOOD_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Soep in blik',
    brand: 'Unox',
    size: '100 g',
    count: '20/20',
    status: 'warning',
    thumbColor: '#E2EAD5',
    thumbLabel: 'Unox',
    thumbSubLabel: 'Tomaten soep',
  },
  {
    id: '2',
    name: 'Penne',
    brand: 'Grand Italia',
    size: '500 g',
    count: '20/20',
    status: 'warning',
    thumbColor: '#E2EAD5',
    thumbLabel: 'Penne',
    thumbSubLabel: 'Grand Italia',
  },
  {
    id: '3',
    name: 'Soep in blik',
    brand: 'Unox',
    size: '100 g',
    count: '20/20',
    status: 'warning',
    thumbColor: '#E2EAD5',
    thumbLabel: 'Unox',
    thumbSubLabel: 'Tomaten soep',
  },
];

export default function MarketplaceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { emergency } = useEmergency();
  const [activeTab, setActiveTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterCategory[]>(['voedsel']);
  const [cartOpen, setCartOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(!voorraadTutorialSeen && !emergency);

  const dismissTutorial = () => {
    voorraadTutorialSeen = true;
    setShowTutorial(false);
  };

  if (emergency) {
    return (
      <View style={styles.root}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <Animated.View entering={FadeInDown.duration(400).springify()}>
            <ScreenTopBar title="Jouw noodvoorraad" reserveRightGutter />
          </Animated.View>

          <View style={styles.body}>
            <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
              <View style={styles.doorCard}>
                <View style={styles.doorTextCol}>
                  <Text style={styles.doorTitle}>Deur van kluisje</Text>
                  <Text style={styles.doorStatus}>
                    Status: <Text style={styles.doorStatusItalic}>Gesloten</Text>
                  </Text>
                </View>
                <Pressable style={({ pressed }) => [styles.lockBtn, pressed && { opacity: 0.85 }]}>
                  <MaterialIcons name="lock" size={26} color="#0F172A" />
                </Pressable>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
              <View style={styles.howCard}>
                <Text style={styles.howTitle}>Hoe werkt het?</Text>
                <Text style={styles.howSubtitle}>Ga verstandig om met je noodvoorraad!</Text>

                <View style={styles.howInner}>
                  <View style={styles.howThumbCircle}>
                    <MaterialCommunityIcons name="thumb-up" size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.howInnerBody}>
                    <Text style={styles.howInnerTitle}>Dit is jouw voorraad</Text>
                    <Text style={styles.howInnerSub}>Deze voorraad is berekent op basis van …</Text>
                  </View>
                  <MaterialIcons name="keyboard-arrow-down" size={22} color="#0F172A" />
                </View>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
              <View style={styles.listCard}>
                <View style={styles.listHeader}>
                  <View style={styles.listTitleCol}>
                    <View style={styles.titleRow}>
                      <MaterialIcons name="restaurant" size={20} color="#0F172A" />
                      <Text style={styles.listTitle}>Inhoud</Text>
                    </View>
                    <Text style={styles.listCount}>20 items</Text>
                  </View>

                  <Pressable
                    onPress={() => setFilterOpen(true)}
                    style={({ pressed }) => [styles.filterBtn, pressed && { opacity: 0.7 }]}
                  >
                    <MaterialIcons name="tune" size={16} color="#0F172A" />
                    <Text style={styles.filterText}>Filter</Text>
                  </Pressable>
                </View>

                <View style={styles.itemsList}>
                  {NOOD_ITEMS.map((item) => (
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

        <FilterModal
          visible={filterOpen}
          selected={selectedFilters}
          onClose={() => setFilterOpen(false)}
          onApply={setSelectedFilters}
        />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
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
                    onAdd={() => {}}
                  />
                ))}
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      <View style={[styles.fabWrap, { bottom: insets.bottom + 16 }]}>
        <ChatFab count={3} onPress={() => setCartOpen(true)} />
      </View>

      <FilterModal
        visible={filterOpen}
        selected={selectedFilters}
        onClose={() => setFilterOpen(false)}
        onApply={setSelectedFilters}
      />

      <Modal
        visible={cartOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setCartOpen(false)}
      >
        <Pressable style={styles.sheetBackdrop} onPress={() => setCartOpen(false)} />
        <View style={[styles.sheetContainer, { paddingBottom: insets.bottom + 8 }]}>
          <WinkelmandjeSheet
            onScanRequest={() => {
              setCartOpen(false);
              router.push('/qr-code' as any);
            }}
          />
        </View>
      </Modal>

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
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 16,
  },

  doorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  doorTextCol: {
    flex: 1,
  },
  doorTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  doorStatus: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  doorStatusItalic: {
    fontStyle: 'italic',
  },
  lockBtn: {
    width: 56,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5C842',
    alignItems: 'center',
    justifyContent: 'center',
  },

  howCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  howTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  howSubtitle: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 10,
  },
  howInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F6',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  howThumbCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  howInnerBody: {
    flex: 1,
  },
  howInnerTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  howInnerSub: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 1,
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
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  listCount: {
    fontSize: 10,
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
    fontSize: 10,
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
    fontSize: 8,
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
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '75%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
});
