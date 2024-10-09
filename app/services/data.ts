// Lecturer interface
export interface Lecturer {
  id: string;
  name: string;
  department: string;
  profileImage: string;
}

// Course interface
export interface Course {
  name: string;
  lectureId: string;
  department: string;
  image: string;
  lecturerId: string; // Link to the lecturer
}

// Dummy image URL
const imageUrl = "https://picsum.photos/200/300";

// Lecturers array
const lecturers: Lecturer[] = [
  {
    id: "L1",
    name: "Dr. Alice Smith",
    department: "Computer Science",
    profileImage: imageUrl,
  },
  {
    id: "L2",
    name: "Dr. Bob Johnson",
    department: "Mathematics",
    profileImage: imageUrl,
  },
  {
    id: "L3",
    name: "Dr. Charlie Davis",
    department: "Chemistry",
    profileImage: imageUrl,
  },
  {
    id: "L4",
    name: "Dr. Emily White",
    department: "Physics",
    profileImage: imageUrl,
  },
  {
    id: "L5",
    name: "Dr. David Brown",
    department: "Psychology",
    profileImage: imageUrl,
  },
  {
    id: "L6",
    name: "Dr. George Clark",
    department: "History",
    profileImage: imageUrl,
  },
  {
    id: "L7",
    name: "Dr. Fiona Green",
    department: "Business",
    profileImage: imageUrl,
  },
  {
    id: "L8",
    name: "Dr. Henry Lee",
    department: "Economics",
    profileImage: imageUrl,
  },
  {
    id: "L9",
    name: "Dr. Irene Walker",
    department: "Marketing",
    profileImage: imageUrl,
  },
  {
    id: "L10",
    name: "Dr. Jack Evans",
    department: "Sociology",
    profileImage: imageUrl,
  },
  {
    id: "L11",
    name: "Dr. Karen Taylor",
    department: "Design",
    profileImage: imageUrl,
  },
];

// Courses array
const courses: Course[] = [
  {
    name: "Introduction to Programming",
    lectureId: "CSE101",
    department: "Computer Science",
    image: imageUrl,
    lecturerId: "L1", // Linked to Dr. Alice Smith
  },
  {
    name: "Data Structures and Algorithms",
    lectureId: "CSE202",
    department: "Computer Science",
    image: imageUrl,
    lecturerId: "L1", // Linked to Dr. Alice Smith
  },
  {
    name: "Calculus I",
    lectureId: "MTH101",
    department: "Mathematics",
    image: imageUrl,
    lecturerId: "L2", // Linked to Dr. Bob Johnson
  },
  {
    name: "Organic Chemistry",
    lectureId: "CHEM201",
    department: "Chemistry",
    image: imageUrl,
    lecturerId: "L3", // Linked to Dr. Charlie Davis
  },
  {
    name: "Introduction to Physics",
    lectureId: "PHY101",
    department: "Physics",
    image: imageUrl,
    lecturerId: "L4", // Linked to Dr. Emily White
  },
  {
    name: "Psychology 101",
    lectureId: "PSY101",
    department: "Psychology",
    image: imageUrl,
    lecturerId: "L5", // Linked to Dr. David Brown
  },
  {
    name: "World History",
    lectureId: "HIS101",
    department: "History",
    image: imageUrl,
    lecturerId: "L6", // Linked to Dr. George Clark
  },
  {
    name: "Business Management",
    lectureId: "BUS101",
    department: "Business",
    image: imageUrl,
    lecturerId: "L7", // Linked to Dr. Fiona Green
  },
  {
    name: "Microeconomics",
    lectureId: "ECO101",
    department: "Economics",
    image: imageUrl,
    lecturerId: "L8", // Linked to Dr. Henry Lee
  },
  {
    name: "Digital Marketing",
    lectureId: "MKT301",
    department: "Marketing",
    image: imageUrl,
    lecturerId: "L9", // Linked to Dr. Irene Walker
  },
  {
    name: "Introduction to Sociology",
    lectureId: "SOC101",
    department: "Sociology",
    image: imageUrl,
    lecturerId: "L10", // Linked to Dr. Jack Evans
  },
  {
    name: "Graphic Design Basics",
    lectureId: "DES101",
    department: "Design",
    image: imageUrl,
    lecturerId: "L11", // Linked to Dr. Karen Taylor
  },
];

// Function to return courses
export function getCourses() {
  return courses;
}

// Function to return lecturers
export function getLecturers() {
  return lecturers;
}

export function findLecturerById(id: string): Lecturer | undefined {
  return lecturers.find((l) => l.id === id);
}
