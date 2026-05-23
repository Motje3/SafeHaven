import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';

export default function InstellingenScreen() {
  const insets = useSafeAreaInsets();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);
  const [shareStatus, setShareStatus] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Instellingen" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <Section title="Notificaties">
              <ToggleRow
                icon="notifications-active"
                label="Push-meldingen"
                hint="Direct geïnformeerd bij noodsituaties"
                value={pushNotifications}
                onChange={setPushNotifications}
              />
              <ToggleRow
                icon="email"
                label="E-mail updates"
                hint="Wekelijkse samenvatting per mail"
                value={emailNotifications}
                onChange={setEmailNotifications}
                last
              />
            </Section>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <Section title="Privacy">
              <ToggleRow
                icon="place"
                label="Deel locatie"
                hint="Buren kunnen zien dat je bij de kast bent"
                value={shareLocation}
                onChange={setShareLocation}
              />
              <ToggleRow
                icon="visibility"
                label="Deel mijn status"
                hint="Zichtbaar voor je buddy en buurt"
                value={shareStatus}
                onChange={setShareStatus}
                last
              />
            </Section>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            <Section title="App">
              <LinkRow icon="language" label="Taal" value="Nederlands" />
              <ToggleRow
                icon="dark-mode"
                label="Donker thema"
                value={darkMode}
                onChange={setDarkMode}
                last
              />
            </Section>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(320).springify()}>
            <Section title="Account">
              <LinkRow icon="edit" label="Gegevens bewerken" />
              <LinkRow icon="lock" label="Wachtwoord wijzigen" />
              <LinkRow icon="delete" label="Account verwijderen" danger last />
            </Section>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(400).springify()}>
            <Text style={styles.versionText}>SafeHaven · v1.0.0</Text>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

interface ToggleRowProps {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  last?: boolean;
}

function ToggleRow({ icon, label, hint, value, onChange, last }: ToggleRowProps) {
  return (
    <View style={[styles.row, !last && styles.rowDivider]}>
      <MaterialIcons name={icon} size={20} color="#6B7280" />
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        {hint && <Text style={styles.rowHint}>{hint}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#E5E7EB', true: '#86CFA1' }}
        thumbColor={value ? '#14342B' : '#FFFFFF'}
      />
    </View>
  );
}

interface LinkRowProps {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  label: string;
  value?: string;
  danger?: boolean;
  last?: boolean;
}

function LinkRow({ icon, label, value, danger, last }: LinkRowProps) {
  return (
    <Pressable style={({ pressed }) => [styles.row, !last && styles.rowDivider, pressed && { opacity: 0.6 }]}>
      <MaterialIcons name={icon} size={20} color={danger ? '#EF2A2A' : '#6B7280'} />
      <Text style={[styles.rowLabel, { flex: 1 }, danger && { color: '#EF2A2A' }]}>{label}</Text>
      {value && <Text style={styles.rowValue}>{value}</Text>}
      <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F6' },
  content: {},
  body: { paddingHorizontal: 16, paddingTop: 12, gap: 18 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  rowLabel: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  rowHint: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  rowValue: { fontSize: 13, color: '#6B7280', marginRight: 4 },
  versionText: { fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 8 },
});
