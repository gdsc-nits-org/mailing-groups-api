const { google } = require("googleapis");

let sheets;

/**
 * Authenticate to Google Sheets API
 * using GOOGLE_APPLICATION_CREDENTIALS env var
 *
 * @returns Google Sheets Object
 */
async function authenticate() {
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  const auth = await google.auth.getClient({ scopes: SCOPES });

  return google.sheets({
    version: "v4",
    auth,
  });
}

module.exports = { authenticate, sheets };
