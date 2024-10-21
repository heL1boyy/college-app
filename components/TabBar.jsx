
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";

import React, { useEffect, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import Foundation from "@expo/vector-icons/Foundation";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    home: (props) => (
      <Ionicons name="home" size={30} color="black" {...props} />
    ),
    adminDashboard: (props) => (
      <Ionicons name="home" size={30} color="black" {...props} />
    ),
    teacherDashboard: (props) => (
      <Ionicons name="home" size={30} color="black" {...props} />
    ),
    // students: (props) => (
    //   <FontAwesome6 name="people-line" size={30} color="black" {...props} />
    // ),
    students: (props) => (
      <FontAwesome6 name="people-group" size={30} color="black" {...props} />
    ),
    teachers: (props) => (
      <FontAwesome5 name="chalkboard-teacher" size={28} color="black" {...props} />
    ),
    teachers: (props) => (
      <FontAwesome6 name="person-chalkboard" size={30} color="black" {...props} />
    ),
    attendance: (props) => (
      <Foundation name="graph-bar" size={30} color="black" {...props} />
    ),
    attendances: (props) => (
      <Foundation name="graph-bar" size={30} color="black" {...props} />
    ),
    // attendance: (props) => <SimpleLineIcons name="graph" size={30} color="black" {...props} />,
    task: (props) => (
      <Feather name="book-open" size={30} color="black" {...props} />
    ),
    tasks: (props) => (
      <Feather name="book-open" size={30} color="black" {...props} />
    ),
    // task: (props) => <FontAwesome5 name="book-open" size={30} color="black" {...props} />,
    notice: (props) => (
      <MaterialIcons name="library-books" size={30} color="black" {...props} />
    ),
    notices: (props) => (
      <MaterialIcons name="library-books" size={30} color="black" {...props} />
    ),
    profile: (props) => (
      <Ionicons name="person" size={30} color="black" {...props} />
    ),
    adminProfile: (props) => (
      <Ionicons name="person" size={30} color="black" {...props} />
    ),
    teacherProfile: (props) => (
      <Ionicons name="person" size={30} color="black" {...props} />
    ),
  };

  const primaryColor = "#6734d8";
  const whiteColor = "#f5f5f5";

  const animatedValues = state.routes.map(
    () => useRef(new Animated.Value(0)).current
  );

  const animateTab = (index, toValue) => {
    Animated.timing(animatedValues[index], {
      toValue,
      duration: 360,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    state.routes.forEach((route, index) => {
      const isFocused = state.index === index;
      animateTab(index, isFocused ? 1 : 0);
    });
  }, [state.index]);

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const IconComponent = icons[route.name];

        const animatedBackgroundColor = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: ["transparent", "white"],
        });

        const animatedTransform = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -16],
        });

        return (
          <TouchableOpacity
            key={route.name}
            style={[
              styles.tabbarItem,
              // isFocused && { borderBottomWidth:2, borderColor: '#000' }
            ]}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: animatedBackgroundColor,
                  transform: [{ translateY: animatedTransform }],
                  shadowColor: isFocused ? "#000" : "transparent",
                  shadowOffset: isFocused
                    ? { width: 4, height: 4 }
                    : { width: 0, height: 0 },
                  shadowOpacity: isFocused ? 0.7 : 0,
                  shadowRadius: isFocused ? 4 : 0,
                },
              ]}
            >
              {IconComponent ? (
                <IconComponent color={isFocused ? primaryColor : whiteColor} />
              ) : (
                <Text style={{ color: "red" }}>No Icon</Text>
              )}
            </Animated.View>

            {/* <Text style={{
              color: isFocused ? whiteColor : "black",
              fontSize: 14
            }}>
              {label}
            </Text> */}

          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6734d8",
    paddingTop: 4,
    paddingHorizontal: 8,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 10 },
    // shadowRadius: 10,
    // shadowOpacity: 0.1
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 10,
    paddingBottom: 16,
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

export default TabBar;
