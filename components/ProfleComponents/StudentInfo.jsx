import { View, Text } from "react-native";
import React from "react";

const StudentInfo = ({ item }) => {
  return (
    <View className="p-5 mt-2 mb-8 rounded-lg bg-slate-200">
      <Text className="mb-4 tracking-wider text-black">
        <Text className="font-rmedium">DEPARTMENT: </Text>
        {item?.department}
      </Text>
      <Text className="mb-4 tracking-wider text-black">
        <Text className="font-rmedium">SEMESTER: </Text> {item?.semester}
      </Text>
      <Text className="mb-4 tracking-wider text-black">
        <Text className="font-rmedium">CURRENT CGPA: </Text>
        4.0
      </Text>
      <Text className="tracking-wider text-black">
        <Text className="font-rmedium">ACADEMIC YEAR: </Text>
        {item?.yearOfJoining}
      </Text>
    </View>
  );
};

export default StudentInfo;
