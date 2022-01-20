import inquirer from "inquirer";

import { DOMAINS, WISH } from "./enums.js";

/**
 * Prompts an inquiry on the interests of users
 * @returns `{domains, wish}` the response from the inquiry
 */
async function inquiry() {
  return await inquirer.prompt([
    {
      type: "checkbox",
      name: "domains",
      message: "Select the domains",
      choices: DOMAINS,
    },
    {
      type: "checkbox",
      name: "wish",
      message: "Select the future session wishes",
      choices: WISH,
    },
  ]);
}

export { inquiry };
