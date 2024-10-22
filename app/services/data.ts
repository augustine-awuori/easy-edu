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
  _id: string;
  title: string;
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

export function getLecturers() {
  return lecturers;
}

export function findLecturerById(id: string): Lecturer | undefined {
  return lecturers.find((l) => l.id === id);
}
