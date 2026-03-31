import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LightVault } from '@/constants/theme';

// Prototype Community Features

import { useRouter } from 'expo-router';

import { FeatureCards } from '@/components/community/feature-cards';

const SCREEN_W = Dimensions.get('window').width;

// ─── Mesh Sync Bar ────────────────────────────────────────────────────────────

// ─── Feature Card (OLD) ─────────────────────────────────────────────────────────────

// interface FeatureCardProps {
//   icon: keyof typeof MaterialIcons.glyphMap;
//   iconColor: string;
//   iconBg: string;
//   accentColor: string;
//   tag: string;
//   title: string;
//   description: string;
//   onPress: () => void;
// }

// function FeatureCard({
//   icon,
//   iconColor,
//   iconBg,
//   accentColor,
//   tag,
//   title,
//   description,
//   onPress,
// }: FeatureCardProps) {
//   const scale = useSharedValue(1);
//   const pressStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   return (
//     <Pressable
//       onPressIn={() => { scale.value = withTiming(0.97, { duration: 100 }); }}
//       onPressOut={() => { scale.value = withTiming(1, { duration: 150 }); }}
//       onPress={onPress}
//     >
//       <Animated.View style={[cardStyles.card, pressStyle]}>
//         {/* Inner top highlight */}
//         <View style={cardStyles.topHighlight} />

//         {/* Left: icon block */}
//         <View style={[cardStyles.iconBlock, { backgroundColor: iconBg }]}>
//           {/* Accent line on left edge */}
//           <View style={[cardStyles.accentLine, { backgroundColor: accentColor }]} />
//           <MaterialIcons name={icon} size={38} color={iconColor} />
//         </View>

//         {/* Right: text */}
//         <View style={cardStyles.textBlock}>
//           {/* Tag pill */}
//           <View style={[cardStyles.tagPill, { backgroundColor: `${accentColor}18`, borderColor: `${accentColor}40` }]}>
//             <Text style={[cardStyles.tagText, { color: accentColor }]}>{tag}</Text>
//           </View>
//           <Text style={cardStyles.title}>{title}</Text>
//           <Text style={cardStyles.description}>{description}</Text>
//         </View>

//         {/* Chevron */}
//         <View style={cardStyles.chevronWrap}>
//           <MaterialIcons name="chevron-right" size={22} color="rgba(26,26,46,0.25)" />
//         </View>
//       </Animated.View>
//     </Pressable>
//   );
// }

