import inquirer from "inquirer";

import { copyLimit } from "./copy.js";
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

/**
 * Enter the copy limit of Google Groups (ie. number of invitations in one go)
 */
async function copyLimitEnter() {
  return await inquirer.prompt({
    type: "input",
    name: `copyLimit`,
    message: `What is the copy limit?`,
    validate(value) {
      if (parseInt(value) != value) return "Please enter a number";
      else return true;
    },
  });
}

/**
 * Wait for confirmation for [y/N]
 */
async function waitForEnter(n, limit) {
  let skip = false;

  await inquirer.prompt({
    type: "input",
    name: `n`,
    message: `Do you want to copy items [${n + 1} - ${Math.min(
      n + copyLimit,
      limit
    )}] [y/N]`,
    validate(value) {
      if (value != "y" && value != "N") return "Please enter a valid response";
      else if (value == "N") {
        skip = true;
        return true;
      } else return true;
    },
  });

  return skip;
}

export { inquiry, copyLimitEnter, waitForEnter };
