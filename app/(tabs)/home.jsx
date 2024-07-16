import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {
  const { user, isLoggedIn } = useGlobalContext();
  return (
    <SafeAreaView>
      <FlatList
        data={[{ id: 1 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text className=" text-3xl"> {item.id}</Text>}
        ListHeaderComponent={() => (
          <View className=" my-6 px-4 space-x-6">
            <View className=" flex-row    mb-6">
              <View className="justify-between items-start bg-slate-700">
                <Text className="font-rmedium text-sm">
                  {isLoggedIn ? "Hello" : "Welcome Back"}
                </Text>
                <Text className="text-2xl font-rsemibold">{user.username}</Text>
              </View>
              <TouchableOpacity
                className="bg-slate-800 rounded-full p-2"
                onPress=""
                activeOpacity={0.7}
              ></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
