import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/Colors";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => <Ionicons name="profile" />,
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            tabBarLabel: "Notification",
            tabBarIcon: () => <Ionicons name="notification" />,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
