import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BLUE = '#2B55E6';
const PILL_BG = '#FFFFFF';
const ICON_ACTIVE = '#2B55E6';
const ICON_INACTIVE = 'rgba(255, 255, 255, 0.72)';

const COLLAPSED_WIDTH = 52;
const EXPANDED_WIDTH = 118;
const PILL_HEIGHT = 44;

const TAB_CONFIGS: Record<string, { label: string; icon: React.ComponentProps<typeof MaterialIcons>['name'] }> = {
  marketplace: { label: 'Market', icon: 'store' },
  index: { label: 'The Vault', icon: 'shield' },
  community: { label: 'Community', icon: 'forum' },
};

function TabPill({
  label,
  icon,
  isActive,
  onPress,
}: {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  isActive: boolean;
  onPress: () => void;
}) {
  const pillWidth = useRef(new Animated.Value(isActive ? EXPANDED_WIDTH : COLLAPSED_WIDTH)).current;
  const textOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const pillBg = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(pillWidth, {
        toValue: isActive ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        useNativeDriver: false,
        damping: 20,
        stiffness: 200,
        mass: 0.9,
      }),
      Animated.timing(textOpacity, {
        toValue: isActive ? 1 : 0,
        duration: isActive ? 220 : 80,
        useNativeDriver: true,
      }),
      Animated.timing(pillBg, {
        toValue: isActive ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  const backgroundColor = pillBg.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', PILL_BG],
  });

  return (
    <Pressable onPress={onPress} hitSlop={6} android_ripple={null}>
      <Animated.View style={[styles.pill, { width: pillWidth, backgroundColor }]}>
        <MaterialIcons
          name={icon}
          size={26}
          color={isActive ? ICON_ACTIVE : ICON_INACTIVE}
        />
        <Animated.Text style={[styles.label, { opacity: textOpacity }]} numberOfLines={1}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

export function BottomNavBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const config = TAB_CONFIGS[route.name] ?? { label: route.name, icon: 'circle' as const };
          const isActive = state.index === index;

          return (
            <TabPill
              key={route.key}
              label={config.label}
              icon={config.icon}
              isActive={isActive}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isActive && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: BLUE,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#2B55E6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 16,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: PILL_HEIGHT,
    borderRadius: PILL_HEIGHT / 2,
    overflow: 'hidden',
    gap: 6,
    paddingHorizontal: 11,
  },
  label: {
    color: ICON_ACTIVE,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.1,
  },
});
