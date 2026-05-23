import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Alert =
  | { kind: 'info'; id: string; text: string; time: string }
  | { kind: 'help'; id: string; user: string; location: string; time: string }
  | { kind: 'question'; id: string; text: string; time: string };

const ALERTS: Alert[] = [
  { kind: 'info', id: '1', text: 'Gavin en 24 anderen zijn nu bij de noodkast', time: '12:45' },
  { kind: 'help', id: '2', user: 'Frank', location: 'beursplein 8', time: '12:45' },
  { kind: 'question', id: '3', text: 'Lola vraagt wie er bij de kast is', time: '12:45' },
  { kind: 'help', id: '4', user: 'Lola', location: 'beursplein 8', time: '12:45' },
];

export function NeighborhoodAlertsCard() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialIcons name="notifications" size={20} color="#14342B" />
        <Text style={styles.headerTitle}>Meldingen van de buurt</Text>
      </View>
      <View style={styles.headerDivider} />

      {ALERTS.map((alert, i) => (
        <View key={alert.id}>
          <AlertRow alert={alert} />
          {i < ALERTS.length - 1 && <View style={styles.rowDivider} />}
        </View>
      ))}
    </View>
  );
}

function AlertRow({ alert }: { alert: Alert }) {
  if (alert.kind === 'info') {
    return (
      <View style={styles.row}>
        <Text style={styles.infoText}>{alert.text}</Text>
        <Text style={styles.time}>{alert.time}</Text>
      </View>
    );
  }

  if (alert.kind === 'help') {
    return (
      <View style={styles.row}>
        <View style={styles.helpBadge}>
          <MaterialCommunityIcons name="shield-alert" size={18} color="#FFFFFF" />
        </View>
        <View style={styles.helpTextCol}>
          <Text style={styles.helpTitle}>{alert.user} vraagt om hulp.</Text>
          <Text style={styles.helpLocation}>Locatie: {alert.location}</Text>
        </View>
        <Text style={styles.time}>{alert.time}</Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={styles.questionCol}>
        <Text style={styles.infoText}>{alert.text}</Text>
        <View style={styles.respondRow}>
          <Text style={styles.respondLabel}>Reageer</Text>
          <Pressable style={styles.respondBtn}>
            <Text style={styles.respondBtnText}>Ja</Text>
          </Pressable>
          <Pressable style={styles.respondBtn}>
            <Text style={styles.respondBtnText}>Nee</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.time}>{alert.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#14342B',
  },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E7EB',
    marginBottom: 4,
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#0F172A',
    lineHeight: 18,
  },
  time: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  helpBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EF2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpTextCol: {
    flex: 1,
    gap: 2,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#0F172A',
  },
  helpLocation: {
    fontSize: 13,
    color: '#0F172A',
  },
  questionCol: {
    flex: 1,
    gap: 6,
  },
  respondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  respondLabel: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  respondBtn: {
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  respondBtnText: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
});
