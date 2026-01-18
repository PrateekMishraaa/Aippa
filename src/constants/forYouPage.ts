import { forYouDataTypes } from "@/types/forYouTypes";

import sehat from "/sehat.webp";
import nipam from "/nipam.webp";
import raisec from "/raisec_forYou.webp";

class ForYouData {
  static data: forYouDataTypes = [
    {
      title: "SEHAT HEALTH MISSION",
      imageUrl: sehat,
      points: [
        "Health check-up done.",
        "Blood test given.",
        "Health questionnaire submitted.",
        "Physical test given.",
        "Parents questionnaire pending.",
      ],
    },
    {
      title: "NIPAM",
      imageUrl: nipam,
      points: [
        "Course is 50% completed.",
        "2 courses bought.",
        "3 videos bought.",
        "Attended 2 live lectures. ",
        "2 debates won.",
      ],
    },
    {
      title: "RAISEC",
      imageUrl: raisec,
      points: [
        "RAISEC is an upcoming activity.",
        "It is a personality based assessment.",
        "Scores vary from 0-20.",
        "RAISEC will be free of cost.",
      ],
    },
  ];
}

export default ForYouData;
