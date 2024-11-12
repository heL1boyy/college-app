
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Colors'

const Note = () => {

    const navigation = useNavigation()

    const noteBySubject = [
        { subject: "Distributed System" },
        { subject: "Applied Economics" },
        { subject: "Mobile Programming" },
        { subject: "Network Programming" },
        { subject: "Advanced Java Programming" },
    ]

    return (
        <SafeAreaView className="h-full bg-main_background">
            <View className="flex flex-row items-center justify-between p-6">
                <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
                    Notes
                </Text>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu" size={30} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <View className="px-6 mt-2">
                {noteBySubject.map((note, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => router.push('/userRoutes/notes/' + note.subject)}
                        className="px-5 py-4 mb-8 rounded-lg bg-slate-200"
                    >
                        <Text className="my-2 text-sm tracking-wider font-pmedium">
                            {note.subject}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    )

}

export default Note