import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  addTeacherWithSubcollections,
  fetchTeachers,
  fetchCurrentUserData,
  auth,
} from "../../../lib/FirebaseConfig"; // Updated Import
import { useGlobalContext } from "../../../context/GlobalProvider";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Teachers = () => {
  const { user } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setEditMode(false);
    setName("");
    setSubject("");
    setEmail("");
    setPassword("");
    setContact("");
  };

  const handleSave = async () => {
    if (!name || !subject || !email || !contact || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Create user with email and password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid; // Get the UID of the created user

      // Prepare data for Firestore
      const teacherData = {
        name,
        email,
        contact,
        uid, // Add the UID explicitly
        isTeacher: true,
        imageURI: "", // Default image URI if needed
      };

      const subjectData = {
        subjectName: subject,
      };

      const taskData = {
        createdAt: new Date().toISOString(),
        dueDate: "",
        dueTime: "",
        taskDetails: "",
        taskName: "Initial Task",
        status: "Pending",
      };

      // Add teacher with subcollections
      await addTeacherWithSubcollections(
        uid,
        teacherData,
        subjectData,
        taskData
      );
      console.log("Teacher with subcollections added successfully");

      // Reset form and refresh the teacher list
      handleCancel();
      fetchAllTeachers();
    } catch (error) {
      console.error("Error adding teacher:", error);
      Alert.alert("Error", "Failed to add teacher: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTeachers = async () => {
    setLoading(true);
    try {
      const teachersData = await fetchTeachers();
      setTeachers(teachersData);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Teachers
          </Text>
        </View>
        <View className="flex-col mx-6 mb-6 space-y-4">
          {editMode ? (
            <>
              <View className="p-6 mb-2 rounded-lg bg-slate-200">
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="tracking-wider font-rmedium w-[18%]">
                    Name:
                  </Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    className="w-[82%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="tracking-wider font-rmedium w-[24%]">
                    Subject:
                  </Text>
                  <TextInput
                    value={subject}
                    onChangeText={setSubject}
                    className="w-[76%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="tracking-wider font-rmedium w-[18%]">
                    Email:
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    className="w-[82%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="tracking-wider font-rmedium w-[26%]">
                    Password:
                  </Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    className="w-[72%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="tracking-wider font-rmedium w-[26%]">
                    Contact:
                  </Text>
                  <TextInput
                    value={contact}
                    onChangeText={setContact}
                    className="w-[74%] px-3 py-1 border border-gray-500 rounded-lg"
                  />
                </View>
              </View>
              <TouchableOpacity onPress={handleCancel}>
                <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-slate-600 font-rmedium">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                  Add Teacher
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                Add Teacher
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View className="px-6 py-2">
            {teachers.length === 0 ? (
              <Text className="text-center">No teachers available</Text>
            ) : (
              teachers.map((teacher, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex flex-row items-center justify-start p-5 mb-8 rounded-lg bg-slate-200"
                  onPress={() =>
                    router.push("/adminRoutes/teachers/" + teacher.name)
                  }
                >
                  <Image
                    source={{ uri: teacher.imageURI || "https://via.placeholder.com/150" }}
                    className="w-[76px] h-[76px] rounded-full"
                    resizeMode="cover"
                  />
                  <View className="ml-6">
                    <Text className="text-base tracking-wide text-primary font-rregular">
                      {teacher.name}
                    </Text>
                    <Text className="mt-3 text-sm tracking-wide text-black font-rregular">
                      {teacher.subject ? teacher.subject : "subject name here"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Teachers;
