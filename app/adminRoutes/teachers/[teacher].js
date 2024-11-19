import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "../../../constants";

const ParticularTeacher = () => {

  const { teacher } = useLocalSearchParams();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Teacher",
      headerShown: true,
    });
  });

  return (
    <SafeAreaView className="bg-main_background">
      <View className="flex-col items-center justify-start h-full m-6">
        <View className="flex-col items-center justify-center">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="w-40 h-40 rounded-full"
            resizeMode="contain"
          />
          <Text className="mt-6 text-xl font-semibold tracking-widest text-primary">
            {teacher}
          </Text>
        </View>
        <View className="w-full p-5 mx-6 mt-6 mb-10 bg-slate-200 rounded-xl">
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Subject:</Text>
            <Text className="ml-2 tracking-wider font-rregular">
              subject name
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Email:</Text>
            <Text className="ml-2 tracking-wider font-rregular">
              email address
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className={"font-rmedium tracking-wider"}>Contact No:</Text>
            <Text className="ml-2 tracking-wider font-rregular">
              contact number
            </Text>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor="#000" />
    </SafeAreaView>
  );
};

export default ParticularTeacher;
