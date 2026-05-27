import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type MarkerKind = 'dot' | 'bolt';

interface Marker {
  hour: number;
  kind: MarkerKind;
}

const LABEL_HOURS = new Set([8, 10, 12, 14, 16, 18, 20, 22]);

const MARKERS: Marker[] = [
  { hour: 8, kind: 'dot' },
  { hour: 9, kind: 'bolt' },
  { hour: 10, kind: 'bolt' },
  { hour: 11, kind: 'dot' },
  { hour: 12, kind: 'bolt' },
  { hour: 13, kind: 'bolt' },
  { hour: 14, kind: 'dot' },
  { hour: 15, kind: 'bolt' },
  { hour: 16, kind: 'dot' },
  { hour: 17, kind: 'dot' },
  { hour: 18, kind: 'dot' },
  { hour: 19, kind: 'dot' },
  { hour: 20, kind: 'dot' },
  { hour: 21, kind: 'dot' },
  { hour: 22, kind: 'dot' },
];

export function OpbrengstpiekCard() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialCommunityIcons name="weather-sunny" size={20} color="#0F172A" />
        <Text style={styles.title}>Opbrengstpiek</Text>
      </View>
      <Text style={styles.subtitle}>Zonne-opbrengst aankomende 72 uur</Text>

      <View style={styles.chart}>
        {MARKERS.map((m, i) => (
          <View key={i} style={styles.markerCol}>
            <View style={styles.markerHead}>
              {m.kind === 'bolt' ? (
                <MaterialCommunityIcons name="lightning-bolt" size={18} color="#22C55E" />
              ) : (
                <View style={styles.dot} />
              )}
            </View>
            <View style={styles.stem} />
            <Text style={styles.axisText}>{LABEL_HOURS.has(m.hour) ? `${m.hour}:00` : ' '}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 12,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  markerCol: {
    alignItems: 'center',
    flex: 1,
  },
  markerHead: {
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#0F172A',
  },
  stem: {
    width: 1.5,
    height: 18,
    backgroundColor: '#0F172A',
    marginTop: 1,
  },
  axisText: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
  },
});
