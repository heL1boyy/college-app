
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Colors'

const Results = () => {

    const navigation = useNavigation()

    const resultBySemester = [
        { semester: "First Semester" },
        { semester: "Second Semester" },
        { semester: "Third Semester" },
        { semester: "Fourth Semester" },
        { semester: "Fifth Semester" },
        { semester: "Sixth Semester" },
    ]

    return (
        <SafeAreaView className="h-full bg-main_background">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex flex-row items-center justify-between p-6">
                    <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
                        Results
                    </Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={30} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View className="px-6 mt-2">
                    {resultBySemester.map((result, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => router.push('/userRoutes/results/' + result.semester)}
                            className="px-5 py-4 mb-8 rounded-lg bg-slate-200"
                        >
                            <Text className="my-2 text-sm tracking-wider font-pmedium">
                                {result.semester}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default Results