import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import App from "./App.tsx";
import store from "./store/store.ts";
import "./index.css";
import "@/css/embla.css";

import Header from "@/custom-components/header/Header.tsx";
import MobileHeader from "@/custom-components/header/MobileHeader.tsx";

import { HookProvider } from "./context/HookContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CareerProvider } from "./context/careerContext/CareerContext.tsx";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext.jsx";

import ErrorBoundary from "./utils/ErrorBoundary.tsx";

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
                <ThemeProvider>
                  <Header />
                  <MobileHeader />
                  <App />

                  <Toaster richColors />
                  <Suspense fallback={null}>
                    <BackToTop />
                    <ShareButton />
                  </Suspense>
                </ThemeProvider>
              </CareerProvider>
            </AuthProvider>
          </HookProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>
);
