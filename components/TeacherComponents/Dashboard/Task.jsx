import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import CustomButton from "../../CustomButton";
import { fetchAllTasksWithNames } from "../../../lib/FirebaseConfig";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true); // Start loading
        const fetchedTasks = await fetchAllTasksWithNames();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getTasks();
  }, []);

  const firstTask = tasks.length > 0 ? tasks[0] : null;

  return (
    <View className="px-6 my-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-pmedium">Tasks</Text>
        <TouchableOpacity onPress={() => router.push("/teacher/tasks")}>
          <Text className="text-sm font-pmedium text-primary">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5">
        {loading ? (
          // Show loading indicator while fetching data
          <View className="flex justify-center items-center">
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : firstTask ? (
          <View className="w-full p-5 rounded-lg bg-slate-200">
            <View key={firstTask.id}>
              <Text className="text-sm tracking-widest text-primary font-pmedium">
                {firstTask.subjectName}
              </Text>
              <Text className="mt-3 text-sm font-pregular">
                {firstTask.dueTime}
              </Text>
            </View>
          </View>
        ) : (
          <Text className="text-center text-sm text-gray-500">
            No tasks available.
          </Text>
        )}
      </View>
    </View>
  );
};

export default Task;
