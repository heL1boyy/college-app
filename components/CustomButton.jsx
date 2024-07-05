import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { isLoading } from "expo-font";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  titleStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-orange-500 mt-7 rounded-xl min-h-[62px] items-center justify-center ${containerStyles} 
      ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`text-black font-rsemibold text-lg ${titleStyles} `}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
