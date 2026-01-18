import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import compression from "vite-plugin-compression";

export default defineConfig({
	plugins: [
		react(),
		compression({
			algorithm: "gzip",
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// Split large libraries and vendor code into their own chunks
					vendor: [
						"react",
						"react-dom",
						"axios",
						"react-router-dom",
						"react-redux",
						"@reduxjs/toolkit",
						"@tanstack/react-query",
					],
				},
			},
		},
	},
});
