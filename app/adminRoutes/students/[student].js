
import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

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
        <SafeAreaView className="h-full bg-main_background">
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View className="p-5">
                    <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
                        {student}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ParticularStudent