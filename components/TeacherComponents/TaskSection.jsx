import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import CustomButton from "../CustomButton";
import { fetchTasks } from "../../lib/FirebaseConfig"; // Import the fetch function

const TaskSection = () => {
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
    <View className="px-6 my-2">
      {tasks.map((task, idx) => (
        <View key={task.id} className="w-full p-5 mb-8 rounded-lg bg-slate-200">
          <Text className="text-sm tracking-widest text-primary font-pmedium">
            {task.taskDetails}
          </Text>
          {!task.submitted ? (
            <View className="flex-row items-center justify-start gap-1 mt-3">
              <Ionicons name="time-outline" size={18} color={Colors.third} />
              <Text className="mt-2 text-xs font-pregular text-red">
                {task.dueDate} {task.dueTime}
              </Text>
            </View>
          ) : (
            <CustomButton
              title="View File"
              onPress={() => handleViewFile(task.fileUrl)}
              containerStyles="bg-slate-200 rounded-lg px-4 mt-4"
              textStyles={"text-primary text-sm font-pmedium tracking-widest"}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default TaskSection;
