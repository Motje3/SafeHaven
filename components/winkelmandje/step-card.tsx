import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type StepIcon =
  | { kind: 'qr' }
  | { kind: 'bin' }
  | { kind: 'check' };

interface StepCardProps {
  title: string;
  body: string;
  icon: StepIcon;
  tipText?: string;
}

function StepIconView({ icon }: { icon: StepIcon }) {
  if (icon.kind === 'qr') {
    return (
      <View style={[styles.iconBox, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0F172A' }]}>
        <MaterialIcons name="qr-code-2" size={56} color="#0F172A" />
      </View>
    );
  }
  if (icon.kind === 'bin') {
    return (
      <View style={[styles.iconBox, { backgroundColor: '#E5E7EB' }]}>
        <MaterialIcons name="shopping-basket" size={44} color="#6B7280" />
      </View>
    );
  }
  return (
    <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
      <MaterialIcons name="check-circle" size={50} color="#1BD15D" />
    </View>
  );
}

export function StepCard({ title, body, icon, tipText }: StepCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <StepIconView icon={icon} />
        <View style={styles.divider} />
        <View style={styles.textCol}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>
      </View>

      {tipText ? (
        <View style={styles.tipBox}>
          <MaterialIcons name="lightbulb" size={16} color="#1BD15D" />
          <Text style={styles.tipBold}>Tip:</Text>
          <Text style={styles.tipText} numberOfLines={2}>{tipText}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: 64,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  body: {
    fontSize: 10,
    color: '#0F172A',
    lineHeight: 18,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    backgroundColor: '#F1FAEC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tipBold: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
  },
  tipText: {
    flex: 1,
    fontSize: 10,
    color: '#0F172A',
  },
});
