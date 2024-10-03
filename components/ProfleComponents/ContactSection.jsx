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
    <View className="p-5 mb-6 bg-slate-200 rounded-xl">
      <View className="flex-row items-center justify-between ">
        <Text className="text-lg font-rmedium">Contact</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text className="text-sm font-rmedium text-primary">{isEditing ? "Cancel" : "Edit"}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-4 pt-4">
        <View className="flex ">
          <Text className="mb-3 tracking-wider font-rregular">Contact No:</Text>
          <Text className={`font-rregular tracking-wider mb-3 ${isEditing ? "mt-2" : ""}`}>Email:</Text>
          <Text className={`font-rregular tracking-wider ${isEditing ? "mt-2" : ""}`}>Address:</Text>
        </View>
        <View className="flex ">
          {isEditing ? (
            <>
              <TextInput
                className="px-2 mt-[-2px] mb-3 border border-gray-300 rounded"
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholder="Enter Contact number"
                keyboardType="numeric"
              />
              <TextInput
                className="px-2 mb-3 border border-gray-300 rounded"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                keyboardType="email-address"
              />
              <TextInput
                className="px-2 mb-3 border border-gray-300 rounded"
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
              />
              <Button title="Save" onPress={handleSave} />
            </>
          ) : (
            <>
              <Text className="mb-4 tracking-wider">{contactNumber}</Text>
              <Text className="mb-4 tracking-wider">{email}</Text>
              <Text className="tracking-wider">{address}</Text>
              {/* <Text className="mb-2">
                {contactNumber ? contactNumber : "Enter your number"}
              </Text>
              <Text className="mb-2">{email ? email : "Enter your email"}</Text>
              <Text>{address || "Enter your address"}</Text> */}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ContactSection;
