import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { MenuDrawer } from '@/components/menu-drawer';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#EDE8FD' }}>
      <Tabs
        tabBar={(props) => <BottomNavBar {...props} />}
        screenOptions={{ headerShown: false }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
      >
        <Tabs.Screen name="marketplace" />
        <Tabs.Screen name="community" />
        <Tabs.Screen name="index" />
        <Tabs.Screen name="energie" />
        <Tabs.Screen name="informatie" />
        <Tabs.Screen name="agenda" options={{ href: null }} />
        <Tabs.Screen name="spaarpotjes" options={{ href: null }} />
        <Tabs.Screen name="spaarpotje" options={{ href: null }} />
        <Tabs.Screen name="winkelmandje" options={{ href: null }} />
        <Tabs.Screen name="qr-code" options={{ href: null }} />
        <Tabs.Screen name="profile" options={{ href: null }} />
        <Tabs.Screen name="zoek-noodkast" options={{ href: null }} />
        <Tabs.Screen name="buddy" options={{ href: null }} />
        <Tabs.Screen name="feedback" options={{ href: null }} />
        <Tabs.Screen name="instellingen" options={{ href: null }} />
      </Tabs>
      <MenuDrawer />
    </View>
  );
}
