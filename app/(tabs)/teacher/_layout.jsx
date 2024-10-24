
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import TabBar from '../../../components/TabBar'

const TeacherLayout = () => {
    return (
        <Tabs tabBar={(props) => <TabBar {...props} />}>
            <Tabs.Screen
                name="teacherDashboard"
                options={{
                    title: "Teacher Dashboard",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="attendances"
                options={{
                    title: "Attendance",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: "Tasks",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="notices"
                options={{
                    title: "Notice",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="teacherProfile"
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />
        </Tabs>
    )
}

export default TeacherLayout