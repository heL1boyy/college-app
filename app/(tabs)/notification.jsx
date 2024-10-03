import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Notification = () => {
    const notifications = [
        { id: 1, notificationDate: "08/06/2024", title: "We are here for you on holidays and Saturdays! Visit us from 9:00 AM to 5:00 PM for all your inquires." },
        { id: 2, notificationDate: "08/10/2024", title: "Hurry up! Limited Seats Available. Only 4 days left to register for the ComputeMATHA event." },
        { id: 3, notificationDate: "08/24/2024", title: "Join us for ComputeMATHA, an exclusive event for prospective BCA Program Students!" },
        { id: 4, notificationDate: "08/26/2024", title: "Exciting news coming from Sagarmatha College of Science and Technology! Stay tuned and visit our Facebook page tonigh at 7:00 PM for a special announcement." },
        { id: 5, notificationDate: "09/01/2024", title: "We are here for you on holidays and Saturdays! Visit us from 9:00 AM to 5:00 PM for all your inquires." },
        { id: 6, notificationDate: "09/04/2024", title: "Hurry up! Limited Seats Available. Only 4 days left to register for the ComputeMATHA event." },
        { id: 7, notificationDate: "09/10/2024", title: "Join us for ComputeMATHA, an exclusive event for prospective BCA Program Students!" },
        { id: 8, notificationDate: "09/12/2024", title: "Exciting news coming from Sagarmatha College of Science and Technology! Stay tuned and visit our Facebook page tonigh at 7:00 PM for a special announcement." },
    ]
    return (
        <SafeAreaView className="bg-main_background">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="p-5">
                    <Text className="text-xl tracking-widest font-psemibold text-primary">
                        Notifications
                    </Text>
                </View>
                <View className="px-5 mt-1">
                    {notifications.map((notification) => (
                        <View className="mb-6">
                            <View
                                key={notification.id}
                                className="flex-col items-start justify-center p-4 rounded-lg bg-slate-200"
                            >
                                <Text className="text-sm tracking-wide font-pmedium text-primary">
                                    {notification.notificationDate}
                                </Text>
                                <Text className="mt-3 text-sm tracking-widest text-justify font-pregular">
                                    {notification.title}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#f5f5f5" style="light" />
        </SafeAreaView>
    );
};

export default Notification;
