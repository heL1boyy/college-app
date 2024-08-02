import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { database } from "../../lib/FirebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";

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

  return (
    <SafeAreaView>
      <FlatList
        data={userData} // Add more items as needed
        keyExtractor={(item) => item.userData} // Ensure keys are unique and strings
        renderItem={({ item, index }) => (
          <View>
            <Image
              key={index}
              source={{ uri: item.image }}
              className=" h-[150px] w-[200px]"
            />

            <Text> {item.username}</Text>
          </View>
        )}
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
                className=" rounded-full p-2"
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
      />
    </SafeAreaView>
  );
};

export default Home;
