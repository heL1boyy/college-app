import {
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import { fetchNotices } from "../../../../lib/FirebaseConfig";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const getNotices = async () => {
      try {
        const fetchedNotices = await fetchNotices();
        setNotices(fetchedNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
    getNotices();
  }, []);

  const handleImagePress = (imageUrl) => {
    setPreviewImage(imageUrl);
    setModalVisible(true); //
  };

  return (
    <SafeAreaView className="mb-14 bg-main_background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-xl tracking-widest font-psemibold text-primary">
            Notices
          </Text>
        </View>
        <View className="py-2">
          {notices.map((notice, index) => (
            <View className="p-4 mx-6 mb-8 rounded-lg bg-slate-200" key={index}>
              <Text className="text-sm tracking-wide font-pmedium text-primary">
                {notice.createdAt
                  ? format(notice.createdAt.toDate(), "MMM dd, yyyy")
                  : "No date available"}
              </Text>
              <Text className="mt-2 text-sm tracking-widest text-justify font-pregular">
                {notice.name}
              </Text>
              {notice.imageUrl && (
                <TouchableOpacity
                  onPress={() => handleImagePress(notice.imageUrl)}
                >
                  <Image
                    source={{ uri: notice.imageUrl }}
                    className="w-full mt-4 rounded-lg h-60"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Modal for image preview */}
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="relative bg-white p-4 rounded-lg">
              <Image
                source={{ uri: previewImage }}
                style={{ width: 300, height: 300 }}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "white",
                  borderRadius: 50,
                  padding: 5,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notice;
