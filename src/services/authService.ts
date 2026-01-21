import axiosInstance, { interceptorAxiosInstance } from "@/utils/axiosInstance";
import { toast } from "sonner";

export type SignInType = {
  user: string;
  password: string;
  type?: number;
};

export type SignUpType = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  father_name: string;
  instituteId: string | number;
  email: string;
  contact: string;
  password: string;
  dob: string;
  gender: string;
  institute_name?: string;
};

export type UserType = {
  id: number | string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  role?: 'student' | 'institute' | 'teacher' | 'admin';
  type?: number; // 0=student, 1=institute, 2=admin
  instituteId?: number | null;
  status?: string;
  onBoardStatus?: boolean;
  reviewStatus?: boolean;
  profile?: string | null;
  institution_name?: string;
  institution_address?: string;
  logo?: string;
  contact?: string;
  student_verification?: boolean;
  nipamCheck?: number;
  isModerator?: boolean;
};

export type LoginResponse = {
  success?: boolean;
  message: string;
  user?: UserType;
  jwt?: string;
  token?: string;
  data?: any;
  status?: string | boolean;
};

export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  status?: boolean;
};

class authServicesApi {
  // ==================== AUTHENTICATION APIs ====================

  /**
   * User Login API - OLD API (जो काम कर रही है)
   * Uses: /auth/login?type=0
   */
  static signIn = async (data: SignInType): Promise<{ data: LoginResponse }> => {
    console.log("🔐 Login API Called:", {
      identifier: data.user,
      hasPassword: !!data.password,
      type: data.type || 0
    });

    try {
      // OLD API use करें जो काम कर रही है
      const type = data.type || 0; // default student
      const response = await axiosInstance.post(`/auth/login?type=${type}`, {
        identifier: data.user,  // "identifier" field use करें
        password: data.password
      });
      
      console.log("✅ Login Successful:", {
        user: response.data.user?.email,
        hasJWT: !!response.data.jwt,
        message: response.data.message
      });

      return response;
    } catch (error: any) {
      console.error("❌ Login Failed:", {
        status: error.response?.status,
        error: error.response?.data?.message || error.message,
        data: error.response?.data
      });
      
      // Show toast notification
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
      
      throw error;
    }
  };

