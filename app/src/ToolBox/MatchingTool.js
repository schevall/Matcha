import { getDistance, CountCommonTags, CalculatePopularity } from './InteractionsTools.js';

export const GetDistancePoint = (targetGeo, visitorGeo) => {
  const dist = getDistance(targetGeo, visitorGeo);
  if (dist <= 1000) return 10;
  else if (dist <= 2500) return 8;
  else if (dist <= 5000) return 5;
  else if (dist < 10000) return 3;
  else if (dist < 20000) return 1;
  return 0;
};

export const GetTagsPoint = (targetTags, visitorTags) => {
  const count = CountCommonTags(targetTags, visitorTags);
  return count;
};

export const GetMatchingScore = (target, visitor) => {
  let points = 0;
  points += GetDistancePoint(target.geo, visitor.geo);
  points += GetTagsPoint(target.tags, visitor.tags);
  points += CalculatePopularity(target);
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
