import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatusBannerCardProps {
  title?: string;
  subtitle?: string;
  pageCount?: number;
  activePage?: number;
  variant?: 'ok' | 'alert';
}

export function StatusBannerCard({
  title,
  subtitle,
  pageCount = 3,
  activePage = 0,
  variant = 'ok',
}: StatusBannerCardProps) {
  const isAlert = variant === 'alert';
  const resolvedTitle = title ?? (isAlert ? 'Status: Stroomstoring' : 'Status: alles op orde');
  const resolvedSubtitle =
    subtitle ??
    (isAlert
      ? 'Er is momenteel een storing. U krijgt zo snel mogelijk meer informatie...'
      : 'Er zijn geen (mogelijke) storingen gemeten.');

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        {isAlert ? (
          <MaterialIcons name="warning" size={20} color="#DC2626" />
        ) : (
          <View style={styles.checkBubble}>
            <MaterialIcons name="check" size={14} color="#FFFFFF" />
          </View>
        )}
        <Text style={styles.title}>{resolvedTitle}</Text>
      </View>
      <Text style={styles.subtitle}>{resolvedSubtitle}</Text>

      <View style={styles.dots}>
        {Array.from({ length: pageCount }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activePage ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#14342B',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 14,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 8,
    lineHeight: 20,
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
    marginTop: 14,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  dotActive: {
    width: 22,
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    width: 22,
    backgroundColor: 'rgba(255,255,255,0.30)',
  },
});
