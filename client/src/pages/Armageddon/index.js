import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Tabs, Typography, DatePicker } from 'antd';
import * as moment from 'moment';
import TabPane from './TabPane';
import TabPaneLabel from './TabPaneLabel';

import styles from './index.less';
import { findCutoffMomentFromTs, sortRepos } from '@/utils/armageddon';
import { timestampToStr, log } from '@/utils/utils';

@connect(({ loading, armageddon }) => ({
  loading: loading.effects['armageddon/fetch'],
  armageddon,
}))
class Armageddon extends Component {

  constructor(props) {
    super(props);
    log('In armageddon constructor');

    const now = Date.now();
    const cutoff = findCutoffMomentFromTs(Date.now());

    this.state = {
      cutoff,
      now,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { cutoff } = this.state;

    dispatch({
      type: 'armageddon/fetch',
      payload: cutoff,
    });
  }

  onDatePickerChange = async (newCutoff) => {
    const { dispatch } = this.props;
    const { cutoff } = this.state;

    if (newCutoff) {
      await this.setState({
        cutoff: newCutoff,
      });
      await dispatch({
        type: 'armageddon/fetch',
        payload: cutoff,
      });
    }
  }

  render() {
    const { loading, armageddon } = this.props;
    const { now, cutoff } = this.state;
    const nowStr = timestampToStr(now);
    const prevStr = timestampToStr(+cutoff);

    return (
      <Fragment>
        <Typography.Paragraph>
          Showing list of commits from now <Typography.Text code>{nowStr}</Typography.Text> back
          to <Typography.Text code>{prevStr}</Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph>
          Cutoff at 08:00 +800 time, 00:00 UTC time
          <DatePicker className={styles.datepicker} defaultValue={cutoff} format="YYYY-MMM-DD" onChange={this.onDatePickerChange} />
        </Typography.Paragraph>
        <Card className={styles.armageddon} loading={loading}>
          <Tabs>
            {sortRepos(armageddon.repos).map((repo) => (
              <TabPane repo={repo} key={repo.repoName} tab={<TabPaneLabel repo={repo} />} />
            ))}
          </Tabs>
        </Card>
      </Fragment>
    );
  }
}

export default Armageddon;
