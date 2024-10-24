
import { Tabs } from "expo-router";
import TabBar from "../../../../components/TabBar"

const TabsLayout = () => {
  return (
    <>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="attendance"
          options={{
            title: "Attendance",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="task"
          options={{
            title: "Tasks",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="notice"
          options={{
            title: "Notice",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
