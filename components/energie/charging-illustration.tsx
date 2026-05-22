import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

interface ChargingIllustrationProps {
  title?: string;
}

export function ChargingIllustration({ title = 'Aan het oplading..' }: ChargingIllustrationProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialIcons name="bolt" size={20} color="#F5A623" />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.illustrationBox}>
        {/* Dashed connector lines */}
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* top-right: solar panels */}
          <Line
            x1="55%"
            y1="22%"
            x2="78%"
            y2="20%"
            stroke="#22C55E"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* bottom-left: pavegen tiles */}
          <Line
            x1="42%"
            y1="86%"
            x2="22%"
            y2="86%"
            stroke="#F5A623"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* bottom-right: interactive game */}
          <Line
            x1="62%"
            y1="78%"
            x2="78%"
            y2="86%"
            stroke="#F5A623"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </Svg>

        <Image
          source={require('../../public/denoodkast.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Callout: solar panels (top-right, green) */}
        <View style={[styles.callout, styles.calloutGreen, styles.calloutTopRight]}>
          <Text style={styles.calloutValueGreen}>8.3 watt</Text>
          <Text style={styles.calloutLabelGreen}>Zonnepanelen</Text>
        </View>

        {/* Callout: pavegen tiles (bottom-left, yellow) */}
        <View style={[styles.callout, styles.calloutYellow, styles.calloutBottomLeft]}>
          <Text style={styles.calloutValueYellow}>2.5 watt</Text>
          <Text style={styles.calloutLabelYellow}>Pavegen tegels</Text>
        </View>

        {/* Callout: interactive game (bottom-right, yellow) */}
        <View style={[styles.callout, styles.calloutYellow, styles.calloutBottomRight]}>
          <Text style={styles.calloutValueYellow}>2.1 watt</Text>
          <Text style={styles.calloutLabelYellow}>Interactief spel</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  illustrationBox: {
    height: 240,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 160,
  },
  callout: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
  },
  calloutGreen: {
    borderColor: '#22C55E',
  },
  calloutYellow: {
    borderColor: '#F5A623',
  },
  calloutTopRight: {
    top: 10,
    right: 0,
  },
  calloutBottomLeft: {
    bottom: 10,
    left: 0,
  },
  calloutBottomRight: {
    bottom: 10,
    right: 0,
  },
  calloutValueGreen: {
    fontSize: 13,
    fontWeight: '700',
    color: '#22C55E',
  },
  calloutLabelGreen: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#22C55E',
    fontWeight: '600',
  },
  calloutValueYellow: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F5A623',
  },
  calloutLabelYellow: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#F5A623',
    fontWeight: '600',
  },
});
