
import { View, Text, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import * as ImagePicker from "expo-image-picker";
import { updateUserFieldByAccountId } from '../../lib/appwrite';

const Info = () => {

    const { user } = useGlobalContext()

    const [editMode, setEditMode] = useState(false);
    const [newUsername, setNewUsername] = useState(user?.username || "");
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
            await updateUserFieldByAccountId(user.accountId, {
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

        <View>

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
                            <TextInput
                                value={newUsername}
                                onChangeText={setNewUsername}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        ) : (
                            <>
                                <Text className="text-lg font-semibold tracking-wide">{user?.username}</Text>
                                <Text className="mt-1 text-sm tracking-wide text-gray-600">{user?.accountId}</Text>
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
                            <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-slate-600 font-rmedium">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSave} >
                            <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                                {isSaving ? "Saving..." : "Save"}
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        onPress={() => setEditMode(true)}
                    >
                        <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">Edit</Text>
                    </TouchableOpacity>
                )}
            </View>






        </View>
    )

}

export default Info