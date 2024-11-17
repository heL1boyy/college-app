import { getApp, getApps, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyB8KMwg8pzx9ixKuhjtVBLhi4lQMAsMMcI",
  authDomain: "college-application-ef4f2.firebaseapp.com",
  projectId: "college-application-ef4f2",
  storageBucket: "college-application-ef4f2.appspot.com",
  messagingSenderId: "337652403612",
  appId: "1:337652403612:web:131630b554f94ac0ebcc59",
  measurementId: "G-1CFDYCHC2Y",
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Use `initializeAuth` for React Native to fix persistence issues
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const firestore = getFirestore(app);

// User registration
export const createUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    // Prepare user data fields
    const userFields = {
      email,
      username: userData.username || "",
      address: userData.address || "",
      contactNumber: userData.contactNumber || "",
      department: userData.department || "",
      semester: userData.semester || "",
      yearOfJoining: userData.yearOfJoining || "",
      dateOfBirth: userData.dateOfBirth || "",
      gender: userData.gender || "",
      profileImageUrl: "",
    };

    // Save user data to Firestore
    await setDoc(doc(db, "users", uid), userFields);

    return { uid, ...userFields };
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message);
  }
};

// User login
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message);
  }
};

// Function to fetch user data***************************************************
export const fetchUserData = async () => {
  try {
    const userQuery = query(collection(db, "users"));
    const querySnapshot = await getDocs(userQuery);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched Data:", data); // Check the complete fetched data
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to upload PDF document to Firebase Storage
export const uploadPDFToFirebase = async (
  fileUri,
  fileName,
  title,
  setUploading,
  setUploadProgress
) => {
  try {
    console.log("Uploading file from URI:", fileUri);

    const storageRef = ref(storage, `notes/${fileName}`); // No folder based on title

    const response = await fetch(fileUri);
    const blob = await response.blob();

    console.log("File size:", blob.size);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File uploaded successfully, URL:", downloadURL);

            // After uploading, store the file URL in Firestore
            await setDoc(doc(db, "notes", fileName), {
              title: title,
              fileName: fileName,
              url: downloadURL,
              createdAt: Timestamp.fromDate(new Date()), // Store the current timestamp
            });

            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error during PDF upload:", error);
    throw error;
  }
};
export const fetchNotesFromFirebase = async () => {
  try {
    const notesCollection = collection(db, "notes");
    const q = query(notesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const notes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

// Function to upload image and title
export const addImageWithTitle = async (image, title, setLoading) => {
  try {
    setLoading(true);
    const fileName = `${Date.now()}.jpg`;
    const response = await fetch(image);
    const blob = await response.blob();

    const imageRef = ref(storage, `notices/${fileName}`);
    await uploadBytes(imageRef, blob);

    const downloadURL = await getDownloadURL(imageRef);
    await setDoc(doc(db, "notices", Date.now().toString()), {
      name: title,
      imageUrl: downloadURL,
    });
  } catch (error) {
    console.error("Error adding title and image:", error);
  } finally {
    setLoading(false);
  }
};

// fetch notics
export const fetchNotices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "notices"));
    const notices = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notices;
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
};

// Fetch current user data

export const getCurrentUser = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("No authenticated user found or session expired.");
    }

    console.log("Fetching data for user UID:", currentUser.uid);

    // Check if the current user is an admin
    const adminDocRef = doc(db, "adminUsers", currentUser.uid);
    const adminDoc = await getDoc(adminDocRef);
    if (adminDoc.exists()) {
      console.log("Admin user found:", adminDoc.data());
      return { uid: currentUser.uid, ...adminDoc.data(), isAdmin: true };
    }

    // Check if the user is a teacher
    const teacherDocRef = doc(db, "teachers", currentUser.uid);
    const teacherDoc = await getDoc(teacherDocRef);
    if (teacherDoc.exists()) {
      console.log("Teacher user found:", teacherDoc.data());
      return { uid: currentUser.uid, ...teacherDoc.data(), isTeacher: true };
    }

    // If not admin or teacher, fetch from regular users collection
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log("Regular user found:", userDoc.data());
      return {
        uid: currentUser.uid,
        ...userDoc.data(),
        isAdmin: false,
        isTeacher: false,
      };
    }

    throw new Error("User data not found in Firestore.");
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    throw new Error("Failed to fetch user data.");
  }
};

// Upload image to Firebase Storage
export const uploadImage = async (fileUri) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("No authenticated user found");

    const response = await fetch(fileUri);
    const blob = await response.blob();

    const storageRef = ref(
      storage,
      `images/${Date.now()}_${fileUri.split("/").pop()}`
    );
    await uploadBytes(storageRef, blob);

    const imageUrl = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", currentUser.uid), {
      profileImageUrl: imageUrl,
    });

    console.log("Image uploaded and URL saved:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw new Error(error.message);
  }
};

