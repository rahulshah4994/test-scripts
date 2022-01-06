const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const { exec } = require("child_process");

const firefoxProfilesPath =
	"/Users/josh/Library/Application Support/Firefox/Profiles";

const firefoxProfilesContents = fs.readdirSync(firefoxProfilesPath);

const dbDir = firefoxProfilesContents[0];
const dbDirPath = firefoxProfilesPath + "/" + dbDir;
const dbDirContents = fs.readdirSync(dbDirPath);

const dbFile = dbDirContents.find((file) => file.endsWith(".db"));

const db = new sqlite3.Database(dbDirPath + "/" + dbFile);

// exec(`certutil -L -d sql:"${dbDirPath}"`, (err, stdout) => {
// 	if (err) {
// 		console.log(err);
// 	}
// 	console.log(stdout);
// });

const controlCharacterRegex = /\\x[01][0-9A-F]/g;
function parseHexString(hexx) {
	var hex = hexx.toString(); //force conversion
	var str = "";
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
}

db.all("SELECT * from nssPublic", (err, rows) => {
	if (!err) {
		const output = rows.map((row) =>
			Object.entries(row).reduce((accum, [key, val]) => {
				if (key === "a81" && val) {
					const hex = val.toString("hex");
					console.log(hex);
					accum[key] = parseHexString(hex);
				}
				return accum;
			}, {})
		);

		console.log(output);
	} else {
		console.log(err);
	}
});
