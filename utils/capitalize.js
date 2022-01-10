/**
 * Capitalize names of students
 *
 * @param name Name of Student
 *
 * RegExp : /w+/g
 *
 * w selects all word characters.
 * w+ selects all matching pattern characters after it (so selects words)
 * g selects every instance of the pattern matched
 */
function capitalize(name) {
  return name.replace(
    new RegExp("\\w+", "g"),
    (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  );
}

module.exports = { capitalize };
