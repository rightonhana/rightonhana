import { readFile, writeFile } from "node:fs/promises";

const filename = "README.md";
const now = new Date();

const holydays = {
	"01/01": "newYear",
	"03/10": "mar10",
	"03/14": "piDay",
	"04/01": "aprilFools",
	"04/22": "earthDay",
	"05/04": "may4th",
	"07/17": "worldEmojiDay",
	"08/08": "catDay",
	"08/26": "dogDay",
	[`09/${now.getFullYear() % 4 === 0 ? 12 : 13}`]: "programmerDay",
	"09/30": "birthday",
	"10/31": "halloween",
	"12/24": "christmas",
	"12/25": "christmas",
	"12/31": "newYear"
};

const date = now.toISOString().split("T")[0].split("-").slice(1).join("/");

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
