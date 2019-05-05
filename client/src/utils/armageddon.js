import * as R from 'ramda';
import * as moment from 'moment';
import { timestampToStr } from './utils';

// we could support more githosting providers
const GITLAB_HUIYIN_REGEX = /^git@gitlab\.intranet\.huiyin\.com:(.+)\/(.+)\.git$/;

export function isAnyCommitUnreviewedInBranch(branch) {
  return R.any((c) => c.reviewed === false, R.pathOr([], ['commits'], branch));
}

export function isAnyCommitUnreviewed(repo) {
  return R.any(isAnyCommitUnreviewedInBranch, R.pathOr([], ['branches'], repo));
}

export function getTimestampOfCommit(commit) {
  return +R.propOr(0, 'timestamp', commit);
}

export function findLatestCommitFromCommits(commits) {
  return R.reduce(R.maxBy(getTimestampOfCommit), null, commits);
}

export function findLatestCommitInBranch(branch) {
  return findLatestCommitFromCommits(R.propOr([], 'commits', branch));
}

export function findLatestCommit(repo) {
  const latestOfEachBranch = R.map(findLatestCommitInBranch, R.propOr([], 'branches', repo));
  return R.reduce(R.maxBy(getTimestampOfCommit), null, latestOfEachBranch);
}

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
}

export function findCutoffMomentFromTs(ts) {
  return moment
    .default(ts)
    .utc()
    .subtract(2, 'days')
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0);
}

export function findCutoffStrFromTs(ts) {
  return timestampToStr(+findCutoffMomentFromTs(ts));
}

export function updateOneCommitInState(commit, state) {
  const updated = R.clone(state);

  updated.repos.forEach((r) => {
    r.branches.forEach((b) => {
      b.commits.forEach((c) => {
        if (c.hash === commit.hash) {
          Object.assign(c, commit);
        }
      });
    });
  });

  return updated;
}

export function updateCommitsInState(commits, state) {
  let updated = R.clone(state);
  commits.forEach((c) => {
    updated = updateOneCommitInState(c, updated);
  });

  return updated;
}

export function sortRepos(repos) {
  return repos.slice().sort((a, b) => {
    const isAnyCommitUnreviewedA = isAnyCommitUnreviewed(a);
    const isAnyCommitUnreviewedB = isAnyCommitUnreviewed(b);

    if (isAnyCommitUnreviewedA && !isAnyCommitUnreviewedB) {
      return -1;
    }
    if (!isAnyCommitUnreviewedA && isAnyCommitUnreviewedB) {
      return 1;
    }

    const latestCommitA = findLatestCommit(a);
    const latestCommitB = findLatestCommit(b);

    return getTimestampOfCommit(latestCommitB) - getTimestampOfCommit(latestCommitA);
  });
};

export function sortBranches(branches) {
  return branches.slice().sort((a, b) => {
    const latestA = findLatestCommitInBranch(a);
    const latestB = findLatestCommitInBranch(b);

    return getTimestampOfCommit(latestB) - getTimestampOfCommit(latestA);
  });
};
