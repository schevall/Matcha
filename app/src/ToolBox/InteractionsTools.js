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
  console.log('CAN SEE');
  const { blockedby } = visitor;
  const { blockedto } = target;
  if (blockedby.includes(target.username) || blockedto.includes(visitor.username)) {
    return false;
  }
  return true;
};
