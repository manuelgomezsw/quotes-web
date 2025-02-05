export function filterOptions(value: string, options: string[]): string[] {
  const filterValue = value.toLowerCase();
  return options.filter(option => option.toLowerCase().includes(filterValue));
}
