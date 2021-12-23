export function toSchoolYear(year: number) {
  if (year === 1) {
    return '1ère';
  }
  return `${year}e`;
}
