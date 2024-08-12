import React from "react";
import { Tabs } from "expo-router";

const AdminLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default AdminLayout;
