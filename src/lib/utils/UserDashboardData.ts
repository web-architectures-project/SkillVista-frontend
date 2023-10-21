import { TUserDashboardTable } from "@/components/user-dashboard/columns";
import { DateTime } from "luxon";

export const DummyData: TUserDashboardTable[] = [
  {
    provider: "Plumber",
    short_description: "This is a plumber",
    availability: DateTime.now().toLocaleString(DateTime.DATE_MED),
    pricing: "25EUR",
  },
  {
    provider: "Plumber",
    short_description: "This is a plumber",
    availability: DateTime.now().toLocaleString(DateTime.DATE_MED),
    pricing: "25EUR",
  },
  {
    provider: "Plumber",
    short_description: "This is a plumber",
    availability: DateTime.now().toLocaleString(DateTime.DATE_MED),
    pricing: "25EUR",
  },
  {
    provider: "Plumber",
    short_description: "This is a plumber",
    availability: DateTime.now().toLocaleString(DateTime.DATE_MED),
    pricing: "25EUR",
  },
  {
    provider: "Plumber",
    short_description: "This is a plumber",
    availability: DateTime.now().toLocaleString(DateTime.DATE_MED),
    pricing: "25EUR",
  },
];
