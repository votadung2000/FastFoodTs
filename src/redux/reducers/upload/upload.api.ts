import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleApiCall, UploadImage } from '@common';
import ApiUploadImg from '@apiUploadImg';

export const fetchApiUploadImg = createAsyncThunk(
  'upload/fetchApiUploadImg',
  async (params: UploadImage = {}, { rejectWithValue }) => {
    try {
      const response = await handleApiCall(() => ApiUploadImg(params));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
