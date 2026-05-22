import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContactCard } from '@/components/informatie/contact-card';
import { PaginationDots } from '@/components/informatie/pagination-dots';
import { RuleSlide } from '@/components/informatie/rule-slide';
import { VideoCard } from '@/components/informatie/video-card';
import { ScreenTopBar } from '@/components/shared/screen-top-bar';

const SCREEN_W = Dimensions.get('window').width;
const PAGE_H_PADDING = 16;
const CARD_INNER_PADDING = 14;

const CONTACT_CARD_W = SCREEN_W * 0.62;
const CONTACT_GAP = 10;

const RULES_CARD_WIDTH = SCREEN_W - PAGE_H_PADDING * 2;
const RULES_SLIDE_W = RULES_CARD_WIDTH - CARD_INNER_PADDING * 2 - 60;
const RULES_SLIDE_H = 320;
const RULES_GAP = 12;

const CONTACTS = [
  { name: 'Jolijn', role: 'Voorraadbeheer', avatarTint: '#BFE0EE' },
  { name: 'Lola', role: 'Onderhoud', avatarTint: '#F5D38A' },
  { name: 'Sven', role: 'Techniek', avatarTint: '#C9E4C5' },
];

const RULES = [
  {
    title: 'Gedraag je netjes met de spullen van een ander',
    body: 'Lorem ipsum dolor sit amet consecteur. Nulla ut maecenas porta viverra. Elementum non odio tortor adipiscing pulvinar. Rhoncus amet ornare.',
    background: '#14342B',
    titleColor: '#F5C842',
  },
  {
    title: 'Deel eerlijk met elkaar',
    body: 'Lorem ipsum dolor sit amet consecteur. Nulla ut maecenas porta viverra. Elementum non odio tortor adipiscing pulvinar.',
    background: '#4ADE80',
    titleColor: '#FFFFFF',
    bodyColor: '#F0FDF4',
  },
  {
    title: 'Respecteer de gemeenschap',
    body: 'Lorem ipsum dolor sit amet consecteur. Nulla ut maecenas porta viverra. Elementum non odio tortor adipiscing pulvinar.',
    background: '#F5C842',
    titleColor: '#14342B',
    bodyColor: '#1F2937',
  },
  {
    title: 'Meld problemen op tijd',
    body: 'Lorem ipsum dolor sit amet consecteur. Nulla ut maecenas porta viverra. Elementum non odio tortor adipiscing pulvinar.',
    background: '#C92A1F',
    titleColor: '#FDE68A',
  },
  {
    title: 'Wees aardig voor anderen',
    body: 'Lorem ipsum dolor sit amet consecteur. Nulla ut maecenas porta viverra. Elementum non odio tortor adipiscing pulvinar.',
    background: '#14342B',
    titleColor: '#F5C842',
  },
];

type VideoItem = {
  title: string;
  gradient: [string, string];
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const VIDEOS: VideoItem[] = [
  { title: 'Wat als er geen stroom is?', gradient: ['#5B5048', '#2A2724'], icon: 'umbrella' },
  { title: 'Zo werkt het stroomnet', gradient: ['#5BA2D8', '#1E3A8A'], icon: 'transmission-tower' },
  { title: 'Wat zijn de gevolgen voor jou?', gradient: ['#8C5A3C', '#3F2418'], icon: 'candle' },
  { title: 'Wat als er geen stroom is?', gradient: ['#2A3A4A', '#0F172A'], icon: 'flashlight' },
];

function useSnapPage(itemWidth: number, gap: number) {
  const [index, setIndex] = useState(0);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const next = Math.round(offset / (itemWidth + gap));
    if (next !== index) setIndex(next);
  };
  return { index, onScroll };
}

export default function InformatieScreen() {
  const insets = useSafeAreaInsets();
  const contactScroll = useSnapPage(CONTACT_CARD_W, CONTACT_GAP);
  const rulesScroll = useSnapPage(RULES_SLIDE_W, RULES_GAP);

  const gridGap = 10;
  const gridItemW = (SCREEN_W - PAGE_H_PADDING * 2 - CARD_INNER_PADDING * 2 - gridGap) / 2;

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 4, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Informatie" showBack showAvatar avatarInitials="MV" reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          {/* Contact carousel */}
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={CONTACT_CARD_W + CONTACT_GAP}
              decelerationRate="fast"
              onScroll={contactScroll.onScroll}
              scrollEventThrottle={16}
              contentContainerStyle={styles.contactScroll}
            >
              {CONTACTS.map((c) => (
                <ContactCard
                  key={c.name}
                  name={c.name}
                  role={c.role}
                  width={CONTACT_CARD_W}
                  avatarTint={c.avatarTint}
                />
              ))}
            </ScrollView>
            <View style={styles.contactDots}>
              <PaginationDots count={CONTACTS.length} activeIndex={contactScroll.index} />
            </View>
          </Animated.View>

          {/* Algemene gedragsregels */}
          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="shield-star" size={20} color="#14342B" />
                <Text style={styles.sectionTitle}>Algemene gedragsregels</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={RULES_SLIDE_W + RULES_GAP}
                decelerationRate="fast"
                onScroll={rulesScroll.onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.rulesScroll}
              >
                {RULES.map((r, i) => (
                  <RuleSlide
                    key={i}
                    title={r.title}
                    body={r.body}
                    width={RULES_SLIDE_W}
                    height={RULES_SLIDE_H}
                    background={r.background}
                    titleColor={r.titleColor}
                    bodyColor={r.bodyColor}
                  />
                ))}
              </ScrollView>

              <View style={styles.rulesDots}>
                <PaginationDots
                  count={RULES.length}
                  activeIndex={rulesScroll.index}
                  activeColor="#F5C842"
                  inactiveColor="#D1D5DB"
                />
              </View>
            </View>
          </Animated.View>

          {/* Video's */}
          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            <View style={styles.sectionCard}>
              <View style={styles.videosHeader}>
                <View style={styles.videosHeaderLeft}>
                  <MaterialIcons name="video-library" size={20} color="#14342B" />
                  <Text style={styles.sectionTitle}>Video&apos;s</Text>
                </View>
                <Pressable
                  hitSlop={8}
                  style={({ pressed }) => [styles.viewAll, pressed && { opacity: 0.6 }]}
                >
                  <Text style={styles.viewAllText}>Bekijk alles</Text>
                  <MaterialIcons name="chevron-right" size={18} color="#6B7280" />
                </Pressable>
              </View>

              <View style={styles.videosGrid}>
                {VIDEOS.map((v, i) => (
                  <VideoCard
                    key={i}
                    title={v.title}
                    width={gridItemW}
                    gradient={v.gradient}
                    icon={v.icon}
                  />
                ))}
              </View>
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
    paddingHorizontal: PAGE_H_PADDING,
    paddingTop: 12,
    gap: 14,
  },
  contactScroll: {
    gap: CONTACT_GAP,
    paddingRight: 16,
  },
  contactDots: {
    marginTop: 12,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: CARD_INNER_PADDING,
    paddingTop: 14,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  rulesScroll: {
    gap: RULES_GAP,
    paddingRight: 30,
  },
  rulesDots: {
    marginTop: 14,
  },
  videosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  videosHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#6B7280',
    fontWeight: '500',
  },
  videosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
