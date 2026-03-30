import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import { LightVault } from '@/constants/theme';

const SCREEN_W = Dimensions.get('window').width;
const CARD_W = (SCREEN_W - 24 * 2 - 12) / 2;

interface ActionCard {
  label: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  tintColor: string;
  route: string;
}

const ACTIONS: ActionCard[] = [
  {
    label: 'My Items',
    subtitle: '7 stored',
    icon: 'inventory',
    iconColor: LightVault.purple,
    tintColor: LightVault.actionPurple,
    route: '/profile',
  },
  {
    label: 'Drop Off',
    subtitle: 'Add to closet',
    icon: 'move-to-inbox',
    iconColor: '#16A34A',
    tintColor: LightVault.actionGreen,
    route: '/marketplace',
  },
  {
    label: 'Find Closets',
    subtitle: '3 nearby',
    icon: 'explore',
    iconColor: '#2563EB',
    tintColor: LightVault.actionBlue,
    route: '/community',
  },
  {
    label: 'Community',
    subtitle: '12 active',
    icon: 'groups',
    iconColor: '#B45309',
    tintColor: LightVault.actionYellow,
    route: '/community',
  },
];

export function QuickActionsGrid() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {ACTIONS.map((action) => (
          <Pressable
            key={action.label}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: action.tintColor, opacity: pressed ? 0.82 : 1 },
            ]}
            onPress={() => router.push(action.route as any)}
          >
            {/* Top highlight */}
            <View style={styles.topHighlight} />

            {/* Large background icon on the right */}
            <View style={styles.bgIconWrap} pointerEvents="none">
              <MaterialIcons name={action.icon} size={88} color={action.iconColor} style={styles.bgIcon} />
            </View>

            {/* Text on the left */}
            <View style={styles.textWrap}>
              <Text style={styles.cardLabel}>{action.label}</Text>
              <Text style={[styles.cardSubtitle, { color: action.iconColor }]}>{action.subtitle}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: LightVault.textSecondary,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: CARD_W,
    height: 110,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.70)',
    shadowColor: 'rgba(124, 111, 224, 0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 3,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 16,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  bgIconWrap: {
    position: 'absolute',
    right: -12,
    top: 8,
    opacity: 0.18,
  },
  bgIcon: {},
  textWrap: {
    gap: 3,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: LightVault.textPrimary,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '600',
  },
});
