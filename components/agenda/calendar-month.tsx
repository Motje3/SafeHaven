import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const MONTHS_NL = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

const WEEKDAYS_NL = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];

export type EventCategory = 'workshop' | 'vergadering' | 'urgent';

const CATEGORY_COLOR: Record<EventCategory, string> = {
  workshop: '#DDE8CE',
  vergadering: '#F4CC4A',
  urgent: '#F5837E',
};

const CATEGORY_LABEL: Record<EventCategory, string> = {
  workshop: 'Workshop',
  vergadering: 'Vergadering',
  urgent: 'Urgent',
};

interface CalendarMonthProps {
  year: number;
  month: number; // 0-indexed
  selectedDay?: number | null;
  events?: Record<number, EventCategory>;
  onPrev?: () => void;
  onNext?: () => void;
  onSelectDay?: (day: number) => void;
}

type Cell = { day: number; inMonth: boolean };

function buildMonthGrid(year: number, month: number): Cell[] {
  const firstDate = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  let firstWeekday = firstDate.getDay() - 1;
  if (firstWeekday < 0) firstWeekday = 6;

  const cells: Cell[] = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true });
  }
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, inMonth: false });
  }
  if (cells.length < 42) {
    while (cells.length < 42) cells.push({ day: nextDay++, inMonth: false });
  }
  return cells;
}

export function CalendarMonth({
  year,
  month,
  selectedDay,
  events = {},
  onPrev,
  onNext,
  onSelectDay,
}: CalendarMonthProps) {
  const cells = buildMonthGrid(year, month);
  const monthLabel = `${MONTHS_NL[month][0].toUpperCase()}${MONTHS_NL[month].slice(1)} ${year}`;

  return (
    <View>
      <View style={styles.headerRow}>
        <Pressable hitSlop={10} onPress={onPrev} style={({ pressed }) => pressed && { opacity: 0.5 }}>
          <MaterialIcons name="chevron-left" size={26} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerLabel}>{monthLabel}</Text>
        <Pressable hitSlop={10} onPress={onNext} style={({ pressed }) => pressed && { opacity: 0.5 }}>
          <MaterialIcons name="chevron-right" size={26} color="#0F172A" />
        </Pressable>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAYS_NL.map((w) => (
          <Text key={w} style={styles.weekday}>{w}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((cell, i) => {
          const isSelected = cell.inMonth && cell.day === selectedDay;
          const category = cell.inMonth ? events[cell.day] : undefined;

          return (
            <Pressable
              key={i}
              disabled={!cell.inMonth}
              onPress={() => cell.inMonth && onSelectDay?.(cell.day)}
              style={({ pressed }) => [
                styles.cell,
                pressed && cell.inMonth && !category && { opacity: 0.6 },
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  category && { backgroundColor: CATEGORY_COLOR[category] },
                ]}
              >
                <Text
                  style={[
                    styles.cellText,
                    !cell.inMonth && styles.cellTextMuted,
                    isSelected && styles.cellTextSelected,
                  ]}
                >
                  {cell.day}
                </Text>
              </View>
              {category && <View style={styles.eventDot} />}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.legendDivider} />
      <View style={styles.legendRow}>
        <Text style={styles.legendLabel}>Legenda:</Text>
        {(Object.keys(CATEGORY_COLOR) as EventCategory[]).map((c) => (
          <View key={c} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: CATEGORY_COLOR[c] }]} />
            <Text style={styles.legendText}>{CATEGORY_LABEL[c]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const CELL_SIZE = 44;
const BUBBLE_SIZE = 32;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    fontStyle: 'italic',
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  cellTextMuted: {
    color: '#C4C7CC',
  },
  cellTextSelected: {
    fontWeight: '800',
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#22C55E',
  },
  legendDivider: {
    height: 1,
    backgroundColor: '#F0F0F2',
    marginTop: 12,
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  legendLabel: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: '600',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#0F172A',
    fontWeight: '500',
  },
});
