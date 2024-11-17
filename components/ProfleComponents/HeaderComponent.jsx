import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useGlobalContext } from "../../context/GlobalProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

import { uploadImage } from "../../lib/FirebaseConfig";

const HeaderComponent = ({ users }) => {
  const { logout, updateUser, updateAvatar } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(users?.username || "");
  const [newAvatar, setNewAvatar] = useState(users?.profileImageUrl || null);
  const [isSaving, setIsSaving] = useState(false);

  const originalUsername = users?.username;
  const originalAvatar = users?.profileImageUrl;

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio for avatar
        quality: 1,
      });
      console.log(users?.profileImageUrl);
      if (!result.canceled) {
        setNewAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error.message);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const handleSave = async () => {
    if (!newUsername || !newAvatar) {
      Alert.alert("Error", "Both username and avatar are required.");
      return;
    }

    setIsSaving(true);
    try {
      let avatarUrl = originalAvatar;

      // Check if the avatar has changed
      if (newAvatar !== originalAvatar) {
        // Upload the new avatar image to Firebase Storage and get the URL
        avatarUrl = await uploadImage(newAvatar);
      }

      // Update user data in Firestore with the new username and profile image URL
      await updateUser({ username: newUsername, profileImageUrl: avatarUrl });

      setEditMode(false); // Exit edit mode
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false); // End saving process
    }
  };

  const handleCancel = () => {
    setNewUsername(originalUsername);
    setNewAvatar(originalAvatar);
    setEditMode(false);
  };

  return (
    <View>
      <View className="flex-row items-center justify-between p-6">
        <Text className="text-xl tracking-widest font-psemibold text-primary">
          My Profile
        </Text>
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons
            name="logout"
            size={26}
            color={Colors.third}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center px-6 py-2">
        <View className="w-[24%]">
          <Image
            source={{
              uri: newAvatar ? newAvatar : "https://via.placeholder.com/150",
            }}
            className="w-20 h-20 rounded-full"
          />
        </View>
        <View className="ml-6 w-[68%]">
          {editMode ? (
            <TextInput
              value={newUsername}
              onChangeText={setNewUsername}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <>
              <Text className="text-lg font-semibold tracking-wide">
                {users?.username}
              </Text>
              <Text className="mt-1 text-sm tracking-wide text-gray-600">
                {users?.uid || "User ID not available"}
              </Text>
            </>
          )}
        </View>
      </View>

      {editMode && (
        <View className="my-2 ml-6">
          <TouchableOpacity onPress={pickImage}>
            <Text className="text-primary">Change Avatar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-col mx-6 mt-4 space-y-4">
        {editMode ? (
          <>
            <TouchableOpacity onPress={handleCancel}>
              <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-slate-600 font-rmedium">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                {isSaving ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => setEditMode(true)}>
            <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
              Edit
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HeaderComponent;
