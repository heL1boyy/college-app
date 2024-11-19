import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import CustomButton from "../../../components/CustomButton";

const ResultBySubject = () => {
  const { result } = useLocalSearchParams();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Result",
      headerShown: true,
    });
  });

  return (
    <SafeAreaView className="h-full bg-main_background">
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View className="px-5">
          <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
            {result} Result
          </Text>
          <CustomButton
            title="Upload Result"
            containerStyles="bg-primary rounded-lg py-4 mt-6"
            textStyles="text-white text-sm font-pmedium tracking-widest"
            // onPress={}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultBySubject;
