"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingPageSkeleton from "@/components/skeleton/BookingPageSkeleton";
import Image from "next/image";

interface Mentor {
  id: string;
  name: string;
  email: string;
  universityName: string;
  universityLogo?: string;
  scholarshipName?: string;
  country: string;
  price: number;
  profilepic?: string;
  about: {
    tags: string[];
    description: string[];
    academicAchievements: string[];
    hobbies: string[];
    dayavailable: string[];
    timeslot: string[];
    experience: {
      title: string;
      organization: string;
      duration: string;
      description: string;
    }[];
    universitydetails: {
      universitylogo: string;
      universityName: string;
      scholarshipName: string;
      scholarshipPercent: string;
      aboutScholarship: string;
      courseName: string;
    }[];
  } | null;
}

interface BookingFormData {
  date: string;
  time: string;
  duration: "30";
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  goals: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  cardName: string;
  price: number;
}

interface DateInfo {
  dayName: string;
  fullDate: string;
}

const getNextDayDate = (dayName: string): Date | null => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const todayIndex = today.getDay(); 

  const cleanDayName = dayName.toLowerCase().trim();
  const dayIndex = days.findIndex(day => day.toLowerCase() === cleanDayName);
  if (dayIndex === -1) return null; 
  let daysUntilNext = dayIndex - todayIndex;
  
  if (daysUntilNext <= 0) {
    daysUntilNext += 7;
  }

  const nextDate = new Date();
  nextDate.setDate(today.getDate() + daysUntilNext);
  return nextDate;
};



