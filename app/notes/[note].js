
import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NoteBySubject = () => {

    const noteList = [
        { unitID: "1", unitName: "Name of the Unit", url: "" },
        { unitID: "2", unitName: "Name of the Unit", url: "" },
        { unitID: "3", unitName: "Name of the Unit", url: "" },
        { unitID: "4", unitName: "Name of the Unit", url: "" },
        { unitID: "5", unitName: "Name of the Unit", url: "" },
        { unitID: "6", unitName: "Name of the Unit", url: "" },
        { unitID: "7", unitName: "Name of the Unit", url: "" },
        { unitID: "8", unitName: "Name of the Unit", url: "" },
        { unitID: "9", unitName: "Name of the Unit", url: "" },
        { unitID: "10", unitName: "Name of the Unit", url: "" },
    ]

    const { note } = useLocalSearchParams()

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: note,
            headerShown: false,
        })
    })

    return (
        <SafeAreaView className="bg-main_background">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="p-5">
                    <Text className="text-xl tracking-widest font-psemibold text-primary">
                        {note}
                    </Text>
                </View>
                <View className="px-5 py-2">
                    {noteList.map((note, index) => (
                        <TouchableOpacity
                            key={index}
                            // onPress={}
                            className="px-5 py-4 mb-6 rounded-lg bg-slate-200"
                        >
                            <Text className="my-2 text-sm tracking-wider font-pmedium">
                                Chapter: {note.unitID}
                            </Text>
                            <Text className="my-2 text-sm tracking-wider font-pmedium">
                                {note.unitName}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default NoteBySubject