import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../CustomButton";
import { TouchableOpacity } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";

const AboutSection = () => {
  const { user } = useGlobalContext();

  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user?.email || "");

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View className="p-5 mx-6 mb-10 rounded-lg bg-slate-200">
      <View className="flex-row items-start">
        <View className="w-[34%]">
          <Text className="mb-4 tracking-wider font-rmedium">Contact No:</Text>
          <Text
            className={`mb-4 font-rmedium tracking-wider ${
              isEditing ? "mt-2" : ""
            }`}
          >
            Email:
          </Text>
          <Text
            className={`font-rmedium tracking-wider ${isEditing ? "mt-2" : ""}`}
          >
            Address:
          </Text>
        </View>
        <View className="w-[66%]">
          {isEditing ? (
            <>
              <TextInput
                className="px-2 mt-[-2px] mb-4 border border-gray-300 rounded"
                // value={username}
                // onChangeText={setUsername}
                placeholder="Enter Contact No."
              />
              <TextInput
                className="px-2 mb-4 border border-gray-300 rounded"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
              />
              <TextInput
                className="px-2 mb-4 border border-gray-300 rounded"
                // value={email}
                // onChangeText={setEmail}
                placeholder="Enter Address"
              />
              <CustomButton
                title="Save Details"
                // onPress={handleSave}
                containerStyles={
                  "py-2 border rounded-lg border-[#f5f5f5] bg-blue-500"
                }
                textStyles={"text-base text-center text-white"}
              />
            </>
          ) : (
            <>
              <Text className="mb-4 tracking-wider font-rregular">
                {user?.contact}
              </Text>
              <Text className="mb-4 tracking-wider font-rregular">
                {user?.email}
              </Text>
              <Text className="tracking-wider font-rregular">
                {user?.address}
              </Text>
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
