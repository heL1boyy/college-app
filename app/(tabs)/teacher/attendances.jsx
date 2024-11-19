import { View, Text, ScrollView, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { fetchUserData, updateAttendance } from "../../../lib/FirebaseConfig";
import { TouchableOpacity } from "react-native";
import { useGlobalContext } from "../../../context/GlobalProvider";

const Attendances = () => {
  const { user } = useGlobalContext();
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        setCurrentUser(user);

        console.log(user.uid);

        const users = await fetchUserData();
        console.log(users);
        setStudentList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleAttendance = async (studentId, status) => {
    try {
      const date = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
      await updateAttendance(currentUser.uid, studentId, date, status);
      console.log(`Attendance marked as ${status} for student: ${studentId}`);
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <View className="">
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Attendance
          </Text>
        </View>

        <View className="mx-5">
          {loading ? (
            <Text className="text-center text-primary font-rmedium">
              Loading...
            </Text>
          ) : studentList.length > 0 ? (
            <View>
              {/* Table Header */}
              <View className="flex flex-row items-center justify-between p-2 bg-primary">
                <Text className="w-[10%] text-white text-center font-rmedium">SN</Text>
                <Text className="w-[40%] text-white font-rmedium">Name</Text>
                <Text className="w-[42%] text-white font-rmedium text-center">
                  Attendance
                </Text>
              </View>

              {/* Table Body */}
              {studentList.map((student, index) => (
                <View
                  key={student.uid || index}
                  className="flex flex-row items-center justify-between p-2 border-b bg-slate-100"
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
                  <View className="flex flex-row justify-start gap-2 ">
                    <TouchableOpacity
                      onPress={() => handleAttendance(student.id, "present")}
                      className="px-2 py-1 bg-green-500 rounded"
                    >
                      <Text className="text-sm text-white font-rmedium">
                        Present
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAttendance(student.id, "absent")}
                      className="px-2 py-1 rounded bg-red"
                    >
                      <Text className="text-sm text-white font-rmedium">
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
