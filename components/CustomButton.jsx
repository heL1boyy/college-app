import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
// import { isLoading } from "expo-font";

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
      className={`border-[1px]  rounded-full  items-center justify-center ${containerStyles} 
      ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text
        className={`text-[#161697]  font-rsemibold text-lg ${titleStyles} `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
