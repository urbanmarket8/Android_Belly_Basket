import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../features/userSlice";
import axiosInstance from "./axiosInstance";

// Register user
export const register = async (signUpData) => {
  try {
    const response = await axiosInstance.post("/auth/register", signUpData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      return { success: true, message: "Account created successfully!" };
    } else {
      return {
        success: false,
        message: response.data.message || "Sign up failed. Please try again.",
      };
    }
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

// Login user
export const login = async (loginData, dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login1", loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.access_token) {
      const {
        access_token,
        first_name,
        username,
        last_name,
        email,
        phone_number,
      } = response.data;

      await AsyncStorage.setItem("userToken", access_token);
      const storedToken = await AsyncStorage.getItem("userToken");

      console.log("Token stored in AsyncStorage:", storedToken);
      dispatch(
        setUser({
          name: username,
          firstName: first_name,
          lastName: last_name,
          email: email,
          token: access_token,
          phone_number: phone_number,
        })
      );

      return {
        success: true,
        message: "Login successful!",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Login failed. Please try again.",
      };
    }
  } catch (error) {
    console.error("Login error:", error);

    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessage = error.response.data.errors[0].detail;
      return {
        success: false,
        message: errorMessage,
      };
    }

    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

// Logout user
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    console.log("Token removed from AsyncStorage");

    return {
      success: true,
      message: "Logout successful!",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: "An error occurred during logout. Please try again later.",
    };
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      return {
        success: false,
        message: "User not authenticated. Please log in.",
      };
    }
    const response = await axiosInstance.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data, // User profile data from backend
        message: "User profile retrieved successfully!",
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to retrieve user profile.",
      };
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      success: false,
      message:
        "An error occurred while fetching the profile. Please try again later.",
    };
  }
};

// Update user
// export const updateUser = async (userId, updateData, dispatch) => {
//   try {
//     const token = await AsyncStorage.getItem("userToken");
//     if (!token) {
//       return {
//         success: false,
//         message: "User not authenticated. Please log in.",
//       };
//     }
//     const response = await axiosInstance.put(`/users/${userId}`, updateData, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       const { first_name, username, last_name, email, phone_number } =
//         response.data.data;

//       // Optionally update Redux state
//       dispatch(
//         setUser({
//           name: username,
//           firstName: first_name,
//           lastName: last_name,
//           email: email,
//           phone_number: phone_number,
//         })
//       );

//       return {
//         success: true,
//         message: "User updated successfully!",
//         data: response.data.data,
//       };
//     } else {
//       return {
//         success: false,
//         message: response.data.message || "Update failed. Please try again.",
//       };
//     }
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return {
//       success: false,
//       message: "An error occurred. Please try again later.",
//     };
//   }
// };

export const updateUser = async (userData) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axiosInstance.put(`/users/${userData.userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      return {
        success: true,
        message: "Profile updated successfully!",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update profile.",
      };
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "An error occurred while updating the profile. Please try again later.",
    };
  }
};
