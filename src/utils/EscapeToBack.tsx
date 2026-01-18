import useHooks from "@/context/HookContext";
import { useEffect } from "react";

const EscapeToBack = () => {
	const { navigate } = useHooks();
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				navigate(-1);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [navigate]);
	return;
};

export default EscapeToBack;
