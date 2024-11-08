
import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from "expo-image-picker";

const AddNotice = () => {

    const [editMode, setEditMode] = useState(false)

    const handleCancel = () => {
        setEditMode(false);
    };

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

    return (
        <View className="flex-col mx-6 mb-6 space-y-4">
            {editMode ? (
                <>
                    <View className="p-6 mb-2 rounded-lg bg-slate-200">
                        <Text className="tracking-wider">Enter Title:</Text>
                        <TextInput
                            // placeholder='Enter Title'
                            className="w-full px-4 py-2 my-4 border border-gray-500 rounded-lg"
                        />
                        <TouchableOpacity
                            onPress={pickImage}
                            className="py-3 mt-2 border rounded-lg border-primary"
                        >
                            <Text className="text-center text-primary">Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleCancel}>
                        <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-slate-600 font-rmedium">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    // onPress={handleSave}
                    >
                        <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                            {/* {isSaving ? "Saving..." : "Save"} */}
                            Add Notice
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity
                    onPress={() => setEditMode(true)}
                >
                    <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">Add Notice</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default AddNotice