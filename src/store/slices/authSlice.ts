import { createSlice } from "@reduxjs/toolkit";

interface IUser {
	id: number;
	first_name: string;
	middle_name: string | null;
	last_name: string;
	bio: string | null;
	address: string | null;
	banner: string | null;
	class: number;
	contact: string;
	createdAt: string;
	district: string | null;
	dob: string;
	email: string;
	father_name: string;
	fb: string;
	gender: string;
	insta: string;
	instituteId: string | null;
	lkd: string;
	parentEmail: string | null;
	permission: string | null;
	pincode: string | null;
	profile: string | null;
	resume: string | null;
	role: string;
	state: string | null;
	status: string;
	twitter: string;
	updatedAt: string;
	userName: string | null;
	ytb: string;
}

interface IInitialState {
	isLoggedInUser: IUser | null;
}

const initialState: IInitialState = {
	isLoggedInUser: null,
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		getIsLoggedInUser: (state, action) => {
			state.isLoggedInUser = action.payload;
		},

		clearIsLoggedInUser: (state) => {
			state.isLoggedInUser = null;
		},
	},
});

export const { getIsLoggedInUser, clearIsLoggedInUser } = authSlice.actions;
export default authSlice.reducer;
