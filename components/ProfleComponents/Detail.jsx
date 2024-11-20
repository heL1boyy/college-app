import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../CustomButton";
import { TouchableOpacity } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";

const Detail = () => {
  const { user, updateUser } = useGlobalContext();

  const [isEditing, setIsEditing] = useState(false);
  const [addDetails, setAddDetails] = useState(false);

  const [department, setDepartment] = useState(user?.department || "");
  const [semester, setSemester] = useState(user?.semester || "");
  const [academicYear, setAcademicYear] = useState(user?.academicYear || "");
  const [dateofBirth, setDateofBirth] = useState(user?.dateofBirth || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [contactNumber, setContactNumber] = useState(user?.contactNumber || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");

  const handleAddDetails = () => {
    setAddDetails(!addDetails);
  };

  const handleSave = async () => {
    try {
      const updatedFields = {
        department,
        semester,
        academicYear,
        dateofBirth,
        gender,
        contactNumber,
        email,
        address,
      };
      console.log("Fields to update:", updatedFields);
      await updateUser(updatedFields);
      console.log("Data saved successfully");
      setIsEditing(false); // Exit editing mode after successful save
      setAddDetails(false); // Exit add details mode
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  };

  const checkIfDetailsExist = () => {
    return (
      department &&
      semester &&
      academicYear &&
      dateofBirth &&
      gender &&
      contactNumber &&
      email &&
      address
    );
  };

  return (
    <View className="my-4">
      {/* Show Add Details Section if No Details Exist */}
      {!checkIfDetailsExist() ? (
        <View className="px-5 py-6 mb-4 rounded-lg bg-slate-200">
          <Text className="text-center mb-4">Add Your Details</Text>
          <CustomButton
            title="Add Details"
            onPress={handleAddDetails}
            containerStyles="py-3 border rounded-lg border-[#f5f5f5] bg-blue-500"
            textStyles="text-base text-center text-white"
          />
        </View>
      ) : null}

      {/* Add/Edit Details Form */}
      {addDetails && (
        <View className="px-5 py-6 mb-4 rounded-lg bg-slate-200">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-rmedium tracking-wider">Department:</Text>
            <TextInput
              className="w-48 px-2 border border-gray-300 rounded"
              value={department}
              onChangeText={setDepartment}
              placeholder="Enter Department"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-rmedium tracking-wider">Semester:</Text>
            <TextInput
              className="w-52 px-2 border border-gray-300 rounded"
              value={semester}
              onChangeText={setSemester}
              placeholder="Enter Semester"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-rmedium tracking-wider">Academic Year:</Text>
            <TextInput
              className="w-44 px-2 border border-gray-300 rounded"
              value={academicYear}
              onChangeText={setAcademicYear}
              placeholder="Enter Academic Year"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-rmedium tracking-wider">Date of Birth:</Text>
            <TextInput
              className="w-48 px-2 border border-gray-300 rounded"
              value={dateofBirth}
              onChangeText={setDateofBirth}
              placeholder="Enter Date of Birth"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-rmedium tracking-wider">Gender:</Text>
            <TextInput
              className="w-56 px-2 border border-gray-300 rounded"
              value={gender}
              onChangeText={setGender}
              placeholder="Enter Gender"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-rmedium tracking-wider">Contact No:</Text>
            <TextInput
              className="w-52 px-2 border border-gray-300 rounded"
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Enter Contact"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-rmedium tracking-wider">Email:</Text>
            <TextInput
              className="w-60 px-2 border border-gray-300 rounded"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
            />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-rmedium tracking-wider">Address:</Text>
            <TextInput
              className="w-56 px-2 border border-gray-300 rounded"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter Address"
            />
          </View>
          <CustomButton
            title="Save Details"
            onPress={handleSave}
            containerStyles="py-3 border rounded-lg border-[#f5f5f5] bg-blue-500 mt-2"
            textStyles="text-base text-center text-white"
          />
        </View>
      )}

      {/* Display/Edit Details */}
      {checkIfDetailsExist() && !addDetails && (
        <View className="p-5 mx-6 mb-10 bg-slate-200 rounded-xl">
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Department:</Text>
            {isEditing ? (
              <TextInput
                className="w-48 px-2 ml-2 border border-gray-300 rounded"
                value={department}
                onChangeText={setDepartment}
                placeholder="Enter Department"
              />
            ) : (
              <Text className="ml-2 tracking-wider font-rregular">
                {user?.department}
              </Text>
            )}
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Semester:</Text>
            {isEditing ? (
              <TextInput
                className="px-2 ml-2 border border-gray-300 rounded w-52"
                value={semester}
                onChangeText={setSemester}
                placeholder="Enter Semester"
              />
            ) : (
              <Text className="ml-2 tracking-wider font-rregular">
                {user?.semester}
              </Text>
            )}
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>
              Academic Year:
            </Text>
            {isEditing ? (
              <TextInput
                className="px-2 ml-2 border border-gray-300 rounded w-44"
                value={academicYear}
                onChangeText={setAcademicYear}
                placeholder="Enter Academic Year"
              />
            ) : (
              <Text className="ml-2 tracking-wider font-rregular">
                {user?.academicYear}
              </Text>
            )}
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>
              Date of Birth:
            </Text>
            {isEditing ? (
              <TextInput
                className="w-48 px-2 ml-2 border border-gray-300 rounded"
                value={dateofBirth}
                onChangeText={setDateofBirth}
                placeholder="Enter Date of Birth"
              />
            ) : (
              <Text className="ml-2 tracking-wider font-rregular">
                {user?.dateofBirth}
              </Text>
            )}
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Gender:</Text>
            {isEditing ? (
              <TextInput
                className="w-56 px-2 ml-2 border border-gray-300 rounded"
                value={gender}
                onChangeText={setGender}
                placeholder="Enter Gender"
              />
            ) : (
              <Text className="ml-2 tracking-wider font-rregular">
                {user?.gender}
              </Text>
            )}
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Contact No:</Text>
            {isEditing ? (
              <TextInput
                className="px-2 ml-2 border border-gray-300 rounded w-52"
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholder="Enter Contact"
              />
            ) : (
              <Text className="ml-2 tracking-wider font-rregular">
                {user?.contactNumber}
              </Text>
            )}
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Email:</Text>
            {isEditing ? (
              <TextInput
                className="px-2 ml-2 border border-gray-300 rounded w-60"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
              />
            ) : (
              <Text className="ml-2 tracking-wider font-rregular">
                {user?.email}
              </Text>
            )}
          </View>
          <View className="flex-row items-center mb-4">
            <Text className={"font-rmedium tracking-wider"}>Address:</Text>
            {isEditing ? (
              <TextInput
                className="w-56 px-2 ml-2 border border-gray-300 rounded"
                value={address}
                onChangeText={setAddress}
                placeholder="Enter Address"
              />
            ) : (
              <Text className="ml-2 tracking-wider font-rregular">
                {user?.address}
              </Text>
            )}
          </View>
          {isEditing ? (
            <View className="flex-row justify-between mt-4">
              <CustomButton
                title="Save"
                onPress={handleSave}
                containerStyles="py-3 border rounded-lg border-[#f5f5f5] bg-blue-500 flex-1 mr-2"
                textStyles="text-base text-center text-white"
              />
              <CustomButton
                title="Cancel"
                onPress={() => setIsEditing(false)}
                containerStyles="py-3 border rounded-lg border-[#f5f5f5] bg-gray-400 flex-1"
                textStyles="text-base text-center text-white"
              />
            </View>
          ) : (
            <CustomButton
              title="Edit"
              onPress={() => setIsEditing(true)}
              containerStyles="py-3 border rounded-lg border-[#f5f5f5] bg-blue-500 mt-2"
              textStyles="text-base text-center text-white"
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Detail;
