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

test('findLatestCommitInBranch', () => {
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
      {
        "hash": "testhash9603a3ca6e6c8b486cbaff759975cf50",
        "timestamp": "1545032982000",
        "reviewed": false,
        "author": "test author",
        "message": "test message"
      },
    ],
  };
  expect(testee.findLatestCommitInBranch(data).timestamp).toBe("1545032982000");
});

test('findLatestCommitInBranch, no commit', () => {
  const data = {
    "branchName": "test-branch",
    "commits": [],
  };
  expect(testee.findLatestCommitInBranch(data)).toBe(null);
});

test('findLatestCommit', () => {
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
      {
        "branchName": "test-branch",
        "commits": [
          {
            "hash": "testhash9603a3ca6e6c8b486cbaff759975cf50",
            "timestamp": "1545032983000",
            "reviewed": false,
            "author": "test author",
            "message": "test message"
          },
        ],
      },
    ]
  };
  expect(testee.findLatestCommit(data).timestamp).toBe("1545032983000");
});
