import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tabs } from 'antd';
import * as R from 'ramda';
import TabPane from './TabPane';
import * as u from '@/utils/utils';
import TabPaneLabel from './TabPaneLabel';

import styles from './index.less';

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
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'armageddon/fetch',
      });
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef);
  }

  render() {
    const { loading, armageddon } = this.props;

    return (
      <Card className={styles.armageddon} loading={loading}>
        <Tabs>
          {armageddon.repos.map(repo => (
            <TabPane
              repo={repo}
              key={repo.repoName}
              tab={<TabPaneLabel repo={repo} />}
            />
          ))}
        </Tabs>
      </Card>
    );
  }
}

export default Armageddon;
