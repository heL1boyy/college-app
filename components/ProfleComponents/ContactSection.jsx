import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
// import { updateUserFieldByAccountId } from "../../lib/appwrite";
import CustomButton from "../CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const ContactSection = ({ item = {} }) => {
  const { updateUser } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [contactNumber, setContactNumber] = useState(item.contactNumber || "");
  const [email, setEmail] = useState(item.email || "");
  const [address, setAddress] = useState(item.address || "");

  useEffect(() => {
    // Update fields when item changes
    setContactNumber(item.contactNumber || "");
    setEmail(item.email || "");
    setAddress(item.address || "");
  }, [item]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const updatedFields = {
        contactNumber,
        email,
        address,
      };

      console.log("Fields to update:", updatedFields);

      await updateUser(updatedFields);
      console.log("Data saved successfully");
      setIsEditing(false); // Exit editing mode after successful save
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  };

  return (
    <View className="p-5 mb-4 rounded-lg bg-slate-200">
      <View className="flex-row items-start">
        <View className="w-[34%]">
          <Text className="mb-4 tracking-wider font-rregular">Contact No:</Text>
          <Text
            className={`mb-4 font-rregular tracking-wider ${isEditing ? "mt-2" : ""
              }`}
          >
            Email:
          </Text>
          <Text
            className={`font-rregular tracking-wider ${isEditing ? "mt-2" : ""
              }`}
          >
            Address:
          </Text>
        </View>
        <View className="w-[66%]">
          {isEditing ? (
            <>
              <TextInput
                className="px-2 mb-4 border border-gray-300 rounded"
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholder="Enter Contact number"
                keyboardType="numeric"
              />
              <TextInput
                className="px-2 mb-4 border border-gray-300 rounded"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                keyboardType="email-address"
              />
              <TextInput
                className="px-2 mb-4 border border-gray-300 rounded"
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
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
              <Text className="mb-5 tracking-wider">{contactNumber}</Text>
              <Text className="mb-5 tracking-wider">{email}</Text>
              <Text className="tracking-wider">{address}</Text>
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

export default ContactSection;
