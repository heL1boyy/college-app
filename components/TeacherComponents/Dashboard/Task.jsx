import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import CustomButton from "../../CustomButton";

const Task = () => {
  const taskdata = [
    {
      id: 1,
      subject: "Networking Programming",
      endDate: "08/06/2024",
      taskName: "Task Name",
      submitted: "",
    },
  ];

  return (
    <View className="px-6 my-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-pmedium">Tasks</Text>
        <TouchableOpacity onPress={() => router.push("/teacher/tasks")}>
          <Text className="text-sm font-pmedium text-primary">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5">
        {taskdata.map((task, idx) => (
          <View key={idx} className="w-full p-5 rounded-lg bg-slate-200">
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
              {task.submitted ? (
                <></>
              ) : (
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
              )}
              {task.submitted ? (
                <CustomButton
                  title="View File"
                  // onPress={}
                  containerStyles="bg-slate-200 rounded-lg px-4 mt-4"
                  textStyles={
                    "text-primary text-sm font-pmedium tracking-widest"
                  }
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Task;
