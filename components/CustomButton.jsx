import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
// import { isLoading } from "expo-font";

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-main_background border-[1px] border-primary rounded-lg justify-center items-center px-5 py-2 ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
