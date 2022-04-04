import { readFile, writeFile } from "node:fs/promises";

const filename = "README.md";

const leapYear = new Date().getFullYear() % 4 === 0;

const programmerDay = leapYear ? {"09/12": "programmerDay"} : {"09/13": "programmerDay"};

const holydays = {
	"01/01": "newYear",
	"04/01": "aprilFools",
	...programmerDay,
	"09/30": "birthday",
	"10/31": "halloween",
	"12/24": "christmas",
	"12/25": "christmas",
	"12/31": "newYear"
};

const date = new Date()
	.toISOString()
	.split("T")[0]
	.split("-")
	.slice(1)
	.join("/");

readFile(filename, "utf-8")
	.then(data =>
		writeFile(
			filename,
			data.replace(
				/(?<src>src=")(?<path>[^"]*)(?<close>")/u,
				`$1./variants/${holydays[date] ?? "base"}.svg$3`
			),
			"utf-8"
		)
	)
	.then(() => console.log("Update complete."))
	.catch(console.error);
