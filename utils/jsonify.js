const { capitalize } = require("./capitalize");

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
      name: capitalize(attendee[1]),
      email: attendee[2],
      domains: attendee[3].split(", "),
      branch: attendee[5],
      wish: attendee[6] ? attendee[6].split(", ") : [],
    });
  });

  return students;
}

module.exports = { jsonify };
