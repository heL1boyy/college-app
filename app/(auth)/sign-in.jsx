import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn as userSignIn } from "../../lib/FirebaseConfig";
import { useGlobalContext } from "@/context/GlobalProvider";

import { db } from "../../lib/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    const { identifier, password } = form;

    if (!identifier || !password) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const isEmail = identifier.includes("@");

      if (isEmail) {
        // Teacher Login
        const teacherQuery = query(
          collection(db, "teachers"),
          where("email", "==", identifier),
          where("password", "==", password)
        );
        const teacherSnapshot = await getDocs(teacherQuery);

        if (!teacherSnapshot.empty) {
          const teacherDoc = teacherSnapshot.docs[0].data();
          setUser({ ...teacherDoc, isAdmin: false, isTeacher: true });
          setIsLoggedIn(true);

          Alert.alert("Success", "Teacher signed in successfully.");
          router.push("/teacher/teacherDashboard");
          return;
        }
      }

      // Admin Login
      const adminQuery = query(
        collection(db, "adminUsers"),
        where("name", "==", identifier),
        where("password", "==", password)
      );
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const adminDoc = adminSnapshot.docs[0].data();
        setUser({ ...adminDoc, isAdmin: true, isTeacher: false });
        setIsLoggedIn(true);

        Alert.alert("Success", "Admin signed in successfully.");
        router.push("/admin/adminDashboard");
        return;
      }

      // Regular User Login
      const userCredential = await userSignIn(identifier, password);
      const userDoc = await getCurrentUser(); // Fetch user data from Firestore

      setUser({ ...userDoc, isAdmin: false, isTeacher: false });
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully.");
      router.push("/user/home");
    } catch (error) {
      console.error("Sign-In Error:", error.message);
      Alert.alert("Error", "Invalid credentials or user does not exist.");
    } finally {
      setIsSubmitting(false);
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
              Log in to App
            </Text>
          </View>

          <FormField
            value={form.identifier}
            handleChangeText={(e) => setForm({ ...form, identifier: e })}
            otherStyles="mt-5"
            placeholder="Enter Your Email or Username"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            placeholder="Enter Password"
            secureTextEntry
          />

          <CustomButton
            title="Sign-In"
            onPress={submit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-6 border-[#161697] min-h-[54px] bg-white"
          />
          <View className="flex-row justify-center gap-2 pt-3">
            <Text className="text-lg font-regular">Don't have an account?</Text>
            <Link
              href="/sign-up"
              className="text-lg font-semibold text-primary"
            >
              Sign Up
            </Link>
          </View>

          <Image
            source={images.loginimg}
            className="max-w-[380px] w-full h-[246px]"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
