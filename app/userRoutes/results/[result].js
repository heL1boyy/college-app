
import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../components/CustomButton'

const ResultBySubject = () => {

    const resultList = [
        { semester: "First", result: "" },
        { semester: "Second", result: "" },
        { semester: "Third", result: "" },
        { semester: "Fourth", result: "" },
        { semester: "Fifth", result: "" },
        { semester: "Sixth", result: "" },
    ]

    const { result } = useLocalSearchParams()

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: result,
            headerShown: false
        })
    })

    return (
        <SafeAreaView className="h-full bg-main_background">
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View className="p-6">
                    <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
                        {result} Result
                    </Text>
                    <CustomButton
                        title="View Result"
                        containerStyles="bg-primary rounded-lg py-4 mt-8"
                        textStyles="text-white text-sm font-pmedium tracking-widest"
                        // handlePress={}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default ResultBySubject