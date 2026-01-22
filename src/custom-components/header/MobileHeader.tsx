import links from "@/constants/headerLinks";
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import logo from "/aippa_logo.webp";

import { Backpack, Home, LayoutDashboard, LogOut, Trophy } from "lucide-react";
import useAuth from "@/context/AuthContext";
import useHooks from "@/context/HookContext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import authServicesApi from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { GetState } from "@/store/store";
import { clearIsLoggedInUser } from "@/store/slices/authSlice";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const MobileHeader = () => {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const { navigate, location } = useHooks();
	const dispatch = useDispatch();
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	const { mutateAsync } = useMutation({
		mutationFn: () => authServicesApi.signOut(),
		onSuccess: () => {
			// localStorage.removeItem("token");
			// localStorage.removeItem("id");
			dispatch(clearIsLoggedInUser());
			setIsLoggedIn(false);
			navigate("/");
		},
	});

	const handleLogout = async () => {
		toast.promise(mutateAsync(), {
			loading: "Loading...",
			success: "logout success",
			error: (err) => err.response.data.error,
		});
	};

	const mobileNavigationBar = [
		{
			routeName: "Home",
			path: "/",
			isActive: true,
			icon: <Home />,
		},
		{
			routeName: "Dashboard",
			path: "/dashboard",
			isActive: isLoggedIn,
			icon: <LayoutDashboard />,
		},
		{
			routeName: "Career",
			path: "/career",
			isActive: true,
			icon: <Backpack />,
		},
		{
			routeName: "Competition",
			path: "/competition",
			isActive: true,
			icon: <Trophy />,
		},
	];

	const mobileHorizontalHeader = [
		{
			routeName: "Health",
			path: "/health",
			isActive: true,
		},
		{
			routeName: "Personality Development",
			path: "/personality-development",
			isActive: true,
		},
		{
			routeName: "Safety",
			path: "/safety",
			isActive: true,
		},
	];

	return (
		<>
			<div className="bg-white block sm:hidden fixed top-0 w-full shadow-md z-[100]">
				{/* header logo, signIn/signOut and toggle button */}
				<div className="container mx-auto flex justify-between items-center px-5 gap-5 py-2">
					<div className="flex gap-3 items-center">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" size={"icon"}>
									<RxHamburgerMenu />
								</Button>
							</SheetTrigger>

							<SheetContent side={"left"} className="z-[101] text-start">
								<SheetHeader>
									<SheetTitle>AIPPA</SheetTitle>
									<SheetDescription className="capitalize">
										india progressive parent's association
									</SheetDescription>
								</SheetHeader>

								<SheetDescription className="h-full text-sm font-semibold py-5 flex flex-col relative space-y-3">
									<>
										{links(isLoggedIn).map(
											({ routeName, path, isActive }) =>
												isActive && (
													<SheetClose key={routeName} asChild>
														<Link
															to={path}
															className="capitalize text-slate-900 text-base font-semibold"
														>
															{routeName}
														</Link>
													</SheetClose>
												)
										)}
									</>
								</SheetDescription>
							</SheetContent>
						</Sheet>

						<Link to="/" className="flex items-center gap-2">
							<img src={logo} alt="aippa logo" className="w-10 h-10" />
							<div>
								<p className="text-lg font-semibold">AIPPA</p>
								<p className="text-xs font-semibold flex items-center text-nowrap">
									By -{" "}
									<img
										src="/yuvamanthan_logo.webp"
										alt="yuvamanthan"
										className="w-40 h-auto -mt-2"
									/>
								</p>
							</div>
						</Link>
					</div>

					{isLoggedIn ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="outline-none uppercase">
								<Avatar>
									<AvatarImage src={`${loggedInUser?.profile}`} />
									<AvatarFallback>
										{loggedInUser?.first_name[0]}
										{loggedInUser?.last_name[0]}
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>

							<DropdownMenuContent className="w-56 mr-2 z-[102]">
								{isLoggedIn && (
									<DropdownMenuLabel className="capitalize">
										Welcome, {loggedInUser?.first_name}
									</DropdownMenuLabel>
								)}
								<DropdownMenuSeparator />

								<DropdownMenuGroup>
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem>Settings</DropdownMenuItem>
								</DropdownMenuGroup>

								<DropdownMenuSeparator />

								<DropdownMenuItem onClick={handleLogout}>
									Log out
									<DropdownMenuShortcut>
										<LogOut className="w-4 h-4" />
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button
							onClick={() => navigate("/sign-in")}
							className="bg-yuvaBlue hover:bg-yuvaBlue/90"
						>
							Sign in
						</Button>
					)}
				</div>

				{/* header nav sec */}
				<div>
					<div className="border-y py-1 capitalize px-5 text-sm font-semibold">
						india progressive parent's association
					</div>

					<div className="flex items-center px-5 py-2 gap-5 overflow-x-scroll hideScrollBar mt-2">
						{mobileHorizontalHeader.map(
							({ routeName, path, isActive }) =>
								isActive && (
									<Link
										key={routeName}
										to={path}
										className={`px-2 py-1 rounded-md
											${location.pathname === path ? "bg-blue-200 " : ""}
											`}
									>
										<p className="capitalize font-semibold text-slate-700 text-sm text-nowrap">
											{routeName}
										</p>
									</Link>
								)
						)}
					</div>
				</div>

				{/* footer nav */}
				<div
					className="w-full fixed bottom-0 py-5 bg-white z-[100] "
					style={{ boxShadow: "0px -2px 20px -8px rgba(0,0,0,0.83)" }}
				>
					<div className="flex justify-evenly ">
						{mobileNavigationBar.map(
							({ icon, isActive, path, routeName }) =>
								isActive && (
									<Link
										key={routeName}
										to={path}
										className={`text-xs font-semibold px-4 flex flex-col items-center hover:text-yuvaBlue
												${location.pathname === path ? "text-yuvaBlue " : ""}
											  `}
									>
										{icon}
										{routeName}
									</Link>
								)
						)}
					</div>
				</div>
			</div>
		</>
	);
};
export default MobileHeader;
