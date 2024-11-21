import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

const Class = () => {
  const currentDate = moment("2024-11-20T06:40:00");

  const items = [
    {
      id: "1",
      startTime: "2024-11-20T06:40:00",
      endTime: "2024-11-20T08:20:00",
      title: "Network Programming",
    },
    {
      id: "2",
      startTime: "2024-11-20T08:20:00",
      endTime: "2024-11-20T09:10:00",
      title: "Distributed System",
    },
    {
      id: "3",
      startTime: "2024-11-20T09:10:00",
      endTime: "2024-11-20T10:50:00",
      title: "Mobile Programming",
    },
  ];

  const isClassActive = (startTime, endTime) => {
    const start = moment(startTime);
    const end = moment(endTime);
    return currentDate.isBetween(start, end, null, "[]");
  };

  const isClassFinished = (endTime) => {
    const end = moment(endTime);
    return currentDate.isAfter(end);
  };

  return (
    <View className="px-6 my-4">
      <Text className="text-lg font-pmedium">Today's Classes</Text>
      {items.map((item) => {
        let classStatus = "";
        let classColor = "bg-pink-100";

        // check the class is active or not
        if (isClassActive(item.startTime, item.endTime)) {
          classStatus = "Active";
          classColor = "bg-green-200";
        } else if (isClassFinished(item.endTime)) {
          classStatus = "Finished";
          classColor = "bg-pink-100";
        } else {
          classStatus = "Upcoming";
          classColor = "bg-yellow-100";
        }

        // Log the status to the console
        console.log(`${item.title}: ${classStatus}`);

        return (
          <View
            key={item.id}
            className={`flex-col items-start justify-center p-4 mt-5 rounded-lg ${classColor}`}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row justify-center items-center h-full w-[12%]">
                <Text className="px-3 py-2 bg-[#f5f5f5] rounded-lg text-primary">
                  {item.id}
                </Text>
              </View>
              <View className="ml-4">
                <Text className="text-sm tracking-wide text-primary font-pmedium">
                  {moment(item.startTime).format("hh:mm A")} -{" "}
                  {moment(item.endTime).format("hh:mm A")}
                </Text>
                <Text className="mt-3 text-sm tracking-widest font-pregular">
                  {item.title}
                </Text>
                <Text className="mt-2 text-xs text-gray-500">
                  {classStatus}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Class;
