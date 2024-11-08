
import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../CustomButton';
import { TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';

const Details = () => {

    const { user } = useGlobalContext()

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user.username || "");

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <View className="p-5 mx-6 my-8 bg-slate-200 rounded-xl">
            <View className="flex-row items-start">
                <View className="flex w-[34%]">
                    <Text className="mb-4 tracking-wider font-rmedium">Name:</Text>
                    <Text className={`mb-4 font-rmedium tracking-wider ${isEditing ? "mt-2" : ""}`}>Degree:</Text>
                    <Text className={`mb-4 font-rmedium tracking-wider ${isEditing ? "mt-2" : ""}`}>Availability:</Text>
                    <Text className={`font-rmedium tracking-wider ${isEditing ? "mt-2" : ""}`}>Experience:</Text>
                </View>
                <View className="flex w-[66%]">
                    {isEditing ? (
                        <>
                            <TextInput
                                className="px-2 mb-4 border border-gray-300 rounded"
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Enter name"
                            />
                            <TextInput
                                className="px-2 mb-4 border border-gray-300 rounded"
                                // value={email}
                                // onChangeText={setEmail}
                                placeholder="Enter Degree Name"
                            />
                            <TextInput
                                className="px-2 mb-4 border border-gray-300 rounded"
                                // value={email}
                                // onChangeText={setEmail}
                                placeholder="Enter Availability"
                            />
                            <TextInput
                                className="px-2 mb-4 border border-gray-300 rounded"
                                // value={email}
                                // onChangeText={setEmail}
                                placeholder="Enter Teaching Experience"
                            />
                            <CustomButton
                                title="Save Details"
                                // onPress={handleSave}
                                containerStyles={"py-2 border rounded-lg border-[#f5f5f5] bg-blue-500"}
                                textStyles={"text-base text-center text-white"}
                            />
                        </>
                    ) : (
                        <>
                            <Text className="mb-5 first-letter:tracking-wider ">
                                {user.username}
                            </Text>
                            <Text className="mb-5 tracking-wider ">
                                BCA
                            </Text>
                            <Text className="mb-4 tracking-wider">
                                availabiltiy
                            </Text>
                            <Text className="tracking-wider">
                                4 Years
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
        </View>
    )

}

export default Details