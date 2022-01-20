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

    console.log(students); // Data of Students in JSON Format

    console.log(clipboard);
  } catch (err) {
    console.log(err);
  }
}

main();
