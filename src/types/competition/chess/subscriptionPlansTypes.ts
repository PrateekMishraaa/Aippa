interface IFeature {
	name: string;
	value: string;
	library?: string;
	isIcon?: boolean;
}

interface ISubscriptionPlan {
	subscriptionId: number;
	title: string;
	description: string;
	price: string;
	mrp: string;
	monthlyCost?: string;
	YearlyCost?: string;
	YearlyPrice?: string;
	subscriptionIdMonthly?: number;
	subscriptionIdYearly?: number;
	currency: string;
	type: "LIFETIME" | "YEARLY" | "MONTHLY";
	features: IFeature[];
	country: number;
}

export default ISubscriptionPlan;
