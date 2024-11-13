// auth/createUser.js
import { auth, firestore } from "../firebaseConfig";

export const createUser = async (email, password, userData) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const { uid } = userCredential.user;

    await firestore().collection("users").doc(uid).set({
      email,
      username: userData.username,
      address: userData.address,
      contactNumber: userData.contactNumber,
      department: userData.department,
      semester: userData.semester,
      yearOfJoining: userData.yearOfJoining,
      dateOfBirth: userData.dateOfBirth,
    });

    return { uid, ...userData };
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message);
  }
};
