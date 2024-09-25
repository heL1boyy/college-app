import { Text, View, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Notice = () => {
  return (
    <SafeAreaView className="bg-main_background">
      <ScrollView>
        <View className="p-5">
          <Text className="text-xl tracking-widest font-psemibold">
            Notices
          </Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#f5f5f5" style="light" />
    </SafeAreaView>
  );
};

export default Notice;
