
import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Attendance = () => {

  return (

    <SafeAreaView className="bg-main_background">

      <View className="p-5">
        <Text className="text-xl tracking-widest font-psemibold text-primary">
          Attendance
        </Text>
      </View>

      <View className="px-5">
          <TouchableOpacity
            onPress={() => router.push('user/attendance')}
            className="w-full px-5 py-4 mt-1 rounded-lg bg-slate-200">
            <View className="flex-row items-center justify-between">
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[85%]">Distributed System</Text>
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[15%] text-right">74%</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="px-5">
          <TouchableOpacity
            onPress={() => router.push('user/attendance')}
            className="w-full px-5 py-4 mt-6 rounded-lg bg-slate-200">
            <View className="flex-row items-center justify-between">
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[85%]">Applies Economics</Text>
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[15%] text-right">100%</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="px-5">
          <TouchableOpacity
            onPress={() => router.push('user/attendance')}
            className="w-full px-5 py-4 mt-6 rounded-lg bg-slate-200">
            <View className="flex-row items-center justify-between">
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[85%]">Mobile Programming</Text>
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[15%] text-right">92%</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="px-5">
          <TouchableOpacity
            onPress={() => router.push('user/attendance')}
            className="w-full px-5 py-4 mt-6 rounded-lg bg-slate-200">
            <View className="flex-row items-center justify-between">
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[85%]">Network Programming</Text>
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[15%] text-right">86%</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="px-5">
          <TouchableOpacity
            onPress={() => router.push('user/attendance')}
            className="w-full px-5 py-4 mt-6 rounded-lg bg-slate-200">
            <View className="flex-row items-center justify-between">
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[85%]">Advanced Java Programming</Text>
              <Text className="my-2 text-sm tracking-wider font-pmedium w-[15%] text-right">76%</Text>
            </View>
          </TouchableOpacity>
        </View>

      <StatusBar backgroundColor="#f5f5f5" style="light" />
    </SafeAreaView>
  );
};

export default Attendance;
