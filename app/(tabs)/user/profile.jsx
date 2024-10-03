import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "../../../constants";

import StudentInfo from "../../../components/ProfleComponents/StudentInfo";
import AboutSection from "../../../components/ProfleComponents/AboutSection";
import ContactSection from "../../../components/ProfleComponents/ContactSection";
import HeaderComponent from "../../../components/ProfleComponents/HeaderComponent";

const Profile = () => {
  const { user } = useGlobalContext();
  // console.log("User object:", user);
  return (
    <SafeAreaView className="bg-main_background mb-14">
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={[user]}
          keyExtractor={(index) => index}
          className="h-full bg-main_background"
          ListHeaderComponent={() => (
            <HeaderComponent icons={icons} users={user} />
          )}
          //main components rendering
          renderItem={({ item, index }) => (
            <View key={index} className="p-4">
              {/* student info */}
              <StudentInfo item={item} />

              {/* about */}
              <AboutSection item={item} />

              {/* contact details */}

              <ContactSection item={item} />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
