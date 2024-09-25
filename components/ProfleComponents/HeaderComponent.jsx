import { useState } from "react";
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
import { uploadImage, updateUserFieldByAccountId } from "../../lib/appwrite";

const HeaderComponent = ({ icons, users }) => {
  const { logout } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(users?.username || "");
  const [newAvatar, setNewAvatar] = useState(users?.avatar || null);
  const [isSaving, setIsSaving] = useState(false);

  // Store the original values to revert when canceling
  const originalUsername = users?.username;
  const originalAvatar = users?.avatar;

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio for avatar
      quality: 1,
    });

    if (!result.canceled) {
      setNewAvatar(result.assets[0].uri);
    }
  };

  // Function to save the updated username and avatar
  const handleSave = async () => {
    if (!newUsername || !newAvatar) {
      Alert.alert("Error", "Both username and avatar are required.");
      return;
    }

    setIsSaving(true); // Start saving process
    try {
      let avatarUrl = originalAvatar;

      // If a new avatar is selected, upload it to Appwrite storage
      if (newAvatar !== originalAvatar) {
        const { imageUrl } = await uploadImage(newAvatar); // Upload image to Appwrite
        avatarUrl = imageUrl; // Get the new avatar URL
      }

      // Update the user document in Appwrite database
      await updateUserFieldByAccountId(users.accountId, {
        username: newUsername,
        avatar: avatarUrl,
      });

      Alert.alert("Success", "Profile updated successfully!");
      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating profile:", error.message);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false); // End saving process
    }
  };

  // Function to cancel edits and revert to original data
  const handleCancel = () => {
    setNewUsername(originalUsername); // Revert username
    setNewAvatar(originalAvatar); // Revert avatar
    setEditMode(false); // Exit edit mode
  };

  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-semibold">My Profile</Text>
        <TouchableOpacity onPress={logout}>
          <Image
            source={icons.logout} // replace with your icon URI
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center">
        <View className="rounded-full w-20 h-20 mr-4">
          {/* Show either the current avatar or the newly selected avatar */}
          <Image
            source={{ uri: newAvatar || users?.avatar }}
            className="rounded-full w-20 h-20"
          />
        </View>
        <View className="flex-1">
          {/* Toggle between displaying username or input field */}
          {editMode ? (
            <TextInput
              value={newUsername}
              onChangeText={setNewUsername}
              className="border border-gray-300 rounded-lg p-2"
            />
          ) : (
            <>
              <Text className="text-lg font-semibold">{users?.username}</Text>
              <Text className="text-gray-600">{users?.accountId}</Text>
            </>
          )}
        </View>

        <View className="flex-row items-center space-x-2">
          {editMode ? (
            <>
              <TouchableOpacity onPress={handleSave} className="ml-2">
                <View className="bg-blue-500 rounded-full p-2">
                  <Text className="text-white">
                    {isSaving ? "Saving..." : "Save"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel} className="ml-2">
                <View className="bg-gray-500 rounded-full p-2">
                  <Text className="text-white">Cancel</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setEditMode(true)}
              className="ml-2"
            >
              <View className="bg-blue-500 rounded-full p-2">
                <Text className="text-white">Edit</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {editMode && (
        <View className="mt-4">
          <TouchableOpacity onPress={pickImage}>
            <Text className="text-blue-500">Change Avatar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HeaderComponent;
