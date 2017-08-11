import geolib from 'geolib';

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

export const CountCommonTags = (visitor, target) => {
  const targetTags = target.tags.map(el => el.label);
  const visitorTags = visitor.tags.map(el => el.label);
  if (!targetTags || !visitorTags) return 0;
  let count = 0;
  targetTags.forEach((el) => {
    if (visitorTags.includes(el)) {
      count += 1;
    }
  });
  return count;
};

export const CalculateDistance = (visitor, target) => {
  const targetGeo = target.geo;
  const visitorGeo = visitor.geo;
  if (!targetGeo) return `${target.username} is not geolocalized`;
  if (!visitorGeo) return 'You are not geolocalized';
  console.log('Geo', visitorGeo, targetGeo);
  return 1;
};
