export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface Mentor {
  id: string;
  email: string;
  name: string;
  country: string;
  profilepic: string;
  price: number;
  about: {
    tags: string[];
    description: string[];
    academicAchievements: string[];
    hobbies: string[];
    dayavailable: string[];
    timeslot: string[];
    experience: Array<{
      title: string;
      organization: string;
      duration: string;
      description: string;
    }>;
    universitydetails: Array<{
      universitylogo: string;
      universityName: string;
      scholarshipName: string;
      scholarshipPercent: string;
      aboutScholarship: string;
      courseName: string;
    }>;
  };
}

export interface Booking {
  id: string;
  mentorId: string;
  studentId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
} 