import { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  signOutUser as firebaseSignOut,
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

            // Redirect based on user type
            if (userDoc.isAdmin) {
              router.replace("/admin/adminDasboard");
            } else if (userDoc.isTeacher) {
              router.replace("/teacher/teacherDashboard"); // Teacher-specific route
            } else {
              router.replace("/user/home"); // Regular user route
            }
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

  // Handle logout
  const logout = async () => {
    try {
      await firebaseSignOut(auth); // Sign out from Firebase
      setUser(null);
      setIsLoggedIn(false);

      Alert.alert(
        "Logout Successful",
        "You have been logged out successfully.",
        [{ text: "OK" }]
      );
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Failed", "An error occurred while logging out");
    }
  };

  // Update user data
  const updateUser = async (updatedFields) => {
    try {
      if (typeof updatedFields !== "object" || Array.isArray(updatedFields)) {
        throw new Error("Invalid input: updatedFields should be an object");
      }

      console.log("Updating user with fields:", updatedFields);

      const updatedUser = await updateUserFields(updatedFields);

      if (updatedUser && typeof updatedUser === "object") {
        setUser((prevUser) => ({ ...prevUser, ...updatedFields }));
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

  // Handle image upload and avatar update
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
