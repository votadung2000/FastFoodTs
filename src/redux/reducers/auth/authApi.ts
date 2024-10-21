import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    ApiLogin,
    ApiUserProfile,
    ApiRegister,
    ApiUpdateProfile,
    ApiUpdatePassword,
} from '@api';
import { handleApiCall } from "@common";
import { getToken } from "@storage";

export interface Root {
    status_code: number
    data: any
}

export const fetchApiLogin = createAsyncThunk(
    'user/fetchApiLogin',
    async (data: any, { rejectWithValue }) => {
        return handleApiCall(() => ApiLogin(data)).catch(rejectWithValue);
    }
)

export const fetchApiUserProfile = createAsyncThunk(
    'user/fetchApiUserProfile',
    async (_, { rejectWithValue }) => {
        return handleApiCall(() => ApiUserProfile()).catch(rejectWithValue);
    }
)

export const refetchApiUserProfile = createAsyncThunk(
    'user/refetchApiUserProfile',
    async () => {
        let token = await getToken();
        if (token) {
            fetchApiUserProfile();
        }
    }
)

export const fetchApiRegister = createAsyncThunk(
    'user/fetchApiRegister',
    async (data:any, { rejectWithValue }) => {
        return handleApiCall(() => ApiRegister(data)).catch(rejectWithValue);
    }
)

export const fetchApiUpdateProfile = createAsyncThunk(
    'user/fetchApiUpdateProfile',
    async (data:any, { rejectWithValue }) => {
        return handleApiCall(() => ApiUpdateProfile(data)).catch(rejectWithValue);
    }
)

export const fetchApiUpdatePassword = createAsyncThunk(
    'user/fetchApiUpdatePassword',
    async (data:any, { rejectWithValue }) => {
        return handleApiCall(() => ApiUpdatePassword(data)).catch(rejectWithValue);
    }
)