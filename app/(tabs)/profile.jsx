import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "../../constants";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView>
      <FlatList
        // data={[{ id: 1 }]}
        // keyExtractor={(item) => item.$id}
        // renderItem={({ item }) => <Text className=" text-3xl"> {item.id}</Text>}
        className="h-full bg-white"
        ListHeaderComponent={() => (
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
            <View className="flex-row items-center mb-6">
              <View className="rounded-full border border-black w-20 h-20 mr-4">
                <Image
                  // source={{ uri: 'https://example.com/profile-picture.png' }} // replace with your profile picture URI
                  className=" rounded-full border border-black "
                />
              </View>

              <View>
                <Text className="text-lg font-semibold">{user.username}</Text>
                <Text className="text-gray-600">{user.accountId}</Text>
              </View>
            </View>
            {/* info */}
            <View className="p-6 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg ring-1 ring-offset-2  ring-orange-500 shadow-2xl  shadow-blue-500">
              <Text className="text-black mb-2">
                <Text className="font-semibold">DEPARTMENT: </Text>
                {user?.department}
              </Text>
              <Text className="text-black mb-2">
                <Text className="font-semibold">SEMESTER: </Text>{" "}
                {user.semester}
              </Text>
              <Text className="text-black mb-2">
                <Text className="font-semibold">CURRENT CGPA: </Text>
                7.5
              </Text>
              <Text className="text-black">
                <Text className="font-semibold">ACADEMIC YEAR: </Text>
                {user.yearOfJoining}
              </Text>
            </View>

            {/* about */}
            <View className="flex-row justify-between items-center mt-6">
              <Text className="text-xl font-semibold">About</Text>
              <TouchableOpacity>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row py-4 gap-4">
              <View className="flex ">
                <Text className="mb-2">Date of Birth</Text>
                <Text>Gender</Text>
              </View>
              <View className="flex ">
                <Text className="mb-2">{user.dateOfBirth}</Text>
                <Text>{user.gender}</Text>
              </View>
            </View>

            {/* contact details */}
            <View className="flex-row justify-between items-center ">
              <Text className="text-xl font-semibold">Contact</Text>
              <TouchableOpacity>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row py-4 gap-4">
              <View className="flex ">
                <Text className="mb-2">Contact no</Text>
                <Text className="mb-2">Email</Text>
                <Text>Address</Text>
              </View>
              <View className="flex ">
                <Text className="mb-2">{user.contactNumber}</Text>
                <Text className="mb-2">{user.email}</Text>
                <Text>I{user.address}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
