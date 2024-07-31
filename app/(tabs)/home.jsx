import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {
  const { user, isLoggedIn } = useGlobalContext();

  return (
    <SafeAreaView>
      <FlatList
        data={[{ id: 1 }]} // Add more items as needed
        keyExtractor={(item) => item.id.toString()} // Ensure keys are unique and strings
        renderItem={({ item }) => <Text className="text-3xl">{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-x-6">
            <View className="flex-row mb-6">
              <View className="justify-between items-start bg-slate-700 p-4">
                <Text className="font-rmedium text-sm">
                  {isLoggedIn ? "Hello" : "Welcome Back"}
                </Text>
                <Text className="text-2xl font-rsemibold">
                  {user ? user.username : "Guest"}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-slate-800 rounded-full p-2"
                onPress={() => {}}
                activeOpacity={0.7}
              >
                {/* Add content or icon for the button */}
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
