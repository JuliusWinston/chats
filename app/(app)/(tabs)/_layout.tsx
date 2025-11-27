import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { MessageIcon } from '@/components/icons/MessageIcon';
import { GroupsIcon } from '@/components/icons/GroupsIcon';
import { SettingsIcon } from '@/components/icons/SettingsIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Chat',
          tabBarIcon: ({ color }) => <MessageIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="(groups)"
        options={{
          headerShown: false,
          title: 'Groups',
          tabBarIcon: ({ color }) => <GroupsIcon color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
        }}
      />
    </Tabs>
  );
}

