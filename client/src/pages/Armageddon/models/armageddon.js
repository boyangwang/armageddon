import * as api from '@/services/api';
import * as u from '@/utils/utils';
import { updateCommitsInState } from '@/utils/armageddon';

export default {
  namespace: 'armageddon',

  state: {
    repos: [],
    loading: false,
    err: null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const ts = +payload;
      const response = yield call(api.getArmageddon, { cutoff: ts });
      u.log('fetch', response);
      yield put({
        type: 'saveArmageddon',
        payload: response,
      });
    },
    /**
     * payload = { repo, commits: [ { hash: 'testhash', reviewed: true || false, reviewComment: 'foobar' } ] }
     */
    *review({ payload }, { call, put }) {
      const { repo, commits } = payload;
      const response = yield call(api.reviewCommit, repo.repoName, commits);
      u.log('review', response);
      yield put({
        type: 'reviewCommit',
        payload: {
          repo,
          commits,
        },
      });
    },
  },

  reducers: {
    saveArmageddon(state, action) {
      return {
        ...state,
        repos: action.payload.data,
      };
    },
    reviewCommit(state, action) {
      const { commits } = action.payload;

      return updateCommitsInState(commits, state);
    },
  },
};
