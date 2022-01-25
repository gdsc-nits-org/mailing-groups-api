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

async function waitForEnter(n, limit) {
  let skip = false;

  await inquirer.prompt({
    type: "input",
    name: `n`,
    message: `Do you want to copy items [${n} - ${Math.min(
      n + copyLimit - 1,
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
