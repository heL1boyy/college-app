import React from "react";
import { ScrollView, View, Text } from "react-native";

// const { width } = Dimensions.get("window");

const HorizontalScrollView = () => {
  const items = [
    { id: "1", date: "6:40 AM - 8:20 AM", title: "Network Programming" },
    { id: "2", date: "8:20 AM - 9:10 AM", title: "Distributed System" },
    { id: "3", date: "9:10 AM - 10:50 AM", title: "Mobile Programming" },
  ];
  return (
    <ScrollView
      horizontal
      // pagingEnabled
      showsHorizontalScrollIndicator={false}
      className="mt-4"
    >
      {items.map((item) => (
        <View
          key={item.id}
          className="flex-col items-start justify-center p-4 mr-2 rounded-lg bg-slate-200"
        >
          <Text className="text-sm tracking-wide text-primary font-pmedium">
            {item.date}
          </Text>
          <Text className="mt-3 text-sm tracking-widest font-pregular">
            {item.title}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default HorizontalScrollView;
