# Armageddon

A code review tool

> Bestride Armageddon, I ride down my enemies

> I'll set you bouncing on Armageddon's flank!

## armageddon-client

Display repos in tabs

Branches as cards

Commits as list items

## armageddon-server

Extract out remote connectors for reuse with Github, Bitbucket, Gitlab, even local repo

Get list of interested repo

Get list of branches

Get list of commits in the range

Return a nested structure

```json
{
  "status": "success",
  "data": [
    {
      "repoName": "miniapp",
      "remotes": [
        {
          "remoteName": "origin",
          "url": "git@bitbucket.org:chatchat/miniapp.git"
        }
      ],
      "branches": [
        {
          "branchName": "develop",
          "commits": [
            {
              "hash": "d3565c9b9603a3ca6e6c8b486cbaff759975cf50",
              "timestamp": "1545032981000",
              "reviewed": false,
              "author": "boyang",
              "message": "yarn.lock"
            },
            {
              "hash": "9832b438f91b94bf23a3218cc6842121cb937c0b",
              "timestamp": "1545032956000",
              "reviewed": false,
              "author": "boyang",
              "message": "ethereumjs-tx dep"
            }
          ]
        },
        {
          "branchName": "master",
          "commits": [
            {
              "hash": "d3565c9b9603a3ca6e6c8b486cbaff759975cf50",
              "timestamp": "1545032981000",
              "reviewed": false,
              "author": "boyang",
              "message": "yarn.lock"
            },
            {
              "hash": "9832b438f91b94bf23a3218cc6842121cb937c0b",
              "timestamp": "1545032956000",
              "reviewed": false,
              "author": "boyang",
              "message": "ethereumjs-tx dep"
            }
          ]
        }
      ]
    },
    {
      "repoName": "ios",
      "remotes": [
        {
          "remoteName": "origin",
          "url": "git@bitbucket.org:chatchat/ios.git"
        }
      ],
      "branches": [
        {
          "branchName": "develop",
          "commits": [
            {
              "hash": "d3565c9b9603a3ca6e6c8b486cbaff759975cf50",
              "timestamp": "1545032981000",
              "reviewed": false,
              "author": "boyang",
              "message": "yarn.lock"
            }
          ]
        }
      ]
    }
  ]
}
```
