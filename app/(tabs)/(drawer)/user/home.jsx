import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import SearchInput from "../../../../components/SearchInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Colors } from "../../../../constants/Colors";
import Header from "../../../../components/HomeComponents/header";
import Class from "../../../../components/HomeComponents/class";
import Attendance from "../../../../components/HomeComponents/attendance";
import { useGlobalContext } from "@/context/GlobalProvider";
import 'react-native-gesture-handler'

const Home = () => {
  const { user } = useGlobalContext();
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header user={user} />
        <View className="px-5 pt-1 pb-3">
          <SearchInput />
        </View>
        <Class />

        <View className="p-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg font-pmedium">
              Pending Tasks
            </Text>
            <TouchableOpacity onPress={() => router.push("/user/task")} >
              <Text className="text-sm font-pmedium text-primary">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full p-5 mt-4 rounded-lg bg-slate-200">
            <View>
              <Text className="text-sm tracking-widest text-primary font-pmedium">
                Mobile Programming
              </Text>
              <Text className="mt-3 text-sm font-pregular">Task Name</Text>
            </View>
            <View>
              <View>
                <View className="flex-row items-center justify-start gap-1 mt-3">
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={Colors.third}
                  />
                  <Text className="mt-2 text-xs font-pregular text-red">
                    08/06/2024
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Attendance />
        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
