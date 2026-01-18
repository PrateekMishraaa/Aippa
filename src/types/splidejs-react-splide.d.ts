declare module "@splidejs/react-splide" {
	import { Component } from "react";
	import { Splide as SplideCore, SplideOptions } from "@splidejs/splide";

	interface SplideProps {
		options?: SplideOptions;
		ariaLabel?: string;
		children?: React.ReactNode;
	}

	export class Splide extends Component<SplideProps> {
		splide: SplideCore;
	}

	export class SplideSlide extends Component {
		render(): React.ReactNode;
	}
}
