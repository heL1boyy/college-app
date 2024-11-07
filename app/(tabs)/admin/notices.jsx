
import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from "expo-image-picker";

const Notices = () => {

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

    const notices = [
        {
            noticeDate: "08/06/2024",
            title: "We are here for you on holidays and Saturdays! Visit us from 9:00 AM to 5:00 PM for all your inquires.",
            imageUrl: "https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/459428461_1063716562423622_7367957136799521615_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=--z9dUjwFQ8Q7kNvgHj93hW&_nc_ht=scontent.fktm17-1.fna&_nc_gid=A-KlO0BRdsQufdWklFPUfMI&oh=00_AYCTzrtyowLMIDLDA39aOT6BXir-tcl0Hr7jSx8siIrm1w&oe=670D9388"
        },
        {
            noticeDate: "08/10/2024",
            title: "Hurry up! Limited Seats Available. Only 4 days left to register for the ComputeMATHA event.",
            imageUrl: "https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/460573247_1068298795298732_5859547822140377816_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=48sF4xzmBiMQ7kNvgGJ2aAP&_nc_ht=scontent.fktm17-1.fna&_nc_gid=ABu-vUamohqGsfj8JJ39ffI&oh=00_AYBH_-chCbH8e4szpZDRNs9ulxug8URCKqX6R3a7Cplpug&oe=670D88DE"
        },
        {
            noticeDate: "08/20/2024",
            title: "Special Request! Currently it is raining in different areas of the country and is expected to continue until Sunday. When you travel anyway, just understand and take care of yourself. Also, we urge everyone to be vigilant of the potential risk inclement weather can create.",
            imageUrl: ""
        },
        {
            noticeDate: "08/24/2024",
            title: "Join us for ComputeMATHA, an exclusive event for prospective BCA Program Students!",
            imageUrl: "https://scontent.fktm17-1.fna.fbcdn.net/v/t45.1600-4/460176092_120214948199040667_985284292601445371_n.jpg?stp=cp0_dst-jpg_p526x296_q75_spS444&_nc_cat=104&ccb=1-7&_nc_sid=c02adf&_nc_ohc=RNzCiZiMSFcQ7kNvgH2ZAd_&_nc_ht=scontent.fktm17-1.fna&_nc_gid=AFeVcanIYYk2eeG_auM295k&oh=00_AYCjB5lD2kReZAcscTCdgpp4ZKtHlfv5l7-VKsBnRKLNHQ&oe=670D88EC"
        },
        {
            noticeDate: "08/26/2024",
            title: "Exciting news coming from Sagarmatha College of Science and Technology! Stay tuned and visit our Facebook page tonigh at 7:00 PM for a special announcement.",
            imageUrl: ""
        },
    ]

    const NoticeItem = ({ item }) => (
        <View className="p-4 mb-6 rounded-lg bg-slate-200">
            <Text className="text-sm tracking-wide font-pmedium text-primary">
                {item.noticeDate}
            </Text>
            <Text className="mt-2 text-sm tracking-widest text-justify font-pregular">
                {item.title}
            </Text>
            {!item.imageUrl ? (
                () => { }
            ) : (
                <Image
                    source={{ uri: item.imageUrl }}
                    className="w-full mt-3 h-80"
                    resizeMode='contain'
                />
            )}
        </View>
    )

    return (
        <SafeAreaView className="mb-14 bg-main_background">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="p-6">
                    <Text className="text-xl tracking-widest font-psemibold text-primary">
                        Notices
                    </Text>
                </View>

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

                <View className="py-2">
                    {notices.map((notice, index) => (
                        <View
                            className="p-4 mx-6 mb-8 rounded-lg bg-slate-200"
                            key={index}
                        >
                            <Text className="text-sm tracking-wide font-pmedium text-primary">
                                {notice.noticeDate}
                            </Text>
                            <Text className="mt-2 text-sm tracking-widest text-justify font-pregular">
                                {notice.title}
                            </Text>
                            {!notice.imageUrl ? (
                                <></>
                            ) : (
                                <Image
                                    source={{ uri: notice.imageUrl }}
                                    className="w-full mt-3 h-80"
                                    resizeMode='contain'
                                />
                            )}
                        </View>
                    ))}
                </View>
                <StatusBar backgroundColor="#000" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notices