import { Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
// import { images } from '../../../constants'

const Notice = () => {
  const notices = [
    { id: 1, noticeDate: "08/06/2024", title: "We are here for you on holidays and Saturdays! Visit us from 9:00 AM to 5:00 PM for all your inquires." },
    { id: 2, noticeDate: "08/10/2024", title: "Hurry up! Limited Seats Available. Only 4 days left to register for the ComputeMATHA event." },
    { id: 3, noticeDate: "08/24/2024", title: "Join us for ComputeMATHA, an exclusive event for prospective BCA Program Students!"  },
    { id: 4, noticeDate: "08/26/2024", title: "Exciting news coming from Sagarmatha College of Science and Technology! Stay tuned and visit our Facebook page tonigh at 7:00 PM for a special announcement." },
    { id: 5, noticeDate: "09/01/2024", title: "We are here for you on holidays and Saturdays! Visit us from 9:00 AM to 5:00 PM for all your inquires." },
    { id: 6, noticeDate: "09/04/2024", title: "Hurry up! Limited Seats Available. Only 4 days left to register for the ComputeMATHA event." },
    { id: 7, noticeDate: "09/10/2024", title: "Join us for ComputeMATHA, an exclusive event for prospective BCA Program Students!" },
    { id: 8, noticeDate: "09/12/2024", title: "Exciting news coming from Sagarmatha College of Science and Technology! Stay tuned and visit our Facebook page tonigh at 7:00 PM for a special announcement." },
  ]
  return (
    <SafeAreaView className="mb-14 bg-main_background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Notices
          </Text>
        </View>
        <View className="px-5 mt-1 mb-4">
          {notices.map((notice) => (
            <View className="mb-6">
              <View
                key={notice.id}
                className="flex-col items-start justify-center p-4 rounded-lg bg-slate-200"
              >
                <Text className="text-sm tracking-wide font-pmedium text-primary">
                  {notice.noticeDate}
                </Text>
                <Text className="mt-3 text-sm tracking-widest text-justify font-pregular">
                  {notice.title}
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

export default Notice;
