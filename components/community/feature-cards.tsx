import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { LightVault } from '@/constants/theme';

interface FeatureCardProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  iconBg: string;
  accentColor: string;
  tag: string;
  title: string;
  description: string;
  onPress: () => void;
}

interface Props {
  onOpenMeetups: () => void;
  onOpenChat: () => void;
}

function FeatureCard({
  icon,
  iconColor,
  iconBg,
  accentColor,
  tag,
  title,
  description,
  onPress,
}: FeatureCardProps) {
  const scale = useSharedValue(1);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => { scale.value = withTiming(0.97, { duration: 100 }); }}
      onPressOut={() => { scale.value = withTiming(1, { duration: 150 }); }}
      onPress={onPress}
    >
      <Animated.View style={[cardStyles.card, pressStyle]}>
        <View style={cardStyles.topHighlight} />

        <View style={[cardStyles.iconBlock, { backgroundColor: iconBg }]}>
          <View style={[cardStyles.accentLine, { backgroundColor: accentColor }]} />
          <MaterialIcons name={icon} size={38} color={iconColor} />
        </View>

        <View style={cardStyles.textBlock}>
          <View
            style={[
              cardStyles.tagPill,
              {
                backgroundColor: `${accentColor}18`,
                borderColor: `${accentColor}40`,
              },
            ]}
          >
            <Text style={[cardStyles.tagText, { color: accentColor }]}>
              {tag}
            </Text>
          </View>

          <Text style={cardStyles.title}>{title}</Text>
          <Text style={cardStyles.description}>{description}</Text>
        </View>

        <View style={cardStyles.chevronWrap}>
          <MaterialIcons
            name="chevron-right"
            size={22}
            color="rgba(26,26,46,0.25)"
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}

export function FeatureCards({ onOpenMeetups, onOpenChat }: Props) {
  // Features
  const FEATURES: (FeatureCardProps & { delay: number })[] = [
    {
      icon: 'swap-horiz',
      iconColor: LightVault.purple,
      iconBg: 'rgba(196, 181, 253, 0.28)',
      accentColor: LightVault.purple,
      tag: 'Browse · Toggle',
      title: 'Need & Have',
      description: "See what neighbors need\nand what they're offering",
      onPress: () => {},
      delay: 80,
    },
    {
      icon: 'event',
      iconColor: '#DB2777',
      iconBg: 'rgba(251, 207, 232, 0.28)',
      accentColor: '#EC4899',
      tag: 'Gather · Connect',
      title: 'Community Meetups',
      description:
        "Schedule a local gathering\nand bring the neighborhood together",
      onPress: onOpenMeetups,
      delay: 160,
    },
    {
      icon: 'terminal',
      iconColor: '#0891B2',
      iconBg: 'rgba(34, 211, 238, 0.18)',
      accentColor: '#22D3EE',
      tag: 'Mesh · 160 chars',
      title: 'Offline Messages',
      description:
        'Direct chat over the SafeHaven\nmesh network — no Wi-Fi needed',
      onPress: onOpenChat,
      delay: 320,
    },
    {
      icon: 'campaign',
      iconColor: '#D97706',
      iconBg: 'rgba(253, 224, 71, 0.28)',
      accentColor: '#F59E0B',
      tag: 'Request · Offer',
      title: 'Post a Beacon',
      description:
        'Request help with urgency levels\nand a SafeCoin bounty',
      onPress: () => {},
      delay: 240,
    },
    {
      icon: 'military-tech',
      iconColor: '#16A34A',
      iconBg: 'rgba(134, 239, 172, 0.28)',
      accentColor: '#22C55E',
      tag: 'Skills · Badges',
      title: 'Skills & Karma',
      description:
        'Share your expertise and earn\ntrust badges from the community',
      onPress: () => {},
      delay: 400,
    },
  ];

  return (
    <View style={styles.cardList}>
      {FEATURES.map((f) => (
        <Animated.View
          key={f.title}
          entering={FadeInDown.duration(500).delay(f.delay).springify()}
        >
          <FeatureCard {...f} />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardList: {
    gap: 14,
  },
});

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: LightVault.glassBase,
    borderWidth: 1,
    borderColor: LightVault.glassBorder,
    shadowColor: LightVault.glassShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 4,
    overflow: 'hidden',
    minHeight: 110,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  iconBlock: {
    width: 96,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 20,
    bottom: 20,
    width: 3.5,
    borderRadius: 2,
  },
  textBlock: {
    flex: 1,
    paddingVertical: 20,
    paddingLeft: 14,
    paddingRight: 4,
    gap: 5,
  },
  tagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 2,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: LightVault.textPrimary,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 12,
    color: LightVault.textSecondary,
    fontWeight: '500',
    lineHeight: 17,
  },
  chevronWrap: {
    paddingRight: 16,
    paddingLeft: 4,
  },
});