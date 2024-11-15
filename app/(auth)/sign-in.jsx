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
    if (!form.identifier || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const isEmail = form.identifier.includes("@");

      // Teacher Login: Check if identifier is an email
      if (isEmail) {
        const qTeacher = query(
          collection(db, "teachers"),
          where("email", "==", form.identifier),
          where("password", "==", form.password)
        );
        const queryTeacherSnapshot = await getDocs(qTeacher);

        if (queryTeacherSnapshot.empty) {
          throw new Error("Invalid email or password for teacher.");
        }

        const teacherDoc = queryTeacherSnapshot.docs[0].data();
        setUser({ ...teacherDoc, isAdmin: false });
        setIsLoggedIn(true);
        Alert.alert("Success", "Teacher signed in successfully");

        router.push("/teacher/teacherDashboard"); // Navigate to teacher dashboard
        return; // Exit after teacher login to prevent further checks
      }

      // Admin Login (using username) if not a teacher
      const qAdmin = query(
        collection(db, "adminUsers"),
        where("name", "==", form.identifier),
        where("password", "==", form.password)
      );
      const queryAdminSnapshot = await getDocs(qAdmin);

      if (queryAdminSnapshot.empty) {
        throw new Error("Invalid username or password for admin.");
      }

      const adminDoc = queryAdminSnapshot.docs[0].data();
      setUser({ ...adminDoc, isAdmin: true });
      setIsLoggedIn(true);
      Alert.alert("Success", "Admin signed in successfully");

      router.push("/admin/adminDashboard"); // Navigate to admin dashboard

      return;
    } catch (error) {
      // User Login: Use signIn function for regular user (email & password)
      try {
        const userCredential = await userSignIn(form.identifier, form.password);

        // Successfully signed in as a regular user
        setUser(userCredential);
        setIsLoggedIn(true);
        Alert.alert("Success", "You have been logged in successfully.");

        router.push("/user/home"); // Navigate to user home
      } catch (userError) {
        Alert.alert("Error", userError.message); // This shows the error for user login
      }
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
