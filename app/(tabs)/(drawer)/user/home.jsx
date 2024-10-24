
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import SearchInput from "../../../../components/SearchInput";
import Header from "../../../../components/HomeComponents/Header";
import Class from "../../../../components/HomeComponents/Class";
import PendingTask from "../../../../components/HomeComponents/PendingTask";
import Attendance from "../../../../components/HomeComponents/Attendance";
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

        <View className="flex-row items-center justify-between p-5">
          <TouchableOpacity onPress={() => { router.push("/admin/adminDashboard") }} >
            <Text className="underline text-primary">Go To Admin Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { router.push("/teacher/teacherDashboard") }} >
            <Text className="underline text-primary">Go To Teacher Dashboard</Text>
          </TouchableOpacity>
        </View>

        <Class />
        <PendingTask />
        <Attendance />
        <StatusBar backgroundColor="#f5f5f5" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
