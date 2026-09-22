// src/data/format.js
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Turn a "YYYY-MM" string into "Mon YYYY" (e.g. "2019-07" -> "Jul 2019").
 * Parsed by hand rather than via Date so the result never shifts by timezone.
 * @param {string} value
 * @returns {string}
 */
export function formatMonth(value) {
  const [year, month] = value.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/**
 * Render the timeline's date label, e.g. "Jul 2019 - Jul 2023".
 * A null endDate means the role is ongoing.
 * @param {string} startDate
 * @param {string | null} [endDate]
 * @returns {string}
 */
export function formatRange(startDate, endDate) {
  const end = endDate ? formatMonth(endDate) : "Present";
  return `${formatMonth(startDate)} - ${end}`;
}
