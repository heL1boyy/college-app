import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchInput = ({
  value,
  handleChangeText,
  handleSearch,
  placeholder = "Search...",
}) => {
  return (
    <View className="border border-gray-600 w-full h-12 px-4 rounded-xl focus:border-primary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-1 text-primary flex-1 font-pregular tracking-widest"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Ionicons name="search-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
