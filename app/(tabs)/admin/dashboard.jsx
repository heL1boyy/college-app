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

// Initialize Firebase

const Home = () => {
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

  const submit = () => {};
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
          <View className="my-6 px-4 space-x-6">
            <View className="flex-row mb-6 bg-red-200 rounded-xl">
              <View className="justify-between items-start  p-4">
                <Text className="font-rmedium text-sm">
                  {isLoggedIn ? "Hello" : "Welcome Back"}
                </Text>
                <Text className="text-2xl font-rsemibold">
                  {user ? user.username : "Guest"}
                </Text>
              </View>
              <TouchableOpacity
                className=" rounded-full p-2 bg-black"
                onPress={() => {}}
                activeOpacity={0.7}
              >
                {/* Add content or icon for the button */}
              </TouchableOpacity>

              {userData.map((user, index) => {
                <Text key={index}> {JSON.stringify(user)}</Text>;
              })}
            </View>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View key={index.toString()} className="px-4">
            <Image
              source={{ uri: item.image }}
              className=" h-[150px] w-[200px]"
            />

            <Text> {item.username}</Text>

            {/* <FormField
              title="Title"
              otherStyles="mt-5"
              placeholder="Enter title"
            /> */}

            {/* <TouchableOpacity
              className=" rounded-full p-2 bg-green-200 w-20 h-20 self-center "
              onPress={() => filepicker()}
              activeOpacity={0.7}
            >
           
            </TouchableOpacity> */}

            <CustomButton
              title="submit"
              handlePress={submit}
              // isLoading={isSubmitting}
              containerStyles="w-full mt-5 border-[#161697]"
            />

            <View style={styles.container}>
              <Button
                title="Upload Document"
                onPress={pickAndUploadDocument}
                disabled={uploading}
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
            <TouchableOpacity
              onPress={() => pickAndUploadImage()}
              className="rounded-full bg-orange-200 w-24 h-24 justify-center self-center"
            >
              {!image ? (
                <Text className="text-center ">upload image</Text>
              ) : (
                <Image
                  source={{ uri: image }}
                  className="w-full h-full rounded-full "
                />
              )}
            </TouchableOpacity>

            {/* title for that image  */}

            <View>
              <TextInput
                onChangeText={handleTitleChange}
                placeholder="title"
                className=" bg-gray-400 p-2 rounded-md border-2"
              />
            </View>

            <TouchableOpacity
              disabled={loading}
              onPress={() => addImageAndTitle()}
              className=" p-3 bg-orange-500"
            >
              {loading ? (
                <ActivityIndicator size={"large"} color={"white"} />
              ) : (
                <Text> add </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  uploadInfo: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default Home;
