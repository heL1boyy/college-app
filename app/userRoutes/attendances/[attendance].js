
import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Calendar } from "react-native-calendars";

const AttendanceBySubject = () => {

    const { attendance } = useLocalSearchParams();

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Attendace",
            headerShown: true,
        });
    });

    return (
        <View className="px-6 mt-6">
            <Text className="text-xl tracking-widest font-psemibold text-primary">
                {attendance}
            </Text>
            <View className="mt-5 mb-8">
                <Text>Total Attendance: </Text>
                <Text className="my-5">Total Present Days: </Text>
                <Text>Total Absent Days: </Text>
            </View>
            <Calendar
                style={{
                    borderRadius: 6,
                    elevation: 10,
                }}
                hideExtraDays={true}
            />
        </View>
    );

};

export default AttendanceBySubject;
