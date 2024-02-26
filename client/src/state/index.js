import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    jobs: [],
    recruiters: [],
    applications: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setJobs: (state, action) => {
            state.jobs = action.payload.jobs;
        },
        setRecruiters: (state, action) => {
            state.recruiters = action.payload.recruiters;
        },
        setApplications: (state, action) => {
            state.applications = action.payload.applications;
        }
    }
});

export const {
    setLogin,
    setLogout,
    setJobs,
    setRecruiters,
    setApplications,
} = authSlice.actions;

export default authSlice.reducer;