// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../../config/axiosInstance';

// REGISTER
export const registerUser = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/users/register', formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message || 'Registration failed');
  }
});

// LOGIN
export const loginUser = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
  try {
    // Modify the request to include both email and username fields
    // This way the server can check either one
    const loginData = {
      email: formData.email,
      username: formData.email, // Use the email value for both fields
      password: formData.password
    };

    console.log("Sending login request with:", loginData);
    const res = await axiosInstance.post('/users/login', loginData);
    return res.data;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});


// updateUser
export const updateUser = createAsyncThunk('auth/updateUser', async ({ userId, formData }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/user/${userId}`, formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// deleteUser
export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/user/${userId}`);
    return userId;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

//getUser
export const getUser = createAsyncThunk('auth/getUser', async (userId, { rejectWithValue }) => {
  try {
    console.log("Fetching user with ID:", userId);

    // Fix the API endpoint to match the server route
    const res = await axiosInstance.get(`/users/user/${userId}`);
    console.log("User data response:", res);

    return res.data;
  } catch (err) {
    console.error("Error fetching user:", err);
    return rejectWithValue(err.response?.data || "Failed to fetch user data");
  }
});





