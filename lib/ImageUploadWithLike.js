import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "./appwrite";
import { config } from "./appwrite"; // Import config
import { ID } from "react-native-appwrite";

// Image Upload and Like Button Component
const ImageUploadWithLike = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLiked, setIsLiked] = useState(false); // State to track if the image is liked

  // Request permissions for Image Picker
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera roll is required!");
    }
  };

  // Image Upload Function
  const uploadImage = async (fileUri) => {
    try {
      console.log("Uploading image with URI:", fileUri);

      // Fetch the image file
      const response = await fetch(fileUri);
      const blob = await response.blob();

      // Create a file object with a name and type
      const file = new File([blob], "profile-image.jpg", {
        type: "image/jpeg",
      });

      console.log("Uploading file:", file);

      // Use the bucket ID from the config to upload the file
      const fileId = ID.unique();
      const uploadedFile = await storage.createFile(
        config.bucketId,
        fileId,
        file
      );

      // Get the view URL of the uploaded file
      const imageUrl = storage.getFileView(
        config.bucketId,
        uploadedFile.$id
      ).href;
      console.log("File uploaded successfully:", imageUrl);

      return { imageUrl, fileId: uploadedFile.$id };
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image.");
    }
  };

  // Pick image using Expo Image Picker
  const pickImage = async () => {
    await requestPermissions();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log("Picked Image Result:", result); // Log the result for verification

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Pass the URI of the first asset to uploadImage function
      uploadImage(result.assets[0].uri);
    } else {
      console.log("No image selected or image picker was canceled.");
    }
  };

  // Toggle like status
  const toggleLike = () => {
    setIsLiked((prevState) => !prevState); // Toggle like status
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <TouchableOpacity
        onPress={pickImage}
        className="mb-5 bg-blue-500 py-2 px-4 rounded-lg"
      >
        <Text className="text-white text-lg">Pick Image</Text>
      </TouchableOpacity>

      {imageUri && (
        <View className="mt-5 items-center">
          <Image source={{ uri: imageUri }} className="w-48 h-48 rounded-lg" />
          {imageUrl && (
            <Text className="mt-2 text-blue-500 underline">
              <TouchableOpacity onPress={() => Linking.openURL(imageUrl)}>
                <Text>View Image</Text>
              </TouchableOpacity>
            </Text>
          )}

          {/* Like Button */}
          <TouchableOpacity
            onPress={toggleLike}
            className={`${
              isLiked ? "bg-red-500" : "bg-gray-500"
            } mt-5 py-2 px-4 rounded-lg`}
          >
            <Text className="text-white text-lg">
              {isLiked ? "Unlike" : "Like"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUploadWithLike;
