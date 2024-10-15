import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../../../../components/CustomButton";
import { Colors } from "../../../../constants/Colors";

const Task = () => {
  const taskdata = [
    { id: 1, subject: "Networking Programming", endDate: "08/06/2024", taskName: "Task Name" },
    { id: 2, subject: "Mobile Programming ", endDate: "08/06/2024", taskName: "Task Name" },
    { id: 3, subject: "Applied Ecocnomics", endDate: "08/06/2024", taskName: "Task Name" },
    { id: 4, subject: "Distributed System", endDate: "08/06/2024", taskName: "Task Name" },
  ];
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-5 pb-0">
          <Text className="text-xl tracking-widest font-psemibold text-primary">Assignments</Text>
        </View>
        <View className="px-5 mb-10">
          {taskdata.map((task) => (
            <View className="w-full p-5 mt-6 rounded-lg bg-slate-200">
              <View
                key={task.id}
              // className="flex-row items-center justify-between"
              >
                <Text className="text-sm tracking-widest text-primary font-pmedium">
                  {task.subject}
                </Text>
                <Text className="mt-3 text-sm font-pregular">
                  {task.taskName}
                </Text>
                <View className="flex-row items-center justify-start gap-1 mt-3">
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={Colors.third}
                  />
                  <Text className="mt-2 text-xs font-pregular text-red">
                    {task.endDate}
                  </Text>
                </View>
                <CustomButton
                  title="Upload File"
                  // handlePress={ () => router.push('/login') }
                  containerStyles="bg-slate-200 rounded-lg px-4 mt-4"
                  textStyles={
                    "text-primary text-sm font-pmedium tracking-widest"
                  }
                />
                <CustomButton
                  title="SUBMIT"
                  // handlePress={ () => router.push('/login') }
                  containerStyles="bg-primary rounded-lg px-4 mt-4"
                  textStyles={
                    "text-white text-sm font-pmedium tracking-widest"
                  }
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#f5f5f5" />
    </SafeAreaView>
  );
};

export default Task;

const styles = StyleSheet.create({});
