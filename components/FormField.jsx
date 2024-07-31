import { View, TextInput, TouchableOpacity, Image } from "react-native";
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
      <View className="border border-[] w-full h-14 px-4 rounded-2xl focus:border-[#161697] focus:border-2 items-center flex-row  ease-in duration-300">
        <TextInput
          className="flex-1  font-rsemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="gray"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              resizeMode="contain"
              source={!showPassword ? icons.eyehide : icons.eye}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
