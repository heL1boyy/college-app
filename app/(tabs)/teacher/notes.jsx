
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../components/CustomButton'
import { TouchableOpacity } from 'react-native'

const Notes = () => {

    const noteBySubject = [
        { subject: "Distributed System" },
        { subject: "Applied Economics" },
        { subject: "Mobile Programming" },
        { subject: "Network Programming" },
        { subject: "Advanced Java Programming" },
    ]

    return (
        <SafeAreaView className="h-full bg-main_background">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-row items-center justify-between p-6">
                    <Text className="text-xl tracking-widest font-psemibold text-primary">
                        Notes
                    </Text>
                </View>
                <View className="px-6 mt-1">
                    {noteBySubject.map((note, index) => (
                        <TouchableOpacity
                            key={index}
                            // onPress={() => router.push('/notes/' + note.subject)}
                            className="px-5 py-4 mb-8 rounded-lg bg-slate-200"
                        >
                            <Text className="my-2 text-sm tracking-wider font-pmedium">
                                {note.subject}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notes