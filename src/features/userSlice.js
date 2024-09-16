// features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../api1/UserAPI";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // Your initial state
    userId: null, // Ensure userId is included
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    name: "",
    token: "",
  },
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, email, phone_number, name, token, userId } = action.payload;
      state.userId = userId;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phone_number = phone_number;
      state.name = name;
      state.token = token;
    },
    updateUserProfile: (state, action) => {
      const userData = action.payload;
      updateUser(userData)
        .then((result) => {
          if (result.success) {
            // Update local state with the new user data
            state.firstName = result.data.first_name;
            state.lastName = result.data.last_name;
            state.email = result.data.email;
            state.phone_number = result.data.phone_number;
            state.name = result.data.username;
          } else {
            console.error(result.message);
          }
        });
    },
  },
});

export const { setUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
