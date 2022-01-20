import dotenv from "dotenv";
dotenv.config();

import { authenticate } from "./utils/authenticate.js";
import { jsonify } from "./utils/jsonify.js";
import { filter } from "./utils/filter.js";
import { copy } from "./utils/copy.js";
import { addMember } from "./utils/addMembers.js"

const range = `Sheet1!A:G`;

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

    const students = jsonify({ res });

    // Filter and copy the interested students to clipboard
    const interestedStudents = await filter({ students });
    const interestedStudentsEmails = await copy({ interestedStudents });

    await addMember(interestedStudentsEmails);  // adding members using puppeteer
    
  } catch (err) {
    console.log(err);
  }
})();
