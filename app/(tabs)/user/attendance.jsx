import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Attendance = () => {
  return (
    <SafeAreaView className="bg-main_background">
      <ScrollView>
        <View className="p-5">
          <Text className="font-psemibold text-xl tracking-widest">
            Attendance
          </Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#f5f5f5" style="light" />
    </SafeAreaView>
  );
};

export default Attendance;
