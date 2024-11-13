import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
// import { updateUserFields } from "../../lib/FirebaseConfig"; // Updated to match your function
import CustomButton from "../CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const AboutSection = ({ item = {} }) => {
  const { updateUser } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(item.dateOfBirth || "");
  const [gender, setGender] = useState(item.gender || "");

  useEffect(() => {
    setDateOfBirth(item.dateOfBirth || "");
    setGender(item.gender || "");
  }, [item]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      if (!item.uid) throw new Error("No account ID found.");
      // Log accountId and updatedData
      console.log("Account ID:", item.uid);
      console.log("Updated Data:", { dateOfBirth, gender });

      // Update user details
      await updateUser(item.uid, {
        dateOfBirth,
        gender,
      });
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  };

  return (
    <View className="p-5 mb-8 rounded-lg bg-slate-200">
      <View className="flex-row items-start">
        <View className="w-[36%]">
          <Text className="mb-4 tracking-wider font-rregular">
            Date of Birth:
          </Text>
          <Text
            className={`font-rregular tracking-wider ${
              isEditing ? "mt-2" : ""
            }`}
          >
            Gender:
          </Text>
        </View>
        <View className="w-[64%]">
          {isEditing ? (
            <>
              <TextInput
                className="px-2 mt-[-2px] mb-4 border border-gray-300 rounded"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="Enter date of birth"
              />
              <TextInput
                className="px-2 mb-4 border border-gray-300 rounded"
                value={gender}
                onChangeText={setGender}
                placeholder="Enter gender"
              />
              <CustomButton
                title="Save Details"
                onPress={handleSave}
                containerStyles={
                  "py-2 border rounded-lg border-[#f5f5f5] bg-blue-500"
                }
                textStyles={"text-base text-center text-white"}
              />
            </>
          ) : (
            <>
              <Text className="mb-5 tracking-wider ">{dateOfBirth}</Text>
              <Text className="tracking-wider">{gender}</Text>
            </>
          )}
        </View>
      </View>

      <View className="mt-4">
        <TouchableOpacity
          onPress={handleEdit}
          className="py-2 border rounded-lg border-primary"
        >
          <Text className="text-base text-center text-primary">
            {isEditing ? "Cancel" : "Edit Details"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutSection;
