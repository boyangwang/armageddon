import { Tabs, Badge } from 'antd';
import Repo from '@/components/Armageddon/repo';
import React from 'react';
import R from 'ramda';

import styles from './index.less';

const timeAgo = require('time-ago');

export default function(props) {
  const { repo } = props;
  return (
    <Tabs.TabPane
      key={repo.repoName}
      tab={
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ marginBottom: '0' }}>
            {repo.repoName}{' '}
            {repo.commits.find(c => !c.reviewed) && <Badge status="processing" />}
          </h3>
          <span className={styles.lastModified}>
            Pushed: {timeAgo.ago(+R.propOr(repo, 'commits[0].timestamp', 0))}
          </span>
        </div>
      }
    >
      <Repo repo={repo} />
    </Tabs.TabPane>
  );
};
