import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface InUseCardProps {
  hoursLeft?: number;
  percent?: number;
  phoneCount?: number[];
}

const TOTAL_BLOCKS = 16;

export function InUseCard({
  hoursLeft = 54,
  percent = 65,
  phoneCount = [18, 18, 18],
}: InUseCardProps) {
  const filled = Math.round((percent / 100) * TOTAL_BLOCKS);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.leftCol}>
          <View style={styles.headerRow}>
            <MaterialIcons name="battery-charging-full" size={20} color="#22C55E" />
            <Text style={styles.title}>In gebruik</Text>
          </View>
          <Text style={styles.subtitle}>Genoeg energie voor {hoursLeft} uur</Text>

          <View style={styles.bulletList}>
            {phoneCount.map((count, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{count} telefoons</Text>
              </View>
            ))}
          </View>
        </View>

        <Image
          source={require('../../public/denoodkast.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.batterySection}>
        <Text style={styles.percentText}>{percent}%</Text>
        <View style={styles.blockRow}>
          {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.block,
                i < filled ? styles.blockFilled : styles.blockEmpty,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leftCol: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#0F172A',
    marginTop: 4,
    marginBottom: 10,
  },
  bulletList: {
    gap: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0F172A',
  },
  bulletText: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  image: {
    width: 140,
    height: 110,
  },
  batterySection: {
    marginTop: 12,
  },
  percentText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    alignSelf: 'flex-end',
    marginBottom: 6,
  },
  blockRow: {
    flexDirection: 'row',
    gap: 3,
  },
  block: {
    flex: 1,
    height: 22,
    borderRadius: 3,
  },
  blockFilled: {
    backgroundColor: '#4ADE80',
  },
  blockEmpty: {
    backgroundColor: '#D1D5DB',
  },
});
