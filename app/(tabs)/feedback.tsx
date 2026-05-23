import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';

const TOPICS = ['App', 'Noodkast', 'Buddy systeem', 'Anders'];

export default function FeedbackScreen() {
  const insets = useSafeAreaInsets();
  const [topic, setTopic] = useState(0);
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);

  function submit() {
    if (!body.trim()) return;
    setSent(true);
    setBody('');
    setTimeout(() => setSent(false), 2000);
  }

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Feedback" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <View style={styles.intro}>
              <MaterialIcons name="forum" size={22} color="#F5C842" />
              <Text style={styles.introText}>
                Laat ons weten wat beter kan. We lezen elke melding en gebruiken jouw input om de app en de noodkast te verbeteren.
              </Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.card}>
              <Text style={styles.label}>Onderwerp</Text>
              <View style={styles.chipRow}>
                {TOPICS.map((t, i) => {
                  const active = i === topic;
                  return (
                    <Pressable
                      key={t}
                      onPress={() => setTopic(i)}
                      style={({ pressed }) => [
                        styles.chip,
                        active && styles.chipActive,
                        pressed && !active && { opacity: 0.7 },
                      ]}
                    >
                      <Text style={[styles.chipText, active && styles.chipTextActive]}>{t}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.label}>Jouw bericht</Text>
              <TextInput
                multiline
                value={body}
                onChangeText={setBody}
                placeholder="Beschrijf wat je hebt opgemerkt of zou willen veranderen..."
                placeholderTextColor="#9CA3AF"
                style={styles.textarea}
              />

              <Pressable
                onPress={submit}
                disabled={!body.trim()}
                style={({ pressed }) => [
                  styles.submitBtn,
                  !body.trim() && { opacity: 0.4 },
                  pressed && body.trim() && { opacity: 0.85 },
                ]}
              >
                <MaterialIcons name="send" size={16} color="#FFFFFF" />
                <Text style={styles.submitText}>{sent ? 'Verstuurd!' : 'Verstuur feedback'}</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F6' },
  content: {},
  body: { paddingHorizontal: 16, paddingTop: 12, gap: 14 },
  intro: {
    flexDirection: 'row',
    backgroundColor: '#14342B',
    borderRadius: 18,
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  introText: { flex: 1, fontSize: 13, color: '#D1D5DB', lineHeight: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  label: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginTop: 8, marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#F4F4F6',
    borderRadius: 10,
  },
  chipActive: { backgroundColor: '#F5C842' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
  chipTextActive: { color: '#14342B' },
  textarea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#0F172A',
    textAlignVertical: 'top',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#14342B',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 14,
  },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
