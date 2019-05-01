import * as R from 'ramda';

export function isAnyCommitUnreviewedInBranch(branch) {
  return R.any((c) => c.reviewed === false, R.pathOr([], ['commits'], branch));
};

export function isAnyCommitUnreviewed(repo) {
  return R.any(isAnyCommitUnreviewedInBranch, R.pathOr([], ['branches'], repo));
};