// const cardStyles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 24,
//     backgroundColor: LightVault.glassBase,
//     borderWidth: 1,
//     borderColor: LightVault.glassBorder,
//     shadowColor: LightVault.glassShadow,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 1,
//     shadowRadius: 20,
//     elevation: 4,
//     overflow: 'hidden',
//     minHeight: 110,
//   },
//   topHighlight: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 1,
//     backgroundColor: 'rgba(255,255,255,0.85)',
//   },
//   iconBlock: {
//     width: 96,
//     alignSelf: 'stretch',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   accentLine: {
//     position: 'absolute',
//     left: 0,
//     top: 20,
//     bottom: 20,
//     width: 3.5,
//     borderRadius: 2,
//   },
//   textBlock: {
//     flex: 1,
//     paddingVertical: 20,
//     paddingLeft: 14,
//     paddingRight: 4,
//     gap: 5,
//   },
//   tagPill: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 10,
//     paddingVertical: 3,
//     borderRadius: 12,
//     borderWidth: 1,
//     marginBottom: 2,
//   },
//   tagText: {
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//     textTransform: 'uppercase',
//   },
//   title: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: LightVault.textPrimary,
//     letterSpacing: -0.3,
//   },
//   description: {
//     fontSize: 12,
//     color: LightVault.textSecondary,
//     fontWeight: '500',
//     lineHeight: 17,
//   },
//   chevronWrap: {
//     paddingRight: 16,
//     paddingLeft: 4,
//   },
// });

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // 👈 Prototype Community Features

  // Features (OLD)
  // const FEATURES: (FeatureCardProps & { delay: number })[] = [
  //   {
  //     icon: 'swap-horiz',
  //     iconColor: LightVault.purple,
  //     iconBg: 'rgba(196, 181, 253, 0.28)',
  //     accentColor: LightVault.purple,
  //     tag: 'Browse · Toggle',
  //     title: 'Need & Have',
  //     description: "See what neighbors need\nand what they're offering",
  //     onPress: () => {},
  //     delay: 80,
  //   },
  //   {
  //     icon: 'event',
  //     iconColor: '#DB2777',
  //     iconBg: 'rgba(251, 207, 232, 0.28)',
  //     accentColor: '#EC4899',
  //     tag: 'Gather · Connect',
  //     title: 'Community Meetups',
  //     description: "Schedule a local gathering\nand bring the neighborhood together",
  //     onPress: () => router.push('/community/meetups'),
  //     delay: 160,
  //   },
  //   {
  //     icon: 'terminal',
  //     iconColor: '#0891B2',
  //     iconBg: 'rgba(34, 211, 238, 0.18)',
  //     accentColor: '#22D3EE',
  //     tag: 'Mesh · 160 chars',
  //     title: 'Offline Messages',
  //     description: 'Direct chat over the SafeHaven\nmesh network — no Wi-Fi needed',
  //     onPress: () => router.push('/community/chat'),
  //     delay: 320,
  //   },
  //   {
  //     icon: 'campaign',
  //     iconColor: '#D97706',
  //     iconBg: 'rgba(253, 224, 71, 0.28)',
  //     accentColor: '#F59E0B',
  //     tag: 'Request · Offer',
  //     title: 'Post a Beacon',
  //     description: 'Request help with urgency levels\nand a SafeCoin bounty',
  //     onPress: () => {},
  //     delay: 240,
  //   },
  //   {
  //     icon: 'military-tech',
  //     iconColor: '#16A34A',
  //     iconBg: 'rgba(134, 239, 172, 0.28)',
  //     accentColor: '#22C55E',
  //     tag: 'Skills · Badges',
  //     title: 'Skills & Karma',
  //     description: 'Share your expertise and earn\ntrust badges from the community',
  //     onPress: () => {},
  //     delay: 400,
  //   },
  // ];

  return (
    <View style={styles.root}>
      {/* Background — same gradient as home */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.bgTop} />
        <View style={styles.bgBottom} />
        <View style={[styles.blob1, { left: SCREEN_W / 2 - 175 }]} />
        <View style={styles.blob2} />
      </View>

      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 14, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Page header */}
        <Animated.View entering={FadeInDown.duration(400).springify()} style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.pageTitle}>Community</Text>
            <View style={styles.activePill}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>24 active</Text>
            </View>
          </View>
          <Text style={styles.pageSubtitle}>Your neighborhood network</Text>
        </Animated.View>

        {/* Section label */}
        <Animated.View entering={FadeInDown.duration(400).delay(60).springify()}>
          <Text style={styles.sectionLabel}>Features</Text>
        </Animated.View>

        {/* Feature cards (OLD) */}
        {/* <View style={styles.cardList}>
          {FEATURES.map((f) => (
            <Animated.View
              key={f.title}
              entering={FadeInDown.duration(500).delay(f.delay).springify()}
            >
              <FeatureCard
                icon={f.icon}
                iconColor={f.iconColor}
                iconBg={f.iconBg}
                accentColor={f.accentColor}
                tag={f.tag}
                title={f.title}
                description={f.description}
                onPress={f.onPress}
              />
            </Animated.View>
          ))}
        </View> */}

        {/* Feature cards */}
        <FeatureCards />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#FFFFFF',
  },
  bgBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#EDE8FD',
  },
  blob1: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(124, 111, 224, 0.09)',
    top: -100,
  },
  blob2: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(167, 139, 250, 0.07)',
    bottom: 100,
    right: -60,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  header: {},
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: LightVault.textPrimary,
    letterSpacing: -0.8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: LightVault.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.28)',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#22C55E',
  },
  activeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#16A34A',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: LightVault.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 12,
  },
  cardList: {
    gap: 14,
  },
});
