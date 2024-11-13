import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/FirebaseConfig"; // Use your Firebase function here
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    // Validate form inputs
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form);
      setUser(result); // Set user data in global context
      setIsLoggedIn(true); // Mark user as logged in

      // Navigate to home screen
      router.replace("user/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false); // Ensure this is always called
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 mt-14">
          <View className="items-center">
            <Image
              source={images.logo1}
              className="w-[200px] h-[150px]"
              resizeMode="contain"
            />
            <Text className="text-[#161697] text-2xl font-semibold">
              Sign Up to App
            </Text>
          </View>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-5"
            placeholder="Enter Username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
            placeholder="Enter Email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            placeholder="Enter Password"
          />

          <CustomButton
            title="Sign Up"
            onPress={submit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-6 border-[#161697] min-h-[56px] bg-white"
          />
          <View className="flex-row justify-center gap-2 pt-5 ">
            <Text className="text-lg font-rregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg text-primary font-rsemibold"
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
