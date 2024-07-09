import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
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

      //set to global state

      router.replace("/home");
    } catch (error) {
      Alert.alert("error ", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className=" bg-slate-900 h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode=" contain "
            className="w-[115px] h-[35px] "
          />
          <Text className="text-white text-2xl font-rsemibold mt-10  ">
            log in to App
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign-in"
            handlePress={sumbit}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 gap-2 flex-row ">
            <Text className="text-lg text-gray-100 font-rregular">
              Don't have account
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-rsemibold text-orange-500"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
