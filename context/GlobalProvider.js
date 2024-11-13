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
    const checkSession = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          setIsLoggedIn(true);
          setUser(currentUser);
          router.replace("user/home"); // Navigate to home page if user is logged in
        } else {
          setIsLoggedIn(false);
          setUser(null);
          router.replace("/sign-in"); // Redirect to login if no session exists
        }
      } catch (error) {
        console.log("Error checking session:", error);
        setIsLoggedIn(false);
        setUser(null);
        router.replace("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        checkSession();
      } else {
        setIsLoggedIn(false);
        setUser(null);
        router.replace("/sign-in");
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle logout
  const logout = async () => {
    try {
      await firebaseSignOut(auth); // Call Firebase sign out
      Alert.alert("Success", "User logged out successfully");

      setUser(null);
      setIsLoggedIn(false);

      setTimeout(() => {
        router.replace("sign-in");
      }, 100); // 100ms delay to allow root layout to mount
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  // Function to update user information (e.g., avatar, username, etc.)
  const updateUser = async (updatedFields) => {
    try {
      // Ensure that updatedFields is an object with the correct structure
      if (typeof updatedFields !== "object" || Array.isArray(updatedFields)) {
        throw new Error("Invalid input: updatedFields should be an object");
      }

      console.log("Updating user with fields:", updatedFields);

      const updatedUser = await updateUserFields(updatedFields);

      // Check if updatedUser is returned correctly as an object
      console.log("Updated user received:", updatedUser);

      if (updatedUser && typeof updatedUser === "object") {
        setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
      } else {
        console.error(
          "Unexpected response from updateUserFields:",
          updatedUser
        );
        throw new Error("Profile update failed: Invalid response.");
      }

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
