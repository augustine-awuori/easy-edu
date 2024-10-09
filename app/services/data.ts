export interface Course {
  name: string;
  lectureId: string;
  department: string;
  image: string;
}

const imageUrl = "https://picsum.photos/200/300";

const courses: Course[] = [
  {
    name: "Introduction to Programming",
    lectureId: "CSE101",
    department: "Computer Science",
    image: imageUrl,
  },
  {
    name: "Data Structures and Algorithms",
    lectureId: "CSE202",
    image: imageUrl,
    department: "Computer Science",
  },
  {
    image: imageUrl,

    name: "Calculus I",
    lectureId: "MTH101",
    department: "Mathematics",
  },
  {
    image: imageUrl,
    name: "Organic Chemistry",
    lectureId: "CHEM201",
    department: "Chemistry",
  },
  {
    image: imageUrl,
    name: "Introduction to Physics",
    lectureId: "PHY101",
    department: "Physics",
  },
  {
    image: imageUrl,
    name: "Psychology 101",
    lectureId: "PSY101",
    department: "Psychology",
  },
  {
    name: "World History",
    lectureId: "HIS101",
    department: "History",
    image: imageUrl,
  },
  {
    image: imageUrl,
    name: "Business Management",
    lectureId: "BUS101",
    department: "Business",
  },
  {
    image: imageUrl,
    name: "Microeconomics",
    lectureId: "ECO101",
    department: "Economics",
  },
  {
    image: imageUrl,

    name: "Digital Marketing",
    lectureId: "MKT301",
    department: "Marketing",
  },
  {
    image: imageUrl,

    name: "Introduction to Sociology",
    lectureId: "SOC101",
    department: "Sociology",
  },
  {
    image: imageUrl,
    name: "Graphic Design Basics",
    lectureId: "DES101",
    department: "Design",
  },
];

export function getCourses() {
  return courses;
}
