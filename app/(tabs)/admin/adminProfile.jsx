import { View, Text, ScrollView, Image, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { Colors } from "../../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../../components/CustomButton";

const AdminProfile = () => {
  const { user, logout } = useGlobalContext();

  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [newAvatar, setNewAvatar] = useState(user?.avatar || null);
  const [isSaving, setIsSaving] = useState(false);
  const originalUsername = user?.username;
  const originalAvatar = user?.avatar;

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setNewAvatar(result.assets[0].uri);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!newUsername || !newAvatar) {
      Alert.alert("Error", "Both username and avatar are required.");
      return;
    }
    setIsSaving(true);
    try {
      let avatarUrl = originalAvatar;
      if (newAvatar !== originalAvatar) {
        const { imageUrl } = await uploadImage(newAvatar);
        avatarUrl = imageUrl;
      }
      await updateUserFieldByAccountId(users.accountId, {
        username: newUsername,
        avatar: avatarUrl,
      });
      Alert.alert("Success", "Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setNewUsername(originalUsername);
    setNewAvatar(originalAvatar);
    setEditMode(false);
  };

  return (
    <SafeAreaView className="h-full bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <View className="flex-row items-center justify-between py-2 mx-5">
          <View className="flex-row items-center">
            <View className="w-[24%]">
              <Image
                source={{ uri: newAvatar || user?.avatar }}
                className="w-20 h-20 rounded-full"
              />
            </View>
            <View className="ml-6 w-[68%]">
              {editMode ? (
                <>
                  <TextInput
                    value={newUsername}
                    onChangeText={setNewUsername}
                    placeholder="Enter Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <TextInput
                    value={newEmail}
                    onChangeText={setNewEmail}
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                  />
                </>
              ) : (
                <>
                  <Text className="text-lg font-semibold tracking-wide">
                    {user?.name}
                  </Text>
                  <Text className="mt-1 text-sm tracking-wide text-gray-600">
                    {user?.email}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        {editMode && (
          <View className="my-2 ml-6">
            <TouchableOpacity onPress={pickImage}>
              <Text className="underline text-primary">Change Avatar</Text>
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

        {/* <View className="p-5 mx-6 my-8 bg-slate-200 rounded-xl">
          <View className="flex-row items-start">
            <View className="flex w-[18%]">
              <Text className="mb-3 tracking-wider font-rregular">Name:</Text>
              <Text className={`font-rregular tracking-wider ${isEditing ? "mt-2" : ""}`}>Email:</Text>
            </View>
            <View className="flex ml-2 w-[78%]">
              {isEditing ? (
                <>
                  <TextInput
                    className="px-2 mt-[-2px] mb-3 border border-gray-300 rounded"
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter name"
                  />
                  <TextInput
                    className="px-2 mb-3 border border-gray-300 rounded"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                  />
                  <CustomButton
                    title="Save"
                    onPress={handleSave}
                    containerStyles={"py-2 border rounded-lg border-[#f5f5f5] bg-blue-500"}
                    textStyles={"text-base text-center text-white"}
                  />
                </>
              ) : (
                <>
                  <Text className="mb-4 tracking-wider ">
                    {user.username}
                  </Text>
                  <Text className="tracking-wider">
                    {user.email}
                  </Text>
                </>
              )}
            </View>
          </View>
          <View className="mt-4">
            <TouchableOpacity
              onPress={handleEdit}
              className="py-2 border rounded-lg border-primary"
            >
              <Text className="text-base text-center text-primary">
                {isEditing ? "Cancel" : "Edit Details"}
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminProfile;
