import { View, Text } from "react-native";
import React from "react";
import HorizontalScrollView from "../HorizontalScrollView";

const Class = () => {
  return (
    <View className="p-5">
      <Text className="text-lg font-pmedium">Today's Class</Text>
      <View className="items-center justify-center flex-1 mt-4">
        <HorizontalScrollView />
      </View>
    </View>
  );
};

export default Class;
