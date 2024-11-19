import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router"; // To get parameters passed to the route
import { fetchAttendanceForTeacherAndUser } from "../../../lib/FirebaseConfig"; // Import the function
import { Calendar } from "react-native-calendars";

const AttendanceBySubject = () => {
  const { teacherId, subjectId, currentUserId, subjectname } =
    useLocalSearchParams(); // Get teacherId, subjectId, and currentUserId from route params
  const [attendanceData, setAttendanceData] = useState(null); // Store attendance data (present, absent, etc.)
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Attendance",
      headerShown: true,
    });

    const loadAttendance = async () => {
      try {
        const data = await fetchAttendanceForTeacherAndUser(
          teacherId,
          currentUserId
        );
        setAttendanceData(data); // Set the attendance data
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, [teacherId, currentUserId]); // Reload data when teacherId or currentUserId changes

  if (loading) {
    return (
      <View className="h-full flex items-center justify-center bg-main_background">
        <Text className="text-lg font-psemibold text-primary">
          Loading Attendance...
        </Text>
      </View>
    );
  }

  if (!attendanceData) {
    return (
      <View className="h-full flex items-center justify-center bg-main_background">
        <Text className="text-lg font-psemibold text-primary">
          No Attendance Data
        </Text>
      </View>
    );
  }

  const { presentCount, absentCount, totalDays, attendancePercentage } =
    attendanceData;

  return (
    <View className="px-6 mt-6">
      <Text className="text-xl tracking-widest font-psemibold text-primary">
        {subjectname}
      </Text>

      <View className="my-10">
        <View className="gap-5">
          <Text className="text-[15px]">
            Total Present Days: {presentCount}
          </Text>
          <Text className="text-[15px]">Total Absent Days: {absentCount}</Text>
          <Text className="text-[15px]">Total Days Attended: {totalDays}</Text>
          <Text className="text-[15px]">
            Attendance Percentage: {attendancePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
      <Calendar
        style={{
          borderRadius: 6,
          elevation: 10,
        }}
        hideExtraDays={true}
      />
    </View>
  );
};

export default AttendanceBySubject;
