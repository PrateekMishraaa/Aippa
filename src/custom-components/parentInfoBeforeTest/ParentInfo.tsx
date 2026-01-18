import { useForm } from "react-hook-form";
import ContainerWrapper from "../ContainerWrapper";
import WrapperBox from "../WrapperBox";

import familyIcon from "/careerComponents/parentsInfo/FamilyIcon.webp";
import familyImg from "/careerComponents/parentsInfo/FamilyImg.webp";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";

interface ParentInfoProps {
	setIsParentInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ParentInfo = ({ setIsParentInfo }: ParentInfoProps) => {
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	const [isCarBrand, setIsCarBrand] = useState<boolean>();
	const form = useForm({
		defaultValues: {
			fatherName: "",
			fatherAge: "",
			fatherOccupation: "",
			fatherAnnualIncome: "",
			fatherPhoneNumber: "",
			fatherEmail: "",

			motherName: "",
			motherAge: "",
			motherOccupation: "",
			motherAnnualIncome: "",
			motherPhoneNumber: "",
			motherEmail: "",

			isCar: "no",
			carBrand: "",
		},
	});

	useEffect(() => {
		if (loggedInUser) {
			form.reset({
				fatherName: loggedInUser.father_name,
				fatherPhoneNumber: loggedInUser.contact,
				fatherEmail: loggedInUser.email,
			});
		}
	}, [loggedInUser, form]);

	const isCar = form.watch("isCar");

	useEffect(() => {
		if (isCar === "no") {
			setIsCarBrand(true);
		} else {
			setIsCarBrand(false);
		}
	}, [isCar]);

	const onSubmit = (data: unknown) => {
		// note -> save data to the db, api is not created. 
		console.log("Form data", data);
		localStorage.setItem("isParentInfo", "true");
		setIsParentInfo(true);
	};

	return (
		<>
			<ContainerWrapper>
				<WrapperBox>
					{/* title */}
					<div className="flex justify-center items-center gap-5">
						<h1 className="font-semibold text-3xl">Parent's Questionnaire</h1>
						<img src={familyIcon} alt="aippa" className="w-16 h-16" />
					</div>

					<div>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-8"
							>
								{/* father info */}
								<div className="space-y-5">
									<div className="flex items-center gap-5">
										<h3 className="text-xl font-semibold">
											<span className="text-yuvaBlue">Father's</span> info
										</h3>
										<div className="h-1 flex-1 rounded-full bg-slate-300 overflow-hidden">
											<div className="w-7/12 h-full bg-yuvaBlue"></div>
										</div>
									</div>

									<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
										<FormField
											control={form.control}
											name="fatherName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Father's Name</FormLabel>
													<FormControl>
														<Input placeholder="Father's name" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="fatherAge"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Father's Age</FormLabel>
													<FormControl>
														<Input placeholder="Father's age" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="fatherOccupation"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Father's Occupation</FormLabel>
													<FormControl>
														<Input
															placeholder="Father's Occupation"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="fatherAnnualIncome"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Father's Annual Income</FormLabel>
													<FormControl>
														<Input
															placeholder="Father's Annual Income"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="fatherPhoneNumber"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Father's Contact Number</FormLabel>
													<FormControl>
														<Input
															placeholder="Father's Contact Number"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="fatherEmail"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Father's Email</FormLabel>
													<FormControl>
														<Input placeholder="Father's Email" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								{/* mother info */}
								<div className="space-y-5">
									<div className="flex items-center gap-5">
										<h3 className="text-xl font-semibold">
											<span className="text-yuvaBlue">Mother's</span> info
										</h3>
										<div className="h-1 flex-1 rounded-full bg-slate-300 overflow-hidden">
											<div className="w-7/12 h-full bg-yuvaBlue"></div>
										</div>
									</div>

									<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
										<FormField
											control={form.control}
											name="motherName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Mother's Name</FormLabel>
													<FormControl>
														<Input placeholder="Mother's name" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="motherAge"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Mother's Age</FormLabel>
													<FormControl>
														<Input placeholder="Mother's age" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="motherOccupation"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Mother's Occupation</FormLabel>
													<FormControl>
														<Input
															placeholder="Mother's Occupation"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="motherAnnualIncome"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Mother's Annual Income</FormLabel>
													<FormControl>
														<Input
															placeholder="Mother's Annual Income"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="motherPhoneNumber"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Mother's Contact Number</FormLabel>
													<FormControl>
														<Input
															placeholder="Mother's Contact Number"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="motherEmail"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Mother's Email</FormLabel>
													<FormControl>
														<Input placeholder="Mother's Email" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								{/* car info */}
								<div>
									<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
										<FormField
											control={form.control}
											name="isCar"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Does your parent own a car?</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Does your parent own a car?" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="yes">yes</SelectItem>
															<SelectItem value="no">no</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="carBrand"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Car Brand (if any)</FormLabel>
													<FormControl>
														<Input
															placeholder="Hyundai"
															disabled={isCarBrand}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								<div className="h-40 relative flex items-center justify-center">
									<img
										src={familyImg}
										alt="aippa"
										className="w-40 absolute left-0 -bottom-12  "
									/>
									<Button
										type="submit"
										className="bg-yuvaBlue hover:bg-yuvaBlue/90 px-7 py-4"
									>
										Submit
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</WrapperBox>
			</ContainerWrapper>
		</>
	);
};

export default ParentInfo;
