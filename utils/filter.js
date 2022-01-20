import { inquiry } from "./inquiry.js";

/**
 * Filters the students based on their interests
 *
 * @param `students` The array of students to be filtered
 */
async function filter({ students }) {
  const answers = await inquiry();

  return students.filter((student) => {
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
}

export { filter };
