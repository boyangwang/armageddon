import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tabs } from 'antd';
import TabPane from './TabPane';
import * as u from '@/utils/utils';
import TabPaneLabel from './TabPaneLabel';

import styles from './index.less';
import { findCutoffMomentFromTs, sortRepos } from '@/utils/armageddon';

@connect(({ loading, armageddon }) => ({
  loading: loading.effects['armageddon/fetch'],
  armageddon,
}))
class Armageddon extends Component {
  constructor(props) {
    super(props);
    u.log('In armageddon constructor');
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'armageddon/fetch',
      payload: findCutoffMomentFromTs(Date.now()),
    });
  }

  render() {
    const { loading, armageddon } = this.props;

    return (
      <Card className={styles.armageddon} loading={loading}>
        <Tabs>
          {sortRepos(armageddon.repos).map((repo) => (
            <TabPane repo={repo} key={repo.repoName} tab={<TabPaneLabel repo={repo} />} />
          ))}
        </Tabs>
      </Card>
    );
  }
}

export default Armageddon;
