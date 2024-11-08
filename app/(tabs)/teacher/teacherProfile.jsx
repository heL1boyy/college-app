
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '../../../constants/Colors'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AboutSection from '../../../components/TeacherComponents/AboutSection'
import Details from '../../../components/TeacherComponents/Details'
import Info from '../../../components/TeacherComponents/Info'

const TeacherProfile = () => {

  const { logout } = useGlobalContext()

  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">My Profile</Text>
          <TouchableOpacity onPress={logout}>
            <MaterialCommunityIcons name="logout" size={26} color={Colors.third} />
          </TouchableOpacity>
        </View>
        <Info />
        <Details />
        <AboutSection />
        <StatusBar backgroundColor="black" />
      </ScrollView>
    </SafeAreaView >
  )
}

export default TeacherProfile