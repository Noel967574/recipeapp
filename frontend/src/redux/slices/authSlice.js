import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ safely get user from localStorage
let parsedUser = null;
try {
  const storedUser = localStorage.getItem("user");
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch (e) {
  parsedUser = null;
}

// ✅ initial states
const initialState = {
  user: parsedUser,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// ✅ Register thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkApi) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/register-user",
        userData
      );
      return res.data.userDetails; // Only return user details
    } catch (e) {
      const message =
        e.response?.data?.message || e.message || "Registration failed!";
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ✅ Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkApi) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        credentials
      );

      // ✅ Fix: backend returns { user, token }
      const { user, token } = res.data;

      // store to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token };
    } catch (e) {
      const message = e.response?.data?.message || "Login failed. Try again.";
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ✅ Get single user details thunk
export const getSingleUser = createAsyncThunk(
  "auth/getSingleUser",
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/user-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        }
      );
      return res.data.userDetails;
    } catch (e) {
      return thunkApi.rejectWithValue(
        e.response?.data?.message || "Failed to fetch user details"
      );
    }
  }
);

// ✅ create authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
      })

      // get single user
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
