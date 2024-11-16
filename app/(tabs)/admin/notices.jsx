import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addImageWithTitle, fetchNotices } from "../../../lib/FirebaseConfig"; // Assuming fetchNotices is a function to fetch data

const Notices = () => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState([]); // State to store notices from the database

  useEffect(() => {
    const getNotices = async () => {
      try {
        const fetchedNotices = await fetchNotices(); // Fetch notices from Firebase
        setNotices(fetchedNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    getNotices();
  }, []);

  const handleCancel = () => {
    setEditMode(false);
    setTitle("");
    setImage(null);
  };

  // Function to pick and upload an image
  const pickAndUploadImage = async () => {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!res.canceled && res.assets && res.assets.length > 0) {
        setImage(res.assets[0].uri);
        console.log("Selected image URI:", res.assets[0].uri);
      } else {
        console.log("Image picking cancelled.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSave = async () => {
    if (title && image) {
      await addImageWithTitle(image, title, setLoading);
      setEditMode(false);
      setTitle("");
      setImage(null);

      // Optionally refetch notices after saving
      const fetchedNotices = await fetchNotices();
      setNotices(fetchedNotices);
    } else {
      console.error("Title or image is missing!");
    }
  };

  return (
    <SafeAreaView className="mb-14 bg-main_background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Notices
          </Text>
        </View>

        <View className="flex-col mx-6 mb-6 space-y-4">
          {editMode ? (
            <>
              <View className="p-6 mb-2 rounded-lg bg-slate-200">
                <Text className="tracking-wider">Enter Title:</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter Title"
                  className="w-full px-4 py-2 my-4 border border-gray-500 rounded-lg"
                />
                <TouchableOpacity
                  onPress={pickAndUploadImage}
                  className="py-3 mt-2 border rounded-lg border-primary"
                >
                  <Text className="text-center text-primary">Upload Image</Text>
                </TouchableOpacity>
                {image && (
                  <Image
                    source={{ uri: image }}
                    className="w-full mt-3 h-80"
                    resizeMode="contain"
                  />
                )}
              </View>
              <TouchableOpacity onPress={handleCancel}>
                <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-slate-600 font-rmedium">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} disabled={loading}>
                <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                  {loading ? "Saving..." : "Add Notice"}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Text className="py-4 tracking-widest text-center text-white rounded-lg bg-primary font-rmedium">
                Add Notice
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="py-2">
          {notices.map((notice, index) => (
            <View className="p-4 mx-6 mb-8 rounded-lg bg-slate-200" key={index}>
              <Text className="text-sm tracking-wide font-pmedium text-primary">
                {notice.noticeDate ? notice.noticeDate : "date here"}
              </Text>
              <Text className="mt-2 text-sm tracking-widest text-justify font-pregular">
                {notice.name}
              </Text>
              {notice.imageUrl && (
                <Image
                  source={{ uri: notice.imageUrl }}
                  className="w-full mt-3 h-80"
                  resizeMode="contain"
                />
              )}
            </View>
          ))}
        </View>
        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notices;
