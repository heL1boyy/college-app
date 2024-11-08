
import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import AddNotice from '../../../components/TeacherComponents/AddNotice'
import NoticeSection from '../../../components/TeacherComponents/NoticeSection'

const Notices = () => {
  return (
    <SafeAreaView className="mb-14 bg-main_background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Notices
          </Text>
        </View>
        <AddNotice />
        <NoticeSection />
        <StatusBar backgroundColor="black" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notices