import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router"; // Import useNavigation
import {
  fetchTeachers,
  fetchSubjectsForTeacher,
} from "../../../../lib/FirebaseConfig"; // Import fetchTeachers
import { useGlobalContext } from "../../../../context/GlobalProvider";

const Attendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teacherIds, setTeacherIds] = useState([]);

  const { user } = useGlobalContext();

  useEffect(() => {
    // Fetch the teacher IDs and then subjects for all teachers
    const loadTeacherAndSubjects = async () => {
      try {
        const teachers = await fetchTeachers();
        if (teachers && teachers.length > 0) {
          // Get all teacher IDs
          const allTeacherIds = teachers.map((teacher) => teacher.id);
          setTeacherIds(allTeacherIds);

          // Fetch subjects for each teacher
          const allSubjects = [];
          for (let teacherId of allTeacherIds) {
            const fetchedSubjects = await fetchSubjectsForTeacher(teacherId);
            const teacherSubjects = fetchedSubjects.map((subject) => ({
              ...subject,
              teacherId, // Include the teacherId here for each subject
            }));
            allSubjects.push(...teacherSubjects); // Combine subjects from all teachers
          }

          setSubjects(allSubjects); // Set all subjects to state
        }
      } catch (error) {
        console.error("Error fetching teacher or subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTeacherAndSubjects();
  }, []); // Empty array means this effect runs once when the component mounts

  if (loading) {
    return (
      <View className="h-full flex items-center justify-center bg-main_background">
        <Text className="text-lg font-psemibold text-primary">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full bg-main_background">
      <View className="p-6">
        <Text className="text-xl tracking-widest font-psemibold text-primary">
          Attendance
        </Text>
      </View>
      {subjects.length > 0 ? (
        subjects.map((subject) => (
          <View key={subject.id} className="px-6 mb-6">
            <TouchableOpacity
              onPress={() => {
                // Use navigation.push() to navigate
                router.push({
                  pathname: `/userRoutes/attendances/${subject.subjectName}`, // Dynamic route
                  params: {
                    subjectname: subject.subjectName,
                    teacherId: subject.teacherId, // Pass the teacherId to the route
                    subjectId: subject.id,
                    currentUserId: user.uid, // Pass the subjectId to the route
                  },
                });
              }}
              className="w-full px-5 py-4 mt-1 rounded-lg bg-slate-200"
            >
              <View className="flex-row items-center justify-between">
                <Text className="my-2 text-sm tracking-wider font-pmedium w-[85%]">
                  {subject.subjectName} {/* Display subject name */}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text className="text-center text-lg font-psemibold text-primary">
          No subjects found for any teacher.
        </Text>
      )}
      <StatusBar backgroundColor="#000" />
    </SafeAreaView>
  );
};

export default Attendance;
