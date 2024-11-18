import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../CustomButton";
import { TouchableOpacity } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";

const Details = () => {

  const { user } = useGlobalContext();

  const [isEditing, setIsEditing] = useState(false);

  const [contact, setContact] = useState(user?.contact || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View className="p-5 mx-6 my-8 bg-slate-200 rounded-xl">
      <View className="flex-row items-center mb-4">
        <Text className={"font-rmedium tracking-wider"}>Contact No:</Text>
        {isEditing ? <TextInput
          className="px-2 ml-2 border border-gray-300 rounded w-[210px]"
          value={contact}
          onChangeText={setContact}
          placeholder="Enter Contact No"
        /> : <Text className="ml-2 tracking-wider font-rregular">
          {user?.contact}
        </Text>}
      </View>
      <View className="flex-row items-center">
        <Text className={"font-rmedium tracking-wider"}>Email:</Text>
        {isEditing ? <TextInput
          className="w-[250px] px-2 ml-2 border border-gray-300 rounded"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Degree"
        /> : <Text className="ml-2 tracking-wider font-rregular">
          {user?.email}
        </Text>}
      </View>
      {isEditing ? <CustomButton
        title="Save Details"
        // onPress={handleSave}
        containerStyles={
          "py-3 mt-4 border rounded-lg border-[#f5f5f5] bg-blue-500"
        }
        textStyles={"text-base text-center text-white"}
      /> : <></>}
      <TouchableOpacity
        onPress={handleEdit}
        className="py-2 mt-4 border rounded-lg border-primary"
      >
        <Text className="text-base text-center text-primary">
          {isEditing ? "Cancel" : "Edit Details"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
