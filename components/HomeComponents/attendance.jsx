import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const Attendance = () => {
  const attendanceList = [
    { subject: "Distributed System" },
    { subject: "Applied Economics" },
    { subject: "Mobile Programming" },
    { subject: "Network Programming" },
    { subject: "Advanced Java Programming" },
  ];

  return (
    <View className="px-6 mt-8 mb-10">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-pmedium">Attendance</Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/user/attendance")}
        >
          <Text className="text-sm font-pmedium text-primary">
            View in Detail
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full px-5 py-4 mt-4 rounded-lg bg-slate-200">
        <View className="flex-row items-center justify-between">
          <Text className="mt-2 mb-3 text-sm tracking-widest text-primary font-pmedium w-[70%]">
            Subjects
          </Text>
        </View>
        {attendanceList.map((attendance, index) => (
          <View key={index} className="flex-row items-center justify-between">
            <Text className="my-2 text-sm tracking-wider font-pmedium w-[70%]">
              {attendance.subject}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Attendance;
