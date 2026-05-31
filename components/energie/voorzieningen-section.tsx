import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const FILTERS = ['Alles', 'Beschikbaar'];

type Station = {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  status: 'available' | 'full';
};

const STATIONS: Station[] = [
  { id: '1', name: 'Powerbank station', subtitle: '3 oplaadplekken beschikbaar', location: '10 A', status: 'available' },
  { id: '2', name: 'Laptop laden', subtitle: '0x laptop laden aankomend uur', location: '', status: 'full' },
  { id: '3', name: 'Powerbank station', subtitle: '3 oplaadplekken beschikbaar', location: '10 B', status: 'available' },
];

export function VoorzieningenSection() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const visible = active === 1 ? STATIONS.filter((s) => s.status === 'available') : STATIONS;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialIcons name="devices" size={20} color="#0F172A" />
        <Text style={styles.title}>Laadvoorzieningen</Text>
      </View>

      <View style={styles.pillRow}>
        {FILTERS.map((label, i) => {
          const isActive = i === active;
          return (
            <Pressable
              key={label}
              onPress={() => setActive(i)}
              style={({ pressed }) => [
                styles.pill,
                isActive ? styles.pillActive : styles.pillInactive,
                pressed && !isActive && { opacity: 0.75 },
              ]}
            >
              <Text style={styles.pillText}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.list}>
        {visible.map((station, i) => (
          <View key={station.id}>
            <View style={styles.stationRow}>
              <View style={styles.stationCol}>
                <Text style={styles.stationName}>{station.name}</Text>
                <Text style={styles.stationSubtitle}>{station.subtitle}</Text>
                {station.location ? <Text style={styles.stationLocation}>{station.location}</Text> : null}
              </View>

              {station.status === 'available' ? (
                <Pressable style={({ pressed }) => [styles.claimBtn, pressed && { opacity: 0.85 }]}>
                  <Text style={styles.claimText}>Claim</Text>
                </Pressable>
              ) : (
                <View style={styles.fullBadge}>
                  <Text style={styles.fullText}>Vol</Text>
                </View>
              )}
            </View>
            {i < visible.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      <Pressable
        onPress={() => setExpanded((v) => !v)}
        style={({ pressed }) => [styles.expandBtn, pressed && { opacity: 0.6 }]}
        hitSlop={8}
      >
        <MaterialIcons name={expanded ? 'expand-less' : 'expand-more'} size={24} color="#0F172A" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  pill: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: '#F5C842',
    borderColor: '#F5C842',
  },
  pillInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  list: {
    marginTop: 4,
  },
  stationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  stationCol: {
    flex: 1,
    gap: 2,
  },
  stationName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  stationSubtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  stationLocation: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  claimBtn: {
    backgroundColor: '#1BD15D',
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 10,
  },
  claimText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  fullBadge: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EF4444',
    backgroundColor: '#FFFFFF',
  },
  fullText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 11,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E7EB',
  },
  expandBtn: {
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
  },
});
