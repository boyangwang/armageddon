import * as R from 'ramda';
import * as moment from 'moment';
import { timestampToStr } from './utils';

// we could support more githosting providers
const GITLAB_HUIYIN_REGEX = /^git@gitlab\.intranet\.huiyin\.com:(.+)\/(.+)\.git$/;

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

export function getCommitLink(repo, commit) {
  // use first remote for now
  const remote = R.propOr([], 'remotes', repo)[0];
  if (!remote) {
    return '#';
  }

  if (remote.url.startsWith('git@gitlab.intranet.huiyin.com')) {
    const m = remote.url.match(GITLAB_HUIYIN_REGEX);
    return `http://gitlab.intranet.huiyin.com/${m[1]}/${m[2]}/commit/${commit.hash}`;
  } 
  return '#';
};

export function findCutoffFromTs(ts) {
  return timestampToStr(
    moment.default(ts).utc().subtract(1, 'days').hours(0).minutes(0).seconds(0).milliseconds(0)
  );
};
