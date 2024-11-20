import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { fetchNotices } from "../../lib/FirebaseConfig"; // Your Firebase config

const Search = () => {
  const router = useRouter();
  const { query } = router.query || {}; // Get the query parameter from URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      searchNotices(query);
    }
  }, [query]);

  const searchNotices = async (query) => {
    setLoading(true);
    const notices = await fetchNotices(); // Fetch all notices
    const filteredNotices = notices.filter(
      (notice) => notice.name.toLowerCase().includes(query.toLowerCase()) // Filter by query
    );
    setResults(filteredNotices);
    setLoading(false);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-4" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center border border-gray-200 rounded-md p-4 mb-4">
              <Text className="text-lg font-medium">{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Search;
