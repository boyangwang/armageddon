import { stringify } from 'qs';
import request from '@/utils/request';
import * as u from '@/utils/utils';

export async function getArmageddon() {
  return request('http://localhost:4200/graphql', {
    method: 'POST'
  }).catch((err) => {
    u.log("Failed: getArmageddon graphql", err);
    return {
      data: [],
      loading: false,
      stale: false,
      err,
    };
  });
}

export async function reviewCommit(reviewRepoName, commits) {
  request('http://localhost:4200/graphql/review', {
    method: 'POST',
    body: {
      reviewRepoName, reviewCommits: commits
    }
  }).catch((err) => {
    u.log("Failed: reviewCommit graphql", err);
    return {
      data: [],
      loading: false,
      stale: false,
      err,
    };
  });
}
