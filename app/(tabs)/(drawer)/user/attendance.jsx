
import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { FlatList } from "react-native-web";

const Attendance = () => {

  const attendanceList = [
    { subject: "Distributed System", percentage: "74%" },
    { subject: "Applied Economics", percentage: "100%" },
    { subject: "Mobile Programming", percentage: "92%" },
    { subject: "Network Programming", percentage: "86%" },
    { subject: "Advanced Java Programming", percentage: "76%" },
  ]

  return (
    <SafeAreaView className="h-full bg-main_background">
      <View className="p-6">
        <Text className="text-xl tracking-widest font-psemibold text-primary">
          Attendance
        </Text>
      </View>
      {attendanceList.map((attendance, index) => (
        <View
          key={index}
          className="px-6 mb-6"
        >
          <TouchableOpacity
            onPress={() => router.push('/userRoutes/attendances/' + attendance.subject)}
            className="w-full px-5 py-4 mt-1 rounded-lg bg-slate-200"
          >
            <View className="flex-row items-center justify-between">
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[85%]">
                {attendance.subject}
              </Text>
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[15%] text-right">
                {attendance.percentage}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
      <StatusBar backgroundColor="#000" />
    </SafeAreaView >
  );

};

export default Attendance;
