
import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '../../../constants'

const ParticularStudent = () => {

    const { student } = useLocalSearchParams()

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: student,
            headerShown: false
        })
    })

    return (
        <SafeAreaView className="bg-main_background">
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View className="flex-col items-center justify-center p-6 my-2">
                    <Image
                        source={images.profile}
                        className="w-40 h-40 rounded-full"
                        resizeMode="contain"
                    />
                    <Text className="mt-6 text-xl font-semibold tracking-widest text-primary">{student}</Text>
                    {/* <Text className="mt-2 text-lg font-semibold tracking-widest text-primary">077/BCA/025</Text> */}
                </View>
                <View className="flex-row items-center justify-start p-5 mx-6 mb-4 rounded-lg bg-slate-200">
                    <View>
                        <Text className="mb-3 tracking-wider font-rmedium">Department:</Text>
                        <Text className="mb-3 tracking-wider font-rmedium">Semester:</Text>
                        <Text className="mb-3 tracking-wider font-rmedium">Academic Year:</Text>
                        <Text className="mb-3 tracking-wider font-rmedium">Roll No:</Text>
                        <Text className="tracking-wider font-rmedium">Current CGPA:</Text>
                    </View>
                    <View className="ml-4">
                        <Text className="mb-3 tracking-wider font-rregular">BCA</Text>
                        <Text className="mb-3 tracking-wider font-rregular">6</Text>
                        <Text className="mb-3 tracking-wider font-rregular">2077</Text>
                        <Text className="mb-3 tracking-wider font-rregular">077/BCA/025</Text>
                        <Text className="tracking-wider font-rregular">4.0</Text>
                    </View>
                </View>
                <View className="p-5 mx-6 my-4 bg-slate-200 rounded-xl">
                    <Text className="text-lg font-rmedium">About</Text>
                    <View className="flex-row items-center justify-start mt-4">
                        <View>
                            <Text className="mb-3 tracking-wider font-rregular">Date of Birth:</Text>
                            <Text className="tracking-wider font-rregular">Gender:</Text>
                        </View>
                        <View className="ml-4">
                            <Text className="mb-3 tracking-wider font-rregular">2002</Text>
                            <Text className="tracking-wider font-rregular">Male</Text>
                        </View>
                    </View>
                </View>
                <View className="p-5 mx-6 mt-4 mb-8 bg-slate-200 rounded-xl">
                    <Text className="text-lg font-rmedium">Contact</Text>
                    <View className="flex-row items-center justify-start mt-4">
                        <View>
                            <Text className="mb-3 tracking-wider font-rregular">Contact No:</Text>
                            <Text className="mb-3 tracking-wider font-rregular">Email:</Text>
                            <Text className="tracking-wider font-rregular">Address:</Text>
                        </View>
                        <View className="ml-4">
                            <Text className="mb-3 tracking-wider font-rregular">9841234567</Text>
                            <Text className="mb-3 tracking-wider font-rregular">sagan@gmail.com</Text>
                            <Text className="tracking-wider font-rregular">Sanepa</Text>
                        </View>
                    </View>
                </View>
                <StatusBar backgroundColor="#000" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ParticularStudent