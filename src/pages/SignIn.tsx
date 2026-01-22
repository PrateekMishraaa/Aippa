import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import Swal from 'sweetalert2';

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
import { Eye, EyeOff } from "lucide-react";

// Hooks and Context
import useHooks from "@/context/HookContext";
import useAuth from "@/context/AuthContext";

// Services and Validation
import authServicesApi, { SignInType } from "@/services/authService";
import signInSchema from "@/validation/signInValidation";

// Utils and Assets
import signInImage from "/signIn.webp";

const SignIn = () => {
  const queryClient = useQueryClient();
  const { navigate } = useHooks();
  const { setIsLoggedIn, setUser } = useAuth(); // Now both are available
  
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [userType, setUserType] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Login mutation
  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: (data: SignInType) => {
      setIsLoading(true);
      return authServicesApi.signIn({
        ...data,
        type: userType
      });
    },
    onSuccess: async (response) => {
      setIsLoading(false);
      console.log("✅ Login successful:", response.data);

      const { data } = response;
      const { message, user, jwt } = data;

      if (!user || !jwt) {
        Swal.fire("Invalid Credentials");
        return;
      }

      // Save auth data using authServicesApi
      authServicesApi.saveAuthData(data);

      // Update auth context
      setIsLoggedIn(true);
      setUser(user); // ✅ Now setUser is available

      // Update react-query cache
      await queryClient.invalidateQueries({
        queryKey: ["loggedInUser"],
      });

      // Show success message
    Swal.fire("You Are Login Successfully");;

      // Navigate after delay
      setTimeout(() => {
        // Redirect based on user type
        if (user.type === 0 || user.role === 'student') {
          navigate("/dashboard");
        } else if (user.type === 1 || user.role === 'institute') {
          navigate("/institute/dashboard");
        } else if (user.type === 2 || user.role === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Login error:", error);

      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Login failed";

       Swal.fire("Invalid Credentials");;
    }
  });

  // Form setup
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  // Form submission
  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    console.log("Form submitted:", values);
    await loginMutation(values);
  };

  // Test with actual working credentials
  const fillTestCredentials = () => {
    if (userType === 0) {
      form.setValue("user", "testnewuser@test.com");
      form.setValue("password", "Test@1234567890");
      Swal.fire("Test Student Credentials Failed");;
    } else if (userType === 1) {
      form.setValue("user", "modelg20@yuvamanthan.org");
      form.setValue("password", "Test@1234567890");
       Swal.fire("Test Institute  Credentials Failed");;
    }
  };

  // Test direct API call (optional)
//   const testDirectLogin = async () => {
//     try {
//       setIsLoading(true);
      
//       const testData = {
//         user: userType === 0 ? "testnewuser@test.com" : "modelg20@yuvamanthan.org",
//         password: "Test@1234567890",
//         type: userType
//       };

//       const response = await authServicesApi.signIn(testData);
      
//       console.log("Direct login response:", response.data);
      
//       if (response.data.user && response.data.jwt) {
//         authServicesApi.saveAuthData(response.data);
        
//         setIsLoggedIn(true);
//         setUser(response.data.user);
//         toast.success(response.data.message || "Login successful");
        
//         setTimeout(() => {
//           if (response.data.user?.type === 0) {
//             navigate("/student/dashboard");
//           } else if (response.data.user?.type === 1) {
//             navigate("/institute/dashboard");
//           } else {
//             navigate("/dashboard");
//           }
//         }, 1000);
//       }
//     } catch (error: any) {
//       console.error("Direct login error:", error.response?.data);
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

  return (
    <ContainerWrapper className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={signInImage}
                alt="Sign In Illustration"
                className="w-full h-auto object-cover"
              />
              <div className="bg-yuvaBlue/90 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Welcome to Yuvamanthan</h3>
                <p className="text-sm opacity-90">
                  Empowering youth through education and innovation
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your Yuvamanthan account
              </p>
            </div>

            {/* User Type Selector */}
            <div className="mb-8">
              {/* <label className="block text-sm font-medium text-gray-700 mb-3">
                Login as
              </label> */}
              <div className="grid grid-cols-2 gap-3">
                {/* <Button
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
                </Button> */}
                {/* <Button
                  type="button"
                  variant={userType === 1 ? "default" : "outline"}
                  onClick={() => setUserType(1)}
                  className={`h-12 text-sm font-medium ${
                    userType === 1 
                      ? "bg-yuvaBlue hover:bg-yuvaBlue/90 text-white" 
                      : "text-gray-700"
                  }`}
                  disabled={isLoading}
                >
                  Institute
                </Button> */}
              </div>
            </div>

            {/* Login Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        {userType === 0 ? "Student Email" : "Institute Email"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            userType === 0 
                              ? "student@example.com" 
                              : "institute@example.com"
                          }
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
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel className="text-gray-700 font-medium">
                          Password
                        </FormLabel>
                        <button
                          type="button"
                          className="text-sm text-yuvaBlue hover:text-yuvaBlue/80 font-medium"
                          onClick={() => navigate("/forgot-password")}
                          disabled={isLoading}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={isPasswordShow ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 text-base pr-12"
                            disabled={isLoading}
                            {...field}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Debug Buttons (Development Only)
                {process.env.NODE_ENV === "development" && (
                  <div className="pt-2 space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={testDirectLogin}
                      className="w-full h-11 text-sm border-green-600 text-green-600 hover:bg-green-50"
                      disabled={isLoading}
                    >
                      Test Direct Login
                    </Button>
                    
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
                )} */}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-yuvaBlue hover:bg-yuvaBlue/90 text-white font-semibold text-base"
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
                        Signing In...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {/* Sign Up Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-yuvaBlue hover:text-yuvaBlue/80 font-semibold"
                  onClick={() => navigate("/sign-up")}
                  disabled={isLoading}
                >
                  Sign up here
                </button>
              </p>
            </div>

            {/* Debug Info */}
            {/* {process.env.NODE_ENV === "development" && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Debug Info:</p>
                <p className="text-xs text-gray-600">
                  • Endpoint: <code>POST /auth/login?type={userType}</code><br/>
                  • Request Body: <code>{"{identifier: '', password: ''}"}</code><br/>
                  • User Type: <code>{userType === 0 ? "Student" : "Institute"}</code><br/>
                  • Auth Context: <code>setUser available</code>
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default SignIn;