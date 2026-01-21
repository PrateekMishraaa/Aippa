import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
// components/Header.jsx
// Line 21 fix karein (typo correction)
import ThemeButton from "../../components/ui/ThemeButton/TheameButton.jsx"; // ✅ Correct spelling
import links from "@/constants/headerLinks";
import useAuth from "@/context/AuthContext";
import useHooks from "@/context/HookContext";
import { useNavigate } from "react-router-dom";
import authServicesApi from "@/services/authService";
import { clearIsLoggedInUser } from "@/store/slices/authSlice";
import { GetState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toast } from "sonner";

const Header = () => {
	const navigatee = useNavigate()
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const { navigate } = useHooks();
	const dispatch = useDispatch();
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	const { mutateAsync } = useMutation({
		mutationFn: () => authServicesApi.signOut(),
		onSuccess: () => {
			localStorage.removeItem("token");
			localStorage.removeItem("id");
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

	return (
		<>
			<div className="bg-white pt-5 hidden sm:block fixed top-0 w-full shadow-md z-[100]">
				<div className="container mx-auto ">
					{/* upper header */}
					<div className="px-5 flex justify-between items-center">
						<div className="logo">
							<Link to="/" className="flex items-center gap-2">
								<img
									src="/aippa_logo.webp"
									alt="aippa by - yuvamanthan"
									className="w-10 h-10"
								/>
								<div className="text-pretty">
									<p className="text-lg font-semibold">AIPPA</p>
									<p className="text-xs flex items-center">
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
						<div className="ml-[62%]">	<ThemeButton/></div>



						<div className="">
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
											<DropdownMenuItem onClick={()=>navigatee('/profile')}>Profile</DropdownMenuItem>
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
					</div>

					{/*  header links */}
					<div className="w-full px-5 flex justify-between lg:justify-center md:gap-1 lg:gap-5 items-center">
						{links(isLoggedIn).map(
							({ routeName, path, isActive }) =>
								isActive && (
									<NavLink
										key={routeName}
										to={path}
										className="capitalize font-semibold text-xs lg:text-base px-2 py-2"
										style={({ isActive }) => ({
											color: isActive ? "#2257fe" : "",
											borderBottom: isActive ? "2px solid #2257fe" : "",
										})}
									>
										{routeName}
									</NavLink>
								)
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
