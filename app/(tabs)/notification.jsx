import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  return (
    <SafeAreaView>
      <FlatList
        // data={[{ id: 1 }]}
        // keyExtractor={(item) => item.$id}
        // renderItem={({ item }) => <Text className=" text-3xl"> {item.id}</Text>}
        ListHeaderComponent={() => (
          <View className=" my-6 px-4 space-x-6">
            <View className=" justify-between items-start  mb-6">
              <Text className="font-rmedium text-sm">Welcome Back </Text>
              <Text className="text-2xl font-rsemibold">Hellboy </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Notification;
