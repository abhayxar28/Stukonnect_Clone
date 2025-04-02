"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Experience {
  title: string;
  organization: string;
  duration: string;
  description: string;
}

interface UniversityDetails {
  universitylogo: string;
  universityName: string;
  scholarshipName: string;
  scholarshipPercent: string;
  aboutScholarship: string;
  courseName: string;
}

interface AboutSection {
  tags: string[];
  description: string[];
  academicAchievements: string[];
  hobbies: string[];
  dayavailable: string[];
  timeslot: string[];
  experience: Experience[];
  universitydetails: UniversityDetails[];
}

interface FormData {
  name: string;
  email: string;
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
    universitydetails: Array<{
      universitylogo: string;
      universityName: string;
      scholarshipName: string;
      scholarshipPercent: string;
      aboutScholarship: string;
      courseName: string;
    }>;
    experience: Array<{
      title: string;
      organization: string;
      duration: string;
      description: string;
    }>;
  };
}

interface ApiError {
  message: string;
}

interface ApiResponse {
  error?: string;
  message?: string;
}

export default function AddMentorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    country: "",
    profilepic: "",
    price: 0,
    about: {
      tags: [],
      description: [""],
      academicAchievements: [""],
      hobbies: [""],
      dayavailable: [""],
      timeslot: [""],
      universitydetails: [{
        universitylogo: "",
        universityName: "",
        scholarshipName: "",
        scholarshipPercent: "",
        aboutScholarship: "",
        courseName: "",
      }],
      experience: [{
        title: "",
        organization: "",
        duration: "",
        description: "",
      }],
    },
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      
      // Handle nested paths
      const path = name.split('.');
      let current: Record<string, unknown> = updatedData;
      
      // Traverse the path except for the last key
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]] as Record<string, unknown>;
      }
      
      // Set the value at the final key
      current[path[path.length - 1]] = value;
      
      return updatedData as FormData;
    });
  };

  const addField = (field: string, index: number) => {
    setFormData((prevData) => {
      const keys = field.split(".");
      const updatedData = JSON.parse(JSON.stringify(prevData));
      let current: Record<string, unknown> = updatedData;
      
      // Traverse to the parent object
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }
      
      const lastKey = keys[keys.length - 1];
      const lastValue = current[lastKey] as unknown[];
      
      if (Array.isArray(lastValue)) {
        if (typeof lastValue[0] === 'string') {
          lastValue.splice(index + 1, 0, "");
        } else {
          // Handle object arrays like universitydetails and experience
          const firstItem = lastValue[0] as Record<string, unknown>;
          const emptyObj = Object.keys(firstItem).reduce((acc, key) => {
            acc[key] = "";
            return acc;
          }, {} as Record<string, unknown>);
          lastValue.splice(index + 1, 0, emptyObj);
        }
      }
      
      return updatedData as FormData;
    });
  };

  const removeField = (field: string, index: number) => {
    setFormData((prevData) => {
      const keys = field.split(".");
      const updatedData = JSON.parse(JSON.stringify(prevData));
      let current: Record<string, unknown> = updatedData;
      
      // Traverse to the parent object
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }
      
      const lastKey = keys[keys.length - 1];
      const lastValue = current[lastKey] as unknown[];
      
      if (lastValue.length > 1) {
        lastValue.splice(index, 1);
      }
      
      return updatedData as FormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/mentors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create mentor");
      }

      setShowAlert(true);
      setTimeout(() => {
      setFormData({
          name: "",
        email: "",
          country: "",
          profilepic: "",
          price: 0,
          about: {
            tags: [],
            description: [""],
            academicAchievements: [""],
            hobbies: [""],
            dayavailable: [""],
            timeslot: [""],
            universitydetails: [{
              universitylogo: "",
        universityName: "",
        scholarshipName: "",
              scholarshipPercent: "",
              aboutScholarship: "",
              courseName: "",
            }],
            experience: [{
              title: "",
              organization: "",
              duration: "",
              description: "",
            }],
          },
        });
        router.push('/mentors');
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error creating mentor:", apiError.message);
      alert(apiError.message || 'Failed to add mentor');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Add Mentor</h2>
      {showAlert && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Mentor information added successfully!
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Basic Info Fields */}
        {[
          ["email", "password"],
          ["name", "country"],
          ["profilepic", "price"],
        ].map((pair, idx) => (
          <div key={idx} className="flex gap-4">
            {pair.map((field) => (
              <div key={field} className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative">
                  {field === "price" && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>}
                  <input
                    type={field === "password" ? "password" : field === "price" ? "number" : "text"}
                    name={field}
                    value={formData[field as keyof typeof formData]?.toString() || ""}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${field === "price" ? "pl-8" : ""}`}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* University Details */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">University Details</h3>
          <div className="p-4 border rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
                <input
                  type="text"
                  name="about.universitydetails.0.universityName"
                  value={formData.about.universitydetails[0].universityName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter university name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University Logo URL</label>
                <input
                  type="text"
                  name="about.universitydetails.0.universitylogo"
                  value={formData.about.universitydetails[0].universitylogo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter logo URL"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                <input
                  type="text"
                  name="about.universitydetails.0.courseName"
                  value={formData.about.universitydetails[0].courseName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter course name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Name</label>
                <input
                  type="text"
                  name="about.universitydetails.0.scholarshipName"
                  value={formData.about.universitydetails[0].scholarshipName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter scholarship name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Percentage</label>
              <input
                type="text"
                name="about.universitydetails.0.scholarshipPercent"
                value={formData.about.universitydetails[0].scholarshipPercent}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter scholarship percentage"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Scholarship</label>
              <textarea
                name="about.universitydetails.0.aboutScholarship"
                value={formData.about.universitydetails[0].aboutScholarship}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Describe your scholarship"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Array Fields with + and - buttons */}
        {[
          ["about.tags", "Tags"],
          ["about.description", "Description"],
          ["about.academicAchievements", "Academic Achievements"],
          ["about.hobbies", "Hobbies"],
          ["about.dayavailable", "Days Available"],
          ["about.timeslot", "Time Slots [eg: 4:00 PM - 6:00 PM]"],
        ].map(([field, label], idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="space-y-2">
              {((formData.about as any)[field.split(".")[1]] as string[]).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    name={`${field}.${index}`}
                    value={item}
                    onChange={handleChange}
                    className="flex-1 p-2 border rounded"
                    placeholder={`${label} ${index + 1}`}
                  />
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => addField(field, index)}
                      className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeField(field, index)}
                      className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Experience Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <div className="space-y-4">
            {formData.about.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name={`about.experience.${index}.title`}
                      value={exp.title}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="e.g., Scholarship Mentor"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <input
                      type="text"
                      name={`about.experience.${index}.organization`}
                      value={exp.organization}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="e.g., Independent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    name={`about.experience.${index}.duration`}
                    value={exp.duration}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., 2021 - Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name={`about.experience.${index}.description`}
                    value={exp.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows={3}
                    placeholder="Describe your responsibilities and achievements"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => {
                        const newData = JSON.parse(JSON.stringify(prev));
                        newData.about.experience.splice(index + 1, 0, {
                          title: "",
                          organization: "",
                          duration: "",
                          description: ""
                        });
                        return newData;
                      });
                    }}
                    className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.about.experience.length > 1) {
                        setFormData(prev => {
                          const newData = JSON.parse(JSON.stringify(prev));
                          newData.about.experience.splice(index, 1);
                          return newData;
                        });
                      }
                    }}
                    className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Mentor
        </button>
      </form>
    </div>
  );
}