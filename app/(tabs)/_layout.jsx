import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
const Tablayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="user" options={{ headerShown: false }} />
        <Stack.Screen name="notification" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default Tablayout;
