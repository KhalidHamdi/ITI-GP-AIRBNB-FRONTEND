import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/login/", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for logout
export const performLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Clear tokens and username from cookies and local storage
      Cookies.remove("authToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userId");
      Cookies.remove("username"); // Clear username cookie

      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("username"); // Clear username from local storage

      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        Cookies.get("authToken") || localStorage.getItem("authToken");
      if (!token) {
        return rejectWithValue("No authentication token found.");
      }

      const response = await axiosInstance.get("/api/auth/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to fetch user profile."
      );
    }
  }
);

const initialState = {
  isLoggedIn: false,
  user: null, // Contains user data like username, avatar, etc.
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Synchronous action to handle manual login success
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    // Synchronous action to handle manual logout
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = {
          id: action.payload.user_id,
          username: action.payload.user.username,
          avatar: action.payload.user.avatar,
        };

        // Store tokens and username in both cookies and localStorage
        Cookies.set("authToken", action.payload.key);
        Cookies.set("refreshToken", action.payload.refreshToken);
        Cookies.set("userId", action.payload.user_id);
        Cookies.set("username", action.payload.user.username); // Store username in cookies

        localStorage.setItem("authToken", action.payload.key);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("userId", action.payload.user_id);
        localStorage.setItem("username", action.payload.user.username); // Store username in localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed. Please try again.";
      })
      // Handle logout
      .addCase(performLogout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;

        // Clear cookies and localStorage data including username
        Cookies.remove("authToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userId");
        Cookies.remove("username"); // Remove username from cookies

        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("username"); // Remove username from local storage
      })
      .addCase(performLogout.rejected, (state, action) => {
        state.error = action.payload || "Logout failed. Please try again.";
      })
      // Handle fetching user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          avatar: action.payload.avatar,
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user profile.";
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
