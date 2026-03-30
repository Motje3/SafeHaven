import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAV_BG = '#FFFFFF';
const ACTIVE_BG = '#1A1A2E';
const ICON_ACTIVE = '#FFFFFF';
const ICON_INACTIVE = '#8E8EAA';
const CENTER_BORDER = '#1A1A2E';

const TAB_CONFIGS: Record<string, { icon: React.ComponentProps<typeof MaterialIcons>['name']; center?: boolean }> = {
  marketplace: { icon: 'store' },
  index:        { icon: 'shield', center: true },
  community:    { icon: 'forum' },
};

function TabIcon({
  icon,
  isActive,
  isCenter,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  isActive: boolean;
  isCenter: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(bgAnim, {
        toValue: isActive ? 1 : 0,
        useNativeDriver: false,
        damping: 18,
        stiffness: 200,
      }),
      Animated.sequence([
        Animated.spring(scale, { toValue: isActive ? 0.88 : 1, useNativeDriver: true, damping: 12, stiffness: 300 }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, damping: 12, stiffness: 300 }),
      ]),
    ]).start();
  }, [isActive]);

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', ACTIVE_BG],
  });

  if (isCenter) {
    return (
      <Pressable onPress={onPress} hitSlop={8}>
        <Animated.View style={[styles.centerBtn, { transform: [{ scale }] }]}>
          <MaterialIcons name={icon} size={24} color={isActive ? ICON_ACTIVE : CENTER_BORDER} />
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Animated.View style={[styles.iconWrap, { backgroundColor: bgColor, transform: [{ scale }] }]}>
        <MaterialIcons
          name={icon}
          size={24}
          color={isActive ? ICON_ACTIVE : ICON_INACTIVE}
        />
      </Animated.View>
    </Pressable>
  );
}

export function BottomNavBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const config = TAB_CONFIGS[route.name] ?? { icon: 'circle' as const };
          const isActive = state.index === index;

          return (
            <TabIcon
              key={route.key}
              icon={config.icon}
              isActive={isActive}
              isCenter={!!config.center}
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
      {/* Scroll indicator line */}
      <View style={styles.indicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: NAV_BG,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: CENTER_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: 134,
    height: 5,
    backgroundColor: '#1A1A2E',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
    opacity: 0.15,
  },
});
