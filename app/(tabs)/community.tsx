import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LightVault } from '@/constants/theme';

// Prototype Community Features

import { FeatureCards } from '@/components/community/feature-cards';
import { Meetups } from '@/components/community/meetups';
import { Chat } from '@/components/community/chat';

const SCREEN_W = Dimensions.get('window').width;

// ─── Mesh Sync Bar ────────────────────────────────────────────────────────────

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();

  const [view, setView] = React.useState<'features' | 'meetups' | 'chat'>('features');

  return (
    <View style={styles.root}>
      {/* Background — same gradient as home */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.bgTop} />
        <View style={styles.bgBottom} />
        <View style={[styles.blob1, { left: SCREEN_W / 2 - 175 }]} />
        <View style={styles.blob2} />
      </View>

      {/* Page header */}
      <Animated.View entering={FadeInDown.duration(400).springify()} style={[styles.header, { paddingTop: insets.top + 14, paddingHorizontal: 24 }]}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Community</Text>
          <View style={styles.activePill}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>24 active</Text>
          </View>
        </View>
        <Text style={styles.pageSubtitle}>Your neighborhood network</Text>
        
        {/* Section label features */}
        {view === 'features' && (
          <Animated.View entering={FadeInDown.duration(400).delay(60).springify()}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionLabel}>Features</Text>
            </View>
          </Animated.View>
        )}

        {/* Section label meetups */}
        {view === 'meetups' && (
          <Animated.View entering={FadeInDown.duration(400).springify()}>
            <View style={styles.sectionRow}>
              <Pressable onPress={() => setView('features')} style={styles.backBtn}>
                <MaterialIcons name="arrow-back" size={22} color={LightVault.textPrimary} />
              </Pressable>
              <Text style={styles.sectionLabel}>Meetups</Text>
            </View>
          </Animated.View>
        )}

        {/* Section label chat */}
        {view === 'chat' && (
          <Animated.View entering={FadeInDown.duration(400).springify()}>
            <View style={styles.sectionRow}>
              <Pressable onPress={() => setView('features')} style={styles.backBtn}>
                <MaterialIcons name="arrow-back" size={22} color={LightVault.textPrimary} />
              </Pressable>
              <Text style={styles.sectionLabel}>Chat</Text>
            </View>
          </Animated.View>
        )}
      </Animated.View>

      {/* Feature cards */}
      {view === 'features' && (
        <FeatureCards
          onOpenMeetups={() => setView('meetups')}
          onOpenChat={() => setView('chat')}
        />
      )}

      {/* Meetups */}
      {view === 'meetups' && (
        <Meetups />
      )}

      {/* Chat */}
      {view === 'chat' && (
        <Chat />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#FFFFFF',
  },
  bgBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#EDE8FD',
  },
  blob1: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(124, 111, 224, 0.09)',
    top: -100,
  },
  blob2: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(167, 139, 250, 0.07)',
    bottom: 100,
    right: -60,
  },
  header: {},
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: LightVault.textPrimary,
    letterSpacing: -0.8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: LightVault.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.28)',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#22C55E',
  },
  activeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#16A34A',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: LightVault.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  cardList: {
    gap: 14,
  },
});
