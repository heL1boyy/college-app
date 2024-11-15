import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useEffect, useState } from "react";

import FormField from "../../../components/FormField";
import CustomButton from "../../../components/CustomButton";

import { storage, db } from "../../../lib/FirebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Initialize Firebase

const AdminDashboard = () => {
  const { user, isLoggedIn } = useGlobalContext();

  return (
    <SafeAreaView>
      <FlatList
        data={user} // Add more items as needed
        keyExtractor={(index) => index.user.id()} // Ensure keys are unique and strings
        ListHeaderComponent={() => (
          <View className="flex-row items-center justify-between p-6 rounded-xl">
            <View>
              <Text className="text-sm tracking-widest font-pmedium">
                {isLoggedIn ? "Welcome Back" : "Hello"}
              </Text>
              <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
                {user ? user.name : "Guest"}
              </Text>
            </View>

            <TouchableOpacity onPress={() => router.push("/notification")}>
              <Ionicons name="notifications" size={24} color={Colors.primary} />
            </TouchableOpacity>

            {/* <TouchableOpacity
                className="px-4 py-2 bg-black rounded-lg "
                onPress={() => { }}
                activeOpacity={0.7}
              >
                <Text className="text-white">Text Here</Text>
              </TouchableOpacity>

              {userData.map((user, index) => {
                <Text className="bg-amber-400" key={index}>
                  {JSON.stringify(user)}
                </Text>;
              })} */}
          </View>
        )}
        renderItem={({ item, index }) => (
          <View key={index.toString()} className="p-6">
            <View className="bg-green-400">
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-full"
              />
              <Text>{item.username}</Text>

              {/* <FormField
              title="Title"
              otherStyles="mt-5"
              placeholder="Enter title"
            /> */}

              {/* <TouchableOpacity
              className="self-center w-20 h-20 p-2 bg-green-200 rounded-full "
              onPress={() => filepicker()}
              activeOpacity={0.7}
            >
           
            </TouchableOpacity> */}

              <CustomButton
                title="Submit"
                onPress={submit}
                // isLoading={isSubmitting}
                containerStyles="w-full mt-6 min-h-[56px]"
              />
            </View>

            <View className="flex items-center justify-center mt-5 bg-red">
              <CustomButton
                title="Upload Document"
                onPress={pickAndUploadDocument}
                disabled={uploading}
                containerStyles="mt-6 bg-primary"
                textStyles="text-white"
              />
              {uploading && (
                <View style={styles.uploadInfo}>
                  <Text>Uploading: {uploadProgress.toFixed(2)}%</Text>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
              {uploadedUrl ? <Text>Uploaded URL: {uploadedUrl}</Text> : null}
            </View>

            {/* for the image upload  */}
            {/* title for that image  */}

            <View className="mt-5 bg-orange">
              <TouchableOpacity onPress={() => pickAndUploadImage()}>
                {!image ? (
                  <Text className="w-32 px-4 py-2 text-center text-white rounded-lg bg-primary">
                    Upload Image
                  </Text>
                ) : (
                  <Image
                    source={{ uri: image }}
                    className="w-full h-full rounded-full"
                  />
                )}
              </TouchableOpacity>
              <View className="flex-row items-center justify-between">
                <TextInput
                  onChangeText={handleTitleChange}
                  placeholder="Title"
                  className="p-2 my-2 bg-gray-200 border-2 rounded-md w-60"
                />
                <TouchableOpacity
                  disabled={loading}
                  onPress={() => addImageAndTitle()}
                >
                  {loading ? (
                    <ActivityIndicator size={"large"} color={"white"} />
                  ) : (
                    <Text className="px-4 py-2 text-center text-white rounded-lg bg-primary">
                      Add Title
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <StatusBar backgroundColor="#000" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  uploadInfo: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default AdminDashboard;
