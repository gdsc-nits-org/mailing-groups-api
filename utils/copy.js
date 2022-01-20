import clipboard from "clipboardy";

/**
 * Joins the Email IDs of students with ", " and copies the string to clipboard and returns the string.
 *
 * Google APIs don't allow accounts outside of workspace to access the
 * admin API, so a string of the emails is copied, and can be pasted into
 * the dialogue box on the site.
 *
 * @param `interestedStudents` The array of intersted students
 */
async function copy({ interestedStudents }) {
  const copyEMailIDs = interestedStudents
    .map((student) => student.email)
    .join(", ");
  clipboard.writeSync(copyEMailIDs);
  return copyEMailIDs
}

export { copy };
