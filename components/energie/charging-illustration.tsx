import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

interface ChargingIllustrationProps {
  title?: string;
}

// A dashed connector whose dashes "flow" from the source into the building,
// so it reads as energy being collected / charging.
function FlowLine({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  color: string;
}) {
  const flow = useSharedValue(0);

  useEffect(() => {
    // dasharray "4 4" => cycle length 8; animate a multiple for a seamless loop
    flow.value = withRepeat(withTiming(16, { duration: 650, easing: Easing.linear }), -1, false);
  }, []);

  const animatedProps = useAnimatedProps(() => ({ strokeDashoffset: flow.value }));

  return (
    <AnimatedLine
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="2"
      strokeDasharray="4 4"
      strokeLinecap="round"
      animatedProps={animatedProps}
    />
  );
}

export function ChargingIllustration({ title = 'Aan het opladen..' }: ChargingIllustrationProps) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 850, easing: Easing.inOut(Easing.quad) }), -1, true);
  }, []);

  const boltStyle = useAnimatedStyle(() => ({
    opacity: 0.55 + pulse.value * 0.45,
    transform: [{ scale: 0.95 + pulse.value * 0.18 }],
  }));

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Animated.View style={boltStyle}>
          <MaterialIcons name="bolt" size={20} color="#F5A623" />
        </Animated.View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.illustrationBox}>
        {/* Flowing energy connectors */}
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* top-right: solar panels */}
          <FlowLine x1="55%" y1="22%" x2="78%" y2="20%" color="#1BD15D" />
          {/* bottom-left: pavegen tiles */}
          <FlowLine x1="42%" y1="86%" x2="22%" y2="86%" color="#F5A623" />
          {/* bottom-right: interactive game */}
          <FlowLine x1="62%" y1="78%" x2="78%" y2="86%" color="#F5A623" />
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
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
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
    borderColor: '#1BD15D',
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
    fontSize: 10,
    fontWeight: '700',
    color: '#1BD15D',
  },
  calloutLabelGreen: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#1BD15D',
    fontWeight: '600',
  },
  calloutValueYellow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F5A623',
  },
  calloutLabelYellow: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#F5A623',
    fontWeight: '600',
  },
});
