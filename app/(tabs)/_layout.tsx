import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { MenuDrawer } from '@/components/menu-drawer';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        tabBar={(props) => <BottomNavBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="marketplace" />
        <Tabs.Screen name="index" />
        <Tabs.Screen name="community" />
      </Tabs>
      <MenuDrawer />
    </View>
  );
}
