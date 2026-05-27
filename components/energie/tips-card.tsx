import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PaginationDots } from '@/components/informatie/pagination-dots';

interface Tip {
  id: string;
  title: string;
  body: string;
}

const TIPS: Tip[] = [
  {
    id: '1',
    title: 'Tips voor meer stroomgeneratie',
    body: 'Lorem ipsum dolor sit amet consectetur. Ultrices interdum ut et sit tempor nibh. Id tincidunt at.',
  },
  {
    id: '2',
    title: 'Bespaar tijdens piekuren',
    body: 'Verschuif zware apparaten naar daluren wanneer de zon het meeste oplevert.',
  },
  {
    id: '3',
    title: 'Hou de batterij gezond',
    body: 'Laad nooit boven 90% of onder 10% om de levensduur te verlengen.',
  },
];

const SCREEN_W = Dimensions.get('window').width;
const PAGE_PAD = 16;
const SLIDE_W = SCREEN_W - PAGE_PAD * 2;

export function TipsCard() {
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const next = Math.round(offset / SLIDE_W);
    if (next !== index) setIndex(next);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {TIPS.map((tip) => (
          <View key={tip.id} style={[styles.card, { width: SLIDE_W }]}>
            <View style={styles.headerRow}>
              <MaterialCommunityIcons name="lightbulb-on" size={20} color="#F5C842" />
              <Text style={styles.title}>{tip.title}</Text>
            </View>
            <Text style={styles.body}>{tip.body}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        <PaginationDots
          count={TIPS.length}
          activeIndex={index}
          activeColor="#FFFFFF"
          inactiveColor="rgba(255,255,255,0.4)"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#14342B',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  body: {
    fontSize: 11,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  dots: {
    marginTop: 12,
    alignItems: 'center',
  },
});
