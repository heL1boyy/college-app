
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'

const Results = () => {

    const resultList = [
        { semester: "First", result: "" },
        { semester: "Second", result: "" },
        { semester: "Third", result: "" },
        { semester: "Fourth", result: "" },
        { semester: "Fifth", result: "" },
        { semester: "Sixth", result: "" },
        { semester: "Seventh", result: "" },
        { semester: "Eighth", result: "" },
    ]

    return (
        <SafeAreaView className="bg-main_background mb-14">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="p-5">
                    <Text className="text-xl tracking-widest font-psemibold text-primary">Results</Text>
                </View>
                <View className="px-5 py-2">
                    {resultList.map((result, index)=>(
                        <TouchableOpacity
                            key={index}
                            className="px-5 py-4 mb-8 rounded-lg bg-slate-200"
                        >
                            <Text className="my-2 text-sm tracking-wider font-pmedium">
                                {result.semester} Semester Result
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default Results