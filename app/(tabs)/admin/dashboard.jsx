import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "../../../constants";

const Dashboard = () => {
  const { user, isLoggedIn, logout } = useGlobalContext();

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-x-6">
            <View className="flex-row mb-6 bg-red-200 rounded-xl justify-between">
              <View className="justify-between items-start  p-4">
                <Text className="font-rmedium text-sm">
                  {isLoggedIn ? "Hello" : "Welcome Back"}
                </Text>
                <Text className="text-2xl font-rsemibold">{user.username}</Text>
              </View>
              <View className="justify-between items-start  p-4">
                <TouchableOpacity
                  //   className=" rounded-full p-2  w-3 h-3 "
                  onPress={logout}
                  activeOpacity={0.7}
                >
                  {/* Add content or icon for the button */}
                  <Image
                    source={icons.logout}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        data={""}
        renderItem={(item, index) => {
          <View key={index}>
            <Text>Hello Admin</Text>
          </View>;
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
