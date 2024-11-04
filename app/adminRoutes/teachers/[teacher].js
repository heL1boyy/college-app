
import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '../../../constants'

const ParticularTeacher = () => {

    const { teacher } = useLocalSearchParams()

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: teacher,
            headerShown: false
        })
    })

    return (
        <SafeAreaView className="my-6 bg-main_background">
            <View className="flex-col items-center justify-center h-full mx-6">
                <View className="flex-col items-center justify-center">
                    <Image
                        source={images.profile}
                        className="w-40 h-40 rounded-full"
                        resizeMode="contain"
                    />
                    <Text className="mt-6 text-xl font-semibold tracking-widest text-primary">{teacher}</Text>
                </View>
                <View className="flex-row items-center justify-start w-full p-5 my-8 rounded-lg bg-slate-200">
                    <View>
                        <Text className="mb-4 tracking-wider font-rmedium">Subject:</Text>
                        <Text className="mb-4 tracking-wider font-rmedium">Degree:</Text>
                        <Text className="mb-4 tracking-wider font-rmedium">Availability:</Text>
                        <Text className="tracking-wider font-rmedium">Experience:</Text>
                        <Text className="tracking-wider font-rmedium">(Teaching)</Text>
                    </View>
                    <View className="ml-4">
                        <Text className="mb-4 tracking-wider font-rregular">Subject Name</Text>
                        <Text className="mb-4 tracking-wider font-rregular">Degree Name</Text>
                        <Text className="mb-4 tracking-wider font-rregular">10:00 AM to 2 PM</Text>
                        <Text className="mb-6 tracking-wider font-rregular">4 Years</Text>
                    </View>
                </View>
                <View className="flex-row items-center justify-start w-full p-5 rounded-lg bg-slate-200">
                    <View>
                        <Text className="mb-4 tracking-wider font-rmedium">Contact No:</Text>
                        <Text className="mb-4 tracking-wider font-rmedium">Email:</Text>
                        <Text className="tracking-wider font-rmedium">Address:</Text>
                    </View>
                    <View className="ml-4">
                        <Text className="mb-4 tracking-wider font-rregular">9841234567</Text>
                        <Text className="mb-4 tracking-wider font-rregular">mail@gmail.com</Text>
                        <Text className="tracking-wider font-rregular">Sanepa</Text>
                    </View>
                </View>
            </View>
            <StatusBar backgroundColor="#000" />
        </SafeAreaView>
    )
}

export default ParticularTeacher