import clipboard from "clipboardy";
import inquirer from "inquirer";

import dotenv from "dotenv";
dotenv.config();

import { authenticate } from "./utils/authenticate.js";
import { jsonify } from "./utils/jsonify.js";
import { DOMAINS, WISH } from "./utils/enums.js";

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

    /**
     * Join the Email IDs of students with ", " and generate copy string.
     *
     * ! Google APIs don't allow accounts outside of workspace to access the
     * ! admin API, so a string of the emails is copied, and can be pasted into
     * ! the dialogue box on the site.
     */
    // const copyEMailIDs = students.map((student) => student.email).join(", ");
    // clipboard.writeSync(copyEMailIDs);

    let answers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "domains",
        message: "Select the domains > ",
        choices: DOMAINS,
      },
      {
        type: "checkbox",
        name: "wish",
        message: "Select the future session wishes > ",
        choices: WISH,
      },
    ]);

    const interestedStudents = students.filter((student) => {
      let interest = true;

      for (let i = 0; i < answers.domains.length; i++) {
        if (student.domains.indexOf(answers.domains[i]) == -1) {
          interest = false;
          break;
        }
      }

      for (let i = 0; i < answers.wish.length; i++) {
        if (student.wish.indexOf(answers.wish[i]) == -1) {
          interest = false;
          break;
        }
      }

      return interest;
    });

    console.log(interestedStudents);
  } catch (err) {
    console.log(err);
  }
})();
