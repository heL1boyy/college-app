import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import CustomButton from "../CustomButton";
import { fetchAllTasksWithNames } from "../../lib/FirebaseConfig"; // Import the fetch function

const TaskSection = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <View className="px-6 my-2">
      {loading ? (
        <View className="flex-1 justify-center items-center mt-10">
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text className="mt-2 text-primary font-pmedium">
            Loading tasks...
          </Text>
        </View>
      ) : (
        <View>
          {tasks.map((task, idx) => (
            <View key={idx} className="w-full p-5 mb-8 rounded-lg bg-slate-200">
              <Text className="text-sm tracking-widest text-primary font-pmedium">
                {task.taskDetails}
              </Text>
              {!task.submitted ? (
                <View className="flex-row items-center mt-3">
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={Colors.third}
                  />
                  <Text className="ml-1 text-xs font-pregular text-red">
                    {task.dueDate} - {task.dueTime}
                  </Text>
                </View>
              ) : (
                <CustomButton
                  title="View File"
                  onPress={() => handleViewFile(task.fileUrl)}
                  containerStyles="bg-slate-200 rounded-lg px-4 mt-4"
                  textStyles={
                    "text-primary text-sm font-pmedium tracking-widest"
                  }
                />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default TaskSection;
