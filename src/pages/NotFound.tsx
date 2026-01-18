import useHooks from "@/context/HookContext";
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
	const { navigate } = useHooks();
	return (
		<ContainerWrapper className="h-svh flex items-center">
			<div className="md:flex ">
				<div className="flex-1 space-y-5 flex flex-col justify-center">
					<h1 className="text-2xl text-notFound404">ERROR 404</h1>
					<h2 className="text-4xl font-semibold font-unbounded text-notFound404">
						Page not found!
					</h2>
					<p className="text-lg text-slate-900 lg:pr-36">
						The page you're trying to access doesn't exist or has been removed.
					</p>
					<div className="flex flex-wrap gap-5">
						<div className="flex flex-wrap gap-3">
							<button
								onClick={() => navigate(-1)}
								className="px-6 py-3 bg-notFound404 hover:bg-notFound404/75 text-slate-100 rounded-xl font-unbounded flex gap-3"
							>
								<MoveLeft /> Go back
							</button>
							<Link
								to={"/"}
								className="px-6 py-3 bg-notFound404 hover:bg-notFound404/75 text-slate-100 rounded-xl font-unbounded flex gap-3"
							>
								<MoveLeft /> Back to home
							</Link>
						</div>
					</div>
				</div>

				<div className="flex-1 mt-5 md:mt-0 md:ml-5">
					<img
						src="/404.webp"
						alt="404-page not found"
						className="w-auto h-auto"
					/>
				</div>
			</div>
		</ContainerWrapper>
	);
};

export default NotFound;
