import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { updateUserFieldByAccountId } from "../../lib/appwrite";

const ContactSection = ({ item = {} }) => {
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
      // Log accountId and updatedData
      console.log("Account ID:", item.accountId);
      console.log("Updated Data:", { contactNumber, email, address });

      // Update user details
      await updateUserFieldByAccountId(item.accountId, {
        contactNumber,
        email,
        address,
      });
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  };
  return (
    <View className="bg-blue-100 p-4 rounded-xl mt-2">
      <View className="flex-row justify-between items-center ">
        <Text className="text-xl font-semibold">Contact</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text>{isEditing ? "Cancel" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row py-4 gap-4">
        <View className="flex ">
          <Text className="mb-2">Contact no</Text>
          <Text className={`mb-2 ${isEditing ? "mt-2" : ""}`}>Email</Text>
          <Text className={`mb-2 ${isEditing ? "mt-2" : ""}`}>Address</Text>
        </View>

        <View className="flex ">
          {isEditing ? (
            <>
              <TextInput
                className="border border-gray-300 px-1 mb-2 rounded"
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholder="Enter Contact number"
                keyboardType="numeric"
              />
              <TextInput
                className="border border-gray-300 px-1 mb-2 rounded"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                keyboardType="email-address"
              />
              <TextInput
                className="border border-gray-300 px-1 mb-2 rounded"
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
              />
              <Button title="Save" onPress={handleSave} />
            </>
          ) : (
            <>
              <Text className="mb-2">
                {contactNumber ? contactNumber : "Enter your number"}
              </Text>
              <Text className="mb-2">{email ? email : "Enter your email"}</Text>
              <Text>{address || "Enter your address"}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ContactSection;
