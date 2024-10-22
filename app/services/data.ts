export interface Lecturer {
  id: string;
  name: string;
  department: string;
  profileImage: string;
}

export interface Department {
  _id: string;
  label: string;
}

export interface Course {
  name: string;
  department: Department;
  images: string[];
  lecturer: Lecturer;
}

const imageUrl = "https://picsum.photos/200/300";

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

export const departments: Department[] = [
  { _id: "1", label: "Computer Science" },
  { _id: "2", label: "Business Administration" },
  { _id: "3", label: "Mechanical Engineering" },
  { _id: "4", label: "Biological Sciences" },
  { _id: "5", label: "Mathematics" },
  { _id: "6", label: "Chemistry" },
];

const courses: Course[] = [
  {
    name: "Introduction to Programming",
    department: departments[0],
    images: [imageUrl],
    lecturer: lecturers[4],
  },
  {
    name: "Data Structures and Algorithms",
    department: departments[0],
    images: [imageUrl],
    lecturer: lecturers[4],
  },
  {
    name: "Calculus I",
    department: departments[4],
    images: [imageUrl],
    lecturer: lecturers[1],
  },
  {
    name: "Organic Chemistry",
    department: departments[5],
    images: [imageUrl],
    lecturer: lecturers[2],
  },
  {
    name: "Introduction to Physics",
    department: departments[2],
    images: [imageUrl],
    lecturer: lecturers[3],
  },
  {
    name: "Psychology 101",
    department: departments[3],
    images: [imageUrl],
    lecturer: lecturers[4],
  },
];

export function getCourses() {
  return courses;
}

export function getLecturers() {
  return lecturers;
}

export function findLecturerById(id: string): Lecturer | undefined {
  return lecturers.find((l) => l.id === id);
}
