import clipboard from "clipboardy";

import dotenv from "dotenv";
dotenv.config();

import { authenticate } from "./utils/authenticate.js";
import { jsonify } from "./utils/jsonify.js";
import { filter } from "./utils/filter.js";
import { copy } from "./utils/copy.js";

const range = `Sheet1!B:D`;
// const range = `Sheet1!A:G`;

(async () => {
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

    // const students = jsonify({ res });
    const interestedStudents = jsonify({ res });

    // Filter and copy the interested students to clipboard
    // const interestedStudents = await filter({ students });

    await copy({ interestedStudents });
  } catch (err) {
    console.log(err);
  }
})();
