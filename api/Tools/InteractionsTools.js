import geolib from 'geolib';

export const CalculatePopularity = (target) => {
  const { likedby, blockedby } = target;
  return (likedby.length - blockedby.length);
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

export const getDistance = (targetGeo, visitorGeo) => {
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
