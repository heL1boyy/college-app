
import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Drawer } from 'expo-router/drawer'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerToggleButton } from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';
import { AntDesign, Entypo, FontAwesome, FontAwesome5, FontAwesome6, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '../../../constants/Colors';

// const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {

    const pathname = usePathname();
    useEffect(() => {
        console.log(pathname)
    }, [pathname])

    return (
        <DrawerContentScrollView {...props} >
            <View className="p-5">
                <Text className="tracking-widest ">
                    User Profile
                </Text>
            </View>
            <DrawerItem
                icon={({ color, size }) => (<Ionicons name="home" size={24} color={pathname == "/user/home" ? "#fff" : "#6734d8"} />)}
                label={"Home"}
                labelStyle={[styles.navItemLabel, { color: pathname == "/user/home" ? "#fff" : "#6734d8" }]}
                style={{ backgroundColor: pathname == "/user/home" ? "#6734d8" : "#fff" }}
                onPress={() => { router.push('/user/home') }}
            />
            <DrawerItem
                icon={({ color, size }) => (<MaterialIcons name="menu-book" size={24} color={pathname == "/notes" ? "#fff" : "#6734d8"} />)}
                label={"Notes"}
                labelStyle={[styles.navItemLabel, { color: pathname == "/notes" ? "#fff" : "#6734d8" }]}
                style={{ backgroundColor: pathname == "/notes" ? "#6734d8" : "#fff" }}
                onPress={() => { router.push('/notes') }}
            />
            <DrawerItem
                icon={({ color, size }) => (<Entypo name="bar-graph" size={24} color={pathname == "/result" ? "#fff" : "#6734d8"} />)}
                label={"Results"}
                labelStyle={[styles.navItemLabel, { color: pathname == "/result" ? "#fff" : "#6734d8" }]}
                style={{ backgroundColor: pathname == "/result" ? "#6734d8" : "#fff" }}
                onPress={() => { router.push('/result') }}
            />
            <DrawerItem
                icon={({ color, size }) => (<Ionicons name="calculator" size={24} color={pathname == "/cgpa" ? "#fff" : "#6734d8"} />)}
                label={"CGPA Calculator"}
                labelStyle={[styles.navItemLabel, { color: pathname == "/cgpa" ? "#fff" : "#6734d8" }]}
                style={{ backgroundColor: pathname == "/cgpa" ? "#6734d8" : "#fff" }}
                onPress={() => { router.push('/cgpa') }}
            />
        </DrawerContentScrollView>
    )
}

const DrawerLayout = () => {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: "#f5f5f5" },
                headerTintColor: "#6734d8",
                headerRight: () => <DrawerToggleButton tintColor='#6734d8' />,
                headerLeft: () => { },
                headerTitleStyle: [styles.drawerLabel],
                headerRightContainerStyle: [styles.headerRightStyle]
            }}
        >
            <Drawer.Screen
                name='notes'
                options={{
                    headerShown: true,
                    headerTitle: "Notes"
                }}
            />
            <Drawer.Screen
                name='result'
                options={{
                    headerShown: true,
                    headerTitle: "Results"
                }}
            />
            <Drawer.Screen
                name='cgpa'
                options={{
                    headerShown: true,
                    headerTitle: "CGPA Calculator"
                }}
            />
        </Drawer>
    )
}

export default DrawerLayout

const styles = StyleSheet.create({
    navItemLabel: {
        marginLeft: -20,
        fontSize: 18,
    },
    drawerLabel: {
        marginLeft: 6,
        fontWeight: "100"
    },
    headerRightStyle: {
        marginRight: 6
    }
})