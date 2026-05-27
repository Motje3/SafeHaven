import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InfoStat {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  value: string;
  label: string;
}

interface EmergencyStatusCardProps {
  title?: string;
  subtitle?: string;
  stats?: InfoStat[];
}

const DEFAULT_STATS: InfoStat[] = [
  { icon: 'access-time', value: '14.30', label: 'Starttijd stroomuitval' },
  { icon: 'autorenew', value: '1 min', label: 'Laatste update' },
];

export function EmergencyStatusCard({
  title = 'Status: Stroomstoring',
  subtitle = 'Er is momenteel een storing. U krijgt zo snel mogelijk meer informatie.',
  stats = DEFAULT_STATS,
}: EmergencyStatusCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialIcons name="warning" size={22} color="#DC2626" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <MaterialIcons name={stat.icon} size={20} color="#0F172A" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#14342B',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    color: '#D1D5DB',
    marginTop: 8,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'center',
  },
});
