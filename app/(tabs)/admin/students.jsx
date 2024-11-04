
import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '../../../components/CustomButton'

const Students = () => {

      const studentList = [
            { id: "077/BCA/025", name: "Sagan Shrestha", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: "077/BCA/025", name: "Abhaya Shilpakar", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: "077/BCA/025", name: "Leon Singh Lama", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: "077/BCA/025", name: "Prabin Pant", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: "077/BCA/025", name: "Rajul Shakya", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: "077/BCA/025", name: "Lizen Bajracharya", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: "077/BCA/025", name: "Karma Lenduk", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: "077/BCA/025", name: "Sandhya Maharjan", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      ]

      return (
            <SafeAreaView className="bg-main_background mb-14">
                  <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex flex-row items-center justify-between p-6">
                              <Text className="text-xl tracking-widest font-psemibold text-primary">
                                    Students
                              </Text>
                              <CustomButton
                                    title="Add Student"
                                    containerStyles="w-auto bg-primary rounded-lg px-5"
                                    textStyles={"text-white text-sm font-pmedium tracking-widest"}
                              />
                        </View>
                        <View className="px-6 py-2">
                              {studentList.map((student, index) => (
                                    <TouchableOpacity
                                          key={index}
                                          className="flex flex-row items-center justify-start p-5 mb-8 rounded-lg bg-slate-200"
                                          onPress={() => router.push('/adminRoutes/students/' + student.name)}
                                    >
                                          <View>
                                                <Image
                                                      source={{ uri: student.imageURI }}
                                                      className="w-[76px] h-[76px] rounded-full"
                                                      resizeMode='cover'
                                                />
                                          </View>
                                          <View className="ml-6">
                                                <Text className="text-base tracking-wide text-primary font-rregular">
                                                      {student.name}
                                                </Text>
                                                <Text className="mt-3 text-sm tracking-wide text-black font-rregular">
                                                      {student.id}
                                                </Text>
                                          </View>
                                    </TouchableOpacity>
                              ))}
                        </View>
                        <StatusBar backgroundColor="#000" />
                  </ScrollView>
            </SafeAreaView>
      )
}

export default Students