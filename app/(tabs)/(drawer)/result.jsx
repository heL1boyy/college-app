
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Colors'

const Results = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView className="bg-main_background">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex flex-row items-center justify-between p-5">
                    <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
                        Results
                    </Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={30} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Results