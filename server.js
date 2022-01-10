require("dotenv").config();

const { authenticate } = require("./utils/authenticate");
const { jsonify } = require("./utils/jsonify");

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
  } catch (err) {
    console.log(err);
  }
}

main();
