import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchNotices } from "../../lib/FirebaseConfig"; // Your Firebase config
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";

const Search = () => {
  const { query } = useLocalSearchParams();
  // const router = useRouter();
  // console.log(query);
  // const { query } = router.query || {};
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      searchNotices(query);
    }
  }, [query]);

  const searchNotices = async (query) => {
    setLoading(true);
    const notices = await fetchNotices(query); // Fetch all notices
    const filteredNotices = notices.filter(
      (notice) => notice.name.toLowerCase().includes(query.toLowerCase()) // Filter by query
    );
    setResults(filteredNotices);
    setLoading(false);
  };

  return (
    // <SafeAreaView>
    //   <Text className="text-black">{results}</Text>
    // </SafeAreaView>
    <View className="flex-1 p-4 bg-white">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-4" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-4 mx-6 mb-8 rounded-lg bg-slate-200">
              <Text className="text-sm tracking-wide font-pmedium text-primary">
                {item.createdAt
                  ? format(item.createdAt.toDate(), "MMM dd, yyyy")
                  : "No date available"}
              </Text>
              <Text className="mt-2 text-sm tracking-widest text-justify font-pregular">
                {item.name}
              </Text>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-full mt-4 rounded-lg h-60"
                  resizeMode="conatin"
                />
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Search;
