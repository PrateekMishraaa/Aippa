interface EnvConfig {
	VITE_BACKEND_URI: string;
	VITE_RAZORPAY_KEY_ID: string;
	VITE_CIRCLE_CHESS_AUTH_API: string;
	VITE_CIRCLE_CHESS_PLANS_SUBSCRIBE_API: string;
	VITE_CC_API_KEY: string;
	VITE_CC_CUSTOMER_ID: number;
}

const envConfig: EnvConfig = {
	VITE_BACKEND_URI: String(import.meta.env.VITE_BACKEND_URI),
	VITE_RAZORPAY_KEY_ID: String(import.meta.env.VITE_RAZORPAY_KEY_ID),

	// note -> circle chess api's.
	VITE_CIRCLE_CHESS_AUTH_API: String(
		import.meta.env.VITE_CIRCLE_CHESS_AUTH_API
	),
	VITE_CIRCLE_CHESS_PLANS_SUBSCRIBE_API: String(
		import.meta.env.VITE_CIRCLE_CHESS_PLANS_SUBSCRIBE_API
	),
	VITE_CC_API_KEY: String(import.meta.env.VITE_CC_API_KEY),
	VITE_CC_CUSTOMER_ID: Number(import.meta.env.VITE_CC_CUSTOMER_ID),
};

export default envConfig;
