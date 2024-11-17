import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import { fetchApiUploadImg } from './upload.api';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {

  },
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchApiUploadImg.rejected, (_, action) => {
        handleErrorApi(action?.error);
      });
  },
});

export const uploadReducer = uploadSlice.reducer;
export const { } = uploadSlice.actions;
