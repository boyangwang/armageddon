import * as testee from './armageddon';

test('isAnyCommitUnreviewedInBranch', () => {
  const data = {
    "branchName": "test-branch",
    "commits": [
      {
        "hash": "testhash9603a3ca6e6c8b486cbaff759975cf50",
        "timestamp": "1545032981000",
        "reviewed": false,
        "author": "test author",
        "message": "test message"
      },
    ],
  };
  expect(testee.isAnyCommitUnreviewedInBranch(data)).toBe(true);
});

test('isAnyCommitUnreviewed', () => {
  const data = {
    "repoName": "test",
    "remotes": [
      {
        "remoteName": "origin",
        "url": "git@bitbucket.org:test/test.git"
      }
    ],
    "branches": [
      {
        "branchName": "test-branch",
        "commits": [
          {
            "hash": "testhash9603a3ca6e6c8b486cbaff759975cf50",
            "timestamp": "1545032981000",
            "reviewed": false,
            "author": "test author",
            "message": "test message"
          },
        ],
      },
    ]
  };
  expect(testee.isAnyCommitUnreviewed(data)).toBe(true);
});
