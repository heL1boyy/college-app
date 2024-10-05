
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

const CGPAClaculator = () => {
    return (
        <SafeAreaView className="bg-main_background">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="p-5">
                    <Text className="text-xl tracking-widest font-psemibold text-primary">CGPA Calculator</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CGPAClaculator