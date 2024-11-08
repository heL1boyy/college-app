
import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../components/CustomButton'
import { TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const ParticularNote = () => {

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

    const { notes } = useLocalSearchParams()

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: notes,
            headerShown: false
        })
    })

    return (
        <SafeAreaView className="h-full bg-main_background">
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View className="p-5">
                    <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
                        {notes}
                    </Text>
                    <CustomButton
                        title="Upload Notes"
                        containerStyles="bg-primary rounded-lg py-4 mt-6"
                        textStyles="text-white text-sm font-pmedium tracking-widest"
                    // handlePress={}
                    />
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
                <StatusBar backgroundColor="black" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ParticularNote