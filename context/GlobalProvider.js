import { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  signOut as appwriteSignOut,
  updateUserFieldByAccountId,
  uploadImage,
} from "../lib/appwrite";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { Alert } from "react-native";
import { router } from "expo-router";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await getCurrentUser();

        if (res) {
          setIsLoggedIn(true);
          setUser(res);
          router.replace("user/home"); // Redirect if session exists
        } else {
          setIsLoggedIn(false);
          setUser(null);
          router.replace("/sign-in"); // Stay on login if no session
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
        setUser(null);
        router.replace("/sign-in"); // Redirect to login if error
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Function to handle logout
  const logout = async () => {
    try {
      await appwriteSignOut();
      Alert.alert("Success", "User logged out successfully");
      router.replace("sign-in");

      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Function to update user information (e.g., avatar, username, etc.)
  const updateUser = async (updatedFields) => {
    try {
      if (!user || !user.accountId) {
        throw new Error("User not found");
      }

      // Update user fields by account ID
      const updatedUser = await updateUserFieldByAccountId(
        user.accountId,
        updatedFields
      );

      // Update user in local state
      setUser(updatedUser);

      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      Alert.alert("Error", "An error occurred while updating the profile");
    }
  };

  // Function to handle image upload and update the user's avatar
  const updateAvatar = async (imageUri) => {
    try {
      const { imageUrl } = await uploadImage(imageUri);

      await updateUser({ avatar: imageUrl });

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
        updateUser, // Pass updateUser function to the context
        updateAvatar, // Pass updateAvatar function to the context
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
