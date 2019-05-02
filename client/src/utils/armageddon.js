import * as R from 'ramda';

export function isAnyCommitUnreviewedInBranch(branch) {
  return R.any((c) => c.reviewed === false, R.pathOr([], ['commits'], branch));
};

export function isAnyCommitUnreviewed(repo) {
  return R.any(isAnyCommitUnreviewedInBranch, R.pathOr([], ['branches'], repo));
};

export function getTimestampOfCommit(commit) {
  return +R.propOr(0, 'timestamp', commit);
};

export function findLatestCommitInBranch(branch) {
  return R.reduce(R.maxBy(getTimestampOfCommit), null, R.propOr([], 'commits', branch));
};

export function findLatestCommit(repo) {
  const latestOfEachBranch = R.map(findLatestCommitInBranch, R.propOr([], 'branches', repo));
  return R.reduce(R.maxBy(getTimestampOfCommit), null, latestOfEachBranch);
};
