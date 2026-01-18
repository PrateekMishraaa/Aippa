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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import correctionForm from "@/validation/correctionFormValidation";
import { useEffect, useState } from "react";
import { z } from "zod";
import CorrectionFormApi, {
	CorrectionFormData,
} from "@/services/correctionFormServices";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface CorrectionProps {
	data?: CorrectionFormData;
}

function Correction({ data }: CorrectionProps) {
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	useEffect(() => {
		if (data?.isFormSubmitted) {
			setIsSubmitted(true);
		}
	}, [data]);

	const { mutateAsync } = useMutation({
		mutationFn: (data: CorrectionFormData) =>
			CorrectionFormApi.updateFormData(data),

		onSuccess: () => {
			setIsSubmitted(true);
		},
	});

	const form = useForm({
		resolver: zodResolver(correctionForm),
		defaultValues: {
			first_name: "",
			last_name: "",
			father_name: "",
			contact: "",
			email: "",
			dob: "",
			gender: "",
			class: "",
			stream: "",
		},
	});

	const watchClass = form.watch("class");
	const isStreamDisabled = watchClass === "11" || watchClass === "12";

	useEffect(() => {
		if (data) {
			form.reset({
				first_name: data.first_name || "",
				last_name: data.last_name || "",
				father_name: data.father_name || "",
				contact: data.contact || "",
				email: data.email || "",
				dob: data.dob || "",
				gender: data.gender || "",
				class: data?.class?.toString() || "",
				stream: data.stream || "",
			});
		}
	}, [data, form]);

	const onSubmit = (value: z.infer<typeof correctionForm>) => {
		toast.promise(mutateAsync(value), {
			loading: "Loading...",
			success: "Form submitted successfully",
			error: (err) => err.response.data.message,
		});
	};

	return (
		<div className="border border-borderColor w-full md:w-5/12 rounded-md py-4 space-y-5 px-5">
			<p className="text-black text-lg font-semibold leading-6 text-start ">
				<strong>Note :</strong> This is a dummy text. This text in future will
				include explanation about the form below.
			</p>

			<h1 className="">
				<span className="text-customBlue font-extrabold text-2xl">
					CORRECTION{" "}
					<span className="text-black font-extrabold text-2xl">FORM</span>
				</span>
			</h1>

			{/* form */}

			{!isSubmitted ? (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						{/* first and last name blocks */}
						<div className="flex gap-8">
							{/* first name */}
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input
												disabled={
													form.getValues("first_name") === data?.first_name
												}
												className="py-5"
												placeholder="Enter your first name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* last name */}
							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input
												disabled={
													form.getValues("last_name") === data?.last_name
												}
												className="py-5"
												placeholder="Enter your last name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/*father name and contact number blocks*/}
						<div className="flex gap-8">
							{/* father name */}
							<FormField
								control={form.control}
								name="father_name"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Father name</FormLabel>
										<FormControl>
											<Input
												// disabled={
												// 	form.getValues("father_name") === data?.father_name
												// }
												className="py-5"
												placeholder="Enter your father name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* contact number */}
							<FormField
								control={form.control}
								name="contact"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Contact no.</FormLabel>
										<FormControl>
											<Input
												// disabled={form.getValues("contact") === data?.contact}
												className="py-5"
												placeholder="Enter your contact no."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* email block */}
						<div>
							{/* email name */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												disabled={form.getValues("email") === data?.email}
												className="py-5"
												placeholder="Enter your email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/*dob and gender blocks*/}
						<div className="flex gap-8">
							{/* dob*/}
							<FormField
								control={form.control}
								name="dob"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Date of birth</FormLabel>
										<FormControl>
											<Input
												disabled={form.getValues("dob") === data?.dob}
												className="py-5"
												placeholder="Enter your date of birth"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* gender */}
							<FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Gender</FormLabel>
										<FormControl>
											<Input
												disabled={form.getValues("gender") === data?.gender}
												className="py-5"
												placeholder="Enter your gender"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/*class and stream blocks*/}
						<div className="flex gap-8">
							{/* class name */}
							<FormField
								control={form.control}
								name="class"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Class name</FormLabel>
										<FormControl>
											<Input
												disabled={
													form.getValues("class") === data?.class?.toString()
												}
												className="py-5"
												placeholder="Enter your class name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* stream number */}
							<FormField
								control={form.control}
								name="stream"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Stream</FormLabel>
										<FormControl>
											<Input
												className="py-5"
												disabled={
													!isStreamDisabled && !form.getValues("stream")
												}
												placeholder="Enter your stream"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button
							type="submit"
							className="w-full py-5 bg-yuvaBlue hover:bg-customBlue text-white text-lg"
						>
							Submit
						</Button>
					</form>
				</Form>
			) : (
				<div className="space-y-3 text-pretty">
					<h2>Your correction form is submitted successfully !!</h2>
					<p>
						Your unique userId and password send to your email please check and
						signIn
					</p>
					<p>
						<Link to={"/"} className="border-b-2 border-slate-500">
							Go to the home
						</Link>{" "}
						or{" "}
						<Link to="/sign-in" className="border-b-2 border-slate-500">
							login
						</Link>
					</p>
				</div>
			)}
		</div>
	);
}

export default Correction;
