import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../../../../components/CustomButton";
import { Colors } from "../../../../constants/Colors";
import {
  fetchAllTasksWithName,
  fetchAllTasksWithNames,
  saveAssignmentDetails,
  uploadFileToStorages,
} from "../../../../lib/FirebaseConfig";
import * as DocumentPicker from "expo-document-picker";

const Task = () => {
  const [tasks, setTasks] = useState([]); // Combined tasks
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState({}); // Object to store selected files per task
  const [uploadingTaskId, setUploadingTaskId] = useState(null); // Track the task being uploaded

  // Fetch tasks from both functions and merge the results
  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);

        const [tasksWithNames, tasksWithIds] = await Promise.all([
          fetchAllTasksWithName(),
          fetchAllTasksWithNames(),
        ]);

        // Combine tasks by matching task IDs
        const mergedTasks = tasksWithIds.map((taskWithId) => {
          const taskWithName = tasksWithNames.find(
            (t) => t.taskId === taskWithId.taskId
          );
          return {
            ...taskWithId,
            ...taskWithName, // Merge data (subjectName, teacherName, etc.)
          };
        });

        setTasks(mergedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        Alert.alert("Error", "Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  const handleFileSelect = async (taskId) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      if (result.canceled) {
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        if (file.uri && file.name) {
          setSelectedFiles((prevFiles) => ({
            ...prevFiles,
            [taskId]: file,
          }));
        } else {
          throw new Error("Selected file is missing required details.");
        }
      }
    } catch (error) {
      console.error("Error during file selection:", error);
      Alert.alert(
        "File Selection Error",
        "An issue occurred while selecting the file. Please try again."
      );
    }
  };

  const handleUpload = async (taskId) => {
    const selectedFile = selectedFiles[taskId];

    if (!taskId || !selectedFile) {
      Alert.alert("Error", "Invalid task ID or no file selected.");
      return;
    }

    setUploadingTaskId(taskId);

    try {
      const downloadURL = await uploadFileToStorages(
        selectedFile.uri,
        selectedFile.name
      );

      const taskDetails = {
        fileUrl: downloadURL,
        isUploaded: true, // Mark as uploaded
      };

      await saveAssignmentDetails(taskId, taskDetails);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.taskId === taskId ? { ...task, isUploaded: true } : task
        )
      );

      Alert.alert("Upload Success", "The file has been uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      Alert.alert(
        "Upload Failed",
        "Failed to upload the file. Please try again."
      );
    } finally {
      setUploadingTaskId(null);
    }
  };

  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Assignments
          </Text>
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center mt-10">
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text className="mt-2 text-primary font-pmedium">
              Loading tasks...
            </Text>
          </View>
        ) : (
          <View className="px-6 mt-1 mb-2">
            {tasks.map((task, idx) => {
              const selectedFile = selectedFiles[task.taskId];
              const isUploading = uploadingTaskId === task.taskId;

              return (
                <View
                  key={idx}
                  className="w-full p-5 mb-8 rounded-lg bg-slate-200"
                >
                  <View>
                    <Text className="text-sm tracking-widest text-primary font-pmedium">
                      Subject: {task.subjectName || "N/A"}
                    </Text>
                    <Text className="text-sm tracking-widest text-primary font-pmedium">
                      From: {task.teacherName || "N/A"}
                    </Text>
                    <Text className="mt-3 text-sm font-pregular">
                      Task: {task.taskDetails || "No details provided"}
                    </Text>
                    <View className="flex-row items-center justify-start gap-1 mt-3">
                      <Ionicons
                        name="time-outline"
                        size={18}
                        color={Colors.third}
                      />
                      <Text className="mt-2 text-xs font-pregular text-red">
                        Due Date: {task.dueDate || "N/A"}
                      </Text>
                    </View>

                    {!task.isUploaded && (
                      <CustomButton
                        title={selectedFile ? "File Selected" : "Select File"}
                        onPress={() => handleFileSelect(task.taskId)}
                        containerStyles="bg-slate-200 rounded-lg px-4 mt-4"
                        textStyles="text-primary text-sm font-pmedium tracking-widest"
                        disabled={task.isUploaded} // Disable button if already uploaded
                      />
                    )}

                    <CustomButton
                      title={
                        task.isUploaded
                          ? "Already Submitted"
                          : isUploading
                          ? "Uploading..."
                          : "SUBMIT"
                      }
                      onPress={
                        task.isUploaded || isUploading
                          ? null // Disable the function when uploaded or uploading
                          : () => handleUpload(task.taskId)
                      }
                      containerStyles={`${
                        task.isUploaded || isUploading
                          ? "bg-gray-400"
                          : "bg-primary"
                      } rounded-lg px-4 mt-4`}
                      textStyles="text-white text-sm font-pmedium tracking-widest"
                      disabled={task.isUploaded || isUploading} // Disable button if uploaded or currently uploading
                    />
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
      <StatusBar backgroundColor="#000" />
    </SafeAreaView>
  );
};

export default Task;
