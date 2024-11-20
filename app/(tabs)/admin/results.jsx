import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Results = () => {
  const resultBySemester = [
    { semester: "First Semester" },
    { semester: "Second Semester" },
    { semester: "Third Semester" },
    { semester: "Fourth Semester" },
    { semester: "Fifth Semester" },
    { semester: "Sixth Semester" },
    { semester: "Seventh Semester" },
    { semester: "Eighth Semester" },
  ];

  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center justify-between p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Results
          </Text>
        </View>
        <View className="px-6 pt-1 pb-2">
          {resultBySemester.map((result, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push("/adminRoutes/results/" + result.semester)
              }
              className="px-5 py-4 mb-8 rounded-lg bg-slate-200"
            >
              <Text className="my-2 text-sm tracking-wider font-pmedium">
                {result.semester}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Results;
