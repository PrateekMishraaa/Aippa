import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Components
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Check, X } from "lucide-react";

// Hooks and Context
import useHooks from "@/context/HookContext";
import useAuth from "@/context/AuthContext";

// Services and Validation
import authServicesApi from "@/services/authService";
// import signUpSchema from "@/validation/signUpValidation";

// Utils and Assets
// import signUpImage from "/signUp.webp";

const SignUp = () => {
  const { navigate } = useHooks();
  const { setIsLoggedIn, setUser } = useAuth();
  
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
  const [userType, setUserType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength checker
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Check password strength
  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    });
  };

  // Signup mutation
  const { mutateAsync: signupMutation } = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);
      return authServicesApi.signUp({
        ...data,
        type: userType
      });
    },
    onSuccess: async (response) => {
      setIsLoading(false);
      console.log("✅ Signup successful:", response.data);

      const { data } = response;
      const { message, user, jwt } = data;

      if (user && jwt) {
        // Save auth data
        authServicesApi.saveAuthData(data);

        // Update auth context
        setIsLoggedIn(true);
        setUser(user);

        // Show success message
        toast.success(message || "Account created successfully!");

        // Navigate to appropriate dashboard
        setTimeout(() => {
          if (user.type === 0 || user.role === 'student') {
            navigate("/student/dashboard");
          } else if (user.type === 1 || user.role === 'institute') {
            navigate("/institute/dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1500);
      } else {
        // Account created but needs verification
        toast.success(message || "Account created! Please verify your email.");
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      }
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("❌ Signup error:", error);

      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Signup failed. Please try again.";

      toast.error(errorMessage);
    }
  });

  // Form setup
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      instituteName: "",
      instituteAddress: "",
      registrationNumber: "",
      agreeToTerms: false,
    },
  });

  // Watch password for strength checking
  const passwordValue = form.watch("password");

  // Update password strength when password changes
  useState(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "password" && value.password) {
        checkPasswordStrength(value.password);
      }
    });
    return () => subscription.unsubscribe();
  });

  // Form submission
  const onSubmit = async (values) => {
    console.log("Form submitted:", values);
    
    // Remove confirmPassword from payload
    const { confirmPassword, agreeToTerms, ...signupData } = values;
    
    await signupMutation(signupData);
  };

  // Test with actual working credentials (for development)
  const fillTestCredentials = () => {
    if (userType === 0) {
      // Student test data
      form.setValue("email", "teststudent@example.com");
      form.setValue("password", "Test@1234567890");
      form.setValue("confirmPassword", "Test@1234567890");
      form.setValue("firstName", "Test");
      form.setValue("lastName", "Student");
      form.setValue("phoneNumber", "9876543210");
      toast.info("Test student credentials filled");
    } else if (userType === 1) {
      // Institute test data
      form.setValue("email", "testinstitute@example.com");
      form.setValue("password", "Test@1234567890");
      form.setValue("confirmPassword", "Test@1234567890");
      form.setValue("instituteName", "Test Institute");
      form.setValue("instituteAddress", "123 Test Street, Test City");
      form.setValue("registrationNumber", "REG123456");
      form.setValue("phoneNumber", "9876543210");
      toast.info("Test institute credentials filled");
    }
  };

  return (
    <ContainerWrapper className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={signUpImage}
                alt="Sign Up Illustration"
                className="w-full h-auto object-cover"
              />
              <div className="bg-yuvaGreen/90 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Join Yuvamanthan</h3>
                <p className="text-sm opacity-90">
                  Start your journey towards educational excellence
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join Yuvamanthan and unlock new opportunities
              </p>
            </div>

            {/* User Type Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={userType === 0 ? "default" : "outline"}
                  onClick={() => setUserType(0)}
                  className={`h-12 text-sm font-medium ${
                    userType === 0 
                      ? "bg-yuvaBlue hover:bg-yuvaBlue/90 text-white" 
                      : "text-gray-700"
                  }`}
                  disabled={isLoading}
                >
                  Student
                </Button>
                <Button
                  type="button"
                  variant={userType === 1 ? "default" : "outline"}
                  onClick={() => setUserType(1)}
                  className={`h-12 text-sm font-medium ${
                    userType === 1 
                      ? "bg-yuvaGreen hover:bg-yuvaGreen/90 text-white" 
                      : "text-gray-700"
                  }`}
                  disabled={isLoading}
                >
                  Institute
                </Button>
              </div>
            </div>

            {/* Signup Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Conditional fields based on user type */}
                {userType === 0 ? (
                  // Student fields
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              First Name*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John"
                                className="h-12 text-base"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Last Name*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Doe"
                                className="h-12 text-base"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                ) : (
                  // Institute fields
                  <>
                    <FormField
                      control={form.control}
                      name="instituteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Institute Name*
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ABC University"
                              className="h-12 text-base"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Registration Number*
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="REG123456"
                              className="h-12 text-base"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="instituteAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Institute Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123 Street, City, State"
                              className="h-12 text-base"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Common fields */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Email Address*
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="h-12 text-base"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Phone Number*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="9876543210"
                          className="h-12 text-base"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Password*
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={isPasswordShow ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="h-12 text-base pr-12"
                            disabled={isLoading}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              checkPasswordStrength(e.target.value);
                            }}
                          />
                        </FormControl>
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
                      
                      {/* Password Strength Indicator */}
                      {passwordValue && (
                        <div className="mt-3 space-y-2">
                          <p className="text-sm font-medium text-gray-700">
                            Password Strength:
                          </p>
                          <div className="space-y-1">
                            {[
                              { label: "At least 8 characters", valid: passwordStrength.hasMinLength },
                              { label: "One uppercase letter", valid: passwordStrength.hasUpperCase },
                              { label: "One lowercase letter", valid: passwordStrength.hasLowerCase },
                              { label: "One number", valid: passwordStrength.hasNumber },
                              { label: "One special character", valid: passwordStrength.hasSpecialChar },
                            ].map((rule, index) => (
                              <div key={index} className="flex items-center text-sm">
                                {rule.valid ? (
                                  <Check className="h-4 w-4 text-green-500 mr-2" />
                                ) : (
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                )}
                                <span className={rule.valid ? "text-green-600" : "text-gray-500"}>
                                  {rule.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Confirm Password*
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={isConfirmPasswordShow ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="h-12 text-base pr-12"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setIsConfirmPasswordShow(!isConfirmPasswordShow)}
                          disabled={isLoading}
                        >
                          {isConfirmPasswordShow ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms and Conditions */}
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 mt-1 text-yuvaBlue rounded border-gray-300 focus:ring-yuvaBlue"
                          checked={field.value}
                          onChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-gray-700 font-normal">
                          I agree to the{" "}
                          <button
                            type="button"
                            className="text-yuvaBlue hover:text-yuvaBlue/80 font-medium"
                            onClick={() => navigate("/terms")}
                            disabled={isLoading}
                          >
                            Terms of Service
                          </button>{" "}
                          and{" "}
                          <button
                            type="button"
                            className="text-yuvaBlue hover:text-yuvaBlue/80 font-medium"
                            onClick={() => navigate("/privacy")}
                            disabled={isLoading}
                          >
                            Privacy Policy
                          </button>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Debug Buttons (Development Only) */}
                {process.env.NODE_ENV === "development" && (
                  <div className="pt-2 space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={fillTestCredentials}
                      className="w-full h-11 text-sm border-yuvaBlue text-yuvaBlue hover:bg-yuvaBlue/10"
                      disabled={isLoading}
                    >
                      Fill Test Credentials
                    </Button>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-yuvaGreen hover:bg-yuvaGreen/90 text-white font-semibold text-base"
                    disabled={isLoading || !form.watch("agreeToTerms")}
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
            </Form>

            {/* Sign In Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-yuvaBlue hover:text-yuvaBlue/80 font-semibold"
                  onClick={() => navigate("/sign-in")}
                  disabled={isLoading}
                >
                  Sign in here
                </button>
              </p>
            </div>

            {/* Debug Info (Development Only) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Debug Info:</p>
                <p className="text-xs text-gray-600">
                  • Endpoint: <code>POST /auth/register?type={userType}</code><br/>
                  • User Type: <code>{userType === 0 ? "Student" : "Institute"}</code><br/>
                  {/* • Form Values: <code>{JSON.stringify(form.watch(), null, 2)}</code> */}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default SignUp;