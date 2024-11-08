
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';
import { router } from 'expo-router';
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';

const TeacherDashboard = () => {
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center justify-between w-full p-6">
          <View className="w-[78%]">
            <Text className="text-base tracking-widest font-rregular">
              Welcome Back
            </Text>
            <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
              Sagan Shrestha
            </Text>
          </View>
          <View className="flex flex-row items-center justify-end w-[22%]">
            <TouchableOpacity onPress={() => router.push("/notification")}>
              <Ionicons name="notifications" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar backgroundColor="black" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default TeacherDashboard