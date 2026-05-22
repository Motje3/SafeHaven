import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const MONTHS_NL = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

const WEEKDAYS_NL = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];

interface CalendarMonthProps {
  year: number;
  month: number; // 0-indexed
  selectedDay?: number | null;
  eventDays?: number[];
  onPrev?: () => void;
  onNext?: () => void;
  onSelectDay?: (day: number) => void;
}

type Cell = { day: number; inMonth: boolean };

function buildMonthGrid(year: number, month: number): Cell[] {
  const firstDate = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // JS getDay: Sunday=0..Saturday=6. We want Monday=0..Sunday=6
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
  eventDays = [],
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
          const hasEvent = cell.inMonth && eventDays.includes(cell.day);

          return (
            <Pressable
              key={i}
              disabled={!cell.inMonth}
              onPress={() => cell.inMonth && onSelectDay?.(cell.day)}
              style={({ pressed }) => [
                styles.cell,
                isSelected && styles.cellSelected,
                hasEvent && !isSelected && styles.cellEvent,
                pressed && cell.inMonth && !isSelected && { opacity: 0.6 },
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
              {hasEvent && <View style={[styles.eventDot, isSelected && styles.eventDotSelected]} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const CELL_SIZE = 38;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  headerLabel: {
    fontSize: 15,
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
    fontSize: 12,
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
  cellSelected: {},
  cellEvent: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    borderRadius: CELL_SIZE / 2,
  },
  cellText: {
    fontSize: 14,
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
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#22C55E',
  },
  eventDotSelected: {
    backgroundColor: '#22C55E',
  },
});
