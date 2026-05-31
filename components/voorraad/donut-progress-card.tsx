import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface DonutProgressCardProps {
  percent?: number;
  collected?: number;
  remaining?: number;
}

export function DonutProgressCard({
  percent = 65,
  collected = 200,
  remaining = 10,
}: DonutProgressCardProps) {
  const size = 130;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent / 100);

  return (
    <View style={styles.card}>
      <View style={styles.infoBadge}>
        <MaterialIcons name="info" size={16} color="#0F172A" />
      </View>
      <View style={styles.row}>
        <View style={[styles.donutWrap, { width: size, height: size }]}>
          <Svg width={size} height={size}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#E5E7EB"
              strokeWidth={stroke}
              fill="none"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#1BD15D"
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <View style={styles.donutCenter} pointerEvents="none">
            <Text style={styles.percent}>{percent}%</Text>
          </View>
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.headline}>Nog {remaining} items te gaan!</Text>
          <Text style={styles.subtext}>
            Help mee de laatste {remaining} items in te zamelen!
          </Text>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1BD15D' }]} />
              <Text style={styles.legendText}>{collected} verzameld</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendText}>{remaining} te gaan</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  infoBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  donutWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.6,
  },
  rightCol: {
    flex: 1,
    gap: 4,
  },
  headline: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtext: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 6,
  },
  legend: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#0F172A',
    fontWeight: '500',
  },
});
