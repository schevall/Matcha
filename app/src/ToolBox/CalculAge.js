export default function calculateAge(birthday) {
  const ageDifMs = Date.now() - new Date(birthday);
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
