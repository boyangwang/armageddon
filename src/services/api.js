import { stringify } from 'qs';
import request from '@/utils/request';
import * as u from '@/utils/utils';

const prefix = '/v1/armageddon'

export async function getArmageddon(params) {
  return request(`${prefix}/data?${stringify(params)}`, {
    method: 'GET'
  }).catch((err) => {
    u.log("Failed: getArmageddon", err);
    return {
      data: [],
      loading: false,
      stale: false,
      err,
    };
  });
}

export async function reviewCommit(reviewRepoName, commits) {
  request(`${prefix}/review`, {
    method: 'POST',
    body: {
      reviewRepoName, reviewCommits: commits
    }
  }).catch((err) => {
    u.log("Failed: reviewCommit", err);
    return {
      data: [],
      loading: false,
      stale: false,
      err,
    };
  });
}
