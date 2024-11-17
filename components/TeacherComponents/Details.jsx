import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../CustomButton";
import { TouchableOpacity } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";

const Details = () => {

  const { user } = useGlobalContext();

  const [isEditing, setIsEditing] = useState(false);

  const [addDetails, setAddDetails] = useState(false)

  const [degree, setDegree] = useState(user?.degree || "");
  const [availability, setAvailability] = useState(user?.availability || "");
  const [experience, setExperience] = useState(user?.experience || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");


  const handleAddDetils = () => {
    setAddDetails(!addDetails);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (

    <>

      {/* add details section */}

      <View className="m-6">
        {addDetails ? <View className="px-5 py-6 mb-4 rounded-lg bg-slate-200">
          <View className="flex-row items-center justify-between mb-4">
            <Text className={"font-rmedium tracking-wider"}>Degree:</Text>
            <TextInput
              className="px-2 border border-gray-300 rounded w-60"
              value={degree}
              onChangeText={setDegree}
              placeholder="Enter Degree"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className={"font-rmedium tracking-wider"}>Availability:</Text>
            <TextInput
              className="px-2 border border-gray-300 rounded w-52"
              value={availability}
              onChangeText={setAvailability}
              placeholder="Enter Availability"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className={"font-rmedium tracking-wider"}>Experience:</Text>
            <TextInput
              className="px-2 border border-gray-300 rounded w-52"
              value={experience}
              onChangeText={setExperience}
              placeholder="Enter Experience"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className={"font-rmedium tracking-wider"}>Contact No:</Text>
            <TextInput
              className="px-2 border border-gray-300 rounded w-52"
              value={contact}
              onChangeText={setContact}
              placeholder="Enter Contact Number"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className={"font-rmedium tracking-wider"}>Email:</Text>
            <TextInput
              className="w-64 px-2 border border-gray-300 rounded"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className={"font-rmedium tracking-wider"}>Address:</Text>
            <TextInput
              className="w-56 px-2 border border-gray-300 rounded"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter Address"
            />
          </View>
          <CustomButton
            title="Save Details"
            // onPress={handleSave}
            containerStyles={
              "py-3 border rounded-lg border-[#f5f5f5] bg-blue-500 mt-2"
            }
            textStyles={"text-base text-center text-white"}
          />
        </View> : <></>}
        <TouchableOpacity
          className="py-3 border rounded-lg border-primary"
          onPress={handleAddDetils}
        >
          <Text className="text-center text-white">{addDetails ? <Text className="text-base text-center text-primary">Cancel</Text> : <Text className="text-base text-center text-primary">Add Your Details</Text>}</Text>
        </TouchableOpacity>
      </View>


      {/* details add garisake pachi aaune section */}

      <View className="p-5 mx-6 mb-10 bg-slate-200 rounded-xl">
        <View className="flex-row items-center mb-4">
          <Text className={"font-rmedium tracking-wider"}>Degree:</Text>
          {isEditing ? <TextInput
            className="px-2 ml-2 border border-gray-300 rounded w-60"
            value={degree}
            onChangeText={setDegree}
            placeholder="Enter Degree"
          /> : <Text className="ml-2 tracking-wider font-rregular">
            {user?.degree}degree
          </Text>}
        </View>
        <View className="flex-row items-center mb-4">
          <Text className={"font-rmedium tracking-wider"}>Availability:</Text>
          {isEditing ? <TextInput
            className="px-2 ml-2 border border-gray-300 rounded w-52"
            value={availability}
            onChangeText={setAvailability}
            placeholder="Enter Degree"
          /> : <Text className="ml-2 tracking-wider font-rregular">
            {user?.availability}availability
          </Text>}
        </View>
        <View className="flex-row items-center mb-4">
          <Text className={"font-rmedium tracking-wider"}>Experience:</Text>
          {isEditing ? <TextInput
            className="px-2 ml-2 border border-gray-300 rounded w-52"
            value={experience}
            onChangeText={setExperience}
            placeholder="Enter Degree"
          /> : <Text className="ml-2 tracking-wider font-rregular">
            {user?.experience}experience
          </Text>}
        </View>
        <View className="flex-row items-center mb-4">
          <Text className={"font-rmedium tracking-wider"}>Contact No:</Text>
          {isEditing ? <TextInput
            className="px-2 ml-2 border border-gray-300 rounded w-52"
            value={contact}
            onChangeText={setContact}
            placeholder="Enter Degree"
          /> : <Text className="ml-2 tracking-wider font-rregular">
            {user?.contact}contact
          </Text>}
        </View>
        <View className="flex-row items-center mb-4">
          <Text className={"font-rmedium tracking-wider"}>Email:</Text>
          {isEditing ? <TextInput
            className="px-2 ml-2 border border-gray-300 rounded w-60"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Degree"
          /> : <Text className="ml-2 tracking-wider font-rregular">
            {user?.email}
          </Text>}
        </View>
        <View className="flex-row items-center">
          <Text className={"font-rmedium tracking-wider"}>Address:</Text>
          {isEditing ? <TextInput
            className="w-56 px-2 ml-2 border border-gray-300 rounded"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter Degree"
          /> : <Text className="ml-2 tracking-wider font-rregular">
            {user?.address}
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

    </>

  );
};

export default Details;
