import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../../../../components/CustomButton";
import { Colors } from "../../../../constants/Colors";
import { fetchAllTasksWithNames } from "../../../../lib/FirebaseConfig"; // Import the function

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchAllTasksWithNames(); // Use the new function
        setTasks(fetchedTasks); // Set the fetched tasks to the state
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
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

        {/* Show spinner while loading */}
        {loading ? (
          <View className="flex-1 justify-center items-center mt-10">
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text className="mt-2 text-primary font-pmedium">
              Loading tasks...
            </Text>
          </View>
        ) : (
          <View className="px-6 mt-1 mb-2">
            {tasks.map((task, idx) => (
              <View
                key={idx}
                className="w-full p-5 mb-8 rounded-lg bg-slate-200"
              >
                <View>
                  <Text className="text-sm tracking-widest text-primary font-pmedium">
                    Subject: {task.subjectName || "N/A"}
                  </Text>
                  <Text className="text-sm tracking-widest text-primary font-pmedium">
                    From: {task.teacherName}
                  </Text>
                  <Text className="mt-3 text-sm font-pregular">
                    Task: {task.taskDetails}
                  </Text>
                  <View className="flex-row items-center justify-start gap-1 mt-3">
                    <Ionicons
                      name="time-outline"
                      size={18}
                      color={Colors.third}
                    />
                    <Text className="mt-2 text-xs font-pregular text-red">
                      Due Date: {task.dueDate || "N/A"}
                    </Text>
                  </View>
                  <CustomButton
                    title="Upload File"
                    containerStyles="bg-slate-200 rounded-lg px-4 mt-4"
                    textStyles="text-primary text-sm font-pmedium tracking-widest"
                  />
                  <CustomButton
                    title="SUBMIT"
                    containerStyles="bg-primary rounded-lg px-4 mt-4"
                    textStyles="text-white text-sm font-pmedium tracking-widest"
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <StatusBar backgroundColor="#000" />
    </SafeAreaView>
  );
};

export default Task;
