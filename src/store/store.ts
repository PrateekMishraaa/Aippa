import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";

const store = configureStore({
	reducer: {
		authSlice,
		// Add other slices here for other features like user profile, etc.
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type GetState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
