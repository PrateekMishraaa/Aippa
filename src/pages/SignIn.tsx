import ContainerWrapper from "@/custom-components/ContainerWrapper";
import { useForm } from "react-hook-form";
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
import { EyeClosed, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useHooks from "@/context/HookContext";
import useAuth from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServicesApi, { SignInType } from "@/services/authService";
import { z } from "zod";
import signInSchema from "@/validation/signInValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import signInImage from "/signIn.webp";
import scrollToTop from "@/utils/scrollToTop";

const SignIn = () => {
	console.log("this is input",Input)
	const queryClient = useQueryClient();
	const { navigate } = useHooks();
	const { setIsLoggedIn } = useAuth();
	const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);

	const { mutateAsync } = useMutation({
		mutationFn: (data: SignInType) => authServicesApi.signIn(data),
		onSuccess: async (data) => {
			localStorage.setItem("token", data.data.token);
			localStorage.setItem("id", data.data.id);
			setIsLoggedIn(true);
			scrollToTop();
			navigate(-1);

			await queryClient.invalidateQueries({
				queryKey: ["loggedInUser"],
			});
		},
	});

	const form = useForm({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			user: "",
			password: "",
		},
	});

	const onSubmit = async (value: z.infer<typeof signInSchema>) => {
		const response = mutateAsync(value);

		toast.promise(response, {
			loading: "Loading...",
			success: "login success",
			error: (err) => err.response.data.error,
		});
	};

	return (
		<>
			<ContainerWrapper className="h-screen md:flex items-center">
				<div className="w-full md:flex gap-16 items-center pb-[100px] md:pb-0">
					<div className="w-full md:w-1/2">
						<img
							src={signInImage}
							alt="aippa"
							className="w-full h-[650px] md:h-auto rounded-xl"
						/>
					</div>

					<div className="w-full md:w-1/2">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-8 rounded-xl shadow-md p-8 mt-5 md:mt-0 "
							>
								<div className="text-center">
									<h1 className="text-xl font-semibold">Sign In</h1>
								</div>

								<FormField
									control={form.control}
									name="user"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username / Email</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your username or email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="relative">
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type={`${!isPasswordShow && "password"}`}
													placeholder="Enter your password"
													{...field}
												/>
											</FormControl>
											<div
												className="w-7 h-7 flex items-center justify-center absolute bottom-1 right-1 cursor-pointer"
												onClick={() => setIsPasswordShow(!isPasswordShow)}
											>
												{!isPasswordShow ? <EyeClosed /> : <EyeOff />}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									className="w-full bg-yuvaBlue hover:bg-yuvaBlue/80"
								>
									Submit
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</ContainerWrapper>
		</>
	);
};

export default SignIn;