const formatDateDisplay = (dayName: string): DateInfo => {
  const date = getNextDayDate(dayName);
  if (!date) return { dayName, fullDate: dayName };
  
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  
  return {
    dayName,
    fullDate: `${dayName}, ${month} ${day}`
  };
};

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"datetime" | "details" | "payment">("datetime");
  const [formData, setFormData] = useState<BookingFormData>({
    date: "",
    time: "",
    duration: "30",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    goals: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    cardName: "",
    price: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [mentor, setMentor] = useState<Mentor | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMentor = async () => {
      try {
        const res = await fetch(`/api/mentors/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch mentor.");
        }

        setMentor(data);
      } catch (err: any) {
        console.error("Failed to fetch mentor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateDateTime = () => {
    if (!formData.date || !formData.time) {
      alert("Please select both date and time before proceeding");
      return false;
    }
    return true;
  };

  const validateDetails = () => {
    if (!formData.firstName.trim()) {
      alert("Please enter your first name");
      return false;
    }
    if (!formData.lastName.trim()) {
      alert("Please enter your last name");
      return false;
    }
    if (!formData.email.trim()) {
      alert("Please enter your email");
      return false;
    }

    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address (e.g., example@domain.com)");
      return false;
    }

    if (!formData.phone.trim()) {
      alert("Please enter your phone number");
      return false;
    }

    // Phone number validation (allowing only numbers and minimum length of 10)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }

    if (!formData.goals.trim()) {
      alert("Please enter your session goals");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (!formData.cardNumber.trim()) {
      alert("Please enter card number");
      return false;
    }
    if (!formData.cardExpiry.trim()) {
      alert("Please enter card expiry date");
      return false;
    }
    if (!formData.cardCVV.trim()) {
      alert("Please enter CVV");
      return false;
    }
    if (!formData.cardName.trim()) {
      alert("Please enter cardholder name");
      return false;
    }

    // Card number validation (16 digits)
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(formData.cardNumber.replace(/\s/g, ''))) {
      alert("Please enter a valid 16-digit card number");
      return false;
    }

    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(formData.cardExpiry)) {
      alert("Please enter a valid expiry date (MM/YY)");
      return false;
    }

    // CVV validation (3 or 4 digits)
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(formData.cardCVV)) {
      alert("Please enter a valid CVV");
      return false;
    }

    return true;
  };

  const handlePaymentSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePayment()) return;

    try {
      setIsProcessing(true);

      // Create the booking and payment record
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentorId: id,
          sessionDetails: {
            date: formData.date,
            time: formData.time,
            duration: formData.duration,
          },
          userDetails: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.countryCode + formData.phone,
            goals: formData.goals,
          },
          paymentDetails: {
            amount: mentor.price,
            cardNumber: formData.cardNumber.replace(/\s/g, '').slice(-4), // Only store last 4 digits
            cardName: formData.cardName,
            paymentMethod: 'card'
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      // Show success message and redirect to confirmation page
      alert('Booking confirmed! You will receive a confirmation email shortly.');
      window.location.href = `/bookings/${data.bookingId}/confirmation`;

    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderProgressSteps = () => {
  return (
      <div className="flex mb-8">
        <div className="flex w-full justify-between">
          <div className="flex-1 text-center">
            <div 
              className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center border-2 transition-all duration-300
                ${step === "datetime" || step === "details" || step === "payment"
                  ? "bg-black text-white border-black" 
                  : "bg-white border-gray-300"
                }`}
            >
              1
            </div>
            <div className={`text-sm transition-colors duration-300 ${step === "datetime" ? "font-medium text-black" : "text-gray-500"}`}>
              Date & Time
            </div>
          </div>
          
          <div className="flex-1 text-center">
            <div 
              className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center border-2 transition-all duration-300
                ${step === "details" || step === "payment"
                  ? "bg-black text-white border-black" 
                  : "bg-white border-gray-300"
                }`}
            >
              2
            </div>
            <div className={`text-sm transition-colors duration-300 ${step === "details" ? "font-medium text-black" : "text-gray-500"}`}>
              Your Details
            </div>
          </div>
          
          <div className="flex-1 text-center">
            <div 
              className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center border-2 transition-all duration-300
                ${step === "payment" ? "bg-black text-white border-black" : "bg-white border-gray-300"}`}
            >
              3
            </div>
            <div className={`text-sm transition-colors duration-300 ${step === "payment" ? "font-medium text-black" : "text-gray-500"}`}>
              Payment
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    return (
      <div className="mt-8">
          {/* Date & Time Selection */}
          {step === "datetime" && (
          <div className="animate-fadeIn">
              <h2 className="text-xl font-bold mb-6">Select a Date</h2>
              <div className="grid grid-cols-3 gap-4 mb-8">
              {mentor.about?.dayavailable.map((day, index) => (
                  <button
                  key={index}
                  onClick={() => setFormData(prev => ({ ...prev, date: day }))}
                    className={`p-4 border rounded-lg text-center hover:border-black transition-colors ${
                    formData.date === day ? "border-black" : ""
                    }`}
                  >
                  <div className="text-xl font-semibold">{day}</div>
                  </button>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-6">Select a Time Slot</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
              {mentor.about?.timeslot.map((slot, index) => (
                  <button
                  key={index}
                    onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                    className={`p-4 border rounded-lg flex items-center gap-2 hover:border-black transition-colors ${
                      formData.time === slot ? "border-black" : ""
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {slot}
                  </button>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-6">Session Duration</h2>
              <div className="space-y-4 mb-8">
                  <label
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer border-black"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="duration"
                    value="30"
                    defaultChecked={true}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                  <div className="w-4 h-4 rounded-full bg-black border-black border-2" />
                  <span>30 minutes session</span>
                    </div>
                <span className="font-semibold">₹{(Number(mentor.price)).toString()}/-</span>
                  </label>
              </div>

              <button
              onClick={() => {
                if (validateDateTime()) {
                  setStep("details");
                }
              }}
              className={`w-full py-3 rounded-lg font-semibold ${
                !formData.date || !formData.time
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              disabled={!formData.date || !formData.time}
              >
                Continue to Details
              </button>
            </div>
          )}

          {/* Your Details */}
          {step === "details" && (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Information</h2>
              <button
                onClick={() => setStep("datetime")}
                className="text-gray-600 hover:text-black flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full p-3 border rounded-lg"
                  required
                  />
                </div>
                <div>
                  <label className="block mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full p-3 border rounded-lg"
                  required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                onBlur={(e) => {
                  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                  if (!emailRegex.test(e.target.value) && e.target.value) {
                    alert("Please enter a valid email address");
                  }
                }}
                  placeholder="Enter your email address"
                className={`w-full p-3 border rounded-lg ${
                  formData.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)
                    ? "border-red-500"
                    : ""
                }`}
                required
              />
              {formData.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email) && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
              )}
              </div>

              <div className="mb-6">
                <label className="block mb-2">Phone Number</label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  defaultValue="+91"
                  className="w-24 p-3 border rounded-lg bg-white"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+81">+81</option>
                  <option value="+86">+86</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, '');
                    // Limit to 10 digits
                    if (value.length <= 10) {
                      setFormData(prev => ({
                        ...prev,
                        phone: value
                      }));
                    }
                  }}
                  placeholder="Enter your phone number"
                  className="flex-1 p-3 border rounded-lg"
                  maxLength={10}
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Enter a 10-digit phone number</p>
              </div>

              <div className="mb-8">
                <label className="block mb-2">Session Goals</label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your goals for this session"
                className="w-full p-3 border rounded-lg h-32 resize-none"
                required
                />
              </div>

              <button
              onClick={() => {
                if (validateDetails()) {
                  setStep("payment");
                }
              }}
              className={`w-full py-3 rounded-lg font-semibold ${
                !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.goals
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.goals}
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Payment */}
          {step === "payment" && (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Payment Details</h2>
              <button
                onClick={() => setStep("details")}
                className="text-gray-600 hover:text-black flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Session Details</h3>
                  <p className="text-gray-600">30 minutes with {mentor.name}</p>
                </div>
                <span className="text-xl font-bold">₹{mentor.price.toString()}/-</span>
              </div>
            </div>

            <form className="space-y-6">
            <div>
                <label className="block mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    // Format card number with spaces every 4 digits
                    const value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                    if (value.length <= 19) { // 16 digits + 3 spaces
                      setFormData(prev => ({
                        ...prev,
                        cardNumber: value
                      }));
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 border rounded-lg"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      if (value.length <= 5) {
                        setFormData(prev => ({
                          ...prev,
                          cardExpiry: value
                        }));
                      }
                    }}
                    placeholder="MM/YY"
                    className="w-full p-3 border rounded-lg"
                    maxLength={5}
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-2">CVV</label>
                  <input
                    type="password"
                    name="cardCVV"
                    value={formData.cardCVV}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        setFormData(prev => ({
                          ...prev,
                          cardCVV: value
                        }));
                      }
                    }}
                    placeholder="123"
                    className="w-full p-3 border rounded-lg"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

                <div>
                <label className="block mb-2">Cardholder Name</label>
                    <input
                      type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="Name on card"
                      className="w-full p-3 border rounded-lg"
                  required
                      />
                    </div>

              <button
                type="submit"
                onClick={handlePaymentSubmission}
                disabled={!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV || !formData.cardName || isProcessing}
                className={`w-full py-3 rounded-lg font-semibold ${
                  !formData.cardNumber || !formData.cardExpiry || !formData.cardCVV || !formData.cardName || isProcessing
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${mentor.price.toString()}/-`
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Your payment information is secure and encrypted
            </p>
            </div>
          )}
      </div>
    );
  };

  const formatDate = (date: string) => {
    if (!date) return "Not selected";
    
    const dateInfo = formatDateDisplay(date);
    console.log('Formatting date:', date, dateInfo); 
    return dateInfo.fullDate;
  };

  if (loading || !mentor) {
    return <BookingPageSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <h1 className="text-3xl font-bold mb-2">Book a Session with {mentor.name}</h1>
      <p className="text-gray-600 mb-8">Complete your booking details below</p>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {renderProgressSteps()}
          <div key={step} className="animate-fadeIn">
            {renderStepContent()}
          </div>
        </div>

        {/* Booking Summary */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg border p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
            <p className="text-gray-600 mb-6">Session with {mentor.name}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src={mentor.profilepic}
                  alt={mentor.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <h3 className="font-semibold">{mentor.name}</h3>
                <p className="text-gray-600 text-sm">{mentor.scholarshipName} Recipient</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Date</span>
                <span className="font-semibold">{formatDate(formData.date)}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span className="font-semibold">{formData.time || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-semibold">30 minutes</span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{mentor.price.toString()}/-</span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              By completing this booking, you agree to our Terms of Service and Cancellation Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