// Update user fields
// Update user fields function
// export const updateUserFields = async (updatedFields) => {
//   try {
//     // Assuming you have a user reference setup correctly in Firestore
//     const user = getCurrentUser();
//     const userRef = doc(db, "users", user.uid);

//     // Update document
//     await updateDoc(userRef, updatedFields);

//     console.log("Fields updated in Firestore:", updatedFields);

//     return updatedFields; // Return the updated fields
//   } catch (error) {
//     console.error("Error updating user fields in Firestore:", error);
//     throw new Error("Failed to update user fields");
//   }
// };// Update user fields
export const updateUserFields = async (updatedFields) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.uid) {
      throw new Error("No user found or user ID is missing");
    }

    const userDocRef = doc(db, "users", currentUser.uid);

    await updateDoc(userDocRef, updatedFields);
    console.log("User fields updated successfully in Firestore.");

    // Returning updated fields for context update
    return updatedFields;
  } catch (error) {
    console.error("Error updating user fields in Firestore:", error.message);
    throw new Error("Failed to update user fields");
  }
};

// Sign out user
export const signOutUser = async (auth) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw new Error(error.message);
  }
};

// Auth state change listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Function to fetch assignments from Firestore
// export const fetchTask = async () => {
//   try {
//     const assignmentsCollection = collection(db, "task");
//     const q = query(assignmentsCollection, orderBy("uploadedAt", "desc"));
//     const querySnapshot = await getDocs(q);

//     const assignments = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return assignments;
//   } catch (error) {
//     console.error("Error fetching assignments:", error);
//     throw error;
//   }
// };

// Function to upload file to Firebase Storage
export const uploadFileToStorage = async (uri, fileName, setUploadProgress) => {
  const storage = getStorage();
  const fileRef = ref(storage, `tasks/${fileName}`); // Save file under tasks/{fileName}

  // Fetch file from the URI and convert to a blob
  const response = await fetch(uri);
  const blob = await response.blob();

  // Create the upload task
  const uploadTask = uploadBytesResumable(fileRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // Set upload progress
      },
      (error) => {
        console.error("Upload failed:", error);
        Alert.alert("Error", "File upload failed");
        reject(error); // Reject if upload fails
      },
      async () => {
        try {
          // Get the download URL after the upload completes
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL); // Resolve with the download URL
        } catch (error) {
          console.error("Failed to get download URL:", error);
          reject(error); // Reject if URL fetching fails
        }
      }
    );
  });
};
// Function to save task data to Firestore
export const saveTaskToFirestore = async (
  taskData,
  taskId,
  teacherId,
  subjectId
) => {
  try {
    await setDoc(
      doc(db, `teachers/${teacherId}/subjects/${subjectId}/tasks`, taskId),
      taskData
    );
    console.log("Task data saved to Firestore:", taskData);
  } catch (error) {
    console.error("Error saving task data to Firestore:", error);
    throw error;
  }
};

