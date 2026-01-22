import { useState } from "react";
import { toast } from "sonner";
import Swal from 'sweetalert2';
import axios from "axios";

// Components
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

// Hooks and Context
import useHooks from "@/context/HookContext";

// Services
import signInImage from "/signIn.webp";

const SignUp = () => {
  const { navigate } = useHooks();
  
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state - NO instituteId field
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    father_name: "",
    email: "",
    contact: "",
    password: "",
    dob: "",
    gender: ""
  });

  // Errors state
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format contact number (only digits, max 10)
    if (name === "contact") {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({...formData, [name]: numericValue});
      return;
    }
    
    // Format date to DD/MM/YYYY
    if (name === "dob") {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2 && formattedValue.length <= 4) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{0,2})/, '$1/$2');
      } else if (formattedValue.length > 4) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
      }
      setFormData({...formData, [name]: formattedValue});
      return;
    }
    
    setFormData({...formData, [name]: value});
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({...errors, [name]: ""});
    }
  };

  // Gender selection
  const handleGenderChange = (gender) => {
    setFormData({...formData, gender});
    if (errors.gender) {
      setErrors({...errors, gender: ""});
    }
  };

  // Validation function - NO instituteId validation
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation (NO instituteId)
    const requiredFields = [
      'first_name', 'last_name', 'father_name', 'email', 
      'contact', 'password', 'dob', 'gender'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field.replace('_', ' ').replace('dob', 'date of birth')} is required`;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Contact validation (10 digits)
    if (formData.contact && !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be exactly 10 digits";
    }

    // Password validation (min 10 chars)
    if (formData.password && formData.password.length < 10) {
      newErrors.password = "Password must be at least 10 characters";
    }

    // Date validation (DD/MM/YYYY)
    if (formData.dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dob)) {
      newErrors.dob = "Date must be in DD/MM/YYYY format";
    }

    // Gender validation
    if (formData.gender && !['male', 'female', 'other'].includes(formData.gender)) {
      newErrors.gender = "Please select a valid gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      Swal.fire({
        title: "Validation Error!",
        text: "Please check all required fields",
        icon: "error",
        confirmButtonColor: "#3085d6"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare data for API - NO instituteId in the data
      const apiData = {
        ...formData,
        // Ensure contact is exactly 10 digits
        contact: formData.contact.replace(/\D/g, '').slice(0, 10),
        // dob should already be in DD/MM/YYYY format from handleChange
        // Backend will handle instituteId as null automatically
      };

      console.log("Sending registration data:", apiData);

      const response = await axios.post(
        'http://localhost:3100/v2/auth/register?type=0',
        apiData,
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 10000 // 10 second timeout
        }
      );

      console.log("Registration response:", response.data);

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: response.data.message || "Registration successful!",
          icon: "success",
          confirmButtonColor: "#3085d6"
        }).then(() => {
          // Redirect to login page after successful registration
          navigate("/sign-in");
        });
      } else {
        Swal.fire({
          title: "Registration Failed!",
          text: response.data.message || "Something went wrong",
          icon: "error",
          confirmButtonColor: "#3085d6"
        });
      }
    } catch (error) {
      console.log('Registration error:', error);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.response?.data) {
        // Server responded with error
        errorMessage = error.response.data.message || errorMessage;
        
        // Handle specific errors
        if (error.response.data.errors) {
          errorMessage = error.response.data.errors.join(', ');
        }
        
        // Special handling for instituteId error
        if (errorMessage.includes("instituteId")) {
          errorMessage = "Server validation error. Please try again or contact support.";
        }
      } else if (error.request) {
        // No response received
        errorMessage = "No response from server. Please check your connection.";
      } else {
        // Request setup error
        errorMessage = error.message;
      }
      
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#3085d6"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill test data for development
  const fillTestData = () => {
    const testEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
    setFormData({
      first_name: "John",
      middle_name: "Kumar",
      last_name: "Doe",
      father_name: "Michael Doe",
      email: testEmail,
      contact: "9876543210",
      password: "Test@123456",
      dob: "15/05/2000",
      gender: "male"
    });
    toast.info("Test data filled");
  };

  return (
    <ContainerWrapper className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={signInImage}  
                alt="Sign Up Illustration"
                className="w-full h-[600px] object-cover"
              />
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 text-center">
                <h3 className="text-2xl font-bold mb-3">Join Yuvamanthan</h3>
                <p className="text-base opacity-95">
                  Start your journey towards educational excellence
                </p>
                <div className="mt-4 flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Access premium educational content</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Connect with institutes later</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Start your learning journey today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Student Account
              </h1>
              <p className="text-gray-600">
                Join Yuvamanthan and unlock new opportunities
              </p>
            </div>

            {/* Student Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Student Registration</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className={`h-12 ${errors.first_name ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                  )}
                </div>
                
                {/* Middle Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Middle Name
                  </label>
                  <Input
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleChange}
                    placeholder="Enter middle name"
                    className="h-12"
                    disabled={isLoading}
                  />
                </div>
                
                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className={`h-12 ${errors.last_name ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                  )}
                </div>
                
                {/* Father Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                    className={`h-12 ${errors.father_name ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.father_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.father_name}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              
              {/* Contact */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <Input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={`h-12 ${errors.contact ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                  maxLength={10}
                />
                {errors.contact && (
                  <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                )}
              </div>

              {/* DOB and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* DOB */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 ml-2">(DD/MM/YYYY)</span>
                  </label>
                  <Input
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="DD/MM/YYYY"
                    className={`h-12 ${errors.dob ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    maxLength={10}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                  )}
                </div>
                
                {/* Gender */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    {['male', 'female'].map((genderOption) => (
                      <button
                        key={genderOption}
                        type="button"
                        onClick={() => handleGenderChange(genderOption)}
                        className={`flex-1 h-12 rounded-md border-2 transition-all ${
                          formData.gender === genderOption
                            ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                            : 'border-gray-300 text-gray-700 hover:border-blue-400'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                      >
                        {genderOption.charAt(0).toUpperCase() + genderOption.slice(1)}
                      </button>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(min 10 characters)</span>
                </label>
                <div className="relative">
                  <Input
                    name="password"
                    type={isPasswordShow ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password (min 10 characters)"
                    className={`h-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsPasswordShow(!isPasswordShow)}
                    disabled={isLoading}
                  >
                    {isPasswordShow ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  <p>Password must be at least 10 characters long</p>
                </div>
              </div>

              {/* Note about institute */}
              {/* <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-blue-800 text-sm font-medium">Note:</p>
                    <p className="text-blue-700 text-sm mt-1">
                      You can register without an institute. Your institute can be linked later by administrators or you can link it from your profile after login.
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Development Test Button */}
              {/* {process.env.NODE_ENV === "development" && (
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={fillTestData}
                    className="w-full h-11 text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
                    disabled={isLoading}
                  >
                    Fill Test Data (Development)
                  </Button>
                </div>
              )} */}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                  onClick={() => navigate("/sign-in")}
                  disabled={isLoading}
                >
                  Sign in here
                </button>
              </p>
            </div>

            {/* Security Note */}
            {/* <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Your information is secure and will not be shared with third parties.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default SignUp;