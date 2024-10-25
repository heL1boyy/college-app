
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { Link, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

const Header = ({ user }) => {

  const navigation = useNavigation();

  return (
    <View className="flex flex-row items-center justify-between w-full p-5">
      <View className="w-[78%]">
        <Text className="text-sm tracking-widest font-pmedium">
          Welcome Back
        </Text>
        <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
          {user?.username}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between w-[22%]">
        <TouchableOpacity onPress={() => router.push("/notification")}>
          <Ionicons name="notifications" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={30} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

};

export default Header;
