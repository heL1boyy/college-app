import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  fetchNotices,
  fetchTasksFromFirestore,
} from "../../lib/FirebaseConfig"; // Adjust the path as needed

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const teacherId = "FXFva2t6pAJEb3B1nygc"; // Replace with the actual teacherId
  const subjectId = "A35gj48najqwD2xVcefn"; // Replace with the actual subjectId

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch notices and tasks concurrently
        const [notices, tasks] = await Promise.all([
          fetchNotices(),
          fetchTasksFromFirestore(teacherId, subjectId),
        ]);

        // Format the fetched data
        const formattedNotices = notices.map((notice) => ({
          ...notice,
          type: "notice",
        }));
        const formattedTasks = tasks.map((task) => ({
          ...task,
          type: "task",
        }));

        // Combine and sort the notifications
        const combinedNotifications = [...formattedNotices, ...formattedTasks];
        combinedNotifications.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setNotifications(combinedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId, subjectId]);

  return (
    <SafeAreaView className="bg-main_background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Notifications
          </Text>
        </View>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#00f" />
          </View>
        ) : (
          <View className="px-6">
            {notifications.map((notification, idx) => (
              <View key={idx} className="mb-8">
                <View className="flex-col items-start justify-center p-4 rounded-lg bg-slate-200">
                  <Text className="text-sm tracking-widest text-justify font-pregular">
                    {notification.name || notification.taskName}
                  </Text>
                  {notification.type === "task" && (
                    <Text className="text-xs italic text-gray-500">[Task]</Text>
                  )}
                  {notification.type === "notice" && (
                    <Text className="text-xs italic text-gray-500">
                      [Notice]
                    </Text>
                  )}
                  <Text className="mt-3 text-sm tracking-wide font-pmedium text-primary">
                    {notification.date || "No date provided"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <StatusBar backgroundColor="#000" />
    </SafeAreaView>
  );
};

export default Notification;
