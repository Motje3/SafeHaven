import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTutorialOverlayActive } from '@/components/tutorial-overlay-state';

const DRAWER_WIDTH = Math.min(320, Dimensions.get('window').width * 0.82);

type IconName =
  | { lib: 'material'; name: React.ComponentProps<typeof MaterialIcons>['name'] }
  | { lib: 'mc'; name: React.ComponentProps<typeof MaterialCommunityIcons>['name'] };

interface MenuItem {
  icon: IconName;
  label: string;
  route?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { icon: { lib: 'material', name: 'person' }, label: 'Profiel', route: '/profile' },
  { icon: { lib: 'material', name: 'location-on' }, label: 'Zoek mijn Noodkast', route: '/zoek-noodkast' },
  { icon: { lib: 'material', name: 'groups' }, label: 'Jouw buddy', route: '/buddy' },
  { icon: { lib: 'mc', name: 'piggy-bank' }, label: 'Spaarpotje', route: '/spaarpotjes' },
  { icon: { lib: 'material', name: 'forum' }, label: 'Feedback', route: '/feedback' },
  { icon: { lib: 'mc', name: 'radio-tower' }, label: 'Data-vrij gesprek', route: '/lora-chat' },
  { icon: { lib: 'material', name: 'settings' }, label: 'Instellingen', route: '/instellingen' },
];

function MenuIcon({ icon, color, size = 22 }: { icon: IconName; color: string; size?: number }) {
  if (icon.lib === 'mc') {
    return <MaterialCommunityIcons name={icon.name} size={size} color={color} />;
  }
  return <MaterialIcons name={icon.name} size={size} color={color} />;
}

export function MenuDrawer() {
  const [visible, setVisible] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const overlayActive = useTutorialOverlayActive();

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

  // Burger → X animations
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

  const drawerTranslateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  const backdropOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.55],
  });

  const handleItemPress = (item: MenuItem) => {
    close();
    if (item.route) {
      setTimeout(() => router.push(item.route as any), 220);
    }
  };

  const handleLogout = () => {
    close();
    // Reset back to the welcome screen so the app can't be reached via "back"
    setTimeout(() => router.replace('/welcome'), 220);
  };

  // Hide the burger entirely while a full-screen overlay (tutorial) is up.
  if (overlayActive) return null;

  return (
    <>
      <Pressable
        onPress={toggle}
        style={[styles.burgerBtn, { top: insets.top + 10 }]}
        hitSlop={10}
      >
        <Animated.View style={[styles.line, line1Style]} />
        <Animated.View style={[styles.line, { opacity: line2Opacity }]} />
        <Animated.View style={[styles.line, line3Style]} />
      </Pressable>

      {visible && (
        <>
          <Pressable style={StyleSheet.absoluteFill} onPress={close}>
            <Animated.View
              style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: backdropOpacity }]}
            />
          </Pressable>

          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}
          >
            <View style={[styles.drawerInner, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 16 }]}>
              <View style={styles.profileSection}>
                <Image
                  source={require('../public/gavin.png')}
                  style={styles.avatar}
                  resizeMode="cover"
                />
                <Text style={styles.userName}>Gavin van der Berg</Text>
                <Text style={styles.userSub}>Nummer 13B</Text>
              </View>

              <View style={styles.menuList}>
                {MENU_ITEMS.map((item) => (
                  <Pressable
                    key={item.label}
                    style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                    onPress={() => handleItemPress(item)}
                  >
                    <MenuIcon icon={item.icon} color="#0F172A" />
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </Pressable>
                ))}
              </View>

              <View style={{ flex: 1 }} />

              <Pressable
                style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
                onPress={handleLogout}
              >
                <MaterialIcons name="logout" size={22} color="#EF2A2A" />
                <Text style={styles.logoutText}>Uitloggen</Text>
              </Pressable>
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
    left: 20,
    zIndex: 100,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#1A1A2E',
    borderRadius: 2,
  },
  backdrop: {
    backgroundColor: '#000',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    zIndex: 99,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  drawerInner: {
    flex: 1,
    paddingHorizontal: 22,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 22,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    overflow: 'hidden',
    marginBottom: 12,
  },
  userName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  userSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  menuList: {
    gap: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  menuItemPressed: {
    backgroundColor: '#F5F5F7',
  },
  menuLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  logoutText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF2A2A',
  },
});
