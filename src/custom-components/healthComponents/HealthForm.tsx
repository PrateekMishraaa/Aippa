import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ContainerWrapper from "../ContainerWrapper";
import WrapperBox from "../WrapperBox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import healthServiceApis from "@/services/healthService";
import EscapeToBack from "@/utils/EscapeToBack";
import { MoveLeft } from "lucide-react";
import useHooks from "@/context/HookContext";
import healthIcons from "@/constants/healthIcons";
// import { zodResolver } from "@hookform/resolvers/zod";
// import healthValidation from "@/validation/healthValidation";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type ParamsType = {
	id: string;
	username: string;
};

const HealthForm = () => {
	EscapeToBack();
	const { navigate } = useHooks();
	const { id } = useParams<ParamsType>();
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	const [isNext, setIsNext] = useState<boolean>(false);
	const form = useForm({
		// resolver: zodResolver(healthValidation),
		defaultValues: {
			parentId: "",
			parentEmail: "",
			student_admission_no: "",
			general_info: {
				name: "",
				dob: "",
				phone_no: "",
				height: "",
				weight: "",
				aadhar_card_no: "",
				gender: "",
				blood_group: "",
				address: "",
				cswn: "",
				family_income: "",
			},
			family_info: {
				mother: {
					name: "",
					aadhar_card_no: "",
					year_of_birth: "",
					blood_group: "",
					height: "",
					weight: "",
				},
				father: {
					name: "",
					aadhar_card_no: "",
					year_of_birth: "",
					blood_group: "",
					height: "",
					weight: "",
				},
			},
			vision_and_hearing: {
				vision: {
					right_eye: "Normal",
					left_eye: "Normal",
				},
				ears: {
					left: "Normal",
					right: "Normal",
				},
			},
			dental_info: {
				teeth: {
					occlusion: "Normal",
					caries: "Normal",
				},
				tonsils: "Normal",
				gums: "Normal",
			},
			circumference: {
				hip: "",
				waist: "",
			},
			vital_signs: {
				pulse: "",
				blood_pressure: {
					systolic: "",
					diastolic: "",
				},
			},
			posture_evaluation: {
				head_forward: "false",
				sunken_chest: "false",
				round_shoulders: "false",
				kyphosis: "false",
				lordosis: "false",
				abdominal_ptosis: "false",
				body_lean: "false",
				tilted_head: "false",
				shoulders_uneven: "false",
				scoliosis: "false",
				flat_feet: "false",
				knock_knees: "false",
				bow_legs: "false",
			},
			fitness_metrics: {
				bmi: "",
				muscular_strength: {
					core_partial_curl_up: "",
					upper_body_flexed_arm_hang: "",
				},
				flexibility: {
					sit_and_reach: "",
				},
				endurance: {
					meter_run_600: "",
				},
				balance: {
					flamingo_balance_test: "",
				},
				agility: {
					shuttle_run: "",
				},
				speed: {
					sprint_dash: "",
				},
				power: {
					standing_vertical_jump: "",
				},
				coordination: {
					plate_tapping: "",
					alternative_hand_wall_toss_test: "",
				},
			},
			activities: {
				strand_1: "", // Empty strings as placeholders for activities
				strand_2: "",
			},
		},
	});

	const { data } = useQuery({
		queryKey: ["parentGetChildren", "parentId", "childrenId"],
		// todo: remove staticId(13) and add loggedInUser?.id
		queryFn: () => healthServiceApis.getHealthData(13, id),
		enabled: id !== undefined,
	});

	useEffect(() => {
		if (data?.data?.data?.healthRecord && id !== undefined) {
			form.reset({
				parentId: data?.data.data.parentId,
				parentEmail: data?.data.data.parentEmail,
				student_admission_no: data?.data.data.healthRecord.student_admission_no,
				general_info: {
					name: data?.data.data.healthRecord.general_info.name,
					dob: data?.data.data.healthRecord.general_info.dob,
					phone_no: data?.data.data.healthRecord.general_info.phone_no,
					height: data?.data.data.healthRecord.general_info.height,
					weight: data?.data.data.healthRecord.general_info.weight,
					aadhar_card_no:
						data?.data.data.healthRecord.general_info.aadhar_card_no,
					gender: data?.data.data.healthRecord.general_info.gender,
					blood_group: data?.data.data.healthRecord.general_info.blood_group,
					address: data?.data.data.healthRecord.general_info.address,
					cswn: data?.data.data.healthRecord.general_info.cswn,
					family_income:
						data?.data.data.healthRecord.general_info.family_income,
				},
				family_info: {
					mother: {
						name: data?.data.data.healthRecord.family_info.mother.name,
						aadhar_card_no:
							data?.data.data.healthRecord.family_info.mother.aadhar_card_no,
						year_of_birth:
							data?.data.data.healthRecord.family_info.mother.year_of_birth,
						blood_group:
							data?.data.data.healthRecord.family_info.mother.blood_group,
						height: data?.data.data.healthRecord.family_info.mother.height,
						weight: data?.data.data.healthRecord.family_info.mother.weight,
					},
					father: {
						name: data?.data.data.healthRecord.family_info.father.name,
						aadhar_card_no:
							data?.data.data.healthRecord.family_info.father.aadhar_card_no,
						year_of_birth:
							data?.data.data.healthRecord.family_info.father.year_of_birth,
						blood_group:
							data?.data.data.healthRecord.family_info.father.blood_group,
						height: data?.data.data.healthRecord.family_info.father.height,
						weight: data?.data.data.healthRecord.family_info.father.weight,
					},
				},
				vision_and_hearing: {
					vision: {
						right_eye:
							data?.data.data.healthRecord.vision_and_hearing.vision.right_eye,
						left_eye:
							data?.data.data.healthRecord.vision_and_hearing.vision.left_eye,
					},
					ears: {
						left: data?.data.data.healthRecord.vision_and_hearing.ears.left,
						right: data?.data.data.healthRecord.vision_and_hearing.ears.right,
					},
				},
				dental_info: {
					teeth: {
						occlusion: data?.data.data.healthRecord.dental_info.teeth.occlusion,
						caries: data?.data.data.healthRecord.dental_info.teeth.caries,
					},
					tonsils: data?.data.data.healthRecord.dental_info.tonsils,
					gums: data?.data.data.healthRecord.dental_info.gums,
				},
				circumference: {
					hip: data?.data?.data?.healthRecord?.circumference?.hip,
					waist: data?.data?.data?.healthRecord?.circumference?.waist,
				},
				vital_signs: {
					pulse: data?.data.data.healthRecord.vital_signs.pulse,
					blood_pressure: {
						systolic:
							data?.data.data.healthRecord.vital_signs.blood_pressure.systolic,
						diastolic:
							data?.data.data.healthRecord.vital_signs.blood_pressure.diastolic,
					},
				},
				posture_evaluation: {
					head_forward: String(
						data?.data.data.healthRecord.posture_evaluation.head_forward
					),
					sunken_chest: String(
						data?.data.data.healthRecord.posture_evaluation.sunken_chest
					),
					round_shoulders: String(
						data?.data.data.healthRecord.posture_evaluation.round_shoulders
					),
					kyphosis: String(
						data?.data.data.healthRecord.posture_evaluation.kyphosis
					),
					lordosis: String(
						data?.data.data.healthRecord.posture_evaluation.lordosis
					),
					abdominal_ptosis: String(
						data?.data.data.healthRecord.posture_evaluation.abdominal_ptosis
					),
					body_lean: String(
						data?.data.data.healthRecord.posture_evaluation.body_lean
					),
					tilted_head: String(
						data?.data.data.healthRecord.posture_evaluation.tilted_head
					),
					shoulders_uneven: String(
						data?.data.data.healthRecord.posture_evaluation.shoulders_uneven
					),
					scoliosis: String(
						data?.data.data.healthRecord.posture_evaluation.scoliosis
					),
					flat_feet: String(
						data?.data.data.healthRecord.posture_evaluation.flat_feet
					),
					knock_knees: String(
						data?.data.data.healthRecord.posture_evaluation.knock_knees
					),
					bow_legs: String(
						data?.data.data.healthRecord.posture_evaluation.bow_legs
					),
				},
				fitness_metrics: {
					bmi: data?.data.data.healthRecord.fitness_metrics.bmi,
					muscular_strength: {
						core_partial_curl_up:
							data?.data.data.healthRecord.fitness_metrics.muscular_strength
								.core_partial_curl_up,
						upper_body_flexed_arm_hang:
							data?.data.data.healthRecord.fitness_metrics.muscular_strength
								.upper_body_flexed_arm_hang,
					},
					flexibility: {
						sit_and_reach:
							data?.data.data.healthRecord.fitness_metrics.flexibility
								.sit_and_reach,
					},
					endurance: {
						meter_run_600:
							data?.data.data.healthRecord.fitness_metrics.endurance
								.meter_run_600,
					},
					balance: {
						flamingo_balance_test:
							data?.data.data.healthRecord.fitness_metrics.balance
								.flamingo_balance_test,
					},
					agility: {
						shuttle_run:
							data?.data.data.healthRecord.fitness_metrics.agility.shuttle_run,
					},
					speed: {
						sprint_dash:
							data?.data.data.healthRecord.fitness_metrics.speed.sprint_dash,
					},
					power: {
						standing_vertical_jump:
							data?.data.data.healthRecord.fitness_metrics.power
								.standing_vertical_jump,
					},
					coordination: {
						plate_tapping:
							data?.data.data.healthRecord.fitness_metrics.coordination
								.plate_tapping,
						alternative_hand_wall_toss_test:
							data?.data.data.healthRecord.fitness_metrics.coordination
								.alternative_hand_wall_toss_test,
					},
				},
				activities: {
					strand_1: data?.data.data.healthRecord.activities.strand_1[0],
					strand_2: data?.data.data.healthRecord.activities.strand_2[0],
				},
			});

			return;
		}

		if (loggedInUser) {
			form.reset({
				parentId: "",
				parentEmail: "",
				student_admission_no: "",
				general_info: {
					name: loggedInUser.first_name + " " + loggedInUser.last_name,
					dob: loggedInUser.dob || "",
					phone_no: loggedInUser.contact,
					height: "",
					weight: "",
					aadhar_card_no: "",
					gender: loggedInUser.gender,
					blood_group: "",
					address: loggedInUser.address || "",
					cswn: "",
					family_income: "",
				},
				family_info: {
					mother: {
						name: "",
						aadhar_card_no: "",
						year_of_birth: "",
						blood_group: "",
						height: "",
						weight: "",
					},
					father: {
						name: loggedInUser.father_name,
						aadhar_card_no: "",
						year_of_birth: "",
						blood_group: "",
						height: "",
						weight: "",
					},
				},
				vision_and_hearing: {
					vision: {
						right_eye: "Normal",
						left_eye: "Normal",
					},
					ears: {
						left: "Normal",
						right: "Normal",
					},
				},
				dental_info: {
					teeth: {
						occlusion: "Normal",
						caries: "Normal",
					},
					tonsils: "Normal",
					gums: "Normal",
				},
				circumference: {
					hip: "",
					waist: "",
				},
				vital_signs: {
					pulse: "",
					blood_pressure: {
						systolic: "",
						diastolic: "",
					},
				},
				posture_evaluation: {
					head_forward: "false",
					sunken_chest: "false",
					round_shoulders: "false",
					kyphosis: "false",
					lordosis: "false",
					abdominal_ptosis: "false",
					body_lean: "false",
					tilted_head: "false",
					shoulders_uneven: "false",
					scoliosis: "false",
					flat_feet: "false",
					knock_knees: "false",
					bow_legs: "false",
				},
				fitness_metrics: {
					bmi: "",
					muscular_strength: {
						core_partial_curl_up: "",
						upper_body_flexed_arm_hang: "",
					},
					flexibility: {
						sit_and_reach: "",
					},
					endurance: {
						meter_run_600: "",
					},
					balance: {
						flamingo_balance_test: "",
					},
					agility: {
						shuttle_run: "",
					},
					speed: {
						sprint_dash: "",
					},
					power: {
						standing_vertical_jump: "",
					},
					coordination: {
						plate_tapping: "",
						alternative_hand_wall_toss_test: "",
					},
				},
				activities: {
					strand_1: "", // Empty strings as placeholders for activities
					strand_2: "",
				},
			});

			return;
		}
	}, [data, loggedInUser, form, id]);

	const onSubmit = (data: unknown) => {
		console.log("🚀 ~ onSubmit ~ data:", data);
	};

	const handleNextClick = (e: React.MouseEvent) => {
		if (!isNext) {
			e.preventDefault();
			setIsNext(true);
		}
	};

	return (
		<>
			<ContainerWrapper>
				<WrapperBox>
					<h2 className="text-2xl md:text-3xl font-semibold capitalize flex items-center gap-5">
						<MoveLeft
							className="cursor-pointer"
							onClick={() => navigate(-1)}
							size={35}
						/>
						General Information
					</h2>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
							<div className="space-y-5">
								{/* student info */}
								<div>
									<h3 className="text-lg font-semibold flex items-center gap-3">
										<img
											src={healthIcons.student}
											alt="student"
											className="w-5 h-5"
										/>
										Student's Info
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<img
														src={healthIcons.tooltip}
														alt="tooltip"
														className="w-5 h-5"
													/>
												</TooltipTrigger>
												<TooltipContent>
													<p>Add to library</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</h3>

									<div className="mt-2 flex flex-wrap gap-3">
										<FormField
											control={form.control}
											name="student_admission_no"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
													<FormLabel className="capitalize">
														student admission no
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="student admission no"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.name"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">Name</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="name"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.dob"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">DOB</FormLabel>
													<FormControl>
														<Input
															type="date"
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="DOB"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.phone_no"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">
														Phone no.
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="Phone no."
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.height"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">height</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="height"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.weight"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">weight</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="weight"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.aadhar_card_no"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
													<FormLabel className="capitalize">
														aadhar card
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="aadhar card"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.gender"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">gender</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="gender"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.blood_group"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">
														blood group
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="blood group"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.address"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-64 border p-3 rounded-lg">
													<FormLabel className="capitalize">address</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="address"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.cswn"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">cswn</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="cswn"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="general_info.family_income"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">
														family income
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="family income"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								{/* Mother's Info */}
								<div>
									<h3 className="text-lg font-semibold flex items-center gap-3">
										<img
											src={healthIcons.mother}
											alt="student"
											className="w-5 h-5"
										/>
										Mother's Info
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<img
														src={healthIcons.tooltip}
														alt="tooltip"
														className="w-5 h-5"
													/>
												</TooltipTrigger>
												<TooltipContent>
													<p>Add to library</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</h3>

									<div className="m-2 flex flex-wrap gap-3">
										<FormField
											control={form.control}
											name="family_info.mother.name"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
													<FormLabel className="capitalize">Name</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="name"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.mother.aadhar_card_no"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-64 border p-3 rounded-lg">
													<FormLabel className="capitalize">
														aadhar no
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="aadhar no"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.mother.year_of_birth"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">
														year of birth
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="year of birth"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.mother.blood_group"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">
														blood group
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="blood group"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.mother.height"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">height</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="height"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.mother.weight"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">weight</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="weight"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								{/* Father's Info */}
								<div>
									<h3 className="text-lg font-semibold flex items-center gap-3">
										<img
											src={healthIcons.father}
											alt="student"
											className="w-5 h-5"
										/>
										Father's Info
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<img
														src={healthIcons.tooltip}
														alt="tooltip"
														className="w-5 h-5"
													/>
												</TooltipTrigger>
												<TooltipContent>
													<p>Add to library</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</h3>

									<div className="m-2 flex flex-wrap gap-3">
										<FormField
											control={form.control}
											name="family_info.father.name"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
													<FormLabel className="capitalize">Name</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="name"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.father.aadhar_card_no"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-64 border p-3 rounded-lg">
													<FormLabel className="capitalize">
														aadhar no
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="aadhar no"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.father.year_of_birth"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">
														year of birth
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="year of birth"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.father.blood_group"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">
														blood group
													</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="blood group"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.father.height"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">height</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="height"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="family_info.father.weight"
											render={({ field }) => (
												<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
													<FormLabel className="capitalize">weight</FormLabel>
													<FormControl>
														<Input
															className="bg-primaryBg border-none outline-none focus-visible:ring-0"
															placeholder="weight"
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							{isNext && (
								<div className="space-y-5">
									{/* vision and ears */}
									<div className="flex flex-wrap justify-between gap-5">
										{/* vision */}
										<div>
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.vision}
													alt="student"
													className="w-5 h-5"
												/>
												Vision
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2 flex flex-wrap  gap-5">
												<FormField
													control={form.control}
													name="vision_and_hearing.vision.right_eye"
													render={({ field }) => (
														<FormItem className="flex-1 border p-3 rounded-lg">
															<FormLabel>Right Eye</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<FormControl>
																	<SelectTrigger>
																		<SelectValue placeholder={"-- select --"} />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<SelectItem value="Normal">Normal</SelectItem>
																	<SelectItem value="Abnormal">
																		Abnormal
																	</SelectItem>
																</SelectContent>
															</Select>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name="vision_and_hearing.vision.left_eye"
													render={({ field }) => (
														<FormItem className="flex-1 border p-3 rounded-lg">
															<FormLabel>Left Eye</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<FormControl>
																	<SelectTrigger>
																		<SelectValue placeholder="-- select --" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<SelectItem value="Normal">Normal</SelectItem>
																	<SelectItem value="Abnormal">
																		Abnormal
																	</SelectItem>
																</SelectContent>
															</Select>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>

										{/* ears */}
										<div>
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.ear}
													alt="student"
													className="w-5 h-5"
												/>
												Ears
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2 flex flex-wrap gap-5">
												<FormField
													control={form.control}
													name="vision_and_hearing.ears.right"
													render={({ field }) => (
														<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
															<FormLabel>Right</FormLabel>
															<FormControl>
																<RadioGroup
																	onValueChange={field.onChange}
																	defaultValue={field.value}
																	className="flex gap-5"
																>
																	<FormItem className="flex items-center space-x-3 space-y-0">
																		<FormControl>
																			<RadioGroupItem value="Normal" />
																		</FormControl>
																		<FormLabel className="font-normal">
																			Normal
																		</FormLabel>
																	</FormItem>

																	<FormItem className="flex items-center space-x-3 space-y-0">
																		<FormControl>
																			<RadioGroupItem value="Abnormal" />
																		</FormControl>
																		<FormLabel className="font-normal">
																			Abnormal
																		</FormLabel>
																	</FormItem>
																</RadioGroup>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name="vision_and_hearing.ears.left"
													render={({ field }) => (
														<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
															<FormLabel>Left</FormLabel>
															<FormControl>
																<RadioGroup
																	onValueChange={field.onChange}
																	defaultValue={field.value}
																	className="flex gap-5"
																>
																	<FormItem className="flex items-center space-x-3 space-y-0">
																		<FormControl>
																			<RadioGroupItem value="Normal" />
																		</FormControl>
																		<FormLabel className="font-normal">
																			Normal
																		</FormLabel>
																	</FormItem>

																	<FormItem className="flex items-center space-x-3 space-y-0">
																		<FormControl>
																			<RadioGroupItem value="Abnormal" />
																		</FormControl>
																		<FormLabel className="font-normal">
																			Abnormal
																		</FormLabel>
																	</FormItem>
																</RadioGroup>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>
									</div>

									{/* teeth */}
									<div>
										<h3 className="text-lg font-semibold flex items-center gap-3">
											<img
												src={healthIcons.teeth}
												alt="student"
												className="w-5 h-5"
											/>
											Teeth
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<img
															src={healthIcons.tooltip}
															alt="tooltip"
															className="w-5 h-5"
														/>
													</TooltipTrigger>
													<TooltipContent>
														<p>Add to library</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</h3>

										<div className="mt-2 flex flex-wrap gap-5">
											{/* Occulsion */}
											<FormField
												control={form.control}
												name="dental_info.teeth.occlusion"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Occulsion</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().dental_info.teeth.occlusion
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Normal" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Normal
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Abnormal" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Abnormal
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Caries */}
											<FormField
												control={form.control}
												name="dental_info.teeth.caries"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Caries</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().dental_info.teeth.caries
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Normal" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Normal
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Abnormal" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Abnormal
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Tonsils */}
											<FormField
												control={form.control}
												name="dental_info.tonsils"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Tonsils</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().dental_info.tonsils
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Normal" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Normal
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Abnormal" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Abnormal
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Gums */}
											<FormField
												control={form.control}
												name="dental_info.gums"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Gums</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={form.getValues().dental_info.gums}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Normal" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Normal
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Abnormal" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Abnormal
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									{/* Circumference */}
									<div>
										<h3 className="text-lg font-semibold flex items-center gap-3">
											<img
												src={healthIcons.circumference}
												alt="student"
												className="w-5 h-5"
											/>
											Circumference
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<img
															src={healthIcons.tooltip}
															alt="tooltip"
															className="w-5 h-5"
														/>
													</TooltipTrigger>
													<TooltipContent>
														<p>Add to library</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</h3>

										<div className="mt-2 flex flex-wrap gap-5">
											<FormField
												control={form.control}
												name="circumference.hip"
												render={({ field }) => (
													<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
														<FormLabel>Hip</FormLabel>
														<FormControl>
															<Input
																placeholder="hip"
																className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="circumference.waist"
												render={({ field }) => (
													<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
														<FormLabel>Waist</FormLabel>
														<FormControl>
															<Input
																placeholder="waist"
																className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									{/* Health Status */}
									<div>
										<h3 className="text-lg font-semibold flex items-center gap-3">
											<img
												src={healthIcons.health}
												alt="student"
												className="w-5 h-5"
											/>
											Health
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<img
															src={healthIcons.tooltip}
															alt="tooltip"
															className="w-5 h-5"
														/>
													</TooltipTrigger>
													<TooltipContent>
														<p>Add to library</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</h3>

										<div className="mt-2 flex flex-wrap gap-5">
											<FormField
												control={form.control}
												name="vital_signs.pulse"
												render={({ field }) => (
													<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
														<FormLabel>Pulse</FormLabel>
														<FormControl>
															<Input
																placeholder="bpm"
																className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="vital_signs.blood_pressure.systolic"
												render={({ field }) => (
													<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
														<FormLabel>Blood Presure (Systolic)</FormLabel>
														<FormControl>
															<Input
																placeholder="mmhg"
																className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="vital_signs.blood_pressure.diastolic"
												render={({ field }) => (
													<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
														<FormLabel>Blood Presure (Diastolic)</FormLabel>
														<FormControl>
															<Input
																placeholder="mmhg"
																className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									{/* Posture Evaluation  */}
									<div>
										<h3 className="text-lg font-semibold flex items-center gap-3">
											<img
												src={healthIcons.posture}
												alt="student"
												className="w-5 h-5"
											/>
											Posture Evaluation
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<img
															src={healthIcons.tooltip}
															alt="tooltip"
															className="w-5 h-5"
														/>
													</TooltipTrigger>
													<TooltipContent>
														<p>Add to library</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</h3>

										<div className="mt-2 flex flex-wrap gap-5">
											<FormField
												control={form.control}
												name="posture_evaluation.head_forward"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Head Forward</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation
																		.head_forward
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.sunken_chest"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Sunken Chest</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation
																		.sunken_chest
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.round_shoulders"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Round Shoulders</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation
																		.round_shoulders
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.kyphosis"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Kyphosis</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation.kyphosis
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.lordosis"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Lordosis</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation.lordosis
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.abdominal_ptosis"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Abdominal Ptosis</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation
																		.abdominal_ptosis
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.body_lean"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Body Lean</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation.body_lean
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.tilted_head"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Tilted Head</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation
																		.tilted_head
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.shoulders_uneven"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Shoulders Uneven</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation
																		.shoulders_uneven
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.scoliosis"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Scoliosis</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation.scoliosis
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.flat_feet"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Flat Feet</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation.flat_feet
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.knock_knees"
												render={({ field }) => (
													<FormItem className="flex-1 space-y-3 border p-3 rounded-lg">
														<FormLabel>Knock Knees</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation
																		.knock_knees
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="posture_evaluation.bow_legs"
												render={({ field }) => (
													<FormItem className="flex-1 md:flex-none md:pr-6 space-y-3 border p-3 rounded-lg">
														<FormLabel>Bow Legs</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={
																	form.getValues().posture_evaluation.bow_legs
																}
																className="flex gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="true" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		True
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="false" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		False
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									{/* Fitness Components and Muscular Strength  */}
									<div className="flex flex-wrap gap-5 justify-between ">
										{/* Fitness Components */}
										<div className="flex-1">
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.fitness}
													alt="student"
													className="w-5 h-5"
												/>
												Fitness Components
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2">
												<FormField
													control={form.control}
													name="fitness_metrics.bmi"
													render={({ field }) => (
														<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
															<FormLabel>Body Composition (BMI)</FormLabel>
															<FormControl>
																<Input
																	placeholder="bmi"
																	className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>

										{/* Muscular Strength */}
										<div>
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.muscular}
													alt="student"
													className="w-5 h-5"
												/>
												Muscular Strength
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2 flex flex-wrap gap-5">
												<FormField
													control={form.control}
													name="fitness_metrics.muscular_strength.core_partial_curl_up"
													render={({ field }) => (
														<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
															<FormLabel>Core Partial Curl-up</FormLabel>
															<FormControl>
																<Input
																	placeholder="value"
																	className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name="fitness_metrics.muscular_strength.upper_body_flexed_arm_hang"
													render={({ field }) => (
														<FormItem className="w-full sm:w-auto border p-3 rounded-lg">
															<FormLabel className="text-nowrap">
																Upper Body Flexed/Bent Arm Hang
															</FormLabel>
															<FormControl>
																<Input
																	placeholder="value"
																	className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>
									</div>

									{/* Flexibility, Endurance and Balance */}
									<div className="flex flex-wrap justify-between">
										{/* Flexibility */}
										<div className="w-full md:w-auto">
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.flexibility}
													alt="student"
													className="w-5 h-5"
												/>
												Flexibility
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2">
												<FormField
													control={form.control}
													name="fitness_metrics.flexibility.sit_and_reach"
													render={({ field }) => (
														<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
															<FormLabel>Sit and Reach</FormLabel>
															<FormControl>
																<Input
																	placeholder="cm"
																	className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>

										{/* Endurance */}
										<div className="w-full md:w-auto">
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.endurance}
													alt="student"
													className="w-5 h-5"
												/>
												Endurance
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2">
												<FormField
													control={form.control}
													name="fitness_metrics.endurance.meter_run_600"
													render={({ field }) => (
														<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
															<FormLabel>600 Meter Run</FormLabel>
															<FormControl>
																<Input
																	placeholder="seconds"
																	className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>

										{/* Balance */}
										<div className="w-full md:w-auto">
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.balance}
													alt="student"
													className="w-5 h-5"
												/>
												Balance
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2">
												<FormField
													control={form.control}
													name="fitness_metrics.balance.flamingo_balance_test"
													render={({ field }) => (
														<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
															<FormLabel>Flamingo Balance Test</FormLabel>
															<FormControl>
																<Input
																	placeholder="seconds"
																	className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>
									</div>

									{/* Agility, Speed and Power */}
									<div className="flex flex-wrap justify-between gap-5">
										{/* Agility */}
										<div className="w-full md:w-auto">
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.agility}
													alt="student"
													className="w-5 h-5"
												/>
												Agility
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2">
												<FormField
													control={form.control}
													name="fitness_metrics.agility.shuttle_run"
													render={({ field }) => (
														<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
															<FormLabel>Shuttle Run</FormLabel>
															<FormControl>
																<Input
																	placeholder="seconds"
																	className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>

										{/* Speed */}
										<div className="w-full md:w-auto">
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.speed}
													alt="student"
													className="w-5 h-5"
												/>
												Speed
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2">
												<FormField
													control={form.control}
													name="fitness_metrics.speed.sprint_dash"
													render={({ field }) => (
														<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
															<FormLabel>Sprint/Dash</FormLabel>
															<FormControl>
																<Input
																	placeholder="seconds"
																	className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>

										{/* Power */}
										<div className="w-full md:w-auto">
											<h3 className="text-lg font-semibold flex items-center gap-3">
												<img
													src={healthIcons.power}
													alt="student"
													className="w-5 h-5"
												/>
												Power
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<img
																src={healthIcons.tooltip}
																alt="tooltip"
																className="w-5 h-5"
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Add to library</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</h3>

											<div className="mt-2">
												<FormField
													control={form.control}
													name="fitness_metrics.power.standing_vertical_jump"
													render={({ field }) => (
														<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
															<FormLabel>Standing Vertical Jump</FormLabel>
															<FormControl>
																<Input
																	placeholder="seconds"
																	className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>
									</div>

									{/* Coordination */}
									<div>
										<h3 className="text-lg font-semibold flex items-center gap-3">
											<img
												src={healthIcons.coordination}
												alt="student"
												className="w-5 h-5"
											/>
											Coordination
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<img
															src={healthIcons.tooltip}
															alt="tooltip"
															className="w-5 h-5"
														/>
													</TooltipTrigger>
													<TooltipContent>
														<p>Add to library</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</h3>

										<div className="mt-2 flex flex-wrap gap-5">
											<FormField
												control={form.control}
												name="fitness_metrics.coordination.plate_tapping"
												render={({ field }) => (
													<FormItem className="w-full sm:w-52 md:w-60 border p-3 rounded-lg">
														<FormLabel>Plate Tapping</FormLabel>
														<FormControl>
															<Input
																placeholder="seconds"
																className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="fitness_metrics.coordination.alternative_hand_wall_toss_test"
												render={({ field }) => (
													<FormItem className="w-full sm:w-52 md:w-auto border p-3 rounded-lg">
														<FormLabel className="text-nowrap">
															Alternative Hand Wall Toss Test
														</FormLabel>
														<FormControl>
															<Input
																placeholder="catches"
																className="bg-primaryBg border-none outline-none focus-visible:ring-0"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									{/* Sporting Activities (HPE)  */}
									<div>
										<h3 className="text-lg font-semibold flex items-center gap-3">
											<img
												src={healthIcons.sports}
												alt="student"
												className="w-5 h-5"
											/>
											Sporting Activities (HPE)
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<img
															src={healthIcons.tooltip}
															alt="tooltip"
															className="w-5 h-5"
														/>
													</TooltipTrigger>
													<TooltipContent>
														<p>Add to library</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</h3>

										<div className="mt-2 space-y-5">
											<FormField
												control={form.control}
												name="activities.strand_1"
												render={({ field }) => (
													<FormItem className="space-y-3 border p-3 rounded-lg">
														<FormLabel>Strand 1</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={field.value}
																className="flex flex-wrap gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="athletics/swimming" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		ATHLETICS/SWIMMING
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="team game" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		TEAM GAME
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="individual game" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		INDIVIDUAL GAME
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="adventure sports" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		ADVENTURE SPORTS
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="activities.strand_2"
												render={({ field }) => (
													<FormItem className="space-y-3 border p-3 rounded-lg">
														<FormLabel>Strand 2</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={field.value}
																className="flex flex-wrap gap-5"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="mass pt" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		MASS PT
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="yoga" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		YOGA
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="dance" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		DANCE
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="calisthenics" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		CALISTHENICS
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="jOGGING" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		JOGGING
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="cross country run" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		CROSS COUNTRY RUN
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="workout using weights/gym equipment" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		WORKOUTS USING WEIGHTS/GYM EQUIPMENT
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="tai-chi" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		TAI-CHI
																	</FormLabel>
																</FormItem>

																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="others" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		OTHERS
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								</div>
							)}

							{/* Button */}
							<div className="flex justify-end ">
								<Button
									type={isNext ? "submit" : "button"}
									onClick={handleNextClick}
									className="uppercase"
								>
									{isNext ? "submit" : "next"}
								</Button>
							</div>
						</form>
					</Form>
				</WrapperBox>
			</ContainerWrapper>
		</>
	);
};

export default HealthForm;
