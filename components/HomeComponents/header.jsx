import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { Link, router } from "expo-router";

const Header = ({ user }) => {
  return (
    <View className="flex flex-row items-center justify-between w-full p-5">
      <View className="w-[78%]">
        <Text className="text-sm tracking-widest font-pmedium text-red">
          Welcome Back
        </Text>
        <Text className="text-xl tracking-widest font-psemibold text-primary">
          {user?.username}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between w-[22%]">
        <TouchableOpacity onPress={() => router.push("home/notification")}>
          <Ionicons name="notifications" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("")}>
          <Ionicons name="menu" size={30} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
