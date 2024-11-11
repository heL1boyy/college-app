
import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const Notice = () => {

    const notice = [
        {
            id: 1,
            noticeDate: "08/06/2024",
            title: "We are here for you on holidays and Saturdays! Visit us from 9:00 AM to 5:00 PM for all your inquires.",
            imageUrl: "https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/459428461_1063716562423622_7367957136799521615_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=--z9dUjwFQ8Q7kNvgHj93hW&_nc_ht=scontent.fktm17-1.fna&_nc_gid=A-KlO0BRdsQufdWklFPUfMI&oh=00_AYCTzrtyowLMIDLDA39aOT6BXir-tcl0Hr7jSx8siIrm1w&oe=670D9388"
        },
    ]

    return (
        <View className="px-6 mt-4 mb-10">
            <View className="flex flex-row items-center justify-between">
                <Text className="text-lg font-pmedium">
                    Notices
                </Text>
                <TouchableOpacity onPress={() => router.push("/teacher/notices")} >
                    <Text className="text-sm font-pmedium text-primary">
                        View All
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="mt-5">
                {notice.map((notices) => (
                    <View
                        className="p-4 rounded-lg bg-slate-200"
                        key={notices.id}
                    >
                        <Text className="text-sm tracking-wide font-pmedium text-primary">
                            {notices.noticeDate}
                        </Text>
                        <Text className="mt-2 text-sm tracking-widest text-justify font-pregular">
                            {notices.title}
                        </Text>
                        {!notices.imageUrl ? (
                            <></>
                        ) : (
                            <Image
                                source={{ uri: notices.imageUrl }}
                                className="w-full mt-3 h-80"
                                resizeMode='contain'
                            />
                        )}
                    </View>
                ))}
            </View>
        </View>
    )
}

export default Notice