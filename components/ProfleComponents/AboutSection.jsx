import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { updateUserFieldByAccountId } from "../../lib/appwrite"; // Updated to match your function

const AboutSection = ({ item = {} }) => {
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
      if (!item.accountId) throw new Error("No account ID found.");
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
    <View className="p-5 mb-6 bg-slate-200 rounded-xl">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-rmedium">About</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text className="text-sm font-rmedium text-primary">{isEditing ? "Cancel" : "Edit"}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-4 pt-4">
        <View className="flex">
          <Text className="mb-3 tracking-wider font-rregular">Date of Birth:</Text>
          <Text className={`font-rregular tracking-wider ${isEditing ? "mt-2" : ""}`}>Gender:</Text>
        </View>
        <View className="flex">
          {isEditing ? (
            <>
              <TextInput
                className="px-2 mt-[-2px] mb-3 border border-gray-300 rounded"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="Enter date of birth"
              />
              <TextInput
                className="px-2 mb-3 border border-gray-300 rounded"
                value={gender}
                onChangeText={setGender}
                placeholder="Enter gender"
              />
              <Button title="Save" onPress={handleSave} />
            </>
          ) : (
            <>
              <Text className="mb-4 tracking-wider ">{dateOfBirth}</Text>
              <Text className="tracking-wider">{gender}</Text>
              {/* <Text className="mb-2">
                {dateOfBirth ? dateOfBirth : "Enter your date of birth"}
              </Text>
              <Text>{gender ? gender : "Enter your gender"}</Text> */}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default AboutSection;