// fetcj tasks
export const fetchTasks = async () => {
  try {
    const tasksCollection = collection(db, "tasks");
    const tasksSnapshot = await getDocs(tasksCollection);
    const tasksList = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return tasksList;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Add teacher to Firestore
export const addTeacher = async (teacherData) => {
  try {
    const teachersRef = collection(db, "teachers"); // Firestore collection for teachers
    const docRef = await addDoc(teachersRef, teacherData); // Add new teacher document
    console.log("Teacher added successfully with ID:", docRef.id); // Log the document ID
  } catch (error) {
    console.error("Error adding teacher: ", error); // Catch and log any errors
    throw new Error("Failed to add teacher: " + error.message); // Throw error to handle it in the component
  }
};
// add task
export const addTask = async (teacherId, subjectId, taskData) => {
  try {
    const tasksRef = collection(
      db,
      `teachers/${teacherId}/subjects/${subjectId}/tasks`
    ); // Reference to the tasks subcollection
    const taskDoc = await addDoc(tasksRef, taskData); // Adds a new task and auto-generates the task ID
    console.log("Task added with ID:", taskDoc.id);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// fetching teachers list
export const fetchTeachers = async () => {
  try {
    const teachersRef = collection(db, "teachers"); // Assume "teachers" is the collection name
    const snapshot = await getDocs(teachersRef);
    const teachersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return teachersList;
  } catch (error) {
    console.error("Error fetching teachers: ", error);
    throw new Error("Failed to fetch teachers");
  }
};

/**
 * Function to add a task and ensure the structure `teachers/{teacherId}/subjects/{subjectId}/tasks/{taskId}`
 * is created if missing.
 *
 * @param {string} teacherId - Unique ID for the teacher.
 * @param {object} teacherData - Data for the teacher (only if the teacher does not already exist).
 * @param {string} subjectId - Unique ID for the subject.
 * @param {object} subjectData - Data for the subject (only if the subject does not already exist).
 * @param {object} taskData - Data for the task to add.
 */
export const addTaskWithStructure = async (
  teacherId,
  teacherData,
  subjectId,
  subjectData,
  taskData
) => {
  try {
    // Reference to the teacher document
    const teacherRef = doc(db, "teachers", teacherId);
    const teacherDoc = await getDoc(teacherRef);

    // If the teacher does not exist, create it
    if (!teacherDoc.exists()) {
      await setDoc(teacherRef, teacherData);
      console.log("Teacher document created with ID:", teacherId);
    }

    // Reference to the subject document within the teacher's subjects subcollection
    const subjectRef = doc(db, "teachers", teacherId, "subjects", subjectId);
    const subjectDoc = await getDoc(subjectRef);

    // If the subject does not exist, create it
    if (!subjectDoc.exists()) {
      await setDoc(subjectRef, subjectData);
      console.log(
        `Subject created under Teacher ${teacherId} with ID:`,
        subjectId
      );
    }

    // Add the task to the tasks subcollection within the specific subject document
    const taskRef = await addDoc(
      collection(db, "teachers", teacherId, "subjects", subjectId, "tasks"),
      taskData
    );
    console.log(
      `Task added under Subject ${subjectId} for Teacher ${teacherId} with ID:`,
      taskRef.id
    );

    return taskRef.id; // Return the task ID
  } catch (error) {
    console.error("Error creating structure and adding task:", error);
    throw error;
  }
};

// adding teacher with structure
export const addTeacherWithSubcollections = async (
  teacherData,
  subjectData,
  taskData
) => {
  try {
    // Generate dynamic IDs for teacher, subject, and task
    const teacherDocRef = doc(collection(db, "teachers"));
    const teacherId = teacherDocRef.id; // Get the generated teacher ID

    // Add a new teacher document with a dynamically generated ID
    await setDoc(teacherDocRef, teacherData);
    console.log("Teacher added successfully with ID:", teacherId);

    // Generate dynamic ID for the subject under the teacher
    const subjectDocRef = doc(collection(teacherDocRef, "subjects"));
    const subjectId = subjectDocRef.id; // Get the generated subject ID
    await setDoc(subjectDocRef, subjectData);
    console.log(
      "Subject added successfully with ID:",
      subjectId,
      "under teacher ID:",
      teacherId
    );

    // Generate dynamic ID for the task under the subject
    const taskDocRef = doc(collection(subjectDocRef, "tasks"));
    const taskId = taskDocRef.id; // Get the generated task ID
    await setDoc(taskDocRef, taskData);
    console.log(
      "Task added successfully with ID:",
      taskId,
      "under subject ID:",
      subjectId
    );

    // Return the generated IDs if needed
    return {
      teacherId,
      subjectId,
      taskId,
    };
  } catch (error) {
    console.error("Error adding teacher with subcollections: ", error);
    throw new Error(
      "Failed to add teacher and subcollections: " + error.message
    );
  }
};

export const getTeacherWithSubjects = async (teacherId) => {
  try {
    // Step 1: Get Teacher Data
    const teacherDocRef = doc(Firestore, "teachers", teacherId);
    const teacherDoc = await getDoc(teacherDocRef);

    if (!teacherDoc.exists()) {
      throw new Error("Teacher not found");
    }

    const teacherData = teacherDoc.data();

    // Step 2: Get Subjects for the Teacher
    const subjectsCollectionRef = collection(teacherDocRef, "subjects");
    const subjectsSnapshot = await getDocs(subjectsCollectionRef);

    const subjects = subjectsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Combine teacher data with subjects
    return {
      ...teacherData,
      teacherId,
      subjects,
    };
  } catch (error) {
    console.error("Error fetching teacher data with subjects:", error.message);
    throw new Error("Failed to fetch teacher data.");
  }
};

//Fetch  Tasks from Firestore

export const fetchTasksFromFirestore = async (teacherId, subjectId) => {
  try {
    // Define the Firestore path for the tasks subcollection
    const tasksCollectionRef = collection(
      db,
      `teachers/${teacherId}/subjects/${subjectId}/tasks`
    );

    // Fetch documents from the collection once
    const snapshot = await getDocs(tasksCollectionRef);

    // Map the fetched documents to a structured array
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return tasks; // Return the tasks array
  } catch (error) {
    console.error("Error fetching tasks from Firestore:", error);
    throw error;
  }
};

// attendace
export const updateAttendance = async (
  teacherId,
  userId,
  date,
  studentAttendance
) => {
  try {
    const attendanceId = `attendance_${date}_${teacherId}`; // Unique identifier based on date and teacher
    const attendanceDoc = doc(db, "attendance", attendanceId);

    const attendanceData = {
      teacherId: teacherId,
      userId: userId,
      date: date,
      studentAttendance: studentAttendance,
    };

    // Use setDoc to create or overwrite the document
    await setDoc(attendanceDoc, attendanceData, { merge: true });

    console.log("Attendance updated successfully!");
  } catch (error) {
    console.error("Error updating attendance:", error);
  }
};
