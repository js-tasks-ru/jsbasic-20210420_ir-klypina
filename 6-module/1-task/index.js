/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this._rows = rows;
    this._render();
  }

  _render() {
    this.elem = document.createElement('table');
    this.elem.innerHTML = this._tableTemplate();
    this.elem.addEventListener('click', this._onTableClick)
  }

  _tableTemplate() {
    return this._tableHeadTemplate() + this._tableBodyTemplate();
  }

  _tableHeadTemplate() {
    return `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
    `;
  }

  _tableBodyTemplate() {
    return `
      <tbody>
        ${this._rows.map(row => this._rowTemplate(row)).join('')}
      </tbody>
    `;
  }

  _rowTemplate({ name = '-', age = 0, salary = 0, city = '-' } = {}) {
    return `
      <tr>
        <td>${name}</td>
        <td>${age}</td>
        <td>${salary}</td>
        <td>${city}</td>
        <td><button data-action="remove">X</button></td>
      </tr>
    `;
  }

  _onTableClick = (event) => {
    let action = event.target.dataset.action;
    if (action !== 'remove') return;

    let currentRow = event.target.closest('tr');
    currentRow.remove();
  };
}
