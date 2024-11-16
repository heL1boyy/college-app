import { View, Text, ScrollView, TextInput, Modal } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AddTask from "../../../components/TeacherComponents/AddTask";
import TaskSection from "../../../components/TeacherComponents/TaskSection";

const Tasks = () => {
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Tasks
          </Text>
        </View>
        <AddTask />
        <TaskSection />
        <StatusBar backgroundColor="black" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tasks;
