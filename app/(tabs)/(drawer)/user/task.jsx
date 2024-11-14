import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../../../../components/CustomButton";
import { Colors } from "../../../../constants/Colors";
import { fetchTasks } from "../../../../lib/FirebaseConfig";
const Task = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    getTasks();
  }, []);

  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Assignments
          </Text>
        </View>
        <View className="px-6 mt-1 mb-2">
          {tasks.map((task, idx) => (
            <View key={idx} className="w-full p-5 mb-8 rounded-lg bg-slate-200">
              <View
                key={task.id}
                // className="flex-row items-center justify-between"
              >
                <Text className="text-sm tracking-widest text-primary font-pmedium">
                  {task.subject}
                </Text>
                <Text className="mt-3 text-sm font-pregular">
                  {task.taskDetails}
                </Text>
                <View className="flex-row items-center justify-start gap-1 mt-3">
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={Colors.third}
                  />
                  <Text className="mt-2 text-xs font-pregular text-red">
                    {task.dueDate}
                  </Text>
                </View>
                <CustomButton
                  title="Upload File"
                  // onPress={ () => router.push('/login') }
                  containerStyles="bg-slate-200 rounded-lg px-4 mt-4"
                  textStyles={
                    "text-primary text-sm font-pmedium tracking-widest"
                  }
                />
                <CustomButton
                  title="SUBMIT"
                  // onPress={ () => router.push('/login') }
                  containerStyles="bg-primary rounded-lg px-4 mt-4"
                  textStyles={"text-white text-sm font-pmedium tracking-widest"}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#000" />
    </SafeAreaView>
  );
};

export default Task;

const styles = StyleSheet.create({});
