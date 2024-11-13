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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const HeaderComponent = ({ users }) => {
  const { logout, updateUser, updateAvatar } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(users?.username || "");
  const [newAvatar, setNewAvatar] = useState(users?.profileImageUrl || null);
  const [isSaving, setIsSaving] = useState(false);

  // Store the original values to revert when canceling
  const originalUsername = users?.username;
  const originalAvatar = users?.profileImageUrl;

  // Function to pick an image from the gallery
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio for avatar
        quality: 1,
      });

      if (!result.canceled) {
        setNewAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error.message);
      Alert.alert("Error", "Failed to pick image. Please try again.");
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
      // Upload new avatar if changed
      let avatarUrl = originalAvatar;
      if (newAvatar !== originalAvatar) {
        await updateAvatar(newAvatar); // This updates the avatar using context method
        avatarUrl = newAvatar; // Update local state for immediate UI change
      }

      // Update the username if changed
      if (newUsername !== originalUsername) {
        await updateUser({ username: newUsername }); // Update username using context method
      }

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
          {/* Show either the current avatar or the newly selected avatar */}
          <Image
            source={{
              uri: newAvatar
                ? users?.profileImageUrl
                : "https://via.placeholder.com/150",
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
