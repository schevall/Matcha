export const getDiffDate = (lastConnection) => {
  const today = Date.now();
  const diff = (today - lastConnection) / 1000;
  const days = Math.floor(diff / 86400);
  let hours = Math.floor(diff / 3600);
  let minutes = Math.floor(diff / 60);
  let seconds = Math.floor(diff);
  if (diff >= 86400) {
    if (days > 1) return `${days} days`;
    hours -= (days * 24);
    return `${days} day ${hours}h`;
  } else if (diff >= 3600) {
    if (hours > 1) return `${hours} hours`;
    minutes -= (hours * 60);
    return `${hours} h : ${minutes} m`;
  } else if (diff >= 60) {
    if (minutes > 1) return `${minutes} minutes`;
    seconds -= (minutes * 60);
    return `${minutes} minute ${seconds} s`;
  } else if (diff >= 0) {
    return `${seconds} seconds`;
  } return 'NAN';
};

export const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - new Date(birthday);
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
