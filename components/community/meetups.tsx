import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { LightVault } from '@/constants/theme';

const MOCK_MEETUPS = [
  {
    title: 'Neighborhood BBQ',
    date: 'Sat, Apr 6 · 17:00',
    location: 'Central Park Field',
  },
  {
    title: 'Street Clean-Up',
    date: 'Sun, Apr 7 · 10:00',
    location: 'Maple Street',
  },
  {
    title: 'Emergency Prep Talk',
    date: 'Tue, Apr 9 · 19:30',
    location: 'Community Center',
  },
  {
    title: 'Kids Play Meetup',
    date: 'Wed, Apr 10 · 15:00',
    location: 'Playground Area',
  },
];

export function Meetups() {
  return (
    <Animated.ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: 120 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.root}>
        {/* Meetup list */}
        <View style={styles.list}>
          {MOCK_MEETUPS.map((meetup, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.iconWrap}>
                <MaterialIcons name="event" size={22} color="#EC4899" />
              </View>

              <View style={styles.textWrap}>
                <Text style={styles.cardTitle}>{meetup.title}</Text>
                <Text style={styles.cardMeta}>{meetup.date}</Text>
                <Text style={styles.cardMeta}>{meetup.location}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  root: {
    paddingHorizontal: 24,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: LightVault.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: LightVault.textSecondary,
    marginBottom: 8,
  },
  list: {
    gap: 12,
    marginTop: 8,
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: LightVault.glassBase,
    borderWidth: 1,
    borderColor: LightVault.glassBorder,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(251, 207, 232, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: LightVault.textPrimary,
  },
  cardMeta: {
    fontSize: 12,
    color: LightVault.textSecondary,
    marginTop: 2,
  },
});