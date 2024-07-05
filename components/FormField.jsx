import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles} `}>
      <Text className="text-base text-gray-100 font-rmedium">{title}</Text>
      <View className="border-2 border-gray-800 w-full h-16 px-4 bg-slate-900 rounded-2xl focus:border-orange-500 items-center flex-row">
        <TextInput
          className="flex-1 text-white font-rsemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              resizeMode="contain"
              source={!showPassword ? icons.eye : icons.eyehide}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
