import { Button } from "@/components/ui/button";
import useHooks from "@/context/HookContext";
import { ClipboardList, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ShareButton = () => {
	const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState(false);
	const { location } = useHooks();

	const handleScroll = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const url = window.location.origin + location.pathname + location.search;
	const copyURL = () => {
		navigator.clipboard.writeText(url);
		toast.success(`Link copied ${url}`, {
			duration: 1500,
		});
	};

	const handleIsCopied = () => {
		setIsLinkCopied(true);

		copyURL();

		setTimeout(() => {
			setIsLinkCopied(false);
		}, 2000);
	};

	return (
		<div>
			<Button
				size={"icon"}
				variant={"outline"}
				onClick={handleIsCopied}
				disabled={isLinkCopied}
				className={`fixed right-5 flex transition-all ease-linear rounded-full bg-indigo-600 text-slate-100 outline-none border-none z-50
                ${ isVisible ? "bottom-36 sm:bottom-16" : "bottom-24 sm:bottom-5"} 
				`}
			>
				{!isLinkCopied ? <Share2 /> : <ClipboardList />}
			</Button>
		</div>
	);
};

export default ShareButton;
