
import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { Colors } from '../../../constants/Colors'
import { images } from '../../../constants'

const AdminProfile = () => {

  const { user, logout } = useGlobalContext()

  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">My Profile</Text>
          <TouchableOpacity onPress={logout}>
            <MaterialCommunityIcons name="logout" size={26} color={Colors.third} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between py-2 mx-6">
          <View className="flex-row items-center">
            <Image
              source={images.profile}
              className="w-20 h-20 rounded-full"
            />
            <View className="ml-6">
              <Text className="text-base tracking-wide font-rmedium">{user?.username}</Text>
              <Text className="mt-1 text-base tracking-wide">sagan@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity
          // onPress={() => setEditMode(true)}
          >
            <Text className="px-4 py-2 text-white rounded-lg bg-primary">Edit</Text>
          </TouchableOpacity>
        </View>

        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  )

}

export default AdminProfile