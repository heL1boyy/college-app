import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const DATA = [
  { id: "1", title: "Slide 1", color: "#f44336" },
  { id: "2", title: "Slide 2", color: "#2196f3" },
  { id: "3", title: "Slide 3", color: "#4caf50" },
  { id: "4", title: "Slide 4", color: "#ffeb3b" },
];

const HorizontalSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.color }]}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {DATA.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${i}`}
              style={[styles.dot, { transform: [{ scale: dotScale }] }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
});

export default HorizontalSlider;
