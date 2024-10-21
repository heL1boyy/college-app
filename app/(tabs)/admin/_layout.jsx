
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../../../components/TabBar";

const AdminLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="adminDashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: "Students",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="teachers"
        options={{
          title: "Teachers",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="adminProfile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default AdminLayout;
