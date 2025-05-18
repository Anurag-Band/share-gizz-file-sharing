import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { setEstimatedTime, setUploadProgress } from "./fileSlice";

export const uploadFile = createAsyncThunk(
  "file/upload",
  async (formData, thunkAPI) => {
    try {
      // Log the FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axiosInstance.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded * 100) / total);
          thunkAPI.dispatch(setUploadProgress(progress));
          const startTime = new Date().getTime();
          const remainingTime =
            (total - loaded) /
            (loaded / (new Date().getTime() - startTime)) /
            1000; // in seconds
          thunkAPI.dispatch(setEstimatedTime(remainingTime.toFixed(2)));
        },
      });

      // Check if response and response.data exist before using them
      if (response && response.data) {
        localStorage.setItem("data", JSON.stringify(response.data));
        
        // Only set downloadContent if it exists in the response
        if (response.data.downloadedContent) {
          localStorage.setItem("downloadContent", response.data.downloadedContent);
        }
      }

      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return thunkAPI.rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);
export const downloadFile = createAsyncThunk(
  "file/download",
  async (fileId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/file/${fileId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file"); // Change the filename as needed
      document.body.appendChild(link);
      link.click();

      const fileData = JSON.parse(localStorage.getItem("data"));
      fileData.downloadedContent += 1;
      localStorage.setItem("data", JSON.stringify(fileData));
      localStorage.setItem("downloadContent", fileData.downloadedContent);

      return fileData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
