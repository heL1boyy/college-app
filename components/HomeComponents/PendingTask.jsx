import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import { fetchTasks } from "../../lib/FirebaseConfig";
const PendingTask = () => {
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

  const lastTask = tasks.length > 0 ? tasks[tasks.length - 1] : null;

  return (
    <View className="px-6 mt-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-pmedium">Pending Tasks</Text>
        <TouchableOpacity onPress={() => router.push("/user/task")}>
          <Text className="text-sm font-pmedium text-primary">View All</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full mt-5 rounded-lg bg-slate-200">
        {lastTask ? (
          <View className="w-full p-5 rounded-lg bg-slate-200">
            <View

            // className="flex-row items-center justify-between"
            >
              <Text className="text-sm tracking-widest text-primary font-pmedium">
                {lastTask.subject}
              </Text>
              <Text className="mt-3 text-sm font-pregular">
                {lastTask.taskDetails}
              </Text>
              <View className="flex-row items-center justify-start gap-1 mt-3">
                <Ionicons name="time-outline" size={18} color={Colors.third} />
                <Text className="mt-2 text-xs font-pregular text-red">
                  {lastTask.endDate}
                </Text>
              </View>
              <CustomButton
                title="Upload File"
                // onPress={ () => router.push('/login') }
                containerStyles="bg-slate-200 rounded-lg px-4 mt-4"
                textStyles={"text-primary text-sm font-pmedium tracking-widest"}
              />
              <CustomButton
                title="SUBMIT"
                // onPress={ () => router.push('/login') }
                containerStyles="bg-primary rounded-lg px-4 mt-4"
                textStyles={"text-white text-sm font-pmedium tracking-widest"}
              />
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

export default PendingTask;
