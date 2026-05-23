import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BoltPoint {
  hour: number;
  intensity: 'high' | 'mid' | 'low' | 'none';
}

const HOURS = [8, 10, 12, 14, 16, 18, 20, 22];

const POINTS: BoltPoint[] = [
  { hour: 8, intensity: 'low' },
  { hour: 9, intensity: 'mid' },
  { hour: 10, intensity: 'mid' },
  { hour: 11, intensity: 'low' },
  { hour: 12, intensity: 'high' },
  { hour: 13, intensity: 'high' },
  { hour: 14, intensity: 'high' },
  { hour: 15, intensity: 'high' },
  { hour: 16, intensity: 'mid' },
];

const COLOR: Record<BoltPoint['intensity'], string> = {
  high: '#22C55E',
  mid: '#4ADE80',
  low: '#86EFAC',
  none: 'transparent',
};

interface OpbrengstpiekCardProps {
  temperature?: number;
  condition?: string;
}

export function OpbrengstpiekCard({
  temperature = 18,
  condition = 'Licht bewolkt',
}: OpbrengstpiekCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleCol}>
          <View style={styles.titleRow}>
            <MaterialCommunityIcons name="weather-sunny-alert" size={20} color="#0F172A" />
            <Text style={styles.title}>Opbrengstpiek</Text>
          </View>
          <Text style={styles.subtitle}>Zonne-opbrengst aankomende 72 uur</Text>
        </View>

        <View style={styles.weatherCol}>
          <View style={styles.weatherRow}>
            <Text style={styles.temp}>{temperature}˚C</Text>
            <MaterialCommunityIcons name="cloud" size={26} color="#9CA3AF" />
          </View>
          <Text style={styles.condition}>{condition}</Text>
        </View>
      </View>

      <View style={styles.chart}>
        <View style={styles.chartLine} />
        <View style={styles.boltsRow}>
          {POINTS.map((p, i) => (
            <MaterialCommunityIcons
              key={i}
              name="lightning-bolt"
              size={18}
              color={COLOR[p.intensity]}
            />
          ))}
        </View>
      </View>

      <View style={styles.axisRow}>
        {HOURS.map((h) => (
          <Text key={h} style={styles.axisText}>
            {h}:00
          </Text>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  titleCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 2,
  },
  weatherCol: {
    alignItems: 'flex-end',
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  temp: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  condition: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  chart: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  chartLine: {
    height: 2,
    backgroundColor: '#14342B',
    position: 'absolute',
    left: 4,
    right: 4,
    top: '50%',
  },
  boltsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  axisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 2,
  },
  axisText: {
    fontSize: 11,
    color: '#6B7280',
  },
});
