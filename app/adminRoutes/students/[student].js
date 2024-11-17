import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { fetchUserData } from "../../../lib/FirebaseConfig";

const ParticularStudent = () => {
  const { username, userData } = useLocalSearchParams(); // Access the correct params
  const navigation = useNavigation();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the navigation title
    navigation.setOptions({
      headerTitle: username,
      headerShown: false,
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
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // No student data found
  if (!studentData) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl">User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-main_background">
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View className="flex-col items-center justify-center p-6 my-2">
          <Image
            source={{
              uri: studentData?.profileImageUrl
                ? studentData.profileImageUrl
                : "https://via.placeholder.com/150",
            }}
            className="w-40 h-40 rounded-full border-2"
            resizeMode="cover"
          />

          <Text className="mt-6 text-xl font-semibold tracking-widest text-primary">
            {studentData?.username || "Unknown User"}
          </Text>
        </View>

        <View className="flex-row items-center justify-start p-5 mx-6 mb-4 rounded-lg bg-slate-200">
          <View>
            <Text className="mb-3 tracking-wider font-rmedium">
              Department:
            </Text>
            <Text className="mb-3 tracking-wider font-rmedium">Semester:</Text>
            <Text className="mb-3 tracking-wider font-rmedium">
              Academic Year:
            </Text>
            <Text className="mb-3 tracking-wider font-rmedium">Roll No:</Text>
            <Text className="tracking-wider font-rmedium">Current CGPA:</Text>
          </View>
          <View className="ml-4">
            <Text className="mb-3 tracking-wider font-rregular">
              {studentData?.department || "N/A"}
            </Text>
            <Text className="mb-3 tracking-wider font-rregular">
              {studentData?.semester || "N/A"}
            </Text>
            <Text className="mb-3 tracking-wider font-rregular">
              {studentData?.academicYear || "N/A"}
            </Text>
            <Text className="mb-3 tracking-wider font-rregular">
              {studentData?.rollNo || "N/A"}
            </Text>
            <Text className="tracking-wider font-rregular">
              {studentData?.cgpa || "N/A"}
            </Text>
          </View>
        </View>

        <View className="p-5 mx-6 my-4 bg-slate-200 rounded-xl">
          <Text className="text-lg font-rmedium">About</Text>
          <View className="flex-row items-center justify-start mt-4">
            <View>
              <Text className="mb-3 tracking-wider font-rregular">
                Date of Birth:
              </Text>
              <Text className="tracking-wider font-rregular">Gender:</Text>
            </View>
            <View className="ml-4">
              <Text className="mb-3 tracking-wider font-rregular">
                {studentData?.dateOfBirth || "N/A"}
              </Text>
              <Text className="tracking-wider font-rregular">
                {studentData?.gender || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        <View className="p-5 mx-6 mt-4 mb-8 bg-slate-200 rounded-xl">
          <Text className="text-lg font-rmedium">Contact</Text>
          <View className="flex-row items-center justify-start mt-4">
            <View>
              <Text className="mb-3 tracking-wider font-rregular">
                Contact No:
              </Text>
              <Text className="mb-3 tracking-wider font-rregular">Email:</Text>
              <Text className="tracking-wider font-rregular">Address:</Text>
            </View>
            <View className="ml-4">
              <Text className="mb-3 tracking-wider font-rregular">
                {studentData?.contactNumber || "N/A"}
              </Text>
              <Text className="mb-3 tracking-wider font-rregular">
                {studentData?.email || "N/A"}
              </Text>
              <Text className="tracking-wider font-rregular">
                {studentData?.address || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParticularStudent;
