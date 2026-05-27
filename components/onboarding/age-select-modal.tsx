import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export type AgeCategory = 'senior' | 'volwassene' | 'jongere' | 'kind' | 'baby';

export const AGE_CATEGORIES: { key: AgeCategory; label: string; range: string }[] = [
  { key: 'senior', label: 'Senior', range: '65 jaar en ouder' },
  { key: 'volwassene', label: 'Volwassene', range: '26 t/m 64 jaar' },
  { key: 'jongere', label: 'Jongere', range: '15 t/m 25 jaar' },
  { key: 'kind', label: 'Kind', range: '3 t/m 14 jaar' },
  { key: 'baby', label: 'Baby', range: '0 t/m 3 jaar' },
];

interface AgeSelectModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (category: AgeCategory) => void;
}

export function AgeSelectModal({ visible, onClose, onSelect }: AgeSelectModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Selecteer leeftijd</Text>
            <Pressable
              onPress={onClose}
              hitSlop={10}
              style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.6 }]}
            >
              <MaterialIcons name="close" size={20} color="#0F172A" />
            </Pressable>
          </View>

          <View style={styles.list}>
            {AGE_CATEGORIES.map((cat, idx) => (
              <Pressable
                key={cat.key}
                onPress={() => {
                  onSelect(cat.key);
                  onClose();
                }}
                style={({ pressed }) => [
                  styles.row,
                  idx < AGE_CATEGORIES.length - 1 && styles.rowBorder,
                  pressed && { backgroundColor: '#F8F8F4' },
                ]}
              >
                <Text style={styles.rowLabel}>{cat.label}</Text>
                <Text style={styles.rowRange}>{cat.range}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  rowRange: {
    fontSize: 11,
    color: '#6B7280',
  },
});
