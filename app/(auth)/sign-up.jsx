import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sumbit = async () => {
    if (!form.username === "" || !form.email === "" || !form.password === "") {
      Alert.alert("Error ", "Please fill in all the fields ");
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      //set to global state

      router.replace("user/home");
    } catch (error) {
      Alert.alert("error ", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-white  h-full">
      <ScrollView>
        <View className="w-full justify-center   min-h-[85vh] px-4 mt-14">
          <View className="items-center">
            <Image
              source={images.logo1}
              className="w-[200px] h-[150px]"
              resizeMode="contain"
            />
            <Text className="text-[#161697] text-2xl font-rsemibold   ">
              Sign Up to App
            </Text>
          </View>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-5"
            placeholder="Enter username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
            placeholder="Enter email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            placeholder="Enter password"
          />

          <CustomButton
            title="Sign Up"
            handlePress={sumbit}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 gap-2 flex-row ">
            <Text className="text-lg  font-rregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-rsemibold text-orange-500"
            >
              Sign In
            </Link>
          </View>

          <View className="items-center">
            <Image
              source={images.signupimg}
              className="max-w-[200px] w-full h-[200px] "
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
