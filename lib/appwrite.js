import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.college.app",
  projectId: "668d3cda00037af9899c",
  databaseId: "668d3e6b001022a83c8b",
  usecollectionId: "668d3ed10035a4372284",
  storageId: "668d40a60032703287c5",
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
