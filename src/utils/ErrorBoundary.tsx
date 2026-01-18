import { Component, ReactNode, ErrorInfo } from "react";

// Define the types for the component's state and props
interface ErrorBoundaryState {
	hasError: boolean;
}

interface ErrorBoundaryProps {
	children: ReactNode; // Props for children, which can be any valid React node (component, JSX, etc.)
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	// componentDidCatch is used to log errors
	componentDidCatch(error: Error, info: ErrorInfo): void {
		console.error("Error caught in ErrorBoundary:", error.message);
		console.error("Error info:", info.componentStack);
	}

	render() {
		// If there was an error, render a fallback UI
		if (this.state.hasError) {
			return (
				<div className="w-screen h-screen flex justify-center items-center">
					Something went wrong while loading the page.
				</div>
			);
		}

		// Otherwise, render the children as usual
		return this.props.children;
	}
}

export default ErrorBoundary;
