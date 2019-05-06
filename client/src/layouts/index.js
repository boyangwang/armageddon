import { Layout, Typography } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { timestampToStr } from '@/utils/utils';
import { findCutoffStrFromTs, isAnyCommitUnreviewed } from '@/utils/armageddon';
import chaosStrikeIcon from '@/assets/Chaos-Strike-icon.png';

@connect(({ loading, armageddon }) => ({
  loading: loading.effects['armageddon/fetch'],
  armageddon,
}))
class BasicLayout extends PureComponent {
  render() {
    const { children, armageddon } = this.props;
    const now = Date.now();
    const nowStr = timestampToStr(now);
    const prevStr = findCutoffStrFromTs(now);

    return (
      <Layout className="layout">
        <Layout.Content style={{ padding: '48px' }}>
          <PageHeaderWrapper>
            <Typography.Title level={1} className={styles.pageTitle}>
              Armageddon
              <img
                src={chaosStrikeIcon}
                alt="Rampage"
                className={
                  armageddon.repos.some((r) => isAnyCommitUnreviewed(r))
                    ? styles.chaosStrikeIconHidden
                    : styles.chaosStrikeIcon
                }
              />
            </Typography.Title>
            <Typography.Paragraph>
              Showing list of commits from now <Typography.Text code>{nowStr}</Typography.Text> back
              to <Typography.Text code>{prevStr}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>Cutoff at 08:00 +800 time, 00:00 UTC time</Typography.Paragraph>
          </PageHeaderWrapper>
          {children}
        </Layout.Content>
      </Layout>
    );
  }
}
export default BasicLayout;
