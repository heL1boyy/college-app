import { Image, View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const HeaderComponent = ({ icons, users }) => {
  const { setUser, setIsLoggedIn, logout } = useGlobalContext();
  // const logout = async () => {
  //   await signOut();
  //   setUser(null);
  //   setIsLoggedIn(false);
  //   Alert.alert("Success", "User logout in successfully");
  //   router.replace("sign-in");
  // };
  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-semibold">My Profile</Text>
        <TouchableOpacity onPress={logout}>
          <Image
            source={icons.logout} // replace with your icon URI
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center ">
        <View className="rounded-full   w-20 h-20 mr-4">
          <Image
            source={{ uri: users?.avatar }}
            className="rounded-full w-20 h-20"
          />
        </View>
        <View>
          <Text className="text-lg font-semibold">{users?.username}</Text>
          <Text className="text-gray-600">{users?.accountId}</Text>
        </View>
        <TouchableOpacity className="ml-2">
          <View className="bg-blue-500 rounded-full p-2">
            <Text className="text-white">Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderComponent;