  /**
   * Student Registration API
   * Uses: /v2/auth/register?type=0
   */
  static signUpStudent = async (data: SignUpType): Promise<{ data: ApiResponse }> => {
    console.log("📝 Student Registration:", {
      email: data.email,
      name: `${data.first_name} ${data.last_name}`
    });

    try {
      const response = await axiosInstance.post("/v2/auth/register?type=0", data);
      
      if (response.data.success) {
        toast.success(response.data.message || "Registration successful");
      }
      
      console.log("✅ Registration Successful:", response.data);
      return response;
    } catch (error: any) {
      console.error("❌ Registration Failed:", error.response?.data);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed");
      }
      
      throw error;
    }
  };

  /**
   * Institute Registration API
   * Uses: /v2/auth/register?type=1
   */
  static signUpInstitute = async (data: any): Promise<{ data: ApiResponse }> => {
    try {
      const response = await axiosInstance.post("/v2/auth/register?type=1", data);
      
      if (response.data.success) {
        toast.success(response.data.message || "Institute registration successful");
      }
      
      return response;
    } catch (error: any) {
      console.error("❌ Institute registration failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Institute registration failed");
      throw error;
    }
  };

  /**
   * Check User Eligibility (interceptor के लिए)
   */
  static checkIsLoggedIn = async (): Promise<{ data: { status: boolean } }> => {
    const userId = this.getCurrentUserId();
    
    if (!userId) {
      console.log("ℹ️ No user ID found for eligibility check");
      return { data: { status: false } };
    }

    console.log("🔍 Checking eligibility for user ID:", userId);

    try {
      const response = await interceptorAxiosInstance.get(`/auth/checkElligibilty/${userId}`);
      console.log("✅ User eligibility check:", response.data);
      
      // Check different possible response formats
      const status = response.data.success || 
                    response.data.status || 
                    (response.data.message && response.data.message.includes("success")) ||
                    false;
      
      return { data: { status } };
    } catch (error: any) {
      console.error("❌ Eligibility check failed:", {
        status: error.response?.status,
        error: error.response?.data
      });
      return { data: { status: false } };
    }
  };

  /**
   * Get Logged In User Details
   * Uses: /auth/student-Aippa/{id}
   */
  static getLoggedInUser = async (): Promise<{ data: ApiResponse<UserType> }> => {
    const userId = this.getCurrentUserId();
    
    if (!userId) {
      toast.error("User not authenticated");
      throw new Error("User not authenticated");
    }

    console.log("👤 Fetching user details for ID:", userId);

    try {
      const response = await axiosInstance.get(`/auth/student-Aippa/${userId}`);
      console.log("✅ User details fetched:", response.data);
      return response;
    } catch (error: any) {
      console.error("❌ Failed to fetch user details:", error.response?.data);
      
      // If unauthorized, clear auth data
      if (error.response?.status === 401) {
        this.clearAuthData();
        toast.error("Session expired. Please login again.");
      }
      
      throw error;
    }
  };

  /**
   * User Logout API
   * Uses: /auth/logout-Aippa/{id}
   */
  static signOut = async (): Promise<{ data: ApiResponse }> => {
    const userId = this.getCurrentUserId();
    
    if (!userId) {
      console.log("ℹ️ No user ID found for logout");
      this.clearAuthData();
      return Promise.resolve({ 
        data: { 
          success: true, 
          message: "Already logged out",
          status: true
        } 
      });
    }

    console.log("👋 Logging out user:", userId);

    try {
      const response = await axiosInstance.get(`/auth/logout-Aippa/${userId}`);
      
      // Always clear local storage after successful logout
      this.clearAuthData();
      
      toast.success("Logged out successfully");
      console.log("✅ Logout Successful");
      return response;
    } catch (error: any) {
      console.error("❌ Logout API Failed:", error.response?.data);
      
      // Still clear local storage even if API fails
      this.clearAuthData();
      toast.success("Logged out successfully");
      return { 
        data: { 
          success: true, 
          message: "Logged out successfully",
          status: true
        } 
      };
    }
  };

  /**
   * Forgot Password API
   */
  static forgotPassword = async (email: string): Promise<{ data: ApiResponse }> => {
    console.log("📧 Forgot password request for:", email);

    try {
      const response = await axiosInstance.post("/auth/forgot-password", { email });
      
      if (response.data.success) {
        toast.success(response.data.message || "Password reset instructions sent to your email");
      }
      
      console.log("✅ Forgot password request sent:", response.data);
      return response;
    } catch (error: any) {
      console.error("❌ Forgot password failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to send password reset email");
      throw error;
    }
  };

  /**
   * Reset Password API
   */
  static resetPassword = async (token: string, newPassword: string): Promise<{ data: ApiResponse }> => {
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword
      });
      
      if (response.data.success) {
        toast.success(response.data.message || "Password reset successful");
      }
      
      return response;
    } catch (error: any) {
      console.error("❌ Reset password failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Password reset failed");
      throw error;
    }
  };

  /**
   * Change Password API
   */
  static changePassword = async (oldPassword: string, newPassword: string): Promise<{ data: ApiResponse }> => {
    const userId = this.getCurrentUserId();
    
    if (!userId) {
      toast.error("User not authenticated");
      throw new Error("User not authenticated");
    }

    try {
      const response = await axiosInstance.post(`/auth/change-password/${userId}`, {
        oldPassword,
        newPassword
      });
      
      if (response.data.success) {
        toast.success(response.data.message || "Password changed successfully");
      }
      
      return response;
    } catch (error: any) {
      console.error("❌ Change password failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to change password");
      throw error;
    }
  };

  /**
   * Verify Email API
   */
  static verifyEmail = async (token: string): Promise<{ data: ApiResponse }> => {
    try {
      const response = await axiosInstance.post("/auth/verify-email", { token });
      
      if (response.data.success) {
        toast.success(response.data.message || "Email verified successfully");
      }
      
      return response;
    } catch (error: any) {
      console.error("❌ Email verification failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Email verification failed");
      throw error;
    }
  };

  /**
   * Resend Verification Email
   */
  static resendVerificationEmail = async (email: string): Promise<{ data: ApiResponse }> => {
    try {
      const response = await axiosInstance.post("/auth/resend-verification", { email });
      
      if (response.data.success) {
        toast.success(response.data.message || "Verification email sent");
      }
      
      return response;
    } catch (error: any) {
      console.error("❌ Resend verification failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to resend verification email");
      throw error;
    }
  };

  // ==================== LOCAL STORAGE MANAGEMENT ====================

  /**
   * Get current user from localStorage
   */
  static getCurrentUser = (): UserType | null => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        return null;
      }
      return JSON.parse(userStr);
    } catch (error) {
      console.error("❌ Error parsing user from localStorage:", error);
      return null;
    }
  };

  /**
   * Get current user ID
   */
  static getCurrentUserId = (): string | null => {
    const id = localStorage.getItem("id");
    if (!id) {
      const user = this.getCurrentUser();
      return user?.id ? String(user.id) : null;
    }
    return id;
  };

  /**
   * Get authentication token
   */
  static getToken = (): string | null => {
    const token = localStorage.getItem("token") || localStorage.getItem("jwt");
    return token;
  };

  /**
   * Check if user is authenticated
   */
  static isAuthenticated = (): boolean => {
    const token = this.getToken();
    const user = this.getCurrentUser();
    const isAuth = !!(token && user);
    
    console.log("🔐 Authentication check:", {
      hasToken: !!token,
      hasUser: !!user,
      isAuthenticated: isAuth
    });
    
    return isAuth;
  };

  /**
   * Save authentication data after login
   */
  static saveAuthData = (data: LoginResponse): void => {
    console.log("💾 Saving authentication data to localStorage");

    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("jwt", data.jwt);
      console.log("✅ JWT token saved");
    } else if (data.token) {
      localStorage.setItem("token", data.token);
      console.log("✅ Token saved");
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("✅ User data saved:", data.user.email);
      
      // Save user ID
      const userId = data.user.id || data.user.email;
      if (userId) {
        localStorage.setItem("id", String(userId));
        console.log("✅ User ID saved:", userId);
      }
    }
  };

  /**
   * Clear all authentication data
   */
  static clearAuthData = (): void => {
    console.log("🧹 Clearing authentication data from localStorage");
    
    const itemsToRemove = [
      "token",
      "jwt",
      "id",
      "user",
      "refreshToken",
      "authToken",
      "accessToken"
    ];

    itemsToRemove.forEach(item => {
      localStorage.removeItem(item);
      console.log(`✅ Removed: ${item}`);
    });

    console.log("✅ All authentication data cleared");
  };

  // ==================== USER TYPE & ROLE HELPERS ====================

  /**
   * Get user role
   */
  static getUserRole = (): string | null => {
    const user = this.getCurrentUser();
    return user?.role || null;
  };

  /**
   * Get user type (0=student, 1=institute, 2=admin)
   */
  static getUserType = (): number | null => {
    const user = this.getCurrentUser();
    return user?.type !== undefined ? user.type : null;
  };

  /**
   * Check if user is student
   */
  static isStudent = (): boolean => {
    const userType = this.getUserType();
    const role = this.getUserRole();
    return userType === 0 || role === 'student';
  };

  /**
   * Check if user is institute
   */
  static isInstitute = (): boolean => {
    const userType = this.getUserType();
    const role = this.getUserRole();
    return userType === 1 || role === 'institute';
  };

  /**
   * Check if user is admin
   */
  static isAdmin = (): boolean => {
    const userType = this.getUserType();
    const role = this.getUserRole();
    return userType === 2 || role === 'admin';
  };

  /**
   * Get user full name
   */
  static getUserFullName = (): string => {
    const user = this.getCurrentUser();
    if (!user) return "";
    
    if (user.full_name) return user.full_name;
    if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
    if (user.institution_name) return user.institution_name;
    if (user.email) return user.email;
    
    return "User";
  };

  /**
   * Get user email
   */
  static getUserEmail = (): string => {
    const user = this.getCurrentUser();
    return user?.email || "";
  };

  /**
   * Get user institute ID
   */
  static getUserInstituteId = (): number | null => {
    const user = this.getCurrentUser();
    return user?.instituteId || null;
  };

  // ==================== SESSION MANAGEMENT ====================

  /**
   * Validate user session on app load
   */
  static validateSession = async (): Promise<boolean> => {
    console.log("🔍 Validating user session...");
    
    if (!this.isAuthenticated()) {
      console.log("❌ Not authenticated");
      return false;
    }

    try {
      const check = await this.checkIsLoggedIn();
      if (!check.data.status) {
        console.log("❌ Session invalid, clearing auth data");
        this.clearAuthData();
        toast.error("Session expired. Please login again.");
        return false;
      }
      
      console.log("✅ Session valid");
      return true;
    } catch (error) {
      console.error("❌ Session validation failed:", error);
      this.clearAuthData();
      return false;
    }
  };

  /**
   * Auto logout when unauthorized
   */
  static handleUnauthorized = (): void => {
    console.log("🚫 Unauthorized access detected");
    this.clearAuthData();
    toast.error("Session expired. Please login again.");
    
    // Redirect to login page after delay
    setTimeout(() => {
      if (!window.location.pathname.includes("/signin") && 
          !window.location.pathname.includes("/login")) {
        window.location.href = "/signin";
      }
    }, 1000);
  };

  /**
   * Initialize authentication on app load
   */
  static initializeAuth = async (): Promise<{ 
    isAuthenticated: boolean; 
    user: UserType | null;
    error?: string;
  }> => {
    console.log("🚀 Initializing authentication...");

    const isAuth = this.isAuthenticated();
    
    if (!isAuth) {
      console.log("ℹ️ No valid authentication found");
      return { isAuthenticated: false, user: null };
    }

    try {
      const isValid = await this.validateSession();
      
      if (isValid) {
        const user = this.getCurrentUser();
        console.log("✅ Authentication initialized successfully for user:", user?.email);
        return { 
          isAuthenticated: true, 
          user 
        };
      } else {
        return { 
          isAuthenticated: false, 
          user: null,
          error: "Session expired" 
        };
      }
    } catch (error: any) {
      console.error("❌ Authentication initialization failed:", error.message);
      
      // Clear invalid auth data
      this.clearAuthData();
      
      return { 
        isAuthenticated: false, 
        user: null,
        error: error.message 
      };
    }
  };

  /**
   * Logout and redirect to login page
   */
  static logoutAndRedirect = (redirectPath: string = "/signin"): void => {
    console.log("🚪 Logging out and redirecting to:", redirectPath);
    
    // Clear auth data
    this.clearAuthData();
    
    // Call logout API in background (fire and forget)
    this.signOut().catch(() => {
      // Ignore errors for logout API
    });
    
    // Redirect after short delay
    setTimeout(() => {
      window.location.href = redirectPath;
    }, 100);
  };

  // ==================== UPDATE USER PROFILE ====================

  /**
   * Update User Profile
   */
  static updateProfile = async (profileData: Partial<UserType>): Promise<{ data: ApiResponse<UserType> }> => {
    const userId = this.getCurrentUserId();
    
    if (!userId) {
      toast.error("User not authenticated");
      throw new Error("User not authenticated");
    }

    console.log("✏️ Updating profile for user:", userId);

    try {
      const response = await axiosInstance.put(`/auth/update-profile/${userId}`, profileData);
      
      // Update localStorage if successful
      if (response.data.success && response.data.data) {
        const currentUser = this.getCurrentUser();
        const updatedUser = { ...currentUser, ...response.data.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log("✅ Profile updated in localStorage");
      }

      if (response.data.success) {
        toast.success(response.data.message || "Profile updated successfully");
      }
      
      return response;
    } catch (error: any) {
      console.error("❌ Profile update failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update profile");
      throw error;
    }
  };

  /**
   * Upload Profile Picture
   */
  static uploadProfilePicture = async (file: File): Promise<{ data: ApiResponse<{ profileUrl: string }> }> => {
    const userId = this.getCurrentUserId();
    
    if (!userId) {
      toast.error("User not authenticated");
      throw new Error("User not authenticated");
    }

    const formData = new FormData();
    formData.append("profile", file);
    formData.append("userId", userId);

    console.log("📸 Uploading profile picture for user:", userId);

    try {
      const response = await axiosInstance.post(`/auth/upload-profile/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update user in localStorage
      if (response.data.success && response.data.data?.profileUrl) {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          currentUser.profile = response.data.data.profileUrl;
          localStorage.setItem("user", JSON.stringify(currentUser));
          console.log("✅ Profile picture updated in localStorage");
        }
      }

      if (response.data.success) {
        toast.success(response.data.message || "Profile picture updated");
      }

      return response;
    } catch (error: any) {
      console.error("❌ Profile picture upload failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to upload profile picture");
      throw error;
    }
  };
}

export default authServicesApi;