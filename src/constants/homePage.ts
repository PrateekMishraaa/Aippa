import {
	ParticipatingSchoolsLogoTypes,
	UpcomingEventsTypes,
	UpcomingProjectsTypes,
} from "@/types/homeDataTypes";
import indianSchoolDanceCompetition from "/indian school dance competition.webp";
import interSchoolDebateCompetition from "/inter school debate competition.webp";

import upcomingProject1 from "/upcomingProject1.webp";
import upcomingProject2 from "/upcomingProject2.webp";

class HomeData {
	static upcomingEvents: UpcomingEventsTypes = [
		{
			title: "indian school dance competition",
			imageUrl: indianSchoolDanceCompetition,
		},
		{
			title: "internal school debate competition",
			imageUrl: interSchoolDebateCompetition,
		},
		{
			title: "indian school dance competition",
			imageUrl: indianSchoolDanceCompetition,
		},
		{
			title: "internal school debate competition",
			imageUrl: interSchoolDebateCompetition,
		},
		{
			title: "indian school dance competition",
			imageUrl: indianSchoolDanceCompetition,
		},
		{
			title: "internal school debate competition",
			imageUrl: interSchoolDebateCompetition,
		},
	];

	static upcomingProjects: UpcomingProjectsTypes = [
		{
			title: "Project 1",
			imageUrl: upcomingProject1,
		},
		{
			title: "Project 2",
			imageUrl: upcomingProject2,
		},
		{
			title: "Project 1",
			imageUrl: upcomingProject1,
		},
		{
			title: "Project 2",
			imageUrl: upcomingProject2,
		},
		{
			title: "Project 1",
			imageUrl: upcomingProject1,
		},
		{
			title: "Project 2",
			imageUrl: upcomingProject2,
		},
	];

	static participatingSchoolsLogo: ParticipatingSchoolsLogoTypes = [
		{
			imageUrl: "/schoolLogo/AWES.webp",
			title: "Army Welfare Education Society",
		},
		{
			imageUrl: "/schoolLogo/dav.webp",
			title: "Dayanand Anglo Vedic",
		},
		{
			imageUrl: "/schoolLogo/dps.webp",
			title: "Delhi Public SChool",
		},
		{
			imageUrl: "/schoolLogo/emrs.webp",
			title: "Eklavya Model Residential Schools",
		},
		{
			imageUrl: "/schoolLogo/jnv.webp",
			title: "Jawahar Navodaya Vidyalaya",
		},
		{
			imageUrl: "/schoolLogo/kvsLogo.webp",
			title: "kendriya Vidyalaya Sangathan",
		},
	];
}

export default HomeData;
