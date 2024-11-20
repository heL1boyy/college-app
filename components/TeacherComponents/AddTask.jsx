import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";
import {
  fetchSubjectsForTeacher,
  uploadFileToStorage,
} from "../../lib/FirebaseConfig"; // Import Firebase upload function
import { Timestamp, setDoc, doc, collection, addDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../lib/FirebaseConfig"; // Assuming db is already initialized in FirebaseConfig
import { useGlobalContext } from "../../context/GlobalProvider";

const AddTask = () => {
  const { user } = useGlobalContext();

  const [editMode, setEditMode] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select Due Date");
  const [selectedTime, setSelectedTime] = useState("Select Due Time");
  const [taskDetails, setTaskDetails] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [subjectId, setSubjectId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [teacherIds, setTeacherIds] = useState([]);
  // Fetch the current teacher's subject IDs
  useEffect(() => {
    const loadSubjectsForTeacher = async () => {
      try {
        setLoading(true);
        const teacherId = user?.uid;
        console.log(teacherId);

        if (!teacherId) {
          console.error("Teacher ID is not available");
          return;
        }

        // Fetch subjects for the current teacher
        const fetchedSubjects = await fetchSubjectsForTeacher(teacherId);

        if (fetchedSubjects && fetchedSubjects.length > 0) {
          // Use the first subject ID by default (or modify logic as needed)
          setSubjectId(fetchedSubjects[0].id);
        } else {
          console.warn("No subjects found for the current teacher");
          setSubjectId(null); // No subjects available
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSubjectsForTeacher();
  }, [user]);
  const handleCancel = () => {
    setEditMode(false);
    setSelectedDate("Select Due Date");
    setSelectedTime("Select Due Time");
    setTaskDetails("");
    setSelectedFile(null);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = new Date(date)
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("/");
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    const formattedTime = new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSelectedTime(formattedTime);
    hideTimePicker();
  };

  // Function to pick document (PDF)
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log("Document Picker Result:", result); // Log the result for debugging

      if (result.canceled) {
        console.log("Document selection was canceled");
        return; // Early return if the user canceled the selection
      }

      // Check if the result has the 'assets' field and that it contains at least one file
      if (result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0]; // Get the first file from the assets array
        console.log("Selected File:", selectedFile); // Log the selected file
        setSelectedFile(selectedFile); // Set the selected file for later use
      } else {
        console.log("No file selected or the file is missing");
      }
    } catch (error) {
      console.error("Error picking document:", error); // Log any error that happens during the document picking
    }
  };

  const handleSave = async () => {
    // Check if all fields are filled
    if (
      !taskDetails ||
      selectedDate === "Select Due Date" ||
      selectedTime === "Select Due Time"
    ) {
      alert("Please fill in all fields");
      return;
    }

    let fileUrl = null;

    if (selectedFile) {
      try {
        setUploading(true);
        const userId = "user-id-placeholder"; // Replace with actual user ID
        fileUrl = await uploadFileToStorage(
          selectedFile.uri,
          selectedFile.name,
          setUploadProgress
        );
        console.log("File uploaded successfully, URL:", fileUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("File upload failed");
        return; // Exit if file upload fails
      }
    }

    // Prepare task data with fileUrl
    const taskData = {
      taskDetails,
      dueDate: selectedDate,
      dueTime: selectedTime,
      fileUrl: fileUrl || "", // Use file URL if available
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      // Save task data to Firestore with file URL
      await addTask(taskData);
      console.log("Task saved successfully:", taskData);

      // Reset form after saving
      handleCancel();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Task save failed");
    } finally {
      setUploading(false);
    }
  };

  // Save task data to Firestore
  const addTask = async (taskData) => {
    try {
      const teacherId = user?.uid;
      const tasksRef = collection(
        db,
        "teachers",
        teacherId, // Replace with actual teacher ID
        "subjects",
        subjectId, // Replace with actual subject ID
        "tasks" // The tasks subcollection
      );

      // Add a new task document with auto-generated ID
      const taskDoc = await addDoc(tasksRef, taskData);
      console.log("Task added with ID:", taskDoc.id); // Log the ID of the newly created task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <View className="flex-col mx-6 mb-6 space-y-4">
      {editMode ? (
        <>
          <View className="p-6 mb-2 rounded-lg bg-slate-200">
            <Text className="tracking-wider">Enter Task Details:</Text>
            <TextInput
              value={taskDetails}
              onChangeText={setTaskDetails}
              placeholder="Enter Task Details"
              className="w-full px-4 py-2 my-4 border border-gray-500 rounded-lg"
            />
            <TouchableOpacity
              onPress={showDatePicker}
              className="py-3 mt-2 mb-4 border border-gray-500 rounded-lg"
            >
              <Text className="pl-4 tracking-wider text-gray-600">
                {selectedDate}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showTimePicker}
              className="py-3 mt-2 mb-4 border border-gray-500 rounded-lg"
            >
              <Text className="pl-4 tracking-wider text-gray-600">
                {selectedTime}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
            <TouchableOpacity
              onPress={pickDocument}
              className="py-3 mt-2 border rounded-lg border-primary"
            >
              <Text className="tracking-wider text-center text-primary">
                {selectedFile ? "File Selected" : "Upload File"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleCancel}>
            <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-slate-600 font-rmedium">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
              {uploading
                ? `Uploading... ${uploadProgress.toFixed(2)}%`
                : "Add Task"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => setEditMode(true)}>
          <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
            Add Task
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddTask;
