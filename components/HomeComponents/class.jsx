import { View, Text } from "react-native";
import React from "react";
import HorizontalScrollView from "../HorizontalScrollView";

const Class = () => {
  const items = [
    { id: "1", date: "6:40 AM - 8:20 AM", title: "Network Programming" },
    { id: "2", date: "8:20 AM - 9:10 AM", title: "Distributed System" },
    { id: "3", date: "9:10 AM - 10:50 AM", title: "Mobile Programming" },
  ];
  return (
    <View className="p-5">
      <Text className="text-lg font-pmedium">Today's Class</Text>
      {items.map((item) => (
        <View
          key={item.id}
          className="flex-col items-start justify-center p-4 mt-4 rounded-lg bg-slate-200"
        >
          <Text className="text-sm tracking-wide text-primary font-pmedium">
            {item.date}
          </Text>
          <Text className="mt-3 text-sm tracking-widest font-pregular">
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Class;
