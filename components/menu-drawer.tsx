import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useRef, useState } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BLUE = '#7C6FE0';
const DRAWER_WIDTH = 290;

const MENU_ITEMS: { icon: React.ComponentProps<typeof MaterialIcons>['name']; label: string }[] = [
  { icon: 'person', label: 'Profile' },
  { icon: 'monetization-on', label: 'SafeCoins' },
  { icon: 'settings', label: 'Settings' },
  { icon: 'help-outline', label: 'Help & Support' },
  { icon: 'logout', label: 'Sign Out' },
];

export function MenuDrawer() {
  const [visible, setVisible] = useState(false);
  const [emergencyVisible, setEmergencyVisible] = useState(false);
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
                  <Text style={styles.userName}>SafeHaven</Text>
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

              {/* Emergency button */}
              <View style={styles.emergencyWrap}>
                <Pressable
                  style={({ pressed }) => [styles.emergencyBtn, pressed && { opacity: 0.85 }]}
                  onPress={() => setEmergencyVisible(true)}
                >
                  <MaterialIcons name="crisis-alert" size={20} color="#fff" />
                  <Text style={styles.emergencyText}>I Need Help Now</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </>
      )}
      {/* Emergency confirmation modal */}
      <Modal
        visible={emergencyVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setEmergencyVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setEmergencyVisible(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            {/* Icon */}
            <View style={styles.modalIconWrap}>
              <MaterialIcons name="crisis-alert" size={36} color="#EF4444" />
            </View>

            {/* Text */}
            <Text style={styles.modalTitle}>Send Emergency Alert?</Text>
            <Text style={styles.modalBody}>
              This will notify nearby SafeHaven members that you need immediate help.
            </Text>

            {/* Buttons */}
            <Pressable
              style={({ pressed }) => [styles.modalSendBtn, pressed && { opacity: 0.85 }]}
              onPress={() => {
                setEmergencyVisible(false);
                // TODO: broadcast emergency over mesh
              }}
            >
              <MaterialIcons name="crisis-alert" size={18} color="#fff" />
              <Text style={styles.modalSendText}>Send Alert</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.modalCancelBtn, pressed && { opacity: 0.7 }]}
              onPress={() => setEmergencyVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
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
  emergencyWrap: {
    marginTop: 'auto',
    paddingTop: 20,
    paddingBottom: 12,
  },
  emergencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#EF4444',
    borderRadius: 18,
    paddingVertical: 16,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.2,
  },

  // Emergency modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 28,
    paddingVertical: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 20,
  },
  modalIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(239,68,68,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.20)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    textAlign: 'center',
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 14,
    color: 'rgba(26,26,46,0.55)',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 28,
  },
  modalSendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.30,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 12,
  },
  modalSendText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  modalCancelBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(26,26,46,0.06)',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(26,26,46,0.50)',
  },
});
