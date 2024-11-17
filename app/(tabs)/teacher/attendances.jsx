import { View, Text, ScrollView, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { fetchUserData } from "../../../lib/FirebaseConfig";
import { TouchableOpacity } from "react-native";

const Attendances = () => {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const users = await fetchUserData();
        setStudentList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <View className="">
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Attendance
          </Text>
        </View>

        <View className="px-4">
          {loading ? (
            <Text className="text-center text-primary font-rmedium">
              Loading...
            </Text>
          ) : studentList.length > 0 ? (
            <View>
              {/* Table Header */}
              <View className="flex flex-row items-center justify-between bg-primary p-2">
                <Text className="w-[8%] text-white font-rmedium">SN</Text>

                <Text className="w-[50%] text-white font-rmedium">Name</Text>
                <Text className="w-[42%] text-white font-rmedium text-center">
                  Attendance
                </Text>
              </View>

              {/* Table Body */}
              {studentList.map((student, index) => (
                <View
                  key={student.uid || index}
                  className="flex flex-row items-center justify-between border-b bg-slate-100 p-2"
                >
                  {/* Serial Number */}
                  <Text className="w-[10%] text-center text-primary font-rregular">
                    {index + 1}
                  </Text>

                  {/* Student Name */}
                  <Text
                    className="w-[40%] text-primary font-rregular"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {student.username || "No Name"}
                  </Text>

                  {/* Attendance Buttons */}
                  <View className=" flex flex-row justify-start gap-2">
                    <TouchableOpacity
                      onPress={() => handleAttendance(student.uid, "present")}
                      className="px-2 py-1 rounded bg-green-500"
                    >
                      <Text className="text-white text-sm font-rmedium">
                        Present
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAttendance(student.uid, "absent")}
                      className="px-2 py-1 rounded bg-red"
                    >
                      <Text className="text-white text-sm font-rmedium">
                        Absent
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-center text-gray-500 font-rregular">
              No users found
            </Text>
          )}
        </View>
      </View>
      <StatusBar backgroundColor="black" />
    </SafeAreaView>
  );
};

export default Attendances;
