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

import { storage, database } from "../../../lib/FirebaseConfig";
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
import { Entypo, FontAwesome5, FontAwesome6, Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Initialize Firebase

const AdminDashboard = () => {
  const { user, isLoggedIn } = useGlobalContext();
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    try {
      const userQuery = query(collection(database, "users"));

      const querySnapshot = await getDocs(userQuery);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const submit = () => { };
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  // for  pdf upload
  const pickAndUploadDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      console.log("DocumentPicker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        const fileUri = selectedFile.uri;
        const fileName = selectedFile.name;

        console.log("Document selected:", fileName);

        setUploading(true);

        // Create a reference to the file in Firebase Storage
        const fileRef = ref(storage, `notes/${fileName}`);

        // Convert the file to a blob
        const response = await fetch(fileUri);
        const blob = await response.blob();

        // Start the file upload
        const uploadTask = uploadBytesResumable(fileRef, blob);

        // Monitor the upload progress
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            setUploading(false);
            console.error("Upload failed:", error);
          },
          async () => {
            // Upload completed successfully
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadedUrl(downloadURL);
            setUploading(false);
            console.log("File available at", downloadURL);

            // Save metadata to Firestore in the "notes" collection
            await addDoc(collection(database, "notes"), {
              name: fileName,
              url: downloadURL,
              createdAt: new Date(),
            });
          }
        );
      } else {
        console.log("Document picking cancelled or no file selected.");
      }
    } catch (error) {
      setUploading(false);
      console.error("Error picking document:", error);
    }
  };

  // for image upload  and its title

  const pickAndUploadImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!res.canceled && res.assets && res.assets.length > 0) {
      // Set the selected image URI
      setImage(res.assets[0].uri);
      console.log("Selected image URI:", res.assets[0].uri);
    } else {
      console.log("Image picking cancelled.");
    }
  };

  const addImageAndTitle = async () => {
    if (!image || !title) {
      alert("Please provide both title and image.");
      return;
    }

    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const response = await fetch(image);
    const blob = await response.blob();

    const imageRef = ref(storage, "notices/" + fileName);

    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        console.log("file uploaded");
      })
      .then((res) => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          console.log(downloadURL);
          addTitle(downloadURL);
        });
      });

    setLoading(false);
  };

  const handleTitleChange = (text) => {
    setTitle(text); // Directly set the text value to the title state
  };

  const addTitle = async (imageUrl) => {
    try {
      await setDoc(doc(database, "notices", Date.now().toString()), {
        name: title,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error("Error adding title:", error);
      // Handle errors accordingly
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={userData} // Add more items as needed
        keyExtractor={(index) => index.toString()} // Ensure keys are unique and strings
        ListHeaderComponent={() => (
          <View className="flex-row items-center justify-between p-6 rounded-xl">
            <View>
              <Text className="text-sm tracking-widest font-pmedium">
                {isLoggedIn ? "Welcome Back" : "Hello"}
              </Text>
              <Text className="mt-1 text-xl tracking-widest font-psemibold text-primary">
                {user ? user.username : "Guest"}
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/notification")}>
              <Ionicons name="notifications" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        )}
      />
      <View className="px-6 mb-6">
        <Text className="text-lg tracking-widest font-rmedium">Admin Dashboard</Text>
      </View>
      <View className="flex-row items-center justify-between mx-6">
        <TouchableOpacity
          onPress={() => router.push("/admin/students")}
          className="flex-col items-center w-40 py-10 rounded-lg bg-slate-200"
        >
          <FontAwesome6 name="people-group" size={32} color={Colors.primary} />
          <Text className="mt-4 text-lg tracking-widest text-primary font-rmedium">Students</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/admin/teachers")}
          className="flex-col items-center w-40 py-10 rounded-lg bg-slate-200"
        >
          <FontAwesome5 name="chalkboard-teacher" size={32} color={Colors.primary} />
          <Text className="mt-4 text-lg tracking-widest text-primary font-rmedium">Teachers</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-between m-6">
        <TouchableOpacity
          onPress={() => router.push("/admin/results")}
          className="flex-col items-center w-40 py-10 rounded-lg bg-slate-200"
        >
          <Entypo name="bar-graph" size={32} color={Colors.primary} />
          <Text className="mt-4 text-lg tracking-widest text-primary font-rmedium">Results</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/admin/notices")}
          className="flex-col items-center w-40 py-10 rounded-lg bg-slate-200"
        >
          <MaterialIcons name="library-books" size={32} color={Colors.primary} />
          <Text className="mt-4 text-lg tracking-widest text-primary font-rmedium">Notices</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-between mx-6">
        <TouchableOpacity
          onPress={() => router.push("/admin/adminProfile")}
          className="flex-col items-center w-40 px-4 py-10 rounded-lg bg-slate-200"
        >
          <Ionicons name="person" size={32} color={Colors.primary} />
          <Text className="mt-4 text-lg tracking-widest text-primary font-rmedium">Profile</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => router.push("/admin/adminProfile")}
          className="flex-col items-center w-40 py-10 rounded-lg bg-slate-200"
        >
          <Ionicons name="person" size={32} color={Colors.primary} />
          <Text className="mt-4 text-lg tracking-widest text-primary font-rmedium">Profile</Text>
        </TouchableOpacity> */}
      </View>
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
