import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PaginationDots } from '@/components/informatie/pagination-dots';

interface Update {
  id: string;
  source: string;
  date: string;
  time: string;
  preview: string;
  isNew?: boolean;
}

const UPDATES: Update[] = [
  {
    id: '1',
    source: 'Nederlandse overheid',
    date: 'Donderdag 16 april',
    time: '13:22',
    preview: 'Nederland is getroffen door een cyber aanval...',
    isNew: true,
  },
  {
    id: '2',
    source: 'Gemeente Rotterdam',
    date: 'Donderdag 16 april',
    time: '13:10',
    preview: 'Stroomstoring in centrum, hulpdiensten zijn ter plaatse...',
  },
  {
    id: '3',
    source: 'Stedin netbeheer',
    date: 'Donderdag 16 april',
    time: '12:55',
    preview: 'We werken aan herstel van het stroomnet in uw wijk...',
  },
];

const SCREEN_W = Dimensions.get('window').width;
const PAGE_PAD = 16;
const CARD_PAD = 14;
const SLIDE_W = SCREEN_W - PAGE_PAD * 2 - CARD_PAD * 2;
const GAP = 12;

export function GovernmentUpdatesCard() {
  const [index, setIndex] = useState(0);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const next = Math.round(offset / (SLIDE_W + GAP));
    if (next !== index) setIndex(next);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Overheidsupdates</Text>
      <Text style={styles.subtitle}>Blijf op de hoogte van belangrijke updates</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SLIDE_W + GAP}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scroll}
      >
        {UPDATES.map((u) => (
          <UpdateRow key={u.id} update={u} />
        ))}
      </ScrollView>

      <View style={styles.dots}>
        <PaginationDots count={UPDATES.length} activeIndex={index} activeColor="#22C55E" inactiveColor="#D1D5DB" />
      </View>
    </View>
  );
}

function UpdateRow({ update }: { update: Update }) {
  return (
    <Pressable style={({ pressed }) => [styles.row, { width: SLIDE_W }, pressed && { opacity: 0.85 }]}>
      <View style={styles.thumb}>
        <Image
          source={require('../../public/denoodkast.png')}
          style={styles.thumbImg}
          resizeMode="cover"
        />
      </View>

      <View style={styles.rowBody}>
        {update.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>Nieuw</Text>
          </View>
        )}
        <Text style={styles.source}>{update.source}</Text>
        <View style={styles.metaRow}>
          <MaterialIcons name="calendar-today" size={12} color="#6B7280" />
          <Text style={styles.metaText}>{update.date}</Text>
          <MaterialIcons name="access-time" size={12} color="#6B7280" style={{ marginLeft: 6 }} />
          <Text style={styles.metaText}>{update.time}</Text>
        </View>
        <Text style={styles.preview} numberOfLines={2}>
          {update.preview}
        </Text>
      </View>

      <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: CARD_PAD,
    paddingTop: 14,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
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
  scroll: {
    gap: GAP,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 10,
    gap: 10,
  },
  thumb: {
    width: 56,
    height: 78,
    borderRadius: 8,
    backgroundColor: '#1A1A2E',
    overflow: 'hidden',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  rowBody: {
    flex: 1,
    gap: 4,
  },
  newBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#22C55E',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  source: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 9,
    color: '#6B7280',
  },
  preview: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 18,
  },
  dots: {
    marginTop: 12,
  },
});
