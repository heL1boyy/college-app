
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const CGPAClaculator = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView className="bg-main_background">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex flex-row items-center justify-between p-5">
                    <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
                        CGPA Calculator
                    </Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={30} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CGPAClaculator