import * as testee from './armageddon';
import { timestampToStr } from './utils';

test('isAnyCommitUnreviewedInBranch', () => {
  const data = {
    branchName: 'test-branch',
    commits: [
      {
        hash: 'testhash9603a3ca6e6c8b486cbaff759975cf50',
        timestamp: '1545032981000',
        reviewed: false,
        author: 'test author',
        message: 'test message',
      },
    ],
  };
  expect(testee.isAnyCommitUnreviewedInBranch(data)).toBe(true);
});

test('isAnyCommitUnreviewed', () => {
  const data = {
    repoName: 'test',
    remotes: [
      {
        remoteName: 'origin',
        url: 'git@bitbucket.org:test/test.git',
      },
    ],
    branches: [
      {
        branchName: 'test-branch',
        commits: [
          {
            hash: 'testhash9603a3ca6e6c8b486cbaff759975cf50',
            timestamp: '1545032981000',
            reviewed: false,
            author: 'test author',
            message: 'test message',
          },
        ],
      },
    ],
  };
  expect(testee.isAnyCommitUnreviewed(data)).toBe(true);
});

test('findLatestCommitInBranch', () => {
  const data = {
    branchName: 'test-branch',
    commits: [
      {
        hash: 'testhash9603a3ca6e6c8b486cbaff759975cf50',
        timestamp: '1545032981000',
        reviewed: false,
        author: 'test author',
        message: 'test message',
      },
      {
        hash: 'testhash9603a3ca6e6c8b486cbaff759975cf50',
        timestamp: '1545032982000',
        reviewed: false,
        author: 'test author',
        message: 'test message',
      },
    ],
  };
  expect(testee.findLatestCommitInBranch(data).timestamp).toBe('1545032982000');
});

test('findLatestCommitInBranch, no commit', () => {
  const data = {
    branchName: 'test-branch',
    commits: [],
  };
  expect(testee.findLatestCommitInBranch(data)).toBe(null);
});

test('findLatestCommit', () => {
  const data = {
    repoName: 'test',
    remotes: [
      {
        remoteName: 'origin',
        url: 'git@bitbucket.org:test/test.git',
      },
    ],
    branches: [
      {
        branchName: 'test-branch',
        commits: [
          {
            hash: 'testhash9603a3ca6e6c8b486cbaff759975cf50',
            timestamp: '1545032981000',
            reviewed: false,
            author: 'test author',
            message: 'test message',
          },
        ],
      },
      {
        branchName: 'test-branch',
        commits: [
          {
            hash: 'testhash9603a3ca6e6c8b486cbaff759975cf50',
            timestamp: '1545032983000',
            reviewed: false,
            author: 'test author',
            message: 'test message',
          },
        ],
      },
    ],
  };
  expect(testee.findLatestCommit(data).timestamp).toBe('1545032983000');
});

test('getCommitLink', () => {
  const data = {
    repoName: 'test',
    remotes: [
      {
        remoteName: 'origin',
        url: 'git@gitlab.intranet.huiyin.com:matrix/matrix-ui-new.git',
      },
    ],
    branches: [
      {
        branchName: 'test-branch',
        commits: [
          {
            hash: 'testhash9603a3ca6e6c8b486cbaff759975cf50',
            timestamp: '1545032981000',
            reviewed: false,
            author: 'test author',
            message: 'test message',
          },
        ],
      },
    ],
  };
  expect(testee.getCommitLink(data, data.branches[0].commits[0])).toBe(
    'http://gitlab.intranet.huiyin.com/matrix/matrix-ui-new/commit/testhash9603a3ca6e6c8b486cbaff759975cf50'
  );
});

test('findCutoffFromTs', () => {
  const normal = 1556770037362;
  const beijingEight = 1556755200000;
  const beijingNine = 1556758800000;
  const beijingSeven = 1556751600000;
  const beijingOne = 1556730000000;
  const beijingZero = 1556726400000;
  const beijingTodayTwentyThree = 1556809200000;
  const beijingYesterdayTwentyThree = 1556722800000;

  console.info('BASE', timestampToStr(normal)); // 12:07:17 Thu | 2019 May 02 | +0800
  expect(testee.findCutoffStrFromTs(normal)).toBe('08:00:00 Tue | 2019 Apr 30 | +0800');
  expect(testee.findCutoffStrFromTs(beijingEight)).toBe('08:00:00 Tue | 2019 Apr 30 | +0800');
  expect(testee.findCutoffStrFromTs(beijingNine)).toBe('08:00:00 Tue | 2019 Apr 30 | +0800');
  expect(testee.findCutoffStrFromTs(beijingSeven)).toBe('08:00:00 Mon | 2019 Apr 29 | +0800');
  expect(testee.findCutoffStrFromTs(beijingOne)).toBe('08:00:00 Mon | 2019 Apr 29 | +0800');
  expect(testee.findCutoffStrFromTs(beijingZero)).toBe('08:00:00 Mon | 2019 Apr 29 | +0800');

  expect(testee.findCutoffStrFromTs(beijingTodayTwentyThree)).toBe(
    '08:00:00 Tue | 2019 Apr 30 | +0800'
  );
  expect(testee.findCutoffStrFromTs(beijingYesterdayTwentyThree)).toBe(
    '08:00:00 Mon | 2019 Apr 29 | +0800'
  );
});
