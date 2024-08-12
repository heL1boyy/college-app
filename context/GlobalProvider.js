import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, signOut as appwriteSignOut } from "../lib/appwrite";
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
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const logout = async () => {
    try {
      if (user?.isAdmin) {
        // Admin (Firebase) logout
        const auth = getAuth();
        await firebaseSignOut(auth);
        Alert.alert("Success", "Admin logout in successfully");
        router.replace("sign-in");
      } else {
        // Regular user (Appwrite) logout
        await appwriteSignOut();
        Alert.alert("Success", "User logout in successfully");
        router.replace("sign-in");
      }

      // Clear user data in global state
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
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
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
