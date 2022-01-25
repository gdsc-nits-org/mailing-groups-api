import { capitalize } from "./capitalize.js";

/**
 *  Modify Sheets Data into JSON format
 *
 *  {
 *    name,
 *    email,
 *    domains,
 *    branch,
 *    wish
 *  }
 */
function jsonify({ res }) {
  const students = [];

  res.forEach((attendee) => {
    students.push({
      name: capitalize(attendee[0]) ?? "",
      email: attendee[1].toLowerCase() ?? "",
      // domains: attendee[3].split(", "),
      // branch: attendee[5],
      // wish: attendee[6] ? attendee[6].split(", ") : [],
    });
  });

  return students;
}

export { jsonify };
