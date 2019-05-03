import { stringify } from 'qs';
import request from '@/utils/request';
import * as u from '@/utils/utils';

const prefix = '/v1/armageddon';

export async function getArmageddon(params) {
  return request(`${prefix}/data?${stringify(params)}`, {
    method: 'GET',
  }).catch((err) => {
    u.log('Failed: getArmageddon', err);
    return {
      err,
    };
  });
}

export async function reviewCommit(reviewRepoName, reviewCommits) {
  return request(`${prefix}/review`, {
    method: 'POST',
    body: {
      reviewRepoName,
      reviewCommits,
    },
  }).catch((err) => {
    u.log('Failed: reviewCommit', err);
    return {
      err,
    };
  });
}
