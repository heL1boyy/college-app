import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { updateUserFieldByAccountId } from "../../lib/appwrite"; // Updated to match your function

const AboutSection = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(item.dateOfBirth || "");
  const [gender, setGender] = useState(item.gender || "");

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // Log accountId and updatedData
      console.log("Account ID:", item.accountId);
      console.log("Updated Data:", { dateOfBirth, gender });

      // Update user details
      await updateUserFieldByAccountId(item.accountId, {
        dateOfBirth,
        gender,
      });
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  };

  return (
    <View className="bg-blue-100 p-4 rounded-xl mt-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-semibold">About</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text>{isEditing ? "Cancel" : "Edit"}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row py-4 gap-4">
        <View className="flex">
          <Text className="mb-2">Date of Birth</Text>
          <Text className={`${isEditing ? "mt-2" : ""}`}>Gender</Text>
        </View>
        <View className="flex">
          {isEditing ? (
            <>
              <TextInput
                className="border border-gray-300 px-1 mb-2 rounded"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="Enter date of birth"
              />
              <TextInput
                className="border border-gray-300 px-1 mb-2 rounded"
                value={gender}
                onChangeText={setGender}
                placeholder="Enter gender"
              />
              <Button title="Save" onPress={handleSave} />
            </>
          ) : (
            <>
              <Text className="mb-2">{dateOfBirth}</Text>
              <Text>{gender}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default AboutSection;
