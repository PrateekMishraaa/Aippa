import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";
import "@/css/embla.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";
import Header from "@/custom-components/header/Header.tsx";
import MobileHeader from "@/custom-components/header/MobileHeader.tsx";
import { HookProvider } from "./context/HookContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./utils/ErrorBoundary.tsx";
import { CareerProvider } from "./context/careerContext/CareerContext.tsx";
const BackToTop = lazy(() => import("@/utils/BackToTop"));
const ShareButton = lazy(() => import("@/utils/ShareButton"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<ErrorBoundary>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<HookProvider>
						<AuthProvider>
							<CareerProvider>
								<Header />
								<MobileHeader />
								<App />
								<Toaster richColors />
								<Suspense>
									<BackToTop />
									<ShareButton />
								</Suspense>
							</CareerProvider>
						</AuthProvider>
					</HookProvider>
				</BrowserRouter>
			</QueryClientProvider>
		</Provider>
	</ErrorBoundary>
);
