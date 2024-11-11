
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import Class from '../../../components/HomeComponents/Class';
import SearchInput from '../../../components/SearchInput';
// import TeacherDashboardHeader from '../../../components/TeacherComponents/TeacherDashboardHeader';
import Header from '../../../components/TeacherComponents/Dashboard/Header'
import Task from '../../../components/TeacherComponents/Dashboard/Task';
import Notice from '../../../components/TeacherComponents/Dashboard/Notice';

const TeacherDashboard = () => {
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>

        <Header />

        <View className="px-6 pt-1 pb-2">
          <SearchInput />
        </View>

        <Class />

        <Task />

        <Notice />


        <StatusBar backgroundColor="black" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default TeacherDashboard