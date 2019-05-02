export const data = {
  status: 'success',
  data: [
    {
      repoName: 'miniapp',
      remotes: [
        {
          remoteName: 'origin',
          url: 'git@bitbucket.org:chatchat/miniapp.git',
        },
      ],
      branches: [
        {
          branchName: 'develop',
          commits: [
            {
              hash: 'd3565c9b9603a3ca6e6c8b486cbaff759975cf50',
              timestamp: '1545032981000',
              reviewed: false,
              author: 'boyang',
              message: 'yarn.lock',
            },
            {
              hash: '9832b438f91b94bf23a3218cc6842121cb937c0b',
              timestamp: '1545032956000',
              reviewed: false,
              author: 'boyang',
              message: 'ethereumjs-tx dep',
            },
          ],
        },
        {
          branchName: 'master',
          commits: [
            {
              hash: 'd3565c9b9603a3ca6e6c8b486cbaff759975cf50',
              timestamp: '1545032981000',
              reviewed: false,
              author: 'boyang',
              message: 'yarn.lock',
            },
            {
              hash: '9832b438f91b94bf23a3218cc6842121cb937c0b',
              timestamp: '1545032956000',
              reviewed: false,
              author: 'boyang',
              message: 'ethereumjs-tx dep',
            },
          ],
        },
      ],
    },
    {
      repoName: 'ios',
      remotes: [
        {
          remoteName: 'origin',
          url: 'git@bitbucket.org:chatchat/ios.git',
        },
      ],
      branches: [
        {
          branchName: 'develop',
          commits: [
            {
              hash: 'd3565c9b9603a3ca6e6c8b486cbaff759975cf50',
              timestamp: '1545032981000',
              reviewed: false,
              author: 'boyang',
              message: 'yarn.lock',
            },
          ],
        },
      ],
    },
  ],
};

export const minimalData = {
  status: 'success',
  data: [
    {
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
    },
  ],
};
