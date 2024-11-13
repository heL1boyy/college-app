import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.college.app",
  projectId: "668d3cda00037af9899c",
  databaseId: "668d3e6b001022a83c8b",
  usecollectionId: "668d3ed10035a4372284",
  // storageId: "668d40a60032703287c5",
  bucketId: "66ad242d003c277e619d",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const storage = new Storage(client);

//create new user
export const createUser = async (
  email,
  password,
  username,
  address,
  contactNumber,
  department,
  semester,
  yearOfJoining,
  dateOfBirth
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.usecollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
        address,
        contactNumber,
        department,
        semester,
        yearOfJoining,
        dateOfBirth,
      }
    );

    return newUser;
  } catch (error) {
    console.log("Error creating user:", error.message);
    throw new Error(error.message || "An error occurred during user creation.");
  }
};
//login by the  user
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
//if the user is  logged in before then the user is loggged in
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.usecollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("User retrieval failed");

    return currentUser.documents[0];
  } catch (error) {
    console.log("Error fetching current user:", error.message);
    throw new Error(
      error.message || "An error occurred during user retrieval."
    );
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadImage = async (fileUri) => {
  try {
    const response = await fetch(fileUri);

    if (!response.ok) {
      throw new Error(`Failed to fetch image from URI: ${response.statusText}`);
    }

    const blob = await response.blob();
    const fileId = ID.unique();
    const file = new File([blob], "profile-image.jpg", {
      type: blob.type || "image/jpeg",
    });

    const uploadedFile = await storage.createFile(
      config.bucketId,
      fileId,
      file,
      ["*"]
    );
    const imageUrl = storage.getFileView(
      config.bucketId,
      uploadedFile.$id
    ).href;

    return { imageUrl, fileId: uploadedFile.$id };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error(error.message || "An error occurred during image upload.");
  }
};
export const findDocumentIdByAccountId = async (accountId) => {
  try {
    // Create the query to find documents where 'accountId' matches the provided value
    const query = [Query.equal("accountId", accountId)];
    const results = await databases.listDocuments(
      config.databaseId,
      config.usecollectionId,
      query
    );

    if (results.documents.length === 0) {
      throw new Error("No document found for accountId: " + accountId);
    }

    // Return the ID of the first matching document
    return results.documents[0].$id;
  } catch (error) {
    console.error("Error finding document by accountId:", error.message);
    throw new Error("An error occurred while finding the document.");
  }
};

export const updateUserFieldByAccountId = async (accountId, updatedData) => {
  if (!accountId) {
    throw new Error("Missing accountId");
  }

  try {
    // Find the document ID using accountId
    const documentId = await findDocumentIdByAccountId(accountId);

    // Update the document with the found documentId
    const updatedUser = await databases.updateDocument(
      config.databaseId,
      config.usecollectionId,
      documentId,
      updatedData
    );

    return updatedUser;
  } catch (error) {
    console.error("Error updating user details:", error.message);
    throw new Error("An error occurred during the update.");
  }
};
