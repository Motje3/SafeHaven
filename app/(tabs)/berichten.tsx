import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';

type Message = {
  id: string;
  who: string;
  preview: string;
  time: string;
  unread?: number;
  avatarBg: string;
};

const MESSAGES: Message[] = [
  { id: '1', who: 'Buurman nummer 12', preview: 'Ik wilde een afspraak inplanne…', time: '12:45', unread: 1, avatarBg: '#D4A86A' },
  { id: '2', who: 'Buurman nummer 12', preview: 'Ik wilde een afspraak inplanne…', time: '12:45', unread: 1, avatarBg: '#7DCBE8' },
  { id: '3', who: 'Buurman nummer 12', preview: 'Ik wilde een afspraak inplanne…', time: '12:45', avatarBg: '#7DCBE8' },
  { id: '4', who: 'Buurman nummer 12', preview: 'Ik wilde een afspraak inplanne…', time: '12:45', unread: 1, avatarBg: '#7DCBE8' },
  { id: '5', who: 'Buurman nummer 12', preview: 'Ik wilde een afspraak inplanne…', time: '12:45', avatarBg: '#D4A86A' },
  { id: '6', who: 'Buurman nummer 12', preview: 'Ik wilde een afspraak inplanne…', time: '12:45', avatarBg: '#D4A86A' },
  { id: '7', who: 'Buurman nummer 12', preview: 'Ik wilde een afspraak inplanne…', time: '12:45', avatarBg: '#7DCBE8' },
];

export default function BerichtenScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Berichten" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <View style={styles.alertCard}>
              <View style={styles.alertHeaderRow}>
                <MaterialIcons name="warning-amber" size={20} color="#FFFFFF" />
                <Text style={styles.alertTitle}>Belangrijke meldingen</Text>
              </View>
              <Text style={styles.alertBody}>
                Helaas is vanmiddag het laadstation op het picknick bankje kapot gegaan. Wordt z.s.m gerepareerd!
              </Text>
              <View style={styles.dotsRow}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.listCard}>
              <View style={styles.listHeader}>
                <MaterialIcons name="chat-bubble-outline" size={18} color="#0F172A" />
                <Text style={styles.listTitle}>Berichten</Text>
              </View>

              <View style={styles.headerDivider} />

              {MESSAGES.map((m, i) => (
                <React.Fragment key={m.id}>
                  <View style={styles.row}>
                    <View style={[styles.avatar, { backgroundColor: m.avatarBg }]}>
                      <MaterialCommunityIcons name="dog" size={22} color="#FFFFFF" />
                    </View>
                    <View style={styles.rowBody}>
                      <Text style={styles.rowWho}>{m.who}</Text>
                      <Text style={styles.rowPreview} numberOfLines={1}>
                        {m.preview}
                      </Text>
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={[styles.rowTime, m.unread ? styles.rowTimeGreen : null]}>{m.time}</Text>
                      {m.unread ? (
                        <View style={styles.unreadDot}>
                          <Text style={styles.unreadDotText}>{m.unread}</Text>
                        </View>
                      ) : (
                        <View style={styles.unreadPlaceholder} />
                      )}
                    </View>
                  </View>
                  {i < MESSAGES.length - 1 ? <View style={styles.rowDivider} /> : null}
                </React.Fragment>
              ))}
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F4F6',
  },
  scroll: {
    flex: 1,
  },
  content: {},
  body: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 14,
  },

  alertCard: {
    backgroundColor: '#14342B',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  alertBody: {
    fontSize: 10,
    color: '#E5E7EB',
    lineHeight: 19,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
  dot: {
    width: 22,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },

  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#F1F1F4',
    marginBottom: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowWho: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  rowPreview: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  rowRight: {
    alignItems: 'flex-end',
    gap: 4,
    minWidth: 44,
  },
  rowTime: {
    fontSize: 9,
    fontWeight: '600',
    color: '#6B7280',
  },
  rowTimeGreen: {
    color: '#22C55E',
  },
  unreadDot: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDotText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  unreadPlaceholder: {
    height: 18,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F0F0F2',
  },
});
