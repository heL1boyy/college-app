import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const AboutSection = ({ item }) => {
  return (
    <View className="bg-blue-100 p-4 rounded-xl mt-2">
      <View className="flex-row justify-between items-center ">
        <Text className="text-xl font-semibold">About</Text>
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row py-4 gap-4">
        <View className="flex ">
          <Text className="mb-2">Date of Birth</Text>
          <Text>Gender</Text>
        </View>
        <View className="flex ">
          <Text className="mb-2">{item?.dateOfBirth}</Text>
          <Text>{item?.gender}</Text>
        </View>
      </View>
    </View>
  );
};

export default AboutSection;
