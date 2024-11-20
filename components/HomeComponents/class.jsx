import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

const Class = () => {
  const currentDate = moment();

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

  // Binary Search to find the active class
  const findActiveClass = (classes, currentTime) => {
    let left = 0;
    let right = classes.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const start = moment(classes[mid].startTime);
      const end = moment(classes[mid].endTime);

      if (currentTime.isBetween(start, end, null, "[]")) {
        return classes[mid];
      }

      if (currentTime.isBefore(start)) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return null; // No active class found
  };

  // Binary Search to check if the class is finished
  const isClassFinished = (endTime) => {
    const end = moment(endTime);
    return currentDate.isAfter(end);
  };

  return (
    <View className="px-6 my-4">
      <Text className="text-lg font-pmedium">Today's Classes</Text>
      {items.map((item) => {
        let classStatus = "";
        let classColor = "bg-slate-200"; // Default color (inactive)
        let textColor = "text-slate-600"; // Default text color

        const activeClass = findActiveClass(items, currentDate);

        if (activeClass && activeClass.id === item.id) {
          classStatus = "Class is running"; // Add status for active class
          classColor = "bg-green-200"; // Active class highlighted in green
          textColor = "text-green-500";
        } else if (isClassFinished(item.endTime)) {
          classStatus = "Finished"; // Add status for finished class
          classColor = "bg-[#fadfdf]";
          textColor = "text-red-500";
        } else {
          classStatus = "Upcoming"; // Add status for upcoming class
          classColor = "bg-yellow-100";
          textColor = "text-yellow-600";
        }

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
                <Text className={`mt-2 text-xs ${textColor}`}>
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
