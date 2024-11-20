import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { fetchNotices } from "../../../lib/FirebaseConfig";
import { format } from "date-fns";

const Notice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const fetchedNotices = await fetchNotices(); // Fetch notices from Firebase
        setNotices(fetchedNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
    getNotices();
  }, []);

  const lastNotice = notices.length > 0 ? notices[notices.length - 1] : null;

  return (
    <View className="px-6 mt-4 mb-10">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-pmedium">Notices</Text>
        <TouchableOpacity onPress={() => router.push("/teacher/notices")}>
          <Text className="text-sm font-pmedium text-primary">View All</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5">
        {lastNotice ? (
          <View className="p-4 rounded-lg bg-slate-200" key={lastNotice.id}>
            <Text className="text-sm tracking-wide font-pmedium text-primary">
              {lastNotice.createdAt
                ? format(lastNotice.createdAt.toDate(), "MMM dd, yyyy")
                : "No date available"}
            </Text>
            <Text className="mt-2 text-sm tracking-widest text-justify font-pregular">
              {lastNotice.name}
            </Text>
            {!lastNotice.imageUrl ? (
              <></>
            ) : (
              <Image
                source={{ uri: lastNotice.imageUrl }}
                className="w-full mt-3 h-80"
                resizeMode="contain"
              />
            )}
          </View>
        ) : (
          <Text className="text-center text-sm text-gray-500">
            No notices available.
          </Text>
        )}
      </View>
    </View>
  );
};

export default Notice;
