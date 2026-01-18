import WrapperBox from "@/custom-components/WrapperBox";
import {
  Award,
  CalendarDays,
  Globe,
  GraduationCap,
  MapPin,
} from "lucide-react";

const assets = [
  { logo: <MapPin />, text: "New Delhi, India" },
  { logo: <CalendarDays />, text: "Wed 15, 2025, 17.00" },
  { logo: <Award />, text: "₹5000 (Winner)" },
  { logo: <GraduationCap />, text: "For 9-12 class" },
  { logo: <Globe />, text: "yuvaamanthan.org" },
];

function EventDes() {
  return (
    <>
      <WrapperBox className="w-[60%] lg:w-[57%]">
        <h1 className="text-start text-lg font-bold md:text-3xl font-unbounded">
          EVENT
          <span className="text-yuvaBlue font-unbounded">
            {" "}
            DESCRIPTION
          </span>{" "}
        </h1>
        <div>
          <p className="w-full font-semibold text-md lg:text-xl lg:leading-10 lg:mb-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
          </p>
        </div>
        <div className="logosAndTexts">
          {assets.map(({ logo, text }, index) => {
            return (
              <div key={index} className="flex justify-start">
                <span className="p-2 border rounded-full bg-gray-200 mb-3">
                  {logo}
                </span>
                {index === 4 ? (
                  <span className="p-1 ms-3 text-yuvaBlue">
                    <a
                      className="hover:underline"
                      href="https://yuvamathan.org/"
                      target="blank"
                    >
                      {text}
                    </a>
                  </span>
                ) : (
                  <span className="p-1 ms-3 text-yuvaBlue">{text}</span>
                )}
              </div>
            );
          })}
        </div>
      </WrapperBox>
    </>
  );
}

export default EventDes;
