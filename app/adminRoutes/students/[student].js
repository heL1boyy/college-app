import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { fetchUserData } from "../../../lib/FirebaseConfig";

const ParticularStudent = () => {
  const { username, userData, userImg } = useLocalSearchParams(); // Access the correct params
  const navigation = useNavigation();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the navigation title
    navigation.setOptions({
      headerTitle: "Student",
      headerShown: true,
    });

    // Check if userData is available before parsing
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        console.log("Profile Image URL:", parsedData?.profileImageUrl); // Log URL once it's available
        setStudentData(parsedData);
      } catch (error) {
        console.error("Invalid userData JSON format:", error);
      }
    }

    setLoading(false);
  }, [userData]);

  // Loading state
  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // No student data found
  if (!studentData) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-xl">User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-main_background">
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View className="flex-col items-center justify-start p-6 mb-2">
          <Image
            source={{
              uri: studentData?.profileImageUrl
                ? studentData.profileImageUrl
                : "https://via.placeholder.com/150",
            }}
            className="w-40 h-40 bg-gray-700 border-2 rounded-full"
            resizeMode="cover"
          />
          <Text className="mt-6 text-xl font-semibold tracking-widest text-primary">
            {studentData?.username || "Unknown User"}
          </Text>
        </View>
        <View className="p-5 mx-6 bg-slate-200 rounded-xl">
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Department:</Text>
            <Text className="ml-2 tracking-wider font-rregular">
              {studentData?.department || "N/A"}
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Semester:</Text>
            <Text className="ml-2 tracking-wider font-rregular">
              {studentData?.semester || "N/A"}
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>
              Academic Year:
            </Text>
            <Text className="ml-2 tracking-wider font-rregular">
              {studentData?.academicYear || "N/A"}
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>
              Date of Birth:
            </Text>
            <Text className="ml-2 tracking-wider font-rregular">
              {studentData?.dateOfBirth || "N/A"}
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Gender:</Text>
            <Text className="ml-2 tracking-wider font-rregular">
              {studentData?.gender || "N/A"}
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Contact No:</Text>
            <Text className="ml-2 tracking-wider font-rregular">
              {studentData?.contactNumber || "N/A"}
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Email:</Text>
            <Text className="ml-2 tracking-wider font-rregular">
              {studentData?.email || "N/A"}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className={"font-rmedium tracking-wider"}>Address:</Text>
            <Text className="ml-2 tracking-wider font-rregular">
              {studentData?.address || "N/A"}
            </Text>
          </View>
        </View>
        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParticularStudent;
