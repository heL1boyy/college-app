import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getAuth,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8KMwg8pzx9ixKuhjtVBLhi4lQMAsMMcI",
  authDomain: "college-application-ef4f2.firebaseapp.com",
  projectId: "college-application-ef4f2",
  storageBucket: "college-application-ef4f2.appspot.com",
  messagingSenderId: "337652403612",
  appId: "1:337652403612:web:131630b554f94ac0ebcc59",
  measurementId: "G-1CFDYCHC2Y",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Use `initializeAuth` for React Native to fix persistence issues
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const firestore = getFirestore(app);

// User registration
export const createUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    // Prepare user data fields
    const userFields = {
      email,
      username: userData.username || "",
      address: userData.address || "",
      contactNumber: userData.contactNumber || "",
      department: userData.department || "",
      semester: userData.semester || "",
      yearOfJoining: userData.yearOfJoining || "",
      dateOfBirth: userData.dateOfBirth || "",
      gender: userData.gender || "",
      profileImageUrl: "",
    };

    // Save user data to Firestore
    await setDoc(doc(db, "users", uid), userFields);

    return { uid, ...userFields };
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message);
  }
};

// User login
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message);
  }
};

// Function to fetch user data***************************************************
export const fetchUserData = async () => {
  try {
    const userQuery = query(collection(db, "users"));
    const querySnapshot = await getDocs(userQuery);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to upload PDF document
export const uploadPDFDocument = async (
  setUploading,
  setUploadProgress,
  setUploadedUrl
) => {
  try {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled && result.uri) {
      const fileUri = result.uri;
      const fileName = result.name;

      setUploading(true);

      // Create a reference to the file in Firebase Storage
      const fileRef = ref(storage, `notes/${fileName}`);

      // Convert the file to a blob
      const response = await fetch(fileUri);
      const blob = await response.blob();

      // Start the file upload
      const uploadTask = uploadBytesResumable(fileRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setUploading(false);
          console.error("Upload failed:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadedUrl(downloadURL);
          setUploading(false);

          // Save metadata to Firestore
          await addDoc(collection(database, "notes"), {
            name: fileName,
            url: downloadURL,
            createdAt: new Date(),
          });
        }
      );
    } else {
      console.log("Document picking cancelled.");
    }
  } catch (error) {
    setUploading(false);
    console.error("Error picking document:", error);
  }
};

// Function to upload image and title
export const addImageWithTitle = async (image, title, setLoading) => {
  try {
    setLoading(true);
    const fileName = `${Date.now()}.jpg`;
    const response = await fetch(image);
    const blob = await response.blob();

    const imageRef = ref(storage, `notices/${fileName}`);
    await uploadBytes(imageRef, blob);

    const downloadURL = await getDownloadURL(imageRef);
    await setDoc(doc(db, "notices", Date.now().toString()), {
      name: title,
      imageUrl: downloadURL,
    });
  } catch (error) {
    console.error("Error adding title and image:", error);
  } finally {
    setLoading(false);
  }
};

// fetch notics
export const fetchNotices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "notices"));
    const notices = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notices;
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
};

// Fetch current user data
export const getCurrentUser = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("No authenticated user found");

    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (!userDoc.exists()) throw new Error("User data not found");

    return { uid: currentUser.uid, ...userDoc.data() };
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    throw new Error(error.message);
  }
};

// Upload image to Firebase Storage
export const uploadImage = async (fileUri) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("No authenticated user found");

    const response = await fetch(fileUri);
    const blob = await response.blob();

    const storageRef = ref(
      storage,
      `images/${Date.now()}_${fileUri.split("/").pop()}`
    );
    await uploadBytes(storageRef, blob);

    const imageUrl = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", currentUser.uid), {
      profileImageUrl: imageUrl,
    });

    console.log("Image uploaded and URL saved:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw new Error(error.message);
  }
};

// Update user fields
// Update user fields function
export const updateUserFields = async (updatedFields) => {
  try {
    // Assuming you have a user reference setup correctly in Firestore
    const user = getCurrentUser();
    const userRef = doc(db, "users", user.uid);

    // Update document
    await updateDoc(userRef, updatedFields);

    console.log("Fields updated in Firestore:", updatedFields);

    return updatedFields; // Return the updated fields
  } catch (error) {
    console.error("Error updating user fields in Firestore:", error);
    throw new Error("Failed to update user fields");
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw new Error(error.message);
  }
};

// Auth state change listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
