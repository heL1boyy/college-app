
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
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import { Link, router } from "expo-router";

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

          <View className="flex-row items-center justify-between p-5 rounded-xl">

            <View>
              <Text className="text-sm tracking-widest font-pmedium text-primary">
                {isLoggedIn ? "Welcome Back" : "Hello"}
              </Text>
              <Text className="text-xl tracking-widest font-psemibold text-primary">
                {user ? user.username : "Guest"}
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
          <View key={index.toString()} className="p-5">
            <View className="bg-green-400">
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-full"
              />
              <Text>
                {item.username}
              </Text>

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
                handlePress={submit}
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
              <TouchableOpacity
                onPress={() => pickAndUploadImage()}
              >
                {!image ? (
                  <Text className="w-32 px-4 py-2 text-center text-white rounded-lg bg-primary">Upload Image</Text>
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
                    <Text className="px-4 py-2 text-center text-white rounded-lg bg-primary">Add Title</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>


          </View>
        )}
      />
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
