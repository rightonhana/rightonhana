import { readFile, writeFile } from "node:fs/promises";

// Functions
const getCurrentDate = date => {
	return date.toISOString().split("T")[0].split("-").slice(1).join("/");
};
const programmerDay = currentYear => {
	return currentYear % 4 === 0 ? 12 : 13;
};
const thanksgivingDay = currentYear => {
	const novMonthIndex = 10;
	const novMonth = 11;
	const weekDays = 7;
	const firstPossibleThanksgivingDate = 22;
	const firstNovDay = new Date(currentYear, novMonthIndex, 1);
	const firstNovDayOfWeek = firstNovDay.getDay();
	
	return firstPossibleThanksgivingDate + (novMonth - firstNovDayOfWeek) % weekDays;
};

// Constants
const filename = "README.md";
const now = new Date();
const currentYear = now.getFullYear();
const date = getCurrentDate(now);

const holidays = {
	"01/01": "newYear",
	"01/31": "ffviiDay",
	"02/14": "valentine",
	"03/01": "akiraToriyama",
	"03/10": "mar10",
	"03/14": "piDay",
	"04/01": "aprilFools",
	"04/22": "earthDay",
	"05/04": "may4th",
	"06/28": "pride",
	"07/17": "worldEmojiDay",
	"08/08": "catDay",
	"08/26": "dogDay",
	[`09/${programmerDay(currentYear)}`]: "programmerDay",
	"09/30": "birthday",
	"10/31": "halloween",
	[`11/${thanksgivingDay(currentYear)}`]: "thanksgiving",
	"12/24": "christmas",
	"12/25": "christmas",
	"12/31": "newYear"
};

readFile(filename, "utf-8")
	.then(data =>
		writeFile(
			filename,
			data.replace(
				/(?<src>src=")(?<path>[^"]*)(?<close>")/u,
				`$1./variants/${holidays[date] ?? "base"}.svg$3`
			),
			"utf-8"
		)
	)
	.then(() => console.log("Update complete."))
	.catch(console.error);
