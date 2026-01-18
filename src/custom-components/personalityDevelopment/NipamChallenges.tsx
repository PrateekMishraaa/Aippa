import { MoveLeft } from "lucide-react";
import ContainerWrapper from "../ContainerWrapper";
import WrapperBox from "../WrapperBox";
import useHooks from "@/context/HookContext";
import { Button } from "@/components/ui/button";
import EscapeToBack from "@/utils/EscapeToBack";

const NipamChallenges = () => {
	const { navigate } = useHooks();
	EscapeToBack();

	return (
		<>
			<ContainerWrapper>
				<WrapperBox className="relative">
					<img
						src="/halfCircle.webp"
						alt=""
						className="w-24 h-auto absolute top-0 right-10"
					/>

					<div className="relative text-center py-5">
						<MoveLeft
							onClick={() => navigate(-1)}
							size={35}
							className="cursor-pointer md:absolute top-1/2 -translate-y-1/2"
						/>

						<div className="inline-block relative">
							<h1 className="text-2xl sm:text-4xl uppercase font-extrabold font-unbounded">
								nipam
							</h1>

							<img
								src="/star.webp"
								alt="nipam challenge"
								className="w-8 h-8 absolute top-1/2 left-1/2 translate-y-1 -translate-x-40"
							/>

							<img
								src="/star.webp"
								alt="nipam challenge"
								className="absolute bottom-1/2 right-1/2 translate-y-1 translate-x-44"
							/>
						</div>
					</div>

					<div className="pt-10">
						<p className="text-justify text-pretty">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
							id vitae, suscipit at repellat iure consectetur non labore.
							Incidunt excepturi consequuntur dolores a, fugit tempore magni
							molestiae laudantium nihil facere neque rerum debitis velit
							quisquam iste accusantium tempora quidem voluptates veritatis ea
							dolorum iure voluptatibus beatae. Voluptatibus labore, assumenda
							natus exercitationem aut enim at mollitia consequatur numquam
							tenetur nesciunt nostrum eos alias nam illo quasi architecto
							eligendi deserunt similique. Nesciunt, repudiandae! Dolorum
							molestias soluta, quia odio temporibus possimus quae? Fugit minus
							ex perferendis doloribus, sint a cum? Aperiam ratione ullam omnis
							autem facilis accusamus dolorum consequatur dolore dolor? Nisi cum
							adipisci veritatis consequuntur explicabo minus ipsum, quo
							maiores, saepe dolorum dolor, numquam dignissimos voluptatibus
							dolore recusandae non nihil illum aut. Eligendi eveniet aliquid
							eum itaque quibusdam! Voluptatem alias animi sunt rem
							reprehenderit eaque, ipsa deserunt accusamus voluptates harum
							accusantium maxime eum esse enim, sint nobis minus illum sed
							doloribus aliquid sapiente qui commodi laudantium? Veniam
							provident fugiat optio, modi eius doloribus tempora ratione
							quaerat, nemo voluptas aliquam saepe quasi veritatis voluptatum,
							neque deleniti consequatur id suscipit quod? Delectus cumque
							perspiciatis velit officiis voluptatum exercitationem distinctio
							excepturi inventore! Nostrum impedit nobis omnis, minus asperiores
							quis autem perferendis est aut quos saepe mollitia accusamus
							maxime, eius, veritatis modi expedita consequatur exercitationem
							commodi quod eum. Molestias accusamus beatae architecto animi
							excepturi nulla iste quae fuga officiis, praesentium ex? Earum
							optio culpa aliquam necessitatibus! Ea, dolore ratione quae
							tenetur officiis quibusdam nam neque earum atque mollitia
							molestiae praesentium nobis, vitae officia accusamus voluptatum
							pariatur voluptate asperiores nostrum vel consectetur adipisci
							beatae obcaecati? Repudiandae rem quam repellat eveniet illum id a
							neque, corporis eaque! Perspiciatis, omnis autem. Officiis illum
							non dignissimos, ipsam numquam eos blanditiis, sint consequuntur
							consequatur voluptate sit veritatis harum maxime cum iste eius
							nobis deleniti cumque libero laboriosam placeat exercitationem
							atque. Sit debitis itaque eaque magni molestiae beatae blanditiis,
							atque earum sequi, ipsum rem enim a recusandae. Adipisci ratione
							vel a unde ipsum temporibus, perferendis corporis asperiores odit
							minus distinctio recusandae commodi non perspiciatis,
							necessitatibus cupiditate neque, nemo labore assumenda iste
							exercitationem repellat explicabo modi. Ipsam, accusamus nesciunt
							et nihil vero veritatis aut rem voluptatem culpa id quae libero
							consequatur a esse obcaecati repellendus itaque labore repudiandae
							beatae odio alias consequuntur enim impedit! Facere adipisci
							possimus quam, numquam distinctio magni, molestiae expedita
							tempore iure veniam enim, ipsam delectus itaque quia iste nisi!
							Doloribus eligendi commodi magni aliquam minima nemo, nulla
							officiis necessitatibus.
						</p>
					</div>

					<div className="pt-10 text-">
						<Button className="">Take Challenge</Button>
					</div>
				</WrapperBox>
			</ContainerWrapper>
		</>
	);
};

export default NipamChallenges;
