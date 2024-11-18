import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
// import { icons } from "../../../constants";
import { icons } from "../../../../constants";

import StudentInfo from "../../../../components/ProfleComponents/StudentInfo";
import AboutSection from "../../../../components/ProfleComponents/AboutSection";
import ContactSection from "../../../../components/ProfleComponents/ContactSection";
import HeaderComponent from "../../../../components/ProfleComponents/HeaderComponent";
import { StatusBar } from "expo-status-bar";
import Detail from "../../../../components/ProfleComponents/Detail";

const Profile = () => {
  const { user } = useGlobalContext();
  // console.log("User object:", user);
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <FlatList
        data={user ? [user] : []} // Only pass the user if it exists
        keyExtractor={(index) => index.toString()}
        className="h-full bg-main_background"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() =>
          user && <HeaderComponent icons={icons} users={user} />
        }
        renderItem={({ item, index }) =>
          item && ( // Only render sections if the item exists
            <View key={index} className="p-0">
              <Detail />
              {/* <StudentInfo item={item} /> */}
              {/* <AboutSection item={item} /> */}
              {/* <ContactSection item={item} /> */}
            </View>
          )
        }
      />
      <StatusBar backgroundColor="#000" />
    </SafeAreaView>
  );
};

export default Profile;
