
import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Drawer } from 'expo-router/drawer'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerToggleButton } from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '../../../constants/Colors';
import { images } from '../../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useGlobalContext } from "../../../context/GlobalProvider";

// const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {

    const pathname = usePathname();
    
    // useEffect(() => {
    //     console.log(pathname)
    // }, [pathname])

    const { logout } = useGlobalContext();

    return (
        <>
            <DrawerContentScrollView {...props} >
                <View className="p-4 mx-3 my-3 rounded-lg bg-primary">
                    <TouchableOpacity onPress={() => router.push("/user/profile")} className="flex-row items-center gap-4">
                        <View>
                            <Image
                                source={images.profile}
                                className="w-[76px] h-[76px] rounded-full"
                                resizeMode='contain'
                            />
                        </View>
                        <View>
                            <Text className="text-sm tracking-wide text-white font-rregular">Sagan Shrestha</Text>
                            <Text className="mt-2 text-sm tracking-wide text-white font-rregular">077/BCA/025</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <View className="px-1 mt-1">
                        <DrawerItem
                            icon={({ color, size }) => (<Ionicons name="home" size={24} color={pathname == "/user/home" ? "#fff" : "#6734d8"} />)}
                            label={"Home"}
                            labelStyle={[styles.navItemLabel, { color: pathname == "/user/home" ? "#fff" : "#6734d8" }]}
                            style={{ backgroundColor: pathname == "/user/home" ? "#6734d8" : "#fff" }}
                            onPress={() => { router.push('/user/home') }}
                        />
                    </View>
                    <View className="px-1 mt-2">
                        <DrawerItem
                            icon={({ color, size }) => (<MaterialIcons name="menu-book" size={24} color={pathname == "/note" ? "#fff" : "#6734d8"} />)}
                            label={"Notes"}
                            labelStyle={[styles.navItemLabel, { color: pathname == "/note" ? "#fff" : "#6734d8" }]}
                            style={{ backgroundColor: pathname == "/note" ? "#6734d8" : "#fff" }}
                            onPress={() => { router.push('/note') }}
                        />
                    </View>
                    <View className="px-1 mt-2">
                        <DrawerItem
                            icon={({ color, size }) => (<Entypo name="bar-graph" size={24} color={pathname == "/result" ? "#fff" : "#6734d8"} />)}
                            label={"Results"}
                            labelStyle={[styles.navItemLabel, { color: pathname == "/result" ? "#fff" : "#6734d8" }]}
                            style={{ backgroundColor: pathname == "/result" ? "#6734d8" : "#fff" }}
                            onPress={() => { router.push('/result') }}
                        />
                    </View>
                </View>
            </DrawerContentScrollView>
            <View className="flex-row items-center p-5 border-t-2 border-primary">
                <TouchableOpacity onPress={logout} className="flex-row items-center">
                    <MaterialCommunityIcons name="logout" size={26} color={Colors.primary} />
                    <Text className="mt-1 ml-2 text-base tracking-wide font-rmedium text-primary">Logout</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const DrawerLayout = () => {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                // headerStyle: { backgroundColor: "#f5f5f5" },
                // headerTintColor: "#6734d8",
                // headerRight: () => <DrawerToggleButton tintColor='#6734d8' />,
                // headerLeft: () => { },
                // headerTitleStyle: [styles.drawerLabel],
                // headerRightContainerStyle: [styles.headerRightStyle]
            }}
        >
            <Drawer.Screen
                name='note'
                options={{
                    headerShown: false,
                    headerTitle: "Notes"
                }}
            />
            <Drawer.Screen
                name='result'
                options={{
                    headerShown: false,
                    headerTitle: "Results"
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