import clipboard from "clipboardy";

import dotenv from "dotenv";
dotenv.config();

import { authenticate } from "./utils/authenticate.js";
import { jsonify } from "./utils/jsonify.js";

const range = `Sheet1!A:G`;
async function main() {
  try {
    console.log("API started");

    const sheets = await authenticate();

    // Get Data from Google Sheets
    const res = (
      await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range,
      })
    ).data.values;
    res.shift(); // Removes the first row (headings) of sheets

    const students = jsonify({ res });

    /**
     * Join the Email IDs of students with ", " and generate copy string.
     *
     * ! Google APIs don't allow accounts outside of workspace to access the
     * ! admin API, so a string of the emails is copied, and can be pasted into
     * ! the dialogue box on the site.
     */
    const copyEMailIDs = students.map((student) => student.email).join(", ");
    clipboard.writeSync(copyEMailIDs);
  } catch (err) {
    console.log(err);
  }
}

main();
