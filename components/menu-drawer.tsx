import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BLUE = '#2B55E6';
const DRAWER_WIDTH = 290;

const MENU_ITEMS: { icon: React.ComponentProps<typeof MaterialIcons>['name']; label: string }[] = [
  { icon: 'person', label: 'Profile' },
  { icon: 'monetization-on', label: 'SafeCoins' },
  { icon: 'vpn-key', label: 'Digital Key' },
  { icon: 'settings', label: 'Settings' },
  { icon: 'help-outline', label: 'Help & Support' },
  { icon: 'logout', label: 'Sign Out' },
];

export function MenuDrawer() {
  const [visible, setVisible] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const open = () => {
    setVisible(true);
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 22,
      stiffness: 220,
    }).start();
  };

  const close = () => {
    Animated.spring(anim, {
      toValue: 0,
      useNativeDriver: true,
      damping: 22,
      stiffness: 220,
    }).start(({ finished }) => {
      if (finished) setVisible(false);
    });
  };

  const toggle = () => (visible ? close() : open());

  // Burger → X line animations
  const line1Style = {
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 7] }) },
      { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] }) },
    ],
  };
  const line2Opacity = anim.interpolate({ inputRange: [0, 0.4, 1], outputRange: [1, 0, 0] });
  const line3Style = {
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -7] }) },
      { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-45deg'] }) },
    ],
  };

  // Drawer slide-in from right
  const drawerTranslateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [DRAWER_WIDTH, 0],
  });

  const backdropOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.55],
  });

  return (
    <>
      {/* Burger button */}
      <Pressable
        onPress={toggle}
        style={[styles.burgerBtn, { top: insets.top + 10 }]}
        hitSlop={10}
      >
        <Animated.View style={[styles.line, line1Style]} />
        <Animated.View style={[styles.line, { opacity: line2Opacity }]} />
        <Animated.View style={[styles.line, line3Style]} />
      </Pressable>

      {/* Overlay */}
      {visible && (
        <>
          {/* Backdrop */}
          <Pressable style={StyleSheet.absoluteFill} onPress={close}>
            <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: backdropOpacity }]} />
          </Pressable>

          {/* Drawer panel */}
          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}
          >
            <View style={[styles.drawerInner, { paddingTop: insets.top + 24 }]}>
              {/* Avatar area */}
              <View style={styles.avatarRow}>
                <View style={styles.avatar}>
                  <MaterialIcons name="person" size={36} color={BLUE} />
                </View>
                <View>
                  <Text style={styles.userName}>SafeHaven User</Text>
                  <View style={styles.karmaBadge}>
                    <MaterialIcons name="monetization-on" size={13} color={BLUE} />
                    <Text style={styles.karmaText}>142 SafeCoins</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Menu items */}
              {MENU_ITEMS.map((item, i) => (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                  onPress={close}
                >
                  <View style={styles.menuIconWrap}>
                    <MaterialIcons name={item.icon} size={20} color={BLUE} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {i === MENU_ITEMS.length - 1 ? null : (
                    <MaterialIcons name="chevron-right" size={18} color="#CCC" style={styles.menuChevron} />
                  )}
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  burgerBtn: {
    position: 'absolute',
    right: 20,
    zIndex: 100,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  backdrop: {
    backgroundColor: '#000',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    zIndex: 99,
    shadowColor: '#000',
    shadowOffset: { width: -6, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 24,
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
  },
  drawerInner: {
    flex: 1,
    paddingHorizontal: 24,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingBottom: 20,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  karmaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  karmaText: {
    fontSize: 12,
    fontWeight: '600',
    color: BLUE,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    borderRadius: 12,
    paddingHorizontal: 6,
  },
  menuItemPressed: {
    backgroundColor: '#F5F7FF',
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  menuChevron: {
    marginLeft: 'auto',
  },
});
