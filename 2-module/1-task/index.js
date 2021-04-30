function sumSalary(salaries) {
  let salary = 0;

  for (const key in salaries) {
    const value = salaries[key];

    if (typeof value === 'number' && isFinite(value)) {
      salary += value;
    }
  }

  return salary;
}
