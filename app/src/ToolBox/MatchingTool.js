import { getDistance, CountCommonTags } from './InteractionsTools.js';

export const GetDistancePoint = (targetGeo, visitorGeo) => {
  const dist = getDistance(targetGeo, visitorGeo);
  if (dist <= 1000) return 10;
  else if (dist <= 2500) return 8;
  else if (dist <= 5000) return 5;
  else if (dist < 10000) return 3;
  else if (dist < 20000) return 1;
  return 0;
};

export const GetTagsPoint = (targetTags = [], visitorTags = []) => {
  const TLength = targetTags.length;
  const VLength = visitorTags.length;
  const count = CountCommonTags(targetTags, visitorTags);
  if (!TLength || !VLength || !count) return 0;
  if (count === TLength || count === VLength) return 5;
  if (count === TLength - 1 || count === VLength - 1) return 4;
  return count;
};

export const GetMatchingScore = (target, visitor) => {
  let points = 0;
  points += GetDistancePoint(target.geo, visitor.geo);
  points += GetTagsPoint(target.tags, visitor.tags);
  return points;
};

export const TagMatch = (searchTag = [], tags = []) => {
  if (!searchTag.length) return true;
  for (let i = 0; i < searchTag.length; i += 1) {
    if (!tags.includes(searchTag[i])) {
      return false;
    }
  }
  return true;
};
