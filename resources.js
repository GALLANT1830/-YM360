import { ADV_PDF } from "@/data/advancedGuidebook";
import { AWARDS_PDF } from "@/data/awards";

// type: official | external | pending. "pending" = the file has not been supplied to YM360 yet, so there is nothing to open.
export const resources = [
  {
    id: "R-ADV", title: "Young Marines Advanced Guidebook", type: "official", source: "Young Marines (supplied PDF)",
    desc: "Performance Objectives 1–10 for the Advanced Young Marine (YM Gunnery Sergeant and above), with Performance Qualification Reviews. YM360 builds its PO/EO study pages from this file.",
    audience: "Advanced", subjects: ["Guidebook", "Leadership development", "Public speaking", "Field skills", "Citizenship and history"],
    revision: "Revision date not shown in the file", url: ADV_PDF, app: "/guidebooks/advanced",
  },
  {
    id: "R-AWD", title: "Young Marines Awards Manual", type: "official", source: "Young Marines (supplied PDF)",
    desc: "Ribbon chart, order of precedence, eligibility, criteria, devices, DOM, medallions and Adult Volunteer awards. Used as the basis of the YM360 Awards reference.",
    audience: "All Young Marines and unit staff", subjects: ["Awards", "Leadership school", "Billet"],
    revision: "File name “Awards2017v3_V2”; text references dates through March 2020 — confirm the current edition", url: AWARDS_PDF, app: "/awards",
  },
  {
    id: "R-JR", title: "Young Marines Junior Guidebook", type: "pending", source: "Young Marines",
    desc: "Not yet added to YM360. When the file is supplied, its POs and EOs will get the same study pages as the Advanced Guidebook.",
    audience: "Junior", subjects: ["Guidebook"], revision: "Not supplied",
  },
  {
    id: "R-BAS", title: "Young Marines Basic Guidebook", type: "pending", source: "Young Marines",
    desc: "Not yet added. Per the site owner, the version in use is the revision dated August 1, 2021.",
    audience: "Basic / Recruit", subjects: ["Guidebook"], revision: "Revision dated August 1, 2021 (per site owner)",
  },
  {
    id: "R-SR", title: "Young Marines Senior Guidebook", type: "pending", source: "Young Marines",
    desc: "Not yet added to YM360.", audience: "Senior", subjects: ["Guidebook"], revision: "Not supplied",
  },
  {
    id: "R-MCO", title: "Marine Corps Order 5060.20 — Marine Corps Drill and Ceremonies Manual", type: "pending", source: "U.S. Marine Corps (not a Young Marines manual)",
    desc: "A Marine Corps publication, not specific to the Young Marines. Not yet added. Per the site owner, the version in use is dated May 15, 2019.",
    audience: "All", subjects: ["Drill and ceremonies"], revision: "May 15, 2019 (per site owner)",
  },
  {
    id: "R-TOM", title: "Training Officers Manual (TOM) — complete drill manual with color guard and guidon drill", type: "external", source: "youngmarines.com (named in the Advanced Guidebook, AYM-1-1)",
    desc: "The Advanced Guidebook says to find the TOM at youngmarines.com: Adult Leaders → Training and Education → scroll to the TOM. YM360 links only to the main site.",
    audience: "Advanced / unit staff", subjects: ["Drill and ceremonies", "Billet"], revision: "Check the site for the current version", url: "https://www.youngmarines.com",
  },
  {
    id: "R-PSA", title: "Presidential Volunteer Service Awards", type: "external", source: "presidentialserviceawards.gov (named in the Awards Manual, p. 15)",
    desc: "The website the Awards Manual says unit staff use to establish a group and track volunteer hours.", audience: "Unit Commanders / staff", subjects: ["Awards", "Citizenship and history"],
    revision: "External website", url: "https://www.presidentialserviceawards.gov",
  },
];

export const RESOURCE_SUBJECTS = [
  "Guidebook", "Awards", "Drill and ceremonies", "Field skills", "Citizenship and history", "Fitness, health and first aid",
  "Public speaking", "Leadership development", "Leadership school", "Billet", "Event",
];