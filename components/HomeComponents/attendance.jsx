import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const Attendance = () => {
  return (
    <View className="p-5 mb-6">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-pmedium">Attendance</Text>
        <TouchableOpacity onPress={() => router.push("home/attendance")}>
          <Text className="text-sm font-pmedium text-primary">
            View in Detail
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => router.push("home/attendance")}
        className="w-full px-5 py-4 mt-4 rounded-lg bg-slate-200"
      >
        <View className="flex-row items-center justify-between">
          <Text className="mt-2 mb-3 text-sm tracking-widest text-primary font-pmedium w-[70%]">
            Subjects
          </Text>
          <Text className="mt-2 mb-3 text-sm tracking-widest text-primary font-pmedium w-[30%] text-center">
            Attendance
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[70%]">
            Distributed System
          </Text>
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[30%] text-center">
            74%
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[70%]">
            Applied Economics
          </Text>
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[30%] text-center">
            100%
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[70%]">
            Mobile Programming
          </Text>
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[30%] text-center">
            92%
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[70%]">
            Network Programming
          </Text>
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[30%] text-center">
            86%
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[70%]">
            Advanced Java Programming
          </Text>
          <Text className="my-2 text-sm tracking-wider font-pmedium w-[30%] text-center">
            76%
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Attendance;
