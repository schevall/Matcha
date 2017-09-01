import geolib from 'geolib';

export const canInteract = (target, visitor) => {
  if ((target.gender !== visitor.orient) && visitor.orient !== 'both') {
    return false;
  }
  if ((visitor.gender !== target.orient) && target.orient !== 'both') {
    return false;
  }
  return true;
};

export const hasLiked = (target, visitor) => {
  const { liketo } = visitor;
  return liketo.includes(target.username);
};

export const isaMatch = (target, visitor) => {
  const visitorLiketo = visitor.liketo;
  const targetLiketo = target.liketo;
  if (targetLiketo.includes(visitor.username) && visitorLiketo.includes(target.username)) {
    return true;
  }
  return false;
};

export const hasBlocked = (target, visitor) => {
  const { blockedto } = visitor;
  return blockedto.includes(target.username);
};

export const hasReported = (target, visitor) => {
  const { reportedto } = visitor;
  return reportedto.includes(target.username);
};

export const canSee = (visitor, target) => {
  const { blockedby } = visitor;
  const { blockedto } = target;
  if (blockedby.includes(target.username) || blockedto.includes(visitor.username)) {
    return false;
  }
  return true;
};

export const CountCommonTags = (targetTags, visitorTags) => {
  if (!targetTags || !visitorTags) return 0;
  let count = 0;
  targetTags.forEach((el) => {
    if (visitorTags.includes(el)) {
      count += 1;
    }
  });
  return count;
};

export const getDistance = (visitorGeo, targetGeo) => {
  const array1 = targetGeo.split(',');
  const array2 = visitorGeo.split(',');
  const lat1 = array1[0];
  const lng1 = array1[1];
  const lat2 = array2[0];
  const lng2 = array2[1];
  const meters = geolib.getDistance(
    { latitude: lat1, longitude: lng1 },
    { latitude: lat2, longitude: lng2 },
  );
  return (meters);
};

export const CalculatePopularity = (target) => {
  const { likedby, blockedby } = target;
  return (likedby.length - blockedby.length);
};
