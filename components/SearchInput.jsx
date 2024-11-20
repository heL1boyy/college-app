import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";

const SearchInput = ({}) => {
  const pathName = usePathname();
  const [query, setQuery] = useState("");
  return (
    <View className="border border-gray-600 w-full h-12 px-4 rounded-xl focus:border-primary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-1 text-primary flex-1 font-pregular tracking-widest"
        value={query}
        // placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missin query , Please input something");
          }

          if (pathName.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Ionicons name="search-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
