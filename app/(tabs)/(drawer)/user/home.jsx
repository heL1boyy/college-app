import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Header from "../../../../components/HomeComponents/header";
import Class from "../../../../components/HomeComponents/class";
import PendingTask from "../../../../components/HomeComponents/PendingTask";
import Attendance from "../../../../components/HomeComponents/attendance";
import Notice from "../../../../components/HomeComponents/Notice";
import { useGlobalContext } from "../../../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const [query, setQuery] = useState(""); // State to hold the search query

  const handleSearch = () => {
    if (query.trim()) {
      console.log("Searching for:", query); // Log search query for now
      // You can replace this with the actual logic to push to the search page if needed
      router.push(`/search/${query} ` + query);
    }
  };

  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header user={user} />

        {/* Search Input directly in Home component */}
        <View className="px-6 pt-1 pb-3">
          <View className="border border-gray-600 w-full h-12 px-4 rounded-xl flex-row items-center">
            <TextInput
              className="text-base text-primary flex-1 font-pregular tracking-widest"
              value={query}
              placeholder="Search notices, tasks, etc."
              placeholderTextColor="#7b7b8b"
              onChangeText={setQuery}
            />
            <TouchableOpacity onPress={handleSearch} className="ml-2">
              <Text className="text-blue-500">Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Display search query for demo */}
        <View className="px-6 pt-3 pb-3">
          <Text className="text-lg">Search Query: {query}</Text>
        </View>

        <Class />
        <PendingTask />
        <Notice />
        <Attendance />
        <StatusBar backgroundColor="#000" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
