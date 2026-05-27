import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type FilterCategory =
  | 'voedsel'
  | 'koken'
  | 'medisch'
  | 'hygiene'
  | 'communicatie'
  | 'licht'
  | 'baby'
  | 'gereedschap'
  | 'huisdieren';

type IconLib = 'mi' | 'mci';

type CategoryDef = {
  key: FilterCategory;
  label: string;
  icon: { lib: IconLib; name: string };
};

const CATEGORIES: CategoryDef[] = [
  { key: 'voedsel', label: 'Voedsel & Drinken', icon: { lib: 'mci', name: 'silverware-fork-knife' } },
  { key: 'koken', label: 'Koken & bereiden', icon: { lib: 'mci', name: 'pot-steam' } },
  { key: 'medisch', label: 'Medisch & EHBO', icon: { lib: 'mci', name: 'medical-bag' } },
  { key: 'hygiene', label: 'Hygiëne & sanitair', icon: { lib: 'mci', name: 'hand-wash' } },
  { key: 'communicatie', label: 'Communicatie & stroom', icon: { lib: 'mi', name: 'group' } },
  { key: 'licht', label: 'Licht & warmte', icon: { lib: 'mi', name: 'flashlight-on' } },
  { key: 'baby', label: 'Baby & kinderen', icon: { lib: 'mci', name: 'baby-bottle-outline' } },
  { key: 'gereedschap', label: 'Gereedschap & veiligheid', icon: { lib: 'mci', name: 'wrench' } },
  { key: 'huisdieren', label: 'Huisdieren', icon: { lib: 'mi', name: 'pets' } },
];

interface FilterModalProps {
  visible: boolean;
  selected: FilterCategory[];
  onClose: () => void;
  onApply: (selected: FilterCategory[]) => void;
}

export function FilterModal({ visible, selected, onClose, onApply }: FilterModalProps) {
  const insets = useSafeAreaInsets();
  const [local, setLocal] = useState<FilterCategory[]>(selected);

  useEffect(() => {
    if (visible) setLocal(selected);
  }, [visible, selected]);

  const toggle = (key: FilterCategory) => {
    setLocal((cur) => (cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]));
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { paddingBottom: insets.bottom + 14 }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.handle} />

          <View style={styles.headerRow}>
            <MaterialCommunityIcons name="filter-variant" size={22} color="#0F172A" />
            <Text style={styles.title}>Filter</Text>
          </View>
          <Text style={styles.subtitle}>Categorie</Text>

          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = local.includes(cat.key);
              return (
                <Pressable
                  key={cat.key}
                  onPress={() => toggle(cat.key)}
                  style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
                >
                  <View style={styles.iconBox}>
                    {cat.icon.lib === 'mi' ? (
                      <MaterialIcons name={cat.icon.name as any} size={20} color="#FFFFFF" />
                    ) : (
                      <MaterialCommunityIcons name={cat.icon.name as any} size={20} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.rowLabel}>{cat.label}</Text>
                  <View style={[styles.indicator, isSelected && styles.indicatorSelected]}>
                    {isSelected && <MaterialIcons name="check" size={14} color="#FFFFFF" />}
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          <Pressable
            onPress={() => {
              onApply(local);
              onClose();
            }}
            style={({ pressed }) => [styles.applyBtn, pressed && { opacity: 0.88 }]}
          >
            <Text style={styles.applyText}>Toepassen</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 10,
    maxHeight: '78%',
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    color: '#0F172A',
    marginTop: 4,
    marginLeft: 30,
    marginBottom: 14,
  },
  list: {
    flexGrow: 0,
  },
  listContent: {
    gap: 10,
    paddingBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 28,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 14,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  indicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorSelected: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  applyBtn: {
    backgroundColor: '#4ADE80',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  applyText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
});
