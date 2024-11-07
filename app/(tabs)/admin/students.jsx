
import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '../../../components/CustomButton'

const Students = () => {

      const [editMode, setEditMode] = useState(false)

      const handleCancel = () => {
            setEditMode(false);
      };

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
                        <View className="p-6">
                              <Text className="text-xl tracking-widest font-psemibold text-primary">
                                    Students
                              </Text>
                        </View>
                        <View className="flex-col mx-6 mb-6 space-y-4">
                              {editMode ? (
                                    <>
                                          <View className="p-6 mb-2 rounded-lg bg-slate-200">
                                                <View className="flex-row items-center mb-6">
                                                      <Text className="tracking-wider font-rmedium w-[20%]">Name:</Text>
                                                      <TextInput
                                                            className="w-[80%] px-3 py-1 border border-gray-500 rounded-lg"
                                                      />
                                                </View>
                                                <View className="flex-row items-center mb-6">
                                                      <Text className="tracking-wider font-rmedium w-[36%]">Department:</Text>
                                                      <TextInput
                                                            className="w-[64%] px-3 py-1 border border-gray-500 rounded-lg"
                                                      />
                                                </View>
                                                <View className="flex-row items-center mb-6">
                                                      <Text className="tracking-wider font-rmedium w-[44%]">Academic Year:</Text>
                                                      <TextInput
                                                            className="w-[56%] px-3 py-1 border border-gray-500 rounded-lg"
                                                      />
                                                </View>
                                                <View className="flex-row items-center mb-6">
                                                      <Text className="tracking-wider font-rmedium w-[24%]">Roll No:</Text>
                                                      <TextInput
                                                            className="w-[76%] px-3 py-1 border border-gray-500 rounded-lg"
                                                      />
                                                </View>
                                                <View className="flex-row items-center mb-6">
                                                      <Text className="tracking-wider font-rmedium w-[20%]">Email:</Text>
                                                      <TextInput
                                                            className="w-[80%] px-3 py-1 border border-gray-500 rounded-lg"
                                                      />
                                                </View>
                                                <View className="flex-row items-center">
                                                      <Text className="tracking-wider font-rmedium w-[26%]">Contact:</Text>
                                                      <TextInput
                                                            className="w-[74%] px-3 py-1 border border-gray-500 rounded-lg"
                                                      />
                                                </View>
                                          </View>
                                          <TouchableOpacity onPress={handleCancel}>
                                                <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-slate-600 font-rmedium">Cancel</Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                          // onPress={handleSave}
                                          >
                                                <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                                                      {/* {isSaving ? "Saving..." : "Save"} */}
                                                      Add Student
                                                </Text>
                                          </TouchableOpacity>
                                    </>
                              ) : (
                                    <TouchableOpacity
                                          onPress={() => setEditMode(true)}
                                    >
                                          <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">Add Student</Text>
                                    </TouchableOpacity>
                              )}
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