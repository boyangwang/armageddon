import { Badge, Typography } from 'antd';
import React from 'react';
import * as R from 'ramda';
import styles from './index.less';
import { isAnyCommitUnreviewed, findLatestCommit } from '@/utils/armageddon';

const timeAgo = require('time-ago');

const TabPaneLabel = ({ repo }) => {
  const lastCommit = findLatestCommit(repo);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography.Title level={3} style={{ marginBottom: '0' }}>
        {repo.repoName}&nbsp;
        {isAnyCommitUnreviewed(repo) && <Badge status="processing" />}
      </Typography.Title>
      <span className={styles.lastModified}>
        Pushed: {timeAgo.ago(+R.propOr(0, 'timestamp', lastCommit))}
      </span>
    </div>
  );
};

export default TabPaneLabel;
