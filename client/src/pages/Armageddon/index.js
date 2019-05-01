import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tabs } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Repo from '@/components/Armageddon/repo';
import * as u from '@/utils/utils';
import * as _ from 'lodash';

import styles from './index.less';

const { TabPane } = Tabs;

@connect(({ loading, armageddon }) => ({
  loading: loading.effects['armageddon/fetch'],
  armageddon,
}))
class Armageddon extends Component {
  constructor(props) {
    super(props);
    u.log('In armageddon constructor');
  }

  state = {
    tabKey: '',
  };

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

  handleTabChange = key => {
    this.setState({
      tabKey: key,
    });
  };

  render() {
    const { loading, armageddon } = this.props;

    const repos = _.get(armageddon, 'data', []);
    return (
      <GridContent>
        <Card className={styles.armageddon} loading={loading}>
          <Tabs onChange={this.handleTabChange}>
            {repos.map(repo => (
              <TabPane
                key={repo.repoName}
                
              >
                <Repo repo={repo} />
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </GridContent>
    );
  }
}

export default Armageddon;
