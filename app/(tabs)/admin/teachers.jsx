
import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '../../../components/CustomButton'

const Teachers = () => {

      const teacherList = [
            { subject: "Distributed System", name: "Baikuntha Acharya", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { subject: "Applied Economics", name: "Janak Jha", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { subject: "Network Programming", name: "Shambhu Pariyar", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { subject: "Mobile Programming", name: "Dharma Raj Poudel", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { subject: "Advanced Java Programming", name: "Niraj Kumar Pokhrel", imageURI: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      ]

      return (
            <SafeAreaView className="bg-main_background mb-14">
                  <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex flex-row items-center justify-between p-6">
                              <Text className="text-xl tracking-widest font-psemibold text-primary">
                                    Teachers
                              </Text>
                              <CustomButton
                                    title="Add Teacher"
                                    containerStyles="w-auto bg-primary rounded-lg px-5"
                                    textStyles={"text-white text-sm font-pmedium tracking-widest"}
                              />
                        </View>
                        <View className="px-6 py-2">
                              {teacherList.map((teacher, index) => (
                                    <TouchableOpacity
                                          key={index}
                                          className="flex flex-row items-center justify-start p-5 mb-8 rounded-lg bg-slate-200"
                                          onPress={() => router.push('/adminRoutes/teachers/' + teacher.name)}
                                    >
                                          <View>
                                                <Image
                                                      source={{ uri: teacher.imageURI }}
                                                      className="w-[76px] h-[76px] rounded-full"
                                                      resizeMode='cover'
                                                />
                                          </View>
                                          <View className="ml-6">
                                                <Text className="text-base tracking-wide text-primary font-rregular">
                                                      {teacher.name}
                                                </Text>
                                                <Text className="mt-3 text-sm tracking-wide text-black font-rregular">
                                                      {teacher.subject}
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

export default Teachers