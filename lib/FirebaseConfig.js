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
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import * as FileSystem from "expo-file-system";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
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
  teacherId, // Include teacherId
  setUploading,
  setUploadProgress
) => {
  try {
    console.log("Uploading file from URI:", fileUri);

    const storageRef = ref(storage, `notes/${fileName}`);

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

            // After uploading, store the file URL in Firestore with teacherId
            await setDoc(doc(db, "notes", fileName), {
              title: title,
              fileName: fileName,
              url: downloadURL,
              teacherId: teacherId, // Store the teacherId
              createdAt: Timestamp.fromDate(new Date()),
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

export const fetchNotesFromFirebase = async (teacherId) => {
  try {
    if (!teacherId) {
      throw new Error("teacherId is required");
    }

    const notesCollection = collection(db, "notes");
    const q = query(
      notesCollection,
      where("teacherId", "==", teacherId),
      orderBy("createdAt", "desc")
    );

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
    setLoading(true); // Start loading
    const fileName = `${Date.now()}.jpg`; // Generate a unique file name
    const response = await fetch(image); // Fetch the image from the given URI
    const blob = await response.blob(); // Convert the image to a blob

    // Upload the image to Firebase Storage
    const imageRef = ref(storage, `notices/${fileName}`);
    await uploadBytes(imageRef, blob);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);

    // Add the image and title to Firestore along with a createdAt timestamp
    await setDoc(doc(db, "notices", Date.now().toString()), {
      name: title,
      imageUrl: downloadURL,
      createdAt: Timestamp.now(), // Add the createdAt field with the current timestamp
    });
  } catch (error) {
    console.error("Error adding title and image:", error);
  } finally {
    setLoading(false); // Stop loading
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
  uid, // Pass the Firebase Authentication UID
  teacherData,
  subjectData,
  taskData
) => {
  try {
    // Use Firebase Auth UID as the document ID for consistency
    const teacherDocRef = doc(db, "teachers", uid);

    // Add a new teacher document using the Firebase Authentication UID
    await setDoc(teacherDocRef, { ...teacherData, uid });
    console.log("Teacher added successfully with UID:", uid);

    // Generate dynamic ID for the subject under the teacher
    const subjectDocRef = doc(collection(teacherDocRef, "subjects"));
    const subjectId = subjectDocRef.id;
    await setDoc(subjectDocRef, subjectData);
    console.log("Subject added successfully with ID:", subjectId);

    // Generate dynamic ID for the task under the subject
    const taskDocRef = doc(collection(subjectDocRef, "tasks"));
    const taskId = taskDocRef.id;
    await setDoc(taskDocRef, taskData);
    console.log("Task added successfully with ID:", taskId);

    // Return the generated IDs if needed
    return {
      teacherId: uid,
      subjectId,
      taskId,
    };
  } catch (error) {
    console.error("Error adding teacher with subcollections:", error);
    throw new Error(
      "Failed to add teacher and subcollections: " + error.message
    );
  }
};

export const getTeacherWithSubjects = async (teacherId) => {
  try {
    // Step 1: Get the Teacher Document
    const teacherDocRef = doc(db, "teachers", teacherId);
    const teacherDoc = await getDoc(teacherDocRef);

    if (!teacherDoc.exists()) {
      throw new Error("Teacher not found");
    }

    const teacherData = teacherDoc.data();

    // Step 2: Fetch Subjects under the Teacher's Collection
    const subjectsCollectionRef = collection(
      db,
      `teachers/${teacherId}/subjects`
    );
    const subjectsSnapshot = await getDocs(subjectsCollectionRef);

    // Step 3: Map Subjects to an Array
    const subjects = subjectsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Return combined data
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

export const updateAttendance = async (teacherId, studentId, date, status) => {
  try {
    // Use teacherId and date to create a unique path for each teacher's attendance
    const attendanceRef = doc(db, "attendance", teacherId, "dates", date);

    const attendanceDoc = await getDoc(attendanceRef);

    if (attendanceDoc.exists()) {
      // Update the student's attendance for the given teacher and date
      await updateDoc(attendanceRef, {
        [`studentAttendance.${studentId}`]: status,
      });
    } else {
      // Create a new document if it doesn't exist
      await setDoc(attendanceRef, {
        date,
        teacherId,
        studentAttendance: {
          [studentId]: status,
        },
      });
    }
  } catch (error) {
    throw new Error("Error updating attendance: " + error.message);
  }
};

// getting current teachaer

export const getCurrentTeacher = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn("No authenticated user found. Redirecting to login.");
      throw new Error("User not authenticated. Please log in.");
    }

    const teacherRef = doc(db, "teachers", currentUser.uid);
    const teacherDoc = await getDoc(teacherRef);

    if (!teacherDoc.exists()) {
      throw new Error("Teacher record not found.");
    }

    return { id: teacherDoc.id, ...teacherDoc.data() };
  } catch (error) {
    console.error("Error fetching teacher details:", error.message);
    throw error;
  }
};

// Fetch attendance data for a specific date
export const fetchAttendanceByTeacherAndDate = async (teacherId, date) => {
  try {
    const docRef = doc(db, "attendance", teacherId, "dates", date);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Return the document data
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error;
  }
};

export const fetchSubjectsForTeacher = async (teacherId) => {
  try {
    console.log("Fetching subjects for teacherId:", teacherId); // Log teacherId before fetching
    const subjectsRef = collection(db, "teachers", teacherId, "subjects");
    const querySnapshot = await getDocs(subjectsRef);
    console.log("Query snapshot received:", querySnapshot);

    if (querySnapshot.empty) {
      console.log("No subjects found for teacher:", teacherId); // Log when no subjects found
      return [];
    }

    const subjects = [];
    querySnapshot.forEach((doc) => {
      console.log("Fetched subject:", doc.id, doc.data()); // Log each subject document fetched
      subjects.push({ id: doc.id, ...doc.data() });
    });

    return subjects;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};
// Function to fetch attendance for a specific subject, teacher, and date

export const fetchAttendanceForTeacherAndUser = async (
  teacherId,
  currentUserId
) => {
  try {
    // Reference to the 'attendance' collection for the specific teacher
    const attendanceRef = collection(db, "attendance", teacherId, "dates");

    const querySnapshot = await getDocs(attendanceRef);

    let presentCount = 0;
    let absentCount = 0;
    let totalDays = 0; // Total number of days the user has attendance records

    // Iterate over each date document
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const studentAttendance = data.studentAttendance || {};

      // Check if the current user is marked as "present" or "absent"
      if (studentAttendance[currentUserId]) {
        totalDays++; // Increment the total number of days with records
        if (studentAttendance[currentUserId] === "present") {
          presentCount++; // Increment the present counter
        } else if (studentAttendance[currentUserId] === "absent") {
          absentCount++; // Increment the absent counter
        }
      }
    });

    // Calculate attendance percentage
    let attendancePercentage = 0;
    if (totalDays > 0) {
      attendancePercentage = (presentCount / totalDays) * 100;
    }

    return {
      presentCount,
      absentCount,
      totalDays,
      attendancePercentage,
    };
  } catch (error) {
    // Log the error and throw it to propagate up to the caller
    console.error("Error fetching attendance:", error);
    throw new Error("Error fetching attendance data. Please try again later.");
  }
};

// with id

export const fetchAllTasksFromAllTeachers = async () => {
  try {
    const tasks = []; // Array to store tasks from all teachers

    // Step 1: Fetch all teachers
    const teachersCollectionRef = collection(db, "teachers");
    const teachersSnapshot = await getDocs(teachersCollectionRef);

    // Step 2: Iterate through each teacher
    for (const teacherDoc of teachersSnapshot.docs) {
      const teacherId = teacherDoc.id;

      // Step 3: Fetch subjects for the current teacher
      const subjectsCollectionRef = collection(
        db,
        `teachers/${teacherId}/subjects`
      );
      const subjectsSnapshot = await getDocs(subjectsCollectionRef);

      // Step 4: Iterate through each subject and fetch tasks
      for (const subjectDoc of subjectsSnapshot.docs) {
        const subjectId = subjectDoc.id;

        const tasksCollectionRef = collection(
          db,
          `teachers/${teacherId}/subjects/${subjectId}/tasks`
        );
        const tasksSnapshot = await getDocs(tasksCollectionRef);

        const subjectTasks = tasksSnapshot.docs.map((taskDoc) => ({
          teacherId,
          subjectId,
          taskId: taskDoc.id,
          ...taskDoc.data(),
        }));

        tasks.push(...subjectTasks); // Add tasks to the main list
      }
    }

    console.log("All tasks fetched from all teachers:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching all tasks from all teachers:", error);
    throw error;
  }
};
// fetcing the task with names

export const fetchAllTasksWithNames = async () => {
  try {
    const teachersRef = collection(db, "teachers");
    const teacherDocs = await getDocs(teachersRef);

    const tasksWithNames = [];

    for (const teacherDoc of teacherDocs.docs) {
      const teacherId = teacherDoc.id;
      const teacherName = teacherDoc.data()?.name || "Unknown Teacher";

      const subjectsRef = collection(db, `teachers/${teacherId}/subjects`);
      const subjectDocs = await getDocs(subjectsRef);

      for (const subjectDoc of subjectDocs.docs) {
        const subjectId = subjectDoc.id;
        const subjectName = subjectDoc.data()?.subjectName || "Unknown Subject";

        const tasksRef = collection(
          db,
          `teachers/${teacherId}/subjects/${subjectId}/tasks`
        );
        const taskDocs = await getDocs(tasksRef);

        taskDocs.docs.forEach((taskDoc) => {
          tasksWithNames.push({
            taskId: taskDoc.id,
            ...taskDoc.data(),
            teacherName,
            subjectName,
          });
        });
      }
    }

    console.log("Tasks with Names:", tasksWithNames);
    return tasksWithNames;
  } catch (error) {
    console.error("Error fetching tasks with names:", error);
    throw error;
  }
};

// Function to upload file to Firebase Storage and store the data in Firestore
export const uploadFileToResults = async (uri, fileName) => {
  try {
    const fileUri = uri;

    // Read the file from the local URI
    const file = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert to a Blob
    const blob = new Blob([file], { type: "application/octet-stream" });

    // Firebase Storage reference
    const resultRef = ref(storage, `resultDocuments/${fileName}`);

    // Upload the Blob to Firebase Storage
    await uploadBytes(resultRef, blob);

    // Get the download URL
    const downloadURL = await getDownloadURL(resultRef);

    // Add metadata to Firestore
    const resultDoc = {
      imgurl: downloadURL,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "results"), resultDoc);

    console.log("File uploaded successfully", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Upload failed");
  }
};

export const fetchNotice = async (query) => {
  try {
    const querySnapshot = await getDocs(collection(db, "notices"));
    const notices = querySnapshot.docs
      .filter((doc) =>
        doc.data().name.toLowerCase().includes(query.toLowerCase())
      ) // Filter based on query
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    return notices;
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
};

//
export const uploadFileToStorages = async (file, fileName) => {
  try {
    const storageRef = ref(storage, `assignments/${fileName}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};

export const saveAssignmentDetails = async (taskId, taskDetails) => {
  try {
    const assignmentRef = doc(collection(db, "assignments"), taskId);
    await setDoc(assignmentRef, taskDetails);
    console.log("Assignment saved successfully!");
  } catch (error) {
    console.error("Failed to save assignment details:", error);
    throw error;
  }
};

export const fetchAllTasksWithName = async () => {
  try {
    const tasks = []; // Store tasks with uploaded status

    // Fetch all teachers and tasks as before...
    const teachersCollectionRef = collection(db, "teachers");
    const teachersSnapshot = await getDocs(teachersCollectionRef);

    for (const teacherDoc of teachersSnapshot.docs) {
      const teacherId = teacherDoc.id;

      const subjectsCollectionRef = collection(
        db,
        `teachers/${teacherId}/subjects`
      );
      const subjectsSnapshot = await getDocs(subjectsCollectionRef);

      for (const subjectDoc of subjectsSnapshot.docs) {
        const subjectId = subjectDoc.id;

        const tasksCollectionRef = collection(
          db,
          `teachers/${teacherId}/subjects/${subjectId}/tasks`
        );
        const tasksSnapshot = await getDocs(tasksCollectionRef);

        for (const taskDoc of tasksSnapshot.docs) {
          const taskData = taskDoc.data();
          tasks.push({
            teacherId,
            subjectId,
            taskId: taskDoc.id,
            ...taskData,
            isUploaded: taskData.isUploaded || false, // Check if file is uploaded
          });
        }
      }
    }

    console.log("Tasks fetched with upload status:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
