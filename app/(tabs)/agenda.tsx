import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityRow, type ActivityIconVariant } from '@/components/agenda/activity-row';
import { CalendarMonth, type EventCategory } from '@/components/agenda/calendar-month';
import { SuggestionCard } from '@/components/agenda/suggestion-card';
import { BuurtBanner } from '@/components/shared/buurt-banner';
import { ScreenTopBar } from '@/components/shared/screen-top-bar';

const DAYS_NL = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
const MONTHS_NL = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

const INITIAL_YEAR = 2026;
const INITIAL_MONTH = 4; // May (0-indexed)
const EVENTS: Record<number, EventCategory> = {
  1: 'workshop',
  12: 'vergadering',
  13: 'urgent',
};

type Activity = {
  time: string;
  title: string;
  location: string;
  variant: ActivityIconVariant;
  rsvp?: boolean;
};

const SAMPLE_ACTIVITIES: Record<number, Activity[]> = {
  20: [
    { time: '10.00 - 12.00', title: 'Bijeenkomst noodplan', location: 'Buurthuis', variant: 'group-green' },
    { time: '10.00 - 12.00', title: 'EHBO cursus', location: 'Buurthuis', variant: 'medical-yellow', rsvp: true },
    { time: '10.00 - 12.00', title: 'Bijeenkomst noodplan', location: 'Buurthuis', variant: 'group-blue' },
  ],
  12: [
    { time: '14.00 - 16.00', title: 'Buurt borrel', location: 'Buurthuis', variant: 'group-green' },
  ],
  13: [
    { time: '09.00 - 11.00', title: 'Yoga in het park', location: 'Park', variant: 'group-blue' },
  ],
};

export default function AgendaScreen() {
  const insets = useSafeAreaInsets();
  const [year, setYear] = useState(INITIAL_YEAR);
  const [month, setMonth] = useState(INITIAL_MONTH);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const goPrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };
  const goNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  const handleSelectDay = (day: number) => {
    if (SAMPLE_ACTIVITIES[day]) {
      setSelectedDay(day);
    } else {
      setSelectedDay(day === selectedDay ? null : day);
    }
  };

  const isDayView = selectedDay !== null && !!SAMPLE_ACTIVITIES[selectedDay];

  const dayLabel = (() => {
    if (selectedDay === null) return '';
    const d = new Date(year, month, selectedDay);
    return `${DAYS_NL[d.getDay()]} ${selectedDay} ${MONTHS_NL[month]}`;
  })();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Agenda" showBack reserveRightGutter />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <BuurtBanner />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(160).springify()}>
            <View style={styles.agendaCard}>
              <View style={styles.agendaHeader}>
                <View style={styles.agendaHeaderLeft}>
                  {isDayView ? (
                    <Pressable
                      onPress={() => setSelectedDay(null)}
                      hitSlop={8}
                      style={({ pressed }) => pressed && { opacity: 0.5 }}
                    >
                      <MaterialIcons name="arrow-back" size={20} color="#FFFFFF" />
                    </Pressable>
                  ) : (
                    <MaterialIcons name="event" size={20} color="#FFFFFF" />
                  )}
                  <Text style={styles.agendaTitle}>Agenda</Text>
                </View>
              </View>

              <View style={styles.agendaContent}>
                {isDayView ? (
                  <>
                    <Text style={styles.dayLabel}>{dayLabel}</Text>
                    {SAMPLE_ACTIVITIES[selectedDay!].map((a, i, arr) => (
                      <View key={i}>
                        <ActivityRow
                          time={a.time}
                          title={a.title}
                          location={a.location}
                          variant={a.variant}
                          rsvp={a.rsvp}
                        />
                        {i < arr.length - 1 ? <View style={styles.divider} /> : null}
                      </View>
                    ))}
                  </>
                ) : (
                  <CalendarMonth
                    year={year}
                    month={month}
                    selectedDay={selectedDay}
                    events={EVENTS}
                    onPrev={goPrev}
                    onNext={goNext}
                    onSelectDay={handleSelectDay}
                  />
                )}
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(240).springify()}>
            <SuggestionCard />
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
  agendaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  agendaHeader: {
    backgroundColor: '#14342B',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  agendaHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  agendaTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  agendaContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 6,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
});
