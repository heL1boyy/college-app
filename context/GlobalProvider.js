import { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  signOutUser as firebaseSignOut, // Use this as the signOut function
  updateUserFields,
  uploadImage,
} from "../lib/FirebaseConfig";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Alert } from "react-native";
import { useRouter } from "expo-router";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);

      try {
        if (firebaseUser) {
          const userDoc = await getCurrentUser();

          if (userDoc) {
            setIsLoggedIn(true);
            setUser(userDoc);
            router.replace("user/home");
          } else {
            setIsLoggedIn(false);
            setUser(null);
            router.replace("/sign-in");
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
          router.replace("/sign-in");
        }
      } catch (error) {
        console.log("Error checking session:", error);
        setIsLoggedIn(false);
        setUser(null);
        router.replace("/sign-in");
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle logout
  // Function to handle logout
  const logout = async () => {
    try {
      await firebaseSignOut(auth); // Sign out from Firebase
      setUser(null);
      setIsLoggedIn(false);

      // Display success alert
      Alert.alert(
        "Logout Successful",
        "You have been logged out successfully.",
        [{ text: "OK" }]
      );

      // Redirect to the sign-in page
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Failed", "An error occurred while logging out");
    }
  };

  // Function to update user information (e.g., avatar, username, etc.)
  // Function to update user information (e.g., avatar, username, etc.)
  const updateUser = async (updatedFields) => {
    try {
      // Validate that updatedFields is a correct object
      if (typeof updatedFields !== "object" || Array.isArray(updatedFields)) {
        throw new Error("Invalid input: updatedFields should be an object");
      }

      console.log("Updating user with fields:", updatedFields);

      // Call updateUserFields and wait for the response
      const updatedUser = await updateUserFields(updatedFields);

      // Check if the response is an object
      if (updatedUser && typeof updatedUser === "object") {
        // Merge updated fields into the current user context state safely
        setUser((prevUser) => {
          // If prevUser is null, initialize it as an empty object to avoid errors
          if (!prevUser) return { ...updatedFields };
          return { ...prevUser, ...updatedFields };
        });
      } else {
        console.error(
          "Unexpected response from updateUserFields:",
          updatedUser
        );
        throw new Error("Profile update failed: Invalid response.");
      }

      // Notify the user of a successful update
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  // Function to handle image upload and update the user's avatar
  const updateAvatar = async (imageUri) => {
    try {
      const { imageUrl } = await uploadImage(imageUri);

      await updateUser({ profileImageUrl: imageUrl });

      Alert.alert("Success", "Avatar updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      Alert.alert("Error", "An error occurred while uploading the avatar");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        logout,
        updateUser,
        updateAvatar,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
