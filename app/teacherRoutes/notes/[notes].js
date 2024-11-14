import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/CustomButton";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";
import {
  uploadPDFToFirebase,
  fetchNotesFromFirebase,
} from "../../../lib/FirebaseConfig";

const ParticularNote = () => {
  const { notes } = useLocalSearchParams();
  const navigation = useNavigation();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [noteList, setNoteList] = useState([]);
  const [fileTitle, setFileTitle] = useState(""); // Store the title of the uploaded note

  // Request for media library permissions
  const checkPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  };

  // Upload Document to Firebase Storage
  const handleDocumentUpload = async () => {
    const permissionsGranted = await checkPermissions();

    if (!permissionsGranted) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to pick a file."
      );
      return;
    }

    if (!fileTitle.trim()) {
      Alert.alert("Title Required", "Please enter a title for the note.");
      return; // Exit if title is not provided
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled) {
        return; // Exit if the user canceled the file selection
      }

      const { uri, name } = result.assets[0]; // Accessing URI from the result

      if (!uri) {
        console.error("URI is undefined, file not selected properly.");
        return; // Exit if the URI is not set correctly
      }

      // Get the current timestamp to use in the file name
      const createdAt = new Date().toISOString();
      const fileName = `${name}`;

      console.log("Uploading file from URI:", uri);

      // Pass the title from the TextInput when uploading
      const downloadURL = await uploadPDFToFirebase(
        uri,
        fileName, // Use fileName with timestamp and title
        fileTitle, // Title for the document metadata
        setUploading,
        setUploadProgress
      );

      Alert.alert("Upload Complete", `File URL: ${downloadURL}`);
    } catch (error) {
      console.error("Error during PDF upload:", error);
      Alert.alert("Error", "Document upload failed.");
    }
  };

  // Fetch Notes (PDF URLs) from Firebase Storage
  const fetchNotes = async () => {
    setLoadingNotes(true);
    try {
      const fetchedNotes = await fetchNotesFromFirebase(notes);
      setNoteList(fetchedNotes);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch notes.");
    } finally {
      setLoadingNotes(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: notes,
      headerShown: false,
    });
    fetchNotes(); // Fetch notes on component mount
  }, [navigation, notes]);

  return (
    <SafeAreaView className="h-full bg-main_background">
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View className="p-6">
          <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
            {notes}
          </Text>

          {/* Title Input for the uploaded note */}
          <TextInput
            value={fileTitle}
            onChangeText={setFileTitle}
            placeholder="Enter the title of the note"
            className="border-b border-gray-300 mt-4 py-2"
          />

          <CustomButton
            title="Upload Notes"
            containerStyles="bg-primary rounded-lg py-4 mt-6"
            textStyles="text-white text-sm font-pmedium tracking-widest"
            onPress={handleDocumentUpload}
          />

          {/* Activity Indicator */}
          {uploading && (
            <View className="flex flex-row items-center mt-4">
              <ActivityIndicator size="large" color="#0000ff" />
              <Text className="ml-4">
                {uploadProgress.toFixed(2)}% uploaded
              </Text>
            </View>
          )}
        </View>

        <View className="px-6 mt-2">
          {loadingNotes ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : noteList.length === 0 ? (
            <Text>No notes available</Text>
          ) : (
            noteList.map((note, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => Alert.alert("Download", `URL: ${note.url}`)}
                className="px-5 py-4 mb-8 rounded-lg bg-slate-200"
              >
                <Text className="my-2 text-sm tracking-wider font-pmedium">
                  {note.title} {/* Display title here */}
                </Text>
                <Text className="text-xs text-blue-600">View PDF</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <StatusBar backgroundColor="black" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParticularNote;
