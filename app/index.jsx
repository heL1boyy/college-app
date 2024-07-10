import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

import { images } from "../constants";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  // return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className=" bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo1}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px] "
            resizeMode="contain"
          />

          <View className="relative mt-5 py-1">
            <Text className="text-white text-center text-3xl font-rbold ">
              Discover Endless Possibitlies with
              <Text className="text-orange-600"> Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[130px] h-[13px] absolute  bottom-0 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className=" text-sm font-rregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation : embark on a jounary of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email "
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      {/* <StatusBar backgroundColor="#161622 " style="light" /> */}
    </SafeAreaView>
  );
}
