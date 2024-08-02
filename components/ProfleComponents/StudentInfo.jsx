import { View, Text } from "react-native";
import React from "react";

const StudentInfo = ({ item }) => {
  return (
    <View className="p-6 bg-orange-100 rounded-xl">
      <Text className="text-black mb-2">
        <Text className="font-semibold">DEPARTMENT: </Text>
        {item?.department}
      </Text>
      <Text className="text-black mb-2">
        <Text className="font-semibold">SEMESTER: </Text> {item?.semester}
      </Text>
      <Text className="text-black mb-2">
        <Text className="font-semibold">CURRENT CGPA: </Text>
        7.5
      </Text>
      <Text className="text-black">
        <Text className="font-semibold">ACADEMIC YEAR: </Text>
        {item?.yearOfJoining}
      </Text>
    </View>
  );
};

export default StudentInfo;
