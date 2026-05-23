import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Profiel" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()} style={styles.heroCard}>
            <View style={styles.avatar} />
            <Text style={styles.name}>Gavin van der Berg</Text>
            <Text style={styles.sub}>Nummer 13B · Katendrecht</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Persoonlijke gegevens</Text>
              <Row icon="phone" label="Telefoon" value="06 123 456 789" />
              <Row icon="email" label="E-mail" value="Gavinvdberg@gmail.com" />
              <Row icon="home" label="Adres" value="Waterleliekade 5, Den Haag" />
              <Row icon="people" label="Huishouden" value="3 personen" last />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Mijn rol</Text>
              <View style={styles.rolePill}>
                <MaterialCommunityIcons name="hand-heart" size={16} color="#14342B" />
                <Text style={styles.rolePillText}>Buddy beschikbaar</Text>
              </View>
              <Text style={styles.helpsText}>Ik kan helpen bij:</Text>
              <View style={styles.chipRow}>
                {['Boodschappen', 'Mobiliteit', 'Gezelschap'].map((tag) => (
                  <View key={tag} style={styles.chip}>
                    <Text style={styles.chipText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

interface RowProps {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  label: string;
  value: string;
  last?: boolean;
}

function Row({ icon, label, value, last }: RowProps) {
  return (
    <View style={[styles.row, !last && styles.rowDivider]}>
      <MaterialIcons name={icon} size={18} color="#6B7280" />
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F6' },
  content: {},
  body: { paddingHorizontal: 16, paddingTop: 12, gap: 14 },
  heroCard: {
    backgroundColor: '#14342B',
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#86CFA1',
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.3 },
  sub: { fontSize: 13, color: '#D1D5DB', marginTop: 2 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  rowLabel: { fontSize: 12, color: '#6B7280' },
  rowValue: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  rolePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#F5C842',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  rolePillText: { fontSize: 13, fontWeight: '700', color: '#14342B' },
  helpsText: { fontSize: 13, color: '#6B7280', marginTop: 12, marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F4F4F6',
    borderRadius: 8,
  },
  chipText: { fontSize: 12, fontWeight: '600', color: '#0F172A' },
});
