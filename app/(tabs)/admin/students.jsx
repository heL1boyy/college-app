import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { fetchUserData } from "../../../lib/FirebaseConfig"; // Adjust the path as needed

const Students = () => {
  const [editMode, setEditMode] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form state for adding a new student
  const [newStudent, setNewStudent] = useState({
    email: "",
    username: "",
    address: "",
    contactNumber: "",
    department: "",
    semester: "",
    yearOfJoining: "",
    dateOfBirth: "",
    gender: "",
    profileImageUrl: "",
  });

  // Fetch user data
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

  const handleCancel = () => {
    setEditMode(false);
    setNewStudent({
      email: "",
      username: "",
      address: "",
      contactNumber: "",
      department: "",
      semester: "",
      yearOfJoining: "",
      dateOfBirth: "",
      gender: "",
      profileImageUrl: "",
    });
  };

  const handleInputChange = (field, value) => {
    setNewStudent((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddStudent = () => {
    // For now, just pushing newStudent to studentList as a demo
    setStudentList([...studentList, newStudent]);
    setEditMode(false);
    handleCancel(); // Reset form state
  };

  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Students
          </Text>
        </View>

        {/* Add Student Section */}
        <View className="flex-col mx-6 mb-6 space-y-4">
          {editMode ? (
            <>
              <View className="p-6 mb-2 rounded-lg bg-slate-200">
                <View className="flex-row items-center mb-6">
                  <Text className="tracking-wider font-rmedium w-[20%]">
                    Name:
                  </Text>
                  <TextInput
                    value={newStudent.username}
                    onChangeText={(text) => handleInputChange("name", text)}
                    className="w-[80%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>

                <View className="flex-row items-center mb-6">
                  <Text className="tracking-wider font-rmedium w-[36%]">
                    Department:
                  </Text>
                  <TextInput
                    value={newStudent.department}
                    onChangeText={(text) =>
                      handleInputChange("department", text)
                    }
                    className="w-[64%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>

                <View className="flex-row items-center mb-6">
                  <Text className="tracking-wider font-rmedium w-[44%]">
                    Academic Year:
                  </Text>
                  <TextInput
                    value={newStudent.yearOfJoining}
                    onChangeText={(text) => handleInputChange("year", text)}
                    className="w-[56%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>

                <View className="flex-row items-center mb-6">
                  <Text className="tracking-wider font-rmedium w-[24%]">
                    Roll No:
                  </Text>
                  <TextInput
                    //   value={newStudent.rollNo}
                    onChangeText={(text) => handleInputChange("rollNo", text)}
                    className="w-[76%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>

                <View className="flex-row items-center mb-6">
                  <Text className="tracking-wider font-rmedium w-[20%]">
                    Email:
                  </Text>
                  <TextInput
                    value={newStudent.email}
                    onChangeText={(text) => handleInputChange("email", text)}
                    className="w-[80%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>

                <View className="flex-row items-center">
                  <Text className="tracking-wider font-rmedium w-[26%]">
                    Contact:
                  </Text>
                  <TextInput
                    value={newStudent.contactNumber}
                    onChangeText={(text) => handleInputChange("contact", text)}
                    className="w-[74%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>
              </View>

              <TouchableOpacity onPress={handleCancel}>
                <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-slate-600 font-rmedium">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleAddStudent}>
                <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                  Add Student
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                Add Student
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Student List */}
        <View className="px-6 py-2">
          {loading ? (
            <Text className="text-center text-primary font-rmedium">
              Loading...
            </Text>
          ) : studentList.length > 0 ? (
            studentList.map((student, index) => (
              <TouchableOpacity
                key={index}
                className="flex flex-row items-center justify-start p-5 mb-8 rounded-lg bg-slate-200"
                onPress={() =>
                  router.push({
                    pathname: "/adminRoutes/students/[username]",
                    params: {
                      username: student.username,
                      userData: JSON.stringify(student),
                      // img:student.profileImageUrl
                      // userImg: JSON.stringify(student.profileImageUrl),
                    },
                  })
                }
              >
                <View>
                  <Image
                    source={{
                      uri:
                        student.profileImageUrl ||
                        "https://via.placeholder.com/150",
                    }}
                    className="w-[76px] h-[76px] rounded-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="ml-6">
                  <Text className="text-base tracking-wide text-primary font-rregular">
                    {student.username || "No Name"}
                  </Text>
                  <Text className="mt-3 text-sm tracking-wide text-black font-rregular">
                    {student.email || "Email Not Available"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-center text-gray-500 font-rregular">
              No users found
            </Text>
          )}
        </View>

        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Students;
