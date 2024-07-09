import { useFonts } from "expo-font";
import { SplashScreen } from "expo";
import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import GlobalProvider from "../context/GlobalProvider";
import IndexScreen from "../screens/IndexScreen"; // Example screen import
import TabsScreen from "../screens/TabsScreen"; // Example screen import
import AuthScreen from "../screens/AuthScreen"; // Example screen import

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Rubik-Black": require("../assets/fonts/Rubik-Black.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Italic": require("../assets/fonts/Rubik-Italic.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null; // Return a loading indicator or splash screen while fonts are loading
  }

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index">
          <Stack.Screen name="Index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
