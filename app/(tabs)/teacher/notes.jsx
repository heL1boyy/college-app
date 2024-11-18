import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getTeacherWithSubjects } from "../../../lib/FirebaseConfig"; // Import your Firestore function
import { useGlobalContext } from "../../../context/GlobalProvider"; // Import Global Context

const Notes = () => {
  const { user } = useGlobalContext(); // Access user from Global Context
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch subjects for the current teacher
  const fetchSubjects = async () => {
    try {
      if (user && user.uid) {
        const teacherData = await getTeacherWithSubjects(user.uid);
        setSubjects(teacherData.subjects);
      } else {
        console.error("No user information found in global context.");
      }
    } catch (error) {
      console.error("Error fetching teacher subjects:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <SafeAreaView className="h-full bg-main_background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Notes
          </Text>
        </View>
        <View className="px-6 mt-1">
          {loading ? (
            <Text>Loading...</Text>
          ) : subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <TouchableOpacity
                key={subject.id}
                onPress={() =>
                  router.push(`/teacherRoutes/notes/${subject.subjectName}`)
                }
                className="px-5 py-4 mb-8 rounded-lg bg-slate-200"
              >
                <Text className="my-2 text-sm tracking-wider font-pmedium">
                  {subject.subjectName || "Unnamed Subject"}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No subjects found for this teacher.</Text>
          )}
        </View>
        <StatusBar backgroundColor="black" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notes;
