function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    const cell = table.rows[i].cells[i];
    cell.style.backgroundColor = 'red';
  }
}
