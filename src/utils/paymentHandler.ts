import envConfig from "@/config/envConfig";
import paymentServiceApi from "@/services/paymentService";

const paymentHandler = async (
	amount: number,
	currency: string,
	user_id: string,
	order_name: string,
	redirect_uri: string,
	user_name?: string,
	user_email?: string,
	user_contact?: number
) => {
	const {
		data: { data },
	} = await paymentServiceApi.paymentCreateOrder({
		order_name,
		user_id,
		amount,
		currency,
		redirect_uri,
	});

	const options = {
		key: envConfig.VITE_RAZORPAY_KEY_ID,
		amount: data.amount,
		currency: data.currency,
		name: "AIPPA By - Yuvamanthan",
		description: order_name,
		image: "https://aippa-dashboard.vercel.app/aippa_logo.webp", //Note: will be replace with aippa logo uri
		order_id: data.id,
		callback_url: paymentServiceApi.paymentVerification,
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
			ondismiss: function async() {
				paymentServiceApi.deleteUnusedInstance(data.id);
			},
		},
	};

	// eslint-disable-next-line
	const rzp1 = new (window as any).Razorpay(options);
	rzp1.open();
};

export default paymentHandler;
