

import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

import { images } from "../constants";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/user/home" />;
  // return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="h-full bg-white ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" w-full justify-center items-center min-h-[85vh] px-4  mt-10">
          <Image
            source={images.logo1}
            className="w-[200px] h-[150px]"
            resizeMode="contain"
          />
          <View className="relative py-1 mt-5">
            <Text className="text-3xl text-center text-black font-rbold ">
              Welcome To
              <Text className="text-[#161697]"> CMA</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[130px] h-[13px] absolute  bottom-0 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="mt-2 text-sm text-center font-rregular">
            Let Access All Work From Here
          </Text>
          <Image
            source={images.screenimg1}
            className="max-w-[380px] w-full h-[370px]  "
            resizeMode="contain"
          />
          <CustomButton
            title="Continue with Email "
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full min-h-[60px] mt-7 border-[#161697]"
          />
        </View>
      </ScrollView>
      {/* <StatusBar backgroundColor="#161622 " style="light" /> */}
    </SafeAreaView>
  );
}
