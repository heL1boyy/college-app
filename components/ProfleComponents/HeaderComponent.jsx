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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from '../../constants/Colors';

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
    <View>
      <View className="flex-row items-center justify-between p-5">
        <Text className="text-xl tracking-widest font-psemibold text-primary">My Profile</Text>
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons name="logout" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center px-5 py-2">
        <View className="w-20 h-20 mr-4 rounded-full">
          {/* Show either the current avatar or the newly selected avatar */}
          <Image
            source={{ uri: newAvatar || users?.avatar }}
            className="w-20 h-20 rounded-full"
          />
        </View>
        <View className="flex-1">
          {/* Toggle between displaying username or input field */}
          {editMode ? (
            <TextInput
              value={newUsername}
              onChangeText={setNewUsername}
              className="p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <>
              <Text className="text-lg font-semibold tracking-wide">{users?.username}</Text>
              <Text className="mt-1 text-sm tracking-wide text-gray-600">{users?.accountId}</Text>
            </>
          )}
        </View>

        <View className="flex-col ml-4 space-y-2">
          {editMode ? (
            <>
              <TouchableOpacity onPress={handleCancel}>
                <View className="px-4 py-2 rounded-lg bg-slate-600">
                  <Text className="text-center text-white">Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} >
                <View className="px-4 py-2 rounded-lg bg-primary">
                  <Text className="text-center text-white">
                    {isSaving ? "Saving..." : "Save"}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setEditMode(true)}
            >
              <View className="px-4 py-2 rounded-lg bg-primary">
                <Text className="text-white">Edit</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {editMode && (
        <View className="my-2 ml-5">
          <TouchableOpacity onPress={pickImage}>
            <Text className="text-primary">Change Avatar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HeaderComponent;
