import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ActionStep {
  id: string;
  title: string;
  preview: string;
  body: string;
  iconBg: string;
  iconColor: string;
}

const STEPS: ActionStep[] = [
  {
    id: '1',
    title: '1. Kijk om naar je omgeving',
    preview: 'Let op de kwetsbare in je omgeving kijk wie er hulp...',
    body: 'Let op kinderen, ouderen en zieken in je directe omgeving. Vraag of ze hulp nodig hebben en deel waar mogelijk je voorraad.',
    iconBg: '#1BD15D',
    iconColor: '#FFFFFF',
  },
  {
    id: '2',
    title: '2. Kijk om naar je omgeving',
    preview: 'Let op de kwetsbare in je omgeving kijk wie er hulp...',
    body: 'Controleer je woning op schade en zorg dat gas, water en elektra veilig zijn afgesloten indien nodig.',
    iconBg: '#F5C842',
    iconColor: '#FFFFFF',
  },
  {
    id: '3',
    title: '3. Kijk om naar je omgeving',
    preview: 'Let op de kwetsbare in je omgeving kijk wie er hulp...',
    body: 'Houd de app in de gaten voor nieuwe updates en volg de instructies van de hulpdiensten.',
    iconBg: '#5EC5E2',
    iconColor: '#FFFFFF',
  },
];

export function ActionStepsCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Wat moet je doen?</Text>
      <Text style={styles.subtitle}>Tips en stappen tijdens een stroomstoring</Text>

      <View style={styles.list}>
        {STEPS.map((step) => (
          <StepRow key={step.id} step={step} />
        ))}
      </View>
    </View>
  );
}

function StepRow({ step }: { step: ActionStep }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setExpanded((v) => !v)}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.9 }]}
    >
      <View style={[styles.iconBubble, { backgroundColor: step.iconBg }]}>
        <MaterialIcons name="visibility" size={22} color={step.iconColor} />
      </View>

      <View style={styles.rowBody}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepText} numberOfLines={expanded ? undefined : 2}>
          {expanded ? step.body : step.preview}
        </Text>
      </View>

      <MaterialIcons
        name={expanded ? 'expand-less' : 'expand-more'}
        size={22}
        color="#9CA3AF"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 12,
  },
  list: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  stepTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 18,
  },
});
