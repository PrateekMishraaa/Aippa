import envConfig from "@/config/envConfig";
import paymentServiceApi from "@/services/paymentService"; // you need new APIs here too

const subscriptionHandler = async (
	plan_id: string,
	user_id: string,
	redirect_uri: string,
	user_name?: string,
	user_email?: string,
	user_contact?: number
) => {
	// 1. Create Subscription for that plan
	const {
		data: { data },
	} = await paymentServiceApi.createSubscription({
		plan_id,
		user_id,
		redirect_uri,
	});

	const options = {
		key: envConfig.VITE_RAZORPAY_KEY_ID,
		subscription_id: data.id,
		name: "AIPPA By - Yuvamanthan",
		description: "Subscription Payment",
		image: "https://aippa-dashboard.vercel.app/aippa_logo.webp",
		callback_url: paymentServiceApi.verifySubscriptionPayment,
		prefill: {
			name: user_name,
			email: user_email,
			contact: user_contact,
		},
		notes: {
			address: "Razorpay Corporate Office",
		},
		theme: {
			color: "#0f1419",
		},
		modal: {
			ondismiss: async function () {
				console.log("Payment popup closed");
			},
		},
	};

	// eslint-disable-next-line
	const rzp1 = new (window as any).Razorpay(options);
	rzp1.open();
};

export default subscriptionHandler;
