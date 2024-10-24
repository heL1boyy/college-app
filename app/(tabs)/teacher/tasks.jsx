
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import CustomButton from "../../../../components/CustomButton";
import CustomButton from "../../../components/CustomButton"
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Colors } from "../../../../constants/Colors";
import { Colors } from '../../../constants/Colors';

const Tasks = () => {
  const taskdata = [
    { id: 1, subject: "Networking Programming", endDate: "08/06/2024", taskName: "Task Name" },
    { id: 2, subject: "Mobile Programming ", endDate: "08/06/2024", taskName: "Task Name" },
    { id: 3, subject: "Applied Ecocnomics", endDate: "08/06/2024", taskName: "Task Name" },
    { id: 4, subject: "Distributed System", endDate: "08/06/2024", taskName: "Task Name" },
    { id: 5, subject: "Advanced Java Programming", endDate: "08/06/2024", taskName: "Task Name" },
  ];
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 mt-5">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Tasks
          </Text>
          <CustomButton
            title="Add Task"
            // handlePress={ }
            containerStyles="w-auto bg-primary rounded-lg px-5 ml-5"
            textStyles={
              "text-white text-sm font-pmedium tracking-widest"
            }
          />
        </View>
        <View className="px-5 mt-1 mb-10">
          {taskdata.map((task, idx) => (
            <View key={idx} className="w-full p-5 mt-6 rounded-lg bg-slate-200">
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
                  // handlePress={ }
                  containerStyles="bg-slate-200 rounded-lg px-4 mt-4"
                  textStyles={
                    "text-primary text-sm font-pmedium tracking-widest"
                  }
                />
                <CustomButton
                  title="SUBMIT"
                  // handlePress={ }
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
    </SafeAreaView>
  )
}

export default Tasks