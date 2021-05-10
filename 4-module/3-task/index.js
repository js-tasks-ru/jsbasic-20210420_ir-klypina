const AGE_COLUMN_INDEX = 1;
const GENDER_COLUMN_INDEX = 2;
const STATUS_COLUMN_INDEX = 3;

function highlight(table) {
  const tbody = table.querySelector('tbody');

  for (let i = 0; i < tbody.rows.length; i++) {
    const row = tbody.rows[i];
    const age = Number(row.cells[AGE_COLUMN_INDEX].textContent);
    const gender = row.cells[GENDER_COLUMN_INDEX].textContent;
    const available = row.cells[STATUS_COLUMN_INDEX].dataset.available;

    // status
    if (available === 'true') {
      row.classList.add('available');
    } else if (available === 'false') {
      row.classList.add('unavailable');
    } else if (available === undefined) {
      row.setAttribute('hidden', true);
    }

    // gender
    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }

    // age
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
