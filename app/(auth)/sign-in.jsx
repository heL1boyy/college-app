import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sumbit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error ", "Please fill in all the fields ");
    }
    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      //set to global state

      Alert.alert("Scucess ", "user signed in successfully");

      router.replace("/home");
    } catch (error) {
      Alert.alert("error ", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center  min-h-[85vh] px-4 ">
          <View className="items-center">
            <Image
              source={images.logo1}
              className="w-[200px] h-[150px]"
              resizeMode="contain"
            />
            <Text className="text-[#161697] text-2xl font-rsemibold   ">
              Log in to App
            </Text>
          </View>

          <FormField
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
            placeholder="Enter Your Email"
          />
          <FormField
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            placeholder="Enter Your Password"
          />
          <Text className="mt-2">Forget password</Text>

          <CustomButton
            title="Sign-in"
            handlePress={sumbit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-2 border-[#161697]"
          />
          <View className="justify-center pt-3 gap-2 flex-row ">
            <Text className="text-lg  font-rregular">Don't have account</Text>
            <Link
              href="/sign-up"
              className="text-lg  font-rsemibold text-orange-500"
            >
              Sign Up
            </Link>
          </View>

          <Image
            source={images.loginimg}
            className="max-w-[380px] w-full h-[246px] "
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
