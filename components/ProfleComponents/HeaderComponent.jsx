import React, { useState, useEffect } from "react";
import { Button, Image, View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import {
  signOut,
  uploadImage,
  updateUserAvatar,
  getCurrentUser,
} from "../../lib/appwrite";
import * as ImagePicker from "expo-image-picker";
import { useGlobalContext } from "@/context/GlobalProvider";

const HeaderComponent = ({ icons, users }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    // Initialize with the current user's avatar if available
    if (user?.avatar) {
      setSelectedImage(user.avatar);
    }
  }, [user]);

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Let the user pick an image
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  const updateProfileImage = async () => {
    if (!selectedImage) return;

    setLoading(true);

    try {
      // Upload the image and get the URL
      const { imageUrl } = await uploadImage(selectedImage);

      // Update the user's profile with the new image URL
      const updatedUser = await updateUserAvatar(user.$id, imageUrl);

      // Update the user in global state
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Failed to update profile image. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("sign-in");
  };
  return (
    <View className="p-4">
      {/* <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-semibold">My Profile</Text>
        <TouchableOpacity onPress={logout}>
          <Image
            source={icons.logout} // replace with your icon URI
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View> */}

      {/* <View className="flex-row items-center ">
        <View className="rounded-full   w-20 h-20 mr-4">
          <Image
            source={{ uri: user?.avatar }}
            className="rounded-full w-20 h-20"
          />
        </View>
        <View>
          <Text className="text-lg font-semibold">{user?.username}</Text>
          <Text className="text-gray-600">{user?.accountId}</Text>
        </View>
        <TouchableOpacity className="ml-2" onPress={pickImage}>
          <View className="bg-blue-500 rounded-full p-2">
            <Text className="text-white">Edit</Text>
          </View>
        </TouchableOpacity>
      </View> */}

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {user?.username || "User"}
        </Text>

        <View style={{ marginVertical: 20 }}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
          ) : (
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                backgroundColor: "gray",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>No Image</Text>
            </View>
          )}
        </View>

        <Button title="Pick an Image" onPress={pickImage} />
        <Button title="Update Profile Image" onPress={updateProfileImage} />

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </View>
  );
};

export default HeaderComponent;
