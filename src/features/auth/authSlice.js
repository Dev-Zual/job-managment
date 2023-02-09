import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config.js";
const initialState = {
  isLoading: true,
  isError: false,
  error: "",
  user: { email: "", role: "" },
};

export const signUpEmailPass = createAsyncThunk(
  "auth/signUpEmailPass",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`http://localhost:5000/user/${email}`);
  const data = await res.json();
  if (data.status) {
    return data;
  }
  return email;
});
export const singUpWithGoogle = createAsyncThunk(
  "auth/signUpWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    return data.user.email;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = { email: "", role: "" };
    },
    setUser: (state, { payload }) => {
      state.user.email = payload;
      state.isLoading = false;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpEmailPass.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(signUpEmailPass.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = payload;
      })
      .addCase(signUpEmailPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user.email = "";
      })
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = payload;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user.email = "";
      })
      .addCase(singUpWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.user.email = "";
      })
      .addCase(singUpWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = payload;
      })
      .addCase(singUpWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user.email = "";
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.user.email = "";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        if (payload.status) {
          state.user = payload.data;
        } else {
          state.user.email = payload;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user.email = "";
      });
  },
});

export const { logOut, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
