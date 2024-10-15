
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Attendances = () => {
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <Text className="text-xl tracking-widest font-psemibold text-primary">Attendances</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Attendances