import { View, Text } from "react-native";
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
        <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
        <Tabs.Screen
          name="notification"
          options={{ tabBarLabel: "Notification" }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
