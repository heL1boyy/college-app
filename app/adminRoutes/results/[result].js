import { View, Text, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker"; // Add the DocumentPicker for selecting files
import { uploadFileToResults } from "../../../lib/FirebaseConfig"; // Import the updated upload function

const ResultBySubject = () => {
  const { result } = useLocalSearchParams();
  const navigation = useNavigation();

  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Result",
      headerShown: true,
    });
  }, []);

  // Function to pick a file
  const handleFilePick = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Accept all file types
        copyToCacheDirectory: true, // Ensure the file is cached locally
      });

      console.log("File picker response:", file); // Debugging output

      if (!file.canceled && file.assets && file.assets.length > 0) {
        const selectedFile = file.assets[0]; // Get the first file from the assets array
        setFileUri(selectedFile.uri); // Set file URI
        setFileName(selectedFile.name); // Set file name
        Alert.alert("File selected", `File: ${selectedFile.name}`);
      } else if (file.canceled) {
        Alert.alert("No file selected", "File selection was canceled.");
        setFileUri(null);
        setFileName(null);
      } else {
        Alert.alert(
          "File selection error",
          "Unable to select a file. Please try again."
        );
        setFileUri(null);
        setFileName(null);
      }
    } catch (error) {
      console.error("Error picking file:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while selecting a file."
      );
    }
  };

  // Function to handle file upload
  const handleUpload = async () => {
    console.log("Attempting to upload:", fileUri, fileName); // Debugging output
    if (!fileUri || !fileName) {
      Alert.alert("No file", "Please select a file to upload.");
      return;
    }

    try {
      const downloadURL = await uploadFileToResults(fileUri, fileName);
      Alert.alert("Upload successful", "Your result has been uploaded.");
      console.log("File uploaded successfully:", downloadURL);
    } catch (error) {
      Alert.alert("Upload failed", "Something went wrong while uploading.");
      console.error("Upload error:", error);
    }
  };

  return (
    <SafeAreaView className="h-full bg-main_background">
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View className="px-5">
          <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
            {result} Result
          </Text>
          <CustomButton
            title="Select File"
            containerStyles="bg-secondary rounded-lg py-4 mt-6"
            textStyles="text-white text-sm font-pmedium tracking-widest"
            onPress={handleFilePick} // Open the file picker
          />
          <CustomButton
            title="Upload Result"
            containerStyles="bg-primary rounded-lg py-4 mt-6"
            textStyles="text-white text-sm font-pmedium tracking-widest"
            onPress={handleUpload} // Trigger the upload
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultBySubject;
